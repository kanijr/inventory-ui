import { useState } from "react";
import { getInventoryPhotoUrl } from "../../../services/inventoryApi";
import "./InventoryTable.css";

function InventoryPhotoCell({ item }) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return <div className="table-photo-placeholder">Фото відсутнє</div>;
  }

  return (
    <img
      className="table-photo"
      src={getInventoryPhotoUrl(item.id)}
      alt={item.inventory_name}
      onError={() => setImageError(true)}
    />
  );
}

export default function InventoryTable({
  inventory,
  onWiewClick,
  onEditClick,
  onDeleteClick,
}) {
  return (
    <div className="table-wrapper">
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Назва</th>
            <th>Опис</th>
            <th>Фото</th>
            <th>Дії</th>
          </tr>
        </thead>

        <tbody>
          {inventory.map((item) => (
            <tr key={item.id}>
              <td className="cell-name">{item.inventory_name}</td>
              <td className="cell-description">
                {item.description || "Опис відсутній"}
              </td>
              <td>
                <InventoryPhotoCell item={item} />
              </td>
              <td>
                <div className="action-buttons">
                  <button
                    className="action-button view-button"
                    onClick={() => onWiewClick(item)}
                  >
                    Переглянути
                  </button>
                  <button
                    className="action-button edit-button"
                    onClick={() => onEditClick(item)}
                  >
                    Редагувати
                  </button>

                  <button
                    className="action-button delete-button"
                    onClick={() => onDeleteClick(item)}
                  >
                    Видалити
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
