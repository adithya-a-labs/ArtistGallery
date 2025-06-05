import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function HeroSection() {
  const [, setLocation] = useLocation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero-bg pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center min-h-[80vh]">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="font-serif text-5xl md:text-6xl font-bold leading-tight">
                Where Art Meets
                <span className="text-golden"> Soul</span>
              </h2>
              <p className="text-xl text-muted-foreground font-light leading-relaxed">
                Discover original paintings that speak to your heart. Each piece is carefully crafted with passion and authenticity.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                onClick={() => setLocation("/gallery")}
                className="bg-charcoal text-white hover:bg-golden transition-all duration-300 font-medium transform hover:scale-105"
              >
                Explore Collection
              </Button>
              <Button 
                variant="outline"
                size="lg"
                onClick={() => scrollToSection("about")}
                className="border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-white transition-all duration-300 font-medium"
              >
                About the Artist
              </Button>
            </div>
            
            <div className="flex items-center space-x-8 pt-8">
              <div className="text-center">
                <div className="font-serif text-3xl font-bold text-golden">50+</div>
                <div className="text-sm text-muted-foreground">Original Works</div>
              </div>
              <div className="text-center">
                <div className="font-serif text-3xl font-bold text-golden">200+</div>
                <div className="text-sm text-muted-foreground">Happy Collectors</div>
              </div>
              <div className="text-center">
                <div className="font-serif text-3xl font-bold text-golden">5★</div>
                <div className="text-sm text-muted-foreground">Customer Rating</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000" 
                alt="Featured abstract painting with vibrant colors" 
                className="rounded-xl shadow-2xl w-full h-auto max-w-md mx-auto painting-card"
              />
            </div>
            <div className="absolute top-8 right-8 w-32 h-32 bg-golden/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-8 left-8 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
