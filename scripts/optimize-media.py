"""Create gallery WebP derivatives without changing the supplied photographs.

Run with Pillow installed: python scripts/optimize-media.py
Original JPEGs are never resized, recompressed or used as gallery thumbnails.
"""
from pathlib import Path

from PIL import Image, ImageOps

album = Path(__file__).resolve().parents[1] / "public/images/media/agm-2026"
sources = sorted((album / "originals").glob("*.jpg"))
if not sources:
    raise SystemExit("No AGM photographs found.")

before = after = 0
for directory in ("gallery", "thumbnails"):
    (album / directory).mkdir(exist_ok=True)

for source in sources:
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original).convert("RGB")
        for directory, maximum, quality in (("gallery", 1600, 84), ("thumbnails", 800, 80)):
            derivative = image.copy()
            derivative.thumbnail((maximum, maximum), Image.Resampling.LANCZOS)
            target = album / directory / f"{source.stem}.webp"
            derivative.save(target, "WEBP", quality=quality, method=6)
            after += target.stat().st_size
    before += source.stat().st_size
    print(f"{source.name}: gallery and thumbnail ready")

print(f"{len(sources)} photographs: {before:,} -> {after:,} bytes in web derivatives.")
print("Both sizes retained; originals unchanged. The page loads full images only in the viewer.")
