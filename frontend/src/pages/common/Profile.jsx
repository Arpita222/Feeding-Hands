import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../layouts/DashboardLayout";
import { FaUserCircle, FaEnvelope, FaUserTag } from "react-icons/fa";

const Profile = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            My Profile 👤
          </h1>
          <p className="text-gray-600 mt-2">
            View your account details and role information.
          </p>
        </div>
      </div>

      <div className="mt-12 bg-white shadow-md rounded-2xl border border-gray-100 p-8 max-w-3xl">
        {/* Profile Header */}
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-green-600 text-white flex items-center justify-center text-4xl font-extrabold shadow-md">
            {user?.fullname?.charAt(0)?.toUpperCase()}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {user?.fullname}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Logged in as{" "}
              <span className="font-semibold text-green-600">
                {user?.role}
              </span>
            </p>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-5">
            <p className="text-gray-500 text-sm font-semibold flex items-center gap-2">
              <FaUserCircle /> Full Name
            </p>
            <h3 className="text-lg font-bold text-gray-900 mt-2">
              {user?.fullname}
            </h3>
          </div>

          <div className="bg-gray-50 border border-gray-100 rounded-xl p-5">
            <p className="text-gray-500 text-sm font-semibold flex items-center gap-2">
              <FaEnvelope /> Email
            </p>
            <h3 className="text-lg font-bold text-gray-900 mt-2">
              {user?.email}
            </h3>
          </div>

          <div className="bg-gray-50 border border-gray-100 rounded-xl p-5">
            <p className="text-gray-500 text-sm font-semibold flex items-center gap-2">
              <FaUserTag /> Role
            </p>
            <h3 className="text-lg font-bold text-gray-900 mt-2">
              {user?.role}
            </h3>
          </div>

          <div className="bg-green-50 border border-green-100 rounded-xl p-5">
            <p className="text-gray-600 text-sm font-semibold">
              Account Status
            </p>
            <h3 className="text-lg font-bold text-green-700 mt-2">
              Active ✅
            </h3>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
