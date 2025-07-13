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
  DropdownMenuSeparator,
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
    { name: "Inspiration", href: "/gallery" },
    { name: "Art Advisory", href: "/gallery" },
    { name: "Trade", href: "/gallery" },
    { name: "Curated Deals", href: "/gallery" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/gallery?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2 hover-lift">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <span className="text-xl font-bold text-foreground font-spectral">ArtSaathi</span>
              </Link>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search art or artist"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full rounded-full border-border focus:border-primary focus:ring-primary/20"
                />
              </form>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigation.slice(0, 6).map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-primary font-poppins ${
                    location === item.href ? "text-primary" : "text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Currency & Language */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="hidden sm:flex items-center space-x-1">
                    <Globe className="h-4 w-4" />
                    <span className="text-sm font-poppins">IN</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <span className="font-poppins">India (₹)</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span className="font-poppins">USA ($)</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span className="font-poppins">UK (£)</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Account */}
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                <User className="h-4 w-4" />
              </Button>

              {/* Favorites */}
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                <Heart className="h-4 w-4" />
              </Button>

              {/* Cart */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleCart}
                className="relative hover-lift"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold animate-pulse">
                    {cartCount}
                  </span>
                )}
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-background border-t border-border animate-slide-in-left">
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search art or artist"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full rounded-full"
                />
              </form>

              {/* Mobile Navigation */}
              <div className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-3 py-2 text-base font-medium transition-colors duration-200 hover:text-primary hover:bg-primary/10 rounded-md font-poppins ${
                      location === item.href ? "text-primary bg-primary/10" : "text-foreground"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Mobile Actions */}
              <div className="pt-4 border-t border-border space-y-2">
                <Button variant="ghost" className="w-full justify-start font-poppins">
                  <User className="h-4 w-4 mr-2" />
                  Account
                </Button>
                <Button variant="ghost" className="w-full justify-start font-poppins">
                  <Heart className="h-4 w-4 mr-2" />
                  Favorites
                </Button>
                <Button variant="ghost" className="w-full justify-start font-poppins">
                  <Globe className="h-4 w-4 mr-2" />
                  Language & Currency
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}