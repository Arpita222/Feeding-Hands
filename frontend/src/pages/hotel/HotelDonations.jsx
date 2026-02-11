import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DonationCard from "../../components/DonationCard";
import { getMyDonationsApi } from "../../services/donationApi";
import toast from "react-hot-toast";
import { FaClipboardList, FaSyncAlt } from "react-icons/fa";

const HotelDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyDonations = async () => {
    try {
      setLoading(true);
      const res = await getMyDonationsApi();
      setDonations(res.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch donations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyDonations();
  }, []);

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            <FaClipboardList className="text-green-600" /> My Donations
          </h1>

          <p className="text-gray-600 mt-2">
            Track donation status created by your hotel.
          </p>
        </div>

        <button
          onClick={fetchMyDonations}
          className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition shadow-md"
        >
          <FaSyncAlt /> Refresh
        </button>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="mt-10 bg-white shadow-md rounded-2xl p-10 text-center border border-gray-100">
          <p className="text-gray-600 font-semibold text-lg">
            Loading your donations...
          </p>
        </div>
      ) : donations.length === 0 ? (
        <div className="mt-10 bg-white shadow-md rounded-2xl p-10 text-center border border-gray-100">
          <p className="text-gray-700 font-semibold text-lg">
            No donations found 🍽️
          </p>
          <p className="text-gray-500 mt-2 text-sm">
            Create your first donation to help NGOs and people in need.
          </p>
        </div>
      ) : (
        <>
          {/* Count Badge */}
          <div className="mt-8 flex justify-between items-center">
            <p className="text-gray-700 font-medium">
              Total Donations:{" "}
              <span className="font-bold text-green-600">
                {donations.length}
              </span>
            </p>

            <p className="text-sm text-gray-500">
              Showing latest donations first
            </p>
          </div>

          {/* Donations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
            {donations.map((donation) => (
              <DonationCard key={donation._id} donation={donation} />
            ))}
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default HotelDonations;

