# Dashboard MVP QA and Integration Checklist

## Report Path
- Save execution results in: `qa/reports/dashboard-mvp-qa-report.md`
- Update this checklist with date, tester, commit/branch, environment, and pass/fail evidence.

## Scope
Validate the Dashboard MVP workflow for:
- project selection
- asset listing
- asset detail rendering
- version switching
- review notes
- approval and rejection flow
- missing-data and partial-data cases

## Preconditions
- Convex schema includes `assetVersions` and `reviewNotes`
- `assets` supports `currentVersionId`, `notionPageUrl`, and `approvalState`
- Seed data exists for at least:
  - 2 projects
  - 3 assets in one project
  - 2 versions for at least 1 asset
  - 1 asset with no notes
  - 1 asset with missing optional fields
- UI routes available for:
  - Project Home
  - Asset List by project
  - Asset Detail by asset

## Test Matrix

| Area | Scenario | Expected Result | Status | Evidence | Exact Fix if Fail |
| --- | --- | --- | --- | --- | --- |
| Project selection | Project Home loads available projects | Project cards render name and status without layout break | TODO |  |  |
| Project selection | Open a project from Project Home | User lands on asset list for selected project | TODO |  |  |
| Asset listing | Asset list loads for selected project | Matching assets render with title, platform, format, funnel stage, status, approval state, thumbnail, last updated | TODO |  |  |
| Asset listing | Filter by status/platform/funnel stage/approval state | List updates correctly and empty-state is clear if no match | TODO |  |  |
| Asset listing | Asset with missing thumbnail or optional fields | Card remains readable, fallback UI shown, no crash | TODO |  |  |
| Asset detail | Asset detail header loads | Metadata header shows title, project, platform, format, funnel stage, status, approval state, notion link when present | TODO |  |  |
| Asset detail | Carousel preview loads current version by default | Preview matches `currentVersionId` selection | TODO |  |  |
| Asset detail | Asset with no notion link | Link area hides cleanly or shows non-blocking fallback | TODO |  |  |
| Version switching | Version list renders available versions | Version label, thumbnail, status, and created date display correctly | TODO |  |  |
| Version switching | Set another version as current | Preview updates, selected state updates, persisted value matches backend | TODO |  |  |
| Version switching | Asset has only one version | UI remains stable and action affordance is sensible | TODO |  |  |
| Review notes | Existing notes render in order | Notes list displays content, author type, and timestamp if supported | TODO |  |  |
| Review notes | Add a new review note | Note appears after submit and persists on refresh | TODO |  |  |
| Review notes | Empty note submit | Validation blocks invalid submit with clear error state | TODO |  |  |
| Approval flow | Approve current version | Approval state updates in detail view and asset list, persisted in backend | TODO |  |  |
| Rejection flow | Reject current version | Rejection state updates in detail view and asset list, persisted in backend | TODO |  |  |
| Approval flow | Approve or reject without a valid current version | Action blocked or handled safely, no bad write | TODO |  |  |
| Integration | Project list, asset list, detail, notes, and actions reflect backend data | No schema mismatch or undefined-field rendering errors | TODO |  |  |
| Missing data | Asset missing notes, notion link, or optional metadata | Screen still renders, missing values handled gracefully | TODO |  |  |
| Missing data | Backend returns no assets for project | Empty state explains next step and app does not error | TODO |  |  |

## API / Data Validation

### Required backend reads
- `listProjects`
- `listAssetsByProject`
- `getAssetDetail`
- `listVersionsByAsset`
- `listNotesByAsset`

### Required backend writes
- `createReviewNote`
- `setCurrentVersion`
- `approveVersion`
- `rejectVersion`

### Data assertions
- `asset.currentVersionId` always points to an existing version when populated
- version switch updates both preview state and stored source of truth
- approval/rejection result is reflected on the asset record consistently
- note creation attaches to the right asset and optional version

## High-Risk Areas
1. Schema/UI mismatch because `assetVersions`, `reviewNotes`, and new asset fields are not present in current schema.
2. Approval state drift if approval/rejection writes only to `approvals` and not the asset's visible summary state.
3. Preview mismatch if version selection is stored locally but not persisted to `currentVersionId`.
4. Detail-page crashes when optional fields like thumbnail, notion link, or notes are absent.
5. Asset list inconsistency if list queries do not denormalize the current version thumbnail and approval state.

## Exit Criteria
Ship only when:
- all core workflow rows above pass
- no blocking schema mismatch remains
- no crash occurs on missing optional data
- approval/rejection state is visible and persisted consistently
- version switching is reflected immediately and after reload
