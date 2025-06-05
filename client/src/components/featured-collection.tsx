import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import PaintingCard from "./painting-card";
import type { Painting } from "@shared/schema";

export default function FeaturedCollection() {
  const [, setLocation] = useLocation();

  const { data: featuredPaintings = [], isLoading } = useQuery<Painting[]>({
    queryKey: ["/api/paintings/featured"],
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="font-serif text-4xl font-bold mb-4">Featured Collection</h3>
            <div className="artistic-divider h-0.5 w-24 mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Handpicked masterpieces that showcase the depth and beauty of contemporary art
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="w-full h-64 bg-muted animate-pulse"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-muted animate-pulse rounded"></div>
                  <div className="h-3 bg-muted animate-pulse rounded w-2/3"></div>
                  <div className="h-6 bg-muted animate-pulse rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="font-serif text-4xl font-bold mb-4">Featured Collection</h3>
          <div className="artistic-divider h-0.5 w-24 mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Handpicked masterpieces that showcase the depth and beauty of contemporary art
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {featuredPaintings.map((painting) => (
            <PaintingCard key={painting.id} painting={painting} featured />
          ))}
        </div>
        
        <div className="text-center">
          <Button 
            variant="outline"
            size="lg"
            onClick={() => setLocation("/gallery")}
            className="border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-white transition-all duration-300 font-medium"
          >
            View Full Collection
          </Button>
        </div>
      </div>
    </section>
  );
}
