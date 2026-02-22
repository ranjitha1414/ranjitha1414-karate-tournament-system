/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-scroll";
import { FiMenu, FiX, FiGlobe, FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useRegion } from "./RegionContext";

export default function Header({ logo }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isDarkBackground, setIsDarkBackground] = useState(true);
  const { region, setRegion } = useRegion();
  const constraintsRef = useRef(null);
  const mobileConstraintsRef = useRef(null);
  const dropdownRef = useRef(null);
  const headerRef = useRef(null);

  const sections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "venue", label: "Venue" },
    { id: "ticket", label: "Tickets" }, // Spectator Tickets - KarateTournamentHub
    { id: "register", label: "Register" },
    { id: "sponsors", label: "Sponsors" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Detect background color
      if (headerRef.current) {
        const headerRect = headerRef.current.getBoundingClientRect();
        const centerX = window.innerWidth / 2;
        const centerY = headerRect.bottom + 50; // Check 50px below header
        
        const element = document.elementFromPoint(centerX, centerY);
        if (element) {
          const bgColor = window.getComputedStyle(element).backgroundColor;
          const rgb = bgColor.match(/\d+/g);
          
          if (rgb && rgb.length >= 3) {
            // Calculate relative luminance
            const r = parseInt(rgb[0]);
            const g = parseInt(rgb[1]);
            const b = parseInt(rgb[2]);
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            
            // If luminance > 0.5, it's a light background
            setIsDarkBackground(luminance <= 0.5);
          }
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDragEnd = (event, info, isMobile = false) => {
    const threshold = isMobile ? 30 : 50;
    
    if (info.offset.x > threshold) {
      setRegion('others');
    } else if (info.offset.x < -threshold) {
      setRegion('india');
    }
  };

  return (
    <>
      <motion.header
        ref={headerRef}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isDarkBackground ? 'text-white' : 'text-gray-900'
        } ${
          scrolled
            ? "bg-white/10 backdrop-blur-xl shadow-lg border-b border-gray-500/10"
            : "bg-black/5 backdrop-blur-md"
        }`}
      >
        {/* Top Bar with Region Toggle */}
        <motion.div 
          initial={{ height: 'auto', opacity: 1 }}
          animate={{ 
            height: scrolled ? 0 : 'auto',
            opacity: scrolled ? 0 : 1
          }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-r from-red-600/20 to-orange-600/20 border-b border-red-500/20 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-1.5 flex items-center justify-between">
            <div className={`flex items-center space-x-2 text-[11px] transition-colors ${
              isDarkBackground ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <FiGlobe size={12} />
              <span>Select your region:</span>
            </div>
            
            {/* Desktop Draggable Region Slider */}
            <div 
              ref={constraintsRef}
              className="hidden md:flex relative items-center bg-gray-800/80 rounded-lg p-0.5 border border-red-500/30 overflow-hidden"
              style={{ width: '160px', height: '32px' }}
            >
              <motion.div
                drag="x"
                dragConstraints={constraintsRef}
                dragElastic={0.1}
                dragMomentum={false}
                onDragEnd={handleDragEnd}
                animate={{
                  x: region === 'india' ? 0 : 78,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
                className="absolute top-0.5 left-0.5 w-[78px] h-[27px] bg-gradient-to-r from-red-600 to-red-700 rounded-md shadow-lg cursor-grab active:cursor-grabbing z-10"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">
                    {region === 'india' ? '🇮🇳 India' : '🌍 Others'}
                  </span>
                </div>
              </motion.div>

              <div className="absolute inset-0 flex items-center justify-between px-3 pointer-events-none z-0">
                <span className={`text-xs font-semibold transition-opacity duration-300 ${
                  region === 'india' ? 'opacity-0' : 'text-gray-400'
                }`}>
                  🇮🇳 India
                </span>
                <span className={`text-xs font-semibold transition-opacity duration-300 ${
                  region === 'others' ? 'opacity-0' : 'text-gray-400'
                }`}>
                  🌍 Others
                </span>
              </div>

              <button
                onClick={() => setRegion('india')}
                className="absolute left-0 top-0 w-1/2 h-full z-20"
                aria-label="Select India"
              />
              <button
                onClick={() => setRegion('others')}
                className="absolute right-0 top-0 w-1/2 h-full z-20"
                aria-label="Select Others"
              />
            </div>

            {/* Mobile Draggable Region Slider */}
            <div 
              ref={mobileConstraintsRef}
              className="md:hidden relative flex items-center bg-gray-800/80 rounded-lg p-0.5 border border-red-500/30 overflow-hidden"
              style={{ width: '120px', height: '28px' }}
            >
              <motion.div
                drag="x"
                dragConstraints={mobileConstraintsRef}
                dragElastic={0.1}
                dragMomentum={false}
                onDragEnd={(e, info) => handleDragEnd(e, info, true)}
                animate={{
                  x: region === 'india' ? 0 : 58,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
                className="absolute top-0.5 left-0.5 w-[58px] h-[23px] bg-gradient-to-r from-red-600 to-red-700 rounded-md shadow-lg cursor-grab active:cursor-grabbing z-10 touch-none"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[11px] font-bold text-white">
                    {region === 'india' ? '🇮🇳 IN' : '🌍 Others'}
                  </span>
                </div>
              </motion.div>

              <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none z-0">
                <span className={`text-[11px] font-semibold transition-opacity duration-300 ${
                  region === 'india' ? 'opacity-0' : 'text-gray-400'
                }`}>
                  🇮🇳 IN
                </span>
                <span className={`text-[11px] font-semibold transition-opacity duration-300 ${
                  region === 'others' ? 'opacity-0' : 'text-gray-400'
                }`}>
                  🌍 Others
                </span>
              </div>

              <button
                onClick={() => setRegion('india')}
                className="absolute left-0 top-0 w-1/2 h-full z-20"
                aria-label="Select India"
              />
              <button
                onClick={() => setRegion('others')}
                className="absolute right-0 top-0 w-1/2 h-full z-20"
                aria-label="Select Others"
              />
            </div>
          </div>
        </motion.div>

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8">
          {/* Logo Section */}
          <Link to="home" smooth={true} duration={600}>
            <motion.div
              className="flex items-center space-x-3 cursor-pointer py-4"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={logo}
                alt="Karate Cup"
                className={`object-contain transition-all duration-300 ${
                  scrolled ? "h-10" : "h-12"
                }`}
              />
              <div className="hidden sm:block">
                <div 
                  className={`font-bold transition-all leading-tight ${
                    scrolled ? "text-xl" : "text-2xl"
                  } ${isDarkBackground ? 'text-white' : 'text-gray-900'}`}
                >
                  IWKA 2026
                </div>
                <div 
                  className={`text-[10px] font-medium tracking-widest uppercase transition-colors ${
                    isDarkBackground ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  Organized by Born to Fight School
                </div>
              </div>
              {/* Mobile Title */}
              <div className="sm:hidden">
                <div 
                  className={`font-bold transition-all leading-tight ${
                    scrolled ? "text-base" : "text-lg"
                  } ${isDarkBackground ? 'text-white' : 'text-gray-900'}`}
                >
                  IWKA 2026
                </div>
                <div 
                  className={`text-[9px] font-medium tracking-wider uppercase transition-colors ${
                    isDarkBackground ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  Born to Fight School
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {sections.map((section) => (
              <Link
                key={section.id}
                to={section.id}
                spy={true}
                smooth={true}
                duration={600}
                offset={-100}
                onSetActive={() => setActiveSection(section.id)}
                className="cursor-pointer"
              >
                <motion.div
                  whileHover={{ y: -1 }}
                  transition={{ duration: 0.2 }}
                  className={`relative px-5 py-2 text-[15px] font-medium transition-colors ${
                    activeSection === section.id
                      ? isDarkBackground ? "text-white" : "text-gray-900"
                      : isDarkBackground ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {section.label}
                  
                  {activeSection === section.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500"
                      initial={false}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <Link to="register" smooth={true} duration={600} offset={-100} className="hidden lg:block">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-6 py-2.5 rounded-lg text-[15px] font-semibold shadow-sm transition-all"
            >
              Register Now
            </motion.button>
          </Link>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-[112px] left-0 right-0 bg-gray-900/98 backdrop-blur-xl shadow-xl z-40 lg:hidden border-b border-white/5 max-h-[calc(100vh-112px)] overflow-y-auto"
            >
              <nav className="max-w-7xl mx-auto px-6 py-6">
                <div className="space-y-1">
                  {sections.map((section, index) => (
                    <Link
                      key={section.id}
                      to={section.id}
                      spy={true}
                      smooth={true}
                      duration={600}
                      offset={-100}
                      onClick={() => setIsOpen(false)}
                    >
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className={`px-4 py-3 rounded-lg text-base font-medium cursor-pointer transition-colors ${
                          activeSection === section.id
                            ? "bg-red-600 text-white"
                            : "text-gray-300 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        {section.label}
                      </motion.div>
                    </Link>
                  ))}
                </div>

                {/* Mobile CTA */}
                <Link to="register" smooth={true} duration={600} offset={-100}>
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setIsOpen(false)}
                    className="w-full mt-6 bg-gradient-to-r from-red-600 to-red-700 text-white py-3.5 rounded-lg text-base font-semibold shadow-sm"
                  >
                    Register for IWKA 2026
                  </motion.button>
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}