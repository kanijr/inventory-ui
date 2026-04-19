import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { InventoryProvider } from "./store/InventoryContext";
import AdminInventory from "./pages/AdminInventory/AdminInventory";
import AdminInventoryCreate from "./pages/AdminInventoryCreate/AdminInventoryCreate";
import AdminInventoryDetails from "./pages/AdminInventoryDetails/AdminInventoryDetails";
import AdminInventoryEdit from "./pages/AdminInventoryEdit/AdminInventoryEdit";
import Gallery from "./pages/Gallery/Gallery";
import Favorites from "./pages/Favorites/Favorites";
import AdminLayout from "./layouts/AdminLayout";
import GalleryLayout from "./layouts/GalleryLayout";

function App() {
  return (
    <InventoryProvider>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="inventory" element={<AdminInventory />} />
          <Route path="inventory/create" element={<AdminInventoryCreate />} />
          <Route path="inventory/:id" element={<AdminInventoryDetails />} />
          <Route path="inventory/:id/edit" element={<AdminInventoryEdit />} />
        </Route>

        <Route element={<GalleryLayout />}>
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/favorites" element={<Favorites />} />
        </Route>
        <Route path="*" element={<Navigate to="/gallery" replace />} />
      </Routes>
    </InventoryProvider>
  );
}

export default App;
