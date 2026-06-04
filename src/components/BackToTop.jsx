export default function BackToTop({ isVisible, onClick }) {
  return (
    <button
      className={`back-to-top${isVisible ? " is-visible" : ""}`}
      type="button"
      aria-label="Back to top"
      onClick={onClick}
    >
      <i className="fas fa-arrow-up" aria-hidden="true"></i>
    </button>
  );
}
