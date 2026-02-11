import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getMyCouponsApi } from "../../services/donorApi";
import toast from "react-hot-toast";

import { FaTicketAlt, FaCopy, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const DonorCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCoupons = async () => {
    try {
      const res = await getMyCouponsApi();
      setCoupons(res.data || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch coupons");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const copyHandler = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Coupon copied to clipboard 📋");
    } catch (error) {
      toast.error("Failed to copy coupon");
    }
  };

  const activeCoupons = coupons.filter((c) => !c.isRedeemed);
  const redeemedCoupons = coupons.filter((c) => c.isRedeemed);

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            <FaTicketAlt className="text-green-600" /> My Coupons
          </h1>

          <p className="text-gray-600 mt-2">
            Coupons earned from your donations and contributions.
          </p>
        </div>

        <button
          onClick={fetchCoupons}
          className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition shadow-md"
        >
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
        <div className="bg-white shadow-md rounded-2xl border border-gray-100 p-6">
          <p className="text-gray-500 text-sm font-medium">Active Coupons</p>
          <h2 className="text-3xl font-extrabold text-green-600 mt-2">
            {activeCoupons.length}
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            Available for redemption
          </p>
        </div>

        <div className="bg-white shadow-md rounded-2xl border border-gray-100 p-6">
          <p className="text-gray-500 text-sm font-medium">Redeemed Coupons</p>
          <h2 className="text-3xl font-extrabold text-gray-700 mt-2">
            {redeemedCoupons.length}
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            Already used successfully
          </p>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="mt-12 bg-white shadow-md rounded-2xl border border-gray-100 p-10 text-center">
          <p className="text-gray-600 font-semibold text-lg">
            Loading coupons...
          </p>
        </div>
      ) : coupons.length === 0 ? (
        <div className="mt-12 bg-green-50 border border-green-100 rounded-2xl p-10 text-center">
          <h2 className="text-xl font-bold text-gray-900">
            No coupons found 🎟️
          </h2>
          <p className="text-gray-600 mt-3 max-w-xl mx-auto">
            You haven't earned any coupons yet. Donate money to unlock rewards
            and discounts.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {coupons.map((coupon) => (
            <div
              key={coupon._id}
              className="relative bg-white shadow-md rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition overflow-hidden"
            >
              {/* Left Green Strip */}
              <div className="absolute top-0 left-0 h-full w-2 bg-green-600"></div>

              {/* Coupon Badge */}
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">
                    Coupon Code
                  </p>

                  <h2 className="text-2xl font-extrabold text-gray-900 mt-2">
                    {coupon.code}
                  </h2>
                </div>

                {/* Status */}
                {coupon.isRedeemed ? (
                  <span className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full bg-red-50 text-red-600 border border-red-100">
                    <FaTimesCircle /> Redeemed
                  </span>
                ) : (
                  <span className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full bg-green-50 text-green-700 border border-green-100">
                    <FaCheckCircle /> Active
                  </span>
                )}
              </div>

              {/* Discount */}
              <div className="mt-6 flex justify-between items-center bg-gray-50 border border-gray-100 rounded-xl p-4">
                <p className="text-gray-600 font-medium">Discount</p>
                <p className="text-xl font-extrabold text-green-600">
                  {coupon.discount}%
                </p>
              </div>

              {/* Footer */}
              <div className="mt-6 flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  Created:{" "}
                  <span className="font-medium text-gray-700">
                    {new Date(coupon.createdAt).toLocaleDateString()}
                  </span>
                </p>

                {/* Copy Button */}
                <button
                  onClick={() => copyHandler(coupon.code)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-green-50 hover:border-green-300 transition"
                >
                  <FaCopy /> Copy
                </button>
              </div>

              {/* Redeemed Overlay */}
              {coupon.isRedeemed && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
                  <p className="text-xl font-extrabold text-red-600 rotate-[-10deg] border-4 border-red-500 px-6 py-2 rounded-xl">
                    REDEEMED
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default DonorCoupons;
