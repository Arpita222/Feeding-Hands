import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import StatCard from "../../components/StatCard";
import DonationTable from "../../components/DonationTable";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import {
  FaBoxOpen,
  FaCheckCircle,
  FaUtensils,
  FaArrowRight,
} from "react-icons/fa";

import {
  getAvailableDonationsApi,
  getNgoRequestsApi,
} from "../../services/donationApi";

import { getPersonalImpactApi } from "../../services/impactApi";

const NgoDashboard = () => {
  const [availableDonations, setAvailableDonations] = useState([]);
  const [ngoRequests, setNgoRequests] = useState([]);
  const [impact, setImpact] = useState(null);

  const [loading, setLoading] = useState(true);

  const fetchNgoDashboardData = async () => {
    try {
      setLoading(true);

      const availableRes = await getAvailableDonationsApi();
      const requestsRes = await getNgoRequestsApi();
      const impactRes = await getPersonalImpactApi();

      setAvailableDonations(availableRes.data || []);
      setNgoRequests(requestsRes.data || []);
      setImpact(impactRes.data);
    } catch (error) {
      toast.error("Failed to load NGO dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNgoDashboardData();
  }, []);

  // show last 5 donations only
  const recentNgoRequests = ngoRequests.slice(0, 5);

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            NGO Dashboard 🤝
          </h1>

          <p className="text-gray-600 mt-2">
            Browse available donations and manage your distribution requests.
          </p>
        </div>

        {/* Quick Button */}
        <Link
          to="/ngo/donations"
          className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition shadow-md"
        >
          View Available Donations <FaArrowRight />
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
              title="Available Donations"
              value={availableDonations.length}
              subtitle="Fresh donations ready to reserve"
              icon={<FaBoxOpen />}
            />

            <StatCard
              title="Total Requests"
              value={impact?.totalDonations || 0}
              subtitle="Total donations reserved by your NGO"
              icon={<FaCheckCircle />}
            />

            <StatCard
              title="Delivered Donations"
              value={impact?.deliveredDonations || 0}
              subtitle="Successfully distributed donations"
              icon={<FaCheckCircle />}
            />

            <StatCard
              title="Meals Distributed"
              value={impact?.deliveredMeals || 0}
              subtitle="Total meals delivered successfully"
              icon={<FaUtensils />}
            />
          </div>

          {/* Donation Table */}
          <div className="mt-12">
            <DonationTable
              donations={recentNgoRequests}
              title="My Recent Requests"
            />
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default NgoDashboard;



