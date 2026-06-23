export function AboutWhereWeWorkSection() {
  return (
    <section className="bg-[#FCFCFC] px-5 pb-14 pt-10 text-[#2D2D2D]">

      {/* Small label */}
      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#2D2D2D]"
        style={{ fontFamily: "'Inter', sans-serif" }}>
        WHERE WE WORK
      </p>

      {/* Main heading */}
      <h2
        className="mb-6 text-[28px] font-light uppercase leading-[1.15] tracking-[0.12em] text-[#2D2D2D]"
        style={{ fontFamily: "'Momo Trust Sans', 'Inter', sans-serif" }}
      >
        SERVING WESTERN
        <br />
        CANADA
      </h2>

      {/* Paragraph */}
      <p
        className="mb-8 text-[12px] leading-[1.85] tracking-[0.06em] text-[#2D2D2D]"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Zagrosia Engineering is licensed and insured to provide structural
        engineering services across{" "}
        <strong className="font-semibold">British Columbia</strong>,{" "}
        <strong className="font-semibold">Alberta</strong>, and{" "}
        <strong className="font-semibold">Saskatchewan</strong>. Our team is
        equipped to handle projects throughout these provinces.
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <a
          href="/contact"
          className="zag-outline-button min-h-[44px] flex-1 whitespace-nowrap border-[#2D2D2D] px-0 text-[10px] tracking-[0.18em] text-[#2D2D2D] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white"
        >
          Work with Us
        </a>
        <a
          href="/contact"
          className="zag-outline-button min-h-[44px] flex-1 whitespace-nowrap border-[#2D2D2D] px-0 text-[10px] tracking-[0.18em] text-[#2D2D2D] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white"
        >
          Get In Touch
        </a>
      </div>

    </section>
  )
}
