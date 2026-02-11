import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import StatCard from "../../components/StatCard";
import DonationTable from "../../components/DonationTable";
import toast from "react-hot-toast";
import { FaPlusCircle, FaClipboardList, FaTruck, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

import { getMyDonationsApi } from "../../services/donationApi";
import { getPersonalImpactApi } from "../../services/impactApi";

const HotelDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [impact, setImpact] = useState(null);

  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const donationsRes = await getMyDonationsApi();
      const impactRes = await getPersonalImpactApi();

      setDonations(donationsRes.data || []);
      setImpact(impactRes.data);
    } catch (error) {
      toast.error("Failed to fetch hotel dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Hotel Dashboard 🏨
          </h1>

          <p className="text-gray-600 mt-2">
            Create donations and track pickup status in real-time.
          </p>
        </div>

        {/* Quick Action */}
        <Link
          to="/hotel/create-donation"
          className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition shadow-md"
        >
          <FaPlusCircle /> Create Donation
        </Link>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="mt-10 bg-white shadow-md rounded-2xl p-10 text-center border border-gray-100">
          <p className="text-gray-600 font-semibold text-lg">
            Loading dashboard...
          </p>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            <StatCard
              title="Total Donations"
              value={impact?.totalDonations || 0}
              subtitle="Created by your hotel"
              icon={<FaClipboardList />}
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
              subtitle="Available / Reserved / Assigned"
              icon={<FaTruck />}
            />

            <StatCard
              title="Total Meals Donated"
              value={impact?.totalMeals || 0}
              subtitle="Total quantity shared"
              icon={<FaTruck />}
            />
          </div>

          {/* Donation Table */}
          <div className="mt-12">
            <DonationTable donations={donations} title="My Recent Donations" />
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default HotelDashboard;

