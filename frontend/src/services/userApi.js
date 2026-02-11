import api from "./api";

export const getAllVolunteersApi = async () => {
  const res = await api.get("/user/volunteers", { withCredentials: true });
  return res.data;
};

export const getAllUsersApi = async () => {
  return await api.get("/user/all-users", { withCredentials: true });
};