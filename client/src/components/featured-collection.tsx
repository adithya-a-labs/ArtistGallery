import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowRight, Star, Heart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/cart-store";
import { useState, useEffect } from "react";

export default function FeaturedCollection() {
  const { addToCart } = useCartStore();
  const [visibleItems, setVisibleItems] = useState(6);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const { data: paintings = [], isLoading } = useQuery({
    queryKey: ["/api/paintings/featured"],
  });

  const collections = [
    {
      title: "Chief Curator Picks: Summer 2025",
      description: "Discover our must-have artworks of the season.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      link: "/gallery?collection=curator-picks",
      color: "from-primary to-accent"
    },
    {
      title: "Sacred Geometry",
      description: "Explore the spiritual dimensions of art.",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      link: "/gallery?collection=sacred-geometry",
      color: "from-indigo to-emerald"
    },
    {
      title: "Vibrant Landscapes",
      description: "Bring the beauty of nature inside.",
      image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      link: "/gallery?collection=landscapes",
      color: "from-emerald to-saffron"
    },
    {
      title: "Contemporary Portraits",
      description: "The human experience makes powerful art.",
      image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      link: "/gallery?collection=portraits",
      color: "from-terracotta to-henna"
    },
    {
      title: "Abstract Expressions",
      description: "Everyday culture elevated to fine art.",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      link: "/gallery?collection=abstract",
      color: "from-accent to-primary"
    },
    {
      title: "Heritage Collection",
      description: "Traditional art with contemporary vision.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      link: "/gallery?collection=heritage",
      color: "from-turmeric to-primary"
    }
  ];

  const loadMore = () => {
    setVisibleItems(prev => Math.min(prev + 3, paintings.length));
  };

  if (isLoading) {
    return (
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-xl h-64 mb-4"></div>
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30 indian-pattern">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Featured Collections Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-spectral">
            Featured Collections
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-poppins">
            Discover curated collections that celebrate the rich tapestry of Indian art and culture
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {collections.map((collection, index) => (
            <Card 
              key={collection.title} 
              className={`group overflow-hidden hover-lift hover-glow cursor-pointer ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-0">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={collection.image} 
                    alt={collection.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${collection.color} opacity-60 group-hover:opacity-70 transition-opacity duration-300`} />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-xl font-bold mb-2 font-spectral">{collection.title}</h3>
                    <p className="text-sm opacity-90 font-poppins">{collection.description}</p>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <Link to={collection.link}>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-center hover:bg-primary/10 hover:text-primary font-poppins"
                    >
                      Shop The Collection
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Reward Section */}
        <div className={`bg-gradient-to-r from-primary to-accent rounded-3xl p-8 md:p-12 text-center text-white mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h3 className="text-3xl md:text-4xl font-bold mb-4 font-spectral">
            Collect More, Earn More
          </h3>
          <p className="text-xl mb-6 font-poppins">
            Spend ₹5,000 or more on original art and receive up to ₹3,000 in ArtSaathi credit.
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="bg-white text-primary hover:bg-white/90 px-8 py-6 font-semibold hover-lift font-poppins"
          >
            Learn More
          </Button>
        </div>

        {/* Featured Artworks */}
        <div className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-spectral">
              Discover Art You Love
            </h3>
            <p className="text-lg text-muted-foreground font-poppins">
              From the World's Leading Online Gallery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paintings.slice(0, visibleItems).map((painting: any, index: number) => (
              <Card 
                key={painting.id} 
                className={`group overflow-hidden hover-lift hover-glow ${
                  isVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${(index + 6) * 100}ms` }}
              >
                <CardContent className="p-0">
                  <div className="relative aspect-square overflow-hidden">
                    <img 
                      src={painting.imageUrl} 
                      alt={painting.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 right-4 space-y-2">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        onClick={() => addToCart(painting.id)}
                      >
                        <Star className="h-4 w-4" />
                      </Button>
                    </div>
                    {painting.isOnSale && (
                      <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                        Sale
                      </Badge>
                    )}
                  </div>
                  <div className="p-6">
                    <Link to={`/painting/${painting.id}`}>
                      <h4 className="text-lg font-semibold text-foreground mb-2 hover:text-primary transition-colors font-spectral">
                        {painting.title}
                      </h4>
                    </Link>
                    <p className="text-sm text-muted-foreground mb-4 font-poppins">
                      {painting.medium} • {painting.dimensions}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-foreground font-poppins">
                          ₹{painting.price}
                        </span>
                        {painting.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through font-poppins">
                            ₹{painting.originalPrice}
                          </span>
                        )}
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => addToCart(painting.id)}
                        className="hover-lift font-poppins"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {visibleItems < paintings.length && (
            <div className="text-center mt-12">
              <Button 
                variant="outline" 
                size="lg" 
                onClick={loadMore}
                className="px-8 py-6 hover-lift font-poppins"
              >
                Load More Artworks
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Price Range Categories */}
        <div className={`mt-24 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h3 className="text-3xl font-bold text-center mb-12 font-spectral">Shop by Price</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "UNDER\n₹500", range: "under-500", color: "from-emerald to-saffron" },
              { label: "₹500 -\n₹1000", range: "500-1000", color: "from-saffron to-terracotta" },
              { label: "₹1000 -\n₹2000", range: "1000-2000", color: "from-terracotta to-primary" },
              { label: "₹2000 -\n₹5000", range: "2000-5000", color: "from-primary to-accent" }
            ].map((price, index) => (
              <Link key={price.range} to={`/gallery?price=${price.range}`}>
                <div className={`bg-gradient-to-br ${price.color} rounded-xl p-6 text-center text-white hover-lift hover-glow cursor-pointer`}>
                  <div className="text-lg font-bold whitespace-pre-line font-poppins">
                    {price.label}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}