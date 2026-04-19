import { useEffect, useMemo, useState } from "react";
import InventoryGallery from "../../components/gallery/InventoryGallery/InventoryGallery";
import InventoryQuickView from "../../components/gallery/InventoryQuickView/InventoryQuickView";
import { useFavorites } from "../../hooks/useFavorites";
import { Link } from "react-router-dom";
import { useInventory } from "../../store/InventoryContext";
import "../../styles/galleryCommon.css";
import "../../styles/statusBox.css";

function Gallery() {
  const { inventory, loading, error, loadInventory } = useInventory();
  const [selected, setSelected] = useState(null);
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    loadInventory();
  }, [loadInventory]);

  const hasItems = useMemo(() => inventory.length > 0, [inventory]);

  return (
    <div>
      <div className="gallery-header">
        <h2>Інвентар</h2>

        <Link className="nav-btn" to="/favorites">
          Улюблені ❤️
        </Link>
      </div>
      {loading && <div className="status-box">Завантаження галереї...</div>}

      {!loading && error && <div className="status-box error-box">{error}</div>}

      {!loading && !error && !hasItems && (
        <div className="status-box empty-box">Галерея порожння.</div>
      )}

      {!loading && !error && hasItems && (
        <>
          <InventoryGallery
            items={inventory}
            onItemClick={setSelected}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
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

export default Gallery;
