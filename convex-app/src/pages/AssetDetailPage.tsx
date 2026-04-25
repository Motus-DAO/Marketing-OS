import { FormEvent, useState } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { api } from '../../convex/_generated/api';
import { EmptyState } from '../components/EmptyState';
import { AssetHeader, CarouselPreview, ReviewActionBar, ReviewNoteList, VersionList } from '../components/dashboard';

export function AssetDetailPage() {
  const { assetId } = useParams();
  const navigate = useNavigate();
  const data = useQuery(api.dashboard.getAssetDetail, assetId ? { assetId: assetId as any } : 'skip');
  const createReviewNote = useMutation(api.dashboard.createReviewNote);
  const setCurrentVersion = useMutation(api.dashboard.setCurrentVersion);
  const setAssetApprovalState = useMutation(api.dashboard.setAssetApprovalState);
  const [noteBody, setNoteBody] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  if (data === undefined) {
    return <div className="loading-state">Loading asset…</div>;
  }

  if (!data) {
    return <EmptyState title="Asset not found" body="The selected asset does not exist or is not available yet." />;
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!noteBody.trim()) return;

    setIsSaving(true);
    try {
      await createReviewNote({ assetId: data.asset._id, note: noteBody.trim(), authorType: 'human', authorId: 'Avril reviewer' });
      setNoteBody('');
    } finally {
      setIsSaving(false);
    }
  };

  const handleApproval = async (approvalState: 'approved' | 'rejected') => {
    setIsSaving(true);
    try {
      await setAssetApprovalState({
        assetId: data.asset._id,
        approvalState,
        versionId: data.currentVersion?._id,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="page-stack">
      <div className="page-header-row">
        <div>
          <Link to={data.project?._id ? `/projects/${data.project._id}` : '/'} className="text-link">← Back to asset list</Link>
          <p className="eyebrow">Asset Detail</p>
        </div>
        {data.project?._id ? <button className="secondary-button" onClick={() => navigate(`/projects/${data.project?._id}`)}>View project</button> : null}
      </div>

      <AssetHeader asset={data.asset} project={data.project} notionUrl={data.asset.notionPageUrl || data.primaryReference?.location || null} />

      <div className="detail-grid">
        <div className="detail-main">
          <CarouselPreview version={data.currentVersion} />
          <ReviewNoteList notes={data.notes} />
          <section className="panel">
            <div className="section-header">
              <div>
                <p className="eyebrow">Add note</p>
                <h2>Leave review context</h2>
              </div>
            </div>
            <form className="note-form" onSubmit={handleSubmit}>
              <textarea value={noteBody} onChange={(event) => setNoteBody(event.target.value)} rows={4} placeholder="Add a note for the next reviewer or approver" />
              <button className="primary-button" disabled={isSaving || !noteBody.trim()} type="submit">Save note</button>
            </form>
          </section>
        </div>

        <div className="detail-side">
          <VersionList
            versions={data.versions}
            currentVersionId={data.asset.currentVersionId}
            isUpdating={isSaving}
            onSetCurrent={async (versionId) => {
              setIsSaving(true);
              try {
                await setCurrentVersion({ assetId: data.asset._id, versionId: versionId as any });
              } finally {
                setIsSaving(false);
              }
            }}
          />
          <ReviewActionBar currentState={data.asset.approvalState} isUpdating={isSaving} onApprove={() => handleApproval('approved')} onReject={() => handleApproval('rejected')} />
        </div>
      </div>
    </section>
  );
}
