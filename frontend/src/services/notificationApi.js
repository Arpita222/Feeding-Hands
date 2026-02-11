import api from "./api";

export const getNotificationsApi = async () => {
  const res = await api.get("/notifications", { withCredentials: true });
  return res.data;
};

export const markNotificationReadApi = async (id) => {
  const res = await api.patch(`/notifications/${id}/read`, {}, { withCredentials: true });
  return res.data;
};

export const markAllNotificationsReadApi = async () => {
  const res = await api.patch("/notifications/read-all", {}, { withCredentials: true });
  return res.data;
};
