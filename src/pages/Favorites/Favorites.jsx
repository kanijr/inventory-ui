import { Link } from "react-router-dom";
import InventoryGallery from "../../components/gallery/InventoryGallery/InventoryGallery";
import { useFavorites } from "../../hooks/useFavorites";
import InventoryQuickView from "../../components/gallery/InventoryQuickView/InventoryQuickView";
import { useState } from "react";
import "../../styles/galleryCommon.css";
import "../../styles/statusBox.css";

function Favorites() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <div className="gallery-header">
        <h2>Улюблені</h2>

        <Link className="nav-back-btn" to="/gallery">
          Назад до галереї
        </Link>
      </div>
      {favorites.length === 0 ? (
        <div className="status-box empty-box">Список улюблених порожній.</div>
      ) : (
        <>
          <InventoryGallery
            items={favorites}
            onItemClick={setSelected}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
            isFavoritePage={true}
          />
          <InventoryQuickView
            item={selected}
            onClose={() => setSelected(null)}
          />
        </>
      )}
    </div>
  );
}

export default Favorites;
