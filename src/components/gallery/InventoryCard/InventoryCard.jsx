import "./InventoryCard.css";
import { getInventoryPhotoUrl } from "../../../services/inventoryApi";
import { useState } from "react";

export default function InventoryCard({
  item,
  onClick,
  onToggleFavorite,
  isFavorite,
  isFavoritePage = false,
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="card" onClick={() => onClick(item)}>
      {imgError ? (
        <div className="card-placeholder">Фото відсутнє</div>
      ) : (
        <img
          src={getInventoryPhotoUrl(item.id)}
          onError={() => setImgError(true)}
          className="card-image"
        />
      )}

      <div className="card-body">
        <h3>{item.inventory_name}</h3>

        <button
          className={`favorite-btn ${isFavorite ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(item);
          }}
        >
          {isFavoritePage ? "✖" : isFavorite ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
}
