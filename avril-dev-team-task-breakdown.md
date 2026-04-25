# Avril Dev Team Task Breakdown

## Goal
Define clean subagent work packages for building the Dashboard MVP.

## Team structure
- Avril Backend Engineer
- Avril Frontend Engineer
- Avril UI Systems Engineer
- Avril QA Engineer

---

## 1. Avril Backend Engineer
### Mission
Implement the required Convex schema adjustments and data access layer.

### Tasks
- add `assetVersions` table
- add `reviewNotes` table
- extend `assets` table with currentVersionId, notionPageUrl, approvalState
- create queries for:
  - list projects
  - list assets by project
  - get asset detail
  - list versions by asset
  - list notes by asset
- create mutations for:
  - create review note
  - set current version
  - approve version
  - reject version

### Deliverable
Backend-ready Convex schema and functions.

---

## 2. Avril Frontend Engineer
### Mission
Build the MVP dashboard pages and connect them to Convex data.

### Tasks
- build Project Home
- build Asset List Page
- build Asset Detail Page
- connect project and asset data
- connect current version preview
- connect review actions

### Deliverable
Working dashboard UI with core navigation and data rendering.

---

## 3. Avril UI Systems Engineer
### Mission
Refine the internal product UX so reviewing assets feels clear and efficient.

### Tasks
- define dashboard layout consistency
- refine asset cards
- refine preview presentation
- refine version list UX
- refine note and approval action placement
- ensure clean information hierarchy

### Deliverable
Improved usability and visual clarity for the MVP.

---

## 4. Avril QA Engineer
### Mission
Validate the dashboard workflow and identify integration issues.

### Tasks
- test project selection flow
- test asset listing
- test asset detail rendering
- test version switching
- test review notes
- test approval/rejection flow
- test missing-data cases

### Deliverable
QA checklist and bug/risk report.

---

## Suggested build sequence
1. Backend Engineer
2. Frontend Engineer
3. UI Systems Engineer
4. QA Engineer

## Orchestration rule
The main session remains architect and reviewer. Avril agents should execute scoped tasks, not redesign the product independently.
