import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import toast from "react-hot-toast";

import {
  getNotificationsApi,
  markAllNotificationsReadApi,
  markNotificationReadApi,
} from "../../services/notificationApi";

import { FaBell, FaCheckCircle, FaSyncAlt } from "react-icons/fa";

const VolunteerNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [markLoading, setMarkLoading] = useState(null);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await getNotificationsApi();
      setNotifications(res.data || []);
    } catch (error) {
      toast.error("Failed to fetch notifications");
    } finally {
      setLoading(false);
    }
  };

  const markAsReadHandler = async (id) => {
    try {
      setMarkLoading(id);
      await markNotificationReadApi(id);
      toast.success("Notification marked as read");
      fetchNotifications();
    } catch (error) {
      toast.error("Failed to mark as read");
    } finally {
      setMarkLoading(null);
    }
  };

  const markAllReadHandler = async () => {
    try {
      setMarkLoading("ALL");
      await markAllNotificationsReadApi();
      toast.success("All notifications marked as read");
      fetchNotifications();
    } catch (error) {
      toast.error("Failed to mark all as read");
    } finally {
      setMarkLoading(null);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const totalCount = notifications.length;

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            <FaBell className="text-green-600" /> Notifications
          </h1>

          <p className="text-gray-600 mt-2">
            View real-time updates and assigned pickup alerts.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={fetchNotifications}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-100 transition"
          >
            <FaSyncAlt /> Refresh
          </button>

          <button
            onClick={markAllReadHandler}
            disabled={markLoading === "ALL" || unreadCount === 0}
            className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition shadow-md disabled:bg-gray-400"
          >
            <FaCheckCircle />
            {markLoading === "ALL" ? "Marking..." : "Mark All Read"}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
        <div className="bg-white shadow-md rounded-2xl border border-gray-100 p-6">
          <p className="text-gray-500 text-sm font-medium">Total Notifications</p>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-2">
            {totalCount}
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            Includes system alerts and donation updates
          </p>
        </div>

        <div className="bg-white shadow-md rounded-2xl border border-gray-100 p-6">
          <p className="text-gray-500 text-sm font-medium">Unread</p>
          <h2 className="text-3xl font-extrabold text-green-600 mt-2">
            {unreadCount}
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            New alerts waiting for your action
          </p>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="mt-12 bg-white shadow-md rounded-2xl border border-gray-100 p-10 text-center">
          <p className="text-gray-600 font-semibold text-lg">
            Loading notifications...
          </p>
        </div>
      ) : notifications.length === 0 ? (
        <div className="mt-12 bg-green-50 border border-green-100 rounded-2xl p-10 text-center">
          <h2 className="text-xl font-bold text-gray-900">
            No notifications found 🔔
          </h2>
          <p className="text-gray-600 mt-3 max-w-xl mx-auto">
            You will receive alerts here when you are assigned a pickup or when
            donations update.
          </p>

          <button
            onClick={fetchNotifications}
            className="mt-6 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition shadow-md"
          >
            Refresh
          </button>
        </div>
      ) : (
        <div className="mt-12 flex flex-col gap-4">
          {notifications.map((n) => (
            <div
              key={n._id}
              className={`p-6 rounded-2xl shadow-md border flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 transition ${
                n.isRead
                  ? "bg-gray-50 border-gray-200"
                  : "bg-white border-green-500"
              }`}
            >
              <div>
                <h2 className="text-lg font-bold text-gray-900">{n.title}</h2>
                <p className="text-gray-600 mt-1">{n.message}</p>

                <p className="text-sm text-gray-500 mt-3">
                  {new Date(n.createdAt).toLocaleString()}
                </p>
              </div>

              {!n.isRead && (
                <button
                  onClick={() => markAsReadHandler(n._id)}
                  disabled={markLoading === n._id}
                  className="text-sm bg-green-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-green-700 transition shadow-sm disabled:bg-gray-400"
                >
                  {markLoading === n._id ? "Marking..." : "Mark Read"}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default VolunteerNotifications;
