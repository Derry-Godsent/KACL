import assert from "node:assert/strict";
import { createServer } from "vite";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";

const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
const noop = () => {};
try {
  const { INITIAL_PRODUCTS: products } = await server.ssrLoadModule(
    "/src/data/initialData.ts",
  );
  const { resolveNavigation } = await server.ssrLoadModule("/src/lib/navigation.ts");
  for (const category of ['beef', 'processed', 'chevon-mutton', 'pork']) {
    assert.deepEqual(resolveNavigation(`products:${category}`), {
      view: 'products', category, targetId: 'product-catalogue',
    });
  }
  for (const id of ['srv-flaying', 'srv-singeing', 'srv-kraal', 'srv-cutting']) {
    assert.equal(resolveNavigation(`services:${id}`).targetId, id);
  }
  assert.equal(resolveNavigation('products:unknown').category, 'all');
  const { ContactView } = await server.ssrLoadModule("/src/views/ContactView.tsx");
  const contact = renderToStaticMarkup(React.createElement(ContactView, {
    quotationItems: [], onClearQuotationItems: noop,
  }));
  assert.ok(contact.includes('class="contact-map"'));
  assert.ok(contact.includes('https://maps.google.com/maps?q='));
  assert.ok(contact.indexOf('class="contact-map"') < contact.indexOf('class="contact-intro"'));
  assert.ok(contact.includes('Open in Google Maps'));
  const { PoliciesView } = await server.ssrLoadModule('/src/views/PoliciesView.tsx');
  for (const tab of ['privacy', 'refund']) {
    const policy = renderToStaticMarkup(React.createElement(PoliciesView, {
      initialTab: tab, onNavigate: noop,
    }));
    assert.ok(policy.includes('policies-page'));
    assert.ok(policy.includes('aria-label="Choose a policy"'));
    assert.equal((policy.match(/aria-pressed="true"/g) || []).length, 1);
    assert.equal((policy.match(/<section/g) || []).length, 5);
    assert.ok(policy.includes('mailto:'));
    assert.ok(policy.includes('tel:'));
    if (tab === 'privacy') {
      assert.ok(policy.includes('31 October 2026'));
  assert.ok(policy.includes('does not send or store your contact details'));
      assert.ok(policy.includes('Data Protection Act, 2012 (Act 843)'));
      assert.ok(policy.includes('Data Confidentiality'));
    } else {
      assert.ok(policy.includes('0°C to 4°C'));
      assert.ok(policy.includes('within 24 hours'));
      assert.ok(policy.includes('Post-Acceptance Limitation'));
    }
  }
  const { AboutView } = await server.ssrLoadModule("/src/views/AboutView.tsx");
  const { LeadershipPortrait } = await server.ssrLoadModule("/src/components/LeadershipPortrait.tsx");
  const { KACL_BOARD_MEMBERS, KACL_MANAGEMENT } = await server.ssrLoadModule("/src/data/initialData.ts");
  const about = renderToStaticMarkup(React.createElement(AboutView, { onNavigate: noop }));
  assert.equal((about.match(/class="board-profile"/g) || []).length, 8);
  assert.equal((about.match(/class="management-profile"/g) || []).length, 7);
  assert.equal((about.match(/class="leadership-monogram"/g) || []).length, 1);
  assert.equal(KACL_BOARD_MEMBERS.filter(member => member.portraitUrl).length, 8);
  const boardMarkup = about.slice(about.indexOf('class="board-portrait-grid"'), about.indexOf('class="about-management"'));
  assert.equal((boardMarkup.match(/loading="eager"/g) || []).length, 2);
  assert.equal((boardMarkup.match(/fetchPriority="high"/g) || []).length, 2);
  for (const member of [...KACL_BOARD_MEMBERS, ...KACL_MANAGEMENT].filter(member => member.portraitUrl)) {
    const optimized = member.portraitUrl.replace(/\.jpg$/, '.webp');
    assert.ok(readFileSync(`public${optimized}`).length > 0);
    assert.ok(about.includes(optimized));
  }

  assert.deepEqual(KACL_BOARD_MEMBERS.map(member => [member.role, member.name]), [
    ['Chairman', 'Mr. Opoku Da-Rocha'],
    ['Secretary', 'Mr. Henry Oracca-Tetteh'],
    ['Member', 'Mr. Abdul Rauf Saeed'],
    ['Member', 'Alhaji Abdulai Tahiru Ansah'],
    ['Member', 'Rev. Joseph Amo'],
    ['Member', 'Mr. Zakaria Mohammed'],
    ['Member', 'Mr. Sampson Sulemana'],
    ['Member', 'Mr. Sumaila Seidu'],
  ]);
  for (let i = 1; i < KACL_BOARD_MEMBERS.length; i++) {
    assert.ok(boardMarkup.indexOf(KACL_BOARD_MEMBERS[i - 1].name) < boardMarkup.indexOf(KACL_BOARD_MEMBERS[i].name));
  }
  assert.ok(about.indexOf('class="about-intro"') < about.indexOf('class="about-board"'));
  assert.ok(about.indexOf('class="about-board"') < about.indexOf('class="about-management"'));
  assert.ok(about.indexOf('class="about-management"') < about.indexOf('class="about-story"'));
  for (const former of ['Nana Opoku-Agyemang', 'Andrews Kofi Nti', 'Hon. Nana Yaw Wiredu', 'Samuel Pyne', 'Kwasi Kyei', 'Joe Owusu Boadi']) {
    assert.ok(!about.includes(former));
  }

  assert.equal(new Set(KACL_BOARD_MEMBERS.map(member => member.name)).size, 8);
  for (const member of KACL_BOARD_MEMBERS.filter(member => member.portraitUrl)) {
    assert.ok(readFileSync(`public${member.portraitUrl}`).length > 0);
    assert.ok(about.includes(member.portraitUrl));
  }
  assert.equal(KACL_MANAGEMENT.filter(member => member.portraitUrl).length, 6);
  assert.deepEqual(KACL_MANAGEMENT.filter(member => !member.portraitUrl).map(member => member.name), ['Michael Tongban']);
  assert.equal(KACL_MANAGEMENT.find(member => member.name === 'Ebenezer Awuah Kusi').position, 'Head, Engineering Unit');
  for (const member of KACL_MANAGEMENT.filter(member => member.portraitUrl)) {
    assert.ok(readFileSync(`public${member.portraitUrl}`).length > 0);
    assert.ok(about.includes(member.portraitUrl));
    assert.ok(about.includes(`alt="Portrait of ${member.name}"`));
  }

  for (const member of [...KACL_BOARD_MEMBERS, ...KACL_MANAGEMENT]) assert.ok(about.includes(member.name));
  const eightPortraits = renderToStaticMarkup(React.createElement(React.Fragment, null,
    ...KACL_BOARD_MEMBERS.map((member, index) => React.createElement(LeadershipPortrait, {
      key: member.name, name: member.name, portraitUrl: index < 8 ? `/test-portrait-${index}.jpg` : undefined,
    })),
  ));
  assert.equal((eightPortraits.match(/<img /g) || []).length, 8);
  assert.equal((eightPortraits.match(/class="leadership-monogram"/g) || []).length, 0);
  const { HomeView } = await server.ssrLoadModule("/src/views/HomeView.tsx");
  const { ProductsView } = await server.ssrLoadModule(
    "/src/views/ProductsView.tsx",
  );
  const { ServicesView } = await server.ssrLoadModule(
    "/src/views/ServicesView.tsx",
  );
  const { Header } = await server.ssrLoadModule("/src/components/Header.tsx");
  const home = renderToStaticMarkup(
    React.createElement(HomeView, {
      quotationItems: [],
      onOpenQuotationDrawer: noop,
      products,
      onNavigate: noop,
      onAddToQuotation: noop,
      onOpenProductModal: noop,
    }),
  );
  assert.equal(products.length, 39);
  assert.ok(home.includes("/images/real-rib-steak.jpg"));
  assert.ok(home.includes('/images/real-rib-steak.webp'));
  assert.ok(!home.includes('src="/images/real-round-steak.jpg"'));
  assert.ok(!home.includes('src="/images/real-rib-roast.jpg"'));
  assert.ok(home.includes('class="hero-fullbleed"'));
  assert.ok(home.includes('class="hero-overlay-content page-width"'));
  assert.ok(home.includes('class="hero-progress"'));
  assert.ok(!home.includes('class="home-hero page-width"'));
  assert.ok(home.includes("CC BY-SA 2.5"));
  assert.ok(!home.includes("/src/assets/images/"));
  assert.ok(home.includes("Browse all 39 products"));
  assert.ok(!home.includes("—"));
  const catalogue = renderToStaticMarkup(
    React.createElement(ProductsView, {
      products,
      initialCategory: "pork",
      onAddToQuotation: noop,
      onOpenProductModal: noop,
      onOpenQuotationDrawer: noop,
      quotationItemCount: 0,
    }),
  );
  assert.ok(catalogue.includes("Pork Chops"));
  assert.ok(!catalogue.includes("Beef Fillet"));
  assert.ok(!catalogue.includes("/src/assets/images/"));
  assert.ok(catalogue.includes('aria-pressed="true"'));
  assert.ok(catalogue.includes('id="product-catalogue"'));
  assert.equal((catalogue.match(/class="counter-product /g) || []).length, 4);
  assert.ok(catalogue.includes("Add 1 kg to cart"));
  assert.ok(catalogue.includes("Review cart"));
  const allProducts = renderToStaticMarkup(React.createElement(ProductsView, {
    products, quotationItems: [], quotationItemCount: 0,
    onAddToQuotation: noop, onOpenProductModal: noop, onOpenQuotationDrawer: noop,
  }));
  assert.equal((allProducts.match(/class="counter-product /g) || []).length, 12);
  assert.ok(allProducts.includes("Show more products"));
  assert.ok(!readFileSync("src/views/ProductsView.tsx", "utf8").includes("divide-y"));

  const services = renderToStaticMarkup(
    React.createElement(ServicesView, { initialTab: "abattoir", onNavigate: noop }),
  );
  for (const id of ["srv-flaying", "srv-singeing", "srv-kraal", "srv-cutting"]) {
    assert.ok(services.includes(`id="${id}"`));
  }
  assert.equal((services.match(/class="services-card"/g) || []).length, 4);
  assert.equal((services.match(/class="services-explanation"/g) || []).length, 4);
  assert.ok(services.includes('class="services-process"'));
  assert.ok(services.includes("See our processing in motion"));
  assert.ok(!services.includes("divide-y"));
  assert.ok(!readFileSync("src/views/ServicesView.tsx", "utf8").includes("border-b"));
  const marketing = renderToStaticMarkup(
    React.createElement(ServicesView, {
      initialTab: "marketing",
      onNavigate: noop,
    }),
  );
  assert.ok(marketing.includes("Bulk Sales"));
  assert.ok(!marketing.includes("bg-gradient"));
  const header = renderToStaticMarkup(
    React.createElement(Header, {
      currentView: "marketing",
      quotationItems: [],
      onNavigate: noop,
      onOpenQuotationDrawer: noop,
    }),
  );
  assert.ok(header.includes('/images/brand/kacl-logo.png'));
  assert.ok(!header.includes('nav-brand-monogram'));
  assert.ok(readFileSync('public/images/brand/kacl-logo.png').length > 0);
  const { Footer } = await server.ssrLoadModule('/src/components/Footer.tsx');
  const footer = renderToStaticMarkup(React.createElement(Footer, {
    onNavigate: noop,
  }));
  assert.ok(footer.includes('/images/brand/kacl-logo.png'));
  const footerHours = footer.match(/<section aria-labelledby="footer-opening-hours"[\s\S]*?<\/section>/)?.[0];
  assert.ok(footerHours);
  for (const label of ['Opening hours', 'Monday to Friday', 'Saturday', 'Sunday', '8am - 5pm', '8am - 4pm', '8am - 2pm']) {
    assert.ok(footerHours.includes(label));
  }
  assert.ok(!footerHours.includes('<details'));
  assert.ok(services.includes('id="services-opening-hours">Opening hours</h2>'));
  assert.ok(!services.includes('View opening hours'));
  assert.ok(contact.includes('<h2>Opening hours</h2>'));
  assert.ok(!/Staff portal|Protected Staff Administration/.test(header + footer));
  assert.ok(!readFileSync('src/App.tsx', 'utf8').includes('StaffCmsView'));

  const { ReportsView } = await server.ssrLoadModule('/src/views/ReportsView.tsx');
  const reports = renderToStaticMarkup(React.createElement(ReportsView));
  for (const file of ['kacl-annual-report-2025.pdf', 'kacl-right-to-information-manual.pdf']) {
    assert.ok(reports.includes(`/documents/${file}`));
    assert.ok(readFileSync(`public/documents/${file}`).subarray(0, 5).toString() === '%PDF-');
  }
  assert.equal((reports.match(/download="kacl-[^"]+\.pdf"/g) || []).length, 2);
  assert.ok(!reports.includes('target="_blank"'));
  assert.equal((reports.match(/class="report-cover"/g) || []).length, 2);
  for (const name of ['kacl-annual-report-2025', 'kacl-right-to-information-manual']) {
    assert.ok(reports.includes(`/images/reports/${name}.webp`));
    assert.ok(readFileSync(`public/images/reports/${name}.webp`).length > 0);
  }

  assert.ok(header.includes('>Reports</button>'));
  assert.equal(resolveNavigation('outlets').view, 'outlets');
  const { INITIAL_OUTLETS } = await server.ssrLoadModule('/src/data/initialData.ts');
  const { OutletsView } = await server.ssrLoadModule('/src/views/OutletsView.tsx');
  const outlets = renderToStaticMarkup(React.createElement(OutletsView, { outlets: INITIAL_OUTLETS, onNavigate: noop }));
  assert.deepEqual(INITIAL_OUTLETS.map(outlet => outlet.name), [
    'Kumasi Abattoir Container Meat Shop', 'Poku Trading, Adum',
    'JP Filling Station-Ahinsan', 'JP Filling Station-KNUST', 'KNUST Commercial Center',
  ]);
  for (const outlet of INITIAL_OUTLETS) {
    assert.ok(outlets.includes(outlet.name));
    assert.ok(footer.includes(outlet.name));
  }
  for (const url of ['https://mofa.gov.gh/', 'https://fdaghana.gov.gh/', 'https://vsd.gov.gh/']) {
    assert.ok(footer.includes(`href="${url}" target="_blank" rel="noopener noreferrer"`));
  }
  assert.ok(!footer.includes('AK-039-4412'));
  const heroSource = readFileSync('src/components/HeroSlideshow.tsx', 'utf8');
  assert.ok(heroSource.includes('/images/kacl-executive.jpeg'));
  assert.ok(!heroSource.includes('Supplied by KACL'));
  assert.ok(!reports.includes('published as supplied'));
  assert.ok(!readFileSync('src/views/MediaView.tsx', 'utf8').includes('once approved for publication'));
  assert.ok(readFileSync('public/images/kacl-executive.webp').length > 0);

  const { OfficialUpdates } = await server.ssrLoadModule('/src/components/OfficialUpdates.tsx');
  const { OFFICIAL_UPDATES } = await server.ssrLoadModule('/src/data/officialUpdates.ts');
  const officialUpdates = renderToStaticMarkup(React.createElement(OfficialUpdates));
  assert.equal(OFFICIAL_UPDATES.length, 2);
  assert.ok(officialUpdates.includes('publisher-fda-heading'));
  assert.ok(officialUpdates.includes('publisher-vsd-heading'));
  assert.ok(!officialUpdates.includes('<img'));
  assert.ok(!officialUpdates.includes('<iframe'));
  for (const update of OFFICIAL_UPDATES) {
    const url = new URL(update.url);
    assert.equal(url.protocol, 'https:');
    assert.ok(['fdaghana.gov.gh', 'vsd.gov.gh'].includes(url.hostname));
    assert.ok(officialUpdates.includes(`href="${update.url}" target="_blank" rel="noopener noreferrer"`));
    assert.ok(officialUpdates.includes(update.source));
    assert.ok(officialUpdates.includes(`dateTime="${update.date}"`));
  }
  const { MediaView } = await server.ssrLoadModule('/src/views/MediaView.tsx');
  const { AGM_PHOTOS, MEDIA_ALBUM } = await server.ssrLoadModule('/src/data/mediaGallery.ts');
  const mediaGallery = renderToStaticMarkup(React.createElement(MediaView, {
    onNavigate: noop, activeSection: 'gallery', onSectionChange: noop,
  }));
  const mediaWithUpdates = renderToStaticMarkup(React.createElement(MediaView, {
    onNavigate: noop, activeSection: 'news', onSectionChange: noop,
  }));
  assert.equal(AGM_PHOTOS.length, 32);
  assert.equal(new Set(AGM_PHOTOS.map(photo => photo.id)).size, 32);
  assert.equal(AGM_PHOTOS.filter(photo => photo.category === 'discussion').length, 14);
  assert.equal(AGM_PHOTOS.filter(photo => photo.category === 'participants').length, 12);
  assert.equal(AGM_PHOTOS.filter(photo => photo.category === 'groups').length, 6);
  assert.ok(AGM_PHOTOS.includes(MEDIA_ALBUM.cover));
  for (const photo of AGM_PHOTOS) {
    for (const url of [photo.originalUrl, photo.imageUrl, photo.thumbnailUrl]) {
      assert.ok(readFileSync(`public${url}`).length > 0, `Missing asset: ${url}`);
    }
    assert.ok(photo.alt.length > 30);
    assert.ok(photo.width > 0 && photo.height > 0);
  }
  assert.ok(mediaGallery.includes('5th Annual General Meeting'));
  assert.ok(mediaGallery.includes('id="media-panel-gallery"'));
  assert.equal((mediaGallery.match(/class="media-photo-card"/g) || []).length, 12);
  assert.equal((mediaGallery.match(/loading="lazy"/g) || []).length, 12);
  assert.ok(mediaGallery.includes('Show more photographs'));
  assert.ok(mediaGallery.includes('aria-pressed="true"'));
  assert.ok(mediaGallery.includes('fetchPriority="high"'));
  assert.ok(!mediaGallery.includes('/originals/'), 'The grid must not load full-size originals');
  assert.ok(!mediaGallery.includes('publisher-fda-heading'));
  assert.ok(!mediaGallery.includes('publisher-vsd-heading'));
  assert.ok(mediaWithUpdates.includes('id="media-panel-news"'));
  assert.ok(mediaWithUpdates.includes('publisher-fda-heading'));
  assert.ok(mediaWithUpdates.includes('publisher-vsd-heading'));
  assert.ok(!mediaWithUpdates.includes('<img'));
  assert.ok(!mediaWithUpdates.includes('media-photo-grid'));
  assert.ok(!mediaWithUpdates.includes('Latest from KACL'));
  assert.deepEqual(resolveNavigation('media'), { view: 'media', category: null, targetId: null, section: 'gallery' });
  assert.deepEqual(resolveNavigation('media:news'), { view: 'media', category: null, targetId: null, section: 'news' });
  assert.deepEqual(resolveNavigation('notices'), { view: 'media', category: null, targetId: null, section: 'news' });
  const { MediaLightbox } = await server.ssrLoadModule('/src/components/MediaLightbox.tsx');
  const lightbox = renderToStaticMarkup(React.createElement(MediaLightbox, {
    photos: AGM_PHOTOS, initialIndex: 0, onClose: noop,
  }));
  assert.ok(lightbox.includes('<dialog'));
  assert.ok(lightbox.includes('aria-labelledby="media-lightbox-title"'));
  assert.ok(lightbox.includes(AGM_PHOTOS[0].imageUrl));
  assert.ok(lightbox.includes(`href="${AGM_PHOTOS[0].originalUrl}" download=`));
  assert.ok(lightbox.includes('Previous photograph'));
  assert.ok(lightbox.includes('Next photograph'));
  const { INITIAL_MEDIA_ITEMS } = await server.ssrLoadModule('/src/data/initialData.ts');
  assert.equal(INITIAL_MEDIA_ITEMS.length, 0);
  for (const title of ['Veterinary Certification Protocol on Food Animals', 'Expansion of Branded Cold Van', 'Clean LPG Singeing System Sets Benchmark']) {
    assert.ok(!mediaWithUpdates.includes(title));
    assert.ok(!mediaGallery.includes(title));
  }

  const documentHead = readFileSync('index.html', 'utf8');
  assert.ok(documentHead.includes('rel="icon" type="image/jpeg" href="/images/brand/cow-tab-icon.jpg"'));
  assert.ok(!readFileSync('src/index.css', 'utf8').includes('nav-brand-monogram'));
  assert.match(header, /aria-current="page"[^>]*>Our Services/);
  const headerHours = header.slice(header.indexOf('class="nav-utility-hours"'), header.indexOf('<a href="tel:'));
  assert.ok(headerHours.includes('aria-label="Opening hours"'));
  for (const hours of ['Mon-Fri: 8am - 5pm', 'Sat: 8am - 4pm', 'Sun: 8am - 2pm']) {
    assert.ok(headerHours.includes(hours));
  }
  assert.ok(!/\.nav-utility-hours\s*\{[^}]*display:\s*none/.test(readFileSync('src/index.css', 'utf8')));
  assert.ok(
    !readFileSync(
      "src/components/AbattoirProcessAnimation.tsx",
      "utf8",
    ).includes("gradient"),
  );
  console.log(
    "UI smoke checks passed: 39 products, licensed photo attribution, 32 AGM photographs with optimized assets, separate gallery/news tabs, navigation, category filtering, no generated product photos, no gradients.",
  );
} finally {
  await server.close();
}
