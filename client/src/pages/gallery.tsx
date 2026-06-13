import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import PaintingCard from "@/components/painting-card";
import { apiUrl } from "@/lib/api";
import type { Painting } from "@shared/schema";

export default function Gallery() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [priceFilter, setPriceFilter] = useState("All Prices");

  const { data: paintings = [], isLoading } = useQuery<Painting[]>({
    queryKey: ["/api/paintings"],
  });

  const { data: filteredPaintings = [] } = useQuery<Painting[]>({
    queryKey: ["/api/paintings/filter", { category: categoryFilter, priceRange: priceFilter }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (categoryFilter !== "All Categories") params.set("category", categoryFilter);
      if (priceFilter !== "All Prices") params.set("priceRange", priceFilter);
      
      const res = await fetch(apiUrl(`/api/paintings/filter?${params}`));
      if (!res.ok) throw new Error("Failed to fetch filtered paintings");
      return res.json();
    },
    enabled: categoryFilter !== "All Categories" || priceFilter !== "All Prices",
  });

  const { data: searchResults = [] } = useQuery<Painting[]>({
    queryKey: ["/api/paintings/search", searchQuery],
    queryFn: async () => {
      const res = await fetch(apiUrl(`/api/paintings/search/${encodeURIComponent(searchQuery)}`));
      if (!res.ok) throw new Error("Failed to search paintings");
      return res.json();
    },
    enabled: searchQuery.length > 0,
  });

  const displayedPaintings = searchQuery.length > 0 
    ? searchResults 
    : (categoryFilter !== "All Categories" || priceFilter !== "All Prices") 
      ? filteredPaintings 
      : paintings;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-golden mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 bg-muted">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl font-bold mb-4">Complete Gallery</h1>
            <div className="artistic-divider h-0.5 w-24 mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Browse through our complete collection of original paintings
            </p>
          </div>
          
          {/* Search and Filter Bar */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search paintings..."
                  className="pl-12 h-12 border-border focus:ring-golden focus:border-golden"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-48 h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Categories">All Categories</SelectItem>
                    <SelectItem value="Abstract">Abstract</SelectItem>
                    <SelectItem value="Landscape">Landscape</SelectItem>
                    <SelectItem value="Modern">Modern</SelectItem>
                    <SelectItem value="Space">Space</SelectItem>
                    <SelectItem value="Portrait">Portrait</SelectItem>
                    <SelectItem value="Still Life">Still Life</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={priceFilter} onValueChange={setPriceFilter}>
                  <SelectTrigger className="w-48 h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Prices">All Prices</SelectItem>
                    <SelectItem value="Under $500">Under $500</SelectItem>
                    <SelectItem value="$500 - $1000">$500 - $1000</SelectItem>
                    <SelectItem value="$1000 - $2000">$1000 - $2000</SelectItem>
                    <SelectItem value="Over $2000">Over $2000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Gallery Grid */}
          {displayedPaintings.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {displayedPaintings.map((painting) => (
                <PaintingCard key={painting.id} painting={painting} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-2">No paintings found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter criteria
              </p>
              <Button 
                onClick={() => {
                  setSearchQuery("");
                  setCategoryFilter("All Categories");
                  setPriceFilter("All Prices");
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
