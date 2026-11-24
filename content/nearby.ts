import { COUNTIES } from "./site-config";

// Nearby-community lists for the "Areas We Also Serve" section. Ordered roughly by proximity, 3-4 each,
// so every link is one a customer in that city would plausibly care about. No distances are stated.
// Values are service-area page slugs; a build-time check below throws if any slug has no matching page.
export const NEARBY: Record<string, string[]> = {
  // Maricopa County
  "water-damage-wickenburg-az": ["water-damage-wittmann-az", "water-damage-new-river-az", "water-damage-sun-city-west-az", "water-damage-cave-creek-az"],
  "water-damage-wittmann-az": ["water-damage-wickenburg-az", "water-damage-sun-city-west-az", "water-damage-sun-city-az", "water-damage-new-river-az"],
  "water-damage-new-river-az": ["water-damage-cave-creek-az", "water-damage-carefree-az", "water-damage-wittmann-az", "water-damage-sun-city-west-az"],
  "water-damage-cave-creek-az": ["water-damage-carefree-az", "water-damage-new-river-az", "water-damage-fountain-hills-az", "water-damage-paradise-valley-az"],
  "water-damage-carefree-az": ["water-damage-cave-creek-az", "water-damage-fountain-hills-az", "water-damage-paradise-valley-az", "water-damage-new-river-az"],
  "water-damage-fountain-hills-az": ["water-damage-paradise-valley-az", "water-damage-carefree-az", "water-damage-cave-creek-az", "water-damage-apache-junction-az"],
  "water-damage-paradise-valley-az": ["water-damage-carefree-az", "water-damage-fountain-hills-az", "water-damage-cave-creek-az"],
  "water-damage-sun-city-az": ["water-damage-sun-city-west-az", "water-damage-youngtown-az", "water-damage-el-mirage-az", "water-damage-litchfield-park-az"],
  "water-damage-sun-city-west-az": ["water-damage-sun-city-az", "water-damage-el-mirage-az", "water-damage-youngtown-az", "water-damage-wittmann-az"],
  "water-damage-youngtown-az": ["water-damage-sun-city-az", "water-damage-el-mirage-az", "water-damage-sun-city-west-az", "water-damage-litchfield-park-az"],
  "water-damage-el-mirage-az": ["water-damage-youngtown-az", "water-damage-sun-city-az", "water-damage-litchfield-park-az", "water-damage-tolleson-az"],
  "water-damage-litchfield-park-az": ["water-damage-tolleson-az", "water-damage-el-mirage-az", "water-damage-youngtown-az", "water-damage-sun-city-az"],
  "water-damage-tolleson-az": ["water-damage-litchfield-park-az", "water-damage-el-mirage-az", "water-damage-youngtown-az"],
  // Pima County
  "water-damage-vail-az": ["water-damage-sahuarita-az", "water-damage-green-valley-az"],
  "water-damage-sahuarita-az": ["water-damage-green-valley-az", "water-damage-vail-az"],
  "water-damage-green-valley-az": ["water-damage-sahuarita-az", "water-damage-vail-az"],
  // Pinal County
  "water-damage-apache-junction-az": ["water-damage-gold-canyon-az", "water-damage-florence-az", "water-damage-coolidge-az"],
  "water-damage-gold-canyon-az": ["water-damage-apache-junction-az", "water-damage-florence-az", "water-damage-coolidge-az"],
  "water-damage-florence-az": ["water-damage-coolidge-az", "water-damage-gold-canyon-az", "water-damage-apache-junction-az", "water-damage-eloy-az"],
  "water-damage-coolidge-az": ["water-damage-florence-az", "water-damage-eloy-az", "water-damage-valley-farms-az", "water-damage-arizona-city-az"],
  "water-damage-arizona-city-az": ["water-damage-eloy-az", "water-damage-valley-farms-az", "water-damage-coolidge-az"],
  "water-damage-eloy-az": ["water-damage-arizona-city-az", "water-damage-valley-farms-az", "water-damage-coolidge-az", "water-damage-florence-az"],
  "water-damage-valley-farms-az": ["water-damage-eloy-az", "water-damage-arizona-city-az", "water-damage-coolidge-az"],
  // County hubs: the other counties we serve
  "water-damage-maricopa-county-az": ["water-damage-pima-county-az", "water-damage-pinal-county-az"],
  "water-damage-pima-county-az": ["water-damage-maricopa-county-az", "water-damage-pinal-county-az"],
  "water-damage-pinal-county-az": ["water-damage-maricopa-county-az", "water-damage-pima-county-az"],
};

export type AreaInfo = { slug: string; name: string; county: string; countyHubSlug: string; isHub: boolean; communityCount?: number };

export const AREA_INDEX: Record<string, AreaInfo> = {};
for (const c of COUNTIES) {
  AREA_INDEX[c.hubSlug] = { slug: c.hubSlug, name: c.name, county: c.name, countyHubSlug: c.hubSlug, isHub: true, communityCount: c.cities.length };
  for (const city of c.cities) {
    AREA_INDEX[city.slug] = { slug: city.slug, name: city.name.replace(" — Primary HQ", ""), county: c.name, countyHubSlug: c.hubSlug, isHub: false };
  }
}

// Build-time safety net: fail the build rather than ship a broken link.
for (const [slug, list] of Object.entries(NEARBY)) {
  if (!AREA_INDEX[slug]) throw new Error(`NEARBY: unknown source page "${slug}"`);
  for (const t of list) {
    if (!AREA_INDEX[t]) throw new Error(`NEARBY: "${slug}" links to "${t}", which is not a service-area page`);
    if (t === slug) throw new Error(`NEARBY: "${slug}" links to itself`);
  }
}
for (const slug of Object.keys(AREA_INDEX)) {
  if (!NEARBY[slug]) throw new Error(`NEARBY: no entry for service-area page "${slug}"`);
}
