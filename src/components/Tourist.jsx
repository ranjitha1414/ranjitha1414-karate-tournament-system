/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, Camera, Clock, ChevronLeft, ChevronRight, Calendar, Users, Landmark, Mountain } from "lucide-react";

export default function TouristPlacesSlider() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [activeTab, setActiveTab] = useState("history");
  const [itemsPerView, setItemsPerView] = useState(3);

  const chennaiHistory = [
    {
      id: 1,
      title: "Madras to Chennai",
      subtitle: "A City's Evolution",
      image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop",
      description: "From a small fishing village to India's fourth-largest metropolitan city, Chennai (formerly Madras) has a rich history spanning over 400 years.",
      year: "1639 - Present",
      highlights: [
        "Founded by British East India Company in 1639",
        "Renamed from Madras to Chennai in 1996",
        "Known as the 'Gateway to South India'",
        "Major center for Carnatic music and Bharatanatyam"
      ]
    },
    {
      id: 2,
      title: "Cultural Capital",
      subtitle: "Heritage & Tradition",
      image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&h=600&fit=crop",
      description: "Chennai is renowned as the cultural capital of South India, preserving ancient Tamil traditions while embracing modernity.",
      year: "Ancient Heritage",
      highlights: [
        "Home to classical Carnatic music and dance",
        "Ancient temples dating back centuries",
        "Traditional handloom and handicrafts",
        "Vibrant festivals throughout the year"
      ]
    },
    {
      id: 3,
      title: "Marina Beach Legacy",
      subtitle: "World's Second Longest Beach",
      image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=800&h=600&fit=crop",
      description: "Marina Beach, stretching 13km along the Bay of Bengal, is an iconic symbol of Chennai and a beloved gathering place for locals and tourists.",
      year: "Historic Landmark",
      highlights: [
        "Second longest urban beach in the world",
        "Historic monuments and statues line the promenade",
        "Popular spot for sunrise and sunset views",
        "Heart of Chennai's social life"
      ]
    },
    {
      id: 4,
      title: "Architectural Marvel",
      subtitle: "Colonial & Dravidian Heritage",
      image: "https://images.unsplash.com/photo-1582719366711-a5f8f03edb25?w=800&h=600&fit=crop",
      description: "Chennai showcases a unique blend of Indo-Saracenic architecture, British colonial buildings, and magnificent Dravidian temples.",
      year: "Timeless Architecture",
      highlights: [
        "Indo-Saracenic style Central Railway Station",
        "Ancient Kapaleeshwarar Temple",
        "Colonial-era Fort St. George",
        "Modern IT parks and infrastructure"
      ]
    }
  ];

  const touristPlaces = [
    {
      id: 1,
      name: "Marina Beach",
      image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=800&h=600&fit=crop",
      distance: "8.5 km from venue",
      duration: "20 mins drive",
      category: "Beach",
      description: "The world's second-longest urban beach, perfect for evening walks and experiencing local culture.",
      bestTime: "Early morning or evening",
      activities: ["Beach walks", "Photography", "Local food stalls", "Sunrise/sunset viewing"]
    },
    {
      id: 2,
      name: "Kapaleeshwarar Temple",
      image: "https://images.unsplash.com/photo-1582719366711-a5f8f03edb25?w=800&h=600&fit=crop",
      distance: "12 km from venue",
      duration: "25 mins drive",
      category: "Temple",
      description: "A magnificent 7th-century Hindu temple dedicated to Lord Shiva, showcasing stunning Dravidian architecture.",
      bestTime: "Morning (6 AM - 12 PM)",
      activities: ["Temple visit", "Architecture photography", "Cultural experience", "Prayer rituals"]
    },
    {
      id: 3,
      name: "Fort St. George",
      image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&h=600&fit=crop",
      distance: "10 km from venue",
      duration: "22 mins drive",
      category: "Historical",
      description: "The first English fortress in India, built in 1644, now housing a museum with colonial artifacts.",
      bestTime: "9 AM - 5 PM",
      activities: ["Museum tour", "Historical exploration", "Architecture viewing", "Photography"]
    },
    {
      id: 4,
      name: "Mahabalipuram",
      image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop",
      distance: "55 km from venue",
      duration: "1.5 hours drive",
      category: "UNESCO Site",
      description: "Ancient port city famous for rock-cut temples and sculptures, a UNESCO World Heritage Site.",
      bestTime: "Morning to evening",
      activities: ["Temple exploration", "Beach visit", "Stone carving shopping", "Photography"]
    },
    {
      id: 5,
      name: "Guindy National Park",
      image: "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=800&h=600&fit=crop",
      distance: "6 km from venue",
      duration: "15 mins drive",
      category: "Nature",
      description: "One of the smallest national parks in India, offering a green escape within the city limits.",
      bestTime: "9 AM - 5:30 PM",
      activities: ["Wildlife spotting", "Nature walks", "Bird watching", "Children's park"]
    },
    {
      id: 6,
      name: "Government Museum",
      image: "https://images.unsplash.com/photo-1566127444979-b3d2b654e3b7?w=800&h=600&fit=crop",
      distance: "9 km from venue",
      duration: "20 mins drive",
      category: "Museum",
      description: "One of India's oldest museums featuring bronze sculptures, archaeological findings, and art galleries.",
      bestTime: "9:30 AM - 5 PM",
      activities: ["Museum tour", "Art appreciation", "Historical learning", "Photography"]
    }
  ];

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const currentData = activeTab === "history" ? chennaiHistory : touristPlaces;
  const maxIndex = Math.max(0, currentData.length - itemsPerView);

  const nextSlide = () => {
    if (currentIndex < maxIndex) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleCardClick = (item) => {
    if (selectedPlace?.id === item.id) {
      setSelectedPlace(null);
    } else {
      setSelectedPlace(item);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentIndex(0);
    setSelectedPlace(null);
    setDirection(0);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-4 py-2 rounded-full mb-6"
          >
            <Camera className="w-5 h-5 text-orange-400" />
            <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">Explore Chennai</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Discover the City
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Immerse yourself in Chennai's rich heritage and explore amazing places during your visit
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-2">
            <button
              onClick={() => handleTabChange("history")}
              className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-xl font-semibold transition-all text-sm md:text-base ${
                activeTab === "history"
                  ? "bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Landmark className="w-5 h-5" />
              <span className="hidden sm:inline">Chennai Heritage</span>
              <span className="sm:hidden">Heritage</span>
            </button>
            <button
              onClick={() => handleTabChange("places")}
              className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-xl font-semibold transition-all text-sm md:text-base ${
                activeTab === "places"
                  ? "bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <MapPin className="w-5 h-5" />
              <span className="hidden sm:inline">Tourist Places</span>
              <span className="sm:hidden">Places</span>
            </button>
          </div>
        </motion.div>

        <div className="relative">
          {/* Desktop Navigation Buttons */}
          {currentIndex > 0 && (
            <button
              onClick={prevSlide}
              className="hidden md:block absolute -left-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 p-4 rounded-full transition-all shadow-xl"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
          )}

          {currentIndex < maxIndex && (
            <button
              onClick={nextSlide}
              className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 p-4 rounded-full transition-all shadow-xl"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          )}

          <div className="overflow-hidden">
            <motion.div
              className="flex gap-4"
              animate={{ 
                x: itemsPerView === 1
                  ? `-${currentIndex * 100}%`
                  : itemsPerView === 2
                  ? `calc(-${currentIndex * 50}% - ${currentIndex * 0.5}rem)`
                  : `calc(-${currentIndex * 33.333}% - ${currentIndex * 0.667}rem)`,
              }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 30,
                mass: 0.8
              }}
            >
              {currentData.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="flex-shrink-0"
                  style={{ 
                    width: itemsPerView === 1 
                      ? 'calc(100% - 1rem)' 
                      : itemsPerView === 2 
                      ? 'calc(50% - 0.5rem)'
                      : 'calc(33.333% - 0.667rem)'
                  }}
                >
                  <motion.div
                    whileHover={{ y: -8 }}
                    onClick={() => handleCardClick(item)}
                    onTouchStart={(e) => {
                      const touch = e.touches[0];
                      const startX = touch.clientX;
                      const startY = touch.clientY;
                      let hasMoved = false;

                      const handleTouchMove = (e) => {
                        const touch = e.touches[0];
                        const deltaX = Math.abs(touch.clientX - startX);
                        const deltaY = Math.abs(touch.clientY - startY);
                        
                        if (deltaX > 10 || deltaY > 10) {
                          hasMoved = true;
                        }
                      };

                      const handleTouchEnd = (e) => {
                        const touch = e.changedTouches[0];
                        const endX = touch.clientX;
                        const deltaX = startX - endX;

                        if (!hasMoved) {
                          return;
                        }

                        if (Math.abs(deltaX) > 50) {
                          if (deltaX > 0 && currentIndex < maxIndex) {
                            nextSlide();
                          } else if (deltaX < 0 && currentIndex > 0) {
                            prevSlide();
                          }
                        }

                        document.removeEventListener('touchmove', handleTouchMove);
                        document.removeEventListener('touchend', handleTouchEnd);
                      };

                      document.addEventListener('touchmove', handleTouchMove);
                      document.addEventListener('touchend', handleTouchEnd);
                    }}
                    className={`bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border cursor-pointer transition-all ${
                      selectedPlace?.id === item.id
                        ? "border-orange-500/50 shadow-2xl shadow-orange-500/20"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="relative h-48 md:h-56 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name || item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                      
                      {activeTab === "places" && (
                        <div className="absolute top-4 right-4 bg-orange-600 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg">
                          <span className="text-white font-semibold text-xs md:text-sm">{item.category}</span>
                        </div>
                      )}

                      {activeTab === "history" && (
                        <div className="absolute top-4 right-4 bg-orange-600 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg">
                          <span className="text-white font-semibold text-xs md:text-sm">{item.year}</span>
                        </div>
                      )}

                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                          {item.name || item.title}
                        </h3>
                        {item.subtitle && (
                          <p className="text-orange-400 text-xs md:text-sm font-semibold">{item.subtitle}</p>
                        )}
                      </div>
                    </div>

                    <div className="p-4 md:p-6">
                      {activeTab === "places" ? (
                        <>
                          <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                            <MapPin className="w-4 h-4" />
                            <span>{item.distance}</span>
                          </div>
                          <div className="flex items-center gap-2 text-orange-400 text-sm font-semibold">
                            <Clock className="w-4 h-4" />
                            <span>{item.duration}</span>
                          </div>
                        </>
                      ) : (
                        <p className="text-gray-400 text-sm line-clamp-3">{item.description}</p>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Mobile Navigation Buttons - Below Slider */}
          <div className="flex md:hidden justify-center gap-4 mt-6">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className={`w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 rounded-full transition-all shadow-lg flex items-center justify-center ${
                currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              className={`w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 rounded-full transition-all shadow-lg flex items-center justify-center ${
                currentIndex >= maxIndex ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {selectedPlace && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 32 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                exit={{ y: 20 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-auto md:min-h-[400px]">
                    <img
                      src={selectedPlace.image}
                      alt={selectedPlace.name || selectedPlace.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
                    
                    <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6 bg-black/60 backdrop-blur-xl border border-white/20 rounded-xl p-4">
                      <h4 className="text-white font-bold text-base md:text-lg mb-2">
                        {selectedPlace.name || selectedPlace.title}
                      </h4>
                      {activeTab === "history" && (
                        <div className="flex items-center gap-2 text-orange-400 text-sm font-semibold">
                          <Calendar className="w-4 h-4" />
                          <span>{selectedPlace.year}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                          {selectedPlace.name || selectedPlace.title}
                        </h3>
                        {selectedPlace.subtitle && (
                          <p className="text-orange-400 font-semibold text-base md:text-lg">{selectedPlace.subtitle}</p>
                        )}
                      </div>
                      <motion.button
                        whileHover={{ rotate: 90 }}
                        onClick={() => setSelectedPlace(null)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-all"
                      >
                        <ChevronRight className="w-6 h-6 text-gray-400 rotate-90" />
                      </motion.button>
                    </div>

                    <p className="text-gray-300 leading-relaxed mb-6 text-sm md:text-base">
                      {selectedPlace.description}
                    </p>

                    {activeTab === "places" && (
                      <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-3 md:p-4">
                          <div className="flex items-center gap-2 text-orange-400 mb-2">
                            <Navigation className="w-4 md:w-5 h-4 md:h-5" />
                            <span className="text-xs md:text-sm font-semibold">Distance</span>
                          </div>
                          <p className="text-white font-bold text-base md:text-lg">{selectedPlace.distance}</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-3 md:p-4">
                          <div className="flex items-center gap-2 text-orange-400 mb-2">
                            <Clock className="w-4 md:w-5 h-4 md:h-5" />
                            <span className="text-xs md:text-sm font-semibold">Duration</span>
                          </div>
                          <p className="text-white font-bold text-base md:text-lg">{selectedPlace.duration}</p>
                        </div>
                      </div>
                    )}

                    {activeTab === "places" && selectedPlace.bestTime && (
                      <div className="mb-6">
                        <div className="flex items-center gap-2 text-orange-400 mb-3">
                          <Clock className="w-5 h-5" />
                          <h4 className="font-semibold text-sm md:text-base">Best Time to Visit</h4>
                        </div>
                        <p className="text-gray-300 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm md:text-base">
                          {selectedPlace.bestTime}
                        </p>
                      </div>
                    )}

                    <div>
                      <h4 className="text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                        {activeTab === "places" ? "Activities" : "Highlights"}
                      </h4>
                      <div className="grid gap-2 md:gap-3">
                        {(selectedPlace.activities || selectedPlace.highlights).map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 bg-white/5 border border-white/10 px-3 md:px-4 py-2 md:py-3 rounded-lg hover:border-orange-500/30 transition-all"
                          >
                            <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                            <span className="text-xs md:text-sm text-gray-300">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx ? "w-8 bg-orange-500" : "w-2 bg-white/20 hover:bg-white/30"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}