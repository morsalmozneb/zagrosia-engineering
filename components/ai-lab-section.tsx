import Image from "next/image"

const CARD_GRADIENT = "linear-gradient(180deg, rgba(20,20,20,0) 0%, rgba(20,20,20,0.2) 30%, rgba(20,20,20,0.75) 60%, rgba(20,20,20,0.97) 100%)"
const DESKTOP_CARD_GRADIENT = "linear-gradient(180deg, rgba(48,48,48,0) 0%, rgba(48,48,48,0) 25%, rgba(48,48,48,0.3) 45%, rgba(48,48,48,0.75) 65%, rgba(48,48,48,0.95) 85%, rgba(48,48,48,1) 100%)"
const DESKTOP_CARD_SHADOW = "0 4px 19.6px 0 rgba(0,0,0,0.34)"

type ToolCard = {
  id: number
  image: string
  title: string
  titleLines: string[]
  description?: string
  imageClassName?: string
}

const largeTools: ToolCard[] = [
  {
    id: 1,
    image: "/images/AI-lab-pic-2.png",
    title: "Audio Transcription AI",
    titleLines: ["AUDIO TRANSCRIPTION AI"],
    description: "GPU-accelerated meeting transcription with faster-whisper. Live segment output, OS-aware dialogs, auto file saving.",
  },
  {
    id: 2,
    image: "/images/AI-lab-pic-3.png",
    title: "Proposal Auto-Generator",
    titleLines: ["PROPOSAL AUTO-GENERATOR"],
    description: "Interactive HTML proposals with dynamic fee tables. Export to Word, logo embedding and print-ready PDF output.",
  },
]

const smallTools: ToolCard[] = [
  {
    id: 3,
    image: "/images/AI-Lab-pic-4.png",
    title: "Excel Data Entry Automation",
    titleLines: ["EXCEL DATA ENTRY", "AUTOMATION"],
    imageClassName: "object-center",
  },
  {
    id: 4,
    image: "/images/AI-Lab-pic-5.png",
    title: "Section Property Calculator",
    titleLines: ["SECTION PROPERTY", "CALCULATOR"],
  },
  {
    id: 5,
    image: "/images/AI-Lab-pic-6.png",
    title: "EGBC Report Auditor",
    titleLines: ["EGBC REPORT", "AUDITOR"],
  },
  {
    id: 6,
    image: "/images/AI-Lab-pic-7.png",
    title: "Drawing Index Generator",
    titleLines: ["DRAWING INDEX", "GENERATOR"],
  },
]

function DesktopPlayBadge() {
  return (
    <div
      aria-hidden="true"
      className="absolute left-1/2 top-[38%] flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[rgba(245,236,236,0.72)]"
    >
      <div className="ml-[4px] h-0 w-0 border-b-[15px] border-l-[22px] border-t-[15px] border-b-transparent border-l-[#494242] border-t-transparent" />
    </div>
  )
}

function DesktopToolCard({
  tool,
  heightClass,
}: {
  tool: ToolCard
  heightClass: string
  showDescription?: boolean
}) {
  return (
    <article
      className={`group relative cursor-pointer overflow-hidden rounded-[20px] ${heightClass} transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_48px_rgba(0,0,0,0.4)]`}
      style={{ boxShadow: DESKTOP_CARD_SHADOW }}
    >
      <Image
        src={tool.image}
        alt={tool.title}
        fill
        className={`object-cover ${tool.imageClassName ?? "object-center"} transition-transform duration-500 group-hover:scale-[1.03]`}
        sizes="(min-width: 1024px) 951px, 100vw"
      />
      <div className="absolute inset-0" style={{ background: DESKTOP_CARD_GRADIENT }} />
      {/* Darker hover overlay */}
      <div className="absolute inset-0 bg-[#1a1a1a]/0 transition-all duration-300 group-hover:bg-[#1a1a1a]/40" />
      <DesktopPlayBadge />

      <div className="absolute inset-x-0 bottom-0 px-[29px] pb-[28px] pt-[24px] text-white">
        <h3 className={`font-semibold uppercase leading-[1.28] tracking-[0.14em] text-white ${heightClass === "h-[494px]" ? "text-[24px]" : "text-[15px]"}`}>
          {tool.titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h3>

        {tool.description ? (
          <p
            className="mt-[10px] max-w-[585px] leading-[1.42] tracking-[0.08em] text-white/92 max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-[120px] group-hover:opacity-100"
            style={{ fontSize: "14px" }}
          >
            {tool.description}
          </p>
        ) : null}

        <span className="mt-[18px] inline-flex h-[31px] translate-y-2 items-center rounded-full border border-white/80 px-[17px] text-[8.5px] uppercase tracking-[0.16em] text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          Watch Demo
        </span>
      </div>
    </article>
  )
}

export function AILabSection() {
  return (
    <>
      <section className="bg-[#FCFCFC] lg:hidden px-6 pb-0 pt-[88px]">

        {/* Label */}
        <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.22em] text-[#2D2D2D]">
          INNOVATION
        </p>

        {/* Heading */}
        <h1
          className="mb-5 text-[30px] font-black uppercase leading-[1.05] tracking-[0.04em]"
          style={{ fontFamily: "'Momo Trust Sans', 'Inter', sans-serif" }}
        >
          <span className="text-[#2D2D2D]">AI &amp; AUTOMATION</span>
          <br />
          <span className="text-[#0052A5]">LAB</span>
        </h1>

        {/* Body paragraphs */}
        <p className="mb-3 text-[11px] leading-[1.75] tracking-[0.07em] text-[#2D2D2D]">
          Where structural engineering meets artificial intelligence.
        </p>
        <p className="mb-3 text-[11px] leading-[1.75] tracking-[0.07em] text-[#2D2D2D]">
          Custom Python scripts, VBA automation, and AI-powered platforms that transform how engineering firms operate.
        </p>
        <p className="mb-7 text-[11px] leading-[1.75] tracking-[0.07em] text-[#2D2D2D]">
          Click any tool below to watch a demo clip.
        </p>

        {/* Hero image — overflows right intentionally */}
        <div className="relative -mr-6 h-[220px] overflow-hidden">
          <Image
            src="/images/AI-lab-pic-1.png"
            alt="Industrial engineering facility"
            fill
            className="object-cover object-left-bottom"
          />
        </div>

        {/* Thin black divider line below image */}
        <div className="h-px w-full bg-[#000000]" />
      </section>

      <section className="bg-[#FCFCFC] lg:hidden px-6 pb-12 pt-8">

        {/* Section heading */}
        <h2
          className="mb-3 text-[26px] font-black uppercase leading-[1.05] tracking-[0.04em] text-[#2D2D2D]"
          style={{ fontFamily: "'Momo Trust Sans', 'Inter', sans-serif" }}
        >
          ENGINEERING
          <br />
          SOFTWARE
          <br />
          TOOLS
        </h2>

        {/* Subtext */}
        <p className="mb-7 text-[11px] leading-[1.7] tracking-[0.07em] text-[#2D2D2D]">
          Click any tool to watch a 1–1.5 min demo.
        </p>

        {/* Large feature cards */}
        <div className="space-y-5">
          {largeTools.map((tool) => (
            <div key={tool.id} className="relative h-[220px] overflow-hidden rounded-[5px]">
              <Image
                src={tool.image}
                alt={tool.title}
                fill
                className="object-cover object-center"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0" style={{ background: CARD_GRADIENT }} />
              {/* Text — sits on its own solid dark base */}
              <div
                className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-10"
                style={{ background: "linear-gradient(180deg, transparent 0%, rgba(20,20,20,1) 40%)" }}
              >
                <h3 className="mb-1 text-[13px] font-semibold leading-tight tracking-[0.06em] text-white">
                  {tool.title}
                </h3>
                <p className="mb-3 text-[10px] leading-[1.6] tracking-[0.04em] text-white/90">
                  {tool.description}
                </p>
                <a
                  href="#"
                  className="inline-flex h-[34px] items-center rounded-full border border-white bg-transparent px-5 tracking-[0.1em] text-white" style={{ fontSize: "14px" }}
                >
                  Watch Demo
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* 2-column small cards grid */}
        <div className="mt-5 grid grid-cols-2 gap-4">
          {smallTools.map((tool) => (
            <div key={tool.id} className="relative overflow-hidden rounded-[5px]" style={{ height: 175 }}>
              <Image
                src={tool.image}
                alt={tool.title}
                fill
                className="object-cover object-center"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0" style={{ background: CARD_GRADIENT }} />
              {/* Text */}
              <div
                className="absolute bottom-0 left-0 right-0 px-3 pb-3 pt-8"
                style={{ background: "linear-gradient(180deg, transparent 0%, rgba(20,20,20,1) 45%)" }}
              >
                <h3 className="mb-2 text-[11px] font-semibold leading-tight tracking-[0.05em] text-white">
                  {tool.title}
                </h3>
                <a
                  href="#"
                  className="inline-flex h-[28px] items-center rounded-full border border-white bg-transparent px-3 text-[9px] tracking-[0.08em] text-white"
                >
                  Watch Demo
                </a>
              </div>
            </div>
          ))}
        </div>

      </section>

      <section className="hidden bg-[#FCFCFC] text-[#2D2D2D] lg:block">
        <div className="sidebar-content zag-desktop-content-start max-w-[951px] px-0 pb-[86px] pt-[148px]">
          <div className="relative pl-5">
            {/* Vertical fading line */}
            <div
              className="absolute left-0 top-[4px] bottom-0 w-[4px]"
              style={{ background: "linear-gradient(180deg, #0B0E0A 0%, rgba(150,150,150,0) 100%)" }}
            />

          <p className="mb-[14px] text-[20px] font-semibold uppercase tracking-[0.22em] text-[#2D2D2D]">
            INNOVATION
          </p>
          <h1
            className="text-[52px] font-bold uppercase leading-[0.96] tracking-[0.06em]"
            style={{ fontFamily: "'Momo Trust Sans', 'Inter', sans-serif" }}
          >
            <span className="text-[#2D2D2D]">AI &amp; AUTOMATION</span>
            <br />
            <span className="text-[#0052A5]">LAB</span>
          </h1>

          <p className="relative z-10 mt-[20px] leading-[1.52] tracking-[0.16em] text-[#2D2D2D]" style={{ fontSize: "18px" }}>
            Where structural engineering meets artificial intelligence.
          </p>
          <p className="relative z-10 mt-[16px] leading-[1.52] tracking-[0.16em] text-[#2D2D2D]" style={{ fontSize: "18px" }}>
            Custom Python scripts, VBA automation, and AI-powered platforms that<br />
            transform how engineering firms operate.
          </p>
          <p className="relative z-10 mt-[16px] leading-[1.52] tracking-[0.16em] text-[#2D2D2D]" style={{ fontSize: "18px" }}>
            Click any tool below to watch a demo clip.
          </p>
          </div>{/* end relative pl-5 */}

          <div
            className="pointer-events-none relative z-0 -mt-[145px] h-[595px] max-w-none overflow-hidden"
            style={{ width: "calc(50vw + 475.5px)" }}
          >
            <div className="absolute bottom-0 right-0">
              <Image
                src="/images/AI-lab-pic-1.png"
                alt="Industrial engineering facility"
                width={293}
                height={298}
                className="h-auto w-[820px] max-w-none object-contain object-right-bottom"
                sizes="820px"
              />
            </div>
          </div>
          <div className="mt-[40px] h-[3px] w-[1259px] bg-[#000000]" />

          <div className="pt-[80px]">
            <h2
              className="text-[32px] font-medium uppercase leading-none tracking-[0.22em] text-[#2D2D2D]"
              style={{ fontFamily: "'Momo Trust Sans', 'Inter', sans-serif" }}
            >
              ENGINEERING SOFTWARE TOOLS
            </h2>
            <p className="mt-[10px] leading-[1.45] tracking-[0.14em] text-[#2D2D2D]" style={{ fontSize: "16px" }}>
              Click any tool to watch a 1-1.5 min demo.
            </p>

            <div className="mt-[50px] space-y-[20px]">
              {largeTools.map((tool) => (
                <DesktopToolCard
                  key={tool.id}
                  tool={tool}
                  heightClass="h-[494px]"
                />
              ))}

              <div className="grid grid-cols-2 gap-[20px]">
                {smallTools.map((tool) => (
                  <DesktopToolCard
                    key={tool.id}
                    tool={tool}
                    heightClass="h-[381px]"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Desktop CTA ── */}
      <section className="hidden bg-[#FCFCFC] text-[#2D2D2D] lg:block">
        <div className="zag-desktop-content-pad pt-[30px] pb-[80px]">
          <h2
            className="text-[32px] uppercase leading-[1.1] tracking-[0.18em] text-[#2D2D2D]"
          >
            HAVE QUESTIONS ABOUT OUR AI TOOLS?
          </h2>
          <p className="mt-[18px] text-[16px] leading-[1.45] tracking-[0.14em] text-[#2D2D2D]">
            We'd love to show you how our automation tools can transform your workflow. Get in touch with us.
          </p>
          <a
            href="/contact"
            className="mt-[26px] inline-flex h-[40px] items-center rounded-full border border-[#2D2D2D]/50 px-[18px] text-[16px] tracking-[0.16em] text-[#2D2D2D] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white"
          >
            Contact Us
          </a>
        </div>
      </section>
    </>
  )
}
