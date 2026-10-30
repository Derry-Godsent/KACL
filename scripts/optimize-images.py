"""Generate web assets without modifying originals. Run with Pillow installed."""
from pathlib import Path
from PIL import Image, ImageOps

root = Path(__file__).resolve().parents[1] / 'public/images'
sources = list((root / 'leadership').glob('*.jpg')) + list(root.glob('real-*.jpg'))
before = after = 0
for source in sources:
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original).convert('RGB')
        image.thumbnail((640, 800) if source.parent.name == 'leadership' else (1440, 1080))
        target = source.with_suffix('.webp')
        image.save(target, 'WEBP', quality=82, method=6)
        before += source.stat().st_size
        after += target.stat().st_size
print(f'Primary image assets: {before:,} -> {after:,} bytes ({(1-after/before)*100:.1f}% smaller). Originals retained.')
