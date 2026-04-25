#!/usr/bin/env python3
from pathlib import Path

BASE = Path('/home/gerry/projects/motusdao-os/content/carousels')

CAROUSELS = {
    '5-errores': {
        'title': '5 errores comunes al pasar de consulta presencial a online',
        'highlight': 'consulta presencial a online',
        'slides': [
            ('cover', '5 errores comunes al pasar de consulta presencial a online', 'consulta presencial a online'),
            ('gradient', 'Error 1: creer que solo cambió el formato', 'solo cambió el formato'),
            ('cover', 'Error 2: sostener la misma lógica clínica intacta', 'misma lógica clínica'),
            ('gradient', 'Error 3: reducir lo digital a herramientas', 'herramientas'),
            ('cover', 'Error 4: leer desde diagnósticos cerrados', 'diagnósticos cerrados'),
            ('gradient', 'Error 5: no actualizar la estructura ética y técnica', 'estructura ética y técnica'),
            ('cover', 'Reserva tu lugar en la masterclass gratuita', 'masterclass gratuita'),
        ],
        'gradients': ['linear-gradient(135deg,#0f172a 0%,#0ea5e9 50%,#8b5cf6 100%)']*7,
    },
    'masterclass-psicologia-digital': {
        'title': 'Qué aprenderás en la masterclass gratuita sobre Psicología Digital',
        'highlight': 'masterclass gratuita',
        'slides': [
            ('cover', 'Qué aprenderás en la masterclass gratuita sobre Psicología Digital', 'masterclass gratuita'),
            ('gradient', 'Comprender qué cambia realmente al pasar a la clínica digital', 'clínica digital'),
            ('cover', 'Ir más allá de diagnósticos cerrados', 'diagnósticos cerrados'),
            ('gradient', 'Entender la estructura ética, técnica y lógica', 'ética, técnica y lógica'),
            ('cover', 'Ver por qué la práctica online exige otro encuadre', 'otro encuadre'),
            ('gradient', 'Prepararte para profundizar luego en el curso', 'profundizar luego en el curso'),
            ('cover', 'Regístrate a la masterclass gratuita', 'Regístrate'),
        ],
        'gradients': ['linear-gradient(135deg,#111827 0%,#7c3aed 45%,#22d3ee 100%)']*7,
    },
    'yo-ya-doy-terapia-online': {
        'title': 'Yo ya doy terapia online, ¿para qué actualizarme?',
        'highlight': '¿para qué actualizarme?',
        'slides': [
            ('cover', 'Yo ya doy terapia online, ¿para qué actualizarme?', '¿para qué actualizarme?'),
            ('gradient', 'Porque atender online no implica haber transitado la clínica digital', 'clínica digital'),
            ('cover', 'El medio cambió, pero también cambia la escucha', 'la escucha'),
            ('gradient', 'Actualizarte no es repetir herramientas, es revisar criterio', 'criterio'),
            ('cover', 'Lo online exige otra lectura de encuadre y posición', 'encuadre y posición'),
            ('gradient', 'La actualización es clínica, no solo técnica', 'clínica'),
            ('cover', 'Reserva tu lugar en la masterclass gratuita', 'masterclass gratuita'),
        ],
        'gradients': ['linear-gradient(135deg,#1f2937 0%,#06b6d4 40%,#a855f7 100%)']*7,
    },
    'dar-terapia-online-no-es-solo-cambiar-de-formato': {
        'title': 'Dar terapia online no es solo cambiar de formato',
        'highlight': 'cambiar de formato',
        'slides': [
            ('cover', 'Dar terapia online no es solo cambiar de formato', 'cambiar de formato'),
            ('gradient', 'Lo que cambia no es solo la herramienta, sino la estructura', 'la estructura'),
            ('cover', 'El encuadre también se transforma', 'El encuadre'),
            ('gradient', 'La experiencia del paciente se reorganiza', 'experiencia del paciente'),
            ('cover', 'La escucha clínica se desplaza', 'escucha clínica'),
            ('gradient', 'Por eso no basta con digitalizar lo mismo', 'digitalizar lo mismo'),
            ('cover', 'Descúbrelo en la masterclass gratuita', 'masterclass gratuita'),
        ],
        'gradients': ['linear-gradient(135deg,#0b1020 0%,#14b8a6 45%,#6366f1 100%)']*7,
    },
}

CSS = """
:root {
  --text: #f8fafc;
  --muted: rgba(248,250,252,0.78);
  --stroke: rgba(255,255,255,0.10);
  --word-gradient: linear-gradient(90deg,#9ee7ff 0%,#56b7ff 45%,#8f7dff 100%);
}
* { box-sizing: border-box; }
body { margin:0; background:#02050a; color:var(--text); font-family:'Inter',sans-serif; }
.deck { display:grid; gap:32px; padding:32px 20px 80px; justify-content:center; }
.slide {
  width:1080px; height:1350px; position:relative; overflow:hidden; border:1px solid var(--stroke);
  background:#0b1020;
}
.slide .overlay { position:absolute; inset:0; background:linear-gradient(180deg,rgba(3,8,18,0.18),rgba(3,8,18,0.48)); }
.slide.cover-slide .bg, .slide.image-slide .bg {
  position:absolute; inset:0; background-size:cover; background-position:center center;
}
.slide.gradient-slide .bg { position:absolute; inset:0; }
.slide::after {
  content:''; position:absolute; inset:0;
  background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size:64px 64px; opacity:.5;
}
.content { position:relative; z-index:2; height:100%; padding:92px 86px; display:flex; flex-direction:column; justify-content:center; }
.eyebrow { font-size:22px; letter-spacing:.14em; text-transform:uppercase; color:var(--muted); margin-bottom:24px; }
.title { font-family:'Jura',sans-serif; font-weight:700; line-height:.98; letter-spacing:-.02em; font-size:96px; max-width:860px; }
.title.small { font-size:82px; }
.sub { margin-top:26px; font-size:30px; line-height:1.35; max-width:760px; color:#d8e1ef; }
.brand { position:absolute; left:86px; top:56px; display:flex; align-items:center; gap:16px; z-index:3; }
.brand-name { font-family:'Jura',sans-serif; font-size:28px; letter-spacing:.02em; }
.logo-dot { width:18px; height:18px; border-radius:999px; background:var(--word-gradient); }
.word { background:var(--word-gradient); -webkit-background-clip:text; background-clip:text; color:transparent; }
@media (max-width: 1160px){ .slide { transform:scale(.7); transform-origin:top center; margin-bottom:-360px; } }
"""

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang=\"es\">
<head>
  <meta charset=\"UTF-8\" />
  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />
  <title>{title}</title>
  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">
  <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>
  <link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Jura:wght@700&display=swap\" rel=\"stylesheet\">
  <link rel=\"stylesheet\" href=\"./styles.css\" />
</head>
<body>
<main class=\"deck\">{slides}</main>
</body>
</html>
"""


def emphasize(text, phrase):
    if phrase and phrase in text:
        return text.replace(phrase, f'<span class="word">{phrase}</span>', 1)
    return text


def build_slide(kind, text, phrase, gradient, cover_name='cover.png', cta=False):
    cls = 'gradient-slide' if kind == 'gradient' else 'image-slide'
    if kind == 'cover':
        cls = 'cover-slide'
    bg = f"<div class='bg' style=\"background:{gradient};\"></div>" if kind == 'gradient' else f"<div class='bg' style=\"background-image:url('./{cover_name}');\"></div><div class='overlay'></div>"
    size = ' small' if len(text) > 70 else ''
    return f"<section class='slide {cls}'>{bg}<div class='brand'><div class='logo-dot'></div><div class='brand-name'>MotusDAO</div></div><div class='content'><div class='eyebrow'>Instagram Carousel</div><div class='title{size}'>{emphasize(text, phrase)}</div></div></section>"


def main():
    for slug, cfg in CAROUSELS.items():
        folder = BASE / slug
        slides_html = []
        for idx, (kind, text, phrase) in enumerate(cfg['slides']):
            slides_html.append(build_slide(kind, text, phrase, cfg['gradients'][idx]))
        (folder / 'styles.css').write_text(CSS)
        (folder / 'index.html').write_text(HTML_TEMPLATE.format(title=cfg['title'], slides=''.join(slides_html)))


if __name__ == '__main__':
    main()
