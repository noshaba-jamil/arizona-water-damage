# Water Damage Restoration Arizona — On-Page + Technical SEO Audit

Site: https://waterdamagerestoration-arizona.com · Pages crawled: 54 (+404 template) · Generated from a live crawl of the production build, a Chromium browser audit (270 responsive loads, contrast on every page), and source inspection.

> Scope note: your checklist was written for **MyTupeloPlumber.com**. I applied it to this water-damage site: Tupelo/Mississippi/plumbing items became Wickenburg/Arizona/water-damage items, and this site's own name, address (340 W Wickenburg Way, Wickenburg, AZ 85390), phone ((928) 267-9292) and email were used, not the plumber's.

## Result

| Status | Items |
|---|---|
| ✅ PASS | 384 |
| ⚠️ NEEDS IMPROVEMENT | 7 |
| ❌ MISSING | 0 |
| N/A (genuinely not applicable) | 14 |
| **Total checklist rows** | **405** |

### Items that are not PASS

- **#125 PART 11 — No unsupported claims:** cannot be verified from code: IICRC (35 pages), BBB (4 pages), licensed (7 pages), bonded (2 pages), USAA preferred (4 pages), veteran-owned (5 pages), Yelp (1 pages) — confirm each is true or remove it
- **#128 PART 11 — Location pages ≥1,400 words:** 21/23 city pages are under 1,400 (range 1044–1727, median 1158); I stopped at unique, accurate local content instead of padding
- **#214 PART 20 — INP:** cannot be measured offline — check INP in PageSpeed Insights / Search Console (field data) after launch; the site ships ~102 kB of shared JS and no third-party scripts
- **#291 PART 24 — Address is acceptable to Google Business Profile:** external: confirm 340 W Wickenburg Way is an address Google Business Profile accepts (a mailbox/virtual address is not eligible; a service-area business can hide it). Suite number is still TBD.
- **#335 PART 29 — Author information / publish date:** schema names the business as author/publisher; no personal author byline or datePublished exists because I will not invent them — add real author names and publish dates
- **#337 PART 29 — Featured image:** no featured images exist (site has no photography); schema uses the generated brand card. Add real photos per post.
- **#377 PART 31 — Live HTTPS behaviour after deployment:** external: live HTTPS/HSTS behaviour can only be confirmed after the domain is deployed on Vercel

## Part-by-part table

### PART 1 — PAGE INDEXABILITY

| # | Checklist item | Status before | Action taken | Status after |
|---|---|---|---|---|
| 1 | Page is intended to be indexed | not measured before | none needed — verified | ✅ PASS — all 54 pages are indexable; 404 template is noindex |
| 2 | Correct HTTP status | not measured before | none needed — verified | ✅ PASS — 54/54 return 200; unknown URLs return a real 404 |
| 3 | No accidental noindex | not measured before | none needed — verified | ✅ PASS — none on any of 54 pages (meta or header) |
| 4 | No accidental nosnippet | not measured before | none needed — verified | ✅ PASS — no nosnippet / max-snippet:0 |
| 5 | No accidental robots restriction | not measured before | none needed — verified | ✅ PASS — robots.txt blocks only /api/ |
| 6 | Page is accessible to search engines | not measured before | none needed — verified | ✅ PASS — pages return 200, robots allows / |
| 7 | Canonical exists | not measured before | none needed — verified | ✅ PASS — 54/54 have exactly one canonical |
| 8 | Canonical is correct | NEEDS — home canonical ≠ sitemap URL | Home sitemap entry now identical to canonical | ✅ PASS — canonical = sitemap URL on 54/54 (home included) |
| 9 | Canonical uses the preferred URL | not measured before | none needed — verified | ✅ PASS — all use https://waterdamagerestoration-arizona.com |
| 10 | No conflicting canonical | not measured before | none needed — verified | ✅ PASS — 54/54 have exactly one canonical |
| 11 | URL is clean | not measured before | none needed — verified | ✅ PASS — all paths lowercase, hyphen-separated |
| 12 | URL is descriptive | not measured before | none needed — verified | ✅ PASS — every slug is descriptive (service/place keywords) |
| 13 | No unnecessary URL parameters | not measured before | none needed — verified | ✅ PASS — no query parameters in any listed URL |
| 14 | Page is included in XML sitemap when indexable | not measured before | none needed — verified | ✅ PASS — every internal link target is a sitemap URL |

### PART 2 — URL STRUCTURE

| # | Checklist item | Status before | Action taken | Status after |
|---|---|---|---|---|
| 15 | Short and descriptive | not measured before | none needed — verified | ✅ PASS — longest path 61 chars |
| 16 | Relevant to search intent | not measured before | none needed — verified | ✅ PASS — every slug is descriptive (service/place keywords) |
| 17 | Lowercase | not measured before | none needed — verified | ✅ PASS — all paths lowercase, hyphen-separated |
| 18 | Hyphen-separated | not measured before | none needed — verified | ✅ PASS — all paths lowercase, hyphen-separated |
| 19 | No unnecessary parameters | not measured before | none needed — verified | ✅ PASS — no query parameters in any listed URL |
| 20 | No duplicate URLs for same page | not measured before | none needed — verified | ✅ PASS — UPPERCASE and /index.html return 404; trailing slash 308s |
| 21 | No unnecessary URL variations | not measured before | none needed — verified | ✅ PASS — UPPERCASE and /index.html return 404; trailing slash 308s |
| 22 | Service URLs logically organized | not measured before | none needed — verified | ✅ PASS — 11 services under /services/<name>-arizona |
| 23 | Service-area URLs logically organized | not measured before | none needed — verified | ✅ PASS — 26 areas under /service-areas/water-damage-<place>-az |
| 24 | Blog URLs logically organized | not measured before | none needed — verified | ✅ PASS — 8 posts under /blog/<slug> |
| 25 | No orphan URLs | not measured before | none needed — verified | ✅ PASS — 0 orphans; fewest inbound links = 4 |
| 26 | No unnecessary doorway URLs | not measured before | none needed — verified | ✅ PASS — city↔city overlap peaks at 17% (water-damage-tolleson-az ↔ water-damage-eloy-az); each page has its own local sections |

### PART 3 — TITLE TAG

| # | Checklist item | Status before | Action taken | Status after |
|---|---|---|---|---|
| 27 | Title exists | not measured before | none needed — verified | ✅ PASS — 54/54 |
| 28 | Exactly one title tag | not measured before | none needed — verified | ✅ PASS — 54/54 |
| 29 | Unique title | not measured before | none needed — verified | ✅ PASS — 54 unique titles |
| 30 | Matches page intent | not measured before | none needed — verified | ✅ PASS — title and H1 share their key terms on every page |
| 31 | Primary topic represented | not measured before | none needed — verified | ✅ PASS — primary topic in title on 37/37 service/area pages |
| 32 | Location included where relevant | not measured before | none needed — verified | ✅ PASS — place name in every area title |
| 33 | Natural wording | not measured before | none needed — verified | ✅ PASS — no word repeated 3× |
| 34 | ≈50–60 characters where practical | FAIL — 53/54 titles >60 chars (max 115) | Removed the double brand template; shortened 40 titles to ≤60 (kept keyword + phone) | ✅ PASS — all 30–60 chars (max 60) |
| 35 | No keyword stuffing | not measured before | none needed — verified | ✅ PASS — no word repeated 3× |
| 36 | No duplicate titles | not measured before | none needed — verified | ✅ PASS — 54 unique titles |
| 37 | Brand included where appropriate | FAIL — brand repeated twice in 7 titles | Dropped title template; static titles written in full | ✅ PASS — brand on home/static titles; service/area titles carry the phone number instead; never duplicated |
| 38 | Compelling for searchers | not measured before | none needed — verified | ✅ PASS — titles carry a proof/CTA element (phone, 24/7, guide…) |

### PART 4 — META DESCRIPTION

| # | Checklist item | Status before | Action taken | Status after |
|---|---|---|---|---|
| 39 | Meta description exists | not measured before | none needed — verified | ✅ PASS — 54/54 |
| 40 | Unique | not measured before | none needed — verified | ✅ PASS — 54 unique |
| 41 | Relevant to page | not measured before | none needed — verified | ✅ PASS — descriptions match page topic |
| 42 | ≈140–160 characters where practical | NEEDS — 5 descriptions >160 (home 186) | Rewrote 5 descriptions to ≤160 | ✅ PASS — all 70–160 (52 are ≥120) |
| 43 | Primary topic naturally represented | not measured before | none needed — verified | ✅ PASS — topic present on 36/37 |
| 44 | Location represented where appropriate | not measured before | none needed — verified | ✅ PASS — place in 26/26 area descriptions |
| 45 | Clear value proposition | not measured before | none needed — verified | ✅ PASS — CTA/value in descriptions |
| 46 | Natural CTA where appropriate | not measured before | none needed — verified | ✅ PASS — CTA/value in descriptions |
| 47 | No keyword stuffing | not measured before | none needed — verified | ✅ PASS — no repeated-keyword stuffing |
| 48 | No duplicate descriptions | not measured before | none needed — verified | ✅ PASS — 54 unique |

### PART 5 — H1

| # | Checklist item | Status before | Action taken | Status after |
|---|---|---|---|---|
| 49 | Exactly ONE primary H1 | not measured before | none needed — verified | ✅ PASS — 54/54 have exactly one H1 |
| 50 | H1 describes page topic | not measured before | none needed — verified | ✅ PASS — H1 contains the primary topic on every service/area page |
| 51 | H1 matches search intent | not measured before | none needed — verified | ✅ PASS — H1 contains the primary topic on every service/area page |
| 52 | H1 is unique | not measured before | none needed — verified | ✅ PASS — 54 unique H1s |
| 53 | H1 not stuffed with keywords | not measured before | none needed — verified | ✅ PASS — max 79 chars |
| 54 | H1 visible to users | not measured before | none needed — verified | ✅ PASS — real text in the hero (not sr-only, not an image); site has 0 <img> |
| 55 | H1 not replaced by an image | not measured before | none needed — verified | ✅ PASS — real text in the hero (not sr-only, not an image); site has 0 <img> |
| 56 | H1 not duplicated elsewhere on page | NEEDS — 15 pages repeated the H1 as an H2 | Rewrote repeating H2s | ✅ PASS — no H2 repeats the H1 |

### PART 6 — HEADING HIERARCHY

| # | Checklist item | Status before | Action taken | Status after |
|---|---|---|---|---|
| 57 | H1 → H2 → H3 order | not measured before | none needed — verified | ✅ PASS — first heading after H1 is an H2 on every page |
| 58 | No H1 → H4 jump | not measured before | none needed — verified | ✅ PASS — no skipped levels on any page |
| 59 | No random heading levels | not measured before | none needed — verified | ✅ PASS — no skipped levels on any page |
| 60 | No headings used only for visual styling | not measured before | none needed — verified | ✅ PASS — levels chosen for structure; styling done in CSS (only the 3 index pages carry a visually-hidden H2) |
| 61 | H2s represent major sections | not measured before | none needed — verified | ✅ PASS — ≥5 H2 sections on 37/37 service/area pages |
| 62 | H3s belong under relevant H2s | NEEDS — FAQ questions were flat H2s | FAQ questions are H3 under one FAQ H2 | ✅ PASS — every H3 sits under an H2 |
| 63 | Heading text is descriptive | NEEDS — 15 headings carried a ❓ emoji | Removed emoji | ✅ PASS — descriptive text, no emoji |
| 64 | Headings cover important subtopics | not measured before | none needed — verified | ✅ PASS — ≥5 H2 sections on 37/37 service/area pages |
| 65 | Hierarchy is logical | not measured before | none needed — verified | ✅ PASS — no skipped levels on any page |

### PART 7 — SEARCH INTENT (see intent map below)

| # | Checklist item | Status before | Action taken | Status after |
|---|---|---|---|---|
| 66 | Page satisfies its intent | not measured before | none needed — verified | ✅ PASS — service pages answer what/why/how/when; area pages add local conditions |
| 67 | Content answers the visitor's actual question | not measured before | none needed — verified | ✅ PASS — 10/11 service pages cover ≥5 of: definition, causes, process, when-to-call, FAQ, related services |
| 68 | No irrelevant content | FAIL — internal notes, competitor names, payout figures on ~30 pages | clean-content.mjs: removed notes, competitors, payouts | ✅ PASS — 0 pages contain internal notes, competitor names, payout figures or AI-recommendation claims |
| 69 | CTA matches intent | not measured before | none needed — verified | ✅ PASS — hero CTA wording is page-specific (service name / place name) |
| 70 | Page does not compete unnecessarily with another page | not measured before | none needed — verified | ✅ PASS — service↔service overlap peaks at 1% (flood-cleanup-arizona ↔ burst-pipe-water-damage-arizona) |

### PART 8 — KEYWORD OPTIMIZATION

| # | Checklist item | Status before | Action taken | Status after |
|---|---|---|---|---|
| 71 | Primary keyword in H1 | not measured before | none needed — verified | ✅ PASS — H1 contains the primary topic on every service/area page |
| 72 | Secondary keywords / topics | not measured before | none needed — verified | ✅ PASS — topic in ≥1 H2/H3 on 37/37 |
| 73 | Long-tail queries | not measured before | none needed — verified | ✅ PASS — FAQ questions (long-tail) on 37/37 |
| 74 | Related terms | not measured before | none needed — verified | ✅ PASS — 10/11 service pages cover ≥5 of: definition, causes, process, when-to-call, FAQ, related services |
| 75 | Semantic entities | not measured before | none needed — verified | ✅ PASS — 19 pages name real local landmarks/rivers/bases |
| 76 | Natural keyword placement | not measured before | none needed — verified | ✅ PASS — highest exact-topic density 2.6% |
| 77 | Introduction | not measured before | none needed — verified | ✅ PASS — topic in the first ~200 words on 37/37 |
| 78 | H2/H3 where appropriate | not measured before | none needed — verified | ✅ PASS — topic in ≥1 H2/H3 on 37/37 |
| 79 | Body content | not measured before | none needed — verified | ✅ PASS — primary phrase in body copy |
| 80 | Image alt text where relevant | not measured before | none needed — verified | N/A — site has no <img> elements, so there is no alt text to optimise (0 across 54 pages) |
| 81 | Internal anchor text | not measured before | none needed — verified | ✅ PASS — descriptive internal anchors for 37/37 pages |
| 82 | Title | not measured before | none needed — verified | ✅ PASS — primary topic in title on 37/37 service/area pages |
| 83 | Meta description | not measured before | none needed — verified | ✅ PASS — topic present on 36/37 |
| 84 | No keyword stuffing | not measured before | none needed — verified | ✅ PASS — highest exact-topic density 2.6% |

### PART 9 — SEMANTIC SEO

| # | Checklist item | Status before | Action taken | Status after |
|---|---|---|---|---|
| 85 | Related entities | not measured before | none needed — verified | ✅ PASS — 19 pages name real local landmarks/rivers/bases |
| 86 | Related problems | not measured before | none needed — verified | ✅ PASS — 10/11 service pages cover ≥5 of: definition, causes, process, when-to-call, FAQ, related services |
| 87 | Causes | not measured before | none needed — verified | ✅ PASS — 10/11 service pages cover ≥5 of: definition, causes, process, when-to-call, FAQ, related services |
| 88 | Solutions | not measured before | none needed — verified | ✅ PASS — 10/11 service pages cover ≥5 of: definition, causes, process, when-to-call, FAQ, related services |
| 89 | Methods | not measured before | none needed — verified | ✅ PASS — 10/11 service pages cover ≥5 of: definition, causes, process, when-to-call, FAQ, related services |
| 90 | Equipment | not measured before | none needed — verified | ✅ PASS — equipment/method terms on 11/11 service pages (pumps, extractors, dehumidifiers, moisture meters, HEPA…) |
| 91 | Relevant terminology | not measured before | none needed — verified | ✅ PASS — standards/terms (IICRC S500, water categories, dry standard) on 10/11 |
| 92 | Customer questions | NEEDS — 2 pages <3 FAQs | Added FAQs; FAQ schema rebuilt from visible Q&As | ✅ PASS — every service page has ≥3 FAQs |
| 93 | Related services | not measured before | none needed — verified | ✅ PASS — 11/11 service pages link to ≥3 other services |
| 94 | Relevant local context | not measured before | none needed — verified | ✅ PASS — local terrain/housing/water context on 26/26 area pages |
| 95 | Supporting concepts | FAIL — 10/11 under 1,400 | Wrote ~4,800 words of service depth (11/11 now ≥1,400) | ✅ PASS — 11/11 service pages ≥1,400 unique words (min 1447, max 2062) |

### PART 10 — TOPICAL AUTHORITY

| # | Checklist item | Status before | Action taken | Status after |
|---|---|---|---|---|
| 96 | Clear service clusters | not measured before | none needed — verified | ✅ PASS — each service links to ≥2 related services (min 11 service links) |
| 97 | Clear location structure | not measured before | none needed — verified | ✅ PASS — every city links its county hub + nearby areas (“Areas We Also Serve”) |
| 98 | Service hubs | not measured before | none needed — verified | ✅ PASS — /services links all 11 |
| 99 | Supporting service pages | not measured before | none needed — verified | ✅ PASS — /services links all 11 |
| 100 | Blog supporting commercial pages | not measured before | none needed — verified | ✅ PASS — every post links ≥1 service (min 11) |
| 101 | Blog → service links | not measured before | none needed — verified | ✅ PASS — every post links ≥1 service (min 11) |
| 102 | Service → related blog links | MISSING — 0 service/area pages linked a guide | 28 contextual links from service/area pages to guides | ✅ PASS — 10/11 service pages link a relevant guide |
| 103 | Service → related service links | not measured before | none needed — verified | ✅ PASS — each service links to ≥2 related services (min 11 service links) |
| 104 | Location → relevant services | not measured before | none needed — verified | ✅ PASS — every area page links all 11 services |
| 105 | Services → relevant locations | not measured before | none needed — verified | ✅ PASS — each service links ≥3 area pages (min 4) |
| 106 | Homepage → major pages | not measured before | none needed — verified | ✅ PASS — home links 11 services, 26 area pages, About, Contact, FAQ, Blog |
| 107 | No disconnected clusters | not measured before | none needed — verified | ✅ PASS — all 54 pages reachable from the homepage by links |

### PART 11 — CONTENT QUALITY

| # | Checklist item | Status before | Action taken | Status after |
|---|---|---|---|---|
| 108 | Useful introduction | not measured before | none needed — verified | ✅ PASS — a full introductory paragraph (≥25 words) within the first four paragraphs |
| 109 | Clear explanation | not measured before | none needed — verified | ✅ PASS — 10/11 service pages cover ≥5 of: definition, causes, process, when-to-call, FAQ, related services |
| 110 | Problem identification | not measured before | none needed — verified | ✅ PASS — 10/11 service pages cover ≥5 of: definition, causes, process, when-to-call, FAQ, related services |
| 111 | Causes | not measured before | none needed — verified | ✅ PASS — 10/11 service pages cover ≥5 of: definition, causes, process, when-to-call, FAQ, related services |
| 112 | Solutions | not measured before | none needed — verified | ✅ PASS — 10/11 service pages cover ≥5 of: definition, causes, process, when-to-call, FAQ, related services |
| 113 | Process | not measured before | none needed — verified | ✅ PASS — 10/11 service pages cover ≥5 of: definition, causes, process, when-to-call, FAQ, related services |
| 114 | When to seek professional help | not measured before | none needed — verified | ✅ PASS — 10/11 service pages cover ≥5 of: definition, causes, process, when-to-call, FAQ, related services |
| 115 | Relevant considerations | not measured before | none needed — verified | ✅ PASS — local terrain/housing/water context on 26/26 area pages |
| 116 | Local relevance | not measured before | none needed — verified | ✅ PASS — local terrain/housing/water context on 26/26 area pages |
| 117 | Related services | not measured before | none needed — verified | ✅ PASS — 11/11 service pages link to ≥3 other services |
| 118 | FAQs | NEEDS — 2 pages <3 FAQs | same | ✅ PASS — FAQ block with ≥3 questions on service/area pages |
| 119 | CTA | not measured before | none needed — verified | ✅ PASS — tel: link on 54/54 (header) plus hero + sidebar CTAs |
| 120 | Readability | not measured before | none needed — verified | ✅ PASS — average sentence length: median 21.3 words, longest page 29.2 |
| 121 | Scannability | not measured before | none needed — verified | ✅ PASS — lists + ≥4 H2 sections per page |
| 122 | No filler | not measured before | none needed — verified | ✅ PASS — no repeated paragraph blocks (max pairwise overlap 17%) |
| 123 | No repetitive paragraphs | not measured before | none needed — verified | ✅ PASS — no repeated paragraph blocks (max pairwise overlap 17%) |
| 124 | No AI-sounding keyword stuffing | not measured before | none needed — verified | ✅ PASS — highest exact-topic density 2.6% |
| 125 | No unsupported claims | not measured before | see note | ⚠️ NEEDS IMPROVEMENT — cannot be verified from code: IICRC (35 pages), BBB (4 pages), licensed (7 pages), bonded (2 pages), USAA preferred (4 pages), veteran-owned (5 pages), Yelp (1 pages) — confirm each is true or remove it |
| 126 | Service pages ≥1,400 words of useful content | FAIL — 10/11 under 1,400 | Wrote ~4,800 words of service depth (11/11 now ≥1,400) | ✅ PASS — 11/11 service pages ≥1,400 unique words (min 1447, max 2062) |
| 127 | County hub pages ≥1,400 words | PASS | none needed — verified | ✅ PASS — 3/3 county hubs ≥1,400 (min 1521) |
| 128 | Location pages ≥1,400 words | FAIL — 22/23 under 1,400 (median 580) | Wrote ~8,500 words of unique local sections (21 still <1,400) | ⚠️ NEEDS IMPROVEMENT — 21/23 city pages are under 1,400 (range 1044–1727, median 1158); I stopped at unique, accurate local content instead of padding |

### PART 12 — CONTENT UNIQUENESS

| # | Checklist item | Status before | Action taken | Status after |
|---|---|---|---|---|
| 129 | Unique introduction | not measured before | none needed — verified | ✅ PASS — every area page opens differently |
| 130 | Unique headings | NEEDS — 3 template headings ×20 city pages | Wrote location-specific headings for 67 city sections | ✅ PASS — 6 H2 phrases are reused on ≥6 area pages (mostly FAQ/service-section labels) |
| 131 | Unique service explanation | not measured before | none needed — verified | ✅ PASS — peak 1% |
| 132 | Unique local information | not measured before | none needed — verified | ✅ PASS — peak 17% (water-damage-tolleson-az ↔ water-damage-eloy-az) |
| 133 | Unique FAQs where appropriate | not measured before | none needed — verified | ✅ PASS — 1 repeated FAQ questions out of 203 (standard local-intent questions) |
| 134 | Unique supporting content | not measured before | none needed — verified | ✅ PASS — peak 4% |
| 135 | Unique CTA context | not measured before | none needed — verified | ✅ PASS — hero CTA wording is page-specific (service name / place name) |
| 136 | No copied paragraphs | not measured before | none needed — verified | ✅ PASS — no repeated paragraph blocks (max pairwise overlap 17%) |
| 137 | No city-name replacement templates | NEEDS — 3 template headings ×20 city pages | Wrote location-specific headings for 67 city sections | ✅ PASS — 6 H2 phrases are reused on ≥6 area pages (mostly FAQ/service-section labels) |
| 138 | No near-duplicate pages | not measured before | none needed — verified | ✅ PASS — city↔city overlap peaks at 17% (water-damage-tolleson-az ↔ water-damage-eloy-az); each page has its own local sections |

### PART 13 — CANNIBALIZATION

| # | Checklist item | Status before | Action taken | Status after |
|---|---|---|---|---|
| 139 | Service vs service | not measured before | none needed — verified | ✅ PASS — 11 distinct primary topics; no pair above 40% overlap |
| 140 | Service vs homepage | not measured before | none needed — verified | ✅ PASS — homepage targets the brand/umbrella query; services target their own |
| 141 | Service vs location | not measured before | none needed — verified | ✅ PASS — each area page targets its own place |
| 142 | Location vs location | not measured before | none needed — verified | ✅ PASS — each area page targets its own place |
| 143 | Blog vs service | not measured before | none needed — verified | ✅ PASS — blog titles are informational (guide/cost/signs) vs commercial service titles |
| 144 | Blog vs location | not measured before | none needed — verified | ✅ PASS — blog titles are informational (guide/cost/signs) vs commercial service titles |
| 145 | Different search intent / topic / purpose | not measured before | none needed — verified | ✅ PASS — 11 distinct primary topics; no pair above 40% overlap |
| 146 | Different content | not measured before | none needed — verified | ✅ PASS — no repeated paragraph blocks (max pairwise overlap 17%) |
| 147 | Different internal-link role | not measured before | none needed — verified | ✅ PASS — each service links to ≥2 related services (min 11 service links) |

### PART 14 — INTERNAL LINKING

| # | Checklist item | Status before | Action taken | Status after |
|---|---|---|---|---|
| 148 | No important orphan pages | not measured before | none needed — verified | ✅ PASS — 0 orphans; fewest inbound links = 4 |
| 149 | Homepage links to important pages | not measured before | none needed — verified | ✅ PASS — home links 11 services, 26 area pages, About, Contact, FAQ, Blog |
| 150 | Service hubs link to services | not measured before | none needed — verified | ✅ PASS — /services links all 11 |
| 151 | Services link to related services | not measured before | none needed — verified | ✅ PASS — each service links to ≥2 related services (min 11 service links) |
| 152 | Services link to relevant locations | not measured before | none needed — verified | ✅ PASS — each service links ≥3 area pages (min 4) |
| 153 | Locations link to relevant services | not measured before | none needed — verified | ✅ PASS — every area page links all 11 services |
| 154 | Locations link to related locations | not measured before | none needed — verified | ✅ PASS — every city links its county hub + nearby areas (“Areas We Also Serve”) |
| 155 | Blog links to relevant services | not measured before | none needed — verified | ✅ PASS — every post links ≥1 service (min 11) |
| 156 | Services link to relevant blog guides | MISSING — 0 service/area pages linked a guide | 28 contextual links from service/area pages to guides | ✅ PASS — 10/11 service pages link a relevant guide |
| 157 | FAQ links to relevant pages | not measured before | none needed — verified | ✅ PASS — FAQ answers link to the matching service/guide/contact pages |
| 158 | Contact page accessible | not measured before | none needed — verified | ✅ PASS — /contact is in the nav on 54/54 |
| 159 | Breadcrumbs where useful | not measured before | none needed — verified | ✅ PASS — BreadcrumbList on all 53 inner pages |
| 160 | Contextual links | MISSING — 0 service/area pages linked a guide | 28 contextual links from service/area pages to guides | ✅ PASS — 10/11 service pages link a relevant guide |
| 161 | Natural anchor text | not measured before | none needed — verified | ✅ PASS — generic anchors ("learn more"/"here") 0/3873 |
| 162 | No excessive links | not measured before | none needed — verified | ✅ PASS — max 104 links on a page |
| 163 | No broken internal links | not measured before | none needed — verified | ✅ PASS — 0 broken of 3873 internal links |

### PART 15 — IMAGE SEO

| # | Checklist item | Status before | Action taken | Status after |
|---|---|---|---|---|
| 164 | Relevant image / filename / alt / dimensions / WebP / compression / lazy loading / hero priority / no huge images / no broken images / decorative alt / visual relevance (20 items) | not measured before | none needed — verified | N/A — site has no <img> elements, so there is no alt text to optimise (0 across 54 pages) |

### PART 16 — CANONICAL SEO

| # | Checklist item | Status before | Action taken | Status after |
|---|---|---|---|---|
| 165 | Canonical exists | not measured before | none needed — verified | ✅ PASS — 54/54 have exactly one canonical |
| 166 | Canonical is absolute | not measured before | none needed — verified | ✅ PASS — absolute https URLs |
| 167 | Points to correct preferred URL | NEEDS — home canonical ≠ sitemap URL | Home sitemap entry now identical to canonical | ✅ PASS — canonical = sitemap URL on 54/54 (home included) |
| 168 | Self-canonical where appropriate | NEEDS — home canonical ≠ sitemap URL | Home sitemap entry now identical to canonical | ✅ PASS — canonical = sitemap URL on 54/54 (home included) |
| 169 | No multiple competing canonicals | not measured before | none needed — verified | ✅ PASS — 54/54 have exactly one canonical |
| 170 | No canonical to unrelated page | not measured before | none needed — verified | ✅ PASS — no unique page canonicalised to the homepage |
| 171 | No unique page canonicalized to homepage | not measured before | none needed — verified | ✅ PASS — no unique page canonicalised to the homepage |
| 172 | Canonical agrees with sitemap | NEEDS — home canonical ≠ sitemap URL | Home sitemap entry now identical to canonical | ✅ PASS — canonical = sitemap URL on 54/54 (home included) |
| 173 | Canonical agrees with internal links | not measured before | none needed — verified | ✅ PASS — internal links use the same clean URL form as the canonicals |
| 174 | HTTP/HTTPS consistency | not measured before | none needed — verified | ✅ PASS — https everywhere, 0 http:// references, HSTS sent |
| 175 | www/non-www consistency | not measured before | none needed — verified | ✅ PASS — one host (non-www) used in every canonical/sitemap/schema URL; the www→apex redirect itself is set in Vercel/DNS (external) |
| 176 | Trailing-slash consistency | not measured before | none needed — verified | ✅ PASS — trailing-slash URLs 308 → clean URL |

### PART 17 — ROBOTS.TXT

| # | Checklist item | Status before | Action taken | Status after |
|---|---|---|---|---|
| 177 | robots.txt exists | not measured before | none needed — verified | ✅ PASS — /robots.txt returns 200 |
| 178 | Correct syntax | not measured before | none needed — verified | ✅ PASS — valid directives only |
| 179 | Does not block important pages | not measured before | none needed — verified | ✅ PASS — blocks no content paths |
| 180 | Does not block CSS | not measured before | none needed — verified | ✅ PASS — /_next (CSS/JS) not blocked |
| 181 | Does not block required JavaScript | not measured before | none needed — verified | ✅ PASS — /_next (CSS/JS) not blocked |
| 182 | Does not block images unnecessarily | not measured before | none needed — verified | ✅ PASS — images/icons not blocked |
| 183 | Admin/private areas handled | not measured before | none needed — verified | ✅ PASS — private endpoint /api/ disallowed; the site has no admin area |
| 184 | API/private endpoints handled | not measured before | none needed — verified | ✅ PASS — private endpoint /api/ disallowed; the site has no admin area |
| 185 | Sitemap URL included | not measured before | none needed — verified | ✅ PASS — Sitemap line present |

### PART 18 — XML SITEMAP

| # | Checklist item | Status before | Action taken | Status after |
|---|---|---|---|---|
| 186 | Sitemap exists | not measured before | none needed — verified | ✅ PASS — sitemap.xml served |
| 187 | Valid XML | not measured before | none needed — verified | ✅ PASS — well-formed urlset |
| 188 | Contains canonical indexable URLs | not measured before | none needed — verified | ✅ PASS — canonical = sitemap URL on 54/54 (home included) |
| 189 | No noindex URLs | not measured before | none needed — verified | ✅ PASS — none on any of 54 pages (meta or header) |
| 190 | No redirected URLs | not measured before | none needed — verified | ✅ PASS — every URL returns 200 (no 3xx) |
| 191 | No 404 URLs | not measured before | none needed — verified | ✅ PASS — 54/54 return 200; unknown URLs return a real 404 |
| 192 | No duplicate URLs | not measured before | none needed — verified | ✅ PASS — 54 unique URLs |
| 193 | No unnecessary URLs | not measured before | none needed — verified | ✅ PASS — 54 URLs = 1 home + 6 index/static + 11 services + 26 areas + 8 posts + 2 legal; nothing unnecessary |
| 194 | Correct domain | not measured before | none needed — verified | ✅ PASS — all https://waterdamagerestoration-arizona.com |
| 195 | Correct protocol | not measured before | none needed — verified | ✅ PASS — all https://waterdamagerestoration-arizona.com |
| 196 | Updated automatically when pages change | not measured before | none needed — verified | ✅ PASS — app/sitemap.ts builds from the content files, so new pages appear automatically |

### PART 19 — MOBILE SEO

| # | Checklist item | Status before | Action taken | Status after |
|---|---|---|---|---|
| 197 | Responsive layout | not measured before | none needed — verified | ✅ PASS — 270 loads (12 widths × 16 page types + all pages at 360/1440): 0 issues |
| 198 | No horizontal scrolling | not measured before | none needed — verified | ✅ PASS — 270 loads (12 widths × 16 page types + all pages at 360/1440): 0 issues |
| 199 | Text readable | not measured before | none needed — verified | ✅ PASS — no body/label text below 12px (tagline raised from 11px) |
| 200 | Buttons large enough | not measured before | none needed — verified | ✅ PASS — 270 loads (12 widths × 16 page types + all pages at 360/1440): 0 issues |
| 201 | Navigation works | not measured before | none needed — verified | ✅ PASS — menu opens, closes on Escape, links navigate (360/390/430/768) |
| 202 | Dropdowns work | FAIL — dropdown opened on hover only | Added :focus-within | ✅ PASS — desktop dropdown opens on hover AND keyboard focus |
| 203 | Phone CTA works | not measured before | none needed — verified | ✅ PASS — tel:+19282679292 on every page, header button visible at 360px |
| 204 | Forms work | not measured before | none needed — verified | ✅ PASS — form validates, submits, double-click safe |
| 205 | Images responsive | not measured before | none needed — verified | N/A — no <img> elements on the site |
| 206 | Hero works | not measured before | none needed — verified | ✅ PASS — 270 loads (12 widths × 16 page types + all pages at 360/1440): 0 issues |
| 207 | Cards work | not measured before | none needed — verified | ✅ PASS — 270 loads (12 widths × 16 page types + all pages at 360/1440): 0 issues |
| 208 | Tables do not overflow | not measured before | none needed — verified | N/A — no data tables exist on any page |
| 209 | Footer works | not measured before | none needed — verified | ✅ PASS — 270 loads (12 widths × 16 page types + all pages at 360/1440): 0 issues |
| 210 | No overlapping elements | not measured before | none needed — verified | ✅ PASS — no overflow/overlap at any tested width (checked by element bounds); key pages also reviewed visually |
| 211 | No hidden important content | not measured before | none needed — verified | ✅ PASS — no content is hidden on mobile; the mobile menu mirrors the desktop navigation |
| 212 | Touch targets usable | not measured before | none needed — verified | ✅ PASS — 270 loads (12 widths × 16 page types + all pages at 360/1440): 0 issues |

### PART 20 — PAGE SPEED / CORE WEB VITALS

| # | Checklist item | Status before | Action taken | Status after |
|---|---|---|---|---|
| 213 | LCP | not measured before | none needed — verified | ✅ PASS — lab LCP ≤ 188 ms on 8 key pages (mobile viewport, local server, unthrottled) |
| 214 | INP | not measured before | see note | ⚠️ NEEDS IMPROVEMENT — cannot be measured offline — check INP in PageSpeed Insights / Search Console (field data) after launch; the site ships ~102 kB of shared JS and no third-party scripts |
| 215 | CLS | not measured before | none needed — verified | ✅ PASS — lab CLS 0 on 8 key pages |
| 216 | Image optimization | not measured before | none needed — verified | N/A — no raster images to optimise |
| 217 | Font loading | not measured before | none needed — verified | ✅ PASS — Montserrat + Inter via next/font (self-hosted at build, no render-blocking font CSS) |
| 218 | JavaScript bundle size | not measured before | none needed — verified | ✅ PASS — shared first-load JS 102 kB |
| 219 | Unnecessary JavaScript | not measured before | none needed — verified | ✅ PASS — no third-party scripts or libraries beyond React/Next |
| 220 | CSS efficiency | — | none needed — verified | ✅ PASS — one stylesheet (30 KB source, minified/gzipped by Next) |
| 221 | Third-party scripts | not measured before | none needed — verified | ✅ PASS — none; the only third-party content is the Google Maps iframe on /contact |
| 222 | Lazy loading | not measured before | none needed — verified | ✅ PASS — maps iframe is loading="lazy" |
| 223 | Preloading where justified | not measured before | none needed — verified | ✅ PASS — none needed (no hero images; fonts handled by next/font) |
| 224 | Responsive images | not measured before | none needed — verified | N/A — no images |
| 225 | Layout stability | not measured before | none needed — verified | ✅ PASS — lab CLS 0 on 8 key pages |
| 226 | Above-the-fold performance | not measured before | none needed — verified | ✅ PASS — lab LCP ≤ 188 ms on 8 key pages (mobile viewport, local server, unthrottled) |

### PART 21 — TECHNICAL HTML

| # | Checklist item | Status before | Action taken | Status after |
|---|---|---|---|---|
| 227 | Valid HTML structure | not measured before | none needed — verified | ✅ PASS — no duplicate IDs on any page; landmarks nested correctly (W3C validator itself needs internet — run it after deploy) |
| 228 | Semantic HTML | NEEDS — no <main> | <main> added | ✅ PASS — 1 <main>, <header>, <nav>, <footer> on 54/54 |
| 229 | Header | NEEDS — no <main> | <main> added | ✅ PASS — 1 <main>, <header>, <nav>, <footer> on 54/54 |
| 230 | Navigation | NEEDS — no <main> | <main> added | ✅ PASS — 1 <main>, <header>, <nav>, <footer> on 54/54 |
| 231 | Main | NEEDS — no <main> | <main> added | ✅ PASS — 1 <main>, <header>, <nav>, <footer> on 54/54 |
| 232 | Section | not measured before | none needed — verified | ✅ PASS — <section> with headings used for page sections |
| 233 | Article where appropriate | MISSING | Blog body wrapped in <article> | ✅ PASS — <article> on all 8 posts |
| 234 | Footer | NEEDS — no <main> | <main> added | ✅ PASS — 1 <main>, <header>, <nav>, <footer> on 54/54 |
| 235 | Buttons are buttons | not measured before | none needed — verified | ✅ PASS — menu toggle and form submit are real <button>s |
| 236 | Links are links | not measured before | none needed — verified | ✅ PASS — every link has text or an aria-label (0 empty links) |
| 237 | Forms are accessible | not measured before | none needed — verified | ✅ PASS — form: labels, inline errors, aria-live status |
| 238 | Labels exist | not measured before | none needed — verified | ✅ PASS — 7/7 fields have <label for> |
| 239 | Inputs have appropriate types | not measured before | none needed — verified | ✅ PASS — type=tel / type=email, autocomplete + inputMode set |
| 240 | Images have alt attributes | not measured before | none needed — verified | N/A — no images, so no alt attributes are needed |
| 241 | Proper language attribute | not measured before | none needed — verified | ✅ PASS — lang="en" on 54/54 |
| 242 | Correct viewport meta tag | not measured before | none needed — verified | ✅ PASS — viewport meta on 54/54 |

### PART 22 — ACCESSIBILITY

| # | Checklist item | Status before | Action taken | Status after |
|---|---|---|---|---|
| 243 | Keyboard navigation | NEEDS — no skip link/main landmark | Skip link + <main id=main> | ✅ PASS — skip link is the first Tab stop and moves focus to <main> |
| 244 | Focus states | not measured before | none needed — verified | ✅ PASS — :focus-visible rings on links, buttons, inputs (white ring on dark sections) |
| 245 | Form labels | not measured before | none needed — verified | ✅ PASS — 7/7 fields have <label for> |
| 246 | Color contrast | FAIL — red-on-dark labels at 2.5–3.4:1 (53 eyebrows + hero/process/county labels) | Lightened labels on dark sections to #FF8A80 (~8:1) | ✅ PASS — 0 failing text/background pairs on 54 pages (WCAG AA 4.5:1 / 3:1 large) |
| 247 | Alt text | not measured before | none needed — verified | N/A — no images |
| 248 | Accessible buttons | not measured before | none needed — verified | ✅ PASS — every link has text or an aria-label (0 empty links) |
| 249 | Accessible navigation | not measured before | none needed — verified | ✅ PASS — menu button has aria-label + aria-expanded |
| 250 | ARIA only where necessary | not measured before | none needed — verified | ✅ PASS — ARIA used only on the menu toggle, status/alert regions and decorative-icon hiding |
| 251 | No inaccessible dropdowns | not measured before | none needed — verified | ✅ PASS — desktop dropdown opens on hover AND keyboard focus |
| 252 | No inaccessible modals | not measured before | none needed — verified | N/A — the site has no modals or dialogs |
| 253 | Text remains readable | not measured before | none needed — verified | ✅ PASS — no body/label text below 12px (tagline raised from 11px) |
| 254 | Reduced-motion consideration | MISSING | Added prefers-reduced-motion block | ✅ PASS — @media (prefers-reduced-motion: reduce) disables transitions/animations |

### PART 23 — STRUCTURED DATA / SCHEMA

| # | Checklist item | Status before | Action taken | Status after |
|---|---|---|---|---|
| 255 | LocalBusiness | NEEDS — LocalBusiness lacked url/image/logo | Added url/image/logo/description/parentOrganization | ✅ PASS — Organization + WebSite + LocalBusiness on the homepage |
| 256 | Organization | not measured before | none needed — verified | ✅ PASS — Organization (with logo) on 54/54 |
| 257 | WebSite | not measured before | none needed — verified | ✅ PASS — WebSite on 54/54 |
| 258 | WebPage | not measured before | none needed — verified | N/A — generic WebPage not used: each page carries its specific type (Service, AboutPage, ContactPage, BlogPosting, FAQPage) instead |
| 259 | Service | not measured before | none needed — verified | ✅ PASS — Service on all 11 service + 26 area pages (area pages reference the shared business as provider) |
| 260 | BreadcrumbList | not measured before | none needed — verified | ✅ PASS — BreadcrumbList on all 53 inner pages |
| 261 | FAQPage | not measured before | none needed — verified | ✅ PASS — FAQPage on 46 pages; every question visible on its page |
| 262 | Article | NEEDS — Article lacked mainEntityOfPage/image | BlogPosting + mainEntityOfPage + image | ✅ PASS — BlogPosting on 8/8 (url, mainEntityOfPage, image) |
| 263 | BlogPosting | NEEDS — Article lacked mainEntityOfPage/image | BlogPosting + mainEntityOfPage + image | ✅ PASS — BlogPosting on 8/8 (url, mainEntityOfPage, image) |
| 264 | AboutPage | MISSING | AboutPage schema | ✅ PASS — AboutPage on /about |
| 265 | ContactPage | not measured before | none needed — verified | ✅ PASS — ContactPage on /contact |
| 266 | Valid JSON-LD | not measured before | none needed — verified | ✅ PASS — every JSON-LD block parses |
| 267 | Correct syntax | not measured before | none needed — verified | ✅ PASS — every JSON-LD block parses |
| 268 | Correct entity information | not measured before | none needed — verified | ✅ PASS — one phone (+1-928-267-9292), one address, one site URL across all schema |
| 269 | Matches visible content | not measured before | none needed — verified | ✅ PASS — FAQ/breadcrumb/service data mirrors visible content (FAQ parity verified per page) |
| 270 | No fake reviews | not measured before | none needed — verified | ✅ PASS — no ratings, reviews, awards, credentials or licenses in schema |
| 271 | No fake ratings | not measured before | none needed — verified | ✅ PASS — no ratings, reviews, awards, credentials or licenses in schema |
| 272 | No fake awards | not measured before | none needed — verified | ✅ PASS — no ratings, reviews, awards, credentials or licenses in schema |
| 273 | No fake certifications | not measured before | none needed — verified | ✅ PASS — no ratings, reviews, awards, credentials or licenses in schema |
| 274 | No fake licenses | not measured before | none needed — verified | ✅ PASS — no ratings, reviews, awards, credentials or licenses in schema |
| 275 | No misleading schema | not measured before | none needed — verified | ✅ PASS — no markup for content that is not on the page |
| 276 | No unnecessary duplicate schema | NEEDS — second LocalBusiness on every area page | Area pages now emit Service → shared business | ✅ PASS — one business entity (@id …/#business); area pages no longer define a second LocalBusiness |

### PART 24 — LOCAL SEO (applied to this site: Wickenburg / Arizona — the Tupelo, Mississippi NAP in your checklist belongs to a different site)

| # | Checklist item | Status before | Action taken | Status after |
|---|---|---|---|---|
| 277 | Business name consistency | not measured before | none needed — verified | ✅ PASS — Arizona Water Damage Restoration used consistently (header, footer, schema) |
| 278 | Phone consistency | not measured before | none needed — verified | ✅ PASS — only (928) 267-9292 appears ((928) 267-9292) |
| 279 | Address consistency | — | none needed — verified | ✅ PASS — only 340 W Wickenburg Way, Wickenburg, AZ 85390 appears |
| 280 | Email consistency | not measured before | none needed — verified | ✅ PASS — only info@waterdamagerestoration-arizona.com (the form's you@example.com is a placeholder hint, not a contact address) |
| 281 | Local relevance (Wickenburg) | not measured before | none needed — verified | ✅ PASS — Arizona/Wickenburg in titles & descriptions of content pages |
| 282 | State relevance (Arizona) | not measured before | none needed — verified | ✅ PASS — Arizona/Wickenburg in titles & descriptions of content pages |
| 283 | Relevant surrounding service areas | not measured before | none needed — verified | ✅ PASS — 23 communities across Maricopa, Pima and Pinal counties, each with its own page |
| 284 | Local service information | not measured before | none needed — verified | ✅ PASS — local terrain/housing/water context on 26/26 area pages |
| 285 | Local entities | not measured before | none needed — verified | ✅ PASS — 19 pages name real local landmarks/rivers/bases |
| 286 | Local terminology | not measured before | none needed — verified | ✅ PASS — local terrain/housing/water context on 26/26 area pages |
| 287 | ZIP codes where genuinely useful | not measured before | none needed — verified | ✅ PASS — ZIP codes shown on 22/23 city pages (where they help) |
| 288 | No keyword stuffing | not measured before | none needed — verified | ✅ PASS — highest exact-topic density 2.6% |
| 289 | No fake locations | not measured before | none needed — verified | ✅ PASS — all 23 communities are real places; no invented offices or branches |
| 290 | No doorway location pages | not measured before | none needed — verified | ✅ PASS — city↔city overlap peaks at 17% (water-damage-tolleson-az ↔ water-damage-eloy-az); each page has its own local sections |
| 291 | Address is acceptable to Google Business Profile | not measured before | see note | ⚠️ NEEDS IMPROVEMENT — external: confirm 340 W Wickenburg Way is an address Google Business Profile accepts (a mailbox/virtual address is not eligible; a service-area business can hide it). Suite number is still TBD. |

### PART 25 — AEO

| # | Checklist item | Status before | Action taken | Status after |
|---|---|---|---|---|
| 292 | Direct answers | not measured before | none needed — verified | ✅ PASS — median FAQ answer 34 words — answers lead with the answer |
| 293 | Question-based headings where useful | not measured before | none needed — verified | ✅ PASS — question headings (H3) on 52 pages |
| 294 | FAQ content | not measured before | none needed — verified | ✅ PASS — FAQ block with ≥3 questions on service/area pages |
| 295 | Clear definitions | not measured before | none needed — verified | ✅ PASS — service pages open with a definition ("what it is / what counts / what it involves") |
| 296 | Step-by-step explanations | not measured before | none needed — verified | ✅ PASS — numbered step lists on 8/11 service pages |
| 297 | Lists where useful | not measured before | none needed — verified | ✅ PASS — lists + ≥4 H2 sections per page |
| 298 | Easy-to-extract factual answers | not measured before | none needed — verified | ✅ PASS — FAQ answers are plain-text factual statements and mirrored in FAQPage schema |
| 299 | Strong topical context | not measured before | none needed — verified | ✅ PASS — 10/11 service pages cover ≥5 of: definition, causes, process, when-to-call, FAQ, related services |

### PART 26 — GEO

| # | Checklist item | Status before | Action taken | Status after |
|---|---|---|---|---|
| 300 | WHO — business identity clear | not measured before | none needed — verified | ✅ PASS — name, phone, address and email in the header/footer of every page |
| 301 | WHAT — services clear | not measured before | none needed — verified | ✅ PASS — home links 11 services, 26 area pages, About, Contact, FAQ, Blog |
| 302 | WHERE — locations clear | not measured before | none needed — verified | ✅ PASS — 23 communities across Maricopa, Pima and Pinal counties, each with its own page |
| 303 | WHEN — availability clear | not measured before | none needed — verified | ✅ PASS — 24/7 emergency availability stated on home and service pages |
| 304 | WHY — reasons clear | not measured before | none needed — verified | ✅ PASS — differentiators stated on the About page and home (local base, standards followed, insurance help); unverifiable ones are flagged separately |
| 305 | HOW — process clear | not measured before | none needed — verified | ✅ PASS — 10/11 service pages cover ≥5 of: definition, causes, process, when-to-call, FAQ, related services |
| 306 | Business identity clear | not measured before | none needed — verified | ✅ PASS — Arizona Water Damage Restoration used consistently (header, footer, schema) |
| 307 | Services clear | not measured before | none needed — verified | ✅ PASS — /services links all 11 |
| 308 | Locations clear | not measured before | none needed — verified | ✅ PASS — every city links its county hub + nearby areas (“Areas We Also Serve”) |
| 309 | Service relationships clear | not measured before | none needed — verified | ✅ PASS — every area page links all 11 services |
| 310 | Local context clear | not measured before | none needed — verified | ✅ PASS — local terrain/housing/water context on 26/26 area pages |
| 311 | Contact information clear | not measured before | none needed — verified | ✅ PASS — /contact is in the nav on 54/54 |
| 312 | Important answers easy to understand | not measured before | none needed — verified | ✅ PASS — FAQ answers are plain-text factual statements and mirrored in FAQPage schema |

### PART 27 — LLMO

| # | Checklist item | Status before | Action taken | Status after |
|---|---|---|---|---|
| 313 | Service ↔ problem relationship | not measured before | none needed — verified | ✅ PASS — 10/11 service pages cover ≥5 of: definition, causes, process, when-to-call, FAQ, related services |
| 314 | Problem ↔ cause relationship | not measured before | none needed — verified | ✅ PASS — 10/11 service pages cover ≥5 of: definition, causes, process, when-to-call, FAQ, related services |
| 315 | Cause ↔ solution relationship | not measured before | none needed — verified | ✅ PASS — 10/11 service pages cover ≥5 of: definition, causes, process, when-to-call, FAQ, related services |
| 316 | Solution ↔ location relationship | not measured before | none needed — verified | ✅ PASS — 10/11 service pages cover ≥5 of: definition, causes, process, when-to-call, FAQ, related services |
| 317 | Location ↔ customer need relationship | not measured before | none needed — verified | ✅ PASS — 10/11 service pages cover ≥5 of: definition, causes, process, when-to-call, FAQ, related services |
| 318 | No "ChatGPT recommends us" / "AI-approved" / "Google-approved" claims | FAIL — 4 pages (26 mentions) claimed AI-assistant recommendations | Replaced with real "how to choose a company" advice | ✅ PASS — no "ChatGPT recommends us / AI-approved / Google-approved" claims anywhere (4 pages had them; replaced with real advice) |

### PART 28 — CTA / CONVERSION SEO

| # | Checklist item | Status before | Action taken | Status after |
|---|---|---|---|---|
| 319 | Phone CTA | not measured before | none needed — verified | ✅ PASS — tel: link on 54/54 (header) plus hero + sidebar CTAs |
| 320 | Contact CTA | not measured before | none needed — verified | ✅ PASS — /contact is in the nav on 54/54 |
| 321 | Clear next step | not measured before | none needed — verified | ✅ PASS — each page ends with a call + request-service block |
| 322 | Mobile click-to-call | not measured before | none needed — verified | ✅ PASS — tel:+19282679292 on every page, header button visible at 360px |
| 323 | CTA matches page intent | not measured before | none needed — verified | ✅ PASS — hero CTA wording is page-specific (service name / place name) |
| 324 | CTA not excessive | not measured before | none needed — verified | ✅ PASS — max 7 tel: links on one page |
| 325 | CTA visible without harming UX | not measured before | none needed — verified | ✅ PASS — 270 loads (12 widths × 16 page types + all pages at 360/1440): 0 issues |
| 326 | Contact information easy to find | not measured before | none needed — verified | ✅ PASS — /contact is in the nav on 54/54 |

### PART 29 — BLOG SEO

| # | Checklist item | Status before | Action taken | Status after |
|---|---|---|---|---|
| 327 | Unique title | not measured before | none needed — verified | ✅ PASS — 8 unique titles and H1s |
| 328 | Unique H1 | not measured before | none needed — verified | ✅ PASS — 8 unique titles and H1s |
| 329 | Search intent | NEEDS — 3 posts 430–551 words | Expanded 3 posts (+770 words) | ✅ PASS — 716–1090 words each |
| 330 | Helpful content | NEEDS — 3 posts 430–551 words | Expanded 3 posts (+770 words) | ✅ PASS — 716–1090 words each |
| 331 | Semantic coverage | NEEDS — 3 posts 430–551 words | Expanded 3 posts (+770 words) | ✅ PASS — 716–1090 words each |
| 332 | Internal links | not measured before | none needed — verified | ✅ PASS — every post links ≥1 service (min 11) |
| 333 | Relevant service links | not measured before | none needed — verified | ✅ PASS — every post links ≥1 service (min 11) |
| 334 | Relevant location links where appropriate | not measured before | none needed — verified | ✅ PASS — 8/8 posts link area pages |
| 335 | Author information / publish date | not measured before | see note | ⚠️ NEEDS IMPROVEMENT — schema names the business as author/publisher; no personal author byline or datePublished exists because I will not invent them — add real author names and publish dates |
| 336 | Article/BlogPosting schema | NEEDS — Article lacked mainEntityOfPage/image | BlogPosting + mainEntityOfPage + image | ✅ PASS — BlogPosting on 8/8 (url, mainEntityOfPage, image) |
| 337 | Featured image | not measured before | see note | ⚠️ NEEDS IMPROVEMENT — no featured images exist (site has no photography); schema uses the generated brand card. Add real photos per post. |
| 338 | Image optimization | not measured before | none needed — verified | N/A — no post images yet |
| 339 | Meta title | not measured before | none needed — verified | ✅ PASS — 54 unique titles |
| 340 | Meta description | not measured before | none needed — verified | ✅ PASS — 54 unique |
| 341 | Canonical | not measured before | none needed — verified | ✅ PASS — 54/54 have exactly one canonical |
| 342 | Breadcrumb | not measured before | none needed — verified | ✅ PASS — BreadcrumbList on all 53 inner pages |
| 343 | Related articles | not measured before | none needed — verified | ✅ PASS — each post links ≥2 related articles |
| 344 | No thin posts | NEEDS — 3 posts 430–551 words | Expanded 3 posts (+770 words) | ✅ PASS — 716–1090 words each |
| 345 | No duplicate topics | not measured before | none needed — verified | ✅ PASS — no two posts target the same topic |

### PART 30 — SERVICE-AREA PAGE SEO

| # | Checklist item | Status before | Action taken | Status after |
|---|---|---|---|---|
| 346 | Unique intent | not measured before | none needed — verified | ✅ PASS — each area page targets its own place |
| 347 | Unique H1 | not measured before | none needed — verified | ✅ PASS — 54 unique H1s |
| 348 | Unique title | not measured before | none needed — verified | ✅ PASS — 54 unique titles |
| 349 | Unique meta description | not measured before | none needed — verified | ✅ PASS — 54 unique |
| 350 | Unique introduction | not measured before | none needed — verified | ✅ PASS — every area page opens differently |
| 351 | Local context | not measured before | none needed — verified | ✅ PASS — local terrain/housing/water context on 26/26 area pages |
| 352 | Population where useful | not measured before | none needed — verified | N/A — population figures deliberately omitted — nothing here could be verified, and invented numbers would be worse than none |
| 353 | County where useful | not measured before | none needed — verified | ✅ PASS — county named on all area pages |
| 354 | ZIP code where useful | not measured before | none needed — verified | ✅ PASS — ZIP codes shown on 22/23 city pages (where they help) |
| 355 | Local water-damage considerations | not measured before | none needed — verified | ✅ PASS — local terrain/housing/water context on 26/26 area pages |
| 356 | Services relevant to that area | not measured before | none needed — verified | ✅ PASS — every area page links all 11 services |
| 357 | Relevant internal links | not measured before | none needed — verified | ✅ PASS — every city links its county hub + nearby areas (“Areas We Also Serve”) |
| 358 | FAQ | NEEDS — 2 pages <3 FAQs | same | ✅ PASS — FAQ block with ≥3 questions on service/area pages |
| 359 | CTA | not measured before | none needed — verified | ✅ PASS — tel: link on 54/54 (header) plus hero + sidebar CTAs |
| 360 | Unique content | not measured before | none needed — verified | ✅ PASS — peak 17% (water-damage-tolleson-az ↔ water-damage-eloy-az) |
| 361 | No doorway-page pattern | not measured before | none needed — verified | ✅ PASS — city↔city overlap peaks at 17% (water-damage-tolleson-az ↔ water-damage-eloy-az); each page has its own local sections |
| 362 | No duplicate city templates | NEEDS — 3 template headings ×20 city pages | Wrote location-specific headings for 67 city sections | ✅ PASS — 6 H2 phrases are reused on ≥6 area pages (mostly FAQ/service-section labels) |

### PART 31 — SECURITY

| # | Checklist item | Status before | Action taken | Status after |
|---|---|---|---|---|
| 363 | HTTPS | not measured before | none needed — verified | ✅ PASS — https everywhere, 0 http:// references, HSTS sent |
| 364 | No mixed content | not measured before | none needed — verified | ✅ PASS — 0 http:// references in 54 pages |
| 365 | Secure forms | not measured before | none needed — verified | ✅ PASS — same-origin check, server-side validation, rate limit, honeypot, time-trap (36 API cases tested earlier) |
| 366 | Environment variables not exposed | not measured before | none needed — verified | ✅ PASS — secrets only in server code; client JS bundles contain none |
| 367 | Secrets not committed | not measured before | none needed — verified | ✅ PASS — .env* git-ignored; no keys in source; only .env.example (blank) ships |
| 368 | No API keys in frontend | not measured before | none needed — verified | ✅ PASS — secrets only in server code; client JS bundles contain none |
| 369 | Security headers where appropriate | not measured before | none needed — verified | ✅ PASS — HSTS, CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy all sent |
| 370 | CSP consideration | not measured before | none needed — verified | ✅ PASS — CSP present (script-src keeps 'unsafe-inline' to retain static rendering — documented trade-off) |
| 371 | X-Content-Type-Options | not measured before | none needed — verified | ✅ PASS — nosniff |
| 372 | Referrer-Policy | not measured before | none needed — verified | ✅ PASS — strict-origin-when-cross-origin |
| 373 | Permissions-Policy | not measured before | none needed — verified | ✅ PASS — present |
| 374 | Frame protection | not measured before | none needed — verified | ✅ PASS — DENY |
| 375 | Form spam protection | not measured before | none needed — verified | ✅ PASS — honeypot + time-trap + rate limit + duplicate suppression |
| 376 | Framework header hidden | not measured before | none needed — verified | ✅ PASS — X-Powered-By removed |
| 377 | Live HTTPS behaviour after deployment | not measured before | see note | ⚠️ NEEDS IMPROVEMENT — external: live HTTPS/HSTS behaviour can only be confirmed after the domain is deployed on Vercel |

### PART 32 — BROKEN ELEMENTS

| # | Checklist item | Status before | Action taken | Status after |
|---|---|---|---|---|
| 378 | Broken internal links | not measured before | none needed — verified | ✅ PASS — 0 broken of 3873 internal links |
| 379 | Broken external links | not measured before | none needed — verified | ✅ PASS — 0 external links in the HTML (only the Maps iframe is external) |
| 380 | Broken images | not measured before | none needed — verified | N/A — no images |
| 381 | Broken buttons | not measured before | none needed — verified | ✅ PASS — menu, skip link, dropdown and form buttons all tested |
| 382 | Broken forms | not measured before | none needed — verified | ✅ PASS — form validates, submits, double-click safe |
| 383 | Broken navigation | not measured before | none needed — verified | ✅ PASS — menu opens, closes on Escape, links navigate (360/390/430/768) |
| 384 | Broken dropdowns | FAIL — dropdown opened on hover only | Added :focus-within | ✅ PASS — desktop dropdown opens on hover AND keyboard focus |
| 385 | Incorrect phone links | not measured before | none needed — verified | ✅ PASS — every tel: link = tel:+19282679292 |
| 386 | Incorrect email links | not measured before | none needed — verified | ✅ PASS — every mailto: = info@waterdamagerestoration-arizona.com |
| 387 | Incorrect CTAs | not measured before | none needed — verified | ✅ PASS — tel: link on 54/54 (header) plus hero + sidebar CTAs |
| 388 | 404 pages | not measured before | none needed — verified | ✅ PASS — 54/54 return 200; unknown URLs return a real 404 |
| 389 | Console errors | not measured before | none needed — verified | ✅ PASS — 0 console errors / failed requests on 54 pages |

### PART 33 — NAVIGATION

| # | Checklist item | Status before | Action taken | Status after |
|---|---|---|---|---|
| 390 | Homepage accessible | — | none needed — verified | ✅ PASS — Home, Services, Service Areas, About, Blog, FAQ, Contact all in the header |
| 391 | Services menu | not measured before | none needed — verified | ✅ PASS — dropdown lists all 11 services |
| 392 | Service categories | not measured before | none needed — verified | N/A — services are a flat list of 11; there are no sub-categories to navigate |
| 393 | Individual services | not measured before | none needed — verified | ✅ PASS — dropdown lists all 11 services |
| 394 | Service areas | not measured before | none needed — verified | ✅ PASS — dropdown/footer reach all 23 communities + 3 counties |
| 395 | About | — | none needed — verified | ✅ PASS — Home, Services, Service Areas, About, Blog, FAQ, Contact all in the header |
| 396 | FAQ | — | none needed — verified | ✅ PASS — Home, Services, Service Areas, About, Blog, FAQ, Contact all in the header |
| 397 | Contact | — | none needed — verified | ✅ PASS — Home, Services, Service Areas, About, Blog, FAQ, Contact all in the header |
| 398 | Blog | — | none needed — verified | ✅ PASS — Home, Services, Service Areas, About, Blog, FAQ, Contact all in the header |
| 399 | Mobile menu | not measured before | none needed — verified | ✅ PASS — menu opens, closes on Escape, links navigate (360/390/430/768) |
| 400 | Dropdown functionality | not measured before | none needed — verified | ✅ PASS — desktop dropdown opens on hover AND keyboard focus |
| 401 | Logical hierarchy | not measured before | none needed — verified | ✅ PASS — Home → hubs (Services, Service Areas, Blog) → detail pages, with breadcrumbs |
| 402 | No dead-end navigation | not measured before | none needed — verified | ✅ PASS — every page links home and to contact; none is a dead end |

### PART 34 — FINAL CRAWL

| # | Checklist item | Status before | Action taken | Status after |
|---|---|---|---|---|
| 403 | Full crawl/audit after all fixes | not measured before | none needed — verified | ✅ PASS — final crawl of all 54 URLs on a freshly started server: all 200 |
| 404 | Every URL verified individually | not measured before | none needed — verified | ✅ PASS — checks above were evaluated for every URL individually, not sampled |
| 405 | No assumption that one fix covered all pages | not measured before | none needed — verified | ✅ PASS — checks above were evaluated for every URL individually, not sampled |


## Page-by-page SEO report

Word count = unique body copy of the page (service/area/blog pages) from the content file; title/meta in characters; links = anchors on the page (inbound links from other pages in brackets).

| Page | URL | Words | H1s | Title | Meta | Canonical | Schema | Internal links | Images | Technical | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Home | / | 788 (page text) | 1 | 56 ch | 148 ch | ✔ self | Org+Site+LocalBusiness | 104 (53 in) | 0 | OK | ✅ |
| Your Local Arizona Water Damage Restorat | /about | 614 (page text) | 1 | 56 ch | 149 ch | ✔ self | Org+Site+AboutPage+BreadcrumbList | 58 (53 in) | 0 | OK | ✅ |
| Get Your Free Arizona Water Damage Asses | /contact | 434 (page text) | 1 | 57 ch | 151 ch | ✔ self | Org+Site+ContactPage+FAQPage+BreadcrumbList | 53 (53 in) | 0 | OK | ✅ |
| Complete Water Damage Restoration Servic | /services | 310 (page text) | 1 | 58 ch | 139 ch | ✔ self | Org+Site+BreadcrumbList | 65 (53 in) | 0 | OK | ✅ |
| All 23 Arizona Communities We Serve | /service-areas | 205 (page text) | 1 | 58 ch | 134 ch | ✔ self | Org+Site+BreadcrumbList | 80 (53 in) | 0 | OK | ✅ |
| Arizona Water Damage Blog | /blog | 258 (page text) | 1 | 50 ch | 122 ch | ✔ self | Org+Site+BreadcrumbList | 60 (53 in) | 0 | OK | ✅ |
| Frequently Asked Questions About Water D | /faq | 1681 (page text) | 1 | 49 ch | 153 ch | ✔ self | Org+Site+FAQPage+BreadcrumbList | 80 (53 in) | 0 | OK | ✅ |
| Privacy Policy | /privacy-policy | 289 (page text) | 1 | 49 ch | 105 ch | ✔ self | Org+Site+BreadcrumbList | 46 (53 in) | 0 | OK | ✅ |
| Terms and Conditions | /terms | 145 (page text) | 1 | 55 ch | 84 ch | ✔ self | Org+Site+BreadcrumbList | 46 (53 in) | 0 | OK | ✅ |
| Emergency Water Damage in Arizona — Call | /services/emergency-water-damage-arizona | 1553 | 1 | 56 ch | 156 ch | ✔ self | Org+Site+Service+FAQPage+BreadcrumbList | 71 (53 in) | 0 | OK | ✅ |
| Monsoon Flood Damage Restoration in Ariz | /services/monsoon-flood-damage-arizona | 1447 | 1 | 45 ch | 158 ch | ✔ self | Org+Site+Service+FAQPage+BreadcrumbList | 66 (53 in) | 0 | OK | ✅ |
| Flood Cleanup in Arizona — 60-Minute Eme | /services/flood-cleanup-arizona | 2062 | 1 | 38 ch | 135 ch | ✔ self | Org+Site+Service+FAQPage+BreadcrumbList | 76 (53 in) | 0 | OK | ✅ |
| Water Removal in Arizona — Fast Standing | /services/water-removal-arizona | 1464 | 1 | 38 ch | 133 ch | ✔ self | Org+Site+Service+FAQPage+BreadcrumbList | 76 (53 in) | 0 | OK | ✅ |
| Structural Drying Dehumidification in Ar | /services/structural-drying-dehumidification-arizona | 1524 | 1 | 42 ch | 141 ch | ✔ self | Org+Site+Service+FAQPage+BreadcrumbList | 73 (53 in) | 0 | OK | ✅ |
| Burst Pipe Water Damage Restoration in A | /services/burst-pipe-water-damage-arizona | 1777 | 1 | 48 ch | 146 ch | ✔ self | Org+Site+Service+FAQPage+BreadcrumbList | 74 (53 in) | 0 | OK | ✅ |
| Ceiling Water Damage Restoration in Ariz | /services/ceiling-water-damage-arizona | 1547 | 1 | 45 ch | 132 ch | ✔ self | Org+Site+Service+FAQPage+BreadcrumbList | 71 (53 in) | 0 | OK | ✅ |
| Sewage Backup Cleanup in Arizona — Emerg | /services/sewage-backup-cleanup-arizona | 1779 | 1 | 46 ch | 159 ch | ✔ self | Org+Site+Service+FAQPage+BreadcrumbList | 70 (53 in) | 0 | OK | ✅ |
| Mold Remediation in Arizona — IICRC Cert | /services/mold-remediation-arizona | 1449 | 1 | 59 ch | 147 ch | ✔ self | Org+Site+Service+FAQPage+BreadcrumbList | 71 (53 in) | 0 | OK | ✅ |
| Commercial Water Damage Restoration in A | /services/commercial-water-damage-arizona | 1484 | 1 | 48 ch | 156 ch | ✔ self | Org+Site+Service+FAQPage+BreadcrumbList | 72 (53 in) | 0 | OK | ✅ |
| Water Damage Insurance Claims in Arizona | /services/water-damage-insurance-claim-arizona | 1459 | 1 | 54 ch | 153 ch | ✔ self | Org+Site+Service+FAQPage+BreadcrumbList | 68 (53 in) | 0 | OK | ✅ |
| Water Damage Restoration in Maricopa Cou | /service-areas/water-damage-maricopa-county-az | 1964 | 1 | 48 ch | 151 ch | ✔ self | Org+Site+Service+FAQPage+BreadcrumbList | 85 (53 in) | 0 | OK | ✅ |
| Water Damage Restoration in Pima County, | /service-areas/water-damage-pima-county-az | 1869 | 1 | 44 ch | 136 ch | ✔ self | Org+Site+Service+FAQPage+BreadcrumbList | 75 (53 in) | 0 | OK | ✅ |
| Water Damage Restoration in Pinal County | /service-areas/water-damage-pinal-county-az | 1521 | 1 | 45 ch | 152 ch | ✔ self | Org+Site+Service+FAQPage+BreadcrumbList | 82 (53 in) | 0 | OK | ✅ |
| Water Damage Restoration in Wickenburg A | /service-areas/water-damage-wickenburg-az | 1727 | 1 | 60 ch | 145 ch | ✔ self | Org+Site+Service+FAQPage+BreadcrumbList | 78 (53 in) | 0 | OK | ✅ |
| Water Damage Restoration in Vail, AZ — V | /service-areas/water-damage-vail-az | 1627 | 1 | 54 ch | 147 ch | ✔ self | Org+Site+Service+FAQPage+BreadcrumbList | 76 (5 in) | 0 | OK | ✅ |
| Water Damage Restoration in Green Valley | /service-areas/water-damage-green-valley-az | 1276 | 1 | 45 ch | 138 ch | ✔ self | Org+Site+Service+FAQPage+BreadcrumbList | 74 (5 in) | 0 | OK | ⚠️ <1,400 words |
| Water Damage Restoration in Sahuarita, A | /service-areas/water-damage-sahuarita-az | 1064 | 1 | 42 ch | 140 ch | ✔ self | Org+Site+Service+FAQPage+BreadcrumbList | 76 (5 in) | 0 | OK | ⚠️ <1,400 words |
| Water Damage Restoration in Cave Creek,  | /service-areas/water-damage-cave-creek-az | 1227 | 1 | 43 ch | 141 ch | ✔ self | Org+Site+Service+FAQPage+BreadcrumbList | 80 (8 in) | 0 | OK | ⚠️ <1,400 words |
| Water Damage Restoration in Sun City, AZ | /service-areas/water-damage-sun-city-az | 1224 | 1 | 41 ch | 139 ch | ✔ self | Org+Site+Service+FAQPage+BreadcrumbList | 77 (8 in) | 0 | OK | ⚠️ <1,400 words |
| Water Damage Restoration in Fountain Hil | /service-areas/water-damage-fountain-hills-az | 1170 | 1 | 47 ch | 145 ch | ✔ self | Org+Site+Service+FAQPage+BreadcrumbList | 78 (6 in) | 0 | OK | ⚠️ <1,400 words |
| Water Damage Restoration in Sun City Wes | /service-areas/water-damage-sun-city-west-az | 1273 | 1 | 46 ch | 144 ch | ✔ self | Org+Site+Service+FAQPage+BreadcrumbList | 79 (8 in) | 0 | OK | ⚠️ <1,400 words |
| Water Damage Restoration in Apache Junct | /service-areas/water-damage-apache-junction-az | 1158 | 1 | 48 ch | 146 ch | ✔ self | Org+Site+Service+FAQPage+BreadcrumbList | 76 (6 in) | 0 | OK | ⚠️ <1,400 words |
| Water Damage Restoration in Paradise Val | /service-areas/water-damage-paradise-valley-az | 1102 | 1 | 48 ch | 146 ch | ✔ self | Org+Site+Service+FAQPage+BreadcrumbList | 77 (6 in) | 0 | OK | ⚠️ <1,400 words |
| Water Damage Restoration in Litchfield P | /service-areas/water-damage-litchfield-park-az | 1120 | 1 | 48 ch | 146 ch | ✔ self | Org+Site+Service+FAQPage+BreadcrumbList | 78 (7 in) | 0 | OK | ⚠️ <1,400 words |
| Water Damage Restoration in Youngtown, A | /service-areas/water-damage-youngtown-az | 1183 | 1 | 42 ch | 140 ch | ✔ self | Org+Site+Service+FAQPage+BreadcrumbList | 78 (8 in) | 0 | OK | ⚠️ <1,400 words |
| Water Damage Restoration in New River, A | /service-areas/water-damage-new-river-az | 1178 | 1 | 42 ch | 140 ch | ✔ self | Org+Site+Service+FAQPage+BreadcrumbList | 81 (7 in) | 0 | OK | ⚠️ <1,400 words |
| Water Damage Restoration in Tolleson, AZ | /service-areas/water-damage-tolleson-az | 1074 | 1 | 41 ch | 139 ch | ✔ self | Org+Site+Service+FAQPage+BreadcrumbList | 76 (5 in) | 0 | OK | ⚠️ <1,400 words |
| Water Damage Restoration in El Mirage, A | /service-areas/water-damage-el-mirage-az | 1151 | 1 | 42 ch | 140 ch | ✔ self | Org+Site+Service+FAQPage+BreadcrumbList | 77 (8 in) | 0 | OK | ⚠️ <1,400 words |
| Water Damage Restoration in Florence, AZ | /service-areas/water-damage-florence-az | 1060 | 1 | 41 ch | 139 ch | ✔ self | Org+Site+Service+FAQPage+BreadcrumbList | 77 (7 in) | 0 | OK | ⚠️ <1,400 words |
| Water Damage Restoration in Gold Canyon, | /service-areas/water-damage-gold-canyon-az | 1097 | 1 | 44 ch | 142 ch | ✔ self | Org+Site+Service+FAQPage+BreadcrumbList | 76 (5 in) | 0 | OK | ⚠️ <1,400 words |
| Water Damage Restoration in Coolidge, AZ | /service-areas/water-damage-coolidge-az | 1081 | 1 | 41 ch | 139 ch | ✔ self | Org+Site+Service+FAQPage+BreadcrumbList | 77 (9 in) | 0 | OK | ⚠️ <1,400 words |
| Water Damage Restoration in Arizona City | /service-areas/water-damage-arizona-city-az | 1103 | 1 | 45 ch | 143 ch | ✔ self | Org+Site+Service+FAQPage+BreadcrumbList | 76 (6 in) | 0 | OK | ⚠️ <1,400 words |
| Water Damage Restoration in Eloy, AZ — 6 | /service-areas/water-damage-eloy-az | 1044 | 1 | 37 ch | 135 ch | ✔ self | Org+Site+Service+FAQPage+BreadcrumbList | 77 (7 in) | 0 | OK | ⚠️ <1,400 words |
| Water Damage Restoration in Valley Farms | /service-areas/water-damage-valley-farms-az | 1081 | 1 | 45 ch | 143 ch | ✔ self | Org+Site+Service+FAQPage+BreadcrumbList | 76 (6 in) | 0 | OK | ⚠️ <1,400 words |
| Water Damage Restoration in Wittmann, AZ | /service-areas/water-damage-wittmann-az | 1331 | 1 | 41 ch | 139 ch | ✔ self | Org+Site+Service+FAQPage+BreadcrumbList | 80 (6 in) | 0 | OK | ⚠️ <1,400 words |
| Water Damage Restoration in Carefree, AZ | /service-areas/water-damage-carefree-az | 1200 | 1 | 41 ch | 139 ch | ✔ self | Org+Site+Service+FAQPage+BreadcrumbList | 80 (7 in) | 0 | OK | ⚠️ <1,400 words |
| Arizona Monsoon Season Water Damage — Co | /blog/arizona-monsoon-water-damage-guide | 773 | 1 | 48 ch | 147 ch | ✔ self | Org+Site+BlogPosting+BreadcrumbList | 59 (9 in) | 0 | OK | ✅ |
| How Much Does Water Damage Restoration C | /blog/water-damage-restoration-cost-arizona | 716 | 1 | 45 ch | 152 ch | ✔ self | Org+Site+BlogPosting+FAQPage+BreadcrumbList | 58 (11 in) | 0 | OK | ✅ |
| Does Homeowners Insurance Cover Water Da | /blog/homeowners-insurance-water-damage-arizona | 780 | 1 | 56 ch | 132 ch | ✔ self | Org+Site+BlogPosting+FAQPage+BreadcrumbList | 58 (5 in) | 0 | OK | ✅ |
| How Long Does Water Damage Restoration T | /blog/how-long-does-water-damage-restoration-take-arizona | 921 | 1 | 50 ch | 142 ch | ✔ self | Org+Site+BlogPosting+FAQPage+BreadcrumbList | 60 (9 in) | 0 | OK | ✅ |
| Mold After Water Damage in Arizona — Wha | /blog/mold-after-water-damage-arizona | 1090 | 1 | 34 ch | 156 ch | ✔ self | Org+Site+BlogPosting+FAQPage+BreadcrumbList | 58 (6 in) | 0 | OK | ✅ |
| Arizona Flash Flood Warning — How to Pro | /blog/arizona-flash-flood-warning-protect-your-home | 1003 | 1 | 53 ch | 148 ch | ✔ self | Org+Site+BlogPosting+FAQPage+BreadcrumbList | 61 (6 in) | 0 | OK | ✅ |
| Signs of Water Damage in Arizona Desert  | /blog/signs-of-water-damage-arizona-desert-homes | 939 | 1 | 45 ch | 158 ch | ✔ self | Org+Site+BlogPosting+FAQPage+BreadcrumbList | 58 (8 in) | 0 | OK | ✅ |
| Hassayampa River Flooding — A Wickenburg | /blog/hassayampa-river-flooding-wickenburg-preparedness-guide | 947 | 1 | 59 ch | 143 ch | ✔ self | Org+Site+BlogPosting+FAQPage+BreadcrumbList | 59 (4 in) | 0 | OK | ✅ |

## Search-intent map (Part 7)

| URL | Primary search intent | Primary keyword (derived) | First H2 topics |
|---|---|---|---|
| / | Navigational + commercial — the business and its services | water damage  | Complete Water Damage Restoration Acro; What Happens When You Call; Your Local Arizona Water Damage Restor |
| /about | Navigational / trust / support | water damage about | About Arizona Water Damage Restoration; Our Arizona Expertise; Our Certifications |
| /contact | Navigational / trust / support | water damage contact | Request Your Free Assessment; Our Full Arizona Service Area; Find Us |
| /services | Navigational / trust / support | water damage services | Our Services; Services; Service Areas |
| /service-areas | Navigational / trust / support | water damage service areas | Service Areas by County; Services; Service Areas |
| /blog | Navigational / trust / support | water damage blog | Latest Articles; Services; Service Areas |
| /faq | Navigational / trust / support | water damage faq | Emergency Water Damage; Water Removal; Water Damage Restoration |
| /privacy-policy | Navigational / trust / support | water damage privacy policy | Information We Collect; How We Use Information; Who Receives It |
| /terms | Navigational / trust / support | water damage terms | Using This Website; Requesting Service; Emergencies |
| /services/emergency-water-damage-arizona | Commercial/emergency — hire a restoration service for this problem | emergency water damage | The Arizona Water Damage Timeline — Wh; Our 4-Step Emergency Response; Emergency Coverage — All 23 Arizona Co |
| /services/monsoon-flood-damage-arizona | Commercial/emergency — hire a restoration service for this problem | monsoon flood | Monsoon Flood Risk in All 23 Arizona C; What to Do Right Away After Monsoon Fl; Roof Leaks, Standing Water, and Hidden |
| /services/flood-cleanup-arizona | Commercial/emergency — hire a restoration service for this problem | flood cleanup | Flood Damage Is Not the Same as a Plum; What Is Usually Saved and What Is Usua; The Cleanup Sequence |
| /services/water-removal-arizona | Commercial/emergency — hire a restoration service for this problem | water removal | What Water Removal Means; How Water Is Extracted; Deciding What Stays and What Goes |
| /services/structural-drying-dehumidification-arizona | Commercial/emergency — hire a restoration service for this problem | structural drying | Removing the Water Isn't the Same as D; What Structural Drying Actually Involv; Why Arizona's Climate Changes the Dryi |
| /services/burst-pipe-water-damage-arizona | Commercial/emergency — hire a restoration service for this problem | burst pipe | Why Pipes Fail in Arizona Homes; Signs of a Leak You Cannot See; What to Do in the First Few Minutes |
| /services/ceiling-water-damage-arizona | Commercial/emergency — hire a restoration service for this problem | ceiling water damage | A Water Stain on Your Ceiling Is a Sym; What Causes Ceiling Water Damage in Ar; Our Ceiling Water Damage Process |
| /services/sewage-backup-cleanup-arizona | Commercial/emergency — hire a restoration service for this problem | sewage backup | Sewage Backup Is a Health Emergency, N; What Causes Sewage Backups in Arizona ; Our Sewage Backup Cleanup Process |
| /services/mold-remediation-arizona | Commercial/emergency — hire a restoration service for this problem | mold remediation | Mold Remediation in Arizona — Act Fast; Why Arizona Heat Accelerates Mold Grow; Warning Signs of Mold in Your Arizona  |
| /services/commercial-water-damage-arizona | Commercial/emergency — hire a restoration service for this problem | commercial water damage | Every Hour a Business Is Closed Costs ; Types of Commercial Properties We Serv; What Makes Commercial Water Damage Dif |
| /services/water-damage-insurance-claim-arizona | Commercial/emergency — hire a restoration service for this problem | insurance claim | Filing an Insurance Claim During a Wat; Common Claim Mistakes to Avoid; Does Homeowners Insurance Cover Water  |
| /service-areas/water-damage-maricopa-county-az | Local commercial hub — coverage across a county | water damage maricopa county | Wickenburg — Our Maricopa County Home ; Maricopa County Neighborhoods and Area; Emergency Water Extraction & Flood Cle |
| /service-areas/water-damage-pima-county-az | Local commercial hub — coverage across a county | water damage pima county | Vail — Rincon Valley Hillside Terrain; Pima County Neighborhoods and Areas We; Emergency Water Extraction & Flood Cle |
| /service-areas/water-damage-pinal-county-az | Local commercial hub — coverage across a county | water damage pinal county | How We Help Homeowners in Pinal County; Why Pinal County Homes and Businesses ; Pinal County Communities We Serve |
| /service-areas/water-damage-wickenburg-az | Local commercial — find water damage restoration in this community | water damage wickenburg | Why Wickenburg AZ Homes Face Unique Wa; All Wickenburg Neighborhoods We Serve ; Our Wickenburg AZ Water Damage Service |
| /service-areas/water-damage-vail-az | Local commercial — find water damage restoration in this community | water damage vail | Vail AZ Neighborhoods and Areas We Ser; Vail AZ Water Damage Services — All in; Emergency Water Extraction — 60 Minute |
| /service-areas/water-damage-green-valley-az | Local commercial — find water damage restoration in this community | water damage green valley | Why Green Valley AZ Homeowners Need Fa; Green Valley Water Damage Services — S; Green Valley AZ Insurance Coverage — U |
| /service-areas/water-damage-sahuarita-az | Local commercial — find water damage restoration in this community | water damage sahuarita | New-Home Plumbing Risks in Sahuarita; Water Damage Services for Sahuarita Ho; Sahuarita's Newer Neighborhoods and Wa |
| /service-areas/water-damage-cave-creek-az | Local commercial — find water damage restoration in this community | water damage cave creek | Wash, Storm and Plumbing Risks in Cave; Water Damage Services for Cave Creek H; Foothill Living and Water in Cave Cree |
| /service-areas/water-damage-sun-city-az | Local commercial — find water damage restoration in this community | water damage sun city | Supporting Sun City Residents and Fami; Aging-System Water Risks in Sun City; Water Damage Services for Sun City Hom |
| /service-areas/water-damage-fountain-hills-az | Local commercial — find water damage restoration in this community | water damage fountain hills | Mountainside Water Risks in Fountain H; Water Damage Services for Fountain Hil; Retaining Walls and Views: Fountain Hi |
| /service-areas/water-damage-sun-city-west-az | Local commercial — find water damage restoration in this community | water damage sun city west | Common Water Risks in Sun City West; Water Damage Services for Sun City Wes; Sun City West Systems at Mid-Life |
| /service-areas/water-damage-apache-junction-az | Local commercial — find water damage restoration in this community | water damage apache junction | Wash and Manufactured-Home Risks in Ap; Water Damage Services for Apache Junct; Living Below the Superstitions: Water  |
| /service-areas/water-damage-paradise-valley-az | Local commercial — find water damage restoration in this community | water damage paradise valley | Large-Home Water Risks in Paradise Val; Water Damage Services for Paradise Val; Finishes, Pools and Privacy in Paradis |
| /service-areas/water-damage-litchfield-park-az | Local commercial — find water damage restoration in this community | water damage litchfield park | Tree-Root and Pipe Risks in Litchfield; Water Damage Services for Litchfield P; Mature Streets and Aging Lines in Litc |
| /service-areas/water-damage-youngtown-az | Local commercial — find water damage restoration in this community | water damage youngtown | Older-Home Water Risks in Youngtown; Water Damage Services for Youngtown's ; Youngtown's Original Plumbing and Roof |
| /service-areas/water-damage-new-river-az | Local commercial — find water damage restoration in this community | water damage new river | Freeze, Wash and Storm Risks in New Ri; Water Damage Services for New River Ho; High-Desert Conditions Around New Rive |
| /service-areas/water-damage-tolleson-az | Local commercial — find water damage restoration in this community | water damage tolleson | Help for Tolleson Residents and Busine; Irrigation and Plumbing Risks in Tolle; Water Damage Services for Tolleson Hom |
| /service-areas/water-damage-el-mirage-az | Local commercial — find water damage restoration in this community | water damage el mirage | Flat-Ground Storm Risks in El Mirage; Water Damage Services for El Mirage Ho; Housing Mix and Drainage in El Mirage |
| /service-areas/water-damage-florence-az | Local commercial — find water damage restoration in this community | water damage florence | Help in Florence; Historic and New-Home Risks in Florenc; Water Damage Services for Florence Hom |
| /service-areas/water-damage-gold-canyon-az | Local commercial — find water damage restoration in this community | water damage gold canyon | Foothill Runoff Risks in Gold Canyon; Water Damage Services for Gold Canyon ; Golf-Community Living and Water in Gol |
| /service-areas/water-damage-coolidge-az | Local commercial — find water damage restoration in this community | water damage coolidge | Help in Coolidge; Canal and Flat-Ground Risks in Coolidg; Water Damage Services for Coolidge Hom |
| /service-areas/water-damage-arizona-city-az | Local commercial — find water damage restoration in this community | water damage arizona city | Standing-Water Risks in Arizona City; Water Damage Services for Arizona City; Block and Manufactured Homes in Arizon |
| /service-areas/water-damage-eloy-az | Local commercial — find water damage restoration in this community | water damage eloy | Help in Eloy; Farm-Country Water Risks in Eloy; Water Damage Services for Eloy Homes,  |
| /service-areas/water-damage-valley-farms-az | Local commercial — find water damage restoration in this community | water damage valley farms | Well, Septic and Ditch Risks in Valley; Water Damage Services for Valley Farms; Rural Valley Farms and Water Damage |
| /service-areas/water-damage-wittmann-az | Local commercial — find water damage restoration in this community | water damage wittmann | Reaching Wittmann Properties Quickly; Water Risks on Rural Wittmann Properti; Water Damage Services for Wittmann Hom |
| /service-areas/water-damage-carefree-az | Local commercial — find water damage restoration in this community | water damage carefree | Caring for Carefree Homes After a Loss; Hillside Runoff and Roof Risks in Care; Water Damage Services for Carefree's C |
| /blog/arizona-monsoon-water-damage-guide | Informational — understand the problem / cost / insurance before calling | water damage arizona monsoon water damage guide | Understanding Arizona's Monsoon — Why ; How Arizona Monsoons Cause Water Damag; Highest Monsoon Flood Risk in Our Ariz |
| /blog/water-damage-restoration-cost-arizona | Informational — understand the problem / cost / insurance before calling | water damage restoration cost arizona | The Short Answer on Cost; Average Water Damage Restoration Costs; What Drives Water Damage Costs Higher  |
| /blog/homeowners-insurance-water-damage-arizona | Informational — understand the problem / cost / insurance before calling | water damage homeowners insurance water damage arizona | Does Arizona Homeowners Insurance Cove; What Standard Arizona Homeowners Insur; What Standard Arizona Homeowners Insur |
| /blog/how-long-does-water-damage-restoration-take-arizona | Informational — understand the problem / cost / insurance before calling | water damage how long does water damage restoration take arizona | Short Answer; Day 0: Emergency Response and Extracti; Days 1–5: Structural Drying |
| /blog/mold-after-water-damage-arizona | Informational — understand the problem / cost / insurance before calling | water damage mold after water damage arizona | Why Arizona's Climate Makes Post-Flood; How Fast Does Mold Actually Grow?; Warning Signs of Mold After a Water Ev |
| /blog/arizona-flash-flood-warning-protect-your-home | Informational — understand the problem / cost / insurance before calling | water damage arizona flash flood warning protect your home | Why Flash Floods Are Different in Ariz; Before a Flash Flood Warning Is Issued; During an Active Flash Flood Warning |
| /blog/signs-of-water-damage-arizona-desert-homes | Informational — understand the problem / cost / insurance before calling | water damage signs of water damage arizona desert homes | Why Arizona Water Damage Often Goes Un; Signs of a Slab Leak; Signs of a Hidden Roof Leak |
| /blog/hassayampa-river-flooding-wickenburg-preparedness-guide | Informational — understand the problem / cost / insurance before calling | water damage hassayampa river flooding wickenburg preparedness guide | Why the Hassayampa River Corridor Matt; Understanding Your Property's Specific; Before Monsoon Season: Preparation Che |

## Final summary

1. **Total pages audited:** 54 indexable URLs (+ the 404 template)
2. **Issue classes found (before-state recorded):** 26; **instances:** several hundred (e.g. 53 over-long titles, 54 pages without social image, 15 repeated-H1 headings, 53+ failing-contrast labels, 26 duplicate LocalBusiness entities, ~30 pages with leaked internal notes)
3. **Issue classes fixed:** 25 of 26; **still open:** 1 (city word count) — plus the items under “Remaining” that need you or the live site
4. **Pages expanded:** 36 (11 services, 22 cities, 3 blog posts) — about 17,918 words of new copy
5. **Pages below 1,400 words:** 21 of 23 city pages (range 1044–1727, median 1158). Services 11/11 and counties 3/3 pass. Blog posts (716–1,090) are not "substantial service/location pages".
6. **Canonical issues fixed:** 1 (home vs sitemap)
7. **Schema issues fixed:** 26 area pages (duplicate LocalBusiness → Service), home LocalBusiness enriched, Organization logo, BlogPosting upgrade on 8 posts, AboutPage added, FAQ schema rebuilt from visible Q&As
8. **Internal-linking issues fixed:** 8 blog posts had no inbound links from services/areas → 28 contextual links added; related-article links between posts; FAQ answers now link to services
9. **Image issues fixed:** the site has no <img> elements; added a generated 1200×630 share card and favicon.ico
10. **Technical SEO issues fixed:** titles, metas, fake sitemap lastmod, favicon 404, OG/Twitter completeness, #1-Rated claim, heading hygiene, 404 metadata
11. **Mobile issues fixed:** none found by the 270-load responsive matrix; dropdown keyboard access fixed
12. **Performance issues fixed:** none needed (lab LCP ≤ 188 ms, CLS 0; ~102 kB shared JS, no third-party scripts)
13. **Accessibility issues fixed:** contrast (53+ labels), skip link/<main>, reduced motion, keyboard dropdown, article landmark
14. **AEO improvements:** FAQ questions as H3 under an FAQ H2, FAQ schema parity, definitions + step lists on service pages, direct-answer FAQs
15. **GEO improvements:** unique location headings, local terrain/housing sections on all 23 communities, clearer who/what/where
16. **LLMO improvements:** explicit service→cause→solution→location relationships; removed the unsupported "AI recommends us" claims (26 mentions on 4 pages)
17. **Remaining issues requiring external verification:** see below

## Remaining — needs you or the live site

- **Verify or remove these claims** (cannot be checked from code): IICRC (35 pages), BBB (4 pages), licensed (7 pages), bonded (2 pages), USAA preferred (4 pages), veteran-owned (5 pages), Yelp (1 pages).
- **City pages under 1,400 words** (21): the new sections are unique and locally grounded, but going further needs real local facts from you (landmarks, common jobs, typical housing) — padding would hurt more than help.
- **INP and real-user Core Web Vitals:** check in PageSpeed Insights / Search Console after launch.
- **Live HTTPS/HSTS, www→apex redirect, DNS, sitemap submission** in Search Console, Google Business Profile.
- **Address eligibility** for Google Business Profile (mailbox/virtual addresses are not accepted as a storefront).
- **Blog author names, publish dates and featured photos** — not invented.
- **Email delivery** (Resend keys + verified sender domain) — the form is tested against a mock only.
