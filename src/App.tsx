/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import {
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ChevronRight,
  Star,
  CheckCircle2,
  Calendar,
  ArrowRight,
  Award,
  Users,
  Stethoscope,
  Clock,
  MessageSquare,
  Play,
  Quote,
  ChevronDown,
  Mic,
  ChevronLeft,
  MessageCircle,
  Video
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import Lenis from 'lenis';
import { cn } from './lib/utils';
import { ContextCursor } from './components/ContextCursor';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';


gsap.registerPlugin(ScrollTrigger);

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b",
      isScrolled ? "bg-white/80 backdrop-blur-md py-4 border-black/10" : "bg-transparent py-6 border-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="bg-black px-4 py-2 rounded-sm">
            <img
              src="public/Dr-antonie-logo.webp"
              alt="Dr. Antoine Habib"
              className={cn(
                "w-auto object-contain transition-all duration-500",
                isScrolled ? "h-8" : "h-10"
              )}
            />
          </div>
        </a>


        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              data-ccursor
              className="text-sm font-medium hover:opacity-50 transition-opacity uppercase tracking-widest rounded-full"
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-widest opacity-50" >Emergency Call</span>
            <a href="tel:+971566481481" data-ccursor className="text-sm font-bold">+971 56 648 1481</a>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            data-ccursor="lift"
            className="bg-black text-white px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-zinc-800 transition-colors rounded-full"
          >
            Book Appointment
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-b border-black/10 p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-lg font-serif italic border-b border-black/5 pb-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button className="bg-black text-white w-full py-4 text-sm uppercase tracking-widest font-bold mt-4">
              Book Appointment
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-title span", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.5
      });
      gsap.from(".hero-sub", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 1.2,
        ease: "power3.out"
      });
      gsap.from(".hero-image", {
        scale: 1.1,
        opacity: 0,
        duration: 1.5,
        delay: 0.2,
        ease: "power2.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center pt-20 pb-32 overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center w-full">
        <div ref={textRef} className="z-10">
          <div className="inline-block mb-6">
            <span className="text-xs uppercase tracking-[0.3em] font-bold border-b border-black pb-1">Excellence in Surgery & Implants</span>
          </div>
          <h1 className="hero-title text-6xl lg:text-8xl font-serif leading-[0.9] mb-8">
            <span className="block overflow-hidden">Dr. Antoine</span>
            <span className="block overflow-hidden">Habib's</span>
            <span className="block overflow-hidden italic text-zinc-400">Clinic</span>
          </h1>
          <p className="hero-sub text-lg text-zinc-600 max-w-md mb-10 leading-relaxed">
            Leading Maxillofacial Surgery and Dental Implant Clinic providing world-class care with advanced technology and artistic precision.
          </p>
          <div className="hero-sub flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              data-ccursor="lift"
              className="bg-black text-white px-10 py-5 text-xs uppercase tracking-[0.2em] font-bold hover:bg-zinc-800 transition-all rounded-2x1"
            >
              Book Appointment
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#000", color: "#fff" }}
              whileTap={{ scale: 0.98 }}
              data-ccursor="lift"
              className="border border-black px-10 py-5 text-xs uppercase tracking-[0.2em] font-bold hover:bg-black hover:text-white transition-all rounded-none"
            >
              Our Services
            </motion.button>
          </div>
        </div>
        <div ref={imageRef} className="relative hero-image">
          <div className="aspect-[4/5] bg-transparent overflow-hidden rounded-sm ">
            <img
              src="/dr-image.webp"
              alt="Dr. Antoine Habib"
              className="w-full h-full object-cover transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-12 -left-10 bg-white p-10 shadow-2xl hidden lg:block max-w-xs border border-black/5">
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="#facc15" className="text-yellow-400" />)}
            </div>
            <p className="text-base italic font-serif text-zinc-900 leading-relaxed">"The best dental care experience I've ever had. Truly professional and caring."</p>
            <p className="text-xs uppercase tracking-[0.2em] mt-6 font-bold text-black">— Sarah Johnson</p>
          </div>
        </div>
      </div>

      {/* Background Text */}
      <div className="absolute bottom-0 right-0 opacity-[0.03] select-none pointer-events-none translate-y-1/4">
        <span className="text-[25vw] font-serif font-bold leading-none">HABIB</span>
      </div>
    </section>
  );
};

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textContainerRef.current) return;

    const ctx = gsap.context(() => {
      console.log("Initializing GSAP animations");
      // Image animation
      gsap.from(".about-img", {
        scrollTrigger: {
          trigger: ".about-img",
          start: "top 80%",
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      // Text reveal animation
      const targets = textContainerRef.current?.querySelectorAll(".reveal-text");
      if (targets && targets.length > 0) {
        const split = new SplitType(targets as any, { types: 'words' });

        if (split.words) {
          split.words.forEach((word, i) => {
            gsap.from(word, {
              scrollTrigger: {
                trigger: word,
                start: "top 95%",
                end: "top 70%",
                scrub: true,
              },
              x: i % 2 === 0 ? -50 : 50,
              opacity: 0,
              ease: "power2.out",
            });
          });
        }
      }

      // Highlight animation
      const highlights = textContainerRef.current?.querySelectorAll(".highlight-text");
      if (highlights) {
        highlights.forEach((h) => {
          gsap.to(h, {
            scrollTrigger: {
              trigger: h,
              start: "top 85%",
              end: "top 70%",
              scrub: true,
            },
            backgroundPosition: "0% 0",
            ease: "none"
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-24 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
        <div className="about-img relative">
          <div className="aspect-square bg-zinc-100 rounded-sm overflow-hidden">
            <img
              src="/about.webp"
              alt="Clinic"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -top-6 -right-6 w-32 h-32 border-2 border-black flex items-center justify-center bg-white p-4 text-center">
            <span className="text-xs font-bold uppercase tracking-widest">15+ Years Experience</span>
          </div>
        </div>
        <div className="about-content" ref={textContainerRef}>
          <span className="text-xs uppercase tracking-[0.3em] font-bold opacity-50 mb-4 block">Who I Am</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight reveal-text">About Dr. Antoine Habib</h2>
          <div className="space-y-6 text-zinc-600 leading-relaxed reveal-text">
            <p>
              Dr. Antoine Habib is a <span className="highlight-text font-bold text-black">specialist in maxillofacial surgery</span> and dental implants, who graduated with honors from Syria in 2007. After completing his master's in maxillofacial surgery, he established his own clinic.
            </p>
            <p>
              In 2013, he moved to Lebanon to expand his expertise in <span className="highlight-text font-bold text-black">orthognathic surgery</span>, and in 2015, he relocated to the UAE, setting up surgical departments across Dubai, Abu Dhabi, and Sharjah.
            </p>
            <p>
              Dr. Antoine holds multiple <span className="highlight-text font-bold text-black">international certifications</span> from European countries and has served as a <span className="highlight-text font-bold text-black">Key Opinion Leader</span> for BioHorizons. Currently, he is a professor at the University of Sharjah.
            </p>
          </div>
          <motion.button
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            data-ccursor
            className="mt-10 group flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full"
          >
            Discover More <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

const Logos = () => {
  const logos = ["BIOHORIZONS", "straumann", "Dentsply Sirona", "exocad", "BIOTEC", "ivoclar", "3shape"];
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;

    const marquee = marqueeRef.current;
    const totalWidth = marquee.scrollWidth / 2;

    const animation = gsap.to(marquee, {
      x: -totalWidth,
      duration: 20,
      ease: "none",
      repeat: -1,
    });

    return () => {
      animation.kill();
    };
  }, []);

  return (
    <section className="py-24 border-y border-black/5 bg-transparent overflow-hidden">
      <div className="flex whitespace-nowrap grayscale hover:grayscale-0 transition-all duration-700" ref={marqueeRef}>
        {[...logos, ...logos].map((logo, i) => (
          <div key={`${logo}-${i}`} className="flex items-center px-16">
            <span className="text-2xl font-serif font-bold tracking-tighter text-zinc-800">{logo}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

const WhyChooseUs = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const features = [
    {
      title: "Outstanding Assistance",
      desc: "We use the newest technologies to provide the best dental care in Dubai.",
      image: "/whychooseus1.webp",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Personalized Attention",
      desc: "Individualized therapy programs guarantee the greatest results for every patient.",
      image: "/whychooseus2.webp",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Adaptable Payment",
      desc: "Lowering the cost and increasing access to dental care for everyone.",
      image: "/whychooseus3.webp",
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Easy Appointments",
      desc: "Schedule your session for a time that works for you with our flexible system.",
      image: "/whychooseus4.webp",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section className="py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-bold opacity-50 mb-4 block">
            Our Benefits
          </span>
          <h2 className="text-4xl font-serif mb-4">Why Choose Us?</h2>
          <div className="w-20 h-1 bg-black mx-auto"></div>
        </div>
        
        <div 
          className="grid md:grid-cols-4 gap-6"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              // data-ccursor="lift"
              onMouseEnter={() => setHoveredIndex(i)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className={cn(
                "relative overflow-hidden rounded-2xl bg-white shadow-lg cursor-pointer group",
                "transition-all duration-500 ease-out",
                hoveredIndex === null ? "scale-100 blur-0" : 
                hoveredIndex === i ? "scale-110 blur-0 z-10" : "scale-90 blur-[8px]"
              )}
            >
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                {/* <div className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-80 group-hover:opacity-60 transition-opacity duration-500",
                  f.color
                )} /> */}
                <img 
                  src={f.image}
                  alt={f.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Icon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <div className="text-white">
                      {i === 0 && <Stethoscope size={32} />}
                      {i === 1 && <Users size={32} />}
                      {i === 2 && <Clock size={32} />}
                      {i === 3 && <Calendar size={32} />}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <h3 className="text-lg font-bold mb-3 uppercase tracking-wider text-black group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-zinc-600 transition-all duration-300">
                  {f.title}
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {f.desc}
                </p>
                
                {/* Hover indicator */}
                <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-black rounded-full" data-ccursor >Learn More</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Bottom accent bar */}
              <div className={cn(
                "absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r",
                f.color
              )} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
const ProgramsCTA = () => {
  return (
    <section className="relative py-32 overflow-hidden bg-black text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="inline-block text-xs uppercase tracking-[0.3em] font-bold mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/10">
            Training Programs
          </span>
          
          <h2 className="text-4xl lg:text-5xl font-serif mb-6 leading-tight">
            Continuing Education in Dental Implants & Maxillofacial Surgery
          </h2>
          
          <p className="text-lg text-white/70 mb-10 leading-relaxed">
            Join advanced training programs led by Dr. Antoine Habib. Learn cutting-edge techniques from a professor at the University of Sharjah.
          </p>

          <motion.a
            href="/continuing-education"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-ccursor="lift"
            className="inline-flex items-center gap-3 bg-white text-black px-12 py-5 text-sm uppercase tracking-[0.2em] font-bold rounded-xl hover:bg-zinc-100 transition-all group shadow-2xl"
          >
            View Programs
            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

const MinimalistDivider = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Main content */}
          <div className="bg-zinc-50 border border-black/5 rounded-3xl p-12 md:p-16 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="inline-block mb-6 px-4 py-2 bg-black text-white text-xs uppercase tracking-[0.3em] font-bold rounded-full">
                Expertise
              </div>
              
              <h2 className="text-3xl md:text-4xl font-serif text-black mb-6 leading-tight">
                Specialized in Complex Maxillofacial Procedures
              </h2>
              
              <p className="text-base text-zinc-600 leading-relaxed mb-8">
                From dental implants to full jaw reconstruction, Dr. Antoine Habib combines 
                surgical precision with artistic vision to deliver exceptional outcomes.
              </p>

              {/* Mini stats */}
              <div className="flex items-center justify-center gap-8 text-sm">
                <div>
                  <div className="text-2xl font-bold text-black mb-1">15+</div>
                  <div className="text-xs uppercase tracking-widest text-zinc-500">Years</div>
                </div>
                <div className="h-12 w-px bg-black/10" />
                <div>
                  <div className="text-2xl font-bold text-black mb-1">98%</div>
                  <div className="text-xs uppercase tracking-widest text-zinc-500">Success</div>
                </div>
                <div className="h-12 w-px bg-black/10" />
                <div>
                  <div className="text-2xl font-bold text-black mb-1">5000+</div>
                  <div className="text-xs uppercase tracking-widest text-zinc-500">Cases</div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-black/5 rounded-full hidden lg:block" />
          <div className="absolute -bottom-4 -left-4 w-16 h-16 border-2 border-black/5 rounded-full hidden lg:block" />
        </motion.div>
      </div>
    </section>
  );
};

const Specialty = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "Initial Assessment",
      description: "Comprehensive examination to evaluate bone density and determine the best implant placement strategy.",
      image: "/dental-step1.webp",
      duration: "30-60min",
      metric: "First Step"
    },
    {
      title: "Implant Placement",
      description: "Precision surgical insertion of titanium implant into the jawbone under local anesthesia.",
      image: "/dental-step2.webp",
      duration: "1-2h",
      metric: "Surgical Phase"
    },
    {
      title: "Osseointegration",
      description: "Healing period where the implant fuses with the bone tissue, creating a stable foundation.",
      image: "/dental-step3.webp",
      duration: "3-6 months",
      metric: "Healing Period"
    },
    {
      title: "Final Restoration",
      description: "Custom crown placement that matches your natural teeth perfectly for a beautiful smile.",
      image: "/dental-step4.webp",
      duration: "2-3 weeks",
      metric: "95%+ Success"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      steps.forEach((_, index) => {
        ScrollTrigger.create({
          trigger: `.dental-step-${index}`,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveStep(index),
          onEnterBack: () => setActiveStep(index),
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-zinc-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-xs uppercase tracking-[0.3em] font-bold opacity-50 mb-4 block">
            Highlighting Specialty
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
            What Are Dental Implants?
          </h2>
          <p className="text-lg opacity-70 leading-relaxed max-w-3xl mx-auto">
            Dental implants are a cutting-edge replacement for lost teeth, providing strength, beauty, and practicality. 
            They are perfect for people who have lost teeth, suffered trauma, or experienced periodontal disease-related bone loss.
          </p>
        </div>

        {/* Process Timeline */}
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Scrolling Steps */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-5 top-10 bottom-10 w-0.5 bg-gradient-to-b from-white/50 via-white/20 to-white/50 hidden lg:block" />

            {/* Steps container */}
            <div>
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`dental-step-${index} relative pl-16 pb-96`}
                >
                  {/* Step number circle */}
                  <div className={cn(
                    "absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-500 z-10",
                    activeStep === index
                      ? "bg-white text-black border-white scale-110 shadow-lg shadow-white/50"
                      : "bg-zinc-900 text-white/50 border-white/20"
                  )}>
                    {index + 1}
                  </div>

                  {/* Indicator dot */}
                  <div className={cn(
                    "absolute left-3.5 top-3.5 w-3 h-3 rounded-full transition-all duration-300",
                    activeStep === index
                      ? "bg-white shadow-lg shadow-white/50"
                      : "bg-zinc-800 border-2 border-white/20"
                  )} />

                  {/* Content card */}
                  <div className={cn(
                    "bg-zinc-800/40 border rounded-xl p-6 backdrop-blur-sm transition-all duration-500",
                    activeStep === index
                      ? "bg-zinc-800/80 border-white/20 shadow-xl"
                      : "border-white/5"
                  )}>
                    <h3 className={cn(
                      "text-2xl md:text-3xl font-serif mb-3 transition-all duration-500",
                      activeStep === index ? "text-white" : "text-white/50"
                    )}>
                      {step.title}
                    </h3>
                    <p className={cn(
                      "text-base leading-relaxed mb-4 transition-all duration-500",
                      activeStep === index ? "text-white/80" : "text-white/40"
                    )}>
                      {step.description}
                    </p>

                    {/* Stats - only show on active */}
                    <AnimatePresence>
                      {activeStep === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex gap-6 pt-4 border-t border-white/10 overflow-hidden"
                        >
                          <div>
                            <div className="text-xl font-bold mb-1">{step.duration}</div>
                            <div className="text-xs uppercase tracking-widest opacity-50">Duration</div>
                          </div>
                          <div>
                            <div className="text-xl font-bold mb-1">{step.metric}</div>
                            <div className="text-xs uppercase tracking-widest opacity-50">Status</div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Sticky Visual - FULL WIDTH */}
          <div className="relative">
            <div style={{ position: 'sticky', top: '6rem' }} className="w-full">
              <div className="bg-zinc-800/40 border border-white/10 rounded-xl p-5 backdrop-blur-sm">
                {/* Image container - WIDER */}
                <div className="relative h-80 w-full bg-zinc-800 rounded-lg overflow-hidden shadow-xl">
                  {steps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{
                        opacity: activeStep === index ? 1 : 0,
                        scale: activeStep === index ? 1 : 1.05,
                      }}
                      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                      className="absolute inset-0"
                    >
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover"
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/20 to-transparent" />
                      
                      {/* Step badge */}
                      <div className="absolute top-4 left-4 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center font-bold text-base shadow-xl">
                        {index + 1}
                      </div>

                      {/* Title overlay at bottom */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h4 className="text-xl font-serif text-white mb-1">{step.title}</h4>
                        <div className="text-sm text-white/70">{step.duration}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="mt-4">
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-2">
                    <motion.div
                      className="h-full bg-gradient-to-r from-white to-white/80 rounded-full"
                      animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    />
                  </div>
                  <div className="text-xs text-white/70 text-center">
                    Step <span className="text-white font-semibold">{activeStep + 1}/{steps.length}</span>: {steps[activeStep].title}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20 pt-20 border-t border-white/10">
          <p className="text-lg mb-8 opacity-70 max-w-2xl mx-auto">
            In search of the top dental implants in Dubai? Speak with your go-to dental and maxillofacial treatment specialist, Dr. Antoine Habib.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-ccursor="lift"
            className="bg-white text-black px-10 py-5 text-xs uppercase tracking-[0.2em] font-bold hover:bg-zinc-200 transition-all shadow-lg rounded-xl"
          >
            Book an Appointment
          </motion.button>
        </div>
      </div>
    </section>
  );
};

const Provisions = () => {
  const services = [
    { title: "Maxillofacial Procedures", desc: "Addressing complex facial and jaw-related conditions with care." },
    { title: "Oral Surgery", desc: "Expertise in a wide range of dental surgeries, ensuring precision and comfort." },
    { title: "Dental Implants", desc: "Transforming smiles using innovative implants and advanced techniques." }
  ];

  return (
    <section className="py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif mb-4">Entire Maxillofacial Surgery Provisions</h2>
          <p className="text-zinc-500 max-w-2xl mx-auto">Dr. Antoine's office provides a wide range of maxillofacial procedures for all oral health needs.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {services.map((s, i) => (
            <div key={i} className="flex gap-6">
              <div className="shrink-0">
                <CheckCircle2 className="text-black" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 uppercase tracking-widest">{s.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Achievements = () => {
  const stats = [
    { number: "15+", label: "Years Experience" },
    { number: "5000+", label: "Dental Implants" },
    { number: "500+", label: "Gum Surgeries" },
  ];

  const info = [
    { 
      label: "University Professor",
      value: "Sharjah University" 
    },
    { 
      label: "Board Certification",
      value: "Maxillofacial Surgery" 
    },
    { 
      label: "Key Opinion Leader",
      value: "Biohorizons USA" 
    },
  ];

  const images = [
    {
      url: "/teaching.webp",
      caption: "Teaching at international conference"
    },
    {
      url: "/listening.webp",
      caption: "Hands-on surgical training"
    },
    {
      url: "/awards.webp",
      caption: "Performing complex maxillofacial procedure"
    },
    {
      url: "/showing.webp",
      caption: "Keynote speaker at dental summit"
    },
  ];

  const achievements = [
    {
      icon: <Award size={24} />,
      title: "10+ International Certificates",
      description: "Extensive training in implant and bone graft surgery."
    },
    {
      icon: <Users size={24} />,
      title: "Key Opinion Leader (KOL) With Biohorizons USA",
      description: "Trusted expert and influencer in the field."
    },
    {
      icon: <Mic size={24} />,
      title: "Local Speaker",
      description: "Renowned speaker and lecturer at various conferences and courses in the UAE."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-bold opacity-50 mb-4 block">
            Recognition & Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
            Achievements of Dr. Antoine Habib
          </h2>
        </div>

        {/* Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Stats */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-zinc-50 border border-black/5 rounded-2xl p-10">
              {/* Number Stats */}
              <div className="space-y-8 mb-10 pb-10 border-b border-black/10">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm uppercase tracking-widest text-zinc-600 font-bold">
                      {stat.label}
                    </span>
                    <span className="text-4xl font-bold text-black">
                      {stat.number}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Professional Info */}
              <div className="space-y-6">
                {info.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="space-y-1"
                  >
                    <div className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
                      {item.label}
                    </div>
                    <div className="text-base font-semibold text-black">
                      {item.value}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Image Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Swiper
              modules={[Autoplay, Pagination, Navigation, EffectFade]}
              effect="fade"
              spaceBetween={0}
              slidesPerView={1}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={{
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
              }}
              loop={true}
              className="rounded-2xl overflow-hidden shadow-2xl achievement-swiper"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="relative aspect-[4/3] bg-zinc-800">
                    <img
                      src={image.url}
                      alt={image.caption}
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Caption */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-white text-base font-medium">
                        {image.caption}
                      </p>
                    </div>

                    {/* Index indicator */}
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
                      {index + 1} / {images.length}
                    </div>
                  </div>
                </SwiperSlide>
              ))}

              {/* Custom Navigation Buttons */}
              <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 group" data-ccursor>
                <ChevronLeft size={20} className="text-black group-hover:scale-110 transition-transform" />
              </button>
              <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 group" data-ccursor>
                <ChevronRight size={20} className="text-black group-hover:scale-110 transition-transform" />
              </button>
            </Swiper>
          </motion.div>
        </div>

        {/* Bottom: Achievement Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-zinc-50 border border-black/5 rounded-xl p-6 hover:bg-white hover:shadow-lg hover:border-black/10 transition-all duration-300 group"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-12 h-12 bg-black text-white rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                {achievement.icon}
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-black mb-2 leading-snug">
                {achievement.title}
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                {achievement.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


const Stats = () => {
  const stats = [
    { label: "Dental Implants", value: "5K+" },
    { label: "Bone Grafts Done", value: "500+" },
    { label: "Sinus Floor Augmentation", value: "300+" },
    { label: "Gum Surgeries", value: "500+" },
    { label: "Years Experience", value: "15+" }
  ];

  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-between gap-10">
        {stats.map((s, i) => (
          <div key={i} className="text-center">
            <div className="text-5xl font-serif mb-2">{s.value}</div>
            <div className="text-[10px] uppercase tracking-[0.2em] opacity-50">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};


const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const leftFaqs = [
    { 
      q: "What Can I Anticipate from My Initial Appointment?", 
      a: "Your initial appointment will include a thorough oral examination, a review of your dental history, and, if necessary, a plan for further procedures." 
    },
    { 
      q: "Is Surgery for Dental Implants Painful?", 
      a: "We employ the most recent methods and anesthetics to ensure the least suffering during and after surgery." 
    },
    { 
      q: "What Is the Duration of Recovery Following Maxillofacial Surgery?", 
      a: "While recovery times vary, most patients return to regular activities in two to four days." 
    },
    { 
      q: "Are There Better Implant Brands Than Others?", 
      a: "We provide implants from the top 5 manufacturers worldwide, ensuring long-lasting results." 
    },
    { 
      q: "Are Dental Implants Long-Lasting?", 
      a: "Dental implants can last a lifetime if properly maintained." 
    }
  ];

  const rightFaqs = [
    { 
      q: "How Should My Dental Implant Be Maintained?", 
      a: "Frequent dental flossing, mouthwash, brushing, and examinations every six months." 
    },
    { 
      q: "How Can I Determine If I Require Surgery on My Maxilla?", 
      a: "Surgery may be necessary for conditions like injuries, face pain, or a misaligned jaw. The consultation will ascertain the necessity." 
    },
    { 
      q: "What Is the Dental Implant Success Rate?", 
      a: "Typically, dental implants have a success rate of more than 99%." 
    },
    { 
      q: "Can I Resume My Regular Diet After Receiving a Dental Implant?", 
      a: "Yes, you can resume your regular diet after a little healing period." 
    },
    { 
      q: "What Dangers Come with Having Dental Surgery?", 
      a: "Infection and bleeding are among the risks; these are uncommon and should be treated carefully." 
    }
  ];

  return (
    <section className="py-24 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-bold opacity-50 mb-4 block">
            Have Questions?
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-4">
            {leftFaqs.map((faq, i) => (
              <motion.div
                key={`left-${i}`}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="border border-black/10 rounded-xl overflow-hidden bg-white"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left group"
                >
                  <span className="text-base font-bold pr-4 group-hover:text-zinc-600 transition-colors">
                    {faq.q}
                  </span>
                  <ChevronDown 
                  data-ccursor

                    className={cn(
                      "transition-transform duration-300 flex-shrink-0",
                      openIndex === i && "rotate-180"
                    )} 
                    size={20}
                  />
                </button>
                
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5">
                        <p className="text-sm text-zinc-600 leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {rightFaqs.map((faq, i) => {
              const index = i + leftFaqs.length;
              return (
                <motion.div
                  key={`right-${i}`}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="border border-black/10 rounded-xl overflow-hidden bg-white"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full py-5 px-6 flex items-center justify-between text-left group"
                  >
                    <span className="text-base font-bold pr-4 group-hover:text-zinc-600 transition-colors">
                      {faq.q}
                    </span>
                    <ChevronDown 
                      data-ccursor
                      className={cn(
                        "transition-transform duration-300 flex-shrink-0",
                        openIndex === index && "rotate-180"
                      )} 
                      size={20}
                    />
                  </button>
                  
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5">
                          <p className="text-sm text-zinc-600 leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};


const ContactForm = () => {
  return (
    <section id="contact" className="py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20">
        <div>
          <h2 className="text-4xl font-serif mb-8">Book an appointment now</h2>
          <div className="aspect-square bg-zinc-200 rounded-sm overflow-hidden mb-8">
            <img
              src="https://picsum.photos/seed/contact/800/800"
              alt="Contact"
              className="w-full h-full object-cover grayscale"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Phone size={20} />
              <span className="text-sm font-bold">+971 56 648 1481</span>
            </div>
            <div className="flex items-center gap-4">
              <Mail size={20} />
              <span className="text-sm font-bold">info@drantoinehabib.com</span>
            </div>
            <div className="flex items-center gap-4">
              <MapPin size={20} />
              <span className="text-sm font-bold">Dubai, United Arab Emirates</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-10 shadow-xl border border-black/5">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold">First Name</label>
                <input type="text" className="w-full border-b border-black/20 py-2 focus:border-black outline-none transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold">Last Name</label>
                <input type="text" className="w-full border-b border-black/20 py-2 focus:border-black outline-none transition-colors" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold">Email Address</label>
              <input type="email" className="w-full border-b border-black/20 py-2 focus:border-black outline-none transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold">Phone Number</label>
              <input type="tel" className="w-full border-b border-black/20 py-2 focus:border-black outline-none transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold">Service Required</label>
              <select className="w-full border-b border-black/20 py-2 focus:border-black outline-none transition-colors bg-transparent">
                <option>Dental Implants</option>
                <option>Maxillofacial Surgery</option>
                <option>Oral Surgery</option>
                <option>Consultation</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold">Message</label>
              <textarea rows={4} className="w-full border-b border-black/20 py-2 focus:border-black outline-none transition-colors resize-none"></textarea>
            </div>
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "#000", color: "#fff" }}
              whileTap={{ scale: 0.98 }}
              data-ccursor="lift"
              className="w-full bg-black text-white py-5 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-zinc-800 transition-all rounded-x1"
            >
              Send Message
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 border-b border-white/10 pb-20">
        <div className="col-span-2">
          <div className="flex items-center gap-3 mb-8">
            <img
              src="public/Dr-antonie-logo.webp"
              alt="Dr. Antoine Logo"
              className="h-12 w-auto object-contain brightness-0 invert"
            />
          </div>

          <p className="max-w-sm opacity-50 text-sm leading-relaxed">
            Providing premium maxillofacial surgery and dental implant services with a focus on patient comfort and clinical excellence.
          </p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest font-bold mb-8">Quick Links</h4>
          <ul className="space-y-4 opacity-50 text-sm">
            <li><motion.a whileHover={{ x: 5 }} href="#" data-ccursor className="hover:opacity-100 transition-opacity interactive inline-block">Home</motion.a></li>
            <li><motion.a whileHover={{ x: 5 }} href="#services" data-ccursor className="hover:opacity-100 transition-opacity interactive inline-block">Services</motion.a></li>
            <li><motion.a whileHover={{ x: 5 }} href="#about" data-ccursor className="hover:opacity-100 transition-opacity interactive inline-block">About</motion.a></li>
            <li><motion.a whileHover={{ x: 5 }} href="#contact" data-ccursor className="hover:opacity-100 transition-opacity interactive inline-block">Contact</motion.a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 opacity-90 text-[10px] uppercase tracking-[0.3em]">
        <motion.a 
          href="https://maximyzmedia.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ y: -2 }}
          data-ccursor 
          className="interactive hover:opacity-100 transition-opacity"
        >
          Designed and Developed By MaximyzMedia
        </motion.a>
        <div className="flex gap-8">
          <motion.a whileHover={{ y: -2 }} href="#" data-ccursor className="interactive">Privacy Policy</motion.a>
          <motion.a whileHover={{ y: -2 }} href="#" data-ccursor className="interactive">Terms of Service</motion.a>
        </div>
      </div>
    </footer>
  );
};


const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ y: "-100%" }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-white"
    >
      <div className="w-full max-w-md px-10">
        <div className="flex justify-between items-end mb-4">
          <span className="font-serif italic text-4xl">Dr.Antonie Habib</span>
          <span className="font-mono text-sm opacity-50">{progress}%</span>
        </div>
        <div className="h-[1px] w-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full bg-white"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
};

const AppointmentSteps = () => {
  const steps = [
    {
      title: "Consultation",
      desc: "At our clinic, patients can expect a high-quality consultation that prioritizes their comfort and well-being.",
      icon: <MessageSquare size={24} />
    },
    {
      title: "Pick A Date",
      desc: "Our team can help you book the most suitable appointment date. To make an appointment, please call +971566481481.",
      icon: <Calendar size={24} />
    },
    {
      title: "Get The Treatment You Need",
      desc: "Dr. Antoine uses the latest techniques and devices to ensure optimal patient outcomes.",
      icon: <CheckCircle2 size={24} />
    }
  ];

  return (
    <section className="py-24 bg-transparent border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-50 mb-2 block">Easy Way To Get Services</span>
          <h2 className="text-4xl font-serif">Schedule An Appointment</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10, scale: 1.02 }}
              data-ccursor="lift"
              className="p-10 border border-black/5 bg-zinc-50 relative group overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-0 bg-black group-hover:h-full transition-all duration-500"></div>
              <div className="mb-6 text-black/40 group-hover:text-black transition-colors">
                {step.icon}
              </div>
              <h3 className="text-lg font-bold mb-4 uppercase tracking-widest">{step.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{step.desc}</p>
              <div className="mt-8 text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Step 0{i + 1}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StatsAndCTA = () => {
  const stats = [
    { number: "5K+", label: "Dental Implants" },
    { number: "500+", label: "Bone Grafts Done" },
    { number: "300+", label: "Sinus Floor Augmentation" },
    { number: "500+", label: "Gum Surgeries" },
    { number: "15+", label: "Years Experience" },
  ];

  const ctaCards = [
    {
      icon: <MessageCircle size={32} />,
      title: "Consultation",
      description: "Get expert advice on your treatment",
      buttonText: "Chat With Us",
      buttonLink: "#"
    },
    {
      icon: <Phone size={32} />,
      title: "Need Help?",
      description: "Our team is ready to assist you",
      buttonText: "Contact Us",
      buttonLink: "#"
    },
    {
      icon: <Video size={32} />,
      title: "Insight",
      description: "Watch our treatment procedures",
      buttonText: "Watch Vlog",
      buttonLink: "#"
    }
  ];

  return (
    <section className="py-24 bg-zinc-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '48px 48px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-4">
            Expert Dentist Near Me, You Deserve
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Transforming smiles with precision and care
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="text-3xl md:text-4xl font-bold mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-white/60 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {ctaCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white text-black rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="mb-6 text-black">
                {card.icon}
              </div>
              
              <h3 className="text-2xl font-bold mb-3">
                {card.title}
              </h3>
              
              <p className="text-zinc-600 mb-6">
                {card.description}
              </p>

              <button className="bg-black text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-zinc-800 transition-colors group-hover:gap-3" data-ccursor>
                {card.buttonText}
                <ArrowRight size={18} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


const Testimonials = () => {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  const testimonials = [
    { 
      name: "Sarah Mitchell", 
      procedure: "Dental Implants",
      video: "https://www.youtube.com/embed/MagRoIRjsow",
      thumbnail: "https://img.youtube.com/vi/MagRoIRjsow/maxresdefault.jpg",
      quote: "Life-changing experience! Dr. Antoine's expertise gave me back my confidence.",
      rating: 5
    },
    { 
      name: "Ahmed Al-Rashid", 
      procedure: "Bone Graft Surgery",
      video: "https://www.youtube.com/embed/94r8uIt4yhI",
      thumbnail: "https://img.youtube.com/vi/94r8uIt4yhI/maxresdefault.jpg",
      quote: "Professional, caring, and absolutely exceptional results. Highly recommended!",
      rating: 5
    },
    { 
      name: "Maria Garcia", 
      procedure: "Full Mouth Reconstruction",
      video: "https://www.youtube.com/embed/XuOgvjUuyR0",
      thumbnail: "https://img.youtube.com/vi/XuOgvjUuyR0/maxresdefault.jpg",
      quote: "The best decision I ever made. Thank you Dr. Antoine for your amazing work!",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] font-bold opacity-50 mb-4 block">
            Our Patients
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mb-4">
            Real Stories, Real Results
          </h2>
          <p className="text-zinc-600 max-w-2xl mx-auto">
            Hear directly from our patients about their transformative experiences
          </p>
        </motion.div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group"
            >
              {/* Video Container */}
              <div className="relative aspect-[9/16] bg-zinc-900 rounded-2xl overflow-hidden mb-6 shadow-xl">
                {activeVideo === index ? (
                  // YouTube Embed
                  <iframe
                    src={`${testimonial.video}?autoplay=1`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  // Thumbnail with Play Button
                  <>
                    <img
                      src={testimonial.thumbnail}
                      alt={testimonial.name}
                      className="w-full h-full object-cover transition-all duration-700"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-video.jpg';
                      }}
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Play Button */}
                    <button
              
                      onClick={() => setActiveVideo(index)}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:bg-black transition-colors"
                        data-ccursor
                      >
                        <Play fill="currentColor" size={28} className="ml-1 text-black group-hover:text-white" />
                      </motion.div>
                    </button>

                    {/* Quote Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Quote size={20} className="text-black" />
                      </div>
                    </div>

                    {/* Patient Info - Bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} size={14} fill="white" className="text-white" />
                        ))}
                      </div>
                      <h3 className="text-white font-bold text-lg mb-1">
                        {testimonial.name}
                      </h3>
                      <p className="text-white/70 text-sm">
                        {testimonial.procedure}
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Quote Card */}
              <div className="bg-zinc-50 border border-black/5 rounded-xl p-6">
                <p className="text-sm text-zinc-700 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-zinc-600 mb-6">
            Join hundreds of satisfied patients who trusted Dr. Antoine Habib
          </p>
          <button className="bg-black text-white px-8 py-4 rounded-xl font-bold hover:bg-zinc-800 transition-colors">
            Share Your Story
          </button>
        </motion.div>
      </div>
    </section>
  );
};


const GoogleReviews = () => {
  const reviews = [
    {
      name: "Refaat Obaido",
      date: "2024-07-23",
      avatar: "R",
      rating: 5,
      text: "الدكتور أكثر من رائع، أكاديمي في المعالجات الفموية والطبيعية المخبرية",
      borderColor: "#4285F4", // Google Blue
      bgColor: "#4285F4"
    },
    {
      name: "Alexandra Malchikova",
      date: "2024-07-22",
      avatar: "A",
      rating: 5,
      text: "Very professional, quick and amazing clinic. Thank you for all procedures which you have performed and completed...",
      borderColor: "#EA4335", // Google Red
      bgColor: "#EA4335"
    },
    {
      name: "Pablo De Guzman",
      date: "2024-07-22",
      avatar: "P",
      rating: 5,
      text: "I am very impressed with this location its neat and clean, the staff always ensures to give the best experience to all patients and they...",
      borderColor: "#FBBC05", // Google Yellow
      bgColor: "#FBBC05"
    },
    {
      name: "Maitha Algaiwani",
      date: "2024-07-22",
      avatar: "M",
      rating: 5,
      text: "مرحبا الدكتور ممتاز جداً ، بعد رفض ٣ عيادات علاج زراعة أسنان فك كامل ، وافق دكتور استوان على عمل زراعة أسنان كاملة حالة...",
      borderColor: "#34A853", // Google Green
      bgColor: "#34A853"
    }
  ];

  return (
    <section className="py-0 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] font-bold opacity-50 mb-4 block">
            Patient Reviews
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mb-4">
            Google Reviews
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={24} fill="#FBBC05" className="text-[#FBBC05]" />
              ))}
            </div>
            <span className="text-2xl font-bold">5.0</span>
            <span className="text-zinc-600">(100+ reviews)</span>
          </div>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="review-stack-wrapper"
            >
              <div className="review-stack">
                {/* Main Card */}
                <div 
                  className="review-card"
                  style={{ borderColor: review.borderColor }}
                >
                  {/* Google Icon */}
                  <div className="absolute top-4 right-4">
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </div>

                  {/* Avatar */}
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4"
                    style={{ backgroundColor: review.bgColor }}
                  >
                    {review.avatar}
                  </div>

                  {/* Name & Date */}
                  <h3 className="font-bold text-lg mb-1">{review.name}</h3>
                  <p className="text-sm text-zinc-500 mb-3">{review.date}</p>

                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#FBBC05" className="text-[#FBBC05]" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-sm text-zinc-700 line-clamp-4 leading-relaxed">
                    {review.text}
                  </p>
                </div>

                {/* Background Stack Cards */}
                <div 
                  className="review-card-before"
                  style={{ borderColor: review.borderColor }}
                />
                <div 
                  className="review-card-after"
                  style={{ borderColor: review.borderColor }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a 
            href="https://g.page/r/YOUR_GOOGLE_PLACE_ID/review" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-xl font-bold hover:bg-zinc-800 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            </svg>
            Write a Review
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const HygieneBanner = () => {
  return (
    <section className="relative py-32 overflow-hidden bg-black text-white">
      <div className="absolute inset-0 opacity-30">
        <img
          src="https://picsum.photos/seed/hygiene/1920/1080"
          alt="Hygiene"
          className="w-full h-full object-cover grayscale"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-serif mb-8">Why Oral Hygiene Matters</h2>
        <p className="text-lg opacity-70 leading-relaxed mb-10">
          Keeping your mouth clean is crucial to your general health. Frequent brushing, flossing, and expert cleanings help avoid the accumulation of plaque and tartar, which can cause cavities and gum disease.
        </p>
        <button className="bg-white text-black px-10 py-5 text-sm uppercase tracking-widest font-bold hover:bg-zinc-200 transition-all" data-ccursor>
          Learn More
        </button>
      </div>
    </section>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 2.4,
      infinite: false,
    });

    // Sync ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href) {
          const target = document.querySelector(href);
          if (target) {
            lenis.scrollTo(target as HTMLElement);
          }
        }
      });
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="relative selection:bg-black selection:text-white">
      <ContextCursor
        radius={24}              // Default is 20 - make bigger/smaller
        transitionSpeed={0.3}    // Default is 0.2 - slower = smoother, faster = snappier
        parallaxIndex={12}       // Default is 10 - higher = less parallax movement
        hoverPadding={8}         // Default is 6 - space around elements when hovering
      />
      <div className="bg-mesh" />
      <div className="bg-noise" />

      {/* Floating Abstract Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-10">
        <motion.div
          animate={{
            y: [0, -40, 0],
            rotate: [0, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[10%] w-[40vw] h-[40vw] border border-black/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 60, 0],
            rotate: [0, -15, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] right-[5%] w-[50vw] h-[50vw] border border-black/5 rounded-full blur-3xl"
        />
      </div>

      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Navbar />
          <Hero />
          <Logos />
          <About />
          <WhyChooseUs />
          <ProgramsCTA />  
          <Stats />
          <MinimalistDivider /> 
          <Specialty />
          <Provisions />
          <Achievements />
          <AppointmentSteps />
          <StatsAndCTA/>
          <Testimonials />
          <GoogleReviews />
          <FAQ />
          <HygieneBanner />
          <ContactForm />
          <Footer />
        </motion.div>
      )}
    </div>
  );
}
