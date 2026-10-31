const productCategories = new Set(['beef', 'processed', 'chevon-mutton', 'pork']);
const serviceIds = new Set(['srv-flaying', 'srv-singeing', 'srv-kraal', 'srv-cutting']);

/** Resolve homepage shortcuts to the matching view, filter and scroll destination. */
export function resolveNavigation(destination: string) {
  const [view, detail] = destination.split(':');
  if (view === 'products') {
    return {
      view: 'products',
      category: productCategories.has(detail) ? detail : 'all',
      targetId: 'product-catalogue',
    };
  }
  if (view === 'services' && serviceIds.has(detail)) {
    return { view: 'services', category: null, targetId: detail };
  }
  if (view === 'media' || view === 'notices') {
    return {
      view: 'media',
      category: null,
      targetId: null,
      section: view === 'notices' || detail === 'news' ? 'news' as const : 'gallery' as const,
    };
  }
  return {
    view,
    category: null,
    targetId: null,
  };
}
