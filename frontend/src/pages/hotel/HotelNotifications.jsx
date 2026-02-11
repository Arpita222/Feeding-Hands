import { Link } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { FaBell, FaArrowRight, FaHotel } from "react-icons/fa";

const HotelNotifications = () => {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            <FaBell className="text-green-600" /> Hotel Notifications
          </h1>

          <p className="text-gray-600 mt-2">
            View donation alerts, NGO reservations, and pickup updates.
          </p>
        </div>

        {/* Button */}
        <Link
          to="/notifications"
          className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition shadow-md"
        >
          View All Notifications <FaArrowRight />
        </Link>
      </div>

      {/* Info Card */}
      <div className="mt-10 bg-white shadow-md rounded-2xl border border-gray-100 p-8">
        <div className="flex items-start gap-4">
          <div className="p-4 rounded-2xl bg-green-100 text-green-700 text-2xl">
            <FaHotel />
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Stay Updated in Real-Time
            </h2>

            <p className="text-gray-600 mt-2 leading-relaxed">
              Whenever an NGO accepts your donation or a volunteer pickup is
              assigned, you will instantly receive a notification.
            </p>

            <p className="text-gray-500 mt-3 text-sm">
              Tip: You can mark notifications as read to keep your dashboard
              clean.
            </p>
          </div>
        </div>
      </div>

      {/* Empty State UI */}
      <div className="mt-10 bg-green-50 border border-green-100 rounded-2xl p-10 text-center">
        <h3 className="text-xl font-bold text-gray-900">
          No new notifications right now 🔔
        </h3>

        <p className="text-gray-600 mt-3 max-w-xl mx-auto">
          Once you create donations, all updates will appear here automatically.
          Hotels get notified when NGOs reserve donations or volunteers pick them
          up.
        </p>

        <Link
          to="/hotel/create-donation"
          className="inline-block mt-6 px-8 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition shadow-md"
        >
          Create Donation
        </Link>
      </div>
    </DashboardLayout>
  );
};

export default HotelNotifications;
