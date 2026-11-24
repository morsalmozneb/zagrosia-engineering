// The 17 services Zagrosia offers — content from "Website – Our Services Content".
// `video` / `image` are optional: a service without one shows a plain brand panel until its video is added.
export type ServiceItem = {
  id: number
  short: string // short label for the tab
  title: string
  image?: string
  video?: string
  intro: string
  more: string
  bullets: string[]
  tags: string[]
}

// The eight services shown on the homepage (the ones that most often need a P.Eng. seal)
export const HOME_SERVICE_IDS = [1, 2, 5, 6, 7, 10, 8, 11]

export const allServices: ServiceItem[] = [
  {
    "id": 1,
    "short": "Structural Design",
    "title": "Structural Design for Concrete, Steel, Wood, and Masonry Buildings",
    "image": "/videos/services/structural-design-v3-poster.jpg",
    "video": "/videos/services/structural-design-v3.mp4",
    "intro": "Zagrosia provides practical structural design services for new buildings, additions, renovations, and building modifications using concrete, steel, wood, and masonry systems. Our work focuses on clear load paths, buildable details, efficient framing layouts, and coordination with architectural, mechanical, electrical, and construction requirements.",
    "more": "This service is suitable for owners, architects, contractors, developers, and consultants who need structural engineering input for residential, commercial, industrial, or mixed-use projects. Whether the project involves a new structure, an alteration to an existing building, or a local structural component, Zagrosia helps translate project requirements into practical engineering solutions.",
    "bullets": [
      "Structural design for concrete, steel, wood, and masonry systems",
      "Framing layouts and load path review",
      "Structural calculations and design notes",
      "Construction-oriented structural details",
      "Coordination with architects, contractors, and other consultants",
      "Support for additions, renovations, and building modifications"
    ],
    "tags": [
      "Concrete",
      "Steel",
      "Wood",
      "Masonry",
      "BCBC 2024",
      "NBCC"
    ]
  },
  {
    "id": 2,
    "short": "Foundations & Walls",
    "title": "Foundation and Retaining Wall Design",
    "image": "/videos/services/foundations-walls-v3-poster.jpg",
    "video": "/videos/services/foundations-walls-v3.mp4",
    "intro": "Zagrosia provides foundation and retaining wall design services for buildings, site structures, equipment supports, additions, and repair projects. Our design approach considers soil support conditions, gravity and lateral loading, drainage-related concerns, constructability, and coordination with the overall building or site layout.",
    "more": "This service is useful when a project requires new foundations, foundation upgrades, local support pads, retaining structures, underpinning concepts, or practical design support for site constraints. We work with project teams to provide clear and buildable structural details that can be used for construction planning and permit coordination where required.",
    "bullets": [
      "Shallow foundation design",
      "Local equipment and structural support pads",
      "Retaining wall design and review",
      "Foundation upgrade or repair concepts",
      "Coordination with geotechnical information where available",
      "Practical construction details for contractors"
    ],
    "tags": [
      "Foundations",
      "Concrete",
      "Geotechnical",
      "Retaining Walls"
    ]
  },
  {
    "id": 3,
    "short": "Masonry & CMU Walls",
    "title": "Masonry, CMU Wall, Brick Veneer, and Attachment Design",
    "image": "/videos/services/masonry-cmu-walls-v3-poster.jpg",
    "video": "/videos/services/masonry-cmu-walls-v3.mp4",
    "intro": "Zagrosia provides engineering support for masonry walls, CMU construction, brick veneer attachments, lateral supports, and masonry-related building components. Masonry work often requires careful coordination between architectural appearance, structural support, anchorage, movement joints, and construction sequencing.",
    "more": "This service is suitable for contractors, owners, architects, and building consultants working on new masonry construction, repairs, façade upgrades, wall openings, or attachment details. Zagrosia can review the intended use of the wall or veneer system and provide practical structural details for support, anchorage, and load transfer.",
    "bullets": [
      "CMU wall design and detailing",
      "Masonry attachment design",
      "Brick veneer support and anchorage review",
      "Lateral support and connection details",
      "Wall opening and lintel support coordination",
      "Repair and strengthening concepts for masonry elements"
    ],
    "tags": [
      "Masonry",
      "CMU",
      "Brick Veneer",
      "Anchorage"
    ]
  },
  {
    "id": 4,
    "short": "Steel Connections",
    "title": "Steel Connection Design and Special Steel Structures",
    "image": "/videos/services/steel-connections-v3-poster.jpg",
    "video": "/videos/services/steel-connections-v3.mp4",
    "intro": "Zagrosia provides steel connection design and practical engineering support for steel framing, platforms, brackets, supports, test structures, and custom steel components. Many projects require more than standard framing members; they need clear connection details that can be fabricated, installed, and coordinated with real site conditions.",
    "more": "This service is suitable for fabricators, contractors, equipment suppliers, testing facilities, and project teams requiring custom steel design. We can support projects involving bolted or welded connections, support frames, brackets, base plates, anchors, stiffeners, and specialty steel assemblies.",
    "bullets": [
      "Steel connection design",
      "Base plate and anchor review",
      "Bracket and support frame design",
      "Special steel structures for testing or equipment support",
      "Fabrication-oriented details",
      "Coordination with shop drawings and installation requirements"
    ],
    "tags": [
      "Steel",
      "Connections",
      "Fabrication",
      "Custom Structures"
    ]
  },
  {
    "id": 5,
    "short": "Building Assessments",
    "title": "Existing Building Structural Assessments",
    "image": "/videos/services/building-assessments-v3-poster.jpg",
    "video": "/videos/services/building-assessments-v3.mp4",
    "intro": "Zagrosia provides structural assessment services for existing buildings where owners, strata corporations, property managers, contractors, or consultants need a professional engineering opinion. Existing buildings often require review before renovations, repairs, equipment upgrades, envelope work, change of use, or continued operation.",
    "more": "Our assessment process focuses on understanding the structural system, visible conditions, load path, areas of distress, and practical next steps. The goal is to help clients understand whether further investigation, repair, strengthening, or design work is required.",
    "bullets": [
      "Structural assessment of existing buildings",
      "Review of visible structural elements and distress conditions",
      "Assessment of wood, steel, concrete, and masonry systems",
      "Practical repair or upgrade recommendations",
      "Engineering reports for owners, strata, consultants, or contractors",
      "Support for renovation and alteration planning"
    ],
    "tags": [
      "Assessment",
      "Existing Buildings",
      "Strata",
      "Reports"
    ]
  },
  {
    "id": 6,
    "short": "Seismic & Retrofit",
    "title": "Seismic Assessment and Retrofit Support for Existing Buildings",
    "image": "/videos/services/seismic-retrofit-v3-poster.jpg",
    "video": "/videos/services/seismic-retrofit-v3.mp4",
    "intro": "Zagrosia provides seismic assessment and retrofit support for existing buildings, including wood, steel, concrete, masonry, warehouse, commercial, and multi-family structures. Many existing buildings were constructed under older code requirements, and owners may need to understand seismic vulnerabilities before planning upgrades, renovations, or long-term capital improvements.",
    "more": "Our role is to review the existing structural system, identify key seismic load path considerations, and provide practical retrofit concepts where required. This may include review of diaphragms, bracing, shear walls, connections, anchorage, foundations, and continuity between structural elements.",
    "bullets": [
      "Seismic assessment reports for existing buildings",
      "Review of seismic load path and structural vulnerabilities",
      "Retrofit concept development",
      "Coordination of strengthening options",
      "Support for phased upgrades or renovation planning",
      "Practical recommendations for owners and project teams"
    ],
    "tags": [
      "Seismic",
      "Retrofit",
      "NBCC",
      "BCBC 2024",
      "Existing Buildings"
    ]
  },
  {
    "id": 7,
    "short": "Repair & Upgrades",
    "title": "Structural Repair Design and Upgrade Support",
    "image": "/videos/services/repair-upgrades-v3-poster.jpg",
    "video": "/videos/services/repair-upgrades-v3.mp4",
    "intro": "Zagrosia provides structural repair and upgrade design for existing buildings and building components. This service is intended for situations where structural elements are damaged, deteriorated, modified, overloaded, or no longer suitable for the intended use without repair or strengthening.",
    "more": "We focus on repair solutions that are practical, buildable, and appropriate for the condition of the existing structure. Our work may include repair sketches, structural details, reinforcement concepts, contractor coordination, and field review during implementation.",
    "bullets": [
      "Structural repair design",
      "Local strengthening and reinforcement details",
      "Repair recommendations for damaged building components",
      "Balcony, stair, guardrail, and awning upgrades",
      "Support for strata and existing building repair projects",
      "Coordination with contractors during repair work"
    ],
    "tags": [
      "Repair",
      "Rehabilitation",
      "Strata",
      "Strengthening"
    ]
  },
  {
    "id": 8,
    "short": "Damage & Insurance",
    "title": "Insurance and Property Damage Structural Reviews",
    "image": "/videos/services/damage-insurance-v3-poster.jpg",
    "video": "/videos/services/damage-insurance-v3.mp4",
    "intro": "Zagrosia provides structural engineering reviews for property damage related to fire, flood, water leakage, vehicle impact, settlement, framing damage, or other loss events. This service is intended to help adjusters, building consultants, owners, and contractors understand the structural effect of the reported damage and identify practical repair requirements.",
    "more": "Our focus is on the engineering scope: what structural elements appear to be affected, what repair or further review may be required, and what minimum structural work may be needed to restore performance. Coverage decisions, cost allocation, and policy interpretation remain outside the engineering scope.",
    "bullets": [
      "Structural review of fire, flood, water, impact, and settlement damage",
      "Damage-related structural assessment reports",
      "Minimum structural repair recommendations",
      "Repair scope support for insurance-related files",
      "Review of visible distress, framing damage, and affected load paths",
      "Practical engineering input for adjusters, consultants, and contractors"
    ],
    "tags": [
      "Insurance",
      "Property Damage",
      "Assessment",
      "Reports"
    ]
  },
  {
    "id": 9,
    "short": "Rooftop Equipment",
    "title": "Rooftop Mechanical and Electrical Equipment Supports",
    "image": "/videos/services/rooftop-equipment-v3-poster.jpg",
    "video": "/videos/services/rooftop-equipment-v3.mp4",
    "intro": "Zagrosia provides structural engineering support for rooftop mechanical and electrical equipment installations, including rooftop units, exhaust fans, duct supports, pipe supports, equipment curbs, and support frames. Existing roofs often require review before new equipment is installed, especially where equipment loads, openings, vibration, anchorage, or seismic restraint requirements may affect the structure.",
    "more": "Our work focuses on determining how the equipment loads are transferred to the existing roof system and what support details are required. Depending on the roof type, this may involve wood framing, steel deck, concrete roof slabs, curbs, sleepers, local reinforcement, or coordination with mechanical layouts.",
    "bullets": [
      "Rooftop equipment load review",
      "Support design for mechanical and electrical equipment",
      "Curb, sleeper, and support coordination",
      "Review of roof openings and local framing impacts",
      "Seismic restraint support where required",
      "Practical details for contractors and mechanical teams"
    ],
    "tags": [
      "Mechanical",
      "Rooftop",
      "Equipment Support",
      "Seismic Restraint"
    ]
  },
  {
    "id": 10,
    "short": "Openings & Alterations",
    "title": "Structural Openings and Building Alteration Support",
    "image": "/videos/services/openings-alterations-v3-poster.jpg",
    "video": "/videos/services/openings-alterations-v3.mp4",
    "intro": "Zagrosia provides engineering support for structural openings and building alterations in existing buildings. Openings in walls, floors, roofs, and structural framing can affect load paths and may require headers, lintels, reinforcement, new framing, or temporary support during construction.",
    "more": "This service is suitable for renovation projects, tenant improvements, mechanical upgrades, doorway or window modifications, roof penetrations, and equipment access requirements. We help clients understand what can be modified, what must be supported, and what details are required for safe and practical construction.",
    "bullets": [
      "Review of proposed openings in existing structures",
      "Header, lintel, and support design",
      "Local reinforcement details",
      "Coordination with mechanical and architectural changes",
      "Temporary support concepts where required",
      "Construction-phase engineering support"
    ],
    "tags": [
      "Renovations",
      "Openings",
      "Tenant Improvements",
      "Existing Buildings"
    ]
  },
  {
    "id": 11,
    "short": "Racking Reviews",
    "title": "Racking System Safety and Capacity Reviews",
    "image": "/videos/services/racking-reviews-v3-poster.jpg",
    "video": "/videos/services/racking-reviews-v3.mp4",
    "intro": "Zagrosia provides structural engineering services for warehouse and industrial racking systems, including field review, damage assessment, capacity analysis, anchorage review, and maximum load confirmation. This service is useful for warehouse owners, tenants, operators, property managers, and businesses that need to understand whether their racking systems are suitable for their intended use.",
    "more": "Racking systems can be affected by impact damage, missing components, altered configurations, inadequate anchorage, overloading, or undocumented capacity. Zagrosia can review the system condition, identify components that may require repair or replacement, assess load capacity where sufficient information is available, and provide engineering documentation to support operational decisions.",
    "bullets": [
      "Field review of existing racking systems",
      "Review of damaged uprights, beams, braces, base plates, and anchors",
      "Capacity analysis and maximum load confirmation",
      "Repair or replacement recommendations",
      "Racking layout and configuration review",
      "Safety letters or engineering documentation for operational or WorkSafeBC-related requirements"
    ],
    "tags": [
      "Racking",
      "Warehouse",
      "Industrial",
      "WorkSafeBC",
      "Capacity Review"
    ]
  },
  {
    "id": 12,
    "short": "Guardrails & Stairs",
    "title": "Guardrails, Stairs, Balconies, and Awnings",
    "image": "/videos/services/guardrails-stairs-v3-poster.jpg",
    "video": "/videos/services/guardrails-stairs-v3.mp4",
    "intro": "Zagrosia provides structural design and review services for guardrails, stairs, balconies, awnings, and exterior architectural components. These elements often involve both safety and appearance, so they require practical engineering details that can be coordinated with architects, fabricators, contractors, and owners.",
    "more": "This service is suitable for new installations, upgrades, repairs, replacements, and retrofit work in residential, commercial, strata, and industrial settings. Zagrosia can provide support for member sizing, anchorage, connections, shop drawing coordination, and field review where required.",
    "bullets": [
      "Guardrail design and anchorage review",
      "Stair and balcony structural support design",
      "Awning frame and connection design",
      "Upgrade and replacement support",
      "Coordination with fabricators and installers",
      "Review of shop drawings and installation details"
    ],
    "tags": [
      "Guardrails",
      "Stairs",
      "Balconies",
      "Awnings",
      "Fabrication"
    ]
  },
  {
    "id": 13,
    "short": "Shop Drawings",
    "title": "Shop Drawings and Fabrication Support",
    "image": "/videos/services/shop-drawings-v3-poster.jpg",
    "video": "/videos/services/shop-drawings-v3.mp4",
    "intro": "Zagrosia provides shop drawing and fabrication support for guardrails, awnings, steel structures, support frames, brackets, and other structural components. This service is intended for fabricators, manufacturers, contractors, and installation teams that need clear drawings and connection details suitable for production and site coordination.",
    "more": "Our shop drawing support focuses on practical buildability. We help clarify member sizes, connection layouts, anchor locations, dimensions, and installation requirements so that the fabricated product can be coordinated with the project conditions.",
    "bullets": [
      "Shop drawings for guardrails",
      "Shop drawings for awnings",
      "Shop drawings for steel structures and support frames",
      "Connection and anchorage details",
      "Fabrication-oriented structural drawings",
      "Coordination with manufacturing and installation teams"
    ],
    "tags": [
      "Shop Drawings",
      "Fabrication",
      "Steel",
      "Guardrails",
      "Awnings"
    ]
  },
  {
    "id": 14,
    "short": "Helical Piles & Bridges",
    "title": "Helical Pile Foundations, Small Bridges, and Walkways",
    "image": "/videos/services/helical-piles-bridges-v3-poster.jpg",
    "video": "/videos/services/helical-piles-bridges-v3.mp4",
    "intro": "Zagrosia provides structural design support for helical pile foundations and small site structures, including walkways, small bridges, platforms, and light support structures. Helical piles can be useful where conventional foundations are difficult, access is limited, soil conditions require deeper support, or construction needs to be efficient and minimally disruptive.",
    "more": "This service is suitable for contractors, property owners, site developers, and consultants working on small to medium structural projects. Zagrosia can provide foundation layout concepts, pile loading requirements, connection details, and coordination with installers or geotechnical recommendations where required.",
    "bullets": [
      "Helical pile foundation design",
      "Foundation support for small structures",
      "Small bridge and walkway support design",
      "Pile cap, bracket, and connection details",
      "Coordination with contractors and pile installers",
      "Practical design support for constrained sites"
    ],
    "tags": [
      "Helical Piles",
      "Foundations",
      "Small Bridges",
      "Walkways"
    ]
  },
  {
    "id": 15,
    "short": "Scaffolding Design",
    "title": "Scaffolding and Temporary Works Design",
    "image": "/videos/services/scaffolding-design-v3-poster.jpg",
    "video": "/videos/services/scaffolding-design-v3.mp4",
    "intro": "Zagrosia provides engineering support for scaffolding, temporary access systems, temporary bracing, and construction-stage support requirements. Temporary works are often critical to construction safety and sequencing, especially where workers need access to elevated areas or where existing structures require temporary support during repair or alteration.",
    "more": "This service is suitable for contractors, scaffold suppliers, restoration teams, and construction managers who need engineered drawings or review for temporary systems. Zagrosia focuses on practical, site-specific solutions that support safe access and construction coordination.",
    "bullets": [
      "Scaffolding design drawings",
      "Temporary access support review",
      "Temporary bracing concepts",
      "Construction loading review",
      "Field coordination support",
      "Practical drawings for contractors and scaffold teams"
    ],
    "tags": [
      "Scaffolding",
      "Temporary Works",
      "Construction Support"
    ]
  },
  {
    "id": 16,
    "short": "Field Review",
    "title": "Field Review and Construction Support",
    "image": "/videos/services/field-review-v3-poster.jpg",
    "video": "/videos/services/field-review-v3.mp4",
    "intro": "Zagrosia provides field review and construction support to help bridge the gap between structural drawings and actual site conditions. Construction projects often require clarification, coordination, and practical engineering input when existing conditions differ from expectations or when contractors need timely direction.",
    "more": "Our field review services help owners, contractors, and project teams document visible conditions, confirm construction progress related to structural work, and identify items that may require clarification, repair, or design adjustment. This support can be provided as part of design work, repair implementation, or construction-phase coordination.",
    "bullets": [
      "Field review of structural work",
      "Review of installed framing, connections, supports, and repairs",
      "Contractor coordination and practical engineering input",
      "Site notes, letters, or review reports where required",
      "Clarification of structural details during construction",
      "Support for repair and upgrade implementation"
    ],
    "tags": [
      "Field Review",
      "Construction",
      "Site Inspection",
      "Contractor Support"
    ]
  },
  {
    "id": 17,
    "short": "Engineering Support",
    "title": "Practical Engineering Support for Owners, Contractors, and Consultants",
    "image": "/videos/services/engineering-support-v3-poster.jpg",
    "video": "/videos/services/engineering-support-v3.mp4",
    "intro": "Zagrosia’s work is focused on practical structural engineering for real building conditions. Many projects do not fit neatly into one category: an owner may need to understand a crack, a contractor may need a support detail, a fabricator may need a connection, or a consultant may need structural input for a larger building assessment.",
    "more": "Our approach is to understand the actual project need, review the available information, and provide a clear engineering path forward. Whether the requirement is a report, sketch, calculation, repair detail, field review, or shop drawing, Zagrosia aims to provide practical support that helps the client move the project forward.",
    "bullets": [
      "Practical structural engineering consultation",
      "Existing building review and repair planning",
      "Design support for small and medium projects",
      "Coordination with contractors and consultants",
      "Clear written recommendations",
      "Buildable structural details and documentation"
    ],
    "tags": [
      "Consultation",
      "Owners",
      "Contractors",
      "Consultants",
      "Small Projects"
    ]
  }
]
