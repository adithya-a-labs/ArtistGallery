import HeroSection from "@/components/hero-section";
import FeaturedCollection from "@/components/featured-collection";
import ContactForm from "@/components/contact-form";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedCollection />
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h3 className="font-serif text-4xl font-bold mb-4">About Elena Artiste</h3>
                <div className="artistic-divider h-0.5 w-24 mb-6"></div>
              </div>
              
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  With over 15 years of experience in contemporary art, Elena Artiste has developed a distinctive style that bridges the gap between classical techniques and modern expression. Her work explores the interplay of color, texture, and emotion.
                </p>
                <p>
                  Each painting is a journey through layers of meaning, where abstract forms dance with intentional brushstrokes to create pieces that speak directly to the soul. Elena's work has been featured in galleries across the country and finds homes with collectors who appreciate authentic artistic expression.
                </p>
                <p className="font-accent italic text-lg text-foreground">
                  "Art is not what you see, but what you make others see. Each brushstroke carries a piece of my heart into the world."
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="font-serif text-2xl font-bold text-golden mb-1">15+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="font-serif text-2xl font-bold text-golden mb-1">300+</div>
                  <div className="text-sm text-muted-foreground">Works Created</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800" 
                alt="Elena Artiste in her art studio" 
                className="rounded-xl shadow-2xl w-full h-auto"
              />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-golden/20 rounded-full blur-3xl"></div>
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>
      <ContactForm />
    </div>
  );
}
