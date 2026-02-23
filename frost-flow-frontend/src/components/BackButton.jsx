import { useNavigate } from "react-router-dom";

export default function BackButton({
  label = "Back",
  fallback = "/",
  showIcon = true,
  className = "frost-btn",
}) {
  const navigate = useNavigate();

  const handleBack = () => {
    // if no history, go to fallback route
    if (window.history.length <= 1) {
      navigate(fallback, { replace: true });
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleBack}
      className={className}
      aria-label="Go back"
      title="Go back"
    >
      {showIcon && <span aria-hidden="true">⬅ </span>}
      {label}
    </button>
  );
}