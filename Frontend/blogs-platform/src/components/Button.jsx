const Button = ({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
  loading = false,
  variant = "primary", // Default variant is "primary"
}) => {
  // Simplified variant styles
  const variantClasses = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`px-4 py-2 rounded transition ${
        variantClasses[variant]
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;