# Leadership portraits

## Current roster

All 10 original board entries are retained. Three additional members were added at the user's instruction: Mr. Abdul Rauf Saeed, Mr. Zakaria Mohammed and Rev. Joseph Amo. The board now has 13 entries, eight portraits and five monogram placeholders. The six original Executive Management entries are retained. Six user-supplied management portraits have been added, including a seventh entry for Ebenezer Awuah Kusi, Head of the Engineering Unit. Michael Tongban retains his monogram placeholder.

## User-confirmed mappings

The user confirmed the following filename-to-existing-record associations and explicitly asked not to replace existing names. These associations are based on their confirmation, not facial identification:

| Uploaded filename | Displayed record | Local filename |
| --- | --- | --- |
| Mr. Opoku Da-Rocha Board Chairman.jpeg | Nana Opoku-Agyemang, Chairman | board-chairman.jpg |
| Mr. Henry Oracca-Tetteh Board Secretary.jpeg | Henry Orraca Tetteh, Esq., Secretary | henry-orraca-tetteh.jpg |
| Mr. Sumaila Seidu Member.jpeg | Sumaila Seidu | sumaila-seidu.jpg |
| Mr. Sampson Sulemana Member.jpeg | Sulemana Sampson | sulemana-sampson.jpg |
| Alhaji Abdulai Tahiru Ansah Member.jpeg | Alhaji Abdulai Thahiru | abdulai-thahiru.jpg |
| Mr. Abdul Rauf Saeed Member.jpeg | Mr. Abdul Rauf Saeed (added) | abdul-rauf-saeed.jpg |
| Mr. Zakaria Mohammed Member.jpeg | Mr. Zakaria Mohammed (added) | zakaria-mohammed.jpg |
| Rev. Joseph Amo Member.jpeg | Rev. Joseph Amo (added) | joseph-amo.jpg |

Files are stored in `public/images/leadership/`. All eight are unchanged copies of user-supplied originals, with no AI edits. The duplicate Chairman attachment is used only once. Responsive display cropping is applied by CSS.

## Remaining placeholders

Andrews Kofi Nti, Hon. Nana Yaw Wiredu, Samuel Pyne, Kwasi Kyei and Joe Owusu Boadi retain their existing initials profiles. No stock or AI faces are used.

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
