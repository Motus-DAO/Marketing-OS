import { Outlet, Link, useLocation } from 'react-router-dom';

export function DashboardShell() {
  const location = useLocation();

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">MotusDAO OS</p>
          <Link to="/" className="app-title">
            Dashboard MVP
          </Link>
        </div>
        <div className="header-meta">
          <span>{location.pathname === '/' ? 'Project Home' : 'Asset Review'}</span>
        </div>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
