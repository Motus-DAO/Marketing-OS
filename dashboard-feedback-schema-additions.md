# Dashboard Feedback Schema Additions

## 1. Extend asset version status
Current:
- candidate
- approved
- rejected

Recommended new version states:
- candidate
- in_review
- approved
- rejected
- needs_changes

## 2. Extend asset approval summary state
Current:
- pending
- approved
- rejected

Recommended new asset summary states:
- pending
- in_review
- approved
- rejected
- needs_changes

## 3. Add `feedbackComments` table
Fields:
- projectId
- assetId
- assetVersionId
- scopeType (`asset`, `slide`)
- slideIndex optional
- body
- authorType (`human`, `agent`)
- authorId optional
- status (`open`, `resolved`)
- createdAt
- updatedAt

Indexes:
- by_asset
- by_asset_version
- by_asset_scope
- by_asset_version_scope
- by_project

## 4. Suggested functions
Queries:
- listFeedbackCommentsByAsset
- listFeedbackCommentsByVersion
- listFeedbackCommentsBySlide

Mutations:
- createFeedbackComment
- updateFeedbackCommentStatus
- setAssetVersionReviewState
- setAssetReviewState

## 5. Notes
This should coexist with existing reviewNotes initially, then later we can decide whether to migrate or deprecate the older lighter note model.
