import { useState } from "react";
import api from "../../services/api";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaUser, FaEnvelope, FaLock, FaUsers } from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    role: "DONOR",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const registerHandler = async (e) => {
    e.preventDefault();

    try {
      await api.post("/user/register", formData);

      toast.success("Registered Successfully 🎉");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 bg-gradient-to-b from-green-50 via-white to-white">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-200 rounded-full blur-3xl opacity-40 -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-300 rounded-full blur-3xl opacity-30 -z-10"></div>

      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl shadow-xl border border-gray-100 rounded-3xl p-8">
        <h1 className="text-3xl font-extrabold text-center text-gray-900">
          Create Account ✨
        </h1>

        <p className="text-center text-gray-600 mt-2">
          Join{" "}
          <span className="font-semibold text-green-600">Feeding Hands</span>{" "}
          today
        </p>

        <form onSubmit={registerHandler} className="flex flex-col gap-5 mt-8">
          {/* Fullname */}
          <div className="relative">
            <FaUser className="absolute top-4 left-4 text-gray-400" />
            <input
              type="text"
              placeholder="Full Name"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full border border-gray-200 p-3 pl-12 rounded-xl outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
              required
            />
          </div>

          {/* Username */}
          <div className="relative">
            <FaUser className="absolute top-4 left-4 text-gray-400" />
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border border-gray-200 p-3 pl-12 rounded-xl outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute top-4 left-4 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-200 p-3 pl-12 rounded-xl outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute top-4 left-4 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-200 p-3 pl-12 rounded-xl outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
              required
            />
          </div>

          {/* Role */}
          <div className="relative">
            <FaUsers className="absolute top-4 left-4 text-gray-400" />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-gray-200 p-3 pl-12 rounded-xl outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition bg-white"
            >
              <option value="ADMIN">ADMIN</option>
              <option value="HOTEL">HOTEL</option>
              <option value="NGO">NGO</option>
              <option value="VOLUNTEER">VOLUNTEER</option>
              <option value="DONOR">DONOR</option>
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition shadow-md"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

        <p className="text-center text-gray-400 text-sm mt-6">
          Your account is secured with JWT authentication 🔒
        </p>
      </div>
    </div>
  );
};

export default Register;
