# Design Production Workflow

## Purpose
Provide a repeatable workflow for generating first-draft carousel visuals as HTML/CSS or SVG-based mockups before final human or agent-assisted design refinement.

## Workflow

### Step 1. Confirm approved packet
Input must already exist as a production packet with:
- funnel stage
- objective
- approved copy
- visual direction
- typography rules
- gradient rules
- slide-by-slide guidance

### Step 2. Choose output mode
Preferred order:
1. HTML/CSS slide system
2. SVG-per-slide system

Use HTML/CSS when:
- the goal is repeatable layout templates
- text and hierarchy matter more than illustration complexity
- future assets will reuse the same structure

Use SVG when:
- greater graphic control is needed
- layout is still structured but needs more precision per slide

### Step 3. Build reusable structure
For the first asset, create:
- shared styles file or consistent embedded style system
- slide 1 cover structure
- internal content slide structure
- CTA slide structure

### Step 4. Apply brand rules
- canvas: 1080 x 1350
- headline font: Jura Bold
- body font: Inter
- dark cinematic editorial background system
- controlled accent gradients on key phrases only
- high contrast and mobile readability

### Step 5. Produce first-draft files
Target output example:
- content/assets/ig-carousel-5-errores/
- content/assets/ig-carousel-5-errores/index.html
- content/assets/ig-carousel-5-errores/styles.css
- or SVG slide files

### Step 6. QA check
Validate:
- slide readability on mobile
- consistency across all slides
- correct hierarchy
- strong cover slide
- clear CTA slide
- visual alignment to MotusDAO

### Step 7. Iterate
After first mockup:
- review text density
- adjust spacing
- refine contrast
- improve visual emphasis
- decide if AI image generation should be used for better backgrounds or concept layers

## Current first test case
Asset:
- 5 errores comunes al pasar de consulta presencial a online

Packet:
- content/ig-carousel-5-errores-production-packet.md

## Operating note
This workflow is for draft asset generation. Final visual approval should still pass through human review or QA review before publishing.
