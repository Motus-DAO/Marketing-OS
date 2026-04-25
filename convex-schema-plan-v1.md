# MotusDAO OS Convex Schema Plan v1

## Purpose
This document defines the first structured Convex schema plan for MotusDAO OS.

The goal is to create a clean, reusable, multi-project machine-facing foundation that supports:
- structured operational state
- compressed memory
- agent orchestration
- asset and funnel tracking
- performance learning
- future replication across projects

## Architectural role of Convex
Convex is the machine-facing OS layer.

It should support:
- runtime state
- automation state
- compressed context
- learnings and decisions
- structured logs of what works
- metrics snapshots
- future replication across projects

It should not become a transcript dump or replace Notion as the human-facing workspace.

## Architectural split
- Notion = human-facing OS
- Convex = machine-facing OS
- Project files = prompts, standards, docs, and system definitions

## v1 Design principles
1. Project-first architecture
2. Store less, structure more
3. Summarize continuously
4. Prefer compressed memory over raw logs
5. Keep schemas reusable across multiple projects
6. Separate runtime state from intelligence state

## Supported project model
All core tables must be project-scoped.

Initial projects:
- MotusDAO
- Avril
- Brahma101.eth

This allows the same schema to support multiple initiatives without mixing context.

---

# Table groups

## Group A. Core entities

### 1. projects
Purpose: top-level project container for all data.

Suggested fields:
- name
- slug
- description
- status
- primaryGoals
- primaryMonetizationPath
- activeChannels
- createdAt
- updatedAt

Suggested indexes:
- by_slug
- by_status

### 2. workspaces
Purpose: map projects to external operating environments.

Suggested fields:
- projectId
- type (`notion`, `filesystem`, `convex`, `openclaw`, `other`)
- identifier
- label
- notes
- createdAt

Suggested indexes:
- by_project
- by_project_type

### 3. references
Purpose: store pointers to source artifacts and evidence.

Suggested fields:
- projectId
- type (`notion_page`, `file`, `folder`, `url`, `image`, `render_output`, `prompt`, `other`)
- title
- location
- relatedEntityType
- relatedEntityId
- notes
- createdAt

Suggested indexes:
- by_project
- by_related_entity
- by_type

---

## Group B. Runtime state

### 4. assets
Purpose: machine-readable representation of content and campaign assets.

Suggested fields:
- projectId
- title
- platform
- format
- funnelStage
- objective
- audienceSummary
- status
- version
- sourceIdeaTitle
- CTA
- campaignId (optional)
- primaryReferenceId (optional)
- createdAt
- updatedAt

Suggested indexes:
- by_project
- by_project_status
- by_project_platform
- by_campaign

### 5. tasks
Purpose: execution work items for humans or agents.

Suggested fields:
- projectId
- title
- type
- status
- priority
- ownerType (`human`, `agent`)
- ownerId
- relatedAssetId (optional)
- relatedCampaignId (optional)
- nextActionSummary
- dueAt (optional)
- createdAt
- updatedAt

Suggested indexes:
- by_project
- by_project_status
- by_owner
- by_related_asset

### 6. agentRuns
Purpose: structured tracking of agent execution.

Suggested fields:
- projectId
- agentType
- taskType
- inputSummary
- outputSummary
- status
- relatedAssetId (optional)
- relatedTaskId (optional)
- relatedReferenceIds
- startedAt
- finishedAt
- createdAt

Suggested indexes:
- by_project
- by_project_status
- by_agent_type
- by_related_asset
- by_related_task

### 7. approvals
Purpose: track approval gates for assets, campaigns, or operations.

Suggested fields:
- projectId
- resourceType
- resourceId
- requestedByType
- requestedById
- status (`pending`, `approved`, `rejected`)
- notes
- createdAt
- updatedAt

Suggested indexes:
- by_project
- by_project_status
- by_resource

---

## Group C. Intelligence and memory

### 8. memoryEntries
Purpose: compressed operational memory.

Suggested types:
- `summary`
- `decision`
- `next_action`
- `learning`
- `reference`
- `genesis`

Suggested fields:
- projectId
- type
- title
- body
- tags
- sourceRefIds
- relatedEntityType
- relatedEntityId
- status
- supersededById (optional)
- createdByType
- createdById
- createdAt

Suggested indexes:
- by_project
- by_project_type
- by_related_entity
- by_status

### 9. decisions
Purpose: preserve durable strategic and operating decisions.

Suggested fields:
- projectId
- title
- decision
- rationale
- impactArea
- relatedRefIds
- supersededById (optional)
- createdAt

Suggested indexes:
- by_project
- by_impact_area

### 10. learnings
Purpose: structured evidence of what worked, failed, and should be reused.

Suggested fields:
- projectId
- title
- hypothesis
- actionTaken
- outcome
- interpretation
- replicate (`yes`, `no`, `conditional`)
- conditions
- relatedAssetId (optional)
- relatedCampaignId (optional)
- createdAt

Suggested indexes:
- by_project
- by_replicate
- by_related_asset
- by_related_campaign

### 11. metricsSnapshots
Purpose: store structured performance metrics over time.

Suggested fields:
- projectId
- channel
- metricName
- metricValue
- timeframe
- relatedAssetId (optional)
- relatedCampaignId (optional)
- notes
- createdAt

Suggested indexes:
- by_project
- by_project_channel
- by_metric_name
- by_related_asset
- by_related_campaign

---

## Optional v1.1 table

### 12. genesisRecords (optional)
Purpose: preserve the genesis of important processes without storing raw conversations.

This may stay as a subtype of `memoryEntries` in v1 to keep the model simpler.

If split later, suggested fields:
- projectId
- title
- summary
- originQuestion
- decisionOrInsight
- whyItMatters
- referenceIds
- relatedEntityType
- relatedEntityId
- tags
- createdAt

Suggested indexes:
- by_project
- by_related_entity

Recommendation: keep genesis inside `memoryEntries` with `type = genesis` for v1 unless usage grows quickly.

---

# Memory model

## Working memory
Lives primarily in:
- tasks
- agentRuns
- recent memoryEntries

Examples:
- active asset in production
- current blockers
- current review state

## Long-term memory
Lives primarily in:
- decisions
- learnings
- durable memoryEntries

Examples:
- approved funnel rules
- visual system decisions
- monetization lessons

## Compressed context
Lives primarily in:
- memoryEntries with `type = summary`

Examples:
- latest project summary
- latest campaign summary
- current narrative summary
- active next actions

This layer is critical for reducing prompt stuffing and token waste.

---

# Genesis conversations rule
Important origin conversations should not be stored as raw prompt transcripts.
Instead, preserve them as summarized genesis records.

Rule:
- keep origin logic
- summarize into decision-quality memory
- attach references
- avoid prompt bloat

This preserves institutional reasoning without overwhelming the context system.

---

# Mapping to Notion

## Notion remains the source of truth for human workflow
- Ideas
- Content Engine
- Tasks
- Projects
- Metrics
- reviews
- publishing plans

## Convex complements Notion
Convex should be used for:
- structured runtime state
- memory compression
- agent run tracking
- cross-project learning
- machine-usable logs of what worked

## General mapping
- Notion content item -> Convex asset
- Notion task -> Convex task (optional sync or mirrored state)
- Notion project -> Convex project or campaign references
- Notion metrics -> Convex metricsSnapshots

This does not require perfect sync in v1. It only requires clean ownership boundaries.

---

# Recommended v1 implementation order

## Phase 1. Foundation
Implement first:
- projects
- workspaces
- references
- memoryEntries
- decisions
- learnings

Why: these create the memory and architecture foundation first.

## Phase 2. Runtime
Implement next:
- assets
- tasks
- agentRuns
- approvals

Why: these power the operational workflow.

## Phase 3. Metrics and intelligence
Implement next:
- metricsSnapshots
- summaries and compressed retrieval helpers

Why: these make optimization and replication easier once enough activity exists.

---

# What not to include yet
Avoid in v1:
- raw transcript storage
- overcomplicated auth models
- deep event-sourcing for everything
- project-specific tables that break replication
- too many workflow-specific states too early

Keep v1 reusable and project-agnostic.

---

# Replication rule
This schema must be reusable for new projects without redesign.

That means:
- same tables
- project-scoped data
- reusable memory logic
- reusable agent orchestration patterns
- reusable metrics tracking

MotusDAO is the first implementation.
Then the system should propagate, replicate, and escalate to:
- Avril
- Brahma101.eth
- future projects

---

# Final operating principle
The OS must convert complex initiative clusters into structured, repeatable narrative systems.

This Convex foundation is designed to make that operational, measurable, and reusable.
