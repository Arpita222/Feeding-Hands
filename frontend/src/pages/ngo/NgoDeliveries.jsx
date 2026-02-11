import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DonationCard from "../../components/DonationCard";
import api from "../../services/api";
import { deliverDonationApi } from "../../services/donationApi";
import toast from "react-hot-toast";

import { FaTruck, FaSyncAlt, FaCheckCircle } from "react-icons/fa";

const NgoDeliveries = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [deliverLoading, setDeliverLoading] = useState(null);

  const fetchReservedDonations = async () => {
    try {
      setLoading(true);

      const res = await api.get("/donations/ngo-requests", {
        withCredentials: true,
      });

      setDonations(res.data.data || []);
    } catch (error) {
      toast.error("Failed to fetch reserved donations");
    } finally {
      setLoading(false);
    }
  };

  const deliverHandler = async (id) => {
    try {
      setDeliverLoading(id);

      const res = await deliverDonationApi(id);

      toast.success(res.message || "Donation delivered successfully");
      fetchReservedDonations();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to deliver donation");
    } finally {
      setDeliverLoading(null);
    }
  };

  useEffect(() => {
    fetchReservedDonations();
  }, []);

  // Filter only active deliveries (Reserved / Assigned / Picked)
  const activeDeliveries = donations.filter(
    (d) => d.status !== "DELIVERED" && d.status !== "EXPIRED"
  );

  const deliveredCount = donations.filter((d) => d.status === "DELIVERED").length;
  const pickedCount = donations.filter((d) => d.status === "PICKED").length;

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            <FaTruck className="text-green-600" /> Deliver Donations
          </h1>

          <p className="text-gray-600 mt-2">
            Track your accepted donations and mark them delivered after pickup.
          </p>
        </div>

        <button
          onClick={fetchReservedDonations}
          className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition shadow-md"
        >
          <FaSyncAlt /> Refresh
        </button>
      </div>

      {/* Small Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
        <div className="bg-white shadow-md rounded-2xl border border-gray-100 p-6">
          <p className="text-gray-500 text-sm font-medium">Picked Donations</p>
          <h2 className="text-3xl font-extrabold text-purple-600 mt-2">
            {pickedCount}
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            Ready to be delivered
          </p>
        </div>

        <div className="bg-white shadow-md rounded-2xl border border-gray-100 p-6">
          <p className="text-gray-500 text-sm font-medium">Delivered</p>
          <h2 className="text-3xl font-extrabold text-green-600 mt-2">
            {deliveredCount}
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            Successfully completed deliveries
          </p>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="mt-12 bg-white shadow-md rounded-2xl border border-gray-100 p-10 text-center">
          <p className="text-gray-600 font-semibold text-lg">
            Loading deliveries...
          </p>
        </div>
      ) : activeDeliveries.length === 0 ? (
        <div className="mt-12 bg-green-50 border border-green-100 rounded-2xl p-10 text-center">
          <h2 className="text-xl font-bold text-gray-900">
            No active deliveries found 🚫
          </h2>
          <p className="text-gray-600 mt-3 max-w-xl mx-auto">
            Currently there are no reserved / assigned / picked donations for
            delivery.
          </p>

          <button
            onClick={fetchReservedDonations}
            className="mt-6 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition shadow-md"
          >
            Refresh
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {activeDeliveries.map((donation) => (
            <DonationCard key={donation._id} donation={donation}>
              {/* Status Info */}
              <div className="mt-4 bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm text-gray-700">
                Current Status:{" "}
                <span className="font-semibold text-green-700">
                  {donation.status}
                </span>
              </div>

              {/* Button only if PICKED */}
              {donation.status === "PICKED" ? (
                <button
                  onClick={() => deliverHandler(donation._id)}
                  disabled={deliverLoading === donation._id}
                  className="mt-4 w-full bg-green-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-green-700 transition shadow-md disabled:bg-gray-400"
                >
                  {deliverLoading === donation._id
                    ? "Marking Delivered..."
                    : "Mark Delivered"}
                </button>
              ) : (
                <div className="mt-4 bg-yellow-50 border border-yellow-100 text-yellow-700 text-sm font-semibold p-3 rounded-xl text-center">
                  ⏳ Waiting for Volunteer Pickup
                </div>
              )}
            </DonationCard>
          ))}
        </div>
      )}

      {/* Delivered Summary */}
      {!loading && deliveredCount > 0 && (
        <div className="mt-14 bg-white shadow-md rounded-2xl border border-gray-100 p-8 text-center">
          <FaCheckCircle className="text-green-600 text-4xl mx-auto mb-4" />
          <h2 className="text-2xl font-extrabold text-gray-900">
            Great Work 🎉
          </h2>
          <p className="text-gray-600 mt-2">
            You have successfully delivered{" "}
            <span className="font-bold text-green-600">{deliveredCount}</span>{" "}
            donations.
          </p>
        </div>
      )}
    </DashboardLayout>
  );
};

export default NgoDeliveries;
