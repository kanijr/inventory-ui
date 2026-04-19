import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createInventory } from "../../services/inventoryApi";
import { useInventory } from "../../store/InventoryContext";
import "./AdminInventoryCreate.css";
import InventoryFields from "../../components/inventory/InventoryFields/InventoryFields";

function AdminInventoryCreate() {
  const navigate = useNavigate();
  const { loadInventory } = useInventory();

  const [formData, setFormData] = useState({
    inventory_name: "",
    description: "",
  });
  const [photo, setPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0] || null;
    setPhoto(file);

    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl("");
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.inventory_name.trim()) {
      newErrors.inventory_name = "Назва інвентарю є обов’язковою";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError("");

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      await createInventory({
        inventory_name: formData.inventory_name.trim(),
        description: formData.description.trim(),
        photo,
      });

      await loadInventory();
      navigate("/admin/inventory");
    } catch (err) {
      setSubmitError(err.message || "Не вдалося створити позицію");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="create-page">
      <div className="create-header">
        <div>
          <h2>Додати нову позицію</h2>
        </div>

        <Link className="create-back-button" to="/admin/inventory">
          Назад до списку
        </Link>
      </div>

      <form className="create-form" onSubmit={handleSubmit}>
        <InventoryFields
          formData={{}}
          onChange={handleChange}
          onPhotoChange={handlePhotoChange}
          previewUrl={previewUrl}
          errors={errors}
        />

        {submitError && <div className="submit-error-box">{submitError}</div>}

        <div className="create-actions">
          <Link className="create-cancel-button" to="/admin/inventory">
            Скасувати
          </Link>

          <button
            className="create-submit-button"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Створення..." : "Створити"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AdminInventoryCreate;
