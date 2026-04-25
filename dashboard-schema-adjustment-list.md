# Dashboard Schema Adjustment List

## Goal
Adjust the current Convex foundation so it supports the Dashboard MVP for visual asset review, version comparison, approval, and notes.

## Current state
Existing tables already created:
- projects
- workspaces
- references
- assets
- tasks
- agentRuns
- approvals
- memoryEntries
- decisions
- learnings
- metricsSnapshots

## Main gap for dashboard MVP
The dashboard needs stronger support for:
- asset versions
- review notes
- stable selected/current version
- optional Notion link directly on the asset record

---

## Required additions

### 1. Add `assetVersions` table
Purpose: store multiple versions of the same asset.

Suggested fields:
- projectId
- assetId
- versionLabel
- coverImageUrl
- previewUrls
- status (`candidate`, `approved`, `rejected`)
- notes
- createdAt
- updatedAt

Suggested indexes:
- by_asset
- by_asset_status
- by_project

### 2. Add `reviewNotes` table
Purpose: store review comments and iteration notes.

Suggested fields:
- projectId
- assetId
- assetVersionId (optional)
- note
- authorType (`human`, `agent`)
- authorId
- createdAt

Suggested indexes:
- by_asset
- by_asset_version
- by_project

### 3. Extend `assets` table
Add fields:
- currentVersionId (optional)
- notionPageUrl (optional)
- approvalState (`pending`, `approved`, `rejected`) optional

Reason:
- dashboard needs one canonical version to display
- fast link back to Notion
- easy approval filtering

### 4. Optional extension to `references`
No urgent schema change required, but references should continue to be used for:
- Notion page links
- hosted image URLs
- local preview folder links
- render output references

---

## Recommended implementation order
1. add `assetVersions`
2. add `reviewNotes`
3. extend `assets` with currentVersionId, notionPageUrl, approvalState
4. create first seed records from current carousel workflow

---

## Seed strategy after schema update
For the current MotusDAO content review workflow:
- one asset record per carousel
- one assetVersion record per generated version set
- one currentVersionId on asset
- reviewNotes for feedback iterations

This gives the dashboard immediate useful data.
