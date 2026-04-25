# Dashboard MVP QA Report

## PASS/FAIL Summary
FAIL

## Checklist Table

| Item | Status (PASS/FAIL) | Evidence | Exact Fix |
| --- | --- | --- | --- |
| Project selection flow implemented | FAIL | No dashboard UI routes or React pages found under `convex-app/` or repo root app structure. Repository currently contains planning docs and Convex schema files only. | Implement Project Home screen and routing for project selection. |
| Asset listing implemented | FAIL | No asset list page/components found. | Implement Asset List page with project-scoped asset query and filter UI. |
| Asset detail rendering implemented | FAIL | No asset detail page/components found. | Implement Asset Detail page with metadata header, carousel preview, version list, notes, and actions. |
| Version switching backend support | FAIL | `convex-app/convex/schema.ts` does not include `assetVersions`; `assets` does not include `currentVersionId`. | Add `assetVersions` table and extend `assets` with `currentVersionId`; add mutation for set current version. |
| Review notes backend support | FAIL | `convex-app/convex/schema.ts` does not include `reviewNotes`. | Add `reviewNotes` table and note creation/listing functions. |
| Approval/rejection MVP alignment | FAIL | Schema has a generic `approvals` table, but `assets.approvalState` is not present, creating likely UI summary drift. | Extend `assets` with `approvalState` and ensure approve/reject mutations update the asset summary state consistently. |
| Missing-data handling validated | FAIL | Cannot validate because dashboard UI is not present. Current schema also lacks several optional MVP fields. | Build fallback UI states and seed partial records for QA. |
| QA execution path available | PASS | Created `qa/dashboard-mvp-integration-checklist.md` and this report path at `qa/reports/dashboard-mvp-qa-report.md`. | Use checklist during implementation and update statuses with evidence. |

## Critical Fixes First
1. Add the missing schema pieces from `dashboard-schema-adjustment-list.md`:
   - `assetVersions`
   - `reviewNotes`
   - `assets.currentVersionId`
   - `assets.notionPageUrl`
   - `assets.approvalState`
2. Implement backend queries and mutations promised in `avril-dev-team-task-breakdown.md`:
   - list assets by project
   - get asset detail
   - list versions by asset
   - list notes by asset
   - create review note
   - set current version
   - approve version
   - reject version
3. Build the three MVP screens from `dashboard-ui-build-plan.md`:
   - Project Home
   - Asset List Page
   - Asset Detail Page
4. Seed realistic data including multi-version assets and missing optional fields, then execute the checklist.

## Ready to Ship?
No

## Current Repo Findings
- Existing Convex foundation is present in `convex-app/convex/schema.ts`.
- Only `projects.ts` query/mutation file is present for dashboard-related data access.
- No visible dashboard frontend implementation was found in the repository.
- The QA package is ready, but end-to-end validation is blocked until backend and frontend MVP implementation exists.
