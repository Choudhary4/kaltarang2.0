import React, { useState } from "react";
import Logo from "../assets/kaltarang_logo.png";
import { Menu, X } from "lucide-react"; // Icons for mobile menu

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-transparent z-50 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <img src={Logo} alt="Kaltarang Logo" className="h-20 w-auto" />

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-black font-medium uppercase tracking-wide">
          <li><a href="#events" className="hover:underline">[Events]</a></li>
          <li><a href="#competition" className="hover:underline">[Competition]</a></li>
          <li><a href="#team" className="hover:underline">[Team]</a></li>
          <li><a href="#sponsors" className="hover:underline">[Sponsors]</a></li>
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <ul className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg text-black text-center uppercase p-4 space-y-4">
          <li><a href="#events" onClick={() => setIsOpen(false)}>Events</a></li>
          <li><a href="#competition" onClick={() => setIsOpen(false)}>Competition</a></li>
          <li><a href="#team" onClick={() => setIsOpen(false)}>Team</a></li>
          <li><a href="#sponsors" onClick={() => setIsOpen(false)}>Sponsors</a></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
