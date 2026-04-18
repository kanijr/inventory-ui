import "./InventoryFields.css";
import "../../../styles/inventoryCommon.css";

export default function InventoryFields({
  formData,
  onChange,
  onPhotoChange,
  previewUrl,
  showPhoto = true,
  errors = {},
}) {
  return (
    <>
      <div className="form-field">
        <label htmlFor="inventory_name">Назва інвентарю *</label>
        <input
          id="inventory_name"
          name="inventory_name"
          type="text"
          value={formData.inventory_name}
          onChange={onChange}
          placeholder="Введіть назву інвентарю"
        />
        {errors.inventory_name && (
          <span className="field-error">{errors.inventory_name}</span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="description">Опис</label>
        <textarea
          id="description"
          name="description"
          rows="3"
          value={formData.description}
          onChange={onChange}
          placeholder="Введіть опис"
        />
      </div>
      {showPhoto && (
        <>
          <div className="form-field">
            <label htmlFor="photo">Фото</label>
            <input
              id="photo"
              type="file"
              accept="image/*"
              onChange={onPhotoChange}
            />
          </div>

          {previewUrl && <img className="preview-image" src={previewUrl} />}
        </>
      )}
    </>
  );
}
