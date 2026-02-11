const StatCard = ({ title, value, subtitle, icon, color = "green" }) => {
  const colorStyles = {
    green: "bg-green-100 text-green-700",
    blue: "bg-blue-100 text-blue-700",
    purple: "bg-purple-100 text-purple-700",
    red: "bg-red-100 text-red-700",
    yellow: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="bg-white shadow-sm rounded-3xl p-6 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-start gap-4">
      {/* Icon */}
      {icon && (
        <div
          className={`p-4 rounded-2xl text-2xl ${
            colorStyles[color] || colorStyles.green
          }`}
        >
          {icon}
        </div>
      )}

      {/* Text */}
      <div className="flex-1">
        <h3 className="text-gray-500 font-semibold text-sm uppercase tracking-wide">
          {title}
        </h3>

        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
          {value}
        </h2>

        {subtitle && (
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
