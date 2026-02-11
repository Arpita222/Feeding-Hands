import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getAllUsersApi } from "../../services/userApi";
import toast from "react-hot-toast";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await getAllUsersApi();
      setUsers(res.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers =
    roleFilter === "ALL"
      ? users
      : users.filter((user) => user.role === roleFilter);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-gray-800">Manage Users</h1>
      <p className="text-gray-600 mt-2">
        Admin can view all registered users role-wise.
      </p>

      <div className="mt-6 flex gap-3 items-center">
        <label className="font-semibold text-gray-700">Filter:</label>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border p-2 rounded-lg"
        >
          <option value="ALL">All</option>
          <option value="ADMIN">Admin</option>
          <option value="HOTEL">Hotel</option>
          <option value="NGO">NGO</option>
          <option value="VOLUNTEER">Volunteer</option>
          <option value="DONOR">Donor</option>
        </select>
      </div>

      {loading ? (
        <p className="mt-8 text-gray-600 font-semibold">Loading users...</p>
      ) : filteredUsers.length === 0 ? (
        <p className="mt-8 text-gray-600 font-semibold">No users found.</p>
      ) : (
        <div className="overflow-x-auto mt-8 bg-white shadow rounded-xl">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-4">Full Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Username</th>
                <th className="p-4">Role</th>
                <th className="p-4">Created At</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="border-t hover:bg-gray-50">
                  <td className="p-4 font-semibold text-gray-800">
                    {user.fullname}
                  </td>
                  <td className="p-4 text-gray-600">{user.email}</td>
                  <td className="p-4 text-gray-600">{user.username}</td>
                  <td className="p-4 font-semibold text-purple-600">
                    {user.role}
                  </td>
                  <td className="p-4 text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminUsers;

