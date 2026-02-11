import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import StatCard from "../../components/StatCard";
import DonationTable from "../../components/DonationTable";
import toast from "react-hot-toast";

import { getAllDonationsApi } from "../../services/donationApi";
import { getGlobalImpactApi } from "../../services/impactApi";

import {
  FaBoxOpen,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaUtensils,
  FaSyncAlt,
} from "react-icons/fa";

const AdminDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [impact, setImpact] = useState(null);

  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const donationsRes = await getAllDonationsApi();
      const impactRes = await getGlobalImpactApi();

      setDonations(donationsRes.data || []);
      setImpact(impactRes.data);
    } catch (error) {
      toast.error("Failed to load admin dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const deliveredPercent =
    impact?.totalDonations > 0
      ? Math.round((impact.deliveredDonations / impact.totalDonations) * 100)
      : 0;

  return (
    <DashboardLayout>
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-3xl shadow-lg p-8 flex flex-col md:flex-row justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold">Admin Dashboard 👨‍💻</h1>
          <p className="mt-2 text-green-100">
            Monitor global donation activity and platform performance.
          </p>

          <div className="mt-5 bg-white/20 rounded-xl px-5 py-3 inline-block">
            <p className="text-sm font-semibold">
              Delivery Success Rate:{" "}
              <span className="text-white font-bold">{deliveredPercent}%</span>
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-white/30 rounded-full h-2 mt-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-500"
                style={{ width: `${deliveredPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="flex items-start md:items-center">
          <button
            onClick={fetchDashboardData}
            className="flex items-center gap-2 bg-white text-green-700 px-6 py-3 rounded-2xl font-bold hover:bg-green-50 transition shadow-md"
          >
            <FaSyncAlt /> Refresh Data
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="mt-10 bg-white rounded-2xl shadow-md p-10 border border-gray-100 text-center">
          <p className="text-gray-600 font-semibold text-lg">
            Loading dashboard data...
          </p>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            <StatCard
              title="Total Donations"
              value={impact?.totalDonations || 0}
              subtitle="All donation records"
              icon={<FaBoxOpen />}
            />

            <StatCard
              title="Delivered Donations"
              value={impact?.deliveredDonations || 0}
              subtitle="Successfully completed"
              icon={<FaCheckCircle />}
            />

            <StatCard
              title="Active Donations"
              value={impact?.activeDonations || 0}
              subtitle="Ongoing donations"
              icon={<FaClock />}
            />

            <StatCard
              title="Expired Donations"
              value={impact?.expiredDonations || 0}
              subtitle="Not delivered on time"
              icon={<FaTimesCircle />}
            />

            <StatCard
              title="Total Meals Donated"
              value={impact?.totalMeals || 0}
              subtitle="Sum of all quantities"
              icon={<FaUtensils />}
            />

            <StatCard
              title="Meals Delivered"
              value={impact?.deliveredMeals || 0}
              subtitle="Meals successfully reached NGOs"
              icon={<FaCheckCircle />}
            />
          </div>

          {/* Table Section */}
          <div className="mt-14">
            <h2 className="text-2xl font-extrabold text-gray-900">
              Latest Donations 📦
            </h2>
            <p className="text-gray-600 mt-1">
              View the most recent donation activities across the platform.
            </p>

            <div className="mt-6">
              <DonationTable
                donations={donations.slice(0, 10)}
                title="Latest Donations"
              />
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default AdminDashboard;



