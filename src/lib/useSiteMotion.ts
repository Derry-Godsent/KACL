import { useEffect } from 'react';

// Motion is progressive enhancement: content stays visible if observers or
// Web Animations are unavailable. No scroll listeners or layout changes.
const revealTargets = [
  '.about-intro > *', '.products-intro > *', '.services-intro > *',
  '.media-intro > *', '.contact-intro > *', '.about-section-heading > *',
  '.services-section-intro > *',
  'main h1', 'main h2', 'main section > p',
  'main article', '.range-tile', '.service-grid > *', '.channel-grid > *',
  '.counter-product', '.about-milestones > li', '.about-values-list > li',
  '.about-purpose > *', '.management-profile',
  '.contact-quick-links > a', '.contact-form-panel', '.contact-visit',
  '.media-empty', '.products-empty', 'footer > div',
].join(',');

// Use transform keyframes for broad mobile Safari support. Patterns are
// deliberately different, not the same small fade applied to every element.
function revealFrames(element: Element): Keyframe[] {
  if (element.matches('h1, h2')) return [
    { opacity: 0, transform: 'translate3d(0, 32px, 0)', clipPath: 'inset(0 0 100% 0)' },
    { opacity: 1, transform: 'translate3d(0, 0, 0)', clipPath: 'inset(0 0 -8% 0)' },
  ];
  if (element.matches('.about-values-list > li, .about-milestones > li')) return [
    { opacity: 0, transform: 'translate3d(-18px, 0, 0)' },
    { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  ];
  if (element.matches('article, .counter-product, .range-tile, .management-profile')) return [
    { opacity: 0, transform: 'translate3d(0, 24px, 0) scale(.96)' },
    { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' },
  ];
  return [
    { opacity: 0, transform: 'translate3d(0, 22px, 0)' },
    { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  ];
}

export function useSiteMotion(page: string) {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const root = document.documentElement;
    let observer: IntersectionObserver | undefined;
    let mutations: MutationObserver | undefined;
    let seen = new WeakSet<Element>();
    const animations = new Set<Animation>();
    let queued = new WeakSet<Element>();

    const play = (element: Element, frames: Keyframe[], options: KeyframeAnimationOptions) => {
      if (typeof element.animate !== 'function') return;
      const animation = element.animate(frames, options);
      animations.add(animation);
      const release = () => animations.delete(animation);
      animation.addEventListener('finish', release, { once: true });
      animation.addEventListener('cancel', release, { once: true });
    };

    const scan = (parent: ParentNode) => {
      const targets = [
        ...(parent instanceof Element && parent.matches(revealTargets) ? [parent] : []),
        ...parent.querySelectorAll(revealTargets),
      ];
      targets.forEach(element => {
        // Avoid nested reveals inside cards. Intro children are independent
        // targets so their overline, heading and supporting text can stagger.
        if (queued.has(element) || element.parentElement?.closest(revealTargets)) return;
        queued.add(element);
        observer?.observe(element);
      });
    };

    const stop = () => {
      delete root.dataset.siteMotion;
      observer?.disconnect();
      mutations?.disconnect();
      animations.forEach(animation => animation.cancel());
      animations.clear();
      queued = new WeakSet();
    };

    const start = () => {
      stop();
      if (preference.matches) return;
      root.dataset.siteMotion = 'on';
      seen = new WeakSet();
      if (typeof IntersectionObserver !== 'undefined') {
        observer = new IntersectionObserver(entries => {
          let stagger = 0;
          entries.sort((a, b) =>
            a.boundingClientRect.top - b.boundingClientRect.top ||
            a.boundingClientRect.left - b.boundingClientRect.left
          ).forEach(entry => {
            if (!entry.isIntersecting) {
              // Re-arm only after leaving the screen, not at tiny threshold
              // changes. Scrolling back up can reveal the content again.
              if (entry.boundingClientRect.bottom <= 0 ||
                  entry.boundingClientRect.top >= window.innerHeight) seen.delete(entry.target);
              return;
            }
            if (seen.has(entry.target) || entry.intersectionRatio < 0.12) return;
            seen.add(entry.target);
            // Don't play an entrance on content already passed by an anchor jump.
            if (entry.boundingClientRect.bottom < 0) return;
            play(entry.target, revealFrames(entry.target), {
              duration: entry.target.matches('h1, h2') ? 1050 : 850,
              delay: Math.min(stagger++ * 85, 255),
              easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards',
            });
          });
        }, { threshold: [0, 0.12] });
        scan(document);
        mutations = new MutationObserver(records => {
          records.forEach(record => {
            if (record.type === 'attributes' && record.target instanceof Element &&
                record.target.matches('[aria-pressed="true"], [aria-selected="true"]')) {
              // Re-introduce results on selection, including reused React nodes.
              const scope = record.target.closest('main');
              scope?.querySelectorAll('.counter-product, .services-card, .media-story, .media-featured').forEach(element => {
                const bounds = element.getBoundingClientRect();
                if (bounds.bottom > 0 && bounds.top < window.innerHeight) {
                  seen.add(element);
                  play(element, revealFrames(element), {
                    duration: 650, easing: 'cubic-bezier(.16,1,.3,1)',
                  });
                }
              });
            }
            record.addedNodes.forEach(node => {
              if (node instanceof Element) scan(node);
            });
            const target = record.target instanceof Element
              ? record.target : record.target.parentElement;
            const count = target?.closest('.nav-cart-count, .counter-item-status');
            if (count) play(count, [{ opacity: 0.5, translate: '0 3px' }, { opacity: 1, translate: '0 0' }], {
              duration: 450, easing: 'cubic-bezier(.16,1,.3,1)',
            });
          });
        });
        mutations.observe(document.body, { childList: true, characterData: true, subtree: true,
          attributes: true, attributeFilter: ['aria-pressed', 'aria-selected'] });
      }
    };

    start();
    preference.addEventListener('change', start);
    return () => {
      stop();
      preference.removeEventListener('change', start);
    };
  }, [page]);
}
