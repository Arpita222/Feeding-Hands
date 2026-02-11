export const redirectUserByRole = (role) => {
  if (role === "ADMIN") return "/admin";
  if (role === "NGO") return "/ngo";
  if (role === "VOLUNTEER") return "/volunteer";
  if (role === "DONOR") return "/donor";
  if (role === "HOTEL") return "/hotel";

  return "/";
};
