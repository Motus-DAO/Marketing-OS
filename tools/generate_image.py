#!/usr/bin/env python3
import argparse, base64, json, os, pathlib, sys, urllib.request

KEY_PATHS = [
    os.path.expanduser('~/.config/motusdao-os/openai_api_key'),
    os.path.expanduser('~/.config/openai/api_key'),
]


def load_key():
    env = os.environ.get('OPENAI_API_KEY')
    if env:
        return env.strip()
    for path in KEY_PATHS:
        p = pathlib.Path(path)
        if p.exists():
            return p.read_text().strip()
    raise SystemExit('OpenAI API key not found. Expected ~/.config/motusdao-os/openai_api_key or OPENAI_API_KEY env.')


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--prompt', help='Prompt text')
    ap.add_argument('--prompt-file', help='Path to prompt text file')
    ap.add_argument('--out', required=True, help='Output image path, e.g. content/assets/test.png')
    ap.add_argument('--size', default='1024x1536')
    ap.add_argument('--background', default='opaque')
    args = ap.parse_args()

    prompt = args.prompt
    if args.prompt_file:
        prompt = pathlib.Path(args.prompt_file).read_text()
    if not prompt:
        raise SystemExit('Provide --prompt or --prompt-file')

    key = load_key()
    payload = {
        'model': 'gpt-image-1',
        'prompt': prompt,
        'size': args.size,
        'background': args.background,
    }

    req = urllib.request.Request(
        'https://api.openai.com/v1/images/generations',
        data=json.dumps(payload).encode(),
        headers={
            'Authorization': f'Bearer {key}',
            'Content-Type': 'application/json',
        },
        method='POST',
    )

    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode())

    image_b64 = data['data'][0]['b64_json']
    out = pathlib.Path(args.out).expanduser()
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_bytes(base64.b64decode(image_b64))
    print(str(out))


if __name__ == '__main__':
    main()
