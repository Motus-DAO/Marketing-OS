# Convex Foundation Notes

## Additional section: Genesis conversations

The Convex foundation should include a place to store the most important conversations, not as raw prompt bloat, but as the genesis of important processes.

This should not become a transcript dump.
Instead, it should store the distilled origin of strategic moves, systems, and operating patterns.

## Purpose
Use this layer to preserve the genesis of:
- important process decisions
- system architecture choices
- major strategic pivots
- origin reasoning behind workflows
- why a structure was created the way it was

## Recommended representation
This can be implemented as either:
- a specialized subtype of `memoryEntries`
- or a dedicated table such as `genesisRecords`

## Genesis record shape
Suggested fields:
- projectId
- title
- summary
- originQuestion
- decisionOrInsight
- whyItMatters
- references
- relatedEntityType
- relatedEntityId
- createdAt
- tags

## Rules
- store only high-signal origin material
- no raw conversation logs by default
- summarize the conversation into decision-quality memory
- attach references to the underlying artifacts when useful

## Why this matters
This gives the OS a way to preserve institutional origin logic without creating prompt bloat.
It also helps future agents understand not just what exists, but why it exists.

## Design reminder
The OS must convert complex initiative clusters into structured, repeatable narrative systems.
We start with MotusDAO, then propagate, replicate, and escalate.
