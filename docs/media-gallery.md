# Media centre and AGM photo archive

## Content separation

The Media page has two tabs:

- **Photo gallery**: the supplied KACL event photographs, with an album introduction and category filters.
- **News & updates**: the existing Food and Drugs Authority and Veterinary Services Department feeds. No news article is generated from a photograph.

The header's Media link opens the gallery. The footer's Public & Operational Notices link and the internal `media:news` destination open the news tab. The tabs support Left/Right arrows and Home/End.

## Supplied photographs

`public/images/media/agm-2026/originals/` contains 32 supplied JPEGs. The folder name and the photographs' embedded “KACL - 5TH AGM - '26” marks identify the album as the 2026 5th Annual General Meeting. The page does not claim an exact event date: the available EXIF timestamps are file-modification times, not verified capture times.

All originals are retained unchanged. Descriptions in `src/data/mediaGallery.ts` describe visible content without identifying people or inferring job titles. Existing watermarks are preserved.

Categories are editorial groupings, not additional events:

- Presentations & discussion: 14 photographs
- Participants: 12 photographs
- Group photos: 6 photographs

## Web assets and loading

Run `python scripts/optimize-media.py` with Pillow installed to regenerate:

- `gallery/*.webp`: maximum 1600 px on either axis, quality 84, for the full-image viewer.
- `thumbnails/*.webp`: maximum 800 px on either axis, quality 80, for the gallery grid.

The script applies EXIF orientation, retains proportions and never modifies the originals. The 32 originals total about 91.5 MB; both sets of WebP derivatives together total about 8.1 MB. These are file-size measurements, not a page-speed claim.

The grid initially renders 12 lazy-loaded thumbnails. “Show more photographs” adds 12 at a time. The featured group photograph and any photograph opened in the viewer use the larger derivative. Original JPEGs are requested only when the visitor chooses “Download original”. Width and height attributes reserve layout space.

## Viewer accessibility

The viewer uses a native modal dialog. It traps focus, makes the background inert, locks background scrolling and restores focus to the opening button on close. Left/Right browse the current filter selection, Home/End jump to its first/last photograph, and Escape closes it. Previous/Next and Close are also available as touch-friendly buttons. Images use `object-fit: contain`, so portraits and group photographs are not cropped in the viewer.

On desktop (768px and wider), the viewer is a centered window capped at 960 × 740px so photographs do not fill the whole monitor. On mobile it remains full-screen with the original spacing and controls.

## Adding another photograph

1. Add the supplied original to the album's `originals` directory.
2. Run the optimization script.
3. Add a record to `AGM_PHOTOS` with its filename number, category, caption, descriptive alt text and intrinsic dimensions.
4. Update the count/category assertions in `scripts/ui-smoke.mjs`.

For a different event, create a separate album rather than mixing it into the AGM collection or presenting it as a news article.

## Checks

- `npm run lint`
- `node scripts/ui-smoke.mjs`
- `node scripts/official-news-test.mjs`
- `npm run build`

The UI smoke checks cover all 32 source/derivative assets, separation of gallery and news, initial lazy loading, viewer links and navigation destinations.
