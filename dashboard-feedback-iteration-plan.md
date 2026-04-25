# Dashboard Feedback Iteration Plan

## Goal
Add a real review workflow to the dashboard so approval, rejection, and actionable feedback can happen inside the system.

## New capabilities
- richer version review states
- overall carousel comments
- per-slide comments
- optional resolve state for comments
- foundation for future triggers/webhooks

---

## Recommended review states
For asset versions:
- candidate
- in_review
- approved
- rejected
- needs_changes

For asset summary state:
- pending
- in_review
- approved
- rejected
- needs_changes

---

## Feedback model
Use one comments table for both scopes.

### Proposed table: `feedbackComments`
Fields:
- projectId
- assetId
- assetVersionId
- scopeType (`asset` | `slide`)
- slideIndex (optional)
- body
- authorType (`human` | `agent`)
- authorId
- status (`open` | `resolved`) optional
- createdAt
- updatedAt

### Purpose
- overall carousel review notes
- precise slide feedback
- future review audit trail
- future resolve/unresolve workflow

---

## UI additions
### Asset detail page
Add:
- review state control
- overall comments section
- slide comments section tied to selected slide
- resolve state indicator for comments

### Carousel preview
Allow selected slide context so comments can attach to a specific slide.

---

## Future automation layer
Once feedback is stored in Convex, future triggers can:
- create revision tasks
- notify team
- sync summaries to Notion
- spawn agent revision loops

Webhook/event handling is optional for now and can come after the comment system exists.
