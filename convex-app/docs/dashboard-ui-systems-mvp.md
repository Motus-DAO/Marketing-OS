# Dashboard UI Systems Note, MVP

## Why this exists
The repo does not yet contain a frontend app shell, so this note defines the MVP UI system decisions the frontend build should follow. It is implementation-oriented on purpose, so the first pass can ship without re-deciding layout, hierarchy, or review behavior.

## Product stance
This is an internal review tool, not a branded marketing surface.

Design priorities, in order:
1. preview clarity
2. review speed
3. version comparison confidence
4. low-noise metadata access
5. clean connection back to Notion

The UI should feel clinically calm, operational, and quiet. Avoid ornamental chrome, loud gradients, playful cards, or social-style clutter.

## Core UX decisions

### 1. Make the preview the center of gravity
On asset detail, the image area is the primary object.
- Desktop: preview column should take roughly 60 to 70 percent of horizontal space.
- Sidebar content should be secondary and scannable.
- Keep version switching close enough to the preview that changes feel immediate.
- Never let notes or metadata push the main preview below the fold on desktop.

### 2. Separate review state from asset metadata
Do not mix identity fields and review controls into one dense block.

Use this order:
1. page title row
2. asset identity metadata
3. current review status + approval state
4. preview
5. versions
6. notes

This makes it obvious what the asset is before asking for judgment.

### 3. Optimize for single-asset review first, comparison second
MVP comparison should not require a full diff system.

Default interaction:
- selecting a version updates the main preview
- previous/current labels stay visible in the version list
- current version is visually pinned
- approved/rejected states are visible in list rows, not hidden in a menu

Recommended MVP compare pattern:
- add a `Compare to current` secondary action on each non-current version row
- when active, render a simple two-up comparison in the preview area:
  - left: selected version
  - right: current version
- if viewport is narrow, stack vertically instead of shrinking to unreadable thumbnails

Avoid for MVP:
- pixel diff
- draggable before/after sliders
- overlay opacity comparison

### 4. Keep actions persistent and unambiguous
Approval and version actions should not be buried at the bottom after notes.

Use a compact sticky action bar on desktop within the right column.
Primary actions:
- Approve version
- Reject version
- Set as current

Secondary action:
- Open Notion

Rules:
- disable `Set as current` when already current
- show confirmation copy only for reject if rejection has consequences
- keep button labels explicit, never icon-only

### 5. Notes are support, not the main workflow owner
Notes should help decisions, not dominate the page.
- default to newest first
- show author and timestamp in a muted line
- keep note composer always visible above the note list
- use a compact multiline input, not a large editor
- if empty, show a short prompt like `Add a review note or approval rationale`

### 6. Internal cleanliness beats dashboard theatrics
The MVP should feel closer to a review console than a BI dashboard.
- prefer table/list rhythm over masonry cards
- use restrained status color only where it aids scanning
- keep border, radius, and shadow systems subtle
- use one accent color max

## Page-level guidance

## Project Home
Goal: get into the right project fast.

Project card content:
- project name
- status badge
- optional count: assets in review
- short description only if useful

Interaction:
- full card clickable
- default sort: active first, then alphabetical

Do not include:
- oversized hero treatments
- decorative statistics without action value

## Asset List Page
Goal: scan many assets and open the right one quickly.

Preferred row/card pattern:
- use dense horizontal cards or table-like rows, not tall stacked cards
- thumbnail at left
- title + funnel stage + platform grouped together
- approval state and workflow status separated into distinct badges
- last updated aligned right

Recommended columns/regions:
1. thumbnail
2. title and taxonomy
3. workflow status
4. approval state
5. current version label
6. last updated

Filters should stay visible near the top and collapse cleanly on smaller screens.

Useful defaults:
- default sort by `updatedAt desc`
- sticky filter bar on longer lists
- empty states should suggest the likely reason, for example no assets yet vs no assets match filters

## Asset Detail Page
Recommended desktop layout:
- top header row across full width
- main content below in two columns
  - left: preview + compare mode
  - right: status, action bar, version list, notes

Suggested section order in the right column:
1. review summary card
2. sticky action bar
3. version list
4. notes
5. reference link block

On mobile/tablet:
- stack sections vertically
- keep preview first
- move sticky action bar directly below preview

## Component guidance

### StatusBadge
Use for workflow progression only.
Examples: Draft, In Review, Ready, Blocked.

### ApprovalBadge
Use only for review judgment.
Examples: Pending, Approved, Rejected.

Do not merge these concepts into one badge.

### AssetCard or AssetRow
Must support fast scanning.
Required states:
- default
- hover
- selected
- missing preview image
- approved
- rejected

### CarouselPreview
Requirements:
- fixed, calm frame around slide image
- preserve aspect ratio
- image centered with neutral backdrop
- support 6 to 7 slide navigation without visual jumpiness
- current slide indicator should be text-first, e.g. `Slide 3 of 7`

If full multi-slide preview is not ready, ship a single-slide preview with slide picker rather than a cramped strip.

### VersionList
Each row should show:
- version label
- created date/time
- status badge
- approval badge
- current marker
- preview thumb
- compare action

Visual emphasis:
- current version row gets strongest outline
- selected comparison candidate gets second-level highlight
- destructive or terminal states should not overpower current selection styling

### ReviewActionBar
Button order:
1. Approve
2. Reject
3. Set as current
4. Open Notion

Reasoning:
- judgment actions first
- state-changing operational action next
- external reference last

## Visual system guidance

### Tone
Borrow from the MotusDAO brand system in seriousness and clarity, but keep this tool more neutral than public-facing brand work.

### Color behavior
- background: controlled neutrals
- surface elevation: subtle separation only
- text: strong contrast
- accent: sparse and functional
- green/red use only for approval outcomes and only at moderate saturation

### Spacing rhythm
Use a compact but breathable density.
- page sections: generous separation
- controls within cards: tight alignment
- metadata lines: compact, single-purpose

### Typography behavior
- strong title hierarchy
- labels small and quiet
- values readable, not tiny
- timestamps and helper text muted

## State and copy rules

### Empty states
Explain the missing thing and the next useful action.
Examples:
- `No versions uploaded yet.`
- `No notes yet. Add context for the next reviewer.`
- `No assets match these filters.`

### Destructive clarity
For reject actions, require a note or encourage one strongly if the backend allows it.
Suggested helper copy: `Use rejection notes to make the next version faster to review.`

### Notion relationship
Notion is a reference source, not the review surface.
- link to Notion from header or action bar
- do not embed long Notion content blocks in the MVP detail page

## Suggested implementation sequence for frontend
1. define shared badges and row/card primitives
2. build Asset List with final information hierarchy first
3. build Asset Detail layout shell with sticky action area
4. add version selection state
5. add two-up compare mode
6. add notes composer/list polish

## Handoff notes for frontend engineer
If the frontend app gets scaffolded, start with these primitives:
- `PageHeader`
- `InfoField`
- `StatusBadge`
- `ApprovalBadge`
- `AssetRow`
- `PreviewFrame`
- `VersionRow`
- `StickyActionBar`
- `EmptyState`

Keep the first implementation visually plain. Correct hierarchy is more important than visual flourish.
