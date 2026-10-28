import { useEffect, useRef, useState } from "react";
import {
  Activity,
  ArrowRight,
  Baby,
  Check,
  ChevronDown,
  CircleDot,
  Coffee,
  HeartHandshake,
  HeartPulse,
  Menu,
  MessageCircle,
  MoveUpRight,
  Moon,
  Phone,
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

const configuredWhatsappNumber = (import.meta.env.VITE_WHATSAPP_NUMBER || "918448500405").replace(/\D/g, "");
const whatsappNumber = /^\d{8,15}$/.test(configuredWhatsappNumber) ? configuredWhatsappNumber : "";
const whatsappUrl = whatsappNumber
  ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Dr. Charu, I would like to enquire about an appointment.")}`
  : null;
const callUrl = whatsappNumber ? `tel:+${whatsappNumber}` : null;

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
      <img src={`${import.meta.env.BASE_URL}logo.png`} alt="The Pulp Doctor" />
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const links = [
    ["About", "/about"],
    ["Treatments", "/treatments"],
    ["Locations", "/locations"],
    ["Contact", "/contact"],
    ["Book appointment", "/book"],
    ["For dentists", "/refer-a-patient"],
  ];
  return (
    <>
      <div className="topline px-5 py-2 text-center">
        SPECIALIST DENTAL CARE · DELHI NCR
      </div>
      <header className="site-header">
        <div className="header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map(([label, href]) =>
              <Link
                  className={label === "Book appointment" || label === "For dentists"
                    ? "btn-primary !px-5 !py-2.5 text-sm"
                    : "nav-link"}
                  key={label}
                  href={href}
                >
                  {label}
                  {(label === "Book appointment" || label === "For dentists") && <ArrowRight size={15} />}
              </Link>
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
                <Link key={label} href={href} onClick={() => setOpen(false)}>
                  {label}
                </Link>
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
          <div className="hero-portrait-frame relative">
            <div className="portrait-placeholder relative aspect-[.83] overflow-hidden rounded-t-[48%] rounded-b-[2rem] border-[10px] border-white/75 shadow-[0_24px_55px_rgba(31,76,83,.16)]">
              <img
                className="hero-portrait-image"
                src={`${import.meta.env.BASE_URL}drcharu.jpeg`}
                alt="Dr Charu Makhija"
                fetchPriority="high"
              />
            </div>
            <div className="hero-experience rounded-2xl border border-[#d9e8e7] bg-white px-5 py-4 shadow-lg">
              <div className="serif text-3xl text-[#1c6570]">15+</div>
              <div className="text-[.68rem] font-semibold uppercase tracking-wider text-[#627a81]">
                years of experience
              </div>
            </div>
          </div>
          <div className="hero-doctor-caption">
            <strong>Dr. Charu Makhija</strong>
            <span>Restorative Dentist &amp; Endodontist</span>
          </div>
        </Reveal>
        <Reveal className="fade-up md:order-1">
          <p className="eyebrow flex items-center gap-2"><span className="h-px w-7 bg-[#39867f]" /> YOU DON&apos;T HAVE TO PUT UP WITH THE PAIN</p>
          <h1 className="serif mt-6 max-w-[730px] text-[clamp(3.5rem,7.4vw,6.4rem)] leading-[.88] tracking-[-.025em] text-[#153d50]">
            Tooth pain?<br />Let&apos;s take<br /><em className="text-[#267d79]">care of you.</em>
          </h1>
          <div className="hero-story-copy"><p>That lingering ache. The sip of tea that hurts. Another night of broken sleep. We know tooth pain can take over your day and the thought of treatment can feel worrying, too.</p><p>You deserve to feel heard, understand what&apos;s happening, and find a way forward. Let&apos;s take the first step together.</p></div>
          <div className="hero-actions mt-8 flex flex-wrap gap-3">
            <Link href="/book" className="btn-primary">
              Book an Appointment <ArrowRight size={17} />
            </Link>
            {whatsappUrl ? <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">Help with my tooth pain <MessageCircle size={16} /></a> : <Link href="/contact" className="btn-outline">Help with my tooth pain <ArrowRight size={16} /></Link>}
            <Link href="/refer-a-patient" className="btn-outline">Refer a patient <ArrowRight size={16} /></Link>
          </div>
          <div className="mt-9 flex items-center gap-3 text-sm text-[#4a6973]">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-[#32847c]">
              <Check size={16} />
            </span>
            <span>Personalised care, clear communication</span>
          </div>
        </Reveal>
      </div>
      <div className="story-reassurance"><span><Check size={15} /> Time to listen to your concerns</span><span><Check size={15} /> Treatment explained in simple words</span><span><Check size={15} /> Focused on saving your natural teeth</span></div>
    </section>
  );
}

const symptomCards = [
  [Moon, "An ache that won’t settle", "A persistent or throbbing toothache that interrupts your day or keeps you awake."],
  [Coffee, "A sip that makes you wince", "Sensitivity to hot or cold that lingers after your drink is gone."],
  [Activity, "Discomfort when you bite", "A tender tooth that makes eating your favourite foods difficult."],
  [CircleDot, "Swelling or a gum bump", "Swelling near a tooth, sometimes with a bad taste, needs prompt dental attention."],
];

export function SymptomsSection() {
  const [activeSymptom, setActiveSymptom] = useState(0);
  return <section className="story-section symptom-section section-pad"><div className="mx-auto max-w-[1200px]"><div className="story-section-heading"><div><p className="story-eyebrow">DOES THIS SOUND FAMILIAR?</p><h2 className="serif">Little moments.<br /><em>A lot of discomfort.</em></h2></div><p>You might be avoiding one side when you chew, or wondering if the pain will go away on its own. These are good reasons to have your tooth checked.</p></div><div className="symptom-carousel"><div className="symptom-grid" style={{ transform: `translateX(-${activeSymptom * 100}%)` }}>{symptomCards.map(([Icon, title, description]) => <article key={title as string}><Icon size={21} aria-hidden="true" /><h3>{title as string}</h3><p>{description as string}</p></article>)}</div><div className="symptom-dots" role="group" aria-label="Common dental concerns">{symptomCards.map(([, title], index) => <button key={title as string} type="button" aria-label={`Show concern ${index + 1}: ${title as string}`} aria-pressed={activeSymptom === index} className={activeSymptom === index ? "is-active" : ""} onClick={() => setActiveSymptom(index)} />)}</div></div><p className="story-footnote">Not every toothache needs a root canal. An examination and X-rays when needed help us find the cause.</p></div></section>;
}

export function RootCanalSection() {
  return <section id="root-canal" className="root-canal-story section-pad"><div className="root-canal-layout"><div className="root-canal-art"><img src={`${import.meta.env.BASE_URL}tooth-sticker.png`} alt="Illustration of a natural tooth" /><span>Your natural tooth. Worth caring for.</span></div><div><p className="story-eyebrow">UNDERSTANDING ROOT CANAL TREATMENT</p><h2 className="serif">A way to ease pain.<br /><em>A chance to save<br />your tooth.</em></h2><p>Inside your tooth is soft tissue called the pulp. If it becomes badly inflamed or infected, root canal treatment may help you keep the tooth.</p><p>The damaged tissue is removed, the inside is carefully cleaned, and the canals are filled and sealed. A filling or crown then helps protect the tooth.</p><p><strong>It starts with understanding your tooth—not assuming you need treatment.</strong> Dr. Makhija will explain what she finds and discuss the options with you.</p><details><summary>What will my visit be like? <ChevronDown size={17} /></summary><p>The dentist examines your tooth and may recommend an X-ray. You&apos;ll hear the findings, discuss suitable treatment options, and have time to ask questions.</p></details></div></div></section>;
}

export function PatientJourneySection() {
  const steps = [["01", "First, we listen.", "Tell us what hurts, what worries you, and what you&apos;re hoping for. There&apos;s room for every question—even the one you feel nervous asking."], ["02", "Then, we make it clear.", "After examining your tooth, we talk through what&apos;s happening, your treatment options, and the next steps in everyday language."], ["03", "We plan care together.", "Your comfort and long-term oral health guide the plan. You&apos;ll know what to expect during treatment and how to care for your tooth afterwards."]];
  const [activeStep, setActiveStep] = useState(0);
  return <section className="story-section patient-journey section-pad"><div className="mx-auto max-w-[1200px]"><p className="story-eyebrow">A LITTLE CLARITY CAN MAKE A BIG DIFFERENCE</p><h2 className="serif">You&apos;re a person.<br /><em>Not just a painful tooth.</em></h2><div className="journey-carousel"><div className="journey-track" style={{ transform: `translateX(-${activeStep * 100}%)` }}>{steps.map(([number, title, description]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div><div className="journey-dots" role="tablist" aria-label="Care steps">{steps.map(([, title], index) => <button key={title} type="button" role="tab" aria-label={`Show step ${index + 1}: ${title}`} aria-selected={activeStep === index} className={activeStep === index ? "is-active" : ""} onClick={() => setActiveStep(index)} />)}</div></div></div></section>;
}

export const patientStories = [
  {
    slug: "toothache-root-canal",
    category: "TOOTH PAIN",
    title: "Does my toothache mean I need a root canal?",
    excerpt: "That lingering ache can raise a lot of questions.",
    image: "1st.jpeg",
    imageAlt: "Woman holding her cheek while experiencing tooth pain",
    cta: "Help me understand my tooth pain",
    blocks: [
      { type: "lead", text: "A toothache is a reason to get answers, not jump to conclusions." },
      { type: "paragraph", text: "Perhaps your tea suddenly feels too hot. You’ve started chewing on the other side. Or an ache keeps returning just when you’re trying to sleep." },
      { type: "paragraph", text: "It’s understandable to wonder, “Do I need a root canal?”" },
      { type: "paragraph", text: "The answer is: not necessarily. Tooth pain can have different causes. Lingering sensitivity, pain when biting, or swelling near a tooth can signal a problem that needs a dental examination, but symptoms alone cannot tell you which treatment is right." },
      { type: "paragraph", text: "Root canal treatment may help when the soft tissue inside your tooth becomes badly inflamed or infected. Its purpose is to treat the problem while preserving your natural tooth where possible." },
      { type: "paragraph", text: "Your first step doesn’t have to be deciding on treatment. It can simply be finding out what’s happening." },
      { type: "closing", text: "You don’t need to know what’s wrong before asking for help." },
    ],
  },
  {
    slug: "root-canal-comfort",
    category: "DENTAL ANXIETY",
    title: "Worried a root canal will hurt? Let’s talk about that.",
    excerpt: "Understand how comfort is discussed and supported during treatment.",
    image: "2nd.jpeg",
    imageAlt: "Close-up of a woman holding her cheek because of tooth pain",
    cta: "Talk to us about your concerns",
    blocks: [
      { type: "lead", text: "Sometimes, the worry takes up as much space as the toothache." },
      { type: "paragraph", text: "You may have heard an unsettling story. Had a difficult dental visit before. Or simply feel uncomfortable not knowing what will happen." },
      { type: "paragraph", text: "You can tell your dentist all of that." },
      { type: "paragraph", text: "Root canal treatment is carried out with local anaesthetic to numb the area. You may notice pressure or movement, but if you feel pain, tell your dentist so they can respond." },
      { type: "paragraph", text: "Before treatment, ask how your comfort will be checked and agree on a hand signal if you need a pause. Understanding the next step can make the experience feel more manageable." },
      { type: "paragraph", text: "Some tenderness afterwards is common. Your dentist will explain what to expect and how to look after the tooth. Severe or worsening pain should be checked." },
      { type: "closing", text: "You don’t have to feel fearless to take the first step. You just need somewhere to start." },
    ],
  },
  {
    slug: "first-consultation",
    category: "YOUR FIRST VISIT",
    title: "Your first consultation: you don’t need to have all the answers.",
    excerpt: "A few things to bring, and questions you can ask at your visit.",
    image: "3rd.jpg",
    imageAlt: "Patient speaking with a dentist during a consultation",
    cta: "Request a consultation",
    blocks: [
      { type: "lead", text: "That is enough to begin a conversation." },
      { type: "paragraph", text: "Before your visit, it can help to think about:" },
      { type: "list", items: [
        "When the discomfort started.",
        "Whether hot drinks, cold foods, or chewing trigger it.",
        "Whether it interrupts your sleep.",
        "Any swelling, recent dental work, or injury.",
        "What worries you most about getting treatment.",
      ] },
      { type: "paragraph", text: "Bring any relevant dental records or X-rays you already have, along with a list of your medicines and allergies." },
      { type: "paragraph", text: "Use the consultation to ask questions, too: What is causing the pain? What are my options? How many visits might I need? What will the complete treatment cost?" },
      { type: "closing", text: "Booking a consultation is a step towards understanding your options. It isn’t consent to a procedure." },
    ],
  },
] as const;

type PatientStory = (typeof patientStories)[number];
type PatientStoryBlock = PatientStory["blocks"][number];

export function PatientStoriesSection() {
  const [featured, ...secondary] = patientStories;
  return (
    <section id="stories" className="patient-stories section-pad">
      <div className="stories-inner">
        <div className="stories-heading">
          <p className="eyebrow">A LITTLE CLARITY BEFORE YOUR VISIT</p>
          <h2 className="serif">Stories you might see yourself in.</h2>
          <p>Real questions. Familiar worries. Simple explanations to help you feel more confident about your dental care.</p>
          <small>Illustrative patient guides, not real patient accounts or testimonials.</small>
        </div>
        <div className="stories-grid">
          <Link className="story-featured-card" href={`/stories/${featured.slug}`}>
            <div className="story-featured-image">
              <img src={`${import.meta.env.BASE_URL}${featured.image}`} alt={featured.imageAlt} loading="lazy" />
            </div>
            <div className="story-card-copy">
              <p className="story-category">{featured.category} <span>· 2 MIN READ</span></p>
              <h3>{featured.title}</h3>
              <p>{featured.excerpt}</p>
              <span className="story-read-link">Read the story <ArrowRight size={16} aria-hidden="true" /></span>
            </div>
          </Link>
          <div className="story-secondary-stack">
            {secondary.map((story) => (
              <Link key={story.slug} className="story-secondary-card" href={`/stories/${story.slug}`}>
                <img src={`${import.meta.env.BASE_URL}${story.image}`} alt={story.imageAlt} loading="lazy" />
                <div className="story-card-copy">
                  <p className="story-category">{story.category} <span>· 2 MIN READ</span></p>
                  <h3>{story.title}</h3>
                  <p>{story.excerpt}</p>
                  <span className="story-read-link">Read the story <ArrowRight size={16} aria-hidden="true" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function PatientStoryContent({ blocks }: { blocks: readonly PatientStoryBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "lead":
            return <p className="story-article-lead" key={index}>{block.text}</p>;
          case "paragraph":
            return <p key={index}>{block.text}</p>;
          case "closing":
            return <p className="story-article-closing" key={index}>{block.text}</p>;
          case "list":
            return <ul key={index}>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
        }
      })}
    </>
  );
}


export function AboutSection({ compact = false }: { compact?: boolean }) {
  return (
    <section id="about" className="about-premium section-pad">
      <div className="about-profile">
        <Reveal className="about-profile-card">
          <div className="about-profile-photo">
            <img
              src={`${import.meta.env.BASE_URL}drcharu.jpeg`}
              alt="Dr Charu Makhija, Restorative Dentist and Endodontist"
              loading="lazy"
            />
            <span className="about-experience-badge">
              <strong>15+</strong>
              <span>
                YEARS OF<br />
                CLINICAL EXPERIENCE
              </span>
            </span>
          </div>

          <div className="about-profile-details">
            <p className="about-profile-name">Dr. Charu Makhija</p>
            <p className="about-profile-title">
              Restorative Dentist &amp; Root Canal Specialist
            </p>
            <div className="about-profile-meta">
              <span>Clinician</span>
              <span aria-hidden="true">·</span>
              <span>Educator</span>
            </div>
            <p className="about-profile-qualifications">
              BDS · MDS in Conservative Dentistry and Endodontics · MBA
            </p>
          </div>
        </Reveal>

        <Reveal className="about-copy" delay={100}>
          <p className="eyebrow">THE PERSON BEHIND THE PRACTICE</p>

          <h2 className="about-profile-heading serif">
            Thoughtful care,<br />
            <em>built on trust.</em>
          </h2>

          <blockquote className="about-approach">
            “My approach begins with listening, understanding what is happening,
            and explaining your options clearly so you can make an informed
            decision about your dental care.”
          </blockquote>

          <p>
            Dr Charu Makhija is an experienced Restorative Dentist and
            Endodontist with over 15 years of clinical experience. She is
            dedicated to helping patients preserve their natural teeth through
            careful diagnosis, advanced treatment techniques and gentle,
            personalised dental care.
          </p>

          {/* This paragraph now appears in both compact and full versions */}
          <p>
            She completed her BDS and MDS in Conservative Dentistry and
            Endodontics and also holds an MBA, which complements her clinical
            expertise with a broader understanding of healthcare management
            and professional leadership. She remains actively involved in
            continuing education, research and academics.
          </p>

          {!compact && (
            <>
              <p>
                Known professionally through her copyrighted identity, “The
                Pulp Doctor,” Dr Makhija believes that quality dental care
                begins with trust and clear communication. She takes the time
                to listen to each patient’s concerns, explain treatment options
                in simple language and create a treatment plan that prioritises
                comfort, safety and long-term oral health.
              </p>

              <p>
                Alongside her clinical practice, Dr Makhija is a dedicated
                mentor and educator. She conducts lectures, hands-on workshops
                and clinical training programmes for dentists at different
                stages of their professional journeys.
              </p>

              <p>
                With a thoughtful approach, attention to detail and a genuine
                commitment to patient wellbeing, Dr Charu Makhija strives to
                make every patient feel heard, reassured and confident
                throughout their treatment journey.
              </p>
            </>
          )}

          {compact && (
            <Link href="/about" className="btn-outline mt-6">
              Know more about Dr. Charu{" "}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          )}
        </Reveal>
      </div>
    </section>
  );
}



const services = [
  {
    name: "Root Canal Treatment",
    description:
      "Help for tooth pain, infection, and damaged teeth while preserving the natural tooth where possible.",
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
            <p>
              Gentle, personalised dental care to help preserve your natural
              teeth.
            </p>
          </div>
        </Reveal>

        <div className="treatment-reference-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ name, description, image }, index) => (
            <Reveal
              key={name}
              delay={(index % 3) * 50}
              className={
                name === "Oral Surgery"
                  ? "lg:col-start-2"
                  : ""
              }
            >
              <Link
                href="/book"
                className="treatment-reference-card"
                aria-label={`Discuss ${name} at an appointment`}
              >
                <img src={image} alt="" loading="lazy" />
                <div>
                  <h3>{name}</h3>
                  <p>{description}</p>
                </div>
              </Link>
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
    {callUrl && <a className="call-float" href={callUrl} aria-label="Call The Pulp Doctor"><Phone size={22} aria-hidden="true" /><span>Call us</span></a>}
  </div>;
}

export function EnquiryLink({ className = "btn-outline" }: { className?: string }) {
  return whatsappUrl
    ? <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={className}>Enquire on WhatsApp <MessageCircle size={16} /></a>
    : <Link href="/contact" className={className}>Send an enquiry <ArrowRight size={16} /></Link>;
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
      <div className="footer-main footer-enhanced">
        <div className="footer-cta">
          <Link href="/" className="brand-mark footer-logo" aria-label="The Pulp Doctor home">
            <img
              src={`${import.meta.env.BASE_URL}footer-logo.png`}
              alt="The Pulp Doctor"
            />
          </Link>
          <p className="eyebrow !text-[#8fd0c7]">ONE SMALL STEP TOWARDS FEELING BETTER</p>
          <h2 className="serif">You don&apos;t have to<br />figure it out alone.</h2>
          <p>Whether you&apos;re in pain or simply unsure, start with a conversation. We&apos;ll help you find the next step.</p>
          <EnquiryLink className="footer-enquiry" />
          <small>An enquiry is not a confirmed appointment. The team will confirm availability.</small>
        </div>
        <div className="footer-details">
          <div><p className="eyebrow !text-[#8fd0c7]">PREFER TO CALL?</p>{callUrl && <a className="footer-contact-link" href={callUrl}>+91 8448 500405 <MoveUpRight size={17} /></a>}</div>
          <div><p className="eyebrow !text-[#8fd0c7]">OR WRITE TO US</p><a className="footer-contact-link" href="mailto:drcharu.25@gmail.com">drcharu.25@gmail.com <MoveUpRight size={17} /></a></div>
          <p className="footer-doctor">Dr. Charu Makhija · The Pulp Doctor<br />SPECIALIST DENTAL CARE · DELHI NCR</p>
          <nav className="footer-links" aria-label="Footer navigation"><Link href="/about">About Dr Makhija</Link><Link href="/treatments">Treatments</Link><Link href="/refer-a-patient">Refer a patient</Link><Link href="/book">Appointments</Link><Link href="/locations">Clinic locations</Link><Link href="/contact">Contact</Link></nav>
          <p className="footer-urgent"><strong>Need urgent help?</strong> Facial or neck swelling, rapidly worsening symptoms, or swelling with fever needs urgent assessment. Difficulty breathing or swallowing requires emergency medical care.</p>
          <Link href="/admin/login" className="admin-link">Administrator sign in</Link>
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
