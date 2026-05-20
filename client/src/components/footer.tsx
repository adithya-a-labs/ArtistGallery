import { Link } from "wouter";
import { Heart, Mail, Phone, MapPin, Instagram, Twitter, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail("");
  };

  const footerLinks = {
    "Shop": [
      { name: "Paintings", href: "/gallery?category=Paintings" },
      { name: "Photography", href: "/gallery?category=Photography" },
      { name: "Sculpture", href: "/gallery?category=Sculpture" },
      { name: "Prints", href: "/gallery?category=Prints" },
      { name: "Curated Collections", href: "/gallery" },
    ],
    "About": [
      { name: "About ArtSaathi", href: "/about" },
      { name: "Our Artists", href: "/artists" },
      { name: "Art Advisory", href: "/advisory" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
    ],
    "Support": [
      { name: "Help Center", href: "/help" },
      { name: "Shipping & Returns", href: "/shipping" },
      { name: "Size Guide", href: "/size-guide" },
      { name: "Care Instructions", href: "/care" },
      { name: "Contact Us", href: "/contact" },
    ],
    "Legal": [
      { name: "Terms of Service", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Accessibility", href: "/accessibility" },
    ],
  };

  return (
    <footer className="bg-foreground text-background overflow-hidden relative">

      {/* Scattered doodles */}
      <div className="absolute top-12 right-20 opacity-8 animate-wiggle pointer-events-none">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="34" stroke="white" strokeWidth="1" strokeDasharray="6 5" />
        </svg>
      </div>
      <div className="absolute bottom-20 left-10 opacity-6 animate-float pointer-events-none">
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          <rect x="6" y="6" width="44" height="44" stroke="white" strokeWidth="1" strokeDasharray="4 3" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-16 pb-10 relative z-10">

        {/* ── Top: brand + newsletter ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-14 border-b border-background/15 pb-14">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="relative">
                <div className="w-9 h-9 bg-primary rounded-sm rotate-6" />
                <span className="absolute inset-0 flex items-center justify-center text-primary-foreground font-fraunces font-bold text-sm rotate-6">A</span>
              </div>
              <span className="text-2xl font-fraunces font-semibold">
                Art<span className="italic text-primary/80">Saathi</span>
              </span>
            </div>

            <p className="text-background/65 font-dm text-sm leading-relaxed mb-5 max-w-xs">
              India's marketplace for homemade art. Every piece is handmade, original, and comes directly from an artist's home studio.
            </p>

            {/* Handwritten tagline */}
            <p className="handwritten text-background/40 text-lg mb-6">
              made in India, made with love ♥
            </p>

            <div className="flex items-center gap-2">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Twitter, label: "Twitter" },
                { icon: Facebook, label: "Facebook" },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  className="w-9 h-9 rounded-full border border-background/20 flex items-center justify-center text-background/60 hover:text-background hover:border-background/50 transition-all duration-200"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3 lg:pl-8">
            <h3 className="font-fraunces text-2xl font-semibold mb-2">
              Stay in the loop
            </h3>
            <p className="handwritten text-background/50 text-base mb-4">
              new artists, fresh collections, no spam
            </p>
            <p className="text-background/60 font-dm text-sm mb-5">
              Subscribe to hear about new artworks, artist spotlights, and exclusive early access.
            </p>

            {subscribed ? (
              <div className="inline-flex items-center gap-2 bg-background/10 rounded-full px-5 py-3 border border-background/20">
                <Heart className="h-4 w-4 text-primary" />
                <span className="font-dm text-sm text-background/80">You're in! Thanks for subscribing.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-sm">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-background/8 border-background/25 text-background placeholder:text-background/40 focus:border-primary rounded-full font-dm text-sm"
                />
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 font-dm text-sm font-medium"
                >
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* ── Link columns ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14 border-b border-background/15 pb-14">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-fraunces text-sm font-semibold tracking-wide uppercase text-background/50 mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-background/65 hover:text-background font-dm text-sm transition-colors duration-150"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Editorial quote ── */}
        <div className="mb-14 border-b border-background/15 pb-14">
          <div className="max-w-3xl">
            <span className="handwritten text-background/35 text-4xl leading-none block mb-2">"</span>
            <blockquote className="font-instrument italic text-background/75 text-xl leading-relaxed mb-5">
              ArtSaathi bridges the gap between talented homemade artists and art enthusiasts across India.
              Every artwork tells a story of passion and dedication.
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-background/15 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b977?w=36&h=36&fit=crop&crop=face"
                  alt="Priya Sharma"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-fraunces text-sm text-background/80 font-semibold">Priya Sharma</p>
                <p className="text-xs text-background/50 font-dm">Chief Curator & VP, Art Advisory</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Contact + Trust ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14 border-b border-background/15 pb-14">
          {[
            { icon: Mail, label: "Email Us", value: "hello@artsaathi.com" },
            { icon: Phone, label: "Call Us", value: "+91 98765 43210" },
            { icon: MapPin, label: "Based in", value: "Mumbai, India" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-background/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon className="h-3.5 w-3.5 text-background/60" />
              </div>
              <div>
                <p className="font-fraunces text-sm font-semibold text-background/80">{label}</p>
                <p className="text-background/55 font-dm text-sm">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Trust badges ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14 border-b border-background/15 pb-14 text-center">
          {[
            { emoji: "🌏", title: "Artists Across India", desc: "Thousands of independent creators from every corner of the country." },
            { emoji: "🤝", title: "14-Day Satisfaction", desc: "Not happy? Return it within 14 days and we'll help you find something you love." },
            { emoji: "🎨", title: "Free Art Advisory", desc: "Get matched with a curator who knows your taste — no charge." },
          ].map(({ emoji, title, desc }) => (
            <div key={title} className="flex flex-col items-center">
              <div className="text-3xl mb-3">{emoji}</div>
              <h4 className="font-fraunces text-sm font-semibold text-background/80 mb-2">{title}</h4>
              <p className="text-background/50 text-xs font-dm leading-relaxed max-w-[220px]">{desc}</p>
            </div>
          ))}
        </div>

        {/* ── More to Explore ── */}
        <div className="mb-10 border-b border-background/15 pb-10">
          <h3 className="font-fraunces text-xl font-semibold mb-6 text-background/80">More to Explore</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "How to Buy Art You Love", desc: "A guide to finding the perfect artwork for your space.", link: "/guide/buying-art" },
              { title: "Living with Art", desc: "Stories from collectors who transformed their homes.", link: "/stories/living-with-art" },
              { title: "Art for Your Style", desc: "Discover art that complements your personality.", link: "/guide/art-for-your-style" },
            ].map((item) => (
              <div key={item.title}>
                <h4 className="font-fraunces text-sm font-semibold text-background/75 mb-1">{item.title}</h4>
                <p className="text-background/45 text-xs font-dm mb-2 leading-relaxed">{item.desc}</p>
                <Link to={item.link}>
                  <span className="text-primary/80 text-xs font-dm hover:text-primary transition-colors">
                    Read more →
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-background/40 text-xs font-dm">
            © 2025 ArtSaathi. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-background/40 text-xs font-dm">
            <span>Made with</span>
            <Heart className="h-3 w-3 text-primary fill-primary" />
            <span>in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
