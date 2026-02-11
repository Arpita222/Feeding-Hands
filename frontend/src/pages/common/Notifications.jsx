import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import toast from "react-hot-toast";
import {
  getNotificationsApi,
  markAllNotificationsReadApi,
  markNotificationReadApi,
} from "../../services/notificationApi";

import { FaBell, FaCheckCircle } from "react-icons/fa";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await getNotificationsApi();
      setNotifications(res.data);
    } catch (error) {
      toast.error("Failed to fetch notifications");
    } finally {
      setLoading(false);
    }
  };

  const markAsReadHandler = async (id) => {
    try {
      await markNotificationReadApi(id);
      toast.success("Notification marked as read");
      fetchNotifications();
    } catch (error) {
      toast.error("Failed to mark as read");
    }
  };

  const markAllReadHandler = async () => {
    try {
      await markAllNotificationsReadApi();
      toast.success("All notifications marked as read");
      fetchNotifications();
    } catch (error) {
      toast.error("Failed to mark all as read");
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <FaBell className="text-green-600" />
            Notifications
          </h1>

          <p className="text-gray-600 mt-2">
            View system alerts, donation updates and important messages.
          </p>
        </div>

        <button
          onClick={markAllReadHandler}
          className="bg-green-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-green-700 transition shadow-md"
        >
          Mark All Read
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <p className="mt-10 text-gray-600 font-semibold">Loading...</p>
      ) : notifications.length === 0 ? (
        <div className="mt-10 bg-white shadow-md rounded-2xl p-8 border border-gray-100 text-center">
          <h2 className="text-xl font-bold text-gray-900">
            No Notifications Found
          </h2>
          <p className="text-gray-600 mt-2">
            You don’t have any alerts or messages right now.
          </p>
        </div>
      ) : (
        <div className="mt-10 flex flex-col gap-5">
          {notifications.map((n) => (
            <div
              key={n._id}
              className={`p-6 rounded-2xl shadow-md border flex flex-col md:flex-row md:justify-between md:items-start gap-4 transition ${
                n.isRead
                  ? "bg-gray-50 border-gray-200"
                  : "bg-white border-green-400"
              }`}
            >
              {/* Left Content */}
              <div>
                <h2 className="text-lg font-bold text-gray-900">{n.title}</h2>

                <p className="text-gray-600 mt-2 leading-relaxed">
                  {n.message}
                </p>

                <p className="text-sm text-gray-500 mt-3">
                  {new Date(n.createdAt).toLocaleString()}
                </p>

                {/* Badge */}
                <div className="mt-3">
                  {n.isRead ? (
                    <span className="inline-flex items-center gap-2 px-3 py-1 text-sm rounded-full bg-gray-200 text-gray-700 font-semibold">
                      <FaCheckCircle className="text-gray-600" />
                      Read
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 px-3 py-1 text-sm rounded-full bg-green-100 text-green-700 font-semibold">
                      <FaBell className="text-green-600" />
                      New
                    </span>
                  )}
                </div>
              </div>

              {/* Right Button */}
              {!n.isRead && (
                <button
                  onClick={() => markAsReadHandler(n._id)}
                  className="bg-green-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-green-700 transition shadow-md w-full md:w-auto"
                >
                  Mark Read
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Notifications;
