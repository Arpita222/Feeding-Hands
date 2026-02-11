import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/common/Home";
import About from "./pages/common/About";
import Contact from "./pages/common/Contact";
import NotFound from "./pages/common/NotFound";
import Notifications from "./pages/common/Notifications";
import Profile from "./pages/common/Profile";
import Settings from "./pages/common/Settings";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";

// Dashboards
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import NgoDashboard from "./pages/dashboards/NgoDashboard";
import VolunteerDashboard from "./pages/dashboards/VolunteerDashboard";
import DonorDashboard from "./pages/dashboards/DonorDashboard";
import HotelDashboard from "./pages/dashboards/HotelDashboard";

// Admin Pages
import AdminUsers from "./pages/admin/AdminUsers";
import AdminDonations from "./pages/admin/AdminDonations";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AssignVolunteer from "./pages/admin/AssignVolunteer";

// NGO Pages
import NgoDonations from "./pages/ngo/NgoDonations";
import NgoRequests from "./pages/ngo/NgoRequests";
import NgoNotifications from "./pages/ngo/NgoNotifications";
import NgoDeliveries from "./pages/ngo/NgoDeliveries";

// Hotel Pages
import HotelCreateDonation from "./pages/hotel/HotelCreateDonation";
import HotelDonations from "./pages/hotel/HotelDonations";
import HotelNotifications from "./pages/hotel/HotelNotifications";

// Volunteer Pages
import VolunteerPickups from "./pages/volunteer/VolunteerPickups";
import VolunteerHistory from "./pages/volunteer/VolunteerHistory";
import VolunteerNotifications from "./pages/volunteer/VolunteerNotifications";

// Donor Pages
import DonorDonate from "./pages/donor/DonorDonate";
import DonorCoupons from "./pages/donor/DonorCoupons";
import DonorImpact from "./pages/donor/DonorImpact";

const App = () => {
  return (
    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />

      <Route
        path="/about"
        element={
          <MainLayout>
            <About />
          </MainLayout>
        }
      />

      <Route
        path="/contact"
        element={
          <MainLayout>
            <Contact />
          </MainLayout>
        }
      />

      {/* ================= AUTH ROUTES ================= */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ================= COMMON PROTECTED ROUTES ================= */}
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      {/* ================= ADMIN ROUTES ================= */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["ADMIN"]}>
              <AdminUsers />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/donations"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["ADMIN"]}>
              <AdminDonations />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/analytics"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["ADMIN"]}>
              <AdminAnalytics />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/assign-volunteer"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["ADMIN"]}>
              <AssignVolunteer />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      {/* ================= HOTEL ROUTES ================= */}
      <Route
        path="/hotel"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["HOTEL"]}>
              <HotelDashboard />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/hotel/create-donation"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["HOTEL"]}>
              <HotelCreateDonation />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/hotel/donations"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["HOTEL"]}>
              <HotelDonations />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/hotel/notifications"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["HOTEL"]}>
              <HotelNotifications />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      {/* ================= NGO ROUTES ================= */}
      <Route
        path="/ngo"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["NGO"]}>
              <NgoDashboard />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/ngo/donations"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["NGO"]}>
              <NgoDonations />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/ngo/requests"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["NGO"]}>
              <NgoRequests />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/ngo/deliveries"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["NGO"]}>
              <NgoDeliveries />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/ngo/notifications"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["NGO"]}>
              <NgoNotifications />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      {/* ================= VOLUNTEER ROUTES ================= */}
      <Route
        path="/volunteer"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["VOLUNTEER"]}>
              <VolunteerDashboard />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/volunteer/pickups"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["VOLUNTEER"]}>
              <VolunteerPickups />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/volunteer/history"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["VOLUNTEER"]}>
              <VolunteerHistory />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/volunteer/notifications"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["VOLUNTEER"]}>
              <VolunteerNotifications />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      {/* ================= DONOR ROUTES ================= */}
      <Route
        path="/donor"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["DONOR"]}>
              <DonorDashboard />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/donor/donate"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["DONOR"]}>
              <DonorDonate />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/donor/coupons"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["DONOR"]}>
              <DonorCoupons />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/donor/impact"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["DONOR"]}>
              <DonorImpact />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      {/* ================= NOT FOUND ================= */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
