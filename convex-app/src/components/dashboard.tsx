import { Link } from 'react-router-dom';
import { StatusBadge } from './StatusBadge';
import { formatDate, titleCase } from '../lib/format';

export function ProjectCard({ project }: { project: any }) {
  return (
    <Link to={`/projects/${project._id}`} className="card project-card">
      <div className="card-header">
        <div>
          <p className="eyebrow">Project</p>
          <h3>{project.name}</h3>
        </div>
        <StatusBadge value={project.status} tone={project.status === 'active' ? 'success' : 'neutral'} />
      </div>
      <p className="muted">{project.description || 'No description yet.'}</p>
      <div className="card-stats">
        <div>
          <strong>{project.assetCount ?? 0}</strong>
          <span>Total assets</span>
        </div>
        <div>
          <strong>{project.inReviewCount ?? 0}</strong>
          <span>Needs review</span>
        </div>
      </div>
    </Link>
  );
}

export function FilterBar({
  filters,
  onChange,
  options,
}: {
  filters: Record<string, string>;
  onChange: (key: string, value: string) => void;
  options: Record<string, string[]>;
}) {
  return (
    <div className="filter-bar">
      {Object.entries(options).map(([key, values]) => (
        <label key={key} className="filter-field">
          <span>{titleCase(key)}</span>
          <select value={filters[key] ?? 'all'} onChange={(e) => onChange(key, e.target.value)}>
            <option value="all">All</option>
            {values.map((value) => (
              <option key={value} value={value}>
                {titleCase(value)}
              </option>
            ))}
          </select>
        </label>
      ))}
    </div>
  );
}

export function AssetCard({ asset }: { asset: any }) {
  return (
    <Link to={`/assets/${asset._id}`} className="card asset-card">
      <div className="asset-thumb">
        {asset.thumbnailUrl ? <img src={asset.thumbnailUrl} alt={asset.title} /> : <div className="thumb-placeholder">No preview</div>}
      </div>
      <div className="asset-content">
        <div className="card-header">
          <h3>{asset.title}</h3>
          <StatusBadge value={asset.approvalState} tone={asset.approvalState === 'approved' ? 'success' : asset.approvalState === 'rejected' ? 'danger' : 'warning'} />
        </div>
        <div className="meta-grid">
          <span>{titleCase(asset.platform)}</span>
          <span>{titleCase(asset.format)}</span>
          <span>{titleCase(asset.funnelStage)}</span>
          <span>{titleCase(asset.status)}</span>
        </div>
        <div className="card-footer muted">
          <span>{asset.currentVersionLabel || 'No current version'}</span>
          <span>Updated {formatDate(asset.updatedAt)}</span>
        </div>
      </div>
    </Link>
  );
}

export function AssetHeader({ asset, project, notionUrl }: { asset: any; project: any; notionUrl?: string | null }) {
  return (
    <section className="panel">
      <div className="card-header align-start">
        <div>
          <p className="eyebrow">{project?.name || 'Project'}</p>
          <h1>{asset.title}</h1>
        </div>
        <StatusBadge value={asset.approvalState} tone={asset.approvalState === 'approved' ? 'success' : asset.approvalState === 'rejected' ? 'danger' : 'warning'} />
      </div>
      <div className="meta-grid dense">
        <span>Platform: {titleCase(asset.platform)}</span>
        <span>Format: {titleCase(asset.format)}</span>
        <span>Funnel: {titleCase(asset.funnelStage)}</span>
        <span>Status: {titleCase(asset.status)}</span>
      </div>
      {notionUrl ? (
        <a href={notionUrl} target="_blank" rel="noreferrer" className="text-link">
          Open Notion page
        </a>
      ) : null}
    </section>
  );
}

export function CarouselPreview({ version }: { version: any }) {
  const previewUrls = version?.previewUrls ?? [];

  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">Preview</p>
          <h2>{version?.versionLabel || 'No active version'}</h2>
        </div>
      </div>
      {previewUrls.length > 0 ? (
        <div className="preview-grid">
          {previewUrls.map((url: string, index: number) => (
            <div key={`${url}-${index}`} className="preview-frame">
              <img src={url} alt={`Slide ${index + 1}`} />
              <span>Slide {index + 1}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="thumb-placeholder large">No preview images for this version yet.</div>
      )}
    </section>
  );
}

export function VersionList({ versions, currentVersionId, onSetCurrent, isUpdating }: { versions: any[]; currentVersionId?: string; onSetCurrent: (id: string) => void; isUpdating: boolean }) {
  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">Versions</p>
          <h2>Available versions</h2>
        </div>
      </div>
      {versions.length ? (
        <div className="stack-list">
          {versions.map((version) => (
            <div key={version._id} className="list-row">
              <div className="mini-thumb">
                {version.coverImageUrl ? <img src={version.coverImageUrl} alt={version.versionLabel} /> : <div className="thumb-placeholder">No thumb</div>}
              </div>
              <div className="list-row-body">
                <strong>{version.versionLabel}</strong>
                <p className="muted">{titleCase(version.status)} • {formatDate(version.createdAt)}</p>
              </div>
              <button className="secondary-button" disabled={isUpdating || currentVersionId === version._id} onClick={() => onSetCurrent(version._id)}>
                {currentVersionId === version._id ? 'Current' : 'Set current'}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-inline">No versions added yet.</div>
      )}
    </section>
  );
}

export function ReviewNoteList({ notes }: { notes: any[] }) {
  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">Notes</p>
          <h2>Review notes</h2>
        </div>
      </div>
      {notes.length ? (
        <div className="stack-list">
          {notes.map((note) => (
            <div key={note._id} className="note-card">
              <div className="card-header">
                <strong>{note.authorId || note.authorType || 'Internal reviewer'}</strong>
                <span className="muted">{formatDate(note.createdAt)}</span>
              </div>
              <p>{note.note}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-inline">No review notes yet.</div>
      )}
    </section>
  );
}

export function ReviewActionBar({ currentState, onApprove, onReject, isUpdating }: { currentState?: string; onApprove: () => void; onReject: () => void; isUpdating: boolean }) {
  return (
    <section className="panel actions-panel">
      <div>
        <p className="eyebrow">Actions</p>
        <h2>Review decision</h2>
        <p className="muted">Current state: {titleCase(currentState)}</p>
      </div>
      <div className="action-row">
        <button className="primary-button" disabled={isUpdating} onClick={onApprove}>Approve</button>
        <button className="danger-button" disabled={isUpdating} onClick={onReject}>Reject</button>
      </div>
    </section>
  );
}
