const Button = ({
  children,
  type = "button",
  variant = "primary",
  onClick,
  disabled = false,
}) => {
  const baseStyles =
    "px-5 py-2.5 rounded-lg font-semibold transition duration-200 flex items-center justify-center gap-2";

  const variants = {
    primary:
      "bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-400",
    outline:
      "border border-green-600 text-green-700 hover:bg-green-50 disabled:text-gray-400 disabled:border-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-400",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;
