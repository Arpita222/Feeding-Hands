import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // jab tak current-user fetch ho raha hai, tab loader
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-green-50">
        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-700 font-semibold text-lg">
          Loading...
        </p>
      </div>
    );
  }

  // agar user login nahi hai
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
