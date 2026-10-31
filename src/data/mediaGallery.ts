export type MediaPhotoCategory = 'discussion' | 'participants' | 'groups';

export interface MediaPhoto {
  id: string;
  category: MediaPhotoCategory;
  caption: string;
  alt: string;
  originalUrl: string;
  imageUrl: string;
  thumbnailUrl: string;
  /** Intrinsic dimensions reserve space before each photograph loads. */
  width: number;
  height: number;
}

const assetRoot = '/images/media/agm-2026';

function photo(
  number: number,
  category: MediaPhotoCategory,
  caption: string,
  alt: string,
  width = 5472,
  height = 3648,
): MediaPhoto {
  const filename = `KACL_-${number}`;
  return {
    id: filename,
    category,
    caption,
    alt,
    originalUrl: `${assetRoot}/originals/${filename}.jpg`,
    imageUrl: `${assetRoot}/gallery/${filename}.webp`,
    thumbnailUrl: `${assetRoot}/thumbnails/${filename}.webp`,
    width,
    height,
  };
}

const cover = photo(
  90, 'groups', 'Together at the 5th AGM',
  'A large group of meeting participants standing together on the stage for a group photograph',
  5472, 3281,
);

/** Supplied KACL photographs; descriptions do not infer names or job titles. */
export const AGM_PHOTOS: MediaPhoto[] = [
  photo(2, 'discussion', 'A view of the meeting', 'Three people seated at the front table, with participants in the foreground and a projection screen behind the stage'),
  photo(3, 'discussion', 'A contribution from the floor', 'A participant standing with a microphone among the red auditorium seats', 3648, 5472),
  photo(6, 'discussion', 'Sharing a point with the meeting', 'A participant in a blue suit speaking into a microphone beside the meeting tables', 3648, 5472),
  photo(12, 'discussion', 'Questions and contributions', 'A participant in a burgundy shirt addressing the room with a microphone', 3648, 5472),
  photo(14, 'participants', 'Reviewing the meeting papers', 'Participants seated in the auditorium reading booklets and meeting papers', 3648, 5472),
  photo(15, 'participants', 'Listening to the proceedings', 'A participant holding a meeting booklet while seated in the red auditorium chairs'),
  photo(16, 'participants', 'Making a note', 'A participant writing on paper beside an open booklet at a meeting table', 3648, 5472),
  photo(17, 'participants', 'Following the discussion', 'A participant in a bright green top listening at a meeting table', 3648, 4911),
  photo(19, 'discussion', 'Addressing the meeting', 'A speaker in a blue outfit standing at the front table with a microphone', 3648, 5472),
  photo(23, 'participants', 'Listening from the auditorium seats', 'A black-and-white photograph of a participant listening from the auditorium seating'),
  photo(24, 'participants', 'Participants at the meeting', 'Three participants seated together with meeting booklets in the auditorium'),
  photo(28, 'discussion', 'An exchange across the room', 'A speaker standing at the side of the auditorium addressing seated participants'),
  photo(32, 'discussion', 'Speaking at the front of the hall', 'A participant in a patterned yellow shirt speaking at the front of the decorated hall'),
  photo(36, 'participants', 'Taking part in the proceedings', 'Three participants seated together in front of rows of red auditorium chairs'),
  photo(37, 'discussion', 'A discussion at the front table', 'A participant leaning towards the seated front table during a discussion', 4669, 3295),
  photo(38, 'discussion', 'With documents for the meeting', 'A participant standing with a folder and papers during the meeting', 3648, 5472),
  photo(39, 'participants', 'Reviewing papers at the front table', 'A participant in a dark suit reading documents at the orange-covered front table', 3648, 5472),
  photo(42, 'participants', 'Attentive participants', 'Participants listening from the red seats in the auditorium'),
  photo(44, 'discussion', 'Speaking from the lectern', 'A participant in a blue outfit addressing the meeting from a wooden lectern', 3648, 5472),
  photo(61, 'participants', 'Following the presentations', 'Participants seated in the auditorium looking towards the front of the hall'),
  photo(66, 'discussion', 'Another contribution from the floor', 'A participant standing and gesturing while speaking into a microphone', 3648, 5472),
  photo(71, 'discussion', 'Speaking from the front table', 'A participant in a dark suit speaking while seated at the front table', 3648, 5472),
  photo(73, 'participants', 'A wider view of the participants', 'A side view of participants seated across the auditorium during the proceedings', 4274, 3073),
  photo(74, 'discussion', 'Taking the microphone', 'A participant addressing the room with a microphone while others listen nearby'),
  photo(76, 'discussion', 'A contribution from the audience', 'A participant in a yellow shirt speaking into a microphone from his seat'),
  photo(85, 'participants', 'A participant addresses the room', 'A standing participant speaking to people seated in the auditorium', 3678, 3052),
  photo(86, 'groups', 'Gathering at the front of the hall', 'Participants standing and gathering near the stage at the front of the hall'),
  photo(87, 'groups', 'Conversations at the front of the hall', 'A group of participants standing and talking near the stage', 4572, 3357),
  photo(88, 'groups', 'A group photograph on stage', 'Meeting participants lined up across the stage for a group portrait', 5472, 3329),
  cover,
  photo(95, 'groups', 'A smaller group on stage', 'A smaller group of participants posing together in front of the stage decorations', 5406, 3121),
  photo(97, 'groups', 'A group portrait at the meeting', 'Eight participants standing together on the stage for a photograph'),
];

export const MEDIA_ALBUM = {
  title: '5th Annual General Meeting',
  year: '2026',
  description: 'Presentations, participation and shared moments from KACL’s 5th Annual General Meeting. Explore the photographs from the proceedings to the group portraits.',
  cover,
};

export const PHOTO_FILTERS: { id: 'all' | MediaPhotoCategory; label: string }[] = [
  { id: 'all', label: 'All photos' },
  { id: 'discussion', label: 'Presentations & discussion' },
  { id: 'participants', label: 'Participants' },
  { id: 'groups', label: 'Group photos' },
];
