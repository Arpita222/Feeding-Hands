const DonationCard = ({ donation, children }) => {
  const getStatusColor = (status) => {
    if (status === "AVAILABLE") return "bg-green-100 text-green-700";
    if (status === "RESERVED") return "bg-yellow-100 text-yellow-700";
    if (status === "ASSIGNED") return "bg-blue-100 text-blue-700";
    if (status === "PICKED") return "bg-purple-100 text-purple-700";
    if (status === "DELIVERED") return "bg-gray-200 text-gray-700";
    if (status === "EXPIRED") return "bg-red-100 text-red-700";

    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition">
      {/* Header */}
      <div className="flex justify-between items-start gap-3">
        <h2 className="text-xl font-bold text-gray-900">
          {donation?.foodName || "Food Donation"}
        </h2>

        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
            donation?.status
          )}`}
        >
          {donation?.status}
        </span>
      </div>

      {/* Details */}
      <div className="mt-4 space-y-2 text-gray-700">
        <p>
          Quantity:{" "}
          <span className="font-semibold text-gray-900">
            {donation?.quantity}
          </span>
        </p>

        <p>
          Expiry Time:{" "}
          <span className="font-semibold text-gray-900">
            {donation?.expiryTime
              ? new Date(donation.expiryTime).toLocaleString()
              : "Not Available"}
          </span>
        </p>

        {donation?.donor?.fullname && (
          <p>
            Donor:{" "}
            <span className="font-semibold text-gray-900">
              {donation.donor.fullname}
            </span>
          </p>
        )}

        {donation?.reservedBy?.fullname && (
          <p>
            Reserved By:{" "}
            <span className="font-semibold text-gray-900">
              {donation.reservedBy.fullname}
            </span>
          </p>
        )}

        {donation?.volunteer?.fullname && (
          <p>
            Volunteer:{" "}
            <span className="font-semibold text-gray-900">
              {donation.volunteer.fullname}
            </span>
          </p>
        )}
      </div>

      {/* Actions */}
      {children && <div className="mt-5">{children}</div>}
    </div>
  );
};

export default DonationCard;

