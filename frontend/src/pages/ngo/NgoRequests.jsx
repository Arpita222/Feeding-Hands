import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DonationCard from "../../components/DonationCard";
import {
  deliverDonationApi,
  getNgoRequestsApi,
} from "../../services/donationApi";
import toast from "react-hot-toast";
import {
  FaSyncAlt,
  FaSearch,
  FaTruck,
  FaClipboardCheck,
} from "react-icons/fa";

const NgoRequests = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");

  const [deliverLoading, setDeliverLoading] = useState(null);

  const fetchNgoRequests = async () => {
    try {
      setLoading(true);
      const res = await getNgoRequestsApi();
      setDonations(res.data);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch NGO requests"
      );
    } finally {
      setLoading(false);
    }
  };

  const deliverHandler = async (id) => {
    try {
      setDeliverLoading(id);

      const res = await deliverDonationApi(id);
      toast.success(res.message || "Donation delivered successfully");

      fetchNgoRequests();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to deliver donation"
      );
    } finally {
      setDeliverLoading(null);
    }
  };

  useEffect(() => {
    fetchNgoRequests();
  }, []);

  // =========================
  // Filters + Search
  // =========================
  const filteredDonations = donations
    .filter((d) => {
      if (filterStatus === "ALL") return true;
      return d.status === filterStatus;
    })
    .filter((d) =>
      d.foodName.toLowerCase().includes(search.toLowerCase())
    );

  // =========================
  // Stats Count
  // =========================
  const reservedCount = donations.filter((d) => d.status === "RESERVED").length;
  const assignedCount = donations.filter((d) => d.status === "ASSIGNED").length;
  const pickedCount = donations.filter((d) => d.status === "PICKED").length;
  const deliveredCount = donations.filter((d) => d.status === "DELIVERED").length;

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            <FaTruck className="text-green-600" /> Pickup Requests
          </h1>

          <p className="text-gray-600 mt-2">
            Track donations accepted by your NGO and mark delivery once received.
          </p>
        </div>

        <button
          onClick={fetchNgoRequests}
          className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition shadow-md"
        >
          <FaSyncAlt /> Refresh
        </button>
      </div>

      {/* Status Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
        <div className="bg-white shadow-md rounded-2xl border border-gray-100 p-5 text-center">
          <p className="text-sm text-gray-500">Reserved</p>
          <h2 className="text-2xl font-extrabold text-yellow-600">
            {reservedCount}
          </h2>
        </div>

        <div className="bg-white shadow-md rounded-2xl border border-gray-100 p-5 text-center">
          <p className="text-sm text-gray-500">Assigned</p>
          <h2 className="text-2xl font-extrabold text-blue-600">
            {assignedCount}
          </h2>
        </div>

        <div className="bg-white shadow-md rounded-2xl border border-gray-100 p-5 text-center">
          <p className="text-sm text-gray-500">Picked</p>
          <h2 className="text-2xl font-extrabold text-purple-600">
            {pickedCount}
          </h2>
        </div>

        <div className="bg-white shadow-md rounded-2xl border border-gray-100 p-5 text-center">
          <p className="text-sm text-gray-500">Delivered</p>
          <h2 className="text-2xl font-extrabold text-green-600">
            {deliveredCount}
          </h2>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="mt-10 bg-white shadow-md rounded-2xl border border-gray-100 p-5 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        {/* Search */}
        <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 w-full md:w-[60%]">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by food name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none text-gray-700"
          />
        </div>

        {/* Filter */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-200 px-4 py-3 rounded-xl outline-none text-gray-700 w-full md:w-[40%]"
        >
          <option value="ALL">All Requests</option>
          <option value="RESERVED">Reserved</option>
          <option value="ASSIGNED">Assigned</option>
          <option value="PICKED">Picked</option>
          <option value="DELIVERED">Delivered</option>
        </select>
      </div>

      {/* List */}
      {loading ? (
        <div className="mt-10 bg-white shadow-md rounded-2xl p-10 text-center border border-gray-100">
          <p className="text-gray-600 font-semibold text-lg">
            Loading pickup requests...
          </p>
        </div>
      ) : filteredDonations.length === 0 ? (
        <div className="mt-10 bg-green-50 border border-green-100 rounded-2xl p-10 text-center">
          <h2 className="text-xl font-bold text-gray-900">
            No requests found 😔
          </h2>
          <p className="text-gray-600 mt-3 max-w-xl mx-auto">
            You haven’t accepted any donations yet, or your filter/search has no
            matching results.
          </p>

          <button
            onClick={() => {
              setSearch("");
              setFilterStatus("ALL");
            }}
            className="mt-6 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition shadow-md"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {filteredDonations.map((donation) => (
            <DonationCard key={donation._id} donation={donation}>
              {/* Status Highlight */}
              <div className="mt-4">
                <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FaClipboardCheck className="text-green-600" />
                  Current Status:{" "}
                  <span className="text-green-700">{donation.status}</span>
                </p>
              </div>

              {/* Mark Delivered Button */}
              {donation.status === "PICKED" && (
                <button
                  onClick={() => deliverHandler(donation._id)}
                  disabled={deliverLoading === donation._id}
                  className="mt-4 w-full bg-green-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-green-700 transition shadow-md disabled:bg-gray-400"
                >
                  {deliverLoading === donation._id
                    ? "Marking Delivered..."
                    : "Mark Delivered"}
                </button>
              )}

              {/* Delivered Info */}
              {donation.status === "DELIVERED" && (
                <div className="mt-4 bg-green-50 border border-green-100 text-green-700 text-sm font-semibold p-3 rounded-xl text-center">
                  ✅ Successfully Delivered
                </div>
              )}
            </DonationCard>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default NgoRequests;


