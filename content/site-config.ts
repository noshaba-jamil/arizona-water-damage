export const SITE = {
  name: "Arizona Water Damage Restoration",
  tagline: "Restoration & Recovery",
  url: "https://waterdamagerestoration-arizona.com",
  phone: "(928) 267-9292",
  phoneHref: "tel:+19282679292",
  email: "info@waterdamagerestoration-arizona.com",
  address: {
    street: "340 W Wickenburg Way",
    city: "Wickenburg",
    state: "AZ",
    zip: "85390",
    full: "340 W Wickenburg Way, Wickenburg, AZ 85390",
  },
  defaultTitle: "Arizona Water Damage Restoration | 24/7 | (928) 267-9292",
  defaultDescription:
    "Water damage in Arizona? IICRC-certified local team serving 23 communities. Monsoon flood cleanup, mold removal, all insurance. Call (928) 267-9292.",
} as const;

export const COUNTIES = [
  {
    name: "Maricopa County",
    hubSlug: "water-damage-maricopa-county-az",
    cities: [
      { name: "Wickenburg — Primary HQ", slug: "water-damage-wickenburg-az" },
      { name: "Wittmann", slug: "water-damage-wittmann-az" },
      { name: "New River", slug: "water-damage-new-river-az" },
      { name: "Cave Creek", slug: "water-damage-cave-creek-az" },
      { name: "Carefree", slug: "water-damage-carefree-az" },
      { name: "Fountain Hills", slug: "water-damage-fountain-hills-az" },
      { name: "Paradise Valley", slug: "water-damage-paradise-valley-az" },
      { name: "Sun City", slug: "water-damage-sun-city-az" },
      { name: "Sun City West", slug: "water-damage-sun-city-west-az" },
      { name: "Youngtown", slug: "water-damage-youngtown-az" },
      { name: "El Mirage", slug: "water-damage-el-mirage-az" },
      { name: "Litchfield Park", slug: "water-damage-litchfield-park-az" },
      { name: "Tolleson", slug: "water-damage-tolleson-az" },
    ],
  },
  {
    name: "Pima County",
    hubSlug: "water-damage-pima-county-az",
    cities: [
      { name: "Vail", slug: "water-damage-vail-az" },
      { name: "Green Valley", slug: "water-damage-green-valley-az" },
      { name: "Sahuarita", slug: "water-damage-sahuarita-az" },
    ],
  },
  {
    name: "Pinal County",
    hubSlug: "water-damage-pinal-county-az",
    cities: [
      { name: "Apache Junction", slug: "water-damage-apache-junction-az" },
      { name: "Florence", slug: "water-damage-florence-az" },
      { name: "Gold Canyon", slug: "water-damage-gold-canyon-az" },
      { name: "Coolidge", slug: "water-damage-coolidge-az" },
      { name: "Arizona City", slug: "water-damage-arizona-city-az" },
      { name: "Eloy", slug: "water-damage-eloy-az" },
      { name: "Valley Farms", slug: "water-damage-valley-farms-az" },
    ],
  },
] as const;

export const SERVICES = [
  {
    name: "Emergency Water Damage Arizona",
    slug: "emergency-water-damage-arizona",
    desc: "60-minute emergency dispatch statewide for any water damage event.",
  },
  {
    name: "Monsoon Flood Damage Arizona",
    slug: "monsoon-flood-damage-arizona",
    desc: "Season-specific response for Arizona's July–September monsoon flooding.",
  },
  {
    name: "Flood Cleanup Arizona",
    slug: "flood-cleanup-arizona",
    desc: "Full extraction, drying, and sanitizing for any flood source.",
  },
  {
    name: "Water Removal Arizona",
    slug: "water-removal-arizona",
    desc: "Fast standing-water extraction — truck-mounted and portable equipment.",
  },
  {
    name: "Structural Drying & Dehumidification",
    slug: "structural-drying-dehumidification-arizona",
    desc: "IICRC S500 standard drying with daily moisture monitoring.",
  },
  {
    name: "Burst Pipe Water Damage Arizona",
    slug: "burst-pipe-water-damage-arizona",
    desc: "Arizona's most common sudden water damage source — slab leaks included.",
  },
  {
    name: "Ceiling Water Damage Arizona",
    slug: "ceiling-water-damage-arizona",
    desc: "Leak source detection through full ceiling repair.",
  },
  {
    name: "Sewage Backup Cleanup Arizona",
    slug: "sewage-backup-cleanup-arizona",
    desc: "Category 3 black water specialists — full PPE and sanitization protocol.",
  },
  {
    name: "Mold Remediation Arizona",
    slug: "mold-remediation-arizona",
    desc: "IICRC AMRT certified mold remediation, urgent given Arizona's heat.",
  },
  {
    name: "Commercial Water Damage Arizona",
    slug: "commercial-water-damage-arizona",
    desc: "24/7 dispatch for offices, retail, multi-family, and industrial properties.",
  },
  {
    name: "Water Damage Insurance Claim Arizona",
    slug: "water-damage-insurance-claim-arizona",
    desc: "We document everything and work directly with your Arizona carrier.",
  },
] as const;

export const BLOG_POSTS = [
  { name: "Arizona Monsoon Water Damage Guide", slug: "arizona-monsoon-water-damage-guide", desc: "Everything Arizona homeowners need to know before and during monsoon season." },
  { name: "Water Damage Restoration Cost in Arizona", slug: "water-damage-restoration-cost-arizona", desc: "What actually drives cost, and realistic price ranges by damage type." },
  { name: "Does Homeowners Insurance Cover Water Damage in Arizona?", slug: "homeowners-insurance-water-damage-arizona", desc: "A plain-language breakdown of what's covered and what isn't." },
  { name: "How Long Does Water Damage Restoration Take in AZ?", slug: "how-long-does-water-damage-restoration-take-arizona", desc: "A realistic day-by-day timeline from extraction through full repair." },
  { name: "Mold After Water Damage in Arizona", slug: "mold-after-water-damage-arizona", desc: "Why Arizona's heat speeds up mold growth, and the warning signs to watch." },
  { name: "Arizona Flash Flood Warning — Protect Your Home", slug: "arizona-flash-flood-warning-protect-your-home", desc: "Before, during, and after guidance for an active flash flood warning." },
  { name: "Signs of Water Damage in Arizona Desert Homes", slug: "signs-of-water-damage-arizona-desert-homes", desc: "The subtle warning signs desert homeowners often miss." },
  { name: "Hassayampa River Flooding — Wickenburg AZ Preparedness Guide", slug: "hassayampa-river-flooding-wickenburg-preparedness-guide", desc: "A Wickenburg-specific guide to river corridor flood risk." },
] as const;
