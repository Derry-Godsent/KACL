import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Download, X } from 'lucide-react';
import { MEDIA_ALBUM, type MediaPhoto } from '../data/mediaGallery';

interface MediaLightboxProps {
  photos: MediaPhoto[];
  initialIndex: number;
  onClose: () => void;
}

/** Native modal dialog supplies focus trapping and an inert background. */
export function MediaLightbox({ photos, initialIndex, onClose }: MediaLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(initialIndex);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const current = photos[index];

  const move = useCallback((direction: number) => {
    setLoaded(false);
    setFailed(false);
    setIndex(previous => (previous + direction + photos.length) % photos.length);
  }, [photos.length]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      trigger?.focus({ preventScroll: true });
    };
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      move(event.key === 'ArrowLeft' ? -1 : 1);
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      setLoaded(false);
      setFailed(false);
      setIndex(event.key === 'Home' ? 0 : photos.length - 1);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="media-lightbox"
      aria-labelledby="media-lightbox-title"
      aria-describedby="media-lightbox-help"
      onKeyDown={handleKeyDown}
      onCancel={event => { event.preventDefault(); onClose(); }}
      onClick={event => { if (event.target === event.currentTarget) onClose(); }}
    >
      <div className="media-lightbox-shell">
        <header className="media-lightbox-header">
          <div>
            <span>{MEDIA_ALBUM.title} · {MEDIA_ALBUM.year}</span>
            <p aria-live="polite">Photograph {index + 1} of {photos.length}</p>
          </div>
          <button type="button" className="media-lightbox-close" onClick={onClose} autoFocus>
            <span>Close</span><X className="w-5 h-5" aria-hidden="true" />
          </button>
        </header>
        <div className="media-lightbox-stage" aria-busy={!loaded && !failed}>
          {!loaded && !failed && <span className="media-lightbox-loading" role="status">Loading photograph…</span>}
          {failed ? (
            <p className="media-lightbox-error" role="status">This photograph could not be loaded. You can still try the original below.</p>
          ) : (
            <img
              key={current.id}
              src={current.imageUrl}
              alt={current.alt}
              width={current.width}
              height={current.height}
              decoding="async"
              data-loaded={loaded}
              onLoad={() => setLoaded(true)}
              onError={() => setFailed(true)}
            />
          )}
        </div>
        <div className="media-lightbox-caption" aria-live="polite" aria-atomic="true">
          <h2 id="media-lightbox-title">{current.caption}</h2>
          <p>KACL photo archive</p>
        </div>
        <footer className="media-lightbox-toolbar">
          <p id="media-lightbox-help">Use the arrow keys to browse. Escape to close.</p>
          <a href={current.originalUrl} download={`${current.id}.jpg`} className="media-lightbox-download">
            <Download className="w-4 h-4" aria-hidden="true" />
            Download original
          </a>
          <div className="media-lightbox-navigation" role="group" aria-label="Photograph navigation">
            <button type="button" onClick={() => move(-1)} aria-label="Previous photograph" disabled={photos.length < 2}>
              <ArrowLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <span aria-hidden="true">{index + 1} / {photos.length}</span>
            <button type="button" onClick={() => move(1)} aria-label="Next photograph" disabled={photos.length < 2}>
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </footer>
      </div>
    </dialog>
  );
}
