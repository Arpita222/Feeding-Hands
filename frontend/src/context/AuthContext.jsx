import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import socket from "../services/socket";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loginUser = async (formData) => {
    const res = await api.post("/user/login", formData, {
      withCredentials: true,
    });

    setUser(res.data.data.user);

    return res.data.data;
  };

  const logoutUser = async () => {
    try {
      await api.post("/user/logout", {}, { withCredentials: true });

      //disconnect socket when user logs out
      socket.disconnect();

      setUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const getCurrentUser = async () => {
    try {
      const res = await api.get("/user/current-user", {
        withCredentials: true,
      });

      setUser(res.data.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  //fetch current user when app loads
  useEffect(() => {
    getCurrentUser();
  }, []);

  //socket connection when user is available
  useEffect(() => {
    if (user?._id) {
      socket.connect();

      //join room with userId
      socket.emit("joinRoom", user._id);

      console.log("Socket connected for user:", user._id);

      //listen for notifications
      socket.on("newNotification", (notification) => {
        toast.success(`${notification.title}: ${notification.message}`);
      });
    }

    return () => {
      socket.off("newNotification");
    };
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
