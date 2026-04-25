import { useMemo, useState } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { api } from '../../convex/_generated/api';
import { EmptyState } from '../components/EmptyState';
import { AssetHeader, CarouselPreview, FeedbackCommentList, FeedbackForm, ReviewActionBar, ReviewNoteList, VersionList } from '../components/dashboard';

export function AssetDetailPage() {
  const { assetId } = useParams();
  const navigate = useNavigate();
  const data = useQuery(api.dashboard.getAssetDetail, assetId ? { assetId: assetId as any } : 'skip');
  const createReviewNote = useMutation(api.dashboard.createReviewNote);
  const createFeedbackComment = useMutation(api.dashboard.createFeedbackComment);
  const updateFeedbackCommentStatus = useMutation(api.dashboard.updateFeedbackCommentStatus);
  const setCurrentVersion = useMutation(api.dashboard.setCurrentVersion);
  const setAssetVersionReviewState = useMutation(api.dashboard.setAssetVersionReviewState);
  const [noteBody, setNoteBody] = useState('');
  const [assetFeedbackBody, setAssetFeedbackBody] = useState('');
  const [slideFeedbackBody, setSlideFeedbackBody] = useState('');
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  if (data === undefined) {
    return <div className="loading-state">Loading asset…</div>;
  }

  if (!data) {
    return <EmptyState title="Asset not found" body="The selected asset does not exist or is not available yet." />;
  }

  const feedbackComments = data.feedbackComments ?? [];
  const assetComments = useMemo(() => feedbackComments.filter((comment: any) => comment.scopeType === 'asset'), [feedbackComments]);
  const slideComments = useMemo(
    () => feedbackComments.filter((comment: any) => comment.scopeType === 'slide' && comment.slideIndex === selectedSlideIndex),
    [feedbackComments, selectedSlideIndex]
  );

  const handleNoteSubmit = async () => {
    if (!noteBody.trim()) return;

    setIsSaving(true);
    try {
      await createReviewNote({ assetId: data.asset._id, note: noteBody.trim(), authorType: 'human', authorId: 'Avril reviewer' });
      setNoteBody('');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAssetFeedbackSubmit = async () => {
    if (!assetFeedbackBody.trim()) return;

    setIsSaving(true);
    try {
      await createFeedbackComment({
        assetId: data.asset._id,
        assetVersionId: data.currentVersion?._id,
        scopeType: 'asset',
        body: assetFeedbackBody.trim(),
        authorType: 'human',
        authorId: 'Avril reviewer',
      });
      setAssetFeedbackBody('');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSlideFeedbackSubmit = async () => {
    if (!slideFeedbackBody.trim()) return;

    setIsSaving(true);
    try {
      await createFeedbackComment({
        assetId: data.asset._id,
        assetVersionId: data.currentVersion?._id,
        scopeType: 'slide',
        slideIndex: selectedSlideIndex,
        body: slideFeedbackBody.trim(),
        authorType: 'human',
        authorId: 'Avril reviewer',
      });
      setSlideFeedbackBody('');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReviewState = async (reviewState: 'in_review' | 'approved' | 'rejected' | 'needs_changes') => {
    if (!data.currentVersion?._id) return;
    setIsSaving(true);
    try {
      await setAssetVersionReviewState({
        assetId: data.asset._id,
        versionId: data.currentVersion._id,
        reviewState,
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
          <CarouselPreview version={data.currentVersion} selectedSlideIndex={selectedSlideIndex} onSelectSlide={setSelectedSlideIndex} />
          <ReviewNoteList notes={data.notes} />
          <FeedbackCommentList
            title="Overall carousel feedback"
            eyebrow="Feedback"
            comments={assetComments}
            emptyText="No overall carousel feedback yet."
            onResolveToggle={async (commentId, nextStatus) => {
              setIsSaving(true);
              try {
                await updateFeedbackCommentStatus({ commentId: commentId as any, status: nextStatus });
              } finally {
                setIsSaving(false);
              }
            }}
          />
          <FeedbackForm
            title="Add overall feedback"
            eyebrow="Feedback"
            placeholder="Add overall feedback about narrative, structure, CTA, tone, or strategic direction"
            value={assetFeedbackBody}
            onChange={setAssetFeedbackBody}
            onSubmit={handleAssetFeedbackSubmit}
            disabled={isSaving || !assetFeedbackBody.trim()}
            buttonLabel="Save overall feedback"
          />
          <FeedbackCommentList
            title={`Slide ${selectedSlideIndex + 1} feedback`}
            eyebrow="Slide feedback"
            comments={slideComments}
            emptyText="No slide-specific feedback yet."
            onResolveToggle={async (commentId, nextStatus) => {
              setIsSaving(true);
              try {
                await updateFeedbackCommentStatus({ commentId: commentId as any, status: nextStatus });
              } finally {
                setIsSaving(false);
              }
            }}
          />
          <FeedbackForm
            title={`Comment on slide ${selectedSlideIndex + 1}`}
            eyebrow="Slide feedback"
            placeholder="Add precise feedback for this slide"
            value={slideFeedbackBody}
            onChange={setSlideFeedbackBody}
            onSubmit={handleSlideFeedbackSubmit}
            disabled={isSaving || !slideFeedbackBody.trim()}
            buttonLabel="Save slide feedback"
          />
          <FeedbackForm
            title="Add legacy review note"
            eyebrow="Notes"
            placeholder="Add a note for the next reviewer or approver"
            value={noteBody}
            onChange={setNoteBody}
            onSubmit={handleNoteSubmit}
            disabled={isSaving || !noteBody.trim()}
            buttonLabel="Save note"
          />
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
          <ReviewActionBar currentState={data.asset.approvalState} isUpdating={isSaving} onSetState={handleReviewState} />
        </div>
      </div>
    </section>
  );
}
