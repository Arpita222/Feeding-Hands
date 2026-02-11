export const sidebarLinks = {
  ADMIN: [
    { name: "Dashboard", path: "/admin" },
    { name: "All Donations", path: "/admin/donations" },
    { name: "Assign Volunteer", path: "/admin/assign-volunteer" },
    { name: "Manage Users", path: "/admin/users" },
    { name: "Analytics", path: "/admin/analytics" },
    { name: "Notifications", path: "/notifications" },
  ],

  HOTEL: [
    { name: "Dashboard", path: "/hotel" },
    { name: "Create Donation", path: "/hotel/create-donation" },
    { name: "My Donations", path: "/hotel/donations" },
    { name: "Notifications", path: "/notifications" },
  ],

  NGO: [
    { name: "Dashboard", path: "/ngo" },
    { name: "Available Donations", path: "/ngo/donations" },
    { name: "Deliver Donations", path: "/ngo/deliveries" },
    { name: "Pickup Requests", path: "/ngo/requests" },
    { name: "Notifications", path: "/notifications" },
  ],

  VOLUNTEER: [
    { name: "Dashboard", path: "/volunteer" },
    { name: "Assigned Pickups", path: "/volunteer/pickups" },
    { name: "Completed Deliveries", path: "/volunteer/history" },
    { name: "Notifications", path: "/notifications" },
  ],

  DONOR: [
    { name: "Dashboard", path: "/donor" },
    { name: "Donate Money", path: "/donor/donate" },
    { name: "My Coupons", path: "/donor/coupons" },
    { name: "Impact", path: "/donor/impact" },
    { name: "Notifications", path: "/notifications" },
  ],
};
