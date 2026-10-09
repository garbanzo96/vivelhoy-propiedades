"""
Prepara las fotos de una propiedad nueva para la página.

Toma una carpeta con fotos (JPG, PNG, HEIC convertidas, etc.), las endereza según el
celular, las achica y las guarda en WebP en dos tamaños (1600 px y 760 px) dentro de
assets/img/propiedades/<id>/. Al final imprime el bloque "fotos" listo para pegar en
js/propiedades.js.

Uso (desde la carpeta de la página):
    python3 herramientas/preparar_fotos.py ~/Descargas/fotos-casa-macul casa-macul

El orden de las fotos es el orden alfabético de los archivos. Si quieres otro orden,
renómbralas antes con números: 01-fachada.jpg, 02-living.jpg, etc.
Necesita Pillow:  python3 -m pip install pillow
"""
import re
import sys
import unicodedata
from pathlib import Path

try:
    from PIL import Image, ImageFilter, ImageOps
except ImportError:
    sys.exit("Falta Pillow. Instálalo con:  python3 -m pip install pillow")

Image.MAX_IMAGE_PIXELS = None
EXT = {".jpg", ".jpeg", ".png", ".webp", ".jfif"}


def slug(text):
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode()
    text = re.sub(r"^\d+[\s_-]*", "", text.lower())
    return re.sub(r"[^a-z0-9]+", "-", text).strip("-") or "foto"


def main():
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    src = Path(sys.argv[1]).expanduser()
    pid = slug(sys.argv[2])
    root = Path(__file__).resolve().parent.parent
    dst = root / "assets" / "img" / "propiedades" / pid
    dst.mkdir(parents=True, exist_ok=True)

    files = sorted(f for f in src.iterdir() if f.suffix.lower() in EXT)
    if not files:
        sys.exit(f"No encontré fotos en {src}")

    lines = []
    for n, f in enumerate(files, 1):
        im = ImageOps.exif_transpose(Image.open(f)).convert("RGB")
        name = f"{n:02d}-{slug(f.stem)}"
        for suffix, size, quality in (("", 1600, 80), ("-sm", 760, 78)):
            copy = im.copy()
            copy.thumbnail((size, size), Image.LANCZOS)
            copy = copy.filter(ImageFilter.UnsharpMask(radius=0.8, percent=45, threshold=2))
            copy.save(dst / f"{name}{suffix}.webp", "WEBP", quality=quality, method=6)
        label = re.sub(r"^\d+[\s_-]*", "", f.stem).replace("_", " ").replace("-", " ").strip().capitalize() or "Foto"
        lines.append(f'      {{ archivo: "{name}", texto: "{label}" }}')
        print(f"  ✓ {f.name}  →  {name}.webp")

    print(f"\nListo. Fotos guardadas en assets/img/propiedades/{pid}/\n")
    print("Pega esto en js/propiedades.js (y corrige los textos de cada foto):\n")
    print(f'    carpeta: "assets/img/propiedades/{pid}/",')
    print("    fotos: [")
    print(",\n".join(lines))
    print("    ]")


if __name__ == "__main__":
    main()
