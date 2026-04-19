import "./InventoryGallery.css";
import InventoryCard from "../InventoryCard/InventoryCard";

export default function InventoryGallery({
  items,
  onItemClick,
  onToggleFavorite,
  isFavorite,
  isFavoritePage = false,
}) {
  return (
    <div className="gallery">
      {items.map((item) => (
        <InventoryCard
          key={item.id}
          item={item}
          onClick={onItemClick}
          onToggleFavorite={onToggleFavorite}
          isFavorite={isFavorite(item.id)}
          isFavoritePage={isFavoritePage}
        />
      ))}
    </div>
  );
}
