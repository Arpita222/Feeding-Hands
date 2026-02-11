import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { redirectUserByRole } from "../../utils/redirectUser";
import toast from "react-hot-toast";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await loginUser(formData);

      // redirect based on role
      const redirectPath = redirectUserByRole(data?.user?.role);

      toast.success("Login successful 🎉");

      navigate(redirectPath);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 bg-gradient-to-b from-green-50 via-white to-white">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-200 rounded-full blur-3xl opacity-40 -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-300 rounded-full blur-3xl opacity-30 -z-10"></div>

      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl shadow-xl border border-gray-100 rounded-3xl p-8">
        <h1 className="text-3xl font-extrabold text-center text-gray-900">
          Welcome Back 👋
        </h1>

        <p className="text-center text-gray-600 mt-2">
          Login to continue with{" "}
          <span className="font-semibold text-green-600">Feeding Hands</span>
        </p>

        <form onSubmit={loginHandler} className="flex flex-col gap-5 mt-8">
          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute top-4 left-4 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={changeHandler}
              placeholder="Enter your email"
              className="w-full border border-gray-200 p-3 pl-12 rounded-xl outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute top-4 left-4 text-gray-400" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={changeHandler}
              placeholder="Enter your password"
              className="w-full border border-gray-200 p-3 pl-12 rounded-xl outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-green-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>

        {/* Extra */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Secure login powered by JWT + Cookies 🔒
        </p>
      </div>
    </div>
  );
};

export default Login;
