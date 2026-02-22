/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
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
  ChevronDown
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import Lenis from 'lenis';
import { cn } from './lib/utils';
import { ContextCursor } from './components/ContextCursor';

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
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-black flex items-center justify-center rounded-sm">
            <span className="text-white font-serif font-bold text-xl">H</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-lg leading-none tracking-tight">DR. ANTOINE</span>
            <span className="text-[10px] uppercase tracking-[0.2em] opacity-60">Maxillofacial & Dental</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.a 
              key={link.name} 
              href={link.href}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              data-ccursor
              className="text-sm font-medium hover:opacity-50 transition-opacity uppercase tracking-widest"
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
          <div className="aspect-[4/5] bg-zinc-200 overflow-hidden rounded-sm shadow-2xl">
            <img 
              src="https://picsum.photos/seed/doctor/800/1000" 
              alt="Dr. Antoine Habib" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-12 -left-10 bg-white p-10 shadow-2xl hidden lg:block max-w-xs border border-black/5">
            <div className="flex gap-1 mb-4">
              {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="#facc15" className="text-yellow-400" />)}
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
              src="https://picsum.photos/seed/clinic/800/800" 
              alt="Clinic" 
              className="w-full h-full object-cover grayscale"
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
            className="mt-10 group flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em]"
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
  const features = [
    {
      title: "Outstanding Assistance",
      desc: "We use the newest technologies to provide the best dental care in Dubai.",
      icon: <Stethoscope size={32} />
    },
    {
      title: "Personalized Attention",
      desc: "Individualized therapy programs guarantee the greatest results for every patient.",
      icon: <Users size={32} />
    },
    {
      title: "Adaptable Payment",
      desc: "Lowering the cost and increasing access to dental care for everyone.",
      icon: <Clock size={32} />
    },
    {
      title: "Easy Appointments",
      desc: "Schedule your session for a time that works for you with our flexible system.",
      icon: <Calendar size={32} />
    }
  ];

  return (
    <section className="py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif mb-4">Why Choose Us?</h2>
          <div className="w-20 h-1 bg-black mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10, scale: 1.02, boxShadow: "0 20px 40px -20px rgba(0,0,0,0.2)" }}
              data-ccursor="lift"
              className="p-8 border border-black/5 bg-zinc-50 group hover:bg-black hover:text-white transition-all duration-500"
            >
              <div className="mb-6 opacity-50 group-hover:opacity-100 transition-opacity">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold mb-4 uppercase tracking-wider">{f.title}</h3>
              <p className="text-sm opacity-60 group-hover:opacity-80 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Specialty = () => {
  return (
    <section className="py-24 bg-zinc-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] font-bold opacity-50 mb-4 block">Highlighting Specialty</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">What Are Dental Implants?</h2>
          <div className="space-y-6 opacity-70 leading-relaxed text-sm">
            <p>
              Dental implants are a cutting-edge replacement for lost teeth, providing strength, beauty, and practicality. They are perfect for people who have lost teeth, suffered trauma, or suffered periodontal disease-related bone loss.
            </p>
            <p>
              Bone tissue is added during bone transplant treatment for dental implants to increase the volume and density of the jawbone. This is frequently required when the jawbone is not thick enough or strong enough to sustain a dental implant.
            </p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-ccursor="lift"
            className="mt-10 bg-white text-black px-10 py-5 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-zinc-200 transition-all shadow-lg rounded-none"
          >
            Book an Appointment
          </motion.button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="aspect-square bg-zinc-800 rounded-sm overflow-hidden group">
              <img 
                src={`https://picsum.photos/seed/dental-${i}/600/600`} 
                alt="Dental Specialty" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
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
  const items = [
    { title: "10+ International Certificates", desc: "Extensive training in implant and bone graft surgery." },
    { title: "Key Opinion Leader (KOL)", desc: "Trusted expert and influencer in the field with Biohorizons USA." },
    { title: "Local Speaker", desc: "Renowned speaker and lecturer at various conferences and courses in the UAE." }
  ];

  return (
    <section className="py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
        <div className="order-2 md:order-1">
          <h2 className="text-4xl font-serif mb-12">Achievements of Dr. Antoine Habib</h2>
          <div className="space-y-10">
            {items.map((item, i) => (
              <div key={i} className="flex gap-6 group">
                <div className="w-12 h-12 bg-white border border-black/10 flex items-center justify-center shrink-0 group-hover:bg-black group-hover:text-white transition-colors">
                  <Award size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 uppercase tracking-widest">{item.title}</h3>
                  <p className="text-sm text-zinc-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="order-1 md:order-2">
          <div className="aspect-video bg-zinc-200 rounded-sm overflow-hidden shadow-2xl relative">
            <img 
              src="https://picsum.photos/seed/awards/800/600" 
              alt="Achievements" 
              className="w-full h-full object-cover grayscale"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <motion.button 
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                data-ccursor="lift"
                className="w-20 h-20 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Play fill="black" />
              </motion.button>
            </div>
          </div>
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
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = [
    { q: "What Can I Anticipate from My Initial Appointment?", a: "During your first visit, we'll perform a comprehensive examination, including digital scans and X-rays if needed, to discuss your oral health goals and create a personalized treatment plan." },
    { q: "Is Surgery for Dental Implants Painful?", a: "We use advanced anesthesia and minimally invasive techniques to ensure your comfort. Most patients report only minor discomfort, similar to a routine filling." },
    { q: "What is the Duration of Recovery Following Maxillofacial Surgery?", a: "Recovery time varies by procedure, but most patients return to normal activities within 3-7 days. We provide detailed post-operative care instructions to speed up healing." },
    { q: "Are There Better Implant Brands Than Others?", a: "We only use premium, clinically-proven brands like BioHorizons and Straumann, which have the highest success rates and long-term durability." }
  ];

  return (
    <section className="py-24 bg-transparent">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-4xl font-serif mb-12 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-black/10">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                data-ccursor  
                className="w-full py-6 flex items-center justify-between text-left group"
              >
                <span className="text-lg font-bold uppercase tracking-widest group-hover:opacity-60 transition-opacity">{faq.q}</span>
                <ChevronDown className={cn("transition-transform", openIndex === i && "rotate-180")} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-zinc-500 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
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
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-white flex items-center justify-center rounded-sm">
              <span className="text-black font-serif font-bold text-xl">H</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg leading-none tracking-tight">DR. ANTOINE</span>
              <span className="text-[10px] uppercase tracking-[0.2em] opacity-60">Maxillofacial & Dental</span>
            </div>
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
        <div>
          <h4 className="text-xs uppercase tracking-widest font-bold mb-8">Newsletter</h4>
          <p className="text-xs opacity-50 mb-4">Stay updated with our latest news and offers.</p>
          <div className="flex border-b border-white/20 pb-2">
            <input type="email" placeholder="Email Address" className="bg-transparent outline-none text-sm w-full" />
            <motion.button whileHover={{ x: 5 }} data-ccursor className="interactive"><ArrowRight size={18} /></motion.button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 opacity-30 text-[10px] uppercase tracking-[0.3em]">
        <span>© 2026 Dr. Antoine Habib. All rights reserved.</span>
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
          <span className="font-serif italic text-4xl">Habib</span>
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
              <div className="mt-8 text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Step 0{i+1}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    { name: "Patient A", video: "https://picsum.photos/seed/t1/400/600" },
    { name: "Patient B", video: "https://picsum.photos/seed/t2/400/600" },
    { name: "Patient C", video: "https://picsum.photos/seed/t3/400/600" }
  ];

  return (
    <section id="testimonials" className="py-24 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-50 mb-2 block">Our Patients</span>
          <h2 className="text-4xl font-serif">Testimonials</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="aspect-[3/4] bg-zinc-100 rounded-sm overflow-hidden relative group">
              <img 
                src={t.video} 
                alt={t.name} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <Play fill="black" size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const GoogleReviews = () => {
  const reviews = [
    { name: "Alexandra Melnikova", date: "2024-01-15", text: "Very professional, quick and amazing clinic. Thank you for all procedures you have performed." },
    { name: "Pablo De Guzman", date: "2024-02-02", text: "I am very impressed with this location. Its neat and clean, the staff always ensures to give the best experience." },
    { name: "Maitha Algaiwani", date: "2024-02-10", text: "The doctor is very professional and the clinic is very clean. I highly recommend it." }
  ];

  return (
    <section className="py-24 bg-transparent border-y border-black/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-2xl font-serif">Google Reviews</h2>
          <div className="flex items-center gap-2">
            <span className="font-bold">4.9</span>
            <div className="flex gap-1">
              {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="black" />)}
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white p-8 border border-black/5 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center font-bold text-xs">
                  {r.name[0]}
                </div>
                <div>
                  <div className="text-sm font-bold">{r.name}</div>
                  <div className="text-[10px] opacity-40">{r.date}</div>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(i => <Star key={i} size={10} fill="black" />)}
              </div>
              <p className="text-sm text-zinc-500 leading-relaxed italic">"{r.text}"</p>
            </div>
          ))}
        </div>
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
          <AppointmentSteps />
          <Stats />
          <Specialty />
          <Provisions />
          <Achievements />
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
