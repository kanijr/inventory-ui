import "./InventoryDetails.css";
import { useState } from "react";
import { getInventoryPhotoUrl } from "../../../services/inventoryApi";

export default function InventoryDetails({ item }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="details-card">
      <div className="details-image-wrapper">
        {imageError ? (
          <div className="details-image-placeholder">Фото відсутнє</div>
        ) : (
          <img
            className="details-image"
            src={getInventoryPhotoUrl(item.id)}
            alt={item.inventory_name}
            onError={() => setImageError(true)}
          />
        )}
      </div>

      <div className="details-content">
        <div className="details-block">
          <span className="details-block-label">Назва</span>
          <p>{item.inventory_name}</p>
        </div>

        <div className="details-block">
          <span className="details-block-label">Опис</span>
          <p>{item.description || "Опис відсутній."}</p>
        </div>

        <div className="details-block">
          <span className="details-block-label">ID</span>
          <p>{item.id}</p>
        </div>
      </div>
    </div>
  );
}
