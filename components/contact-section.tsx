"use client"

import { useState } from "react"

const services = [
  "Structural Design",
  "Seismic Assessment",
  "Rehabilitation",
  "Racking Systems",
  "Building Envelope",
  "Specialty Reviews",
  "AI Automation",
  "EGBC Exam Prep",
]

const contactItems = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6.5 2H3.5C2.67 2 2 2.67 2 3.5C2 12.06 8.94 19 17.5 19C18.33 19 19 18.33 19 17.5V14.5C19 13.67 18.33 13 17.5 13C16.48 13 15.49 12.84 14.57 12.54C14.24 12.43 13.88 12.51 13.63 12.76L11.87 14.52C9.41 13.27 7.73 11.59 6.48 9.13L8.24 7.37C8.49 7.12 8.57 6.76 8.46 6.43C8.16 5.51 8 4.52 8 3.5C8 2.67 7.33 2 6.5 2Z"
          fill="white"
        />
      </svg>
    ),
    label: "Phone",
    value: "+1 (778) 317-1043",
    href: "tel:+17783171043",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M17 3H3C2.45 3 2 3.45 2 4V16C2 16.55 2.45 17 3 17H17C17.55 17 18 16.55 18 16V4C18 3.45 17.55 3 17 3ZM16 6.41L10.71 11.7C10.32 12.09 9.69 12.09 9.3 11.7L4 6.41V5H16V6.41Z"
          fill="white"
        />
      </svg>
    ),
    label: "Email",
    value: "shmozneb@zagrosia.ca",
    href: "mailto:shmozneb@zagrosia.ca",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10 2C5.58 2 2 5.58 2 10C2 14.42 5.58 18 10 18C14.42 18 18 14.42 18 10C18 5.58 14.42 2 10 2ZM9 16.93C5.6 16.45 3 13.52 3 10C3 9.62 3.04 9.25 3.1 8.89L7 12.79V13.5C7 14.33 7.67 15 8.5 15V16.93H9ZM15.9 14.39C15.64 13.58 14.9 13 14 13H13.5V11C13.5 10.58 13.17 10.25 12.75 10.25H7.5V8.75H9C9.42 8.75 9.75 8.42 9.75 8V6.5H11.25C12.08 6.5 12.75 5.83 12.75 5V4.71C14.93 5.59 16.5 7.62 16.5 10C16.5 11.57 15.89 12.99 14.9 14.07L15.9 14.39Z"
          fill="white"
        />
      </svg>
    ),
    label: "Website",
    value: "www.zagrosia.ca",
    href: "https://www.zagrosia.ca",
  },
]

export function ContactSection() {
  const [selectedService, setSelectedService] = useState("Structural Design")
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <section className="bg-[#FCFCFC] text-[#2D2D2D]">
      <div className="lg:hidden px-5 pb-14 pt-24">

        {/* Label */}
        <p className="mb-4 text-[10px] font-medium tracking-[0.14em] text-[#2D2D2D]">GET IN TOUCH</p>

        {/* Vertical line + heading + body */}
        <div className="relative pl-[12px] mb-8">
          <div
            className="absolute left-0 top-[8px] w-px"
            style={{
              height: "calc(100% - 8px)",
              background: "linear-gradient(180deg, rgba(45,45,45,1) 0%, rgba(45,45,45,0.82) 38%, rgba(45,45,45,0.42) 72%, rgba(45,45,45,0) 100%)",
            }}
          />
          <h1
            className="mb-5 text-[24px] font-black uppercase leading-[1.25] tracking-[0.12em]"
            style={{ fontFamily: "'Momo Trust Sans', 'Inter', sans-serif" }}
          >
            <span className="text-[#2D2D2D]">START YOUR</span>
            <br />
            <span className="text-[#0052A5]">PROJECT TODAY</span>
          </h1>
          <p className="text-[12px] leading-[1.75] tracking-[0.08em] text-[#2D2D2D]">
            Whether you need structural design, building assessment, custom automation tools, or EGBC exam prep, we&apos;re ready. Let&apos;s build something exceptional.
          </p>
        </div>

        <div className="mb-10 rounded-[20px] bg-[#FCFCFC] px-5 py-5"
          style={{
            boxShadow: "0px 4px 19.6px 0px rgba(0,0,0,0.34)",
            backdropFilter: "blur(61.5px)",
            WebkitBackdropFilter: "blur(61.5px)",
          }}
        >

        {/* Your Name */}
        <div className="mb-4">
          <label className="mb-1 block text-[11px] font-semibold tracking-[0.08em] text-[#2D2D2D]">
            Your Name <span className="text-[#0052A5]">*</span>
          </label>
          <input
            type="text"
            placeholder="John Smith"
            className="w-full rounded-[5px] border border-[#D8D8D8] bg-white px-3 py-2.5 text-[11px] tracking-[0.05em] text-[#2D2D2D] placeholder-[#BBBBBB] outline-none focus:border-[#0052A5] focus:ring-1 focus:ring-[#0052A5]"
          />
        </div>

        {/* Email Address */}
        <div className="mb-4">
          <label className="mb-1 block text-[11px] font-semibold tracking-[0.08em] text-[#2D2D2D]">
            Email Address <span className="text-[#0052A5]">*</span>
          </label>
          <input
            type="email"
            placeholder="John@gmail.com"
            className="w-full rounded-[5px] border border-[#D8D8D8] bg-white px-3 py-2.5 text-[11px] tracking-[0.05em] text-[#2D2D2D] placeholder-[#BBBBBB] outline-none focus:border-[#0052A5] focus:ring-1 focus:ring-[#0052A5]"
          />
        </div>

        {/* Service Needed — custom dropdown */}
        <div className="mb-4">
          <label className="mb-1 block text-[11px] font-semibold tracking-[0.08em] text-[#2D2D2D]">
            Service Needed
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex w-full items-center justify-between rounded-[5px] border border-[#D8D8D8] bg-white px-3 py-2.5 text-left text-[11px] tracking-[0.05em] text-[#2D2D2D] outline-none focus:border-[#0052A5]"
            >
              <span>{selectedService}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
              >
                <path d="M4 6L8 10L12 6" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 right-0 top-full z-10 mt-1 rounded-[5px] border border-[#D8D8D8] bg-white shadow-md">
                {services.map((service) => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => {
                      setSelectedService(service)
                      setDropdownOpen(false)
                    }}
                    className={`block w-full px-3 py-2.5 text-left text-[11px] tracking-[0.05em] hover:bg-[#F5F7FA] ${
                      service === selectedService ? "font-semibold text-[#0052A5]" : "text-[#2D2D2D]"
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Project Details */}
        <div>
          <label className="mb-1 block text-[11px] font-semibold tracking-[0.08em] text-[#2D2D2D]">
            Project Details
          </label>
          <textarea
            placeholder="Briefly describe your project or journey..."
            rows={5}
            className="w-full resize-none rounded-[5px] border border-[#D8D8D8] bg-white px-3 py-2.5 text-[11px] tracking-[0.05em] text-[#2D2D2D] placeholder-[#BBBBBB] outline-none focus:border-[#0052A5] focus:ring-1 focus:ring-[#0052A5]"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-5 inline-flex h-[48px] w-full items-center justify-center rounded-full bg-[#0052A5] font-semibold tracking-[0.14em] text-white transition-colors hover:bg-[#94B8DC]"
          style={{ fontSize: "14px" }}
        >
          Send Message
        </button>
        </div>

        <p className="mb-3 text-[10px] font-medium tracking-[0.14em] text-[#2D2D2D]">CONTACT INFO</p>

        <div className="space-y-[8px]">
          {contactItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-4 rounded-[20px] bg-[#0052A5] px-5 py-4 transition-colors hover:bg-[#003f82]"
            >
              <div className="flex h-[36px] w-[36px] flex-shrink-0 items-center justify-center rounded-full bg-white/15">
                {item.icon}
              </div>
              <div>
                <p className="text-[11px] font-semibold tracking-[0.1em] text-white">{item.label}</p>
                <p className="text-[10px] tracking-[0.07em] text-white/80">{item.value}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="sidebar-content hidden lg:block">
        <div className="w-full pt-[148px] pb-20 zag-desktop-content-pad">
          {/* Header */}
          <div className="mb-10">
            <div className="relative pl-5">
              {/* Vertical fading line */}
              <div
                className="absolute left-0 top-[4px] bottom-0 w-[4px]"
                style={{ background: "linear-gradient(180deg, #0B0E0A 0%, rgba(150,150,150,0) 100%)" }}
              />
              <p className="mb-[20px] text-[20px] font-bold uppercase tracking-[0.24em] text-[#2D2D2D]">
                GET IN TOUCH
              </p>
              <h1
                className="text-[52px] font-bold uppercase leading-[0.96] tracking-[0.06em]"
                style={{ fontFamily: "'Momo Trust Sans', 'Inter', sans-serif" }}
              >
                <span className="mb-[8px] block text-[#2D2D2D]">START YOUR PROJECT</span>
                <span className="block text-[#0052A5]">TODAY</span>
              </h1>
              <p className="mt-5 max-w-[700px] leading-[1.6] tracking-[0.08em] text-[#2D2D2D]" style={{ fontSize: "18px" }}>
                Whether you need structural design, building assessment, custom automation tools, or EGBC exam prep, we&apos;re ready. Let&apos;s build something exceptional.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-[20px] bg-[#FCFCFC] px-8 py-8 mb-8" style={{ boxShadow: "0px 4px 19.6px 0px rgba(0,0,0,0.34)", backdropFilter: "blur(61.5px)", WebkitBackdropFilter: "blur(61.5px)" }}>
            <div className="grid grid-cols-2 gap-5 mb-5">
              <div>
                <label className="mb-2 block text-[14px] font-semibold tracking-[0.08em] text-[#2D2D2D]">
                  Your Name <span className="text-[#0052A5]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="John Smith"
                  className="w-full rounded-[8px] border border-[#D8D8D8] bg-white px-4 py-3 text-[14px] tracking-[0.05em] text-[#2D2D2D] placeholder-[#BBBBBB] outline-none focus:border-[#0052A5] focus:ring-1 focus:ring-[#0052A5]"
                />
              </div>
              <div>
                <label className="mb-2 block text-[14px] font-semibold tracking-[0.08em] text-[#2D2D2D]">
                  Email Address <span className="text-[#0052A5]">*</span>
                </label>
                <input
                  type="email"
                  placeholder="john@gmail.com"
                  className="w-full rounded-[8px] border border-[#D8D8D8] bg-white px-4 py-3 text-[14px] tracking-[0.05em] text-[#2D2D2D] placeholder-[#BBBBBB] outline-none focus:border-[#0052A5] focus:ring-1 focus:ring-[#0052A5]"
                />
              </div>
            </div>

            <div className="mb-5">
              <label className="mb-2 block text-[14px] font-semibold tracking-[0.08em] text-[#2D2D2D]">
                Service Needed
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex w-full items-center justify-between rounded-[8px] border border-[#D8D8D8] bg-white px-4 py-3 text-left text-[14px] tracking-[0.05em] text-[#2D2D2D] outline-none focus:border-[#0052A5]"
                >
                  <span>{selectedService}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                  >
                    <path d="M4 6L8 10L12 6" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {dropdownOpen && (
                  <div className="absolute left-0 right-0 top-full z-10 mt-1 rounded-[8px] border border-[#D8D8D8] bg-white shadow-md">
                    {services.map((service) => (
                      <button
                        key={service}
                        type="button"
                        onClick={() => {
                          setSelectedService(service)
                          setDropdownOpen(false)
                        }}
                        className={`block w-full px-4 py-3 text-left text-[14px] tracking-[0.05em] hover:bg-[#F5F7FA] ${
                          service === selectedService ? "font-semibold text-[#0052A5]" : "text-[#2D2D2D]"
                        }`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mb-5">
              <label className="mb-2 block text-[14px] font-semibold tracking-[0.08em] text-[#2D2D2D]">
                Project Details
              </label>
              <textarea
                placeholder="Briefly describe your project or journey..."
                rows={5}
                className="w-full resize-none rounded-[8px] border border-[#D8D8D8] bg-white px-4 py-3 text-[14px] tracking-[0.05em] text-[#2D2D2D] placeholder-[#BBBBBB] outline-none focus:border-[#0052A5] focus:ring-1 focus:ring-[#0052A5]"
              />
            </div>

            <button
              type="submit"
              className="inline-flex h-[40px] items-center rounded-full bg-[#0052A5] px-[24px] font-semibold tracking-[0.14em] text-white transition-colors hover:bg-[#94B8DC]"
              style={{ fontSize: "16px" }}
            >
              Send Message
            </button>
          </div>

          {/* Contact Info */}
          <div>
            <h2
              className="mb-5 text-[20px] font-bold uppercase leading-[1.25] tracking-[0.14em] text-[#2D2D2D]"
              style={{ fontFamily: "'Momo Trust Sans', 'Inter', sans-serif" }}
            >
              CONTACT INFO
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {contactItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-4 rounded-[12px] bg-[#0052A5] px-5 py-5 transition-colors hover:bg-[#94B8DC]"
                >
                  <div className="flex h-[42px] w-[42px] flex-shrink-0 items-center justify-center rounded-full bg-white/15">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[14px] font-bold tracking-[0.1em] text-white">{item.label}</p>
                    <p className="mt-1 text-[12px] tracking-[0.08em] text-white/80">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
