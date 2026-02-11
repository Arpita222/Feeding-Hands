import api from "./api";

// ADMIN
export const getGlobalImpactApi = async () => {
  const res = await api.get("/impact/global", { withCredentials: true });
  return res.data;
};

// HOTEL / NGO / VOLUNTEER
export const getPersonalImpactApi = async () => {
  const res = await api.get("/impact/personal", { withCredentials: true });
  return res.data;
};
