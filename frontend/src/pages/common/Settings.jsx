import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import toast from "react-hot-toast";
import { FaCog, FaMoon, FaBell, FaShieldAlt } from "react-icons/fa";

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const saveHandler = () => {
    toast.success("Settings saved successfully ✅");
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            <FaCog className="text-green-600" /> Settings
          </h1>

          <p className="text-gray-600 mt-2">
            Manage your preferences and account options.
          </p>
        </div>

        <button
          onClick={saveHandler}
          className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition shadow-md"
        >
          Save Changes
        </button>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {/* Notifications */}
        <div className="bg-white shadow-md rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <FaBell className="text-green-600" /> Notifications
          </h2>

          <p className="text-gray-600 text-sm mt-2">
            Enable or disable system notifications.
          </p>

          <div className="mt-6 flex justify-between items-center">
            <p className="font-semibold text-gray-700">
              Receive Notifications
            </p>

            <button
              onClick={() => setNotifications(!notifications)}
              className={`px-5 py-2 rounded-xl font-semibold transition ${
                notifications
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {notifications ? "Enabled" : "Disabled"}
            </button>
          </div>
        </div>

        {/* Dark Mode */}
        <div className="bg-white shadow-md rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <FaMoon className="text-green-600" /> Appearance
          </h2>

          <p className="text-gray-600 text-sm mt-2">
            Toggle theme preferences.
          </p>

          <div className="mt-6 flex justify-between items-center">
            <p className="font-semibold text-gray-700">Dark Mode</p>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`px-5 py-2 rounded-xl font-semibold transition ${
                darkMode
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {darkMode ? "Enabled" : "Disabled"}
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            ⚠ Currently UI theme is static. This is just a frontend toggle demo.
          </p>
        </div>

        {/* Security */}
        <div className="bg-white shadow-md rounded-2xl border border-gray-100 p-6 md:col-span-2">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <FaShieldAlt className="text-green-600" /> Security
          </h2>

          <p className="text-gray-600 text-sm mt-2">
            Security options will be added in future updates.
          </p>

          <div className="mt-6 bg-green-50 border border-green-100 rounded-xl p-5">
            <p className="text-gray-700 font-semibold">
              JWT Authentication Enabled ✅
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Your account is secured using role-based JWT authentication.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
