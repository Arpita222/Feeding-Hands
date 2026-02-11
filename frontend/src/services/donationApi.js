import api from "./api";

// HOTEL
export const createDonationApi = async (data) => {
  const res = await api.post("/donations", data, { withCredentials: true });
  return res.data;
};

export const getMyDonationsApi = async () => {
  const res = await api.get("/donations/my", { withCredentials: true });
  return res.data;
};

// NGO
export const getAvailableDonationsApi = async () => {
  const res = await api.get("/donations/available", { withCredentials: true });
  return res.data;
};

export const acceptDonationApi = async (id) => {
  const res = await api.patch(`/donations/${id}/accept`, {}, { withCredentials: true });
  return res.data;
};

export const getNgoRequestsApi = async () => {
  const res = await api.get("/donations/ngo-requests", { withCredentials: true });
  return res.data;
};

export const deliverDonationApi = async (id) => {
  const res = await api.patch(`/donations/${id}/deliver`, {}, { withCredentials: true });
  return res.data;
};

// VOLUNTEER
export const getAssignedDonationsApi = async () => {
  const res = await api.get("/donations/assigned", { withCredentials: true });
  return res.data;
};

export const pickDonationApi = async (id) => {
  const res = await api.patch(`/donations/${id}/pick`, {}, { withCredentials: true });
  return res.data;
};

// ADMIN
export const getAllDonationsApi = async () => {
  const res = await api.get("/donations/all", { withCredentials: true });
  return res.data;
};

export const assignVolunteerApi = async (data) => {
  const res = await api.patch("/donations/assign-volunteer", data, {
    withCredentials: true,
  });
  return res.data;
};
