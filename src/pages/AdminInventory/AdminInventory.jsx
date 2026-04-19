import { useEffect, useMemo, useState } from "react";
import { Link, Route, useNavigate } from "react-router-dom";
import { deleteInventory } from "../../services/inventoryApi";
import { useInventory } from "../../store/InventoryContext";
import InventoryTable from "../../components/inventory/InventoryTable/InventoryTable";
import ConfirmDeleteModal from "../../components/inventory/ConfirmDeleteModal/ConfirmDeleteModal";
import "./AdminInventory.css";
import "../../styles/statusBox.css";

function AdminInventory() {
  const navigate = useNavigate();
  const { inventory, loading, error, loadInventory } = useInventory();
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    loadInventory();
  }, [loadInventory]);

  const hasItems = useMemo(() => inventory.length > 0, [inventory]);

  const handleDeleteClick = (item) => {
    setDeleteError("");
    setItemToDelete(item);
  };

  const handleCloseModal = () => {
    if (deleteLoading) return;
    setItemToDelete(null);
    setDeleteError("");
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;

    setDeleteLoading(true);
    setDeleteError("");

    try {
      await deleteInventory(itemToDelete.id);
      setItemToDelete(null);
      await loadInventory();
    } catch (err) {
      setDeleteError(err.message || "Не вдалося видалити позицію");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <section className="admin-page">
      <div className="admin-page-header">
        <div>
          {/* <p className="section-label">Інвентар</p> */}
          <h2>Список інвентарю</h2>
        </div>

        <Link className="primary-button" to="/admin/inventory/create">
          Додати інвентар
        </Link>
      </div>

      {loading && <div className="status-box">Завантаження інвентарю...</div>}

      {!loading && error && <div className="status-box error-box">{error}</div>}

      {!loading && !error && !hasItems && (
        <div className="status-box empty-box">Інвентар порожній.</div>
      )}

      {!loading && !error && hasItems && (
        <InventoryTable
          inventory={inventory}
          onWiewClick={(item) => navigate(`/admin/inventory/${item.id}`)}
          onEditClick={(item) => navigate(`/admin/inventory/${item.id}/edit`)}
          onDeleteClick={handleDeleteClick}
        />
      )}

      <ConfirmDeleteModal
        item={itemToDelete}
        loading={deleteLoading}
        error={deleteError}
        onClose={handleCloseModal}
        onConfirmDelete={handleConfirmDelete}
      />
    </section>
  );
}

export default AdminInventory;
