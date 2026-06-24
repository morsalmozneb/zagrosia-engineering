export function AboutWhereWeWorkSection() {
  return (
    <section className="bg-[#FCFCFC] px-5 pb-14 pt-10 text-[#2D2D2D]">

      {/* Small label — same style as "WHO WE ARE" in hero */}
      <p className="mb-3 text-[10px] font-medium tracking-[0.14em] text-[#2D2D2D]">
        WHERE WE WORK
      </p>

      {/* Main heading */}
      <h2
        className="mb-6 uppercase leading-[1.15] tracking-[0.12em] text-[#2D2D2D]"
        style={{ fontSize: "20px", fontWeight: 600, fontFamily: "'Momo Trust Sans', 'Inter', sans-serif" }}
      >
        SERVING WESTERN CANADA
      </h2>

      {/* Paragraph */}
      <p
        className="mb-8 leading-[1.85] tracking-[0.06em] text-[#2D2D2D]"
        style={{ fontSize: "12px" }}
      >
        Zagrosia Engineering is licensed and insured to provide structural
        engineering services across{" "}
        <strong className="font-semibold">British Columbia</strong>,{" "}
        <strong className="font-semibold">Alberta</strong>, and{" "}
        <strong className="font-semibold">Saskatchewan</strong>. Our team is
        equipped to handle projects throughout these provinces.
      </p>

      {/* Buttons — same spec as View Resume / Contact in Profile section */}
      <div className="flex justify-start gap-[15px]">
        <a
          href="/contact"
          className="inline-flex items-center justify-center rounded-full border border-[#2D2D2D] tracking-[0.06em] text-[#2D2D2D] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white"
          style={{ fontSize: "9.5px", width: "142px", height: "40px" }}
        >
          Work with Us
        </a>
        <a
          href="/contact"
          className="inline-flex items-center justify-center rounded-full border border-[#2D2D2D] tracking-[0.06em] text-[#2D2D2D] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white"
          style={{ fontSize: "9.5px", width: "142px", height: "40px" }}
        >
          Get In Touch
        </a>
      </div>

    </section>
  )
}
