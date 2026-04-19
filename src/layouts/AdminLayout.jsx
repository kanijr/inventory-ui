import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <h1>Панель адміністратора</h1>
        </div>
      </header>

      <main className="page-container">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
