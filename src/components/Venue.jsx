/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiCalendar, FiCreditCard, FiClock, FiUsers, FiAward, FiChevronLeft, FiChevronRight } from "react-icons/fi";


import stadium3 from "../assets/stadium3.jpg";
import stadium4 from "../assets/stadium4.jpg";

export default function Venue() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Google Maps embed URL
  const embedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.2148569285773!2d80.2717282!3d13.0855653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265fbe6a909ab%3A0x5a6046dfc9f0d784!2sJawaharlal%20Nehru%20Stadium!5e0!3m2!1sen!2sin!4v1762014986067!5m2!1sen!2sin";
  
  const directMapLink = "https://maps.app.goo.gl/w3kTi12FARcPNHMf9";

  // Stadium images
  const stadiumImages = [
  
    {
      src: stadium3,
      caption: "Indoor Arena Facility",
      fallback: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800&h=600&fit=crop"
    },
    {
      src: stadium4,
      caption: "Stadium Ground View",
      fallback: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop"
    }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % stadiumImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + stadiumImages.length) % stadiumImages.length);
  };

  const details = [
    {
      title: "Venue",
      icon: <FiMapPin size={32} />,
      description: "Jawaharlal Nehru Stadium",
      subdesc: "Chennai, Tamil Nadu",
    },
    {
      title: "Date",
      icon: <FiCalendar size={32} />,
      description: "25-26 July 2026",
      subdesc: "Gates open at 8:00 AM",
    },
    {
      title: "Entry Fee",
      icon: <FiCreditCard size={32} />,
      description: "Starting ₹2,500 + GST",
      subdesc: "Per participant",
    },
  ];

  const highlights = [
    { icon: <FiClock size={20} />, text: "2 Days Event" },
    { icon: <FiUsers size={20} />, text: "18+ Categories" },
    { icon: <FiAward size={20} />, text: "1500+ Trophies" },
  ];

  return (
    <section id="venue" className="py-12 sm:py-16 md:py-24 bg-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #000 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <span className="inline-block bg-red-100 text-red-600 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider mb-3 sm:mb-4">
            Event Information
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
            Tournament Details
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Everything you need to know about the championship
          </p>
        </motion.div>

        {/* Stadium Image Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-10 md:mb-12"
        >
          <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <div className="relative">
              {/* Image Container */}
              <div className="relative h-[300px] sm:h-[400px] md:h-[500px] bg-gradient-to-br from-gray-800 to-gray-900">
                <img 
                  src={stadiumImages[currentImageIndex].src}
                  alt={stadiumImages[currentImageIndex].caption}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = stadiumImages[currentImageIndex].fallback;
                  }}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <p className="text-white text-sm sm:text-base md:text-lg font-semibold drop-shadow-2xl">
                    {stadiumImages[currentImageIndex].caption}
                  </p>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-all z-10"
                  aria-label="Previous image"
                >
                  <FiChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-all z-10"
                  aria-label="Next image"
                >
                  <FiChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                {/* Image Indicators */}
                <div className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
                  {stadiumImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === currentImageIndex 
                          ? "w-8 bg-white" 
                          : "w-2 bg-white/50 hover:bg-white/70"
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

             
            </div>
          </div>
        </motion.div>

        {/* Main Details Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10 md:mb-12">
          {details.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group relative bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-t-xl sm:rounded-t-2xl" />

              {/* Icon */}
              <div className="mb-4 sm:mb-5 md:mb-6 inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-red-50 rounded-lg sm:rounded-xl text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                <div className="scale-75 sm:scale-90 md:scale-100">
                  {item.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1.5 sm:mb-2">
                {item.title}
              </h3>
              <p className="text-lg sm:text-xl font-semibold text-gray-800 mb-0.5 sm:mb-1">
                {item.description}
              </p>
              <p className="text-xs sm:text-sm text-gray-500">
                {item.subdesc}
              </p>

              {/* Hover Effect Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </motion.div>
          ))}
        </div>

        {/* Highlights Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 text-white"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
            {/* Highlights */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 w-full md:w-auto">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2 sm:gap-3"
                >
                  <div className="text-red-500">
                    {item.icon}
                  </div>
                  <span className="text-xs sm:text-sm font-medium">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
              className="w-full md:w-auto"
            >
              <a href="#register" className="block">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full md:w-auto bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold text-sm whitespace-nowrap transition-all shadow-lg hover:shadow-xl"
                >
                  Secure Your Spot
                </motion.button>
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Map Section - Single Map Display */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 sm:mt-10 md:mt-12 bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm border border-gray-100"
        >
          <div className="grid md:grid-cols-5 gap-0">
            {/* Map Embed */}
            <div className="md:col-span-3 bg-gray-100 h-[350px] sm:h-[450px] md:h-[500px] relative">
              <iframe
                src={embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Venue Map"
                className="w-full h-full"
              ></iframe>
            </div>

            {/* Location Details */}
            <div className="md:col-span-2 p-5 sm:p-6 md:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                How to Reach
              </h3>
              
              <div className="space-y-4 sm:space-y-5 md:space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1.5 sm:mb-2 flex items-center gap-2 text-sm sm:text-base">
                    <span className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center bg-red-100 rounded-lg text-sm sm:text-base flex-shrink-0">📍</span>
                    Address
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    Jawaharlal Nehru Stadium,<br />
                    Raja Muthiah Road,<br />
                    Kannappar Thidal, Periyamet,<br />
                    Chennai, Tamil Nadu - 600003
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-1.5 sm:mb-2 flex items-center gap-2 text-sm sm:text-base">
                    <span className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center bg-blue-100 rounded-lg text-sm sm:text-base flex-shrink-0">🚇</span>
                    Metro Station
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Central Metro Station - 1.8 km<br />
                    <span className="text-gray-500 text-[10px] sm:text-xs">(Blue Line - 6 min drive)</span>
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-1.5 sm:mb-2 flex items-center gap-2 text-sm sm:text-base">
                    <span className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center bg-sky-100 rounded-lg text-sm sm:text-base flex-shrink-0">✈️</span>
                    Airport
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Chennai Int'l Airport - 18 km<br />
                    <span className="text-gray-500 text-[10px] sm:text-xs">(35-45 min drive)</span>
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-1.5 sm:mb-2 flex items-center gap-2 text-sm sm:text-base">
                    <span className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center bg-purple-100 rounded-lg text-sm sm:text-base flex-shrink-0">🚉</span>
                    Railway Station
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Chennai Central - 1.5 km<br />
                    <span className="text-gray-500 text-[10px] sm:text-xs">(5-7 min drive)</span>
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-1.5 sm:mb-2 flex items-center gap-2 text-sm sm:text-base">
                    <span className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center bg-orange-100 rounded-lg text-sm sm:text-base flex-shrink-0">🚌</span>
                    Public Transport
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Multiple MTC bus routes<br />
                    <span className="text-gray-500 text-[10px] sm:text-xs">(Walking distance from stadium)</span>
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-1.5 sm:mb-2 flex items-center gap-2 text-sm sm:text-base">
                    <span className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center bg-green-100 rounded-lg text-sm sm:text-base flex-shrink-0">🚗</span>
                    Parking
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Ample free parking available<br />
                    <span className="text-gray-500 text-[10px] sm:text-xs">(No parking fee for participants)</span>
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2.5 sm:py-3 rounded-lg font-medium text-xs sm:text-sm transition-all mt-3 sm:mt-4 flex items-center justify-center gap-2 shadow-lg active:shadow-md"
                  onClick={() => window.open(directMapLink, '_blank')}
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Open in Google Maps
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}