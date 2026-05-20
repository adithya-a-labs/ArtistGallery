import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ArrowRight, Palette, Heart } from "lucide-react";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [, setLocation] = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const categories = [
    { name: "Paintings", icon: Palette },
    { name: "Abstract", icon: Heart },
    { name: "Oil & Acrylic", icon: Palette },
    { name: "Landscapes", icon: Heart },
    { name: "Large Works", icon: Palette },
    { name: "Curated Picks", icon: Heart },
    { name: "Modern Art", icon: Palette },
    { name: "Sculpture", icon: Heart },
    { name: "Prints", icon: Palette },
  ];

  return (
    <div className="relative overflow-hidden hero-bg">

      {/* Soft organic blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-20 animate-float"
          style={{ background: "radial-gradient(circle, hsl(var(--peach)), transparent 70%)" }}
        />
        <div
          className="absolute top-1/3 -right-32 w-80 h-80 rounded-full opacity-15 animate-drift"
          style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.5), transparent 70%)" }}
        />
        <div
          className="absolute -bottom-16 left-1/4 w-64 h-64 rounded-full opacity-10 animate-float"
          style={{ background: "radial-gradient(circle, hsl(var(--olive) / 0.6), transparent 70%)" }}
        />
      </div>

      {/* Scattered decorative marks */}
      <div className="absolute top-24 right-16 opacity-25 animate-wiggle">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="20" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="4 3" />
        </svg>
      </div>
      <div className="absolute bottom-32 left-12 opacity-20 rotate-slight animate-float">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <rect x="4" y="4" width="28" height="28" stroke="hsl(var(--olive))" strokeWidth="1.5" strokeDasharray="3 2" />
        </svg>
      </div>
      <div className="absolute top-1/2 right-1/4 opacity-15 animate-drift">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L14.5 9H22L16 13.5L18.5 20.5L12 16L5.5 20.5L8 13.5L2 9H9.5Z" stroke="hsl(var(--primary))" strokeWidth="1.2" fill="none" />
        </svg>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 pt-8 pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Asymmetric grid */}
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start min-h-[82vh] pb-8">

            {/* Left — 3 cols: editorial copy */}
            <div className={`lg:col-span-3 flex flex-col justify-center pt-12 lg:pt-20 ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>

              {/* Handwritten kicker */}
              <div className="mb-5 flex items-center gap-3">
                <span className="tape-label text-foreground/80 text-base">
                  homemade with love ♥
                </span>
                <span className="text-muted-foreground/50 text-xs font-dm uppercase tracking-widest">since 2024</span>
              </div>

              {/* Main headline */}
              <h1 className="font-fraunces font-semibold leading-[1.05] mb-6">
                <span className="block text-5xl md:text-6xl lg:text-7xl text-foreground">
                  Discover
                </span>
                <span className="block text-5xl md:text-6xl lg:text-7xl gradient-text italic">
                  Homemade Art
                </span>
                <span className="block text-3xl md:text-4xl lg:text-5xl text-foreground/70 mt-2 font-light">
                  from India's creators
                </span>
              </h1>

              <p className="text-base md:text-lg text-muted-foreground font-dm leading-relaxed mb-8 max-w-lg">
                Connect directly with talented artists working from home studios across India.
                Every piece is handmade, original, and carries a story.
              </p>

              {/* CTA row */}
              <div className="flex flex-wrap gap-3 mb-10">
                <Button
                  size="lg"
                  className="bg-foreground text-background hover:bg-foreground/85 rounded-full px-7 py-5 font-dm font-medium hover-lift text-sm"
                  onClick={() => setLocation("/gallery")}
                >
                  Explore Gallery
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-foreground/30 text-foreground/80 hover:border-primary hover:text-primary rounded-full px-7 py-5 font-dm font-medium text-sm"
                  onClick={() => scrollToSection("about")}
                >
                  Meet the Artists
                </Button>
              </div>

              {/* Social proof strip */}
              <div className="flex items-center gap-6 text-sm text-muted-foreground font-dm">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[
                      "https://images.unsplash.com/photo-1494790108755-2616b612b977?w=32&h=32&fit=crop&crop=face",
                      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
                      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
                    ].map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt="artist"
                        className="w-7 h-7 rounded-full border-2 border-background object-cover"
                      />
                    ))}
                  </div>
                  <span>10,000+ artists</span>
                </div>
                <div className="w-px h-4 bg-border" />
                <span>free artist sign-up</span>
                <div className="w-px h-4 bg-border" />
                <span>₹2k+ pieces sold</span>
              </div>
            </div>

            {/* Right — 2 cols: layered image collage */}
            <div className={`lg:col-span-2 relative flex items-center justify-center pt-8 lg:pt-16 min-h-[420px] ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}>

              {/* Background card — slightly rotated */}
              <div
                className="absolute top-8 right-0 w-52 h-64 rounded-2xl overflow-hidden shadow-lg opacity-70"
                style={{ transform: "rotate(4deg)" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500"
                  alt="Artist at work"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Main image — centered */}
              <div
                className="relative z-10 w-64 h-80 rounded-2xl overflow-hidden shadow-2xl art-frame"
                style={{ transform: "rotate(-2deg)" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=640"
                  alt="Featured Artwork"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="handwritten text-background/90 text-sm block">"Morning Light"</span>
                  <span className="text-background/60 text-xs font-dm">by Ananya Sharma</span>
                </div>
              </div>

              {/* Floating price sticker */}
              <div
                className="absolute bottom-16 right-2 z-20 bg-background rounded-xl px-3 py-2 shadow-lg border border-border/60"
                style={{ transform: "rotate(2deg)" }}
              >
                <div className="text-xs font-dm text-muted-foreground">starting from</div>
                <div className="font-fraunces font-semibold text-primary text-lg leading-tight">₹1,200</div>
              </div>

              {/* Tape accent top */}
              <div
                className="absolute top-4 left-1/4 z-20 bg-peach/80 h-5 w-14 rounded-sm opacity-75 shadow-sm"
                style={{ transform: "rotate(-3deg)" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category pills row */}
      <div className={`relative z-10 border-t border-border/50 bg-muted/30 py-4 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category, index) => (
              <button
                key={category.name}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-border/70 bg-background/70 text-sm font-dm text-foreground/70 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-200"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
