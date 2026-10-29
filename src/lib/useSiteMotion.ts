import { useEffect } from 'react';

// Motion is progressive enhancement: content stays visible if observers or
// Web Animations are unavailable. No scroll listeners or layout changes.
const revealTargets = [
  '.about-intro', '.products-intro', '.services-intro', '.media-intro',
  '.contact-intro', '.about-section-heading', '.services-section-intro',
  'main h1', 'main h2', 'main article',
  '.range-tile', '.service-grid > *', '.channel-grid > *',
  '.counter-product', '.about-milestones > li', '.about-values-list > li',
  '.about-purpose > *', '.management-profile',
  '.contact-quick-links > a', '.contact-form-panel', '.contact-visit',
  '.media-empty', '.products-empty', 'footer > div',
].join(',');

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
        // Choreograph a group as one piece. Animating a heading inside an
        // already-revealing card/intro compounds opacity and feels mechanical.
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
            if (!entry.isIntersecting || seen.has(entry.target)) return;
            seen.add(entry.target);
            observer?.unobserve(entry.target);
            // Don't play an entrance on content already passed by an anchor jump.
            if (entry.boundingClientRect.bottom < 0) return;
            play(entry.target, [
              { opacity: 0, translate: '0 12px' },
              { opacity: 1, translate: '0 0' },
            ], {
              duration: 900, delay: Math.min(stagger++ * 70, 210),
              easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards',
            });
          });
        }, { threshold: 0.08 });
        scan(document);
        mutations = new MutationObserver(records => {
          records.forEach(record => {
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
        mutations.observe(document.body, { childList: true, characterData: true, subtree: true });
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
