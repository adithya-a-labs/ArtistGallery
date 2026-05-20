import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Search, Menu, X, Heart, User, Globe } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [location] = useLocation();
  const { cartCount, toggleCart } = useCartStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigation = [
    { name: "Paintings", href: "/gallery?category=Paintings" },
    { name: "Photography", href: "/gallery?category=Photography" },
    { name: "Sculpture", href: "/gallery?category=Sculpture" },
    { name: "Drawings", href: "/gallery?category=Drawings" },
    { name: "Prints", href: "/gallery?category=Prints" },
    { name: "Artists", href: "/artists" },
    { name: "Sell Art", href: "/sell-art" },
    { name: "Collections", href: "/gallery" },
    { name: "Support", href: "/support" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/gallery?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      {/* Announcement strip */}
      <div className="bg-foreground text-background text-xs py-2 px-4 text-center font-caveat tracking-wide text-sm">
        ✦ free shipping on orders above ₹2,000 &nbsp;·&nbsp; handmade with love, every piece ✦
      </div>

      <nav className="bg-background/92 backdrop-blur-md border-b border-border/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2 group">
                <div className="relative">
                  <div className="w-8 h-8 bg-primary rounded-sm rotate-6 group-hover:rotate-3 transition-transform duration-300" />
                  <span className="absolute inset-0 flex items-center justify-center text-primary-foreground font-fraunces font-bold text-sm rotate-6 group-hover:rotate-3 transition-transform duration-300">A</span>
                </div>
                <span className="text-xl font-fraunces font-semibold text-foreground ml-1 tracking-tight">
                  Art<span className="text-primary italic">Saathi</span>
                </span>
              </Link>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-3.5 w-3.5" />
                <Input
                  type="text"
                  placeholder="search art, artists, styles…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 w-full rounded-full border-border/80 bg-muted/50 text-sm placeholder:text-muted-foreground/70 focus:border-primary focus:bg-background focus:ring-0"
                />
              </form>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-6">
              {navigation.slice(0, 6).map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-dm transition-colors duration-200 ${
                    location === item.href
                      ? "text-primary font-medium"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/sell-art"
                className="text-sm font-dm font-medium text-primary border border-primary/40 rounded-full px-4 py-1.5 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              >
                Sell Art
              </Link>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-1 ml-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-1 text-foreground/60 hover:text-foreground text-xs font-dm">
                    <Globe className="h-3.5 w-3.5" />
                    <span>IN</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="font-dm text-sm">
                  <DropdownMenuItem>India (₹)</DropdownMenuItem>
                  <DropdownMenuItem>USA ($)</DropdownMenuItem>
                  <DropdownMenuItem>UK (£)</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" size="sm" className="hidden sm:flex text-foreground/60 hover:text-foreground">
                <User className="h-4 w-4" />
              </Button>

              <Button variant="ghost" size="sm" className="hidden sm:flex text-foreground/60 hover:text-foreground">
                <Heart className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={toggleCart}
                className="relative text-foreground/70 hover:text-foreground"
              >
                <ShoppingCart className="h-4 w-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-medium font-dm">
                    {cartCount}
                  </span>
                )}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-foreground/70 hover:text-foreground"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-background border-t border-border/60 animate-fade-in-up">
            <div className="px-4 py-6 space-y-4">
              <form onSubmit={handleSearch} className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-3.5 w-3.5" />
                <Input
                  type="text"
                  placeholder="search art, artists…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-full rounded-full bg-muted/50 border-border/70 text-sm"
                />
              </form>

              <div className="space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-3 py-2.5 text-sm font-dm rounded-md transition-colors ${
                      location === item.href
                        ? "text-primary bg-primary/8 font-medium"
                        : "text-foreground/80 hover:text-foreground hover:bg-muted/60"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="pt-4 border-t border-border/60 space-y-1">
                <Button variant="ghost" className="w-full justify-start text-sm font-dm text-foreground/70">
                  <User className="h-4 w-4 mr-2" /> Account
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm font-dm text-foreground/70">
                  <Heart className="h-4 w-4 mr-2" /> Saved Works
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm font-dm text-foreground/70">
                  <Globe className="h-4 w-4 mr-2" /> Language & Currency
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
