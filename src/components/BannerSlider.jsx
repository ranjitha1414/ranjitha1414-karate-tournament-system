/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";
import slider1 from "../assets/slider1.webp";
import slider2 from "../assets/slider2.webp";
import slider3 from "../assets/slider3.webp";
import slider4 from "../assets/slider1.webp";

// Import your images here
import leftGuyImage from "../assets/left.png";   // Replace with your actual path
import rightGuyImage from "../assets/right.png"; // Replace with your actual path

export default function BannerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      img: slider1,
      title: "IWKA 50 Tournament 2026",
      subtitle: "First Time in India • July 25-26",
      description: "Approved by Grand Master Soke Kichiro Shimabuku - Compete with the best Isshinryu martial artists",
    },
    {
      img: slider2,
      title: "Fight with Honor",
      subtitle: "Born to Fight • One Heart Way",
      description: "Show your strength, discipline, and the true spirit of Isshinryu Karate",
    },
    {
      img: slider3,
      title: "Be a Champion",
      subtitle: "Join 1000+ Participants",
      description: "50+ Isshinryu Dojos • 60+ Qualified Referees • 1500+ Prizes",
    },
    {
      img: slider4,
      title: "Super Early Bird Discounts",
      subtitle: "until February 28, 2026",
      description: "Register now to avail exclusive discounts and secure your spot at the grandest Isshinryu event ever held in India!",
    },
    
  ];

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div 
      id="home" 
      className="relative w-full bg-gray-900 overflow-hidden" 
      style={{ 
        minHeight: '100vh',
        paddingTop: '80px'
      }}
    >
      {/* Background Image with Parallax Effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
          style={{ top: '80px' }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${slides[currentSlide].img})`,
              backgroundPosition: 'center center',
              backgroundSize: 'cover',
            }}
          />
          {/* Enhanced gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/95" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-black/80" />
          
          {/* Left Martial Artist - Desktop/Tablet */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="absolute bottom-0 left-0 pointer-events-none hidden sm:block"
            style={{
              height: '60vh',
              maxHeight: '550px',
              width: 'auto',
              zIndex: 1
            }}
          >
            <div className="relative h-full">
              {/* Blend gradient from left */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent" style={{ width: '150%' }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              <img 
                src={leftGuyImage} 
                alt="Martial Artist" 
                className="h-full w-auto object-contain object-bottom scale-110"
                style={{ 
                  mixBlendMode: 'luminosity',
                  opacity: 0.3,
                  filter: 'contrast(1.1) brightness(0.9)'
                }}
              />
            </div>
          </motion.div>

          {/* Left Martial Artist - Mobile version (positioned higher) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="absolute left-0 pointer-events-none sm:hidden"
            style={{
              bottom: '15vh', // Positioned higher on mobile
              height: '40vh',
              maxHeight: '350px',
              width: 'auto',
              zIndex: 1
            }}
          >
            <div className="relative h-full">
              {/* Blend gradient from left */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent" style={{ width: '200%' }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              <img 
                src={leftGuyImage} 
                alt="Martial Artist" 
                className="h-full w-auto object-contain object-bottom"
                style={{ 
                  mixBlendMode: 'luminosity',
                  opacity: 0.25,
                  filter: 'contrast(1.1) brightness(0.9)'
                }}
              />
            </div>
          </motion.div>

          {/* Right Martial Artist - Desktop/Tablet */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="absolute bottom-0 right-0 pointer-events-none hidden sm:block"
            style={{
              height: '60vh',
              maxHeight: '550px',
              width: 'auto',
              zIndex: 1
            }}
          >
            <div className="relative h-full">
              {/* Blend gradient from right */}
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent" style={{ width: '150%', right: 0 }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              <img 
                src={rightGuyImage} 
                alt="Martial Artist" 
                className="h-full w-auto object-contain object-bottom scale-110"
                style={{ 
                  mixBlendMode: 'luminosity',
                  opacity: 0.3,
                  filter: 'contrast(1.1) brightness(0.9)'
                }}
              />
            </div>
          </motion.div>

          {/* Right Martial Artist - Mobile version (positioned higher) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="absolute right-0 pointer-events-none sm:hidden"
            style={{
              bottom: '15vh', // Positioned higher on mobile
              height: '40vh',
              maxHeight: '350px',
              width: 'auto',
              zIndex: 1
            }}
          >
            <div className="relative h-full">
              {/* Blend gradient from right */}
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent" style={{ width: '200%', right: 0 }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              <img 
                src={rightGuyImage} 
                alt="Martial Artist" 
                className="h-full w-auto object-contain object-bottom"
                style={{ 
                  mixBlendMode: 'luminosity',
                  opacity: 0.25,
                  filter: 'contrast(1.1) brightness(0.9)'
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      
      {/* Content Container */}
      <div 
        className="relative flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12" 
        style={{
          minHeight: 'calc(100vh - 80px)',
          zIndex: 2
        }}
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center text-white space-y-4 sm:space-y-6 md:space-y-8">
            {/* Animated Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-3 sm:space-y-5 md:space-y-6 pt-16 sm:pt-20"
              >
                {/* Subtitle Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="inline-block"
                >
                  <span className="inline-block bg-red-600/90 backdrop-blur-sm px-3 py-1 sm:px-5 sm:py-2 md:px-6 md:py-2 rounded-full text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-wider border border-red-500/30 shadow-lg">
                    {slides[currentSlide].subtitle}
                  </span>
                </motion.div>

                {/* Main Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight px-2"
                >
                  <span className="block bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent drop-shadow-2xl [text-shadow:_0_4px_12px_rgb(0_0_0_/_60%)]">
                    {slides[currentSlide].title}
                  </span>
                </motion.h1>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed px-4 drop-shadow-lg"
                  style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
                >
                  {slides[currentSlide].description}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4 px-4"
                >
                  <Link
                    to="register"
                    smooth={true}
                    duration={800}
                    offset={-80}
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-8 py-3 sm:px-10 sm:py-4 rounded-lg text-base sm:text-lg font-semibold shadow-2xl transition-all duration-300 w-full sm:w-auto sm:min-w-[200px] active:shadow-xl"
                    >
                      Register Now
                    </motion.button>
                  </Link>
                  <Link
                    to="about"
                    smooth={true}
                    duration={800}
                    offset={-80}
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white/10 backdrop-blur-sm border-2 border-white/40 hover:bg-white/20 px-8 py-3 sm:px-10 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-all duration-300 w-full sm:w-auto sm:min-w-[200px] shadow-xl active:shadow-lg"
                    >
                      Learn More
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Stats Bar - Fixed for mobile */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="pt-6 sm:pt-8 md:pt-10"
            >
              <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl">
                  {/* Mobile: 2x2 Grid */}
                  <div className="grid grid-cols-2 lg:hidden gap-0">
                    {/* Row 1 */}
                    <div className="text-center py-4 px-2">
                      <div className="text-2xl sm:text-3xl font-bold text-white mb-1">1000+</div>
                      <div className="text-xs sm:text-sm text-gray-300 font-medium">Participants</div>
                    </div>
                    
                    <div className="text-center py-4 px-2 border-l border-white/30">
                      <div className="text-2xl sm:text-3xl font-bold text-white mb-1">1500+</div>
                      <div className="text-xs sm:text-sm text-gray-300 font-medium">Prizes</div>
                    </div>
                    
                    {/* Row 2 */}
                    <div className="text-center py-4 px-2 border-t border-white/30">
                      <div className="text-2xl sm:text-3xl font-bold text-white mb-1">50+</div>
                      <div className="text-xs sm:text-sm text-gray-300 font-medium">Dojos</div>
                    </div>
                    
                    <div className="text-center py-4 px-2 border-t border-l border-white/30">
                      <div className="text-2xl sm:text-3xl font-bold text-white mb-1">60+</div>
                      <div className="text-xs sm:text-sm text-gray-300 font-medium">Referees</div>
                    </div>
                  </div>

                  {/* Desktop: 1x4 Grid */}
                  <div className="hidden lg:grid grid-cols-4 gap-0">
                    <div className="text-center py-4 px-4">
                      <div className="text-4xl lg:text-5xl font-bold text-white mb-1">1000+</div>
                      <div className="text-sm text-gray-300 font-medium">Participants</div>
                    </div>
                    
                    <div className="text-center py-4 px-4 border-l border-white/30">
                      <div className="text-4xl lg:text-5xl font-bold text-white mb-1">1500+</div>
                      <div className="text-sm text-gray-300 font-medium">Prizes</div>
                    </div>
                    
                    <div className="text-center py-4 px-4 border-l border-white/30">
                      <div className="text-4xl lg:text-5xl font-bold text-white mb-1">50+</div>
                      <div className="text-sm text-gray-300 font-medium">Dojos</div>
                    </div>
                    
                    <div className="text-center py-4 px-4 border-l border-white/30">
                      <div className="text-4xl lg:text-5xl font-bold text-white mb-1">60+</div>
                      <div className="text-sm text-gray-300 font-medium">Referees</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows - Higher z-index */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-sm hover:bg-black/60 border border-white/30 p-3 sm:p-4 rounded-full transition-all duration-300 group z-30 active:scale-95"
        aria-label="Previous slide"
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:-translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-sm hover:bg-black/60 border border-white/30 p-3 sm:p-4 rounded-full transition-all duration-300 group z-30 active:scale-95"
        aria-label="Next slide"
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot Indicators - Higher z-index */}
      <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group relative p-2"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div
              className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "w-10 sm:w-12 bg-red-600 shadow-lg shadow-red-600/50"
                  : "w-2 sm:w-2.5 bg-white/50 hover:bg-white/70"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="hidden md:flex absolute bottom-4 lg:bottom-6 left-0 w-full justify-center z-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <Link
            to="about"
            smooth={true}
            duration={800}
            offset={-80}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-1 cursor-pointer group"
            >
              <span className="text-white/60 text-sm font-medium group-hover:text-white/80 transition-colors">
                Scroll to explore
              </span>
              <svg
                className="w-6 h-6 text-white/60 group-hover:text-white/80 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}