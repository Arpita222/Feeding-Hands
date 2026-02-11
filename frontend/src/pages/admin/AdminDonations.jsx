import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DonationCard from "../../components/DonationCard";
import { getAllDonationsApi } from "../../services/donationApi";
import toast from "react-hot-toast";

const AdminDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllDonations = async () => {
    try {
      const res = await getAllDonationsApi();
      setDonations(res.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch donations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllDonations();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-gray-800">All Donations</h1>
      <p className="text-gray-600 mt-2">
        Admin can view every donation in the system.
      </p>

      {loading ? (
        <p className="mt-8 text-gray-600 font-semibold">Loading donations...</p>
      ) : donations.length === 0 ? (
        <p className="mt-8 text-gray-600 font-semibold">
          No donations available.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {donations.map((donation) => (
            <DonationCard key={donation._id} donation={donation} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminDonations;

