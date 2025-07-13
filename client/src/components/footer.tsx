import { Link } from "wouter";
import { Heart, Mail, Phone, MapPin, Instagram, Twitter, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  const footerLinks = {
    "Shop": [
      { name: "Paintings", href: "/gallery?category=Paintings" },
      { name: "Photography", href: "/gallery?category=Photography" },
      { name: "Sculpture", href: "/gallery?category=Sculpture" },
      { name: "Prints", href: "/gallery?category=Prints" },
      { name: "Curated Collections", href: "/gallery" },
    ],
    "About": [
      { name: "About ArtSaathi", href: "/about" },
      { name: "Our Artists", href: "/artists" },
      { name: "Art Advisory", href: "/advisory" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
    ],
    "Support": [
      { name: "Help Center", href: "/help" },
      { name: "Shipping & Returns", href: "/shipping" },
      { name: "Size Guide", href: "/size-guide" },
      { name: "Care Instructions", href: "/care" },
      { name: "Contact Us", href: "/contact" },
    ],
    "Legal": [
      { name: "Terms of Service", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Accessibility", href: "/accessibility" },
    ],
  };

  return (
    <footer className="bg-gradient-to-br from-foreground to-foreground/90 text-background py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <span className="text-2xl font-bold font-spectral">ArtSaathi</span>
            </div>
            <p className="text-background/80 mb-6 leading-relaxed font-poppins">
              Discover and buy original artworks from India's most talented artists. 
              Each piece tells a unique story of passion, creativity, and cultural heritage.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-background/80 hover:text-background hover:bg-background/10">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-background/80 hover:text-background hover:bg-background/10">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-background/80 hover:text-background hover:bg-background/10">
                <Facebook className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-4 font-spectral">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-background/80 hover:text-background transition-colors duration-200 font-poppins"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-background/20 pt-12 mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4 font-spectral">Stay Connected</h3>
            <p className="text-background/80 mb-6 font-poppins">
              Subscribe to our newsletter and be the first to know about new artworks, exclusive collections, and special offers.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-background/10 border-background/20 text-background placeholder-background/60 focus:border-primary"
              />
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 font-poppins"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-background/20 pt-12 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-2">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold font-spectral">Email Us</h4>
              <p className="text-background/80 font-poppins">support@artsaathi.com</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-2">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold font-spectral">Call Us</h4>
              <p className="text-background/80 font-poppins">+91 98765 43210</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-2">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold font-spectral">Visit Us</h4>
              <p className="text-background/80 font-poppins">Mumbai, India</p>
            </div>
          </div>
        </div>

        {/* Art Advisory Quote */}
        <div className="border-t border-background/20 pt-12 mb-12">
          <div className="max-w-4xl mx-auto text-center">
            <blockquote className="text-lg italic mb-4 font-spectral">
              "At ArtSaathi, we make it our mission to help you discover and buy from the best emerging artists around the world. 
              Whether you're looking to discover a new artist, add a statement piece to your home, or commemorate an important life event, 
              ArtSaathi is your portal to thousands of original works by today's top artists."
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full"></div>
              <div>
                <p className="font-semibold font-spectral">Priya Sharma</p>
                <p className="text-sm text-background/80 font-poppins">Chief Curator & VP, Art Advisory</p>
              </div>
            </div>
            <Link to="/advisory">
              <Button 
                variant="outline" 
                className="mt-6 border-background/20 text-background hover:bg-background/10 font-poppins"
              >
                Work with an Art Advisor
              </Button>
            </Link>
          </div>
        </div>

        {/* More to Explore */}
        <div className="border-t border-background/20 pt-12 mb-12">
          <h3 className="text-2xl font-bold text-center mb-8 font-spectral">More to Explore</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "How to Buy Art You Love",
                description: "A comprehensive guide to finding the perfect artwork for your space and style.",
                link: "/guide/buying-art"
              },
              {
                title: "Living with Art",
                description: "Stories from collectors who have transformed their homes with meaningful art.",
                link: "/stories/living-with-art"
              },
              {
                title: "Art for Your Style",
                description: "Discover how to choose art that complements your unique aesthetic and personality.",
                link: "/guide/art-for-your-style"
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <h4 className="font-semibold mb-2 font-spectral">{item.title}</h4>
                <p className="text-background/80 text-sm mb-4 font-poppins">{item.description}</p>
                <Link to={item.link}>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-primary hover:text-primary/80 hover:bg-primary/10 font-poppins"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-background/20 pt-12 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-gradient-to-br from-emerald to-saffron rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌏</span>
              </div>
              <h4 className="font-semibold mb-2 font-spectral">Global Selection</h4>
              <p className="text-background/80 text-sm font-poppins">
                Explore an unparalleled selection of paintings, photography, sculpture, and more by thousands of artists from around the world.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2 font-spectral">Satisfaction Guaranteed</h4>
              <p className="text-background/80 text-sm font-poppins">
                Our 14-day satisfaction guarantee allows you to buy with confidence. If you're not satisfied, return it and we'll help you find a work you love.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-gradient-to-br from-indigo to-emerald rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h4 className="font-semibold mb-2 font-spectral">Complimentary Art Advisory</h4>
              <p className="text-background/80 text-sm font-poppins">
                Our personalized art advisory service gives you access to your own expert curator, free of charge.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-background/60 text-sm font-poppins">
              © 2025 ArtSaathi. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-background/60 text-sm font-poppins">Made with</span>
              <Heart className="h-4 w-4 text-primary" />
              <span className="text-background/60 text-sm font-poppins">in India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}