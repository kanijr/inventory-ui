import "./InventoryQuickView.css";
import { getInventoryPhotoUrl } from "../../../services/inventoryApi";
import { useState } from "react";

export default function InventoryQuickView({ item, onClose }) {
  if (!item) return null;

  const [imgError, setImgError] = useState(false);

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {imgError ? (
          <div className="modal-placeholder">Фото відсутнє</div>
        ) : (
          <img
            src={getInventoryPhotoUrl(item.id)}
            onError={() => setImgError(true)}
            className="modal-image"
          />
        )}

        <div className="modal-content">
          <h2>{item.inventory_name}</h2>
          <p>{item.description}</p>

          <button onClick={onClose}>Закрити</button>
        </div>
      </div>
    </div>
  );
}
