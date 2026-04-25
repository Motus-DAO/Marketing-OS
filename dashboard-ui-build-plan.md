# Dashboard UI Build Plan

## Goal
Build the minimum useful dashboard for reviewing carousel assets without replacing Notion.

## MVP purpose
The dashboard should make it easy to:
- review visual assets
- compare versions
- approve or reject versions
- leave notes
- connect assets back to project and Notion

---

## Screens

### 1. Project Home
Purpose:
- select project

Show:
- MotusDAO
- Avril
- Brahma101.eth

Each card shows:
- project name
- status
- quick count of assets in review (optional)

### 2. Asset List Page
Purpose:
- view all assets for one project

Show per asset:
- title
- platform
- format
- funnel stage
- status
- approval state
- thumbnail of current version
- last updated

Filters:
- status
- platform
- funnel stage
- approval state

### 3. Asset Detail Page
Purpose:
- review one asset deeply

Sections:

#### A. Metadata header
- title
- project
- platform
- format
- funnel stage
- status
- approval state
- notion link

#### B. Carousel preview section
- full 7-slide preview
- current selected version shown by default

#### C. Version list
- version label
- thumbnail
- status
- createdAt
- set current version action

#### D. Review notes
- notes list
- add note input

#### E. Actions
- approve version
- reject version
- set current version
- open Notion page

---

## Components

### Shared components
- ProjectCard
- AssetCard
- FilterBar
- StatusBadge
- ApprovalBadge

### Asset detail components
- AssetHeader
- CarouselPreview
- VersionList
- ReviewNoteList
- ReviewActionBar

---

## Design guidance
- clean, minimal internal tool
- optimize for clarity over decoration
- large preview area
- strong hierarchy
- make image review fast
- keep Notion as linked reference, not embedded workflow owner
- follow implementation detail in `convex-app/docs/dashboard-ui-systems-mvp.md` for MVP layout, version comparison behavior, and action placement

---

## Build order
1. Project Home
2. Asset List Page
3. Asset Detail Page
4. Version switching
5. Review note creation
6. Approval/rejection actions

---

## Out of scope for MVP
- publishing controls
- analytics dashboard
- scheduling
- auth complexity
- agent execution controls
- comments threads
- drag and drop
