import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  assignVolunteerApi,
  getAllDonationsApi,
} from "../../services/donationApi";
import api from "../../services/api";
import toast from "react-hot-toast";


const AssignVolunteer = () => {
  const [donations, setDonations] = useState([]);
  const [volunteers, setVolunteers] = useState([]);

  const [selectedDonation, setSelectedDonation] = useState("");
  const [selectedVolunteer, setSelectedVolunteer] = useState("");

  const [loading, setLoading] = useState(false);

  const fetchDonations = async () => {
    try {
      const res = await getAllDonationsApi();

      // res.data is ApiResponse object
      setDonations(res.data);
    } catch (error) {
      toast.error("Failed to load donations");
    }
  };

  const fetchVolunteers = async () => {
    try {
      const res = await api.get("/user/volunteers", { withCredentials: true });

      setVolunteers(res.data.data);
    } catch (error) {
      toast.error("Failed to load volunteers");
    }
  };

  const assignHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        donationId: selectedDonation,
        volunteerId: selectedVolunteer,
      };

      const res = await assignVolunteerApi(payload);

      toast.success(res.message || "Volunteer assigned successfully");

      setSelectedDonation("");
      setSelectedVolunteer("");

      fetchDonations();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Assignment failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
    fetchVolunteers();
  }, []);

  const reservedDonations = donations.filter(
    (donation) => donation.status === "RESERVED"
  );

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-gray-800">Assign Volunteer</h1>
      <p className="text-gray-600 mt-2">
        Assign volunteer to reserved donation for pickup.
      </p>

      <div className="mt-8 bg-white shadow-md rounded-xl p-6 max-w-2xl">
        <form onSubmit={assignHandler} className="flex flex-col gap-4">
          <select
            value={selectedDonation}
            onChange={(e) => setSelectedDonation(e.target.value)}
            className="border p-3 rounded-lg"
            required
          >
            <option value="">Select Donation</option>

            {reservedDonations.length === 0 && (
              <option disabled>No Reserved Donations</option>
            )}

            {reservedDonations.map((donation) => (
              <option key={donation._id} value={donation._id}>
                {donation.foodName} - {donation.quantity} Plates
              </option>
            ))}
          </select>

          <select
            value={selectedVolunteer}
            onChange={(e) => setSelectedVolunteer(e.target.value)}
            className="border p-3 rounded-lg"
            required
          >
            <option value="">Select Volunteer</option>

            {volunteers.map((volunteer) => (
              <option key={volunteer._id} value={volunteer._id}>
                {volunteer.fullname} ({volunteer.email})
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:bg-gray-400"
          >
            {loading ? "Assigning..." : "Assign Volunteer"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AssignVolunteer;
