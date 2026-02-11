import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DonationCard from "../../components/DonationCard";
import {
  getAssignedDonationsApi,
  pickDonationApi,
} from "../../services/donationApi";
import toast from "react-hot-toast";

import { FaTruckPickup, FaSyncAlt, FaBoxOpen, FaCheckCircle } from "react-icons/fa";

const VolunteerPickups = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [pickLoading, setPickLoading] = useState(null);

  const fetchAssignedDonations = async () => {
    try {
      setLoading(true);

      const res = await getAssignedDonationsApi();
      setDonations(res.data || []);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch assigned pickups"
      );
    } finally {
      setLoading(false);
    }
  };

  const pickHandler = async (id) => {
    try {
      setPickLoading(id);

      const res = await pickDonationApi(id);
      toast.success(res.message || "Donation picked successfully");

      fetchAssignedDonations();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to pick donation");
    } finally {
      setPickLoading(null);
    }
  };

  useEffect(() => {
    fetchAssignedDonations();
  }, []);

  // =========================
  // Stats Calculation
  // =========================
  const assignedCount = donations.filter((d) => d.status === "ASSIGNED").length;
  const pickedCount = donations.filter((d) => d.status === "PICKED").length;
  const deliveredCount = donations.filter((d) => d.status === "DELIVERED").length;

  const activePickups = donations.filter(
    (d) => d.status !== "DELIVERED" && d.status !== "EXPIRED"
  );

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            <FaTruckPickup className="text-green-600" /> Assigned Pickups
          </h1>

          <p className="text-gray-600 mt-2">
            View assigned donations and mark them picked when collected.
          </p>
        </div>

        <button
          onClick={fetchAssignedDonations}
          className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition shadow-md"
        >
          <FaSyncAlt /> Refresh
        </button>
      </div>

      {/* Small Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
        <div className="bg-white shadow-md rounded-2xl border border-gray-100 p-6">
          <p className="text-gray-500 text-sm font-medium">Assigned</p>
          <h2 className="text-3xl font-extrabold text-green-600 mt-2">
            {assignedCount}
          </h2>
          <p className="text-gray-600 text-sm mt-2">Waiting for pickup</p>
        </div>

        <div className="bg-white shadow-md rounded-2xl border border-gray-100 p-6">
          <p className="text-gray-500 text-sm font-medium">Picked</p>
          <h2 className="text-3xl font-extrabold text-green-600 mt-2">
            {pickedCount}
          </h2>
          <p className="text-gray-600 text-sm mt-2">Collected successfully</p>
        </div>

        <div className="bg-white shadow-md rounded-2xl border border-gray-100 p-6">
          <p className="text-gray-500 text-sm font-medium">Delivered</p>
          <h2 className="text-3xl font-extrabold text-green-600 mt-2">
            {deliveredCount}
          </h2>
          <p className="text-gray-600 text-sm mt-2">Completed deliveries</p>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="mt-12 bg-white shadow-md rounded-2xl border border-gray-100 p-10 text-center">
          <p className="text-gray-600 font-semibold text-lg">
            Loading assigned pickups...
          </p>
        </div>
      ) : activePickups.length === 0 ? (
        <div className="mt-12 bg-green-50 border border-green-100 rounded-2xl p-10 text-center">
          <h2 className="text-xl font-bold text-gray-900">
            No assigned pickups found 🚫
          </h2>
          <p className="text-gray-600 mt-3 max-w-xl mx-auto">
            You currently don’t have any active assigned pickups. Please check
            again later.
          </p>

          <button
            onClick={fetchAssignedDonations}
            className="mt-6 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition shadow-md"
          >
            Refresh
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {activePickups.map((donation) => (
            <DonationCard key={donation._id} donation={donation}>
              {/* Status Box */}
              <div className="mt-4 bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm text-gray-700">
                Current Status:{" "}
                <span className="font-semibold text-green-700">
                  {donation.status}
                </span>
              </div>

              {/* Action Button */}
              {donation.status === "ASSIGNED" ? (
                <button
                  onClick={() => pickHandler(donation._id)}
                  disabled={pickLoading === donation._id}
                  className="mt-4 w-full bg-green-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-green-700 transition shadow-md disabled:bg-gray-400"
                >
                  {pickLoading === donation._id
                    ? "Picking Donation..."
                    : "Pick Donation"}
                </button>
              ) : donation.status === "PICKED" ? (
                <div className="mt-4 bg-green-50 border border-green-100 text-green-700 text-sm font-semibold p-3 rounded-xl text-center flex items-center justify-center gap-2">
                  <FaCheckCircle /> Picked Successfully
                </div>
              ) : (
                <div className="mt-4 bg-yellow-50 border border-yellow-100 text-yellow-700 text-sm font-semibold p-3 rounded-xl text-center flex items-center justify-center gap-2">
                  <FaBoxOpen /> Waiting for next step
                </div>
              )}
            </DonationCard>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default VolunteerPickups;

