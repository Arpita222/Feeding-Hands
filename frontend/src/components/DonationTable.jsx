const DonationTable = ({ donations = [], title = "Recent Donations" }) => {
  const getStatusStyle = (status) => {
    if (status === "AVAILABLE")
      return "bg-green-100 text-green-700 border-green-200";
    if (status === "RESERVED")
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    if (status === "ASSIGNED")
      return "bg-blue-100 text-blue-700 border-blue-200";
    if (status === "PICKED")
      return "bg-purple-100 text-purple-700 border-purple-200";
    if (status === "DELIVERED")
      return "bg-gray-200 text-gray-700 border-gray-300";
    if (status === "EXPIRED") return "bg-red-100 text-red-700 border-red-200";

    return "bg-gray-100 text-gray-700 border-gray-200";
  };

  const getStatusDot = (status) => {
    if (status === "AVAILABLE") return "bg-green-600";
    if (status === "RESERVED") return "bg-yellow-500";
    if (status === "ASSIGNED") return "bg-blue-600";
    if (status === "PICKED") return "bg-purple-600";
    if (status === "DELIVERED") return "bg-gray-600";
    if (status === "EXPIRED") return "bg-red-600";

    return "bg-gray-500";
  };

  return (
    <div className="bg-white shadow-md rounded-3xl p-6 border border-gray-100 overflow-hidden">
      {/* Title */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-extrabold text-gray-900">{title}</h2>

        <span className="text-sm font-semibold bg-green-50 text-green-700 px-4 py-1 rounded-full border border-green-100">
          Total: {donations?.length}
        </span>
      </div>

      {/* Table Wrapper */}
      <div className="overflow-x-auto rounded-2xl border border-gray-100">
        <table className="w-full border-collapse">
          {/* Header */}
          <thead className="sticky top-0 bg-green-50 border-b border-gray-200">
            <tr className="text-left">
              <th className="p-4 text-xs font-bold text-gray-700 uppercase tracking-wider">
                #
              </th>
              <th className="p-4 text-xs font-bold text-gray-700 uppercase tracking-wider">
                Food Name
              </th>
              <th className="p-4 text-xs font-bold text-gray-700 uppercase tracking-wider">
                Quantity
              </th>
              <th className="p-4 text-xs font-bold text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="p-4 text-xs font-bold text-gray-700 uppercase tracking-wider">
                Expiry Time
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {donations?.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-10 text-center">
                  <p className="text-gray-500 font-semibold text-lg">
                    No donations found
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    Donations will appear here once created.
                  </p>
                </td>
              </tr>
            ) : (
              donations?.map((donation, index) => (
                <tr
                  key={donation?._id || index}
                  className="border-b last:border-none hover:bg-green-50/40 transition"
                >
                  <td className="p-4 text-gray-500 font-semibold">
                    {index + 1}
                  </td>

                  <td className="p-4 font-semibold text-gray-900">
                    {donation?.foodName || "N/A"}
                  </td>

                  <td className="p-4 text-gray-700">{donation?.quantity}</td>

                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-2 px-4 py-1 rounded-full text-sm font-bold border ${getStatusStyle(
                        donation?.status
                      )}`}
                    >
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${getStatusDot(
                          donation?.status
                        )}`}
                      ></span>
                      {donation?.status}
                    </span>
                  </td>

                  <td className="p-4 text-gray-700">
                    {donation?.expiryTime
                      ? new Date(donation.expiryTime).toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })
                      : "N/A"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonationTable;

