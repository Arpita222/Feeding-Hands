import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getMyImpactApi } from "../../services/donorApi";
import toast from "react-hot-toast";

import {
  FaHandHoldingHeart,
  FaTicketAlt,
  FaCheckCircle,
  FaChartPie,
} from "react-icons/fa";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const DonorImpact = () => {
  const [impact, setImpact] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchImpact = async () => {
    try {
      const res = await getMyImpactApi();
      setImpact(res.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch impact");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImpact();
  }, []);

  const redeemedPercent =
    impact && impact.totalCoupons > 0
      ? Math.round((impact.redeemedCoupons / impact.totalCoupons) * 100)
      : 0;

  const chartData = impact
    ? [
        { name: "Redeemed", value: impact.redeemedCoupons || 0 },
        {
          name: "Available",
          value: (impact.totalCoupons || 0) - (impact.redeemedCoupons || 0),
        },
      ]
    : [];

  const COLORS = ["#16a34a", "#d1d5db"]; // green + gray

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            <FaChartPie className="text-green-600" /> My Impact
          </h1>

          <p className="text-gray-600 mt-2">
            Track your donations, coupons, and overall contribution.
          </p>
        </div>

        <button
          onClick={fetchImpact}
          className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition shadow-md"
        >
          Refresh
        </button>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="mt-12 bg-white shadow-md rounded-2xl border border-gray-100 p-10 text-center">
          <p className="text-gray-600 font-semibold text-lg">
            Loading impact data...
          </p>
        </div>
      ) : !impact ? (
        <div className="mt-12 bg-green-50 border border-green-100 rounded-2xl p-10 text-center">
          <h2 className="text-xl font-bold text-gray-900">
            No impact found 🌱
          </h2>
          <p className="text-gray-600 mt-3 max-w-xl mx-auto">
            You haven’t made any donations yet. Start donating to see your
            impact.
          </p>
        </div>
      ) : (
        <>
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="bg-white shadow-md rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-green-100 text-green-700 text-xl">
                  <FaHandHoldingHeart />
                </div>

                <div>
                  <p className="text-gray-500 text-sm font-medium">
                    Total Money Donated
                  </p>
                  <h2 className="text-3xl font-extrabold text-gray-900 mt-2">
                    ₹{impact.totalMoney}
                  </h2>
                </div>
              </div>

              <p className="text-gray-600 text-sm mt-4">
                Your donations help provide food to needy people.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-green-100 text-green-700 text-xl">
                  <FaTicketAlt />
                </div>

                <div>
                  <p className="text-gray-500 text-sm font-medium">
                    Total Coupons Earned
                  </p>
                  <h2 className="text-3xl font-extrabold text-gray-900 mt-2">
                    {impact.totalCoupons}
                  </h2>
                </div>
              </div>

              <p className="text-gray-600 text-sm mt-4">
                Coupons are rewards for your contribution.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-green-100 text-green-700 text-xl">
                  <FaCheckCircle />
                </div>

                <div>
                  <p className="text-gray-500 text-sm font-medium">
                    Redeemed Coupons
                  </p>
                  <h2 className="text-3xl font-extrabold text-gray-900 mt-2">
                    {impact.redeemedCoupons}
                  </h2>
                </div>
              </div>

              <p className="text-gray-600 text-sm mt-4">
                You redeemed {redeemedPercent}% of your coupons.
              </p>
            </div>
          </div>

          {/* Progress + Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            {/* Progress Section */}
            <div className="bg-white shadow-md rounded-2xl border border-gray-100 p-8">
              <h2 className="text-xl font-bold text-gray-900">
                Coupon Utilization
              </h2>

              <p className="text-gray-600 mt-2 text-sm">
                Track how many coupons you used vs remaining.
              </p>

              <div className="mt-6">
                <div className="flex justify-between text-sm font-semibold text-gray-700">
                  <p>Redeemed</p>
                  <p>{redeemedPercent}%</p>
                </div>

                <div className="w-full h-4 bg-gray-200 rounded-full mt-3 overflow-hidden">
                  <div
                    className="h-full bg-green-600 rounded-full transition-all duration-500"
                    style={{ width: `${redeemedPercent}%` }}
                  ></div>
                </div>

                <div className="flex justify-between text-sm text-gray-500 mt-3">
                  <p>Redeemed: {impact.redeemedCoupons}</p>
                  <p>Remaining: {impact.totalCoupons - impact.redeemedCoupons}</p>
                </div>
              </div>

              <div className="mt-8 bg-green-50 border border-green-100 rounded-xl p-5">
                <h3 className="text-lg font-bold text-gray-900">
                  🌍 Your Contribution Matters
                </h3>
                <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                  Every rupee you donate helps Feeding Hands distribute food to
                  communities. Keep donating and inspiring others!
                </p>
              </div>
            </div>

            {/* Chart Section */}
            <div className="bg-white shadow-md rounded-2xl border border-gray-100 p-8">
              <h2 className="text-xl font-bold text-gray-900">
                Coupons Overview
              </h2>

              <p className="text-gray-600 mt-2 text-sm">
                Visual representation of redeemed vs available coupons.
              </p>

              <div className="mt-8 w-full h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default DonorImpact;
