import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import { useMutation } from "@tanstack/react-query";
import {
  Activity,
  AlertCircle,
  Baby,
  Brain,
  CheckCircle2,
  ChevronDown,
  Clock,
  Heart,
  Leaf,
  Loader2,
  MapPin,
  Menu,
  Phone,
  Shield,
  Star,
  Stethoscope,
  User,
  Users,
  Wind,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, type Variants, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Branch, TimePreference } from "./backend";

// ----- Animation variants -----
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// ----- Navbar -----
function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Doctors", href: "#doctors" },
    { label: "Branches", href: "#branches" },
    { label: "Services", href: "#services" },
    { label: "Appointment", href: "#appointment" },
  ];

  const ocids = [
    "nav.home.link",
    "nav.about.link",
    "nav.doctors.link",
    "nav.branches.link",
    "nav.services.link",
    "nav.appointment.link",
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-forest-light/30 shadow-xs">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo + Name */}
        <a href="#home" className="flex items-center gap-2.5 group">
          <img
            src="/assets/generated/clinic-logo-transparent.dim_200x200.png"
            alt="Karunya Homoeo Clinic Logo"
            className="h-10 w-10 object-contain"
          />
          <div className="leading-tight">
            <span className="font-display text-forest text-sm font-semibold block">
              Karunya Homoeo Clinic
            </span>
            <span className="text-[10px] text-muted-foreground tracking-widest uppercase">
              Palakkad, Kerala
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                data-ocid={ocids[i]}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-forest rounded-md hover:bg-secondary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#appointment">
              <Button
                size="sm"
                className="ml-2 bg-forest text-primary-foreground hover:bg-forest-mid font-semibold"
              >
                Book Appointment
              </Button>
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2 rounded-md text-foreground hover:bg-secondary transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-t border-forest-light/30 bg-white"
          >
            <ul className="px-4 py-3 space-y-1">
              {navLinks.map((link, i) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    data-ocid={ocids[i]}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2.5 text-sm font-medium text-foreground/80 hover:text-forest rounded-md hover:bg-secondary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <Button
                  className="w-full bg-forest text-primary-foreground hover:bg-forest-mid"
                  onClick={() => {
                    setMobileOpen(false);
                    document
                      .getElementById("appointment")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Book Appointment
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ----- Hero Section -----
function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center hero-bg pt-16"
    >
      {/* Layered overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-forest/80 via-forest/60 to-teal/70" />
      <div className="absolute inset-0 bg-noise opacity-30" />

      {/* Botanical decorative elements */}
      <div className="absolute top-20 left-8 opacity-20 hidden md:block">
        <Leaf size={60} className="text-white rotate-12" />
      </div>
      <div className="absolute bottom-20 right-8 opacity-20 hidden md:block">
        <Leaf size={80} className="text-white -rotate-12" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div variants={stagger} initial="hidden" animate="visible">
          {/* Badge */}
          <motion.div variants={fadeUp} className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-medium">
              <Heart size={14} className="fill-white" />
              Homoeopathic Healing • Palakkad, Kerala
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl md:text-6xl lg:text-7xl text-white font-semibold leading-tight mb-4"
          >
            <span className="text-blue-300">Karunya</span>
            <br />
            <span className="font-serif-instrument italic text-teal-light">
              Homoeo Clinic
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            className="text-xl md:text-2xl text-white/90 font-serif-instrument italic mb-4 tracking-wide"
          >
            Healing Naturally, Living Fully
          </motion.p>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="text-white/80 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Personalized homoeopathic care with zero side-effects. Trusted by
            families across Palakkad for holistic, natural healing rooted in
            science.
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#appointment">
              <Button
                data-ocid="hero.primary_button"
                size="lg"
                className="bg-white text-forest hover:bg-cream font-semibold text-base px-8 py-6 shadow-leaf transition-all duration-200 hover:scale-105"
              >
                <Heart size={18} className="mr-2" />
                Book Appointment
              </Button>
            </a>
            <a href="#about">
              <Button
                size="lg"
                variant="outline"
                className="border-white/50 text-white hover:bg-white/20 text-base px-8 py-6"
              >
                Learn More
                <ChevronDown size={16} className="ml-2" />
              </Button>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            className="mt-14 grid grid-cols-3 gap-4 max-w-lg mx-auto"
          >
            {[
              { value: "3", label: "Branches" },
              { value: "30+", label: "Years Experience" },
              { value: "1 Lakh+", label: "Patients Treated" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-display text-white font-bold">
                  {stat.value}
                </div>
                <div className="text-white/70 text-xs md:text-sm mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 1.8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <ChevronDown size={28} className="text-white/60" />
      </motion.div>
    </section>
  );
}

// ----- About Section -----
function AboutSection() {
  return (
    <section
      id="about"
      className="section-padding bg-cream relative overflow-hidden"
    >
      {/* Decorative leaf */}
      <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
        <Leaf size={320} className="text-forest -rotate-45" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Section heading */}
          <motion.div variants={fadeUp} className="text-center mb-14">
            <span className="text-forest text-sm font-semibold tracking-widest uppercase">
              Our Story
            </span>
            <h2 className="font-display text-3xl md:text-5xl text-forest mt-2 mb-4">
              About <span className="text-blue-600">Karunya</span>
              <span className="font-serif-instrument italic text-teal ml-2">
                Homoeo Clinic
              </span>
            </h2>
            <div className="botanical-divider mx-auto w-32 border-t border-forest-light/40" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text content */}
            <motion.div variants={fadeUp} className="space-y-5">
              <p className="text-foreground/80 text-base md:text-lg leading-relaxed">
                Karunya Homoeo Clinic was founded with a heartfelt mission: to
                bring accessible, compassionate, and effective natural healing
                to the families of Palakkad, Kerala. The name{" "}
                <em className="text-blue-600 font-semibold">Karunya</em> —
                meaning mercy and compassion — reflects the spirit with which
                every patient is treated.
              </p>
              <p className="text-foreground/80 text-base leading-relaxed">
                Homoeopathy is a gentle, holistic system of medicine that
                stimulates the body's innate healing ability. Unlike
                conventional medicine, homoeopathic remedies treat the whole
                person — body, mind, and spirit — using highly diluted natural
                substances that carry zero side-effects.
              </p>
              <p className="text-foreground/80 text-base leading-relaxed">
                With three branches across Palakkad — in Puthur, Yakkara, and
                Koduvayur — we ensure that expert homoeopathic care is always
                within reach. Our experienced consultants offer personalized
                treatment plans tailored to each patient's unique constitution
                and health journey.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                {[
                  "Zero Side Effects",
                  "Personalized Treatment",
                  "Natural Remedies",
                  "Holistic Approach",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium border border-forest-light/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Feature cards */}
            <motion.div variants={stagger} className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: <Leaf size={24} />,
                  title: "Natural Healing",
                  desc: "Plant-based remedies rooted in centuries of traditional wisdom",
                },
                {
                  icon: <Shield size={24} />,
                  title: "Safe & Gentle",
                  desc: "No toxins, no side effects — safe for all ages including infants",
                },
                {
                  icon: <Heart size={24} />,
                  title: "Holistic Care",
                  desc: "Treating the root cause, not just the symptoms",
                },
                {
                  icon: <Users size={24} />,
                  title: "Family Clinic",
                  desc: "Caring for entire families for over 30 years in Palakkad",
                },
              ].map((feat) => (
                <motion.div
                  key={feat.title}
                  variants={fadeUp}
                  className="bg-card rounded-xl p-5 shadow-card border border-forest-light/20 hover:shadow-card-hover transition-shadow duration-300"
                >
                  <div className="text-forest mb-3">{feat.icon}</div>
                  <h3 className="font-semibold text-foreground mb-1 text-sm">
                    {feat.title}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {feat.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ----- Doctors Section -----
function DoctorsSection() {
  const doctors = [
    {
      name: "Dr. K G Lalitha",
      credentials: "BHMS",
      designation: "Founder & Chief Consultant",
      role: "Owner, Karunya Homoeo Clinic",
      bio: "Dr. Lalitha founded Karunya Homoeo Clinic with a vision to make quality homoeopathic medicine accessible to all. With over 30 years of clinical practice and more than 1 lakh patients treated, she specialises in chronic disease management, women's health, and paediatric homoeopathy. Her compassionate approach and deep understanding of classical homoeopathy have helped patients across Palakkad reclaim their health naturally.",
      color: "from-forest/10 to-teal/10",
      initials: "KGL",
    },
    {
      name: "Dr. Rajalakshmi",
      credentials: "BHMS",
      designation: "Chief Consultant",
      role: "Senior Homoeopathic Physician",
      bio: "Dr. Rajalakshmi brings a wealth of experience and dedication to the team. Known for her meticulous case-taking and individualized treatment approach, she excels in treating skin disorders, allergies, respiratory conditions, and mental-emotional disorders through the principles of classical homoeopathy. Patients appreciate her empathetic listening and thorough analysis.",
      color: "from-teal/10 to-forest/10",
      initials: "RL",
    },
  ];

  return (
    <section id="doctors" className="section-padding bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeUp} className="text-center mb-14">
            <span className="text-forest text-sm font-semibold tracking-widest uppercase">
              Meet the Team
            </span>
            <h2 className="font-display text-3xl md:text-5xl text-forest mt-2 mb-4">
              Our{" "}
              <span className="font-serif-instrument italic text-teal">
                Consultants
              </span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-base">
              Experienced, compassionate homoeopathic physicians dedicated to
              your complete wellness.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {doctors.map((doc, idx) => (
              <motion.div
                key={doc.name}
                variants={fadeUp}
                data-ocid={`doctors.item.${idx + 1}`}
                className="bg-card rounded-2xl overflow-hidden shadow-card border border-forest-light/20 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                {/* Card header with gradient */}
                <div
                  className={`bg-gradient-to-br ${doc.color} p-8 flex flex-col items-center text-center border-b border-forest-light/15`}
                >
                  {/* Avatar */}
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-forest to-teal flex items-center justify-center mb-4 shadow-leaf">
                    <User size={40} className="text-white" />
                  </div>
                  <h3 className="font-display text-xl text-forest font-semibold">
                    {doc.name}
                    {doc.credentials && (
                      <span className="text-teal ml-1">
                        ({doc.credentials})
                      </span>
                    )}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    {doc.designation}
                  </p>
                  <span className="mt-2 px-3 py-0.5 bg-forest/10 text-forest rounded-full text-xs font-medium border border-forest-light/30">
                    {doc.role}
                  </span>
                </div>

                {/* Bio */}
                <div className="p-6">
                  <p className="text-foreground/75 text-sm leading-relaxed">
                    {doc.bio}
                  </p>
                  <div className="mt-4 flex gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 bg-secondary text-secondary-foreground rounded-full text-xs border border-forest-light/20">
                      Classical Homoeopathy
                    </span>
                    <span className="px-2.5 py-0.5 bg-secondary text-secondary-foreground rounded-full text-xs border border-forest-light/20">
                      Chronic Care
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ----- Branches Section -----
function BranchesSection() {
  const branches = [
    {
      name: "Puthur Branch",
      locality: "Puthur",
      address: "Jaladha Nagar, C N Puram, Palakkad – 678005",
      hours: "Mon – Sat: 8:00 AM – 8:00 PM",
      highlight: "Main Branch",
      phone: "9847865160",
    },
    {
      name: "Yakkara Branch",
      locality: "Yakkara",
      address: "Nilayoram Complex, Near Yakkara Bridge, Palakkad – 678701",
      hours: "Mon – Fri: 10:00 AM – 6:00 PM",
      highlight: "Serving Central Palakkad",
      phone: "7306611928",
    },
    {
      name: "Koduvayur Branch",
      locality: "Koduvayur",
      address: "Opposite East Mosque, Chittur Road, Koduvayur – 678501",
      hours: "Mon – Fri: 1:00 PM – 4:00 PM",
      highlight: "Serving Koduvayur Region",
      phone: "9847865160",
    },
  ];

  return (
    <section
      id="branches"
      className="section-padding bg-secondary/40 relative overflow-hidden"
    >
      {/* Decorative background element */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-light/20 to-cream/60 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeUp} className="text-center mb-14">
            <span className="text-forest text-sm font-semibold tracking-widest uppercase">
              Locations
            </span>
            <h2 className="font-display text-3xl md:text-5xl text-forest mt-2 mb-4">
              Our{" "}
              <span className="font-serif-instrument italic text-teal">
                Branches
              </span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-base">
              Three conveniently located clinics serving the communities of
              Palakkad, Kerala.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {branches.map((branch, idx) => (
              <motion.div
                key={branch.name}
                variants={fadeUp}
                data-ocid={`branches.item.${idx + 1}`}
                className="bg-card rounded-2xl p-6 shadow-card border border-forest-light/20 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Top accent stripe replaced with leaf motif */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-forest to-teal rounded-t-2xl" />

                <div className="pt-2">
                  {/* Highlight badge */}
                  <span className="inline-block px-2.5 py-0.5 bg-forest/10 text-forest text-xs font-medium rounded-full mb-3 border border-forest-light/25">
                    {branch.highlight}
                  </span>

                  {/* Location icon + name */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center">
                      <MapPin size={18} className="text-forest" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg text-forest font-semibold">
                        {branch.name}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {branch.address}
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-forest-light/20 my-4" />

                  {/* Hours */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock size={14} className="text-teal" />
                    <span>{branch.hours}</span>
                  </div>

                  {/* Phone */}
                  {branch.phone && (
                    <a
                      href={`tel:${branch.phone}`}
                      className="flex items-center gap-2 text-sm text-muted-foreground mt-2 hover:text-forest transition-colors"
                    >
                      <Phone size={14} className="text-teal" />
                      <span>{branch.phone}</span>
                    </a>
                  )}

                  {/* CTA */}
                  <a href="#appointment" className="block mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-forest/30 text-forest hover:bg-forest hover:text-white transition-colors duration-200"
                    >
                      Book at this Branch
                    </Button>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ----- Services Section -----
function ServicesSection() {
  const services = [
    {
      icon: <Activity size={22} />,
      title: "Chronic Disease Management",
      desc: "Long-term constitutional treatment for diabetes, hypertension, thyroid disorders, and arthritis using individualized homoeopathic protocols.",
    },
    {
      icon: <Star size={22} />,
      title: "Skin & Allergy Treatment",
      desc: "Effective management of eczema, psoriasis, urticaria, acne, and various allergic conditions without corticosteroids.",
    },
    {
      icon: <Wind size={22} />,
      title: "Respiratory Disorders",
      desc: "Comprehensive care for asthma, sinusitis, bronchitis, frequent colds, and allergic rhinitis with gentle, lasting relief.",
    },
    {
      icon: <Zap size={22} />,
      title: "Digestive Health",
      desc: "Treatment for IBS, acidity, constipation, colitis, and gastric disorders through holistic gut-health restoration.",
    },
    {
      icon: <Heart size={22} />,
      title: "Women's Health",
      desc: "Specialized care for PCOD/PCOS, menstrual irregularities, hormonal imbalances, menopause, and fertility concerns.",
    },
    {
      icon: <Baby size={22} />,
      title: "Pediatric Care",
      desc: "Safe, gentle homoeopathic treatment for children — teething, colic, infections, behavioral issues, and developmental concerns.",
    },
    {
      icon: <Brain size={22} />,
      title: "Mental & Emotional Wellness",
      desc: "Support for anxiety, depression, stress, insomnia, and emotional imbalances with mind-body constitutional remedies.",
    },
    {
      icon: <Stethoscope size={22} />,
      title: "Joint & Musculoskeletal Care",
      desc: "Relief for joint pain, back pain, sciatica, cervical spondylosis, and sports injuries through targeted homoeopathic therapy.",
    },
  ];

  return (
    <section id="services" className="section-padding bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeUp} className="text-center mb-14">
            <span className="text-forest text-sm font-semibold tracking-widest uppercase">
              What We Treat
            </span>
            <h2 className="font-display text-3xl md:text-5xl text-forest mt-2 mb-4">
              Our{" "}
              <span className="font-serif-instrument italic text-teal">
                Services
              </span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-base">
              From chronic conditions to acute illnesses, we offer comprehensive
              homoeopathic care for your entire family.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((svc) => (
              <motion.div
                key={svc.title}
                variants={fadeUp}
                className="group bg-card rounded-xl p-5 border border-forest-light/20 shadow-card hover:shadow-card-hover hover:border-forest/30 transition-all duration-300 hover:-translate-y-1 cursor-default"
              >
                <div className="w-10 h-10 rounded-lg bg-forest/10 flex items-center justify-center mb-4 text-forest group-hover:bg-forest group-hover:text-white transition-colors duration-300">
                  {svc.icon}
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-2 leading-snug">
                  {svc.title}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {svc.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ----- Appointment Form -----
type FormState = "idle" | "loading" | "success" | "error";

function AppointmentSection() {
  const { actor, isFetching } = useActor();
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const mutation = useMutation({
    mutationFn: async (data: {
      patientName: string;
      phoneNumber: string;
      branch: Branch;
      preferredDate: string;
      preferredTime: TimePreference;
      message: string | null;
    }) => {
      if (!actor) throw new Error("Service unavailable. Please try again.");
      await actor.submitAppointmentRequest(
        data.patientName,
        data.phoneNumber,
        data.branch,
        data.preferredDate,
        data.preferredTime,
        data.message,
      );
    },
    onMutate: () => {
      setFormState("loading");
      setErrorMsg("");
    },
    onSuccess: () => {
      setFormState("success");
      formRef.current?.reset();
      toast.success("Appointment request submitted successfully!");
    },
    onError: (err: Error) => {
      setFormState("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
      toast.error("Failed to submit appointment. Please try again.");
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const patientName = (fd.get("patientName") as string)?.trim();
    const phoneNumber = (fd.get("phoneNumber") as string)?.trim();
    const branch = fd.get("branch") as Branch;
    const preferredDate = fd.get("preferredDate") as string;
    const preferredTime = fd.get("preferredTime") as TimePreference;
    const message = (fd.get("message") as string)?.trim() || null;

    mutation.mutate({
      patientName,
      phoneNumber,
      branch,
      preferredDate,
      preferredTime,
      message,
    });
  }

  return (
    <section
      id="appointment"
      className="section-padding bg-gradient-to-br from-forest/5 via-cream to-teal-light/20 relative overflow-hidden"
    >
      {/* Background decorative leaf */}
      <div className="absolute bottom-0 left-0 opacity-5 pointer-events-none">
        <Leaf size={280} className="text-forest rotate-45" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className="text-forest text-sm font-semibold tracking-widest uppercase">
              Get Started
            </span>
            <h2 className="font-display text-3xl md:text-5xl text-forest mt-2 mb-4">
              Book an{" "}
              <span className="font-serif-instrument italic text-teal">
                Appointment
              </span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-base">
              Fill in your details and we'll confirm your appointment at your
              preferred branch.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="max-w-2xl mx-auto bg-card rounded-2xl shadow-leaf border border-forest-light/20 overflow-hidden"
          >
            {/* Card top gradient bar */}
            <div className="h-1.5 bg-gradient-to-r from-forest via-teal to-forest-light" />

            <div className="p-8">
              {/* Success state */}
              <AnimatePresence mode="wait">
                {formState === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    data-ocid="appointment.success_state"
                    className="text-center py-10"
                  >
                    <div className="flex justify-center mb-4">
                      <CheckCircle2 size={56} className="text-forest" />
                    </div>
                    <h3 className="font-display text-2xl text-forest mb-2">
                      Request Received!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Thank you for choosing Karunya Homoeo Clinic. We'll
                      contact you shortly to confirm your appointment.
                    </p>
                    <Button
                      onClick={() => setFormState("idle")}
                      variant="outline"
                      className="border-forest/30 text-forest hover:bg-forest hover:text-white"
                    >
                      Book Another Appointment
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    ref={formRef}
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    {/* Error state */}
                    {formState === "error" && (
                      <div
                        data-ocid="appointment.error_state"
                        className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm"
                      >
                        <AlertCircle
                          size={16}
                          className="mt-0.5 flex-shrink-0"
                        />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <div className="grid sm:grid-cols-2 gap-5">
                      {/* Patient Name */}
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="patientName"
                          className="text-sm font-medium text-foreground"
                        >
                          Patient Name{" "}
                          <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="patientName"
                          name="patientName"
                          type="text"
                          required
                          placeholder="Full name"
                          data-ocid="appointment.patientname.input"
                          className="border-input focus-visible:ring-forest/50"
                          disabled={formState === "loading"}
                        />
                      </div>

                      {/* Phone Number */}
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="phoneNumber"
                          className="text-sm font-medium text-foreground"
                        >
                          Phone Number{" "}
                          <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="phoneNumber"
                          name="phoneNumber"
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          data-ocid="appointment.phone.input"
                          className="border-input focus-visible:ring-forest/50"
                          disabled={formState === "loading"}
                        />
                      </div>
                    </div>

                    {/* Branch Select */}
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium text-foreground">
                        Preferred Branch{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <BranchSelectField disabled={formState === "loading"} />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      {/* Preferred Date */}
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="preferredDate"
                          className="text-sm font-medium text-foreground"
                        >
                          Preferred Date{" "}
                          <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="preferredDate"
                          name="preferredDate"
                          type="date"
                          required
                          data-ocid="appointment.date.input"
                          className="border-input focus-visible:ring-forest/50"
                          disabled={formState === "loading"}
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>

                      {/* Preferred Time */}
                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium text-foreground">
                          Preferred Time{" "}
                          <span className="text-destructive">*</span>
                        </Label>
                        <TimeSelectField disabled={formState === "loading"} />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="message"
                        className="text-sm font-medium text-foreground"
                      >
                        Message{" "}
                        <span className="text-muted-foreground text-xs">
                          (optional)
                        </span>
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Briefly describe your health concern or any specific requirements..."
                        data-ocid="appointment.message.textarea"
                        rows={3}
                        className="border-input focus-visible:ring-forest/50 resize-none"
                        disabled={formState === "loading"}
                      />
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      data-ocid="appointment.submit_button"
                      className="w-full bg-forest hover:bg-forest-mid text-primary-foreground font-semibold py-6 text-base transition-all duration-200 hover:scale-[1.01]"
                      disabled={formState === "loading" || isFetching}
                    >
                      {formState === "loading" ? (
                        <>
                          <Loader2
                            size={18}
                            className="mr-2 animate-spin"
                            data-ocid="appointment.loading_state"
                          />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Heart size={18} className="mr-2" />
                          Request Appointment
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      Our team will contact you within 24 hours to confirm your
                      appointment.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Sub-components for controlled selects (needed because name attr needs special handling)
function BranchSelectField({ disabled }: { disabled: boolean }) {
  const [value, setValue] = useState<string>("");
  return (
    <>
      <input type="hidden" name="branch" value={value} />
      <Select onValueChange={setValue} disabled={disabled}>
        <SelectTrigger
          data-ocid="appointment.branch.select"
          className="border-input focus:ring-forest/50 w-full"
        >
          <SelectValue placeholder="Select a branch" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={Branch.puthur}>Puthur, Palakkad</SelectItem>
          <SelectItem value={Branch.yakkara}>Yakkara, Palakkad</SelectItem>
          <SelectItem value={Branch.koduvayur}>Koduvayur, Palakkad</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}

function TimeSelectField({ disabled }: { disabled: boolean }) {
  const [value, setValue] = useState<string>("");
  return (
    <>
      <input type="hidden" name="preferredTime" value={value} />
      <Select onValueChange={setValue} disabled={disabled}>
        <SelectTrigger
          data-ocid="appointment.time.select"
          className="border-input focus:ring-forest/50 w-full"
        >
          <SelectValue placeholder="Select time" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={TimePreference.morning}>
            Morning (9 AM – 12 PM)
          </SelectItem>
          <SelectItem value={TimePreference.afternoon}>
            Afternoon (12 PM – 4 PM)
          </SelectItem>
          <SelectItem value={TimePreference.evening}>
            Evening (4 PM – 7 PM)
          </SelectItem>
          <SelectItem value={TimePreference.noPreference}>
            No Preference
          </SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}

// ----- Footer -----
function Footer() {
  const currentYear = new Date().getFullYear();
  const hostname = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );

  return (
    <footer className="bg-forest text-primary-foreground">
      {/* Top gradient accent */}
      <div className="h-1 bg-gradient-to-r from-teal via-forest-light to-teal" />

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Clinic info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/generated/clinic-logo-transparent.dim_200x200.png"
                alt="Karunya Homoeo Clinic"
                className="h-12 w-12 object-contain brightness-0 invert"
              />
              <div>
                <h3 className="font-display text-lg font-semibold">
                  Karunya Homoeo Clinic
                </h3>
                <p className="text-primary-foreground/60 text-xs">
                  Palakkad, Kerala
                </p>
              </div>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Healing Naturally, Living Fully. Trusted homoeopathic care for
              families across Palakkad since our founding.
            </p>
          </div>

          {/* Branches */}
          <div>
            <h4 className="font-semibold text-base mb-4 text-primary-foreground">
              Our Branches
            </h4>
            <ul className="space-y-3">
              {[
                {
                  loc: "Puthur",
                  detail: "Jaladha Nagar, C N Puram, Palakkad – 678005",
                  phone: "9847865160",
                },
                {
                  loc: "Yakkara",
                  detail:
                    "Nilayoram Complex, Near Yakkara Bridge, Palakkad – 678701",
                  phone: "7306611928",
                },
                {
                  loc: "Koduvayur",
                  detail:
                    "Opposite East Mosque, Chittur Road, Koduvayur – 678501",
                  phone: "9847865160",
                },
              ].map((b) => (
                <li key={b.loc} className="flex items-start gap-2">
                  <MapPin
                    size={14}
                    className="text-teal-light mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <span className="text-sm font-medium">{b.loc}</span>
                    <span className="text-primary-foreground/60 text-xs block">
                      {b.detail}
                    </span>
                    {b.phone && (
                      <a
                        href={`tel:${b.phone}`}
                        className="text-teal-light text-xs hover:underline"
                      >
                        {b.phone}
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Consultants */}
          <div>
            <h4 className="font-semibold text-base mb-4 text-primary-foreground">
              Our Consultants
            </h4>
            <ul className="space-y-3">
              <li>
                <p className="text-sm font-medium">Dr. K G Lalitha (BHMS)</p>
                <p className="text-primary-foreground/60 text-xs">
                  Founder & Chief Consultant
                </p>
              </li>
              <li>
                <p className="text-sm font-medium">Dr. Rajalakshmi (BHMS)</p>
                <p className="text-primary-foreground/60 text-xs">
                  Chief Consultant
                </p>
              </li>
            </ul>

            <div className="mt-5">
              <h4 className="font-semibold text-sm mb-2 text-primary-foreground">
                Clinic Hours
              </h4>
              <div className="space-y-1 text-sm text-primary-foreground/70">
                <div className="flex items-start gap-2">
                  <Clock
                    size={13}
                    className="text-teal-light mt-0.5 flex-shrink-0"
                  />
                  <span>Puthur: Mon – Sat, 8:00 AM – 8:00 PM</span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock
                    size={13}
                    className="text-teal-light mt-0.5 flex-shrink-0"
                  />
                  <span>Yakkara: Mon – Fri, 10:00 AM – 6:00 PM</span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock
                    size={13}
                    className="text-teal-light mt-0.5 flex-shrink-0"
                  />
                  <span>Koduvayur: Mon – Fri, 1:00 PM – 4:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-primary-foreground/60 text-sm">
            © {currentYear} Karunya Homoeo Clinic. All rights reserved.
          </p>
          <p className="text-primary-foreground/40 text-xs">
            Built with{" "}
            <Heart
              size={12}
              className="inline text-teal-light fill-teal-light"
            />{" "}
            using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-teal-light transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ----- Root App -----
export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-center" richColors />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <DoctorsSection />
        <BranchesSection />
        <ServicesSection />
        <AppointmentSection />
      </main>
      <Footer />
    </div>
  );
}
