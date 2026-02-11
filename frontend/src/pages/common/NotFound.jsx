import { Link } from "react-router-dom";
import { FaArrowLeft, FaHome } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white px-6">
      <div className="max-w-2xl text-center bg-white shadow-lg rounded-2xl p-10 border border-gray-100">
        <h1 className="text-7xl font-extrabold text-green-600">404</h1>

        <h2 className="mt-4 text-3xl font-bold text-gray-900">
          Oops! Page Not Found
        </h2>

        <p className="mt-4 text-gray-600 text-lg leading-relaxed">
          The page you are looking for doesn’t exist or may have been moved.
          Don’t worry, you can go back to the homepage.
        </p>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition shadow-md"
          >
            <FaHome />
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 border border-green-600 text-green-600 rounded-xl font-semibold hover:bg-green-600 hover:text-white transition shadow-md"
          >
            <FaArrowLeft />
            Go Back
          </button>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          Feeding Hands • Reducing Food Waste • Helping Communities
        </p>
      </div>
    </div>
  );
};

export default NotFound;

