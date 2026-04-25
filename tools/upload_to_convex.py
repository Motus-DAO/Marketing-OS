#!/usr/bin/env python3
import argparse, json, mimetypes, pathlib, subprocess, urllib.request
from datetime import datetime, timezone


def convex(action, payload=None):
    cmd = ['npx', 'convex', 'run', action]
    if payload is not None:
        cmd.append(json.dumps(payload))
    out = subprocess.check_output(cmd, cwd='/home/gerry/projects/motusdao-os/convex-app')
    text = out.decode().strip()
    try:
        return json.loads(text)
    except Exception:
        return text


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--file', required=True)
    ap.add_argument('--project-id', required=True)
    ap.add_argument('--title', required=True)
    ap.add_argument('--related-entity-type')
    ap.add_argument('--related-entity-id')
    ap.add_argument('--notes')
    args = ap.parse_args()

    file_path = pathlib.Path(args.file).expanduser().resolve()
    mime = mimetypes.guess_type(str(file_path))[0] or 'application/octet-stream'

    upload_url = convex('files:generateUploadUrl')
    if isinstance(upload_url, dict) and 'url' in upload_url:
        upload_url = upload_url['url']

    req = urllib.request.Request(upload_url, data=file_path.read_bytes(), method='POST', headers={'Content-Type': mime})
    with urllib.request.urlopen(req) as resp:
        body = json.loads(resp.read().decode())
    storage_id = body.get('storageId') or body.get('storage_id') or body.get('id')
    if not storage_id:
        raise SystemExit(f'No storage id returned: {body}')

    payload = {
        'projectId': args.project_id,
        'storageId': storage_id,
        'title': args.title,
        'mimeType': mime,
        'createdAt': datetime.now(timezone.utc).isoformat(),
    }
    if args.related_entity_type:
        payload['relatedEntityType'] = args.related_entity_type
    if args.related_entity_id:
        payload['relatedEntityId'] = args.related_entity_id
    if args.notes:
        payload['notes'] = args.notes

    created = convex('files:createAssetReference', payload)
    print(json.dumps({'storageId': storage_id, 'created': created}, ensure_ascii=False))


if __name__ == '__main__':
    main()
