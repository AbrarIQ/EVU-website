# evu.com Technical Remediation Spec — for Antigravity
2026-07-02 | EVU | Website SEO/GEO Rebuild | Part 3

Scope: technical only. Copy corrections shipped separately (Part 2). Do not touch copy in this pass.

Status: complete. Routing mode confirmed (single-URL static SPA, no router). Venture list confirmed from Thinking Craft Overview PDF, Appendix I (30 entries — flagged as not matching the "~28" figure used elsewhere; not reconciled here, separate decision if needed).

---

## 1. robots.txt

Verified live (crawler names cross-checked against 6 independent 2026 sources, convergent). Policy: allow all major AI search/citation bots for GEO visibility — EVU wants to be discoverable in AI answers, not opted out.

```
# evu.com robots.txt

User-agent: *
Allow: /

# --- Standard search ---
User-agent: Googlebot
Allow: /
User-agent: Bingbot
Allow: /

# --- AI search / citation bots (real-time retrieval — allow for GEO visibility) ---
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Claude-User
Allow: /
User-agent: Claude-SearchBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Perplexity-User
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: Amazonbot
Allow: /
User-agent: Applebot-Extended
Allow: /
User-agent: Meta-ExternalAgent
Allow: /

# --- Common Crawl (feeds many downstream open models — allow, same GEO logic) ---
User-agent: CCBot
Allow: /

Sitemap: https://evu.com/sitemap.xml
```

Note: `Google-Extended` is a robots.txt-only token (not a real logged user agent) — controls Gemini/Vertex training opt-in, separate from Googlebot search indexing. Allowing it here does not affect standard Google Search ranking either way.

---

## 2. sitemap.xml structure

**Confirmed 2026-07-02:** single-file static HTML (`index.html`), no router library, address bar never changes between panels. This is a true single-URL SPA — sitemap.xml can only list the root URL. It cannot index in-page JS panel state, and building fake per-venture URLs into the sitemap when those URLs don't actually resolve would create broken links for anything that tries to visit them from a search result — do not do that.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://evu.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

This makes item 5 (SSR/static fallback HTML block) the primary — not secondary — lever for venture-content crawler visibility. Everything a crawler needs to know about the 28 ventures has to live in that hidden static block on the single page, since there's no second URL to put it on.

Longer-term option, flagged for later — not now: if venture-level pages ever need their own indexable URLs (e.g. for individual venture SEO/backlinks), that requires migrating off single-file static HTML to a router with real routes (React Router, or a static site generator with pre-rendered pages per venture). That's a rebuild-scope decision, not a fix to slot into this remediation pass — separate window if you want to pursue it.

---

## 3. JSON-LD Organization schema — EVU as Thinking Craft subsidiary

Verified structure against schema.org Organization spec. Establishes parent/subsidiary relationship for AI answer engines and Google's knowledge graph.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "EVU",
  "legalName": "Evu, LLC",
  "url": "https://evu.com",
  "description": "AI-native venture studio building AI-powered SMB-focused software applications across a shared-resource portfolio model.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "120 W. 55th Street",
    "addressLocality": "New York",
    "addressRegion": "NY",
    "postalCode": "10019",
    "addressCountry": "US"
  },
  "parentOrganization": {
    "@type": "Organization",
    "name": "Thinking Craft, Inc.",
    "description": "Cognitive AI personalization platform and IP parent company."
  },
  "subOrganization": [
    { "@type": "Organization", "name": "Selfware" },
    { "@type": "Organization", "name": "VFXB" },
    { "@type": "Organization", "name": "Twin Brain" },
    { "@type": "Organization", "name": "Adept ML" },
    { "@type": "Organization", "name": "Realidream" },
    { "@type": "Organization", "name": "Cheaper AI" },
    { "@type": "Organization", "name": "Sitebae" },
    { "@type": "Organization", "name": "Hyperbuds" },
    { "@type": "Organization", "name": "Cyberkismet" },
    { "@type": "Organization", "name": "Unhire" },
    { "@type": "Organization", "name": "Elaview" },
    { "@type": "Organization", "name": "Evercove" },
    { "@type": "Organization", "name": "Spagram" },
    { "@type": "Organization", "name": "Cyberly" },
    { "@type": "Organization", "name": "Opt" },
    { "@type": "Organization", "name": "Glix" },
    { "@type": "Organization", "name": "StockTool" },
    { "@type": "Organization", "name": "SalesFam" },
    { "@type": "Organization", "name": "SmartyVend" },
    { "@type": "Organization", "name": "ABCM" },
    { "@type": "Organization", "name": "SuperWill" },
    { "@type": "Organization", "name": "True Inheritor" },
    { "@type": "Organization", "name": "Unspouse" },
    { "@type": "Organization", "name": "Feelize" },
    { "@type": "Organization", "name": "Dom Post" },
    { "@type": "Organization", "name": "Selling Domain" },
    { "@type": "Organization", "name": "Zordel / Domcraft" },
    { "@type": "Organization", "name": "Cyxer" },
    { "@type": "Organization", "name": "Proxina" },
    { "@type": "Organization", "name": "Arcscape" }
  ]
}
</script>
```

---

## 4. JSON-LD ItemList schema — ventures

Source: Thinking Craft Technology Overview PDF, Appendix I (30 applications, six clusters). URL field below points every item at the confirmed single root URL — the address bar check confirmed no hash/anchor navigation exists yet, so `evu.com/#slug`-style URLs would be fabricated and shouldn't ship. If Antigravity later adds in-page anchor IDs per venture section, swap the root URL for `https://evu.com/#[actual-anchor-id]` at that point — not before.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "EVU Portfolio Ventures",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "item": { "@type": "Organization", "name": "Selfware", "description": "Cognitive profiling & personalization engine", "url": "https://evu.com/" } },
    { "@type": "ListItem", "position": 2, "item": { "@type": "Organization", "name": "VFXB", "description": "AI video creation & conversational editing", "url": "https://evu.com/" } },
    { "@type": "ListItem", "position": 3, "item": { "@type": "Organization", "name": "Twin Brain", "description": "Cognitive AI research platform", "url": "https://evu.com/" } },
    { "@type": "ListItem", "position": 4, "item": { "@type": "Organization", "name": "Adept ML", "description": "Machine learning solutions", "url": "https://evu.com/" } },
    { "@type": "ListItem", "position": 5, "item": { "@type": "Organization", "name": "Realidream", "description": "AI-powered augmented reality", "url": "https://evu.com/" } },
    { "@type": "ListItem", "position": 6, "item": { "@type": "Organization", "name": "Cheaper AI", "description": "AI comparison shopping engine", "url": "https://evu.com/" } },
    { "@type": "ListItem", "position": 7, "item": { "@type": "Organization", "name": "Sitebae", "description": "AI website builder", "url": "https://evu.com/" } },
    { "@type": "ListItem", "position": 8, "item": { "@type": "Organization", "name": "Hyperbuds", "description": "AI creator collaboration platform", "url": "https://evu.com/" } },
    { "@type": "ListItem", "position": 9, "item": { "@type": "Organization", "name": "Cyberkismet", "description": "AI-powered dating platform", "url": "https://evu.com/" } },
    { "@type": "ListItem", "position": 10, "item": { "@type": "Organization", "name": "Unhire", "description": "Premium freelancer marketplace", "url": "https://evu.com/" } },
    { "@type": "ListItem", "position": 11, "item": { "@type": "Organization", "name": "Elaview", "description": "Marketplace for physical advertising", "url": "https://evu.com/" } },
    { "@type": "ListItem", "position": 12, "item": { "@type": "Organization", "name": "Evercove", "description": "Sustainability marketplace", "url": "https://evu.com/" } },
    { "@type": "ListItem", "position": 13, "item": { "@type": "Organization", "name": "Spagram", "description": "Wellness services marketplace", "url": "https://evu.com/" } },
    { "@type": "ListItem", "position": 14, "item": { "@type": "Organization", "name": "Cyberly", "description": "Virtual expert consultation platform", "url": "https://evu.com/" } },
    { "@type": "ListItem", "position": 15, "item": { "@type": "Organization", "name": "Opt", "description": "Peer to peer proximity locator", "url": "https://evu.com/" } },
    { "@type": "ListItem", "position": 16, "item": { "@type": "Organization", "name": "Glix", "description": "Multi-currency fintech, blockchain-based", "url": "https://evu.com/" } },
    { "@type": "ListItem", "position": 17, "item": { "@type": "Organization", "name": "StockTool", "description": "AI investment research platform", "url": "https://evu.com/" } },
    { "@type": "ListItem", "position": 18, "item": { "@type": "Organization", "name": "SalesFam", "description": "Sales tracking & commission management", "url": "https://evu.com/" } },
    { "@type": "ListItem", "position": 19, "item": { "@type": "Organization", "name": "SmartyVend", "description": "Smart vending management platform", "url": "https://evu.com/" } },
    { "@type": "ListItem", "position": 20, "item": { "@type": "Organization", "name": "ABCM", "description": "Financial services platform", "url": "https://evu.com/" } },
    { "@type": "ListItem", "position": 21, "item": { "@type": "Organization", "name": "SuperWill", "description": "Estate planning automation", "url": "https://evu.com/" } },
    { "@type": "ListItem", "position": 22, "item": { "@type": "Organization", "name": "True Inheritor", "description": "Digital inheritance platform", "url": "https://evu.com/" } },
    { "@type": "ListItem", "position": 23, "item": { "@type": "Organization", "name": "Unspouse", "description": "Divorce automation platform", "url": "https://evu.com/" } },
    { "@type": "ListItem", "position": 24, "item": { "@type": "Organization", "name": "Feelize", "description": "Branding & digital product studio", "url": "https://evu.com/" } },
    { "@type": "ListItem", "position": 25, "item": { "@type": "Organization", "name": "Dom Post", "description": "Domain marketplace", "url": "https://evu.com/" } },
    { "@type": "ListItem", "position": 26, "item": { "@type": "Organization", "name": "Selling Domain", "description": "Premium domain portfolio", "url": "https://evu.com/" } },
    { "@type": "ListItem", "position": 27, "item": { "@type": "Organization", "name": "Zordel / Domcraft", "description": "Domain & digital asset initiatives", "url": "https://evu.com/" } },
    { "@type": "ListItem", "position": 28, "item": { "@type": "Organization", "name": "Cyxer", "description": "Satellite-connected nanofilm display technology", "url": "https://evu.com/" } },
    { "@type": "ListItem", "position": 29, "item": { "@type": "Organization", "name": "Proxina", "description": "Navigation technology for the visually impaired", "url": "https://evu.com/" } },
    { "@type": "ListItem", "position": 30, "item": { "@type": "Organization", "name": "Arcscape", "description": "Venture incubation concepts", "url": "https://evu.com/" } }
  ]
}
</script>
```

---

## 5. SSR / static fallback HTML block — ventures

Source: Thinking Craft Technology Overview PDF, Appendix I (30 applications). This is the primary lever for venture crawler-visibility given the confirmed single-URL SPA (see item 2) — everything here has to be static HTML present at initial load, not injected by JS after the fact, since non-JS-executing crawlers only ever see one payload.

Hidden (visually, not from crawlers) block in the page's static HTML. Use `position: absolute; left: -9999px` or a visually-hidden utility class — never `display: none` or `visibility: hidden`, both of which some crawlers (and accessibility tooling) discount or ignore.

```html
<div class="visually-hidden" aria-hidden="false" id="crawler-fallback-ventures">
  <h2>EVU Portfolio Ventures</h2>
  <ul>
    <li><h3>Selfware</h3><p>Cognitive profiling & personalization engine</p></li>
    <li><h3>VFXB</h3><p>AI video creation & conversational editing</p></li>
    <li><h3>Twin Brain</h3><p>Cognitive AI research platform</p></li>
    <li><h3>Adept ML</h3><p>Machine learning solutions</p></li>
    <li><h3>Realidream</h3><p>AI-powered augmented reality</p></li>
    <li><h3>Cheaper AI</h3><p>AI comparison shopping engine</p></li>
    <li><h3>Sitebae</h3><p>AI website builder</p></li>
    <li><h3>Hyperbuds</h3><p>AI creator collaboration platform</p></li>
    <li><h3>Cyberkismet</h3><p>AI-powered dating platform</p></li>
    <li><h3>Unhire</h3><p>Premium freelancer marketplace</p></li>
    <li><h3>Elaview</h3><p>Marketplace for physical advertising</p></li>
    <li><h3>Evercove</h3><p>Sustainability marketplace</p></li>
    <li><h3>Spagram</h3><p>Wellness services marketplace</p></li>
    <li><h3>Cyberly</h3><p>Virtual expert consultation platform</p></li>
    <li><h3>Opt</h3><p>Peer to peer proximity locator</p></li>
    <li><h3>Glix</h3><p>Multi-currency fintech, blockchain-based</p></li>
    <li><h3>StockTool</h3><p>AI investment research platform</p></li>
    <li><h3>SalesFam</h3><p>Sales tracking & commission management</p></li>
    <li><h3>SmartyVend</h3><p>Smart vending management platform</p></li>
    <li><h3>ABCM</h3><p>Financial services platform</p></li>
    <li><h3>SuperWill</h3><p>Estate planning automation</p></li>
    <li><h3>True Inheritor</h3><p>Digital inheritance platform</p></li>
    <li><h3>Unspouse</h3><p>Divorce automation platform</p></li>
    <li><h3>Feelize</h3><p>Branding & digital product studio</p></li>
    <li><h3>Dom Post</h3><p>Domain marketplace</p></li>
    <li><h3>Selling Domain</h3><p>Premium domain portfolio</p></li>
    <li><h3>Zordel / Domcraft</h3><p>Domain & digital asset initiatives</p></li>
    <li><h3>Cyxer</h3><p>Satellite-connected nanofilm display technology</p></li>
    <li><h3>Proxina</h3><p>Navigation technology for the visually impaired</p></li>
    <li><h3>Arcscape</h3><p>Venture incubation concepts</p></li>
  </ul>
</div>
```

CSS for the visually-hidden class (standard accessible-hiding pattern, keeps content in the accessibility tree and crawler-readable while removing it from visual layout):

```css
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

---

## 6. Meta tag injection + default OG/Twitter Card tags

**Static defaults (in the base HTML `<head>`, always present as fallback):**

```html
<title>EVU | AI-Native Venture Studio | A Thinking Craft Company</title>
<meta name="description" content="EVU builds AI-powered software applications for SMBs across a shared-resource portfolio model. A Thinking Craft company.">
<link rel="canonical" href="https://evu.com/">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:title" content="EVU | AI-Native Venture Studio">
<meta property="og:description" content="EVU builds AI-powered software applications for SMBs across a shared-resource portfolio model. A Thinking Craft company.">
<meta property="og:url" content="https://evu.com/">
<meta property="og:site_name" content="EVU">
<meta property="og:image" content="https://evu.com/og-image.png">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="EVU | AI-Native Venture Studio">
<meta name="twitter:description" content="EVU builds AI-powered software applications for SMBs across a shared-resource portfolio model. A Thinking Craft company.">
<meta name="twitter:image" content="https://evu.com/og-image.png">
```

Notes on assets referenced above: `og-image.png` generated 2026-07-02 from EVU's logo, delivered as `evu-web-assets/og-image.png`, 1200x630px. Copy into the site root — path in the meta tags above already matches.

**Dynamic injection logic (panel change updates title/description/canonical):**

If Antigravity's router supports route change hooks, update on every panel/route transition:

```javascript
function updateMetaForPanel(panel) {
  const panelMeta = {
    home: {
      title: "EVU | AI-Native Venture Studio | A Thinking Craft Company",
      description: "EVU builds AI-powered software applications for SMBs across a shared-resource portfolio model. A Thinking Craft company."
    },
    ventures: {
      title: "Portfolio Ventures | EVU",
      description: "Explore EVU's portfolio of AI-powered SMB applications, built and operated across a shared-resource venture studio model."
    },
    // one entry per additional panel — about, investors, individual venture pages
  };

  const meta = panelMeta[panel];
  if (!meta) return;

  document.title = meta.title;
  document.querySelector('meta[name="description"]').setAttribute('content', meta.description);
  document.querySelector('meta[property="og:title"]').setAttribute('content', meta.title);
  document.querySelector('meta[property="og:description"]').setAttribute('content', meta.description);
  document.querySelector('link[rel="canonical"]').setAttribute('href', `https://evu.com/${panel === 'home' ? '' : panel}`);
}
```

Caveat: this JS-driven update only helps browsers and JS-executing crawlers (Googlebot, ClaudeBot, GPTBot all render JS as of 2026). It does not help simple non-JS fetchers — that's what item 5's static fallback covers.

---

## 7. Canonical tag, HTTPS redirect, 404.html, favicon/manifest

**Canonical tag** — included in item 6 defaults above (`<link rel="canonical">`), dynamically updated per panel.

**HTTPS redirect** — this is a hosting/server config item, not something that lives in the SPA codebase itself. Antigravity needs to confirm at the hosting layer (wherever evu.com is deployed — Google Sites migration target unclear from context, flag `[?]`):
- All HTTP requests to evu.com must 301-redirect to https://evu.com
- Confirm no mixed-content warnings (any hardcoded `http://` asset URLs in the codebase need updating to `https://` or protocol-relative)

**404.html** — custom page, not the default host error page:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Page Not Found | EVU</title>
  <meta name="robots" content="noindex">
  <link rel="canonical" href="https://evu.com/">
</head>
<body>
  <h1>Page Not Found</h1>
  <p>The page you're looking for doesn't exist. Return to <a href="https://evu.com/">evu.com</a>.</p>
</body>
</html>
```

Server must return a real 404 status code with this page — not a 200 status serving 404-looking content (soft 404s hurt crawl budget and confuse search engines about site structure).

**Favicon / manifest** — assets not yet confirmed to exist. Standard set to request from Antigravity:

```html
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
```

`site.webmanifest` minimum content:

```json
{
  "name": "EVU",
  "short_name": "EVU",
  "icons": [
    { "src": "/android-chrome-192x192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/android-chrome-512x512.png", "sizes": "512x512", "type": "image/png" }
  ],
  "theme_color": "#ffffff",
  "background_color": "#ffffff",
  "display": "standalone"
}
```

Flag resolved 2026-07-02: all asset files generated from EVU's logo, delivered as `evu-web-assets/`. Copy the six files (`favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`, `android-chrome-192x192.png`, `android-chrome-512x512.png`, `site.webmanifest`) into the site's root/public folder — the paths above already match. Source-quality note: the underlying logo file was a raster PNG (not vector), so these are clean but not infinitely scalable — fine for a live site, revisit with a vector source if a full rebrand happens later.

---

## Summary — ready vs. pending

| Item | Status |
|---|---|
| 1. robots.txt | Ready to ship |
| 2. sitemap.xml | Ready — locked to root-URL only, confirmed single-URL SPA |
| 3. Org schema (parent/sub relationship) | Ready — populated with 30-venture list from Thinking Craft PDF |
| 4. ItemList schema (ventures) | Ready — 30 entries, all URLs point to root (no real per-venture routes exist yet) |
| 5. SSR/static fallback (ventures) | Ready — this is now the primary lever for venture crawler visibility, not the sitemap |
| 6. Meta tag defaults + injection logic | Ready — `og-image.png` generated, in `evu-web-assets/` |
| 7. Canonical / HTTPS / 404 / favicon | Ready — HTTPS redirect is a hosting-layer confirm (EVU owns it); favicon/manifest assets generated, in `evu-web-assets/` |
