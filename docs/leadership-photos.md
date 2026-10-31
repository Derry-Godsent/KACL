# Leadership portraits

## Current roster

The current board has eight members, all with user-supplied portraits. At the user's instruction, former members have been removed and names match the current roster exactly. Display order follows the recorded positions: Chairman, Secretary, then Members. No additional seniority is inferred among Members. Board of Directors and Executive Management appear immediately after the About introduction, before the company story and other content. Executive Management records are unchanged.

## User-confirmed portrait mappings

Mappings follow the supplied filenames and the user's current name corrections, not facial identification.

| Uploaded filename | Current displayed record | Local filename |
| --- | --- | --- |
| Mr. Opoku Da-Rocha Board Chairman.jpeg | Mr. Opoku Da-Rocha, Chairman | board-chairman.jpg |
| Mr. Henry Oracca-Tetteh Board Secretary.jpeg | Mr. Henry Oracca-Tetteh, Secretary | henry-orraca-tetteh.jpg |
| Mr. Abdul Rauf Saeed Member.jpeg | Mr. Abdul Rauf Saeed | abdul-rauf-saeed.jpg |
| Alhaji Abdulai Tahiru Ansah Member.jpeg | Alhaji Abdulai Tahiru Ansah | abdulai-thahiru.jpg |
| Rev. Joseph Amo Member.jpeg | Rev. Joseph Amo | joseph-amo.jpg |
| Mr. Zakaria Mohammed Member.jpeg | Mr. Zakaria Mohammed | zakaria-mohammed.jpg |
| Mr. Sampson Sulemana Member.jpeg | Mr. Sampson Sulemana | sulemana-sampson.jpg |
| Mr. Sumaila Seidu Member.jpeg | Mr. Sumaila Seidu | sumaila-seidu.jpg |

Files are stored in `public/images/leadership/`. All eight are unchanged copies of user-supplied originals, with no AI edits. The duplicate Chairman attachment is used only once. Responsive display cropping is applied by CSS.

## Remaining placeholders

All current board members have portraits. Michael Tongban in Executive Management retains his initials profile. No stock or AI faces are used.

To add another portrait, save the approved file in `public/images/leadership/` and add `portraitUrl: '/images/leadership/filename.jpg'` to the correct person's record in `src/data/initialData.ts`. Both `KACL_BOARD_MEMBERS` and `KACL_MANAGEMENT` support this optional field.

## Display behaviour

- Board portraits reserve a consistent 4:5 area. Images use `object-fit: cover` and `object-position: center 25%`.
- Management uses compact profiles which remain complete without photos.
- Missing or failed images use a designed initials monogram, not a broken image or a "photo missing" label.
- Names and roles remain visible outside portraits. Real images have descriptive alt text; decorative monograms are hidden from screen readers.

## Management portraits supplied in the latest update

Associations below follow the client-provided filenames, not facial identification. Existing display names and roles are retained. Ebenezer Awuah Kusi is added using the role explicitly supplied in the filename.

| Uploaded filename | Displayed record | Local filename |
| --- | --- | --- |
| Elizabeth Ahlijah.jpeg | Mrs. Elizabeth Ahlijah Tetteh | elizabeth-ahlijah.jpg |
| Gregory Berchie.jpeg | Gregory Berchie | gregory-berchie.jpg |
| Samuel Boison.jpeg | Samuel Boison | samuel-boison.jpg |
| Ebenezer Awuah Kusi Head, Engineering Unit.jpeg | Ebenezer Awuah Kusi | ebenezer-awuah-kusi.jpg |
| Alhassan A. Mahamadu.jpeg | Alhaji Alhassan A. Mahamadu | alhassan-mahamadu.jpg |
| Daniel Boateng Siaw.jpeg | Daniel Boateng Siaw | daniel-boateng-siaw.jpg |

All six are unchanged copies of the uploaded JPEGs. Existing compact portrait styling and image-failure fallbacks are retained. No board records were changed.

## Loading optimisation

Original JPEGs remain unchanged. Matching WebP derivatives are generated with `scripts/optimize-images.py` (requires Pillow), maximum 640 x 800 for portraits, quality 82. The browser selects WebP with JPEG fallback. The first two board portraits load eagerly at high priority; remaining portraits stay lazy-loaded. Framing, names, roles and originals are preserved. Hero derivatives use a maximum 1440 x 1080, retaining the existing attribution and license links; hidden slides mount after the first image settles, or when explicitly selected. Combined primary portrait and hero assets decreased from 1,740,369 to 808,330 bytes (53.6%). This is a file-size comparison, not a measured page-load speed improvement.
