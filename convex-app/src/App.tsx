import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardShell } from './components/DashboardShell';
import { ProjectHomePage } from './pages/ProjectHomePage';
import { AssetListPage } from './pages/AssetListPage';
import { AssetDetailPage } from './pages/AssetDetailPage';

export function App() {
  return (
    <Routes>
      <Route element={<DashboardShell />}>
        <Route path="/" element={<ProjectHomePage />} />
        <Route path="/projects/:projectId" element={<AssetListPage />} />
        <Route path="/assets/:assetId" element={<AssetDetailPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
