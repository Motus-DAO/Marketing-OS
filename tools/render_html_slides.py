#!/usr/bin/env python3
import argparse
from pathlib import Path
from playwright.sync_api import sync_playwright


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--html', required=True, help='Path to local HTML file')
    ap.add_argument('--outdir', required=True, help='Directory for PNG screenshots')
    ap.add_argument('--selector', default='.slide', help='CSS selector for slide elements')
    args = ap.parse_args()

    html_path = Path(args.html).expanduser().resolve()
    outdir = Path(args.outdir).expanduser().resolve()
    outdir.mkdir(parents=True, exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={'width': 1200, 'height': 1600}, device_scale_factor=1)
        page.goto(html_path.as_uri(), wait_until='networkidle')
        slides = page.locator(args.selector)
        count = slides.count()
        for i in range(count):
            slide = slides.nth(i)
            slide.screenshot(path=str(outdir / f'slide-{i+1:02d}.png'))
        browser.close()
        print(str(outdir))


if __name__ == '__main__':
    main()
