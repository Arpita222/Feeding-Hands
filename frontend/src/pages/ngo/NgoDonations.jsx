import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DonationCard from "../../components/DonationCard";
import {
  acceptDonationApi,
  getAvailableDonationsApi,
} from "../../services/donationApi";
import toast from "react-hot-toast";
import { FaSearch, FaSyncAlt, FaHandsHelping } from "react-icons/fa";

const NgoDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [acceptLoading, setAcceptLoading] = useState(null);

const fetchAvailableDonations = async () => {
  try {
    setLoading(true);
    const res = await getAvailableDonationsApi();
    console.log("AVAILABLE DONATIONS RESPONSE:", res);
    setDonations(res.data || []);
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to fetch donations");
  } finally {
    setLoading(false);
  }
};


  const acceptHandler = async (id) => {
    try {
      setAcceptLoading(id);

      const res = await acceptDonationApi(id);

      toast.success(res.message || "Donation accepted successfully");
      fetchAvailableDonations();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to accept donation");
    } finally {
      setAcceptLoading(null);
    }
  };

  useEffect(() => {
    fetchAvailableDonations();
  }, []);

  // filter donations based on search
  const filteredDonations = donations.filter((donation) =>
    donation.foodName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            <FaHandsHelping className="text-green-600" /> Available Donations
          </h1>

          <p className="text-gray-600 mt-2">
            Browse donations created by hotels and reserve them for your NGO.
          </p>

          <p className="text-sm text-gray-500 mt-2">
            Total Available:{" "}
            <span className="font-semibold text-green-600">
              {donations.length}
            </span>
          </p>
        </div>

        <button
          onClick={fetchAvailableDonations}
          className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition shadow-md"
        >
          <FaSyncAlt /> Refresh
        </button>
      </div>

      {/* Search */}
      <div className="mt-10 bg-white shadow-md rounded-2xl border border-gray-100 p-5 flex items-center gap-3">
        <FaSearch className="text-gray-400" />
        <input
          type="text"
          placeholder="Search by food name (Ex: Rice, Biryani...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none text-gray-700"
        />
      </div>

      {/* Donation List */}
      {loading ? (
        <div className="mt-10 bg-white shadow-md rounded-2xl p-10 text-center border border-gray-100">
          <p className="text-gray-600 font-semibold text-lg">
            Loading available donations...
          </p>
        </div>
      ) : filteredDonations.length === 0 ? (
        <div className="mt-10 bg-green-50 border border-green-100 rounded-2xl p-10 text-center">
          <h2 className="text-xl font-bold text-gray-900">
            No donations found 😔
          </h2>
          <p className="text-gray-600 mt-3 max-w-xl mx-auto">
            Either there are no available donations right now, or your search
            didn’t match any donation.
          </p>

          <button
            onClick={() => setSearch("")}
            className="mt-6 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition shadow-md"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {filteredDonations.map((donation) => (
            <DonationCard key={donation._id} donation={donation}>
              <button
                onClick={() => acceptHandler(donation._id)}
                disabled={acceptLoading === donation._id}
                className="w-full bg-green-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-green-700 transition shadow-md disabled:bg-gray-400"
              >
                {acceptLoading === donation._id
                  ? "Accepting..."
                  : "Accept Donation"}
              </button>
            </DonationCard>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default NgoDonations;
