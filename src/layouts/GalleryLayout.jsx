import { Outlet } from "react-router-dom";

function GalleryLayout() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <h1>Галерея</h1>
        </div>
      </header>

      <main className="page-container">
        <Outlet />
      </main>
    </div>
  );
}

export default GalleryLayout;
