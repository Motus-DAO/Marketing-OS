# Render Workflow

## Purpose
Generate PNG review previews from local HTML carousel mockups in a clean, removable way.

## Tool
- tools/render_html_slides.py

## Requirements
- Playwright Python package
- Chromium available through Playwright install

## Install path
Recommended isolated install:

```bash
python3 -m venv ~/projects/motusdao-os/.venv
source ~/projects/motusdao-os/.venv/bin/activate
pip install playwright
python -m playwright install chromium
```

## Usage
```bash
source ~/projects/motusdao-os/.venv/bin/activate
python ~/projects/motusdao-os/tools/render_html_slides.py \
  --html ~/projects/motusdao-os/content/assets/ig-carousel-5-errores/index.html \
  --outdir ~/projects/motusdao-os/content/assets/ig-carousel-5-errores/previews
```

## Why this is safe
- isolated in project-local venv
- no need to modify core OS workflow files
- removable by deleting `.venv/`
- only adds one render helper script in `tools/`

## Removal
To remove the render path cleanly:
```bash
rm -rf ~/projects/motusdao-os/.venv
rm ~/projects/motusdao-os/tools/render_html_slides.py
```
