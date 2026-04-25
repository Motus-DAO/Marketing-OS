import { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { EmptyState } from '../components/EmptyState';
import { AssetCard, FilterBar } from '../components/dashboard';

export function AssetListPage() {
  const { projectId } = useParams();
  const data = useQuery(api.dashboard.listAssetsByProject, projectId ? { projectId: projectId as any } : 'skip');
  const [filters, setFilters] = useState({ status: 'all', platform: 'all', funnelStage: 'all', approvalState: 'all' });

  const assets = data?.assets ?? [];
  const options = useMemo(
    () => ({
      status: [...new Set(assets.map((asset) => asset.status).filter(Boolean))],
      platform: [...new Set(assets.map((asset) => asset.platform).filter(Boolean))],
      funnelStage: [...new Set(assets.map((asset) => asset.funnelStage).filter(Boolean))],
      approvalState: [...new Set(assets.map((asset) => asset.approvalState).filter(Boolean))],
    }),
    [assets]
  );

  const filteredAssets = assets.filter((asset) =>
    Object.entries(filters).every(([key, value]) => value === 'all' || asset[key as keyof typeof asset] === value)
  );

  if (data === undefined) {
    return <div className="loading-state">Loading assets…</div>;
  }

  if (!data) {
    return <EmptyState title="Project not found" body="The selected project does not exist." />;
  }

  return (
    <section className="page-stack">
      <div className="page-header-row">
        <div>
          <Link to="/" className="text-link">← Back to projects</Link>
          <p className="eyebrow">Asset List</p>
          <h1>{data.project.name}</h1>
          <p className="muted">Review all known assets for this project.</p>
        </div>
      </div>

      <FilterBar filters={filters} onChange={(key, value) => setFilters((current) => ({ ...current, [key]: value }))} options={options} />

      {filteredAssets.length ? (
        <div className="asset-grid">
          {filteredAssets.map((asset) => (
            <AssetCard key={asset._id} asset={asset} />
          ))}
        </div>
      ) : (
        <EmptyState title="No matching assets" body="Try a different filter, or add assets and versions in Convex first." />
      )}
    </section>
  );
}
