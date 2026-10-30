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
    quotationItems: [], onSubmitInquiry: noop, onClearQuotationItems: noop,
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
      assert.ok(policy.includes('1 January 2026'));
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
  assert.equal((about.match(/class="board-profile"/g) || []).length, 13);
  assert.equal((about.match(/class="management-profile"/g) || []).length, 7);
  assert.equal((about.match(/class="leadership-monogram"/g) || []).length, 6);
  assert.equal(KACL_BOARD_MEMBERS.filter(member => member.portraitUrl).length, 8);
  const boardMarkup = about.slice(about.indexOf('class="board-portrait-grid"'), about.indexOf('class="about-management"'));
  const firstPlaceholder = Math.min(...KACL_BOARD_MEMBERS.filter(member => !member.portraitUrl).map(member => boardMarkup.indexOf(member.name)));
  for (const member of KACL_BOARD_MEMBERS.filter(member => member.portraitUrl)) {
    assert.ok(boardMarkup.indexOf(member.name) < firstPlaceholder, `${member.name} must precede placeholder profiles`);
  }

  assert.equal(new Set(KACL_BOARD_MEMBERS.map(member => member.name)).size, 13);
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
  assert.equal((eightPortraits.match(/class="leadership-monogram"/g) || []).length, 5);
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
    "UI smoke checks passed: 39-product count, licensed photo attribution, category filtering, marketing selection, navigation state, no generated product photos, no gradients.",
  );
} finally {
  await server.close();
}
