import "./ConfirmDeleteModal.css";
export default function ConfirmDeleteModal({
  item,
  loading,
  error,
  onClose,
  onConfirmDelete,
}) {
  return (
    <>
      {item && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Підтвердження видалення</h3>
            <p>
              Ви справді хочете видалити <strong>{item.inventory_name}</strong>?
            </p>

            {error && <p className="modal-error">{error}</p>}

            <div className="modal-actions">
              <button
                className="secondary-button"
                onClick={onClose}
                disabled={loading}
              >
                Скасувати
              </button>

              <button
                className="danger-button"
                onClick={onConfirmDelete}
                disabled={loading}
              >
                {loading ? "Видалення..." : "Видалити"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
