import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import StatCard from "../../components/StatCard";
import toast from "react-hot-toast";

import {
  FaRupeeSign,
  FaTicketAlt,
  FaHandsHelping,
  FaChartLine,
} from "react-icons/fa";

import { getMyCouponsApi, getMyImpactApi } from "../../services/donorApi";

const DonorDashboard = () => {
  const [impact, setImpact] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const impactRes = await getMyImpactApi();
      const couponRes = await getMyCouponsApi();

      setImpact(impactRes.data);
      setCoupons(couponRes.data);
    } catch (error) {
      toast.error("Failed to load donor dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const totalMoneyDonated = impact?.totalDonated || 0;
  const couponsEarned = coupons.length;
  const mealsSponsored = impact?.mealsSponsored || 0;
  const activeDonations = impact?.activeDonations || 0;

  return (
    <DashboardLayout>
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900">
          Donor Dashboard 💚
        </h1>

        <p className="text-gray-600 mt-2">
          Track your donations, coupons, and the impact you created.
        </p>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="mt-10 bg-white shadow-md rounded-2xl p-10 text-center border border-gray-100">
          <p className="text-gray-600 font-semibold text-lg">
            Loading donor dashboard...
          </p>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            <StatCard
              title="Money Donated"
              value={`₹ ${totalMoneyDonated}`}
              subtitle="Total contribution"
              icon={<FaRupeeSign />}
            />

            <StatCard
              title="Coupons Earned"
              value={couponsEarned}
              subtitle="Redeemable coupons"
              icon={<FaTicketAlt />}
            />

            <StatCard
              title="Meals Sponsored"
              value={`${mealsSponsored}+`}
              subtitle="Estimated meals funded"
              icon={<FaHandsHelping />}
            />

            <StatCard
              title="Active Donations"
              value={activeDonations}
              subtitle="Currently in progress"
              icon={<FaChartLine />}
            />
          </div>

          {/* Contribution Card */}
          <div className="mt-12 bg-white shadow-md rounded-2xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900">
              Your Contribution 🌍
            </h2>

            <p className="text-gray-600 mt-3 leading-relaxed">
              Thank you for supporting{" "}
              <span className="font-semibold text-green-700">
                Feeding Hands
              </span>
              . Your donations are directly helping NGOs provide meals to people
              in need.
            </p>

            <div className="mt-6 bg-green-50 border border-green-100 rounded-xl p-5">
              <p className="text-gray-700 font-semibold">
                ✨ Every donation creates real impact.
              </p>

              <p className="text-sm text-gray-600 mt-2">
                Keep donating, earn coupons, and help us reduce food waste and
                hunger.
              </p>
            </div>
          </div>

          {/* Coupon Preview */}
          <div className="mt-12 bg-white shadow-md rounded-2xl p-8 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">
              Latest Coupons 🎟️
            </h2>

            {coupons.length === 0 ? (
              <p className="text-gray-600 mt-4">
                No coupons earned yet. Donate money to earn coupons.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
                {coupons.slice(0, 6).map((coupon) => (
                  <div
                    key={coupon._id}
                    className="p-5 rounded-2xl border border-gray-100 shadow-sm bg-gradient-to-br from-green-50 to-white"
                  >
                    <h3 className="text-lg font-bold text-green-700">
                      {coupon.code}
                    </h3>

                    <p className="text-gray-600 text-sm mt-2">
                      Discount:{" "}
                      <span className="font-semibold text-gray-800">
                        {coupon.discount}%
                      </span>
                    </p>

                    <p className="text-gray-500 text-xs mt-3">
                      Expiry:{" "}
                      {coupon.expiryDate
                        ? new Date(coupon.expiryDate).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default DonorDashboard;

