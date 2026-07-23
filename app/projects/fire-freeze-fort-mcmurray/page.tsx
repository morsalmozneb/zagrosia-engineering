"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { AboutPageHeader } from "@/components/about-page-header"
import { Footer } from "@/components/footer"
import { Reveal } from "@/components/scroll-reveal"

const EASE = [0.0, 0.0, 0.2, 1] as const

const scopeItems = [
  { label: "Primary Steel Framing", detail: "Design of main structural steel framework including columns, beams, and braced bays for gravity and lateral loads" },
  { label: "Crane Runway Design", detail: "Overhead crane runway girder, end stop, and tie-back design for specified crane capacity and duty cycle" },
  { label: "Equipment Foundation Pads", detail: "Reinforced concrete pads and anchor bolt design for all major mechanical and process equipment" },
  { label: "Pile Foundation Design", detail: "Driven steel pile design to bypass frost-susceptible soils and achieve code-compliant bearing capacity" },
  { label: "Drawing Package & Specifications", detail: "Full structural drawing set and specification for permit, procurement, and construction" },
]

const keyFacts = [
  { label: "Location", value: "Fort McMurray, AB" },
  { label: "Building Type", value: "Industrial Facility" },
  { label: "Services", value: "Industrial Structural Engineering" },
  { label: "Jurisdiction", value: "Municipality of Wood Buffalo" },
  { label: "Code", value: "NBCC 2020 / ABBC 2019" },
  { label: "Expertise", value: "P.Eng — British Columbia" },
]

export default function Page() {
  const reducedMotion = useReducedMotion()

  return (
    <main className="w-full overflow-hidden bg-[#FCFCFC] lg:overflow-visible">
      <div className="relative">
        <AboutPageHeader />

        {/* MOBILE HERO */}
        <div className="lg:hidden px-5 pb-14 pt-24">
          <Reveal variant="fadeUp" delay={0.02} duration={0.5}>
            <Link href="/projects" className="mb-6 inline-flex items-center gap-2 text-[10px] tracking-[0.14em] text-[#2D2D2D]/55 hover:text-[#0052A5] transition-colors">
              <svg width="12" height="9" viewBox="0 0 12 9" fill="none"><path d="M11 4.5H1M1 4.5L4.5 1M1 4.5L4.5 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              PROJECTS
            </Link>
          </Reveal>
          <Reveal variant="fadeUp" delay={0.05} duration={0.6}>
            <p className="mb-4 text-[10px] font-medium tracking-[0.14em] text-[#2D2D2D]">CASE STUDY</p>
          </Reveal>
          <div className="relative pl-[12px]">
            <motion.div
              className="absolute left-0 top-[8px] w-px"
              initial={reducedMotion ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.85, ease: "easeInOut" }}
              style={{ height: "calc(100% - 8px)", transformOrigin: "top", background: "linear-gradient(180deg, rgba(45,45,45,1) 0%, rgba(45,45,45,0.82) 38%, rgba(45,45,45,0.42) 72%, rgba(45,45,45,0) 100%)" }}
            />
            <Reveal variant="fadeLeft" delay={0.1} duration={0.7}>
              <h1 className="mb-5 text-[24px] font-black uppercase leading-[1.25] tracking-[0.12em]" style={{ fontFamily: "'Inter', sans-serif" }}>
                <span className="text-[#2D2D2D]">FIRE & FREEZE</span>
                <br />
                <span className="text-[#0052A5]">FORT MCMURRAY</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2} duration={0.65}>
              <div className="mb-3 inline-flex items-center gap-[5px] rounded-full bg-[#0052A5] px-[8px] py-[3px] text-[8px] tracking-[0.10em] text-white">
                <svg width="9" height="11" viewBox="0 0 11 13" fill="none"><path d="M5.5 12C5.5 12 9.5 8.3 9.5 4.9C9.5 2.75 7.71 1 5.5 1C3.29 1 1.5 2.75 1.5 4.9C1.5 8.3 5.5 12 5.5 12Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="5.5" cy="4.9" r="1.35" fill="white" /></svg>
                Fort McMurray, AB
              </div>
            </Reveal>
            <Reveal delay={0.25} duration={0.65}>
              <p className="mt-4 text-[12px] leading-[1.75] tracking-[0.08em] text-[#2D2D2D]">Structural engineering for a large-scale industrial facility with crane supports, equipment foundations, and reinforced steel systems designed for extreme northern climate conditions.</p>
            </Reveal>
          </div>
          <Reveal variant="fadeBlur" delay={0.15} duration={0.7}>
            <div className="relative mt-8 h-[220px] w-full overflow-hidden rounded-[16px]">
              <Image src="/images/Project-Card-3.png" alt="FIRE & FREEZE FORT MCMURRAY" fill className="object-cover object-center" />
            </div>
          </Reveal>
        </div>

        {/* DESKTOP HERO */}
        <div className="sidebar-content hidden lg:block">
          <div className="pb-[80px] pt-[148px] zag-desktop-content-pad">
            <div className="grid grid-cols-12 gap-x-[12px]">
              <div className="col-span-7">
                <div className="relative pl-5">
                  <motion.div
                    className="absolute left-0 top-[4px] bottom-0 w-[4px]"
                    initial={reducedMotion ? false : { scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: false, amount: 0.05 }}
                    transition={{ duration: 0.9, ease: "easeInOut" }}
                    style={{ transformOrigin: "top", background: "linear-gradient(180deg, #0B0E0A 0%, rgba(150,150,150,0) 100%)" }}
                  />
                  <Reveal variant="fadeUp" delay={0.02} duration={0.5}>
                    <Link href="/projects" className="mb-6 inline-flex items-center gap-2 text-[11px] tracking-[0.14em] text-[#2D2D2D]/50 hover:text-[#0052A5] transition-colors">
                      <svg width="13" height="10" viewBox="0 0 13 10" fill="none"><path d="M12 5H1M1 5L5 1M1 5L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      BACK TO PROJECTS
                    </Link>
                  </Reveal>
                  <Reveal variant="fadeUp" delay={0.05} duration={0.6}>
                    <p className="mb-[20px] text-[20px] font-bold uppercase tracking-[0.26em] text-[#2D2D2D]">CASE STUDY</p>
                  </Reveal>
                  <Reveal variant="fadeLeft" delay={0.1} duration={0.7}>
                    <h1 className="text-[52px] font-bold uppercase leading-[0.96] tracking-[0.06em]" style={{ fontFamily: "'Inter', sans-serif" }}>
                      <span className="mb-[8px] block text-[#2D2D2D]">FIRE & FREEZE</span>
                      <span className="block text-[#0052A5]">FORT MCMURRAY</span>
                    </h1>
                  </Reveal>
                  <Reveal delay={0.2} duration={0.65}>
                    <div className="mt-[18px] mb-[22px] inline-flex items-center gap-[5px] rounded-full bg-[#0052A5] px-[10px] py-[4px] text-[9px] tracking-[0.10em] text-white">
                      <svg width="10" height="12" viewBox="0 0 11 13" fill="none"><path d="M5.5 12C5.5 12 9.5 8.3 9.5 4.9C9.5 2.75 7.71 1 5.5 1C3.29 1 1.5 2.75 1.5 4.9C1.5 8.3 5.5 12 5.5 12Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="5.5" cy="4.9" r="1.35" fill="white" /></svg>
                      Fort McMurray, AB
                    </div>
                  </Reveal>
                  <Reveal delay={0.22} duration={0.65}>
                    <p className="leading-[1.5] tracking-[0.14em] text-[#2D2D2D]" style={{ fontSize: "18px" }}>Structural engineering for a large-scale industrial facility with crane supports, equipment foundations, and reinforced steel systems designed for extreme northern climate conditions.</p>
                  </Reveal>
                </div>
              </div>
              <div className="col-span-5 flex items-end">
                <Reveal variant="fadeBlur" delay={0.18} duration={0.75}>
                  <div className="relative w-full overflow-hidden rounded-[20px]" style={{ height: "340px" }}>
                    <Image src="/images/Project-Card-3.png" alt="FIRE & FREEZE FORT MCMURRAY" fill className="object-cover object-center" />
                    <div className="absolute inset-0 rounded-[20px]" style={{ background: "linear-gradient(180deg, transparent 60%, rgba(7,19,31,0.18) 100%)" }} />
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>

        {/* PROJECT OVERVIEW */}
        <section className="bg-[#FCFCFC] pt-[48px] pb-[60px]">
          <div className="sidebar-content zag-desktop-content-pad px-5">
            <div className="mx-auto max-w-[860px]">
              <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-14">
                <div>
                  <Reveal variant="fadeLeft" delay={0.05} duration={0.7}>
                    <h2 className="zag-heading mb-8 text-[30px] leading-none tracking-[0.12em] text-[#2D2D2D]">PROJECT OVERVIEW</h2>
                  </Reveal>
                  <Reveal variant="fadeUp" delay={0.12}>
                    <p className="mb-5 leading-[1.65] tracking-[0.08em] text-[#2D2D2D]" style={{ fontSize: "16px" }}>This project provided structural engineering services for a major industrial facility in Fort McMurray, Alberta — a region defined by extreme temperature swings, permafrost-adjacent conditions, and heavy industrial loading demands. The facility required robust steel framing, equipment pad foundations, and overhead crane support structures.</p>
                  </Reveal>
                  <Reveal variant="fadeUp" delay={0.18}>
                    <p className="leading-[1.65] tracking-[0.08em] text-[#2D2D2D]" style={{ fontSize: "16px" }}>Zagrosia Engineering delivered full structural design from concept through construction, including detailed drawings, specifications, and construction-phase review services. Special attention was given to material selection and connection detailing suited to the extreme northern climate.</p>
                  </Reveal>
                </div>
                <Reveal variant="fadeBlur" delay={0.2}>
                  <div className="mt-10 lg:mt-0 rounded-[20px] p-px" style={{ background: "linear-gradient(135deg, rgba(45,45,45,1) 0%, rgba(45,45,45,0.56) 26%, rgba(147,147,147,0.22) 100%)" }}>
                    <div className="w-full h-full rounded-[19px] bg-[#FCFCFC] p-[22px]" style={{ boxShadow: "0 4px 19.6px 0px rgba(0,0,0,0.34)", backdropFilter: "blur(61.5px)", WebkitBackdropFilter: "blur(61.5px)" }}>
                      <p className="mb-5 text-[14px] font-bold tracking-[0.22em] text-[#2D2D2D]">PROJECT DETAILS</p>
                      <ul className="space-y-4">
                        {keyFacts.map((fact) => (
                          <li key={fact.label} className="flex flex-col gap-[3px]">
                            <span className="text-[10px] font-semibold tracking-[0.16em] text-[#2D2D2D]/45 uppercase">{fact.label}</span>
                            <span className="text-[14px] tracking-[0.08em] text-[#2D2D2D] font-medium">{fact.value}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* THE CHALLENGE */}
        <section className="bg-[#FCFCFC] pb-[60px]">
          <div className="sidebar-content zag-desktop-content-pad px-5">
            <div className="mx-auto max-w-[860px]">
              <div className="h-px w-full bg-[#2D2D2D]/10 mb-[48px]" />
              <Reveal variant="fadeLeft" delay={0.05} duration={0.7}>
                <h2 className="zag-heading mb-8 text-[30px] leading-none tracking-[0.12em] text-[#2D2D2D]">THE CHALLENGE</h2>
              </Reveal>
              <div className="lg:grid lg:grid-cols-2 lg:gap-12">
                <Reveal variant="fadeUp" delay={0.12}>
                  <p className="mb-6 lg:mb-0 leading-[1.65] tracking-[0.08em] text-[#2D2D2D]" style={{ fontSize: "16px" }}>Fort McMurray's climate presents unique engineering challenges: winter temperatures below -40°C demand low-temperature steel grades and cold-weather welding procedures, while summer heat and wildfire risk required fire-rated construction assemblies and defensible space considerations in the structural framing.</p>
                </Reveal>
                <Reveal variant="fadeUp" delay={0.18}>
                  <p className="leading-[1.65] tracking-[0.08em] text-[#2D2D2D]" style={{ fontSize: "16px" }}>The facility's heavy crane loads and dynamic equipment vibrations required careful analysis of column stiffness, base plate design, and foundation anchorage to prevent fatigue failures and maintain operational tolerances over the facility's design life.</p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ENGINEERING APPROACH */}
        <section className="bg-[#FCFCFC] pb-[60px]">
          <div className="sidebar-content zag-desktop-content-pad px-5">
            <div className="mx-auto max-w-[860px]">
              <div className="h-px w-full bg-[#2D2D2D]/10 mb-[48px]" />
              <Reveal variant="fadeLeft" delay={0.05} duration={0.7}>
                <h2 className="zag-heading mb-8 text-[30px] leading-none tracking-[0.12em] text-[#2D2D2D]">ENGINEERING APPROACH</h2>
              </Reveal>
              <div className="lg:grid lg:grid-cols-3 lg:gap-5">
                {[
                  { step: "01", title: "Climate-Adapted Design", body: "Structural steel specified to CSA G40.21 Grade 350W with low-temperature Charpy impact toughness requirements. All welded connections designed for cold-weather procedures and post-weld inspection." },
                  { step: "02", title: "Crane & Equipment Support", body: "Overhead crane runway beams and columns designed for dynamic crane loads including impact factors, lateral thrust, and longitudinal braking forces per CISC crane loading criteria." },
                  { step: "03", title: "Foundation Design", body: "Deep pile foundations designed to transfer loads below the active frost zone, with pile caps and grade beams accommodating differential frost heave and equipment vibration isolation." }
                ].map((item, i) => (
                  <motion.div
                    key={item.step}
                    initial={reducedMotion ? false : { opacity: 0, y: 20, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{ duration: 0.65, delay: 0.1 + i * 0.12, ease: EASE }}
                    className="mb-5 lg:mb-0 rounded-[20px] p-px"
                    style={{ background: "linear-gradient(135deg, rgba(45,45,45,1) 0%, rgba(45,45,45,0.56) 26%, rgba(147,147,147,0.22) 100%)" }}
                  >
                    <div className="w-full h-full rounded-[19px] bg-[#FCFCFC] p-[22px]" style={{ boxShadow: "0 4px 19.6px 0px rgba(0,0,0,0.34)", backdropFilter: "blur(61.5px)", WebkitBackdropFilter: "blur(61.5px)", minHeight: "200px" }}>
                      <span className="mb-4 block font-black leading-none" style={{ fontSize: "36px", color: "#0052A5" }}>{item.step}</span>
                      <p className="mb-3 text-[14px] font-bold tracking-[0.14em] text-[#2D2D2D] uppercase">{item.title}</p>
                      <p className="leading-[1.65] tracking-[0.08em] text-[#2D2D2D]/75" style={{ fontSize: "14px" }}>{item.body}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SCOPE OF WORK */}
        <section className="bg-[#FCFCFC] pb-[60px]">
          <div className="sidebar-content zag-desktop-content-pad px-5">
            <div className="mx-auto max-w-[860px]">
              <div className="h-px w-full bg-[#2D2D2D]/10 mb-[48px]" />
              <Reveal variant="fadeLeft" delay={0.05} duration={0.7}>
                <h2 className="zag-heading mb-8 text-[30px] leading-none tracking-[0.12em] text-[#2D2D2D]">SCOPE OF WORK</h2>
              </Reveal>
              <div className="space-y-3">
                {scopeItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={reducedMotion ? false : { opacity: 0, y: 16, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{ duration: 0.55, delay: 0.08 + i * 0.08, ease: EASE }}
                    className="rounded-[20px] p-px"
                    style={{ background: "linear-gradient(135deg, rgba(45,45,45,1) 0%, rgba(45,45,45,0.56) 26%, rgba(147,147,147,0.22) 100%)" }}
                  >
                    <div className="flex items-start gap-4 rounded-[19px] bg-[#FCFCFC] px-6 py-5" style={{ boxShadow: "0 4px 19.6px 0px rgba(0,0,0,0.34)", backdropFilter: "blur(61.5px)", WebkitBackdropFilter: "blur(61.5px)" }}>
                      <span className="mt-[3px] flex h-[24px] w-[24px] flex-shrink-0 items-center justify-center rounded-full bg-[#0052A5]">
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </span>
                      <div>
                        <p className="mb-[4px] text-[14px] font-semibold tracking-[0.10em] text-[#2D2D2D]">{item.label}</p>
                        <p className="leading-[1.65] tracking-[0.08em] text-[#2D2D2D]/65" style={{ fontSize: "14px" }}>{item.detail}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* OUTCOME */}
        <section className="bg-[#FCFCFC] pb-[60px]">
          <div className="sidebar-content zag-desktop-content-pad px-5">
            <div className="mx-auto max-w-[860px]">
              <div className="h-px w-full bg-[#2D2D2D]/10 mb-[48px]" />
              <Reveal variant="fadeLeft" delay={0.05} duration={0.7}>
                <h2 className="zag-heading mb-8 text-[30px] leading-none tracking-[0.12em] text-[#2D2D2D]">OUTCOME</h2>
              </Reveal>
              <Reveal variant="fadeBlur" delay={0.12}>
                <div className="rounded-[20px] p-px" style={{ background: "linear-gradient(135deg, #0052A5 0%, #003d7a 100%)" }}>
                  <div className="rounded-[19px] px-8 py-10" style={{ background: "linear-gradient(135deg, #0052A5 0%, #003d7a 100%)" }}>
                    <p className="mb-3 text-[14px] font-bold tracking-[0.22em] text-white/70">OPERATIONAL & CLIMATE-READY</p>
                    <p className="leading-[1.65] tracking-[0.08em] text-white/85" style={{ fontSize: "16px" }}>The completed facility met all operational requirements for crane capacity, equipment installation, and thermal performance in the northern Alberta climate. The structure achieved permit approval and passed all inspections, and has operated without structural issues since commissioning.</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="bg-[#FCFCFC] pb-[98px]">
          <div className="sidebar-content zag-desktop-content-pad px-5">
            <div className="mx-auto max-w-[860px]">
              <div className="h-px w-full bg-[#2D2D2D]/10 mb-[78px]" />
              <div className="lg:hidden">
                <Reveal variant="fadeUp" delay={0.05} duration={0.6}>
                  <p className="mb-3 text-[10px] font-medium tracking-[0.14em] text-[#2D2D2D]">START YOUR PROJECT</p>
                </Reveal>
                <Reveal variant="fadeLeft" delay={0.1} duration={0.7}>
                  <h2 className="mb-6 uppercase leading-[1.15] tracking-[0.12em] text-[#2D2D2D]" style={{ fontSize: "20px", fontWeight: 600 }}>
                    DO YOU WANT TO START YOUR PROJECT?
                  </h2>
                </Reveal>
                <Reveal delay={0.2} duration={0.65}>
                  <p className="mb-8 leading-[1.85] tracking-[0.06em] text-[#2D2D2D]" style={{ fontSize: "12px" }}>
                    Every project is unique. Contact us to discuss your specific requirements, and discover how we can help.
                  </p>
                </Reveal>
                <div className="flex gap-[15px]">
                  <Reveal variant="scaleUp" delay={0.28} duration={0.55}>
                    <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-[#2D2D2D] text-[#2D2D2D] font-medium tracking-[0.1em] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white h-[40px] px-5 text-[11px]">Request a Service</Link>
                  </Reveal>
                  <Reveal variant="scaleUp" delay={0.38} duration={0.55}>
                    <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-[#2D2D2D] text-[#2D2D2D] font-medium tracking-[0.1em] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white h-[40px] px-5 text-[11px]">Get In Touch</Link>
                  </Reveal>
                </div>
              </div>
              <div className="hidden lg:block">
                <Reveal variant="fadeLeft" delay={0.05} duration={0.7}>
                  <h2 className="text-[32px] uppercase leading-[1.1] tracking-[0.18em] text-[#2D2D2D]">DO YOU WANT TO START YOUR PROJECT?</h2>
                </Reveal>
                <Reveal delay={0.18} duration={0.65}>
                  <p className="mt-[18px] text-[16px] leading-[1.45] tracking-[0.14em] text-[#2D2D2D]">
                    Every project is unique. Contact us to discuss your specific requirements, and discover how we can help.
                  </p>
                </Reveal>
                <Reveal variant="scaleUp" delay={0.28} duration={0.55} className="mt-7">
                  <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-[#2D2D2D] text-[#2D2D2D] font-medium tracking-[0.1em] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white h-[44px] px-7 text-[14px]">
                    Request a Service
                  </Link>
                </Reveal>
              </div>
              <div className="mt-14">
                <div className="h-px w-full mb-8" style={{ background: "rgba(45,45,45,0.1)" }} />
                <Link href="/projects" style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "11px", letterSpacing: "0.14em", color: "rgba(45,45,45,0.5)", textDecoration: "none" }}>
                  <svg width="13" height="10" viewBox="0 0 13 10" fill="none"><path d="M12 5H1M1 5L5 1M1 5L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  BACK TO PROJECTS
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
