import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowRight, Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/cart-store";
import { useState, useEffect, useRef } from "react";

export default function FeaturedCollection() {
  const { addToCart } = useCartStore();
  const [visibleItems, setVisibleItems] = useState(6);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const { data: paintings = [], isLoading } = useQuery({
    queryKey: ["/api/paintings/featured"],
  });

  const paintingsArray = Array.isArray(paintings) ? paintings : [];

  const collections = [
    {
      title: "Chief Curator Picks: Summer 2025",
      description: "Discover our must-have artworks of the season.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      link: "/gallery?collection=curator-picks",
      tag: "curated ✦",
      rotate: "-rotate-1",
    },
    {
      title: "Sacred Geometry",
      description: "Explore the spiritual dimensions of art.",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      link: "/gallery?collection=sacred-geometry",
      tag: "trending",
      rotate: "rotate-1",
    },
    {
      title: "Vibrant Landscapes",
      description: "Bring the beauty of nature inside.",
      image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      link: "/gallery?collection=landscapes",
      tag: "new arrivals",
      rotate: "-rotate-1",
    },
    {
      title: "Contemporary Portraits",
      description: "The human experience makes powerful art.",
      image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      link: "/gallery?collection=portraits",
      tag: "popular",
      rotate: "rotate-1",
    },
    {
      title: "Abstract Expressions",
      description: "Everyday culture elevated to fine art.",
      image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      link: "/gallery?collection=abstract",
      tag: "editor's pick",
      rotate: "-rotate-1",
    },
    {
      title: "Heritage Collection",
      description: "Traditional art with contemporary vision.",
      image: "https://images.unsplash.com/photo-1580136579312-94651dfd596d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      link: "/gallery?collection=heritage",
      tag: "India ♥",
      rotate: "rotate-1",
    }
  ];

  const loadMore = () => {
    setVisibleItems(prev => Math.min(prev + 3, paintingsArray.length));
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-2xl h-56 mb-3" />
                <div className="h-4 bg-muted rounded mb-2 w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="bg-background overflow-hidden">

      {/* ── Collections Grid ── */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Section header — editorial style */}
          <div className={`mb-12 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="flex items-end gap-4 mb-3">
              <h2 className="text-4xl md:text-5xl font-fraunces font-semibold text-foreground leading-tight">
                Featured Artists
                <span className="italic text-primary"> & Collections</span>
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <hr className="indie-divider flex-1 max-w-xs" />
              <span className="handwritten text-muted-foreground text-base">
                handpicked, not algorithm-picked
              </span>
            </div>
          </div>

          {/* Collections grid — slight stagger */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
            {collections.map((collection, index) => (
              <Link
                key={collection.title}
                to={collection.link}
                className={`group block art-card ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="relative overflow-hidden rounded-2xl bg-muted border border-border/40">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/65 via-foreground/10 to-transparent" />
                  </div>

                  {/* Tag — tape style */}
                  <div className="absolute top-3 left-3">
                    <span className="tape-label text-foreground/85 text-xs">
                      {collection.tag}
                    </span>
                  </div>

                  {/* Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-fraunces text-lg text-background leading-snug mb-1">
                      {collection.title}
                    </h3>
                    <p className="text-background/70 text-xs font-dm">{collection.description}</p>
                  </div>

                  {/* Hover CTA */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="bg-background/90 backdrop-blur-sm rounded-full p-2">
                      <ArrowRight className="h-4 w-4 text-foreground" />
                    </div>
                  </div>
                </div>

                <div className="pt-3 px-1">
                  <span className="text-xs font-dm text-muted-foreground group-hover:text-primary transition-colors inline-flex items-center gap-1">
                    Shop Collection <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Artist Support Banner ── torn-paper style ── */}
      <div className="relative bg-foreground py-16 px-4 torn-edge-bottom mb-12">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          {/* Scrapbook decoration */}
          <div className="mb-4">
            <span className="handwritten text-background/50 text-xl">a note from us —</span>
          </div>
          <h3 className="font-fraunces text-3xl md:text-4xl text-background font-semibold mb-4 leading-snug">
            Every purchase supports a real person<br />
            <span className="italic text-primary/80">creating in their home studio.</span>
          </h3>
          <p className="text-background/65 font-dm text-base mb-8 max-w-xl mx-auto leading-relaxed">
            No galleries, no middlemen — just you connecting directly with artists across India who pour their heart into every piece.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 font-dm font-medium hover-lift"
            >
              Become an Artist
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="text-background/80 hover:text-background hover:bg-background/10 rounded-full px-8 font-dm border border-background/20"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Scattered doodles */}
        <div className="absolute top-6 left-8 opacity-10 animate-wiggle">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <circle cx="30" cy="30" r="26" stroke="white" strokeWidth="1.5" strokeDasharray="5 4" />
          </svg>
        </div>
        <div className="absolute bottom-8 right-12 opacity-10 animate-float">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M20 4L24 14H36L26 21L30 32L20 25L10 32L14 21L4 14H16Z" stroke="white" strokeWidth="1.5" fill="none" />
          </svg>
        </div>
      </div>

      {/* ── Featured Artworks ── */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Section header */}
          <div className={`mb-10 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="flex items-baseline gap-3 mb-2">
              <h3 className="text-3xl md:text-4xl font-fraunces font-semibold text-foreground">
                Discover Art You Love
              </h3>
              <span className="handwritten text-muted-foreground text-lg">— real works, real people</span>
            </div>
            <hr className="indie-divider max-w-xs" />
          </div>

          {/* Artwork cards — masonry-feel with alternating sizes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paintingsArray.slice(0, visibleItems).map((painting: any, index: number) => (
              <div
                key={painting.id}
                className={`group art-card bg-card rounded-2xl overflow-hidden border border-border/40 ${
                  isVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${(index + 6) * 70}ms` }}
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ aspectRatio: index % 3 === 1 ? "4/5" : "1/1" }}>
                  <img
                    src={painting.imageUrl}
                    alt={painting.title}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-all duration-300" />

                  {/* Actions */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button className="w-8 h-8 bg-background/90 rounded-full flex items-center justify-center shadow-sm hover:bg-background">
                      <Heart className="h-3.5 w-3.5 text-foreground" />
                    </button>
                    <button
                      className="w-8 h-8 bg-background/90 rounded-full flex items-center justify-center shadow-sm hover:bg-background"
                      onClick={() => addToCart(painting.id)}
                    >
                      <ShoppingBag className="h-3.5 w-3.5 text-foreground" />
                    </button>
                  </div>

                  {/* Sale badge */}
                  {painting.isOnSale && (
                    <div className="absolute top-3 left-3">
                      <span className="tape-label text-xs text-primary font-medium">
                        on sale ↓
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <Link to={`/painting/${painting.id}`}>
                    <h4 className="font-fraunces text-base text-foreground mb-0.5 group-hover:text-primary transition-colors leading-snug">
                      {painting.title}
                    </h4>
                  </Link>
                  <p className="text-xs text-muted-foreground font-dm mb-3">
                    {painting.medium}{painting.dimensions ? ` · ${painting.dimensions}` : ""}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="font-fraunces text-lg font-semibold text-foreground">
                        ₹{painting.price}
                      </span>
                      {painting.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through font-dm">
                          ₹{painting.originalPrice}
                        </span>
                      )}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full text-xs font-dm border-border/70 hover:border-primary hover:text-primary hover:bg-primary/5 h-7 px-3"
                      onClick={() => addToCart(painting.id)}
                    >
                      Add to cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {visibleItems < paintingsArray.length && (
            <div className="text-center mt-10">
              <Button
                variant="outline"
                size="lg"
                onClick={loadMore}
                className="rounded-full px-10 font-dm border-border/70 hover:border-primary hover:text-primary"
              >
                Load More Works
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* ── Shop by Price ── */}
      <div className={`py-16 px-4 bg-muted/40 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-baseline gap-3 mb-8">
            <h3 className="text-2xl font-fraunces font-semibold text-foreground">Shop by Budget</h3>
            <span className="handwritten text-muted-foreground text-base">something for every collector</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Under\n₹500",   range: "under-500",  bg: "bg-olive/12 hover:bg-olive/20",   text: "text-olive"      },
              { label: "₹500–\n₹1000", range: "500-1000",   bg: "bg-primary/10 hover:bg-primary/18", text: "text-primary"   },
              { label: "₹1000–\n₹2000",range: "1000-2000",  bg: "bg-peach/60 hover:bg-peach/80",    text: "text-foreground" },
              { label: "₹2000–\n₹5000",range: "2000-5000",  bg: "bg-rust/10 hover:bg-rust/18",      text: "text-rust"       },
            ].map((price) => (
              <Link key={price.range} to={`/gallery?price=${price.range}`}>
                <div
                  className={`${price.bg} rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 border border-border/40 hover-lift`}
                >
                  <div className={`text-base font-fraunces font-semibold whitespace-pre-line ${price.text} leading-snug`}>
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
