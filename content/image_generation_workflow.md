# Image Generation Workflow

## Purpose
Provide a clean local workflow for generating first-pass visual backgrounds or concept images using the OpenAI image API inside MotusDAO OS.

## Files
- tools/generate_image.py
- content/prompts/
- content/assets/

## Key storage
Expected key path:
- ~/.config/motusdao-os/openai_api_key

Fallback supported:
- ~/.config/openai/api_key
- OPENAI_API_KEY environment variable

## Usage
Example:

```bash
python3 ~/projects/motusdao-os/tools/generate_image.py \
  --prompt-file ~/projects/motusdao-os/content/prompts/ig-carousel-5-errores-cover.txt \
  --out ~/projects/motusdao-os/content/assets/ig-carousel-5-errores/cover-bg.png
```

## Best use cases
- background image generation
- concept scene exploration
- atmospheric visual testing
- cover slide visual development

## Not best for
- final full carousel layout generation
- typography-perfect slide composition
- reusable layout systems

Use image generation to support the HTML/CSS or SVG design system, not to replace it.

## Recommended operating pattern
1. Generate 2 to 4 cover/background variants
2. Review best direction
3. Integrate chosen visual into slide system
4. Iterate with stronger prompts if needed

## Safety and consistency
- Keep prompts aligned to the MotusDAO brand system
- Avoid generic wellness visuals
- Avoid exaggerated sci-fi tech tropes
- Keep clinical seriousness and premium tone
