import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { InventoryProvider } from "./store/InventoryContext";
import AdminInventory from "./pages/AdminInventory/AdminInventory";
import AdminInventoryCreate from "./pages/AdminInventoryCreate/AdminInventoryCreate";
import AdminInventoryDetails from "./pages/AdminInventoryDetails/AdminInventoryDetails";
import AdminInventoryEdit from "./pages/AdminInventoryEdit/AdminInventoryEdit";

function App() {
  return (
    <InventoryProvider>
      <div className="app-shell">
        <header className="topbar">
          <div>
            <p className="topbar-label">Панель адміністратора</p>
            <h1>Управління інвентарем</h1>
          </div>
        </header>

        <main className="page-container">
          <Routes>
            <Route
              path="*"
              element={<Navigate to="/admin/inventory" replace />}
            />
            <Route path="/admin/inventory" element={<AdminInventory />} />
            <Route
              path="/admin/inventory/create"
              element={<AdminInventoryCreate />}
            />
            <Route
              path="/admin/inventory/:id"
              element={<AdminInventoryDetails />}
            />
            <Route
              path="/admin/inventory/:id/edit"
              element={<AdminInventoryEdit />}
            />
          </Routes>
        </main>
      </div>
    </InventoryProvider>
  );
}

export default App;
