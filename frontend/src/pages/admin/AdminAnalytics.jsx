import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getAllDonationsApi } from "../../services/donationApi";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import toast from "react-hot-toast";

const AdminAnalytics = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDonations = async () => {
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
    fetchDonations();
  }, []);

  const total = donations.length;

  const available = donations.filter((d) => d.status === "AVAILABLE").length;
  const reserved = donations.filter((d) => d.status === "RESERVED").length;
  const assigned = donations.filter((d) => d.status === "ASSIGNED").length;
  const picked = donations.filter((d) => d.status === "PICKED").length;
  const delivered = donations.filter((d) => d.status === "DELIVERED").length;
  const expired = donations.filter((d) => d.status === "EXPIRED").length;

  const active = available + reserved + assigned + picked;

  const deliveryRate = total === 0 ? 0 : Math.round((delivered / total) * 100);

  const statusData = [
    { name: "AVAILABLE", value: available },
    { name: "RESERVED", value: reserved },
    { name: "ASSIGNED", value: assigned },
    { name: "PICKED", value: picked },
    { name: "DELIVERED", value: delivered },
    { name: "EXPIRED", value: expired },
  ];

  const COLORS = [
    "#3B82F6",
    "#F59E0B",
    "#8B5CF6",
    "#10B981",
    "#22C55E",
    "#EF4444",
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Admin Analytics Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Monitor donation flow, delivery success rate, and platform impact.
          </p>
        </div>

        <div className="mt-4 md:mt-0 bg-gray-100 px-5 py-3 rounded-xl">
          <p className="text-gray-700 font-semibold">
            Delivery Success Rate:{" "}
            <span className="text-green-600">{deliveryRate}%</span>
          </p>
        </div>
      </div>

      {loading ? (
        <p className="mt-10 text-gray-600 font-semibold">
          Loading analytics...
        </p>
      ) : (
        <>
          {/* TOP STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg rounded-2xl p-6">
              <h2 className="text-lg font-semibold opacity-90">
                Total Donations
              </h2>
              <p className="text-4xl font-bold mt-3">{total}</p>
              <p className="text-sm mt-2 opacity-80">
                Total donations created on platform
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg rounded-2xl p-6">
              <h2 className="text-lg font-semibold opacity-90">
                Delivered Donations
              </h2>
              <p className="text-4xl font-bold mt-3">{delivered}</p>
              <p className="text-sm mt-2 opacity-80">
                Successfully completed deliveries
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg rounded-2xl p-6">
              <h2 className="text-lg font-semibold opacity-90">
                Active Donations
              </h2>
              <p className="text-4xl font-bold mt-3">{active}</p>
              <p className="text-sm mt-2 opacity-80">
                Pending donations in workflow
              </p>
            </div>
          </div>

          {/* EXTRA SUMMARY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <div className="bg-white shadow-md rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-800">
                Donation Summary
              </h2>

              <div className="mt-5 space-y-3">
                <div className="flex justify-between text-gray-700 font-semibold">
                  <span>Available</span>
                  <span>{available}</span>
                </div>

                <div className="flex justify-between text-gray-700 font-semibold">
                  <span>Reserved</span>
                  <span>{reserved}</span>
                </div>

                <div className="flex justify-between text-gray-700 font-semibold">
                  <span>Assigned</span>
                  <span>{assigned}</span>
                </div>

                <div className="flex justify-between text-gray-700 font-semibold">
                  <span>Picked</span>
                  <span>{picked}</span>
                </div>

                <div className="flex justify-between text-gray-700 font-semibold">
                  <span>Expired</span>
                  <span className="text-red-600">{expired}</span>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-800">
                Platform Impact
              </h2>

              <div className="mt-6">
                <p className="text-gray-600">
                  This section shows how efficiently donations are being
                  completed.
                </p>

                <div className="mt-6 bg-gray-100 rounded-xl p-4">
                  <p className="text-gray-700 font-semibold">
                    Delivery Completion Rate:
                  </p>
                  <p className="text-4xl font-bold text-green-600 mt-2">
                    {deliveryRate}%
                  </p>
                </div>

                <div className="mt-4 bg-gray-100 rounded-xl p-4">
                  <p className="text-gray-700 font-semibold">
                    Expiry Risk Donations:
                  </p>
                  <p className="text-3xl font-bold text-red-600 mt-2">
                    {expired}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* BAR CHART */}
          <div className="bg-white shadow-md rounded-2xl p-6 mt-10">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Donation Status Flow (Bar Chart)
            </h2>

            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />

                  <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                    {statusData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* PIE CHART */}
          <div className="bg-white shadow-md rounded-2xl p-6 mt-10">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Donation Status Distribution (Pie Chart)
            </h2>

            <div className="w-full h-96 flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={140}
                    innerRadius={70}
                    label
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default AdminAnalytics;
