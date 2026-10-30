import React, { useEffect, useState } from "react";

const slides = [
  {
    src: "/images/real-rib-steak.jpg",
    title: "Bone-in beef",
    caption: "Quality starts with the cut.",
    alt: "Real raw bone-in beef rib steak on a plain black tray, without garnish",
    author: "Michael C. Berch",
    source: "https://commons.wikimedia.org/wiki/File:Rib-steak-raw-MCB.jpg",
  },
  {
    src: "/images/real-round-steak.jpg",
    title: "Boneless beef",
    caption: "Meat at the heart of every meal.",
    alt: "Real raw boneless beef round steak in a plain pan, without decoration",
    author: "David Benbennick",
    source:
      "https://commons.wikimedia.org/wiki/File:Beef_round_top_round_steak_in_pan,_raw.jpg",
  },
  {
    src: "/images/real-rib-roast.jpg",
    title: "Beef rib roast",
    caption: "From larger cuts to your table.",
    alt: "Real raw two-bone standing beef rib roast against a plain white background",
    author: "Michael C. Berch",
    source: "https://commons.wikimedia.org/wiki/File:Standing-rib-roast.jpg",
  },
  {
    src: "/images/kacl-executive.jpeg",
    title: "The KACL team",
    caption: "The people behind our commitment.",
    alt: "KACL group photograph in front of a Kumasi Abattoir branded vehicle",
    author: "Kumasi Abattoir Company Limited",
    source: "",
  },
];

export function HeroSlideshow({ children }: { children?: React.ReactNode }) {
  const [firstImageSettled, setFirstImageSettled] = useState(false);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [manualMessage, setManualMessage] = useState("");

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);
    const updateVisibility = () => setHidden(document.hidden);
    updatePreference();
    updateVisibility();
    preference.addEventListener("change", updatePreference);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      preference.removeEventListener("change", updatePreference);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  const playing = !paused && !hovered && !focused && !reducedMotion && !hidden;
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(
      () => setActive((index) => (index + 1) % slides.length),
      6000,
    );
    return () => window.clearInterval(timer);
  }, [playing, active]);

  const select = (index: number) => {
    const next = (index + slides.length) % slides.length;
    setActive(next);
    setManualMessage(
      `Image ${next + 1} of ${slides.length}: ${slides[next].title}`,
    );
  };
  const slide = slides[active];

  return (
    <section
      className="hero-fullbleed"
      aria-label="Welcome to Kumasi Abattoir"
      aria-roledescription="carousel"
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null))
          setFocused(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          select(active + (event.key === "ArrowRight" ? 1 : -1));
        }
      }}
    >
      <div className="hero-slide-stage" data-playing={playing}>
        {slides.map((item, index) => (
          <div
            key={item.src}
            className={`hero-slide ${index === active ? "is-active" : ""}`}
            aria-hidden={index !== active}
          >
            {(index === 0 || firstImageSettled || index === active) && (
            <picture>
            <source srcSet={item.src.replace(/\.jpe?g$/, '.webp')} type="image/webp" />
            <img
              src={item.src}
              onLoad={index === 0 ? () => setFirstImageSettled(true) : undefined}
              onError={index === 0 ? () => setFirstImageSettled(true) : undefined}
              alt={index === active ? item.alt : ""}
              fetchPriority={index === 0 ? "high" : "auto"}
              decoding="async"
              className={
                index === active
                  ? "hero-slide-image is-moving"
                  : "hero-slide-image"
              }
            />
            </picture>
            )}
          </div>
        ))}
      </div>
      <div className="hero-flat-overlay" aria-hidden="true" />
      <div className="hero-overlay-content page-width">{children}</div>
      <div className="hero-bottom page-width">
        <div className="hero-bottom-meta">
          <span className="hero-current-photo">
            <span aria-hidden="true">
              0{active + 1} / 0{slides.length}
            </span>{" "}
            {slide.title}
          </span>
          <div
            className="hero-slide-arrows"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <button
              type="button"
              onClick={() => select(active - 1)}
              aria-label="Previous photograph"
            >
              Previous
            </button>
            <button
              className="hero-slide-pause"
              type="button"
              onClick={() => setPaused((value) => !value)}
              aria-pressed={paused}
              disabled={reducedMotion}
              aria-label={
                reducedMotion
                  ? "Automatic slideshow disabled by reduced motion preference"
                  : paused
                    ? "Resume automatic slideshow"
                    : "Pause automatic slideshow"
              }
            >
              {reducedMotion ? "Manual" : paused ? "Play" : "Pause"}
            </button>
            <button
              type="button"
              onClick={() => select(active + 1)}
              aria-label="Next photograph"
            >
              Next
            </button>
          </div>
        </div>
        <div
          className="hero-progress"
          role="group"
          aria-label="Choose a photograph"
        >
          {slides.map((item, index) => (
            <button
              type="button"
              key={item.src}
              className={active === index ? "is-selected" : ""}
              onClick={() => select(index)}
              aria-label={`Show ${item.title.toLowerCase()} photograph`}
              aria-pressed={active === index}
            >
              <span />
            </button>
          ))}
        </div>
        <p className="hero-photo-credit">
          {slide.source ? <>
          Illustrative photography ·{" "}
          <a href={slide.source} target="_blank" rel="noreferrer">
            {slide.author}
          </a>{" "}
          ·{" "}
          <a
            href="https://creativecommons.org/licenses/by-sa/2.5/"
            target="_blank"
            rel="noreferrer"
          >
            CC BY-SA 2.5
          </a>{" "}
          · Cropped. Not a KACL product photograph.
          </> : <>Kumasi Abattoir Company Limited</>}
        </p>
      </div>
      <span className="sr-only" role="status" aria-live="polite">
        {manualMessage}
      </span>
    </section>
  );
}
