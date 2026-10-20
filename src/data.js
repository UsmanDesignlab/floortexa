export const phone = "01708 837178";
export const phoneHref = "tel:01708837178";
export const email = "hello@floortex.co.uk";
export const address = "Serving homes & businesses across Essex & Greater London";

export const images = {
  hero: "/assets/floortex-hero.png",
  stairs: "/assets/floortex-stairs.png",
  vinyl: "/assets/floortex-vinyl.png",
  wood: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
  laminate: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
  carpet: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85",
  commercial: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=85",
  gallery1: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
  gallery2: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85",
  gallery3: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
  gallery4: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=85",
  gallery5: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
  gallery6: "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1200&q=85",
};

export const services = [
  {
    slug: "carpet-fitting",
    name: "Carpet Fitting",
    short: "Supply & expert fitting for homes, stairs and landings.",
    copy: "From soft bedroom carpets to hardwearing hall runners, we supply and fit with tidy preparation, door trimming and careful furniture handling.",
    image: images.carpet,
    includes: ["Free measure & estimate", "Uplift & disposal", "Door trimming", "Warranty on workmanship"],
  },
  {
    slug: "stair-runners",
    name: "Bespoke Stair Runners",
    short: "Custom runners and borders that make every step feel finished.",
    copy: "We create stair runners from a wide carpet range with bespoke borders, neat edges and a finish that elevates your hallway.",
    image: images.stairs,
    includes: ["Custom borders", "Sample at home", "Precise install", "Matching thresholds"],
  },
  {
    slug: "lvt-vinyl",
    name: "LVT & Vinyl Flooring",
    short: "Waterproof, practical luxury vinyl for kitchens, baths and busy homes.",
    copy: "Luxury vinyl tile and sheet vinyl built for real life — waterproof options, wood and stone looks, and commercial-grade durability.",
    image: images.vinyl,
    includes: ["Waterproof options", "Wood & stone looks", "Kitchen & bath ready", "Commercial grades"],
  },
  {
    slug: "laminate",
    name: "Laminate Flooring",
    short: "Smooth, durable laminate with a premium finish for everyday living.",
    copy: "Specialist laminate installs with proper underlay, expansion gaps and a clean surface finish that makes rooms feel sharper.",
    image: images.laminate,
    includes: ["Quality underlay", "Clean finish", "Wide plank options", "Family-friendly"],
  },
  {
    slug: "engineered-wood",
    name: "Engineered Wood",
    short: "Real wood warmth with modern stability for open-plan living.",
    copy: "Engineered oak and timber floors that bring natural grain character while staying practical for UK homes.",
    image: images.wood,
    includes: ["Natural grain", "Stable boards", "Oil & lacquer finishes", "Stair matching"],
  },
  {
    slug: "commercial",
    name: "Commercial & Safety Flooring",
    short: "Carpet tiles, anti-slip vinyl and durable floors for business spaces.",
    copy: "Offices, communal halls, retail and healthcare — safety flooring, commercial vinyl and carpet tiles installed to last.",
    image: images.commercial,
    includes: ["Anti-slip vinyl", "Carpet tiles", "Communal areas", "Public liability cover"],
  },
];

export const whyUs = [
  { title: "Free measurements & estimates", detail: "Clear advice across Essex with no obligation." },
  { title: "Uplift & removal", detail: "Old flooring taken up and disposed of carefully." },
  { title: "Furniture handling", detail: "Rooms prepared so the install stays tidy and calm." },
  { title: "Always on time", detail: "Agreed slots, clear communication, tidy finish." },
  { title: "Warranty on work", detail: "Products and workmanship backed with confidence." },
  { title: "Beat written quotes", detail: "Quality finish first — competitive when compared like for like." },
];

export const reviews = [
  {
    title: "Carpet in sons room",
    quote: "Brilliant service, lovely quality carpet fitted on time. Friendly, polite and very tidy. Highly recommended.",
    date: "March 2023",
  },
  {
    title: "Hallway refresh",
    quote: "Very professional with excellent workmanship. The whole process felt considered from measure to final fit.",
    date: "March 2023",
  },
  {
    title: "Herringbone carpet",
    quote: "Fantastic. Agreed install time was met and any delays were communicated ahead. We love the carpet.",
    date: "March 2023",
  },
];

export const pricing = [
  {
    name: "Carpet supply & fit",
    from: "From £18 / m²",
    note: "Depends on range, underlay and room shape",
    points: ["Measure visit", "Underlay options", "Door trim included"],
  },
  {
    name: "LVT / vinyl",
    from: "From £28 / m²",
    note: "Includes standard preparation guidance",
    points: ["Waterproof ranges", "Plank & tile formats", "Kitchen & bath suitable"],
  },
  {
    name: "Laminate",
    from: "From £22 / m²",
    note: "Quality boards with underlay",
    points: ["Click systems", "Acoustic underlay", "Smooth finish"],
  },
  {
    name: "Engineered wood",
    from: "From £45 / m²",
    note: "Premium timber character",
    points: ["Wide plank options", "Oil / lacquer", "Stair packages"],
  },
];

export const gallery = [
  { image: images.gallery1, label: "Living room oak", tag: "Wood" },
  { image: images.stairs, label: "Stair runner", tag: "Carpet" },
  { image: images.vinyl, label: "Kitchen LVT", tag: "Vinyl" },
  { image: images.gallery2, label: "Stone-look porcelain vibe", tag: "LVT" },
  { image: images.gallery3, label: "Herringbone feature", tag: "Wood" },
  { image: images.gallery4, label: "Open-plan install", tag: "Laminate" },
  { image: images.gallery5, label: "Calm bedroom carpet", tag: "Carpet" },
  { image: images.gallery6, label: "Commercial lobby", tag: "Commercial" },
  { image: images.laminate, label: "Light laminate lounge", tag: "Laminate" },
];

export const areas = [
  "Hornchurch",
  "Romford",
  "Upminster",
  "Rainham",
  "Barking",
  "Dagenham",
  "Ilford",
  "Brentwood",
  "Basildon",
  "Chelmsford",
  "Southend",
  "Greater London (selected)",
];

export const repairsFaqs = [
  {
    q: "Can you repair stretched or loose carpet?",
    a: "Yes. We re-stretch, re-fix and patch worn areas where the carpet still has life — often far more cost-effective than a full replace.",
  },
  {
    q: "Do you repair stair runners?",
    a: "We re-secure runners, replace damaged sections and tidy edges so stairs look and feel safe again.",
  },
  {
    q: "What about burns, stains or tears?",
    a: "Where possible we patch-match from spare stock or remnant. We’ll be honest if a repair won’t look right and recommend replace instead.",
  },
];

export const homeFaqs = [
  {
    q: "Do you offer free measures across Essex?",
    a: "Yes. We provide free measurements and estimates across Essex, with sample visits during working hours, evenings and weekends where arranged.",
  },
  {
    q: "Do you supply and fit?",
    a: "We supply and fit carpets, vinyl, LVT, laminate, engineered wood, stair runners and commercial flooring — one team from sample to finished floor.",
  },
  {
    q: "Is your work insured and warranted?",
    a: "Yes. Workmanship and products carry warranty, and we hold public liability insurance for your peace of mind.",
  },
  {
    q: "Can you uplift old flooring and move furniture?",
    a: "Absolutely. Uplift, disposal, door trimming and furniture handling are part of how we keep installs tidy and on schedule.",
  },
];
