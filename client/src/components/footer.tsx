import { Link } from "wouter";
import { Instagram, Facebook, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-6">
            <h4 className="font-serif text-2xl font-bold">Elena Artiste</h4>
            <p className="text-gray-300 leading-relaxed max-w-md">
              Original paintings that speak to the soul. Each piece is crafted with passion, authenticity, and a deep connection to artistic expression.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-golden rounded-full flex items-center justify-center hover:bg-white hover:text-charcoal transition-all duration-200"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-golden rounded-full flex items-center justify-center hover:bg-white hover:text-charcoal transition-all duration-200"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-golden rounded-full flex items-center justify-center hover:bg-white hover:text-charcoal transition-all duration-200"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h5 className="font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/gallery" className="hover:text-golden transition-colors duration-200">
                  Gallery
                </Link>
              </li>
              <li>
                <a href="/#about" className="hover:text-golden transition-colors duration-200">
                  About
                </a>
              </li>
              <li>
                <a href="/#contact" className="hover:text-golden transition-colors duration-200">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-golden transition-colors duration-200">
                  Commissions
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold mb-4">Support</h5>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-golden transition-colors duration-200">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-golden transition-colors duration-200">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-golden transition-colors duration-200">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-golden transition-colors duration-200">
                  Care Instructions
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Elena Artiste. All rights reserved. | Designed with passion for art lovers.</p>
        </div>
      </div>
    </footer>
  );
}
