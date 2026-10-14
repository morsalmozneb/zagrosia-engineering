/**
 * Real project data for zagrosia.ca (replaces the earlier placeholder projects).
 * Sources: "Zagrosia Engineering Portfolio" (Oct 2026) and "Seyed Hassan Mozneb Portfolio".
 *
 * To EDIT or ADD a project: change/add an entry in the `projects` array below.
 * The listing page, home carousel, project pages and sitemap all read from this file.
 * Card/hero image for each project: /public/images/projects/<slug>.png (replace with a real photo
 * using the SAME file name to update it).
 */

export type ProjectItem = { label: string; detail: string }

export type Project = {
  id: number
  slug: string
  title: string // UPPERCASE, shown in cards and as page heading
  location: string
  image: string
  attribution: "zagrosia" | "principal"
  badge: string
  tags: string[]
  summary: string // short text for cards
  overview: string[] // paragraphs on the project page
  facts: { label: string; value: string }[]
  focus?: { title: string; body: string }[] // two highlight cards (engineering focus / key consideration)
  scope?: ProjectItem[] // checklist of items
  scopeHeading?: string
  note: string // attribution statement shown at the bottom of the page
  featured?: boolean // shown in the home page carousel
}

const ZAG = "ZAGROSIA ASSIGNMENT"
const PRI = "PRINCIPAL EXPERIENCE"
const NOTE_ZAG =
  "This is a Zagrosia Engineering Inc. assignment. The summary is anonymized and does not reproduce client reports or drawings."
const noteThrough = (firm: string) =>
  `This project illustrates the professional experience of Seyed Hassan Mozneb, P.Eng., undertaken through ${firm}. It is not presented as a project commissioned directly to Zagrosia Engineering Inc. The summary is anonymized and does not reproduce client reports or drawings.`
const NOTE_EARLIER =
  "This project illustrates the professional experience of Seyed Hassan Mozneb, undertaken earlier in his career before founding Zagrosia Engineering Inc. It is not presented as a project commissioned directly to Zagrosia."

const I3 = "i3 Building Science and Consulting Inc."

export const projects: Project[] = [
  /* ───────── Zagrosia assignments ───────── */
  {
    id: 1,
    slug: "temporary-retaining-wall-support",
    title: "TEMPORARY RETAINING-WALL SUPPORT",
    location: "Vancouver, BC",
    image: "/images/projects/temporary-retaining-wall-support.png",
    attribution: "zagrosia",
    badge: ZAG,
    tags: ["Temporary Shoring", "Steel", "Ground Anchors"],
    summary:
      "Temporary shoring design to support a retaining-wall repair, coordinated with the contractor and the permanent-works engineer.",
    overview: [
      "Zagrosia designed temporary shoring to support a retaining-wall repair in Vancouver, BC. The work was coordinated with the contractor and with the permanent-works engineer so that the temporary support and the permanent repair worked together.",
    ],
    facts: [
      { label: "Location", value: "Vancouver, BC" },
      { label: "Engagement", value: "Zagrosia assignment" },
      { label: "Services", value: "Temporary support design" },
      { label: "Coordination", value: "Contractor and permanent-works engineer" },
    ],
    focus: [
      {
        title: "Engineering Focus",
        body: "Coordinate steel support framing, connections and helical pile / ground anchor requirements.",
      },
      {
        title: "Key Consideration",
        body: "Establish supplier verification of installation and capacity, and resolve interference with existing foundations and services.",
      },
    ],
    note: NOTE_ZAG,
    featured: true,
  },
  {
    id: 2,
    slug: "parkade-structural-repairs",
    title: "PARKADE STRUCTURAL REPAIRS",
    location: "British Columbia",
    image: "/images/projects/parkade-structural-repairs.png",
    attribution: "zagrosia",
    badge: ZAG,
    tags: ["Concrete Repair", "Temporary Support", "Precast"],
    summary:
      "Engineering involvement in additional parkade repairs involving damaged concrete and staged support of precast double-tee components.",
    overview: [
      "Zagrosia was engaged on additional parkade repairs involving damaged concrete and the staged support of precast double-tee components, within the scope assigned to Zagrosia.",
    ],
    facts: [
      { label: "Location", value: "British Columbia" },
      { label: "Engagement", value: "Zagrosia assignment" },
      { label: "Services", value: "Repair sequencing and temporary support review" },
      { label: "Coordination", value: "Engineer of record" },
    ],
    focus: [
      {
        title: "Engineering Focus",
        body: "Review temporary support arrangements and repair sequencing within the assigned scope.",
      },
      {
        title: "Key Consideration",
        body: "Coordinate with the engineer of record before support release or relocation, accounting for concrete strength development and project requirements.",
      },
    ],
    note: NOTE_ZAG,
    featured: true,
  },

  /* ───────── Principal experience: through GNC ───────── */
  {
    id: 3,
    slug: "mixed-use-building-fire",
    title: "MIXED-USE BUILDING FIRE",
    location: "Vancouver, BC",
    image: "/images/projects/mixed-use-building-fire.png",
    attribution: "principal",
    badge: PRI,
    tags: ["Fire Damage", "Assessment", "Repair Design"],
    summary:
      "Three-storey mixed-use building with major third-floor and attic fire damage, and firefighting-water effects at lower levels.",
    overview: [
      "A three-storey mixed-use building in Vancouver suffered major third-floor and attic fire damage, with firefighting-water effects at the lower levels. The structural work focused on separating what could be repaired from what had to be replaced.",
    ],
    facts: [
      { label: "Location", value: "Vancouver, BC" },
      { label: "Type", value: "Mixed-use building, fire loss" },
      { label: "Services", value: "Structural damage assessment" },
      { label: "Experience", value: "Through GNC" },
    ],
    focus: [
      {
        title: "Engineering Focus",
        body: "Review affected roof, attic and floor framing, bearing conditions, connections and remaining load paths. Identify visible fire damage and distinguish documented observations from concealed conditions requiring further exposure.",
      },
      {
        title: "Relevance to Restoration",
        body: "Supports definition of structural repair and reconstruction requirements across multiple occupancies, coordinating selective demolition, further review and repair drawing development.",
      },
    ],
    note: noteThrough("GNC"),
    featured: true,
  },
  {
    id: 4,
    slug: "wildfire-damaged-house-and-shop",
    title: "WILDFIRE-DAMAGED HOUSE & SHOP",
    location: "Clinton, BC",
    image: "/images/projects/wildfire-damaged-house-and-shop.png",
    attribution: "principal",
    badge: PRI,
    tags: ["Wildfire", "Concrete", "Masonry"],
    summary:
      "Separate house and shop structures with extensive above-grade destruction and remaining concrete and masonry support systems.",
    overview: [
      "A house and a shop in Clinton, BC were left with extensive above-grade destruction after a wildfire, with concrete and masonry support systems remaining. Each structure was assessed independently.",
    ],
    facts: [
      { label: "Location", value: "Clinton, BC" },
      { label: "Type", value: "House and shop, wildfire loss" },
      { label: "Services", value: "Structural damage assessment" },
      { label: "Experience", value: "Through GNC" },
    ],
    focus: [
      {
        title: "Engineering Focus",
        body: "Assess each structure independently. Distinguish damaged masonry requiring replacement from cracked concrete requiring further investigation. Identify unsuitable shop supports and defer concealed slab retention decisions until exposure and review.",
      },
      {
        title: "Relevance to Restoration",
        body: "Demonstrates component-specific decisions rather than blanket acceptance or rejection of all remaining foundations. Concealed elements remain subject to review, and crack causation is not assumed solely from their presence after a fire.",
      },
    ],
    note: noteThrough("GNC"),
    featured: true,
  },
  {
    id: 5,
    slug: "wind-tree-impact-roof-damage",
    title: "WIND / TREE-IMPACT ROOF DAMAGE",
    location: "Saskatchewan",
    image: "/images/projects/wind-tree-impact-roof-damage.png",
    attribution: "principal",
    badge: PRI,
    tags: ["Roof Framing", "Impact Damage", "Residential"],
    summary:
      "Residential roof damage following a tree impact, involving roof framing, sheathing and ceiling penetration.",
    overview: [
      "A residential roof in Saskatchewan was damaged by a tree impact, involving roof framing, sheathing and ceiling penetration. The assessment established the basis for repair or replacement.",
    ],
    facts: [
      { label: "Location", value: "Saskatchewan" },
      { label: "Type", value: "Residential, wind / tree impact" },
      { label: "Services", value: "Structural damage assessment" },
      { label: "Experience", value: "Through GNC" },
    ],
    focus: [
      {
        title: "Engineering Focus",
        body: "Assess the affected framing configuration and connections, define the required exposure and establish the basis for repair or replacement.",
      },
      {
        title: "Key Consideration",
        body: "Unusual or site-built roof framing requires verification of the actual structural arrangement.",
      },
    ],
    note: noteThrough("GNC"),
    featured: true,
  },

  /* ───────── Principal experience: i3 Building Science and Consulting (BC) ───────── */
  {
    id: 6,
    slug: "car-elevator-steel-enclosure",
    title: "CAR ELEVATOR & STEEL ENCLOSURE",
    location: "British Columbia",
    image: "/images/projects/car-elevator-steel-enclosure.png",
    attribution: "principal",
    badge: PRI,
    tags: ["Industrial", "Steel", "3D CAD"],
    summary:
      "Car elevator system and steel enclosure for an industrial factory (3D CAD, structural analysis), improving factory logistics and use of space.",
    overview: [
      "A car elevator system and steel enclosure were designed for a building hoist in an industrial factory, using structural analysis and 3D CAD. The system improved factory logistics and the use of space.",
    ],
    facts: [
      { label: "Location", value: "British Columbia" },
      { label: "Building Type", value: "Industrial factory" },
      { label: "Services", value: "Structural analysis, steel design, 3D CAD" },
      { label: "Experience", value: "Through i3 Building Science and Consulting Inc." },
    ],
    scope: [
      { label: "Car Elevator System", detail: "Design of a car elevator for a building hoist in an industrial factory." },
      { label: "Steel Enclosure", detail: "Structural design and analysis of the steel enclosure." },
      { label: "3D CAD Documentation", detail: "All details and drawings drafted in 3D CAD." },
    ],
    note: noteThrough(I3),
  },
  {
    id: 7,
    slug: "residential-houses-and-townhouses",
    title: "RESIDENTIAL HOUSES & TOWNHOUSES",
    location: "British Columbia",
    image: "/images/projects/residential-houses-and-townhouses.png",
    attribution: "principal",
    badge: PRI,
    tags: ["Residential", "BCBC 2018", "Wood"],
    summary:
      "Structural elements for 15 houses and 2 townhouses, including foundations, walls, joists and roofs, meeting local codes.",
    overview: [
      "Structural design for 15 houses and 2 townhouses in BC, designed to Part 4 of BCBC 2018, including foundations, wall footings, joists, roofs, columns, decks, shear walls and suspended slabs, with complete drawing sets.",
    ],
    facts: [
      { label: "Location", value: "British Columbia" },
      { label: "Building Type", value: "15 houses, 2 townhouses" },
      { label: "Code", value: "BCBC 2018, Part 4" },
      { label: "Experience", value: "Through i3 Building Science and Consulting Inc." },
    ],
    scope: [
      { label: "Foundations & Wall Footings", detail: "Foundation design for each house and townhouse." },
      { label: "Framing & Roofs", detail: "Joists, roofs, columns, decks and shear walls designed to meet local codes." },
      { label: "Suspended Slabs", detail: "Suspended concrete slabs where required." },
      { label: "Drawing Sets", detail: "Complete structural drawing sets for each building." },
    ],
    note: noteThrough(I3),
  },
  {
    id: 8,
    slug: "heavy-racking-systems",
    title: "HEAVY RACKING SYSTEMS",
    location: "British Columbia",
    image: "/images/projects/heavy-racking-systems.png",
    attribution: "principal",
    badge: PRI,
    tags: ["Industrial", "Racking", "Finite Element"],
    summary: "Custom racking for 6 factories in BC, using finite element models for safe, efficient storage.",
    overview: [
      "Custom heavy racking systems were designed for 6 factories in BC. Finite element models were used to confirm safe, efficient storage.",
    ],
    facts: [
      { label: "Location", value: "British Columbia" },
      { label: "Building Type", value: "6 industrial factories" },
      { label: "Services", value: "Racking design, finite element modelling" },
      { label: "Experience", value: "Through i3 Building Science and Consulting Inc." },
    ],
    scope: [
      { label: "Racking System Design", detail: "Custom racking systems designed for 6 factories in BC." },
      { label: "Finite Element Modelling", detail: "Finite element models used for safe, efficient storage." },
      { label: "Details & Drawings", detail: "Details and drawings prepared for each system." },
    ],
    note: noteThrough(I3),
    featured: true,
  },
  {
    id: 9,
    slug: "steel-access-bridge",
    title: "STEEL ACCESS BRIDGE",
    location: "British Columbia",
    image: "/images/projects/steel-access-bridge.png",
    attribution: "principal",
    badge: PRI,
    tags: ["Steel", "Foundations", "3D CAD"],
    summary:
      "60 ft × 25 ft steel bridge with concrete foundations and piling, improving movement within the facility.",
    overview: [
      "A 60 ft long, 25 ft wide steel access bridge was designed with concrete foundations and piling, improving movement within the facility. The bridge was drafted in 3D CAD.",
    ],
    facts: [
      { label: "Location", value: "British Columbia" },
      { label: "Structure", value: "Steel bridge, 60 ft × 25 ft" },
      { label: "Services", value: "Steel design, foundations, 3D CAD" },
      { label: "Experience", value: "Through i3 Building Science and Consulting Inc." },
    ],
    scope: [
      { label: "Steel Bridge Design", detail: "A 60 ft long by 25 ft wide steel access bridge." },
      { label: "Concrete Foundations & Piling", detail: "Concrete foundations and piling supporting the bridge." },
      { label: "3D CAD Drafting", detail: "Bridge drafted in 3D CAD." },
    ],
    note: noteThrough(I3),
  },
  {
    id: 10,
    slug: "helical-piles-and-suspended-slabs",
    title: "HELICAL PILES & SUSPENDED SLABS",
    location: "British Columbia",
    image: "/images/projects/helical-piles-and-suspended-slabs.png",
    attribution: "principal",
    badge: PRI,
    tags: ["Foundations", "Helical Piles", "Concrete"],
    summary:
      "Helical pile foundations and suspended slabs on multiple projects (geotechnical analysis, structural modelling).",
    overview: [
      "Helical pile foundations and suspended slabs were designed on multiple projects, using geotechnical analysis and structural modelling.",
    ],
    facts: [
      { label: "Location", value: "British Columbia" },
      { label: "Services", value: "Foundation design, structural modelling" },
      { label: "Elements", value: "Helical piles, suspended slabs, soldier piles" },
      { label: "Experience", value: "Through i3 Building Science and Consulting Inc." },
    ],
    scope: [
      { label: "Helical Pile Foundations", detail: "Layout plans for piles and large foundations." },
      { label: "Suspended Slabs", detail: "Suspended concrete slab design on multiple projects." },
      { label: "Retaining Walls & Soldier Piles", detail: "Layout plans for retaining walls and soldier piles." },
      { label: "Analysis", detail: "Geotechnical analysis and structural modelling." },
    ],
    note: noteThrough(I3),
  },
  {
    id: 11,
    slug: "concrete-beam-and-slab-replacement",
    title: "CONCRETE BEAM & SLAB REPLACEMENT",
    location: "British Columbia",
    image: "/images/projects/concrete-beam-and-slab-replacement.png",
    attribution: "principal",
    badge: PRI,
    tags: ["High-Rise", "Rehabilitation", "Concrete"],
    summary:
      "Supervised replacement and repair of a beam and slab in a high-rise building, improving safety and stability.",
    overview: [
      "Design drawings, specifications and supervision for replacing a damaged concrete beam and slab in a high-rise building, improving safety and stability.",
    ],
    facts: [
      { label: "Location", value: "British Columbia" },
      { label: "Building Type", value: "High-rise building" },
      { label: "Services", value: "Rehabilitation design and supervision" },
      { label: "Experience", value: "Through i3 Building Science and Consulting Inc." },
    ],
    scope: [
      { label: "Design Drawings", detail: "Drawings for replacing the damaged concrete beam and slab." },
      { label: "Specifications", detail: "Technical specifications for the repair work." },
      { label: "Supervision", detail: "Supervision of the replacement and repair." },
    ],
    note: noteThrough(I3),
  },
  {
    id: 12,
    slug: "guardrails-stairs-and-mechanical-supports",
    title: "GUARDRAILS, STAIRS & MECHANICAL SUPPORTS",
    location: "British Columbia",
    image: "/images/projects/guardrails-stairs-and-mechanical-supports.png",
    attribution: "principal",
    badge: PRI,
    tags: ["Steel", "Guardrails", "Mechanical Supports"],
    summary:
      "Guardrails, staircases, handrails and mechanical supports designed for safety, function and compliance.",
    overview: [
      "Design of guardrails, staircases, handrails and mechanical supports for safety, function and compliance, along with fences, steel stud walls and floors, and glass doors and windows.",
    ],
    facts: [
      { label: "Location", value: "British Columbia" },
      { label: "Services", value: "Structural design of building elements" },
      { label: "Focus", value: "Safety, function and compliance" },
      { label: "Experience", value: "Through i3 Building Science and Consulting Inc." },
    ],
    scope: [
      { label: "Guardrails, Handrails & Staircases", detail: "Designed for safety, function and compliance." },
      { label: "Mechanical Supports", detail: "Supports for mechanical equipment." },
      { label: "Other Elements", detail: "Fences, steel stud walls and floors, glass doors and windows." },
    ],
    note: noteThrough(I3),
  },
  {
    id: 13,
    slug: "masonry-seismic-ties-and-supports",
    title: "MASONRY SEISMIC TIES & SUPPORTS",
    location: "British Columbia",
    image: "/images/projects/masonry-seismic-ties-and-supports.png",
    attribution: "principal",
    badge: PRI,
    tags: ["Masonry", "Seismic", "High-Rise"],
    summary:
      "Shelf angles, seismic ties for veneer walls and lateral supports for CMU walls on 60+ high-rise and residential projects.",
    overview: [
      "Masonry design on more than 60 high-rise and residential projects in BC, including shelf angles, seismic ties for veneer walls and lateral supports for CMU walls.",
    ],
    facts: [
      { label: "Location", value: "British Columbia" },
      { label: "Building Type", value: "High-rise and residential" },
      { label: "Scale", value: "60+ projects" },
      { label: "Experience", value: "Through i3 Building Science and Consulting Inc." },
    ],
    scope: [
      { label: "Shelf Angles", detail: "Shelf angle design for masonry veneer." },
      { label: "Seismic Ties", detail: "Seismic ties for veneer walls." },
      { label: "Lateral Supports", detail: "Lateral supports for CMU walls." },
    ],
    note: noteThrough(I3),
  },

  /* ───────── Principal experience: earlier career ───────── */
  {
    id: 14,
    slug: "apartment-developments-shiraz",
    title: "APARTMENT DEVELOPMENTS, SHIRAZ",
    location: "Shiraz, Iran",
    image: "/images/projects/apartment-developments-shiraz.png",
    attribution: "principal",
    badge: PRI,
    tags: ["Residential", "799 Units", "Design & Construction"],
    summary:
      "Six apartment developments totalling 799 units, delivered as CEO and structural designer: design, construction, quality control and coordination.",
    overview: [
      "As CEO and structural designer, Seyed Hassan delivered six apartment developments in Shiraz, Iran, totalling 799 units. Roles ranged from design coordination and project management to foundation design, structural analysis, drafting and quality control.",
    ],
    facts: [
      { label: "Location", value: "Shiraz, Iran" },
      { label: "Building Type", value: "Residential apartments" },
      { label: "Scale", value: "6 developments, 799 units" },
      { label: "Role", value: "CEO & Structural Designer" },
    ],
    scopeHeading: "DEVELOPMENTS",
    scope: [
      { label: "Zagrous Apartments · 151 units", detail: "Design coordination, project management and quality assurance (2009–2011)." },
      { label: "Morvarid Apartments · 220 units", detail: "Design and construction, including foundation design, structural analysis and drafting (2010–2013)." },
      { label: "Bam-e-Sadara Apartments · 216 units", detail: "Design and construction, structural analysis, coordination and drafting." },
      { label: "Dena Apartments · 80 units", detail: "Project execution, quality control and coordination (2011–2013)." },
      { label: "Taavon Apartments · 72 units", detail: "Construction to design specifications and quality standards." },
      { label: "Miaad Apartments · 60 units", detail: "Design and construction, including foundations, structure and drafting (2004–2008)." },
    ],
    note: NOTE_EARLIER,
  },
  {
    id: 15,
    slug: "bushehr-nuclear-power-plant",
    title: "BUSHEHR NUCLEAR POWER PLANT",
    location: "Bushehr, Iran",
    image: "/images/projects/bushehr-nuclear-power-plant.png",
    attribution: "principal",
    badge: PRI,
    tags: ["Civil & Structural", "Supervision", "Quality Assurance"],
    summary:
      "Civil and structural supervision across critical works at the plant, combining construction oversight, quality assurance, safety and committee work.",
    overview: [
      "From December 1995 to August 2002, Seyed Hassan was Head of the Civil & Structural Supervision Group at the Bushehr Nuclear Power Plant, leading civil and structural supervision across critical works. The role combined construction oversight, quality assurance, safety and committee work.",
    ],
    facts: [
      { label: "Location", value: "Bushehr, Iran" },
      { label: "Role", value: "Head of Civil & Structural Supervision Group" },
      { label: "Period", value: "Dec 1995 – Aug 2002" },
      { label: "Focus", value: "Supervision, quality assurance, safety" },
    ],
    scopeHeading: "WORKS SUPERVISED",
    scope: [
      { label: "Reactor Concrete Dome", detail: "Completion of the reactor's concrete dome using advanced construction methods and strict quality control." },
      { label: "Concrete Chimneys", detail: "Supervised completion of the chimneys to safety and quality standards." },
      { label: "Reactor Building Repairs", detail: "Plan to repair and restore war-damaged buildings, including the reactor building." },
      { label: "Roof Insulation", detail: "Multi-layer insulation of plant roofs, improving energy efficiency." },
      { label: "Water-Circuit Outlet Channel", detail: "Completion of the third water circuit's outlet channel, with inspections, repairs and installations." },
      { label: "Entrance Pond Dredging", detail: "Removal of silt and mud to improve water intake to the plant." },
      { label: "Building Demolition", detail: "Planned and managed demolition of structures within the reactor building." },
      { label: "Surface Water Collection", detail: "600 m pipeline and associated buildings, improving water management." },
    ],
    note: NOTE_EARLIER,
  },
  {
    id: 16,
    slug: "abadan-refinery",
    title: "ABADAN REFINERY",
    location: "Abadan, Iran",
    image: "/images/projects/abadan-refinery.png",
    attribution: "principal",
    badge: PRI,
    tags: ["Industrial", "Pipe Racks", "Platforms"],
    summary:
      "Pipe-rack system routing and support, plus elevated access platforms and walkways for maintenance and inspection.",
    overview: [
      "As Lead Structural Designer at Petrochemical Industries Design & Engineering Co. (PIDEC), Seyed Hassan led the pipe-rack design team for the Abadan Refinery and designed the elevated access and maintenance platforms.",
    ],
    facts: [
      { label: "Location", value: "Abadan, Iran" },
      { label: "Role", value: "Lead Structural Designer" },
      { label: "Firm", value: "PIDEC, Shiraz" },
      { label: "Building Type", value: "Refinery" },
    ],
    scope: [
      { label: "Pipe Rack", detail: "Pipe-rack system routing and supporting pipes and conduits through the refinery." },
      { label: "Access Platforms", detail: "Elevated platforms and walkways for maintenance and inspection." },
    ],
    note: NOTE_EARLIER,
  },
  {
    id: 17,
    slug: "bandar-emam-petrochemical",
    title: "BANDAR-EMAM PETROCHEMICAL",
    location: "Bandar-Emam, Iran",
    image: "/images/projects/bandar-emam-petrochemical.png",
    attribution: "principal",
    badge: PRI,
    tags: ["Industrial", "Foundations", "Seismic"],
    summary:
      "Foundations for vessels and tanks, and earthquake-resistant design and on-site supervision of a control room.",
    overview: [
      "As Lead Structural Designer at PIDEC, Seyed Hassan designed foundations for vessels and tanks at the Bandar-Emam petrochemical site and the structural design and site supervision of an earthquake-resistant control room.",
    ],
    facts: [
      { label: "Location", value: "Bandar-Emam, Iran" },
      { label: "Role", value: "Lead Structural Designer" },
      { label: "Firm", value: "PIDEC, Shiraz" },
      { label: "Building Type", value: "Petrochemical plant" },
    ],
    scope: [
      { label: "Vessels & Tanks", detail: "Foundations considering dynamic loads, variable settlement and environmental factors." },
      { label: "Control Room", detail: "Earthquake-resistant design and on-site supervision." },
    ],
    note: NOTE_EARLIER,
  },
  {
    id: 18,
    slug: "bojnourd-plant",
    title: "BOJNOURD PLANT",
    location: "Bojnourd, Iran",
    image: "/images/projects/bojnourd-plant.png",
    attribution: "principal",
    badge: PRI,
    tags: ["Industrial", "Foundations", "Vibration"],
    summary:
      "Foundations for rotary equipment and reactors, addressing vibration, dynamic loads, soil conditions and seismic risk.",
    overview: [
      "As Lead Structural Designer at PIDEC, Seyed Hassan designed foundations for rotary equipment and reactors at the Bojnourd plant, addressing vibration, dynamic loads, soil conditions and seismic risk.",
    ],
    facts: [
      { label: "Location", value: "Bojnourd, Iran" },
      { label: "Role", value: "Lead Structural Designer" },
      { label: "Firm", value: "PIDEC, Shiraz" },
      { label: "Building Type", value: "Industrial plant" },
    ],
    scope: [
      { label: "Rotary Equipment", detail: "Foundations for pumps and compressors, controlling vibration and dynamic forces." },
      { label: "Reactor Foundations", detail: "Foundations designed for dynamic loads, soil conditions and seismic risk." },
    ],
    note: NOTE_EARLIER,
  },
  {
    id: 19,
    slug: "arak-petrochemical",
    title: "ARAK PETROCHEMICAL",
    location: "Arak, Iran",
    image: "/images/projects/arak-petrochemical.png",
    attribution: "principal",
    badge: PRI,
    tags: ["Industrial", "Fire Safety", "Pipe Racks"],
    summary:
      "Firefighting building and pipe-rack expansion, using 3D modelling and finite element analysis while the plant stayed in operation.",
    overview: [
      "As Lead Structural Designer at PIDEC, Seyed Hassan designed a firefighting building and a pipe-rack expansion at the Arak petrochemical plant, using 3D modelling and finite element analysis while the plant stayed in operation.",
    ],
    facts: [
      { label: "Location", value: "Arak, Iran" },
      { label: "Role", value: "Lead Structural Designer" },
      { label: "Firm", value: "PIDEC, Shiraz" },
      { label: "Building Type", value: "Petrochemical plant" },
    ],
    scope: [
      { label: "Firefighting Building", detail: "Structural frame designed with fire safety experts for rapid response." },
      { label: "Pipe-Rack Expansion", detail: "Expansion to accommodate increased production capacity." },
    ],
    note: NOTE_EARLIER,
  },
  {
    id: 20,
    slug: "tabriz-project",
    title: "TABRIZ PROJECT",
    location: "Tabriz, Iran",
    image: "/images/projects/tabriz-project.png",
    attribution: "principal",
    badge: PRI,
    tags: ["Industrial", "Bridges", "Tank Farm"],
    summary:
      "Bridges and trestles for safe passage over difficult terrain, and custom foundations for a storage tank farm.",
    overview: [
      "As Lead Structural Designer at PIDEC, Seyed Hassan designed bridges and trestles and the tank-farm foundations for the Tabriz project, to safety and environmental standards.",
    ],
    facts: [
      { label: "Location", value: "Tabriz, Iran" },
      { label: "Role", value: "Lead Structural Designer" },
      { label: "Firm", value: "PIDEC, Shiraz" },
      { label: "Building Type", value: "Industrial site" },
    ],
    scope: [
      { label: "Bridges & Trestles", detail: "Safe passage for materials and personnel over difficult terrain." },
      { label: "Tank Farm", detail: "Custom foundations for storage tanks to safety and environmental regulations." },
    ],
    note: NOTE_EARLIER,
  },
]

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}

/** Split a title into two lines for the page heading (dark first line, blue second line). */
export function splitTitle(title: string): [string, string] {
  const words = title.split(" ")
  if (words.length < 2) return [title, ""]
  let best = 1
  let bestDiff = Infinity
  for (let i = 1; i < words.length; i++) {
    const a = words.slice(0, i).join(" ").length
    const b = words.slice(i).join(" ").length
    const diff = Math.abs(a - b)
    if (diff < bestDiff) {
      best = i
      bestDiff = diff
    }
  }
  return [words.slice(0, best).join(" "), words.slice(best).join(" ")]
}

