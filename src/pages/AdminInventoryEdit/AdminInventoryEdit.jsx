import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getInventoryById,
  getInventoryPhotoUrl,
  updateInventoryPhoto,
  updateInventoryText,
} from "../../services/inventoryApi";
import { useInventory } from "../../store/InventoryContext";
import "./AdminInventoryEdit.css";
import "../../styles/inventoryCommon.css";
import InventoryFields from "../../components/inventory/InventoryFields/InventoryFields";

function AdminInventoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loadInventory } = useInventory();

  const [formData, setFormData] = useState({
    inventory_name: "",
    description: "",
  });
  const [initialLoading, setInitialLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  const [textSubmitting, setTextSubmitting] = useState(false);
  const [photoSubmitting, setPhotoSubmitting] = useState(false);

  const [textMessage, setTextMessage] = useState("");
  const [photoMessage, setPhotoMessage] = useState("");
  const [newPhoto, setNewPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [photoVersion, setPhotoVersion] = useState(Date.now());
  const [currentImageError, setCurrentImageError] = useState(false);

  useEffect(() => {
    async function loadItem() {
      setInitialLoading(true);
      setPageError("");

      try {
        const data = await getInventoryById(id);
        setFormData({
          inventory_name: data.inventory_name || "",
          description: data.description || "",
        });
        setCurrentImageError(false);
      } catch (err) {
        setPageError(
          err.message || "Не вдалося завантажити позицію для редагування",
        );
      } finally {
        setInitialLoading(false);
      }
    }

    loadItem();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTextSubmit = async (event) => {
    event.preventDefault();
    setTextMessage("");

    if (!formData.inventory_name.trim()) {
      setTextMessage("Назва інвентарю є обов’язковою");
      return;
    }

    setTextSubmitting(true);

    try {
      await updateInventoryText(id, {
        inventory_name: formData.inventory_name.trim(),
        description: formData.description.trim(),
      });

      setTextMessage("Текстові дані успішно оновлено");
      await loadInventory();
    } catch (err) {
      setTextMessage(err.message || "Не вдалося оновити текстові дані");
    } finally {
      setTextSubmitting(false);
    }
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0] || null;
    setNewPhoto(file);

    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl("");
    }
  };

  const handlePhotoSubmit = async (event) => {
    event.preventDefault();
    setPhotoMessage("");

    if (!newPhoto) {
      setPhotoMessage("Спочатку виберіть фото");
      return;
    }

    setPhotoSubmitting(true);

    try {
      await updateInventoryPhoto(id, newPhoto);
      setPhotoMessage("Фото успішно оновлено");
      setNewPhoto(null);
      setPreviewUrl("");
      setPhotoVersion(Date.now());
      setCurrentImageError(false);
      await loadInventory();
    } catch (err) {
      setPhotoMessage(err.message || "Не вдалося оновити фото");
    } finally {
      setPhotoSubmitting(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="edit-status">Завантаження даних для редагування...</div>
    );
  }

  if (pageError) {
    return <div className="edit-status edit-error">{pageError}</div>;
  }

  return (
    <section className="edit-page">
      <div className="edit-header">
        <div>
          <p className="edit-label">Редагування інвентарю</p>
          <h2>Редагувати позицію</h2>
        </div>

        <div className="edit-header-actions">
          <Link className="edit-secondary-button" to={`/admin/inventory/${id}`}>
            Переглянути
          </Link>
          <button
            className="edit-primary-button"
            onClick={() => navigate("/admin/inventory")}
          >
            Назад до списку
          </button>
        </div>
      </div>

      <div className="edit-layout">
        <form className="edit-card" onSubmit={handleTextSubmit}>
          <h3>Оновлення текстових даних</h3>

          <InventoryFields
            formData={formData}
            onChange={handleChange}
            showPhoto={false}
          />

          {textMessage && <div className="edit-message">{textMessage}</div>}

          <button
            className="edit-submit-button"
            type="submit"
            disabled={textSubmitting}
          >
            {textSubmitting ? "Збереження..." : "Зберегти текстові зміни"}
          </button>
        </form>

        <form className="edit-card" onSubmit={handlePhotoSubmit}>
          <h3>Оновлення фото</h3>

          {currentImageError ? (
            <div className="current-photo-image current-photo-placeholder">
              Фото відсутнє
            </div>
          ) : (
            <img
              className="current-photo-image"
              src={getInventoryPhotoUrl(id, photoVersion)}
              alt={formData.inventory_name}
              onError={() => setCurrentImageError(true)}
            />
          )}

          <div className="form-field">
            <label htmlFor="newPhoto">Виберіть нове фото</label>
            <input
              id="newPhoto"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
            />
          </div>

          {previewUrl && (
            <div>
              <span className="current-photo-label">Нове фото</span>
              <img
                className="current-photo-image"
                src={previewUrl}
                alt="Нове фото"
              />
            </div>
          )}

          {photoMessage && <div className="edit-message">{photoMessage}</div>}

          <button
            className="edit-submit-button"
            type="submit"
            disabled={photoSubmitting}
          >
            {photoSubmitting ? "Завантаження..." : "Завантажити нове фото"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default AdminInventoryEdit;
