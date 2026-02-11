import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DonationCard from "../../components/DonationCard";
import { getAssignedDonationsApi } from "../../services/donationApi";
import toast from "react-hot-toast";

import { FaHistory, FaSyncAlt, FaCheckCircle, FaUtensils } from "react-icons/fa";

const VolunteerHistory = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      setLoading(true);

      const res = await getAssignedDonationsApi();

      const deliveredDonations = (res.data || []).filter(
        (donation) => donation.status === "DELIVERED"
      );

      setDonations(deliveredDonations);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // =========================
  // Stats Calculation
  // =========================
  const totalDeliveries = donations.length;

  const totalMealsDelivered = donations.reduce(
    (total, donation) => total + (donation.quantity || 0),
    0
  );

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            <FaHistory className="text-green-600" /> Completed Deliveries
          </h1>

          <p className="text-gray-600 mt-2">
            View all donations successfully delivered by you.
          </p>
        </div>

        <button
          onClick={fetchHistory}
          className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition shadow-md"
        >
          <FaSyncAlt /> Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
        <div className="bg-white shadow-md rounded-2xl border border-gray-100 p-6">
          <p className="text-gray-500 text-sm font-medium">
            Total Completed Deliveries
          </p>
          <h2 className="text-3xl font-extrabold text-green-600 mt-2">
            {totalDeliveries}
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            Donations delivered successfully
          </p>
        </div>

        <div className="bg-white shadow-md rounded-2xl border border-gray-100 p-6">
          <p className="text-gray-500 text-sm font-medium">
            Meals Delivered (Total Quantity)
          </p>
          <h2 className="text-3xl font-extrabold text-green-600 mt-2">
            {totalMealsDelivered}
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            Estimated meals delivered by you
          </p>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="mt-12 bg-white shadow-md rounded-2xl border border-gray-100 p-10 text-center">
          <p className="text-gray-600 font-semibold text-lg">
            Loading delivery history...
          </p>
        </div>
      ) : donations.length === 0 ? (
        <div className="mt-12 bg-green-50 border border-green-100 rounded-2xl p-10 text-center">
          <h2 className="text-xl font-bold text-gray-900">
            No completed deliveries found 🚫
          </h2>

          <p className="text-gray-600 mt-3 max-w-xl mx-auto">
            You haven’t completed any deliveries yet. Once you deliver donations,
            they will appear here.
          </p>

          <button
            onClick={fetchHistory}
            className="mt-6 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition shadow-md"
          >
            Refresh
          </button>
        </div>
      ) : (
        <>
          {/* Summary Box */}
          <div className="mt-12 bg-white shadow-md rounded-2xl border border-gray-100 p-8 text-center">
            <FaCheckCircle className="text-green-600 text-4xl mx-auto mb-4" />
            <h2 className="text-2xl font-extrabold text-gray-900">
              Great Contribution 🎉
            </h2>

            <p className="text-gray-600 mt-2">
              You have successfully delivered{" "}
              <span className="font-bold text-green-600">{totalDeliveries}</span>{" "}
              donations and helped deliver{" "}
              <span className="font-bold text-green-600">
                {totalMealsDelivered}
              </span>{" "}
              meals.
            </p>

            <div className="flex justify-center items-center gap-2 mt-4 text-sm text-gray-500">
              <FaUtensils className="text-green-600" />
              Thank you for your support to Feeding Hands
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {donations.map((donation) => (
              <DonationCard key={donation._id} donation={donation} />
            ))}
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default VolunteerHistory;
