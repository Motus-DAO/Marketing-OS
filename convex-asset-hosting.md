# Convex Asset Hosting Flow

## Purpose
Host generated image assets through Convex storage, store their public URLs in the database, and make those links reusable in Notion and automation flows.

## Components
- `convex/files.ts` for upload URL generation and reference creation
- `tools/upload_to_convex.py` for local upload from generated files
- `references` table stores resulting public URLs and metadata

## Flow
1. Generate image locally
2. Request upload URL from Convex
3. Upload binary file to Convex storage
4. Resolve public URL
5. Store URL + metadata in `references`
6. Push URL into Notion content item

## Why this helps
- avoids direct Notion file upload issues
- keeps asset hosting under the OS runtime layer
- gives machine-readable and human-usable asset references
- supports future replication across projects
