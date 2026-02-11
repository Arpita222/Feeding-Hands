import api from "./api";

export const donateMoneyApi = async (data) => {
  const res = await api.post("/donor/donate-money", data, {
    withCredentials: true,
  });
  return res.data;
};

export const getMyCouponsApi = async () => {
  const res = await api.get("/donor/coupons", { withCredentials: true });
  return res.data;
};

export const getMyImpactApi = async () => {
  const res = await api.get("/donor/impact", { withCredentials: true });
  return res.data;
};
