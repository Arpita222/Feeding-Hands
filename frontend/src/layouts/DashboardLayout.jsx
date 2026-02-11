import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { sidebarLinks } from "../utils/sidebarLinks";
import toast from "react-hot-toast";

import {
  FaTachometerAlt,
  FaHandsHelping,
  FaBell,
  FaUsers,
  FaDonate,
  FaHistory,
  FaHotel,
  FaClipboardList,
  FaTruck,
  FaChartLine,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUserCircle,
  FaCog,
  FaChevronDown,
} from "react-icons/fa";

const iconMap = {
  Dashboard: <FaTachometerAlt />,
  "All Donations": <FaHandsHelping />,
  "Assign Volunteer": <FaTruck />,
  "Manage Users": <FaUsers />,
  Analytics: <FaChartLine />,
  Notifications: <FaBell />,

  "Create Donation": <FaClipboardList />,
  "My Donations": <FaHandsHelping />,

  "Available Donations": <FaHandsHelping />,
  "Deliver Donations": <FaTruck />,
  "Pickup Requests": <FaClipboardList />,

  "Assigned Pickups": <FaTruck />,
  "Completed Deliveries": <FaHistory />,

  "Donate Money": <FaDonate />,
  "My Coupons": <FaHotel />,
  Impact: <FaChartLine />,
};

const DashboardLayout = ({ children }) => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);

  const links = sidebarLinks[user?.role] || [];

  const logoutHandler = async () => {
    await logoutUser();
    navigate("/login");
  };

  // close sidebar when route changes (mobile)
  useEffect(() => {
    setOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-green-50 via-white to-white">
      {/* =========================
          SIDEBAR (DESKTOP)
      ========================= */}
      <aside className="hidden md:flex w-72 bg-white border-r border-gray-100 shadow-sm flex-col px-6 py-8">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-green-600 tracking-wide"
        >
          Feeding Hands
        </Link>

        {/* User Card */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-white border border-green-100 rounded-2xl p-4">
          <p className="text-gray-600 text-sm">Welcome 👋</p>
          <h3 className="font-bold text-gray-900 mt-1">{user?.fullname}</h3>

          <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
            {user?.role}
          </div>
        </div>

        {/* Links */}
        <nav className="mt-10 flex flex-col gap-2">
          {links.map((link) => {
            const isActive = location.pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition ${
                  isActive
                    ? "bg-green-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                }`}
              >
                <span className="text-lg">
                  {iconMap[link.name] || <FaHandsHelping />}
                </span>
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* NOTE: Logout removed from sidebar */}
      </aside>

      {/* =========================
          MOBILE TOP BAR
      ========================= */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm flex justify-between items-center px-5 py-4 z-50">
        <Link to="/" className="text-xl font-extrabold text-green-600">
          Feeding Hands
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className="text-gray-700 text-xl px-3 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* =========================
          MOBILE OVERLAY
      ========================= */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="md:hidden fixed inset-0 bg-black/40 z-40"
        ></div>
      )}

      {/* =========================
          MOBILE SIDEBAR DRAWER
      ========================= */}
      <div
        className={`md:hidden fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-6 py-6 border-b border-gray-100">
          <h2 className="text-xl font-extrabold text-green-600">
            Feeding Hands
          </h2>

          <div className="mt-6 bg-gradient-to-r from-green-50 to-white border border-green-100 rounded-2xl p-4">
            <p className="text-gray-600 text-sm">Welcome 👋</p>
            <h3 className="font-bold text-gray-900 mt-1">{user?.fullname}</h3>

            <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
              {user?.role}
            </div>
          </div>
        </div>

        <div className="px-6 py-6 flex flex-col gap-2">
          {links.map((link) => {
            const isActive = location.pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition ${
                  isActive
                    ? "bg-green-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                }`}
              >
                <span className="text-lg">
                  {iconMap[link.name] || <FaHandsHelping />}
                </span>
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* =========================
          MAIN CONTENT AREA
      ========================= */}
      <div className="flex-1 w-full">
        {/* Desktop Top Bar */}
        <div className="hidden md:flex justify-between items-center px-10 py-5 bg-white border-b border-gray-100 shadow-sm">
          <div>
            <h1 className="text-lg font-bold text-gray-900">
              {user?.role} Dashboard
            </h1>
            <p className="text-sm text-gray-500">
              Manage your donations and activities here
            </p>
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-50 transition border border-gray-200"
            >
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">
                  {user?.fullname}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>

              <div className="w-11 h-11 rounded-full bg-green-600 text-white flex items-center justify-center font-extrabold text-lg shadow-md">
                {user?.fullname?.charAt(0)?.toUpperCase()}
              </div>

              <FaChevronDown className="text-gray-500 text-sm" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden z-50">
                <div className="px-5 py-4 border-b border-gray-100">
                  <p className="text-sm font-bold text-gray-900">
                    {user?.fullname}
                  </p>
                  <p className="text-xs text-gray-500">{user?.role}</p>
                </div>

                <div className="p-2">
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/profile");
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-700 font-semibold transition"
                  >
                    <FaUserCircle />
                    Profile
                  </button>

                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/settings");
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-700 font-semibold transition"
                  >
                    <FaCog />
                    Settings
                  </button>

                  <button
                    onClick={logoutHandler}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 font-semibold transition"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Page Content */}
        <main className="p-6 md:p-10 mt-20 md:mt-0">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
