import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import StatCard from "../../components/StatCard";
import DonationTable from "../../components/DonationTable";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import { FaTruckPickup, FaCheckCircle, FaBox, FaArrowRight } from "react-icons/fa";

import { getAssignedDonationsApi } from "../../services/donationApi";
import { getPersonalImpactApi } from "../../services/impactApi";

const VolunteerDashboard = () => {
  const [assignedDonations, setAssignedDonations] = useState([]);
  const [impact, setImpact] = useState(null);

  const [loading, setLoading] = useState(true);

  const fetchVolunteerDashboardData = async () => {
    try {
      setLoading(true);

      const assignedRes = await getAssignedDonationsApi();
      const impactRes = await getPersonalImpactApi();

      setAssignedDonations(assignedRes.data || []);
      setImpact(impactRes.data);
    } catch (error) {
      toast.error("Failed to load volunteer dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVolunteerDashboardData();
  }, []);

  // show last 5 only
  const recentPickups = assignedDonations.slice(0, 5);

  // manual calculation for current tasks
  const assignedPickups = assignedDonations.filter(
    (d) => d.status === "ASSIGNED"
  ).length;

  const pickedDonations = assignedDonations.filter(
    (d) => d.status === "PICKED"
  ).length;

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Volunteer Dashboard 🚚
          </h1>

          <p className="text-gray-600 mt-2">
            Track assigned pickups and complete deliveries efficiently.
          </p>
        </div>

        <Link
          to="/volunteer/pickups"
          className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition shadow-md"
        >
          View Assigned Pickups <FaArrowRight />
        </Link>
      </div>

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
              title="Assigned Pickups"
              value={assignedPickups}
              subtitle="Donations waiting for pickup"
              icon={<FaTruckPickup />}
            />

            <StatCard
              title="Picked Donations"
              value={pickedDonations}
              subtitle="Picked and in delivery process"
              icon={<FaBox />}
            />

            <StatCard
              title="Total Deliveries"
              value={impact?.deliveredDonations || 0}
              subtitle="All time delivered donations"
              icon={<FaCheckCircle />}
            />

            <StatCard
              title="Meals Delivered"
              value={impact?.deliveredMeals || 0}
              subtitle="Total meals delivered by you"
              icon={<FaCheckCircle />}
            />
          </div>

          {/* Table */}
          <div className="mt-12">
            <DonationTable donations={recentPickups} title="My Assigned Pickups" />
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default VolunteerDashboard;
