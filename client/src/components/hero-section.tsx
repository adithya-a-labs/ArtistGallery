import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ArrowRight, Star, Palette, Heart } from "lucide-react";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [, setLocation] = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10 overflow-hidden indian-pattern">
      {/* Announcement Banner */}
      <div className="bg-primary text-primary-foreground py-3 px-4 text-center text-sm font-medium animate-shimmer">
        <div className="flex items-center justify-center gap-2">
          <Star className="h-4 w-4" />
          <span>Join 10,000+ Artists & Art Lovers - Free Registration for Artists</span>
          <Star className="h-4 w-4" />
        </div>
      </div>

      {/* Background Art Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-accent rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-32 w-48 h-48 bg-primary/30 rounded-full blur-3xl animate-float delay-1000" />
        <div className="absolute bottom-40 left-1/3 w-24 h-24 bg-emerald rounded-full blur-3xl animate-float delay-2000" />
      </div>

      {/* Hero Carousel Section */}
      <div className="relative z-10 min-h-screen flex items-center pt-16">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className={`space-y-8 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold leading-tight font-spectral">
                  <span className="gradient-text">Discover</span>
                  <br />
                  <span className="text-foreground">Homemade Art</span>
                </h1>
                <p className="text-xl text-muted-foreground font-poppins">
                  Connect directly with talented homemade artists across India
                </p>
              </div>
              
              <div className="flex gap-4">
                <Button 
                  size="lg" 
                  className="bg-foreground text-background hover:bg-foreground/90 px-8 py-6 font-semibold hover-lift font-poppins"
                  onClick={() => setLocation("/gallery")}
                >
                  Explore Gallery
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background px-8 py-6 font-semibold hover-lift font-poppins"
                  onClick={() => scrollToSection("about")}
                >
                  Learn More
                </Button>
              </div>
            </div>

            {/* Right Content - Featured Art */}
            <div className={`relative ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
              <div className="relative aspect-[4/3] bg-card rounded-2xl shadow-2xl overflow-hidden hover-glow">
                <img 
                  src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Featured Artwork" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2 font-spectral">Featured Collection</h3>
                  <p className="text-sm opacity-90 font-poppins">Discover masterpieces from talented artists</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className={`relative z-10 pb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: "Paintings", icon: Palette },
              { name: "Abstract Art", icon: Star },
              { name: "Oil Paintings", icon: Heart },
              { name: "Landscapes", icon: Palette },
              { name: "Large Works", icon: Star },
              { name: "Acrylic Paintings", icon: Heart },
              { name: "Curated Collections", icon: Palette },
              { name: "Modern Art", icon: Star },
              { name: "Sculpture", icon: Heart }
            ].map((category, index) => (
              <Button
                key={category.name}
                variant="outline"
                size="sm"
                className="border-border hover:border-primary hover:bg-primary/10 rounded-full px-6 py-3 hover-lift font-poppins"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <category.icon className="h-4 w-4 mr-2" />
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute bottom-20 left-10 opacity-30">
        <div className="w-16 h-16 bg-accent rounded-lg rotate-12 animate-float" />
      </div>
      <div className="absolute top-32 right-20 opacity-30">
        <div className="w-12 h-12 bg-primary rounded-full animate-pulse" />
      </div>
      <div className="absolute top-1/2 left-5 opacity-20">
        <div className="w-8 h-8 bg-accent rounded-full animate-float delay-500" />
      </div>
    </div>
  );
}