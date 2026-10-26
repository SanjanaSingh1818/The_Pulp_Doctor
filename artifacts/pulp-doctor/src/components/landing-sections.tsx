import { useEffect, useRef, useState } from "react";
import {
  Activity,
  ArrowRight,
  Baby,
  Check,
  HeartHandshake,
  HeartPulse,
  Menu,
  MessageCircle,
  MoveUpRight,
  ScanLine,
  ShieldCheck,
  Smile,
  Sparkles,
  Stethoscope,
  WandSparkles,
  X,
  ArrowUp,
} from "lucide-react";
import { Link } from "wouter";

const configuredWhatsappNumber = (import.meta.env.VITE_WHATSAPP_NUMBER || "919953730405").replace(/\D/g, "");
const whatsappNumber = /^\d{8,15}$/.test(configuredWhatsappNumber) ? configuredWhatsappNumber : "";
const whatsappUrl = whatsappNumber
  ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Dr. Charu, I would like to enquire about an appointment.")}`
  : null;

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function ToothArtwork() {
  return (
    <svg
      className="hero-tooth"
      viewBox="0 0 360 440"
      fill="none"
      role="img"
      aria-label="Illustration of a tooth"
    >
      <defs>
        <linearGradient
          id="toothBody"
          x1="75"
          y1="44"
          x2="285"
          y2="389"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset=".48" stopColor="#e7f3f1" />
          <stop offset="1" stopColor="#9ccac4" />
        </linearGradient>
        <linearGradient
          id="toothShade"
          x1="183"
          y1="152"
          x2="287"
          y2="374"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6eb7ae" stopOpacity="0" />
          <stop offset="1" stopColor="#246c73" stopOpacity=".56" />
        </linearGradient>
        <filter
          id="toothShadow"
          x="10"
          y="8"
          width="340"
          height="430"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feGaussianBlur stdDeviation="17" />
        </filter>
      </defs>
      <ellipse
        cx="180"
        cy="397"
        rx="116"
        ry="20"
        fill="#071f36"
        fillOpacity=".36"
        filter="url(#toothShadow)"
      />
      <path
        d="M180 56c-31-29-99-19-121 20-26 46-1 103 10 148 13 54 18 119 47 161 15 22 31 16 41-9 13-35 16-92 34-92s21 57 34 92c10 25 26 31 41 9 29-42 34-107 47-161 11-45 36-102 10-148-22-39-90-49-121-20Z"
        fill="url(#toothBody)"
        stroke="#fff"
        strokeWidth="7"
      />
      <path
        d="M180 56c31-29 99-19 121 20 26 46 1 103-10 148-13 54-18 119-47 161-15 22-31 16-41-9-13-35-16-92-34-92V56Z"
        fill="url(#toothShade)"
      />
      <path
        d="M92 115c15-30 48-43 77-35"
        stroke="#fff"
        strokeOpacity=".9"
        strokeWidth="11"
        strokeLinecap="round"
      />
      <path
        d="M111 177c12-18 30-27 50-29"
        stroke="#fff"
        strokeOpacity=".55"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Brand() {
  return (
    <Link href="/" className="brand-mark" aria-label="The Pulp Doctor home">
      <img src={`${import.meta.env.BASE_URL}logo.jpeg`} alt="The Pulp Doctor" />
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const links = [
    ["About", "/#about"],
    ["Treatments", "/#care"],
    ["Locations", "/#locations"],
    ["For dentists", "/refer-a-patient"],
    ["Contact", "/#contact"],
    ["Book appointment", "/#book"],
  ];
  return (
    <>
      <div className="topline px-5 py-2 text-center">
        Specialist dental care across Delhi NCR
      </div>
      <header className="site-header">
        <div className="header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map(([label, href]) =>
              href === "/refer-a-patient" ? (
                <Link className="nav-link" key={label} href={href}>
                  {label}
                </Link>
              ) : (
                <a
                  className={
                    label === "Book appointment"
                      ? "btn-primary !px-5 !py-2.5 text-sm"
                      : "nav-link"
                  }
                  key={label}
                  href={href}
                >
                  {label}
                  {label === "Book appointment" && <ArrowRight size={15} />}
                </a>
              ),
            )}
          </nav>
          <button
            className="menu-toggle"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            data-testid="button-mobile-menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {open && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {links.map(([label, href]) =>
              href === "/refer-a-patient" ? (
                <Link key={label} href={href} onClick={() => setOpen(false)}>
                  {label}
                </Link>
              ) : (
                <a key={label} href={href} onClick={() => setOpen(false)}>
                  {label}
                </a>
              ),
            )}
          </nav>
        )}
      </header>
    </>
  );
}

export function HeroSection() {
  return (
    <section className="hero px-5">
      <div className="hero-grid relative z-10 mx-auto grid min-h-[615px] max-w-[1160px] items-center gap-12 py-14 md:grid-cols-[1.12fr_.88fr]">
        <Reveal className="hero-portrait-wrap relative mx-auto w-full max-w-[425px] md:order-2">
          <div className="absolute -right-8 -top-7 h-32 w-32 rounded-full border border-[#9bc8c5]/70" />
          <div className="portrait-placeholder relative aspect-[.83] overflow-hidden rounded-t-[48%] rounded-b-[2rem] border-[10px] border-white/75 shadow-[0_24px_55px_rgba(31,76,83,.16)]">
            <img
              className="hero-portrait-image"
              src={`${import.meta.env.BASE_URL}drcharu.jpeg`}
              alt="Dr Charu Makhija"
              fetchPriority="high"
            />
          </div>
          <div className="hero-experience absolute -bottom-5 -left-4 rounded-2xl border border-[#d9e8e7] bg-white px-5 py-4 shadow-lg sm:-left-10">
            <div className="serif text-3xl text-[#1c6570]">15+</div>
            <div className="text-[.68rem] font-semibold uppercase tracking-wider text-[#627a81]">
              years of experience
            </div>
          </div>
        </Reveal>
        <Reveal className="fade-up md:order-1">
          <p className="eyebrow flex items-center gap-2">
            <span className="h-px w-7 bg-[#39867f]" /> Specialist dental care · Delhi NCR
          </p>
          <h1 className="serif mt-6 max-w-[730px] text-[clamp(3.5rem,7.4vw,6.4rem)] leading-[.88] tracking-[-.025em] text-[#153d50]">
            Dr. Charu <em className="text-[#267d79]">Makhija</em>
          </h1>
          <p className="mt-7 max-w-[500px] text-lg leading-8 text-[#506c77]">
            Restorative Dentist &amp; Root Canal Specialist<br />
            <span className="text-base font-semibold text-[#267d79]">15+ Years of Clinical Experience · Clinician · Educator</span>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#book" className="btn-primary">
              Book an Appointment <ArrowRight size={17} />
            </a>
            {whatsappUrl ? <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">Consult Online <MessageCircle size={16} /></a> : <a href="#contact" className="btn-outline">Make an enquiry <ArrowRight size={16} /></a>}
          </div>
          <div className="mt-9 flex items-center gap-3 text-sm text-[#4a6973]">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-[#32847c]">
              <Check size={16} />
            </span>
            <span>Personalised care, clear communication</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="about-premium section-pad">
      <div className="about-index">
        <span>01</span>
        <i />
      </div>
      <div className="about-layout">
        <Reveal className="about-heading">
          <p className="eyebrow">THE PERSON BEHIND THE PRACTICE</p>
          <h2 className="serif">
            Expert hands.
            <br />
            <em>Human care.</em>
          </h2>
          <div className="doctor-credentials">
            <strong>Dr Charu Makhija</strong>
            <span>BDS, MDS</span>
            <span>Restorative Dentist and Endodontist</span>
            <span>MBA (Hospital Management)</span>
          </div>
        </Reveal>
        <Reveal className="about-copy" delay={100}>
          <p>
            Dr Charu Makhija is an experienced Restorative Dentist and
            Endodontist with over 15 years of clinical experience. She is
            dedicated to helping patients preserve their natural teeth through
            careful diagnosis, advanced treatment techniques and gentle,
            personalised dental care.
          </p>
          <p>
            She completed her BDS and MDS in Conservative Dentistry and
            Endodontics and also holds an MBA, which complements her clinical
            expertise with a broader understanding of healthcare management and
            professional leadership. She remains actively involved in continuing
            education, research and academics.
          </p>
          <p>
            Known professionally through her copyrighted identity, “The Pulp
            Doctor,” Dr Makhija believes that quality dental care begins with
            trust and clear communication. She takes the time to listen to each
            patient’s concerns, explain treatment options in simple language and
            create a treatment plan that prioritises comfort, safety and
            long-term oral health.
          </p>
          <p>
            Alongside her clinical practice, Dr Makhija is a dedicated mentor
            and educator. She conducts lectures, hands-on workshops and clinical
            training programmes for dentists at different stages of their
            professional journeys.
          </p>
          <p>
            With a thoughtful approach, attention to detail and a genuine
            commitment to patient wellbeing, Dr Charu Makhija strives to make
            every patient feel heard, reassured and confident throughout their
            treatment journey.
          </p>
        </Reveal>
      </div>
      <div
        className="credential-ribbon"
        aria-label="Professional experience and credentials"
      >
        <div className="credential-stat">
          <span className="credential-index">01 / EXPERIENCE</span>
          <strong>15+</strong>
          <small>YEARS OF EXPERIENCE</small>
        </div>
        <div className="credential-stat">
          <span className="credential-index">02 / QUALIFICATION</span>
          <strong>BDS · MDS</strong>
          <small>CONSERVATIVE DENTISTRY &amp; ENDODONTICS</small>
        </div>
        <div className="credential-stat">
          <span className="credential-index">03 / MANAGEMENT</span>
          <strong>MBA</strong>
          <small>HOSPITAL MANAGEMENT</small>
        </div>
        <div className="credential-stat">
          <span className="credential-index">04 / APPROACH</span>
          <strong>TRUST</strong>
          <small>AT THE HEART OF CARE</small>
        </div>
      </div>
    </section>
  );
}

const services = [
  {
    name: "Root Canal Treatment",
    description: "Help for tooth pain, infection, and damaged teeth while preserving the natural tooth where possible.",
    image: "/root.png",
  },
  {
    name: "Dental Implants",
    description: "Options for replacing missing teeth.",
    image: "/dentalimp.png",
  },
  {
    name: "Veneers & Crowns",
    description: "Restoring the appearance, shape, or strength of teeth.",
    image: "/veneer.png",
  },
  {
    name: "Smile Designing",
    description: "Personalised options for improving smile aesthetics.",
    image: "/smiling.png",
  },
  {
    name: "Teeth Cleaning",
    description: "Professional removal of plaque and tartar.",
    image: "/teethcleaning.png",
  },
  {
    name: "Teeth Whitening",
    description: "Options for improving tooth discolouration.",
    image: "/teethwhite.svg",
  },
  {
    name: "Oral Surgery",
    description: "Surgical dental treatment when clinically indicated.",
    image: "/oral.png",
  },
];

export function TreatmentsSection() {
  return (
    <section id="care" className="treatments-reference-section">
      <div className="treatments-reference-inner">
        <Reveal>
          <div className="treatments-reference-heading">
            <div>
              <p>CARE FOR YOUR SMILE</p>
              <h2 className="serif">Treatments &amp; Services</h2>
            </div>
            <p>Gentle, personalised dental care to help preserve your natural teeth.</p>
          </div>
        </Reveal>
        <div className="treatment-reference-grid">
          {services.map(({ name, description, image }, index) => (
            <Reveal key={name} delay={(index % 3) * 50}>
              <a href="#book" className="treatment-reference-card" aria-label={`Discuss ${name} at an appointment`}>
                <img src={image} alt="" loading="lazy" />
                <div><h3>{name}</h3><p>{description}</p></div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PublicUtilityControls() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  useEffect(() => {
    const updateVisibility = () => setShowBackToTop(window.scrollY > 480);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);
  return <div className="public-utilities">
    {showBackToTop && <button type="button" className="back-to-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}><ArrowUp size={19} aria-hidden="true" /><span>Top</span></button>}
    {whatsappUrl && <a className="whatsapp-float" href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Chat with The Pulp Doctor on WhatsApp"><MessageCircle size={24} aria-hidden="true" /><span>Chat on WhatsApp</span></a>}
  </div>;
}

export function EnquiryLink({ className = "btn-outline" }: { className?: string }) {
  return whatsappUrl
    ? <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={className}>Enquire on WhatsApp <MessageCircle size={16} /></a>
    : <a href="#contact" className={className}>Send an enquiry <ArrowRight size={16} /></a>;
}

export function DentistReferralSection() {
  return (
    <section className="referral-premium section-pad">
      <Reveal className="referral-card">
        <div className="referral-copy">
          <p className="eyebrow !text-[#89c9bd]">FOR REFERRING DENTISTS</p>
          <h2 className="serif">
            A considered referral.
            <br />
            <em>A clear handover.</em>
          </h2>
          <p>
            Share the clinical context, tooth details and restorative plan
            securely. The referral form includes an interactive FDI chart and a
            review step.
          </p>
          <Link href="/refer-a-patient" className="btn-mint">
            Refer a patient <ArrowRight size={16} />
          </Link>
        </div>
        <div className="referral-stamp">
          <span>32</span>
          <small>
            TEETH
            <br />
            FDI CHART
          </small>
          <div className="stamp-ring" />
        </div>
      </Reveal>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <a
            href="/#top"
            aria-label="The Pulp Doctor home"
            className="mb-4 inline-flex items-center"
          >
            <img
              src="/footer-logo.png"
              alt="The Pulp Doctor"
              className="h-auto w-36 max-w-full object-contain sm:w-44"
            />
          </a>

          <p>
            Specialist dental care with time to listen, explain and plan.
          </p>

          <span>
            Dr Charu Makhija · Restorative Dentist &amp; Root Canal Specialist
          </span>
        </div>

        <div>
          <p className="eyebrow !text-[#83c5ba]">EXPLORE</p>
          <nav className="footer-links">
            <a href="/#about">About Dr Makhija</a>
            <a href="/#care">Treatments</a>
            <Link href="/refer-a-patient">Refer a patient</Link>
            <a href="/#book">Appointments</a>
            <a href="/#locations">Clinic locations</a>
          </nav>
        </div>

        <div>
          <p className="eyebrow !text-[#83c5ba]">CONTACT</p>
          <p className="footer-contact">
            For clinic details and appointment availability, please select a
            location below.
          </p>
          <Link href="/admin/login" className="admin-link">
            Administrator sign in
          </Link>
        </div>
      </div>

      <div className="footer-bottom relative flex flex-col items-center justify-between gap-3 text-center md:flex-row">
        <span className="text-xs">
          © {new Date().getFullYear()} The Pulp Doctor. All rights reserved.
        </span>

        <a
          href="https://www.genesisvirtue.com"
          target="_blank"
          rel="noopener noreferrer"
          className="powered-by text-xs text-center no-underline transition-opacity hover:opacity-100"
        >
          Powered by <strong>Genesis Virtue</strong>
        </a>

        <a href="#top" className="text-xs">
          BACK TO TOP ↑
        </a>
      </div>
    </footer>
  );
}
