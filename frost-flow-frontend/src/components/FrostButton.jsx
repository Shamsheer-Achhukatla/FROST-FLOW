export default function FrostButton({
  text = "Button",
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  icon = null,
  size = "md",        // sm | md | lg
  variant = "primary", // primary | outline | ghost | danger
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`frost-button frost-${size} frost-${variant} ${className}`}
      aria-busy={loading}
    >
      {loading ? (
        <span className="spinner"></span>
      ) : (
        <>
          {icon && <span className="btn-icon">{icon}</span>}
          {text}
        </>
      )}
    </button>
  );
}