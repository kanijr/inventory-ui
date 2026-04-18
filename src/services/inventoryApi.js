const API_BASE_URL = "http://localhost:3000";

async function handleResponse(response) {
  if (!response.ok) {
    let errorMessage = "Сталася помилка";

    try {
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        errorMessage = data.message || data || errorMessage;
      } else {
        const text = await response.text();
        errorMessage = text || response.statusText || errorMessage;
      }
    } catch {
      errorMessage = response.statusText || errorMessage;
    }

    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get("content-type");

  if (!contentType || !contentType.includes("application/json")) {
    return null;
  }

  const text = await response.text();

  if (!text) {
    return null;
  }

  return JSON.parse(text);
}

export function getInventoryPhotoUrl(id, version) {
  const base = `${API_BASE_URL}/inventory/${id}/photo`;
  return version ? `${base}?t=${version}` : base;
}

export async function getAllInventory() {
  const response = await fetch(`${API_BASE_URL}/inventory`);
  return handleResponse(response);
}

export async function getInventoryById(id) {
  const response = await fetch(`${API_BASE_URL}/inventory/${id}`);
  return handleResponse(response);
}

export async function createInventory({ inventory_name, description, photo }) {
  const formData = new FormData();
  formData.append("inventory_name", inventory_name);

  if (description) {
    formData.append("description", description);
  }

  if (photo) {
    formData.append("photo", photo);
  }

  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    body: formData,
  });

  return handleResponse(response);
}

export async function updateInventoryText(id, { inventory_name, description }) {
  const response = await fetch(`${API_BASE_URL}/inventory/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inventory_name,
      description,
    }),
  });

  return handleResponse(response);
}

export async function updateInventoryPhoto(id, photo) {
  const formData = new FormData();
  formData.append("photo", photo);

  const response = await fetch(`${API_BASE_URL}/inventory/${id}/photo`, {
    method: "PUT",
    body: formData,
  });

  return handleResponse(response);
}

export async function deleteInventory(id) {
  const response = await fetch(`${API_BASE_URL}/inventory/${id}`, {
    method: "DELETE",
  });

  return handleResponse(response);
}
