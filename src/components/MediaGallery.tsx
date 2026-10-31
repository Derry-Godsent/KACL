import React, { useRef, useState } from 'react';
import { ArrowDown, ArrowUp, Camera, Expand, Images } from 'lucide-react';
import { AGM_PHOTOS, MEDIA_ALBUM, PHOTO_FILTERS, type MediaPhoto, type MediaPhotoCategory } from '../data/mediaGallery';
import { MediaLightbox } from './MediaLightbox';

const PAGE_SIZE = 12;

export function MediaGallery() {
  const [filter, setFilter] = useState<'all' | MediaPhotoCategory>('all');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [lightbox, setLightbox] = useState<{ photos: MediaPhoto[]; initialIndex: number } | null>(null);
  const collectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const filteredPhotos = filter === 'all' ? AGM_PHOTOS : AGM_PHOTOS.filter(photo => photo.category === filter);
  const visiblePhotos = filteredPhotos.slice(0, visibleCount);
  const remaining = filteredPhotos.length - visiblePhotos.length;
  const cover = MEDIA_ALBUM.cover;

  const scrollToCollection = () => {
    headingRef.current?.focus({ preventScroll: true });
    collectionRef.current?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      block: 'start',
    });
  };

  const showFewer = () => {
    setVisibleCount(PAGE_SIZE);
    window.requestAnimationFrame(scrollToCollection);
  };

  return (
    <>
      <article className="media-album" aria-labelledby="media-album-heading">
        <div className="media-album-copy">
          <span className="media-album-kicker"><Camera className="w-4 h-4" aria-hidden="true" /> Event gallery · {MEDIA_ALBUM.year}</span>
          <h2 id="media-album-heading">{MEDIA_ALBUM.title}</h2>
          <p>{MEDIA_ALBUM.description}</p>
          <div className="media-album-meta"><Images className="w-4 h-4" aria-hidden="true" /> {AGM_PHOTOS.length} photographs</div>
          <button type="button" className="button-light" onClick={scrollToCollection}>
            Explore the album <ArrowDown className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
        <figure className="media-album-cover">
          <button
            type="button"
            className="media-album-photo-button"
            aria-label={`View photograph: ${cover.caption}`}
            onClick={() => setLightbox({ photos: AGM_PHOTOS, initialIndex: AGM_PHOTOS.indexOf(cover) })}
          >
            <img src={cover.imageUrl} alt={cover.alt} width={cover.width} height={cover.height} fetchPriority="high" decoding="async" />
            <span className="media-album-expand"><Expand className="w-4 h-4" aria-hidden="true" /> View photo</span>
          </button>
          <figcaption><span>{cover.caption}</span><span>KACL · {MEDIA_ALBUM.year}</span></figcaption>
        </figure>
      </article>

      <section className="media-photo-collection" id="media-photo-collection" ref={collectionRef} aria-labelledby="media-gallery-heading">
        <div className="media-section-heading">
          <div>
            <span className="media-kicker">The KACL photo archive</span>
            <h2 id="media-gallery-heading" ref={headingRef} tabIndex={-1}>Moments from the meeting</h2>
          </div>
          <p>Select a photograph to take a closer look.</p>
        </div>
        <div className="media-photo-filters" role="group" aria-label="Filter photographs">
          {PHOTO_FILTERS.map(item => {
            const count = item.id === 'all' ? AGM_PHOTOS.length : AGM_PHOTOS.filter(photo => photo.category === item.id).length;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={filter === item.id}
                aria-controls="media-photo-grid"
                onClick={() => { setFilter(item.id); setVisibleCount(PAGE_SIZE); }}
              >
                {item.label}<span>{count}</span>
              </button>
            );
          })}
        </div>
        <p className="media-photo-count" role="status" aria-live="polite" aria-atomic="true">
          Showing {visiblePhotos.length} of {filteredPhotos.length} photographs
        </p>
        <div className="media-photo-grid" id="media-photo-grid">
          {visiblePhotos.map((photo, index) => (
            <figure className="media-photo-card" key={photo.id}>
              <button
                type="button"
                className="media-photo-button"
                aria-label={`View photograph ${index + 1}: ${photo.caption}`}
                onClick={() => setLightbox({ photos: filteredPhotos, initialIndex: index })}
              >
                <img
                  src={photo.thumbnailUrl}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                  decoding="async"
                />
                <span className="media-photo-expand" aria-hidden="true"><Expand className="w-5 h-5" /></span>
              </button>
              <figcaption>{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
        <div className="media-gallery-actions">
          {remaining > 0 ? (
            <button type="button" className="button-secondary" onClick={() => setVisibleCount(count => count + PAGE_SIZE)}>
              Show more photographs <span className="media-more-count">+{Math.min(remaining, PAGE_SIZE)}</span><ArrowDown className="w-4 h-4" aria-hidden="true" />
            </button>
          ) : (
            <p>All {filteredPhotos.length} photographs in this selection are shown.</p>
          )}
          {visibleCount > PAGE_SIZE && (
            <button type="button" className="text-link" onClick={showFewer}>
              Show fewer <ArrowUp className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </section>
      {lightbox && <MediaLightbox photos={lightbox.photos} initialIndex={lightbox.initialIndex} onClose={() => setLightbox(null)} />}
    </>
  );
}
