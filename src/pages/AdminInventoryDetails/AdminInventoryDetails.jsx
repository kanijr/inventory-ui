import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getInventoryById } from "../../services/inventoryApi";
import "./AdminInventoryDetails.css";
import InventoryDetails from "../../components/inventory/InventoryDetails/InventoryDetails";

function AdminInventoryDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    async function loadItem() {
      setLoading(true);
      setError("");

      try {
        const data = await getInventoryById(id);
        setItem(data);
      } catch (err) {
        setError(err.message || "Не вдалося завантажити деталі");
      } finally {
        setLoading(false);
      }
    }

    loadItem();
  }, [id]);

  if (loading) {
    return <div className="details-status">Завантаження деталей...</div>;
  }

  if (error) {
    return <div className="details-status details-error">{error}</div>;
  }

  if (!item) {
    return <div className="details-status">Позицію інвентарю не знайдено.</div>;
  }

  return (
    <section className="details-page">
      <div className="details-header">
        <div>
          <p className="details-label">Деталі інвентарю</p>
          <h2>{item.inventory_name}</h2>
        </div>

        <div className="details-actions">
          <Link className="details-secondary-button" to="/admin/inventory">
            Назад
          </Link>
          <Link
            className="details-primary-button"
            to={`/admin/inventory/${item.id}/edit`}
          >
            Редагувати
          </Link>
        </div>
      </div>

      <InventoryDetails item={item} />
    </section>
  );
}

export default AdminInventoryDetails;
