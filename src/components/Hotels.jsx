/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useAnimation } from "framer-motion";
import { MapPin, Navigation, Star, Phone, Mail, ChevronLeft, ChevronRight, ExternalLink, Bed, Wifi, Coffee, Car } from "lucide-react";

// Demo Ribbon Component
const DemoRibbon = () => (
  <div className="absolute top-0 left-0 w-24 h-24 overflow-hidden pointer-events-none z-20">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="absolute -top-6 -left-6 w-24 h-24 flex items-center justify-center"
    >
      <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-gray-900 px-8 py-1 transform rotate-[-45deg] shadow-xl border-b-2 border-yellow-700">
        <span className="font-bold text-[9px] tracking-widest uppercase">DEMO</span>
      </div>
    </motion.div>
  </div>
);

export default function HotelSlider() {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [hotelImageIndex, setHotelImageIndex] = useState({});
  const controls = useAnimation();

  // Hotels near Jawaharlal Nehru Stadium, Chennai
  const hotels = [
    {
      id: 1,
      name: "Royal Paris Hotel",
      images: [
        "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&h=600&fit=crop",
      ],
      address: "No. 8, Raja Muthiah Road, Periyamet, Chennai - 600003",
      distance: "0.3 km from stadium",
      rating: 4.4,
      amenities: ["Free WiFi", "24hr Service", "Restaurant", "Budget Friendly"],
      price: "₹1,900",
      bookingLink: "https://www.booking.com/hotel/in/royal-paris-chennai1.html"
    },
    {
      id: 2,
      name: "Hotel Pearl International",
      images: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop",
      ],
      address: "39, V.V. Koil Street, Periyamet, Chennai - 600003",
      distance: "0.6 km from stadium",
      rating: 4.3,
      amenities: ["Free WiFi", "Restaurant", "Parking", "Room Service"],
      price: "₹2,400",
      bookingLink: "https://www.goibibo.com/hotels/chennai-hotels-near-jawaharlal_nehru_stadium/"
    },
    {
      id: 3,
      name: "Greens Elite Hotel",
      images: [
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&h=600&fit=crop",
      ],
      address: "No.12, Poongavanapuram, Near Chennai Central, Chennai - 600003",
      distance: "0.9 km from stadium",
      rating: 4.5,
      amenities: ["Restaurant", "AC Rooms", "Room Service", "Free Parking"],
      price: "₹3,000",
      bookingLink: "https://www.agoda.com/search?city=12681&checkIn=2026-07-25&checkOut=2026-07-26"
    },
    {
      id: 4,
      name: "Hotel White Park",
      images: [
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop",
      ],
      address: "No. 1, EVK Sampath Road, Periyamet, Chennai - 600003",
      distance: "0.7 km from stadium",
      rating: 4.2,
      amenities: ["Free WiFi", "Breakfast", "24hr Front Desk", "Family Rooms"],
      price: "₹2,200",
      bookingLink: "https://www.goibibo.com/hotels/chennai-hotels-near-jawaharlal_nehru_stadium/"
    },
    {
      id: 5,
      name: "Ramada by Wyndham Chennai Egmore",
      images: [
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&h=600&fit=crop",
      ],
      address: "Gandhi Irwin Road, Egmore, Chennai - 600008",
      distance: "1.4 km from stadium",
      rating: 4.6,
      amenities: ["Pool", "Gym", "Restaurant", "Business Centre"],
      price: "₹5,200",
      bookingLink: "https://www.booking.com/hotel/in/ramada-plaza-chennai.html"
    },
    {
      id: 6,
      name: "Taj Connemara Chennai",
      images: [
        "https://images.unsplash.com/photo-1549294413-26f195200c16?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
      ],
      address: "Binny Road, Anna Salai, Chennai - 600002",
      distance: "2.7 km from stadium",
      rating: 4.8,
      amenities: ["Luxury Suites", "Pool", "Spa", "Fine Dining"],
      price: "₹9,000",
      bookingLink: "https://www.booking.com/hotel/in/taj-connemara.html"
    }
  ];
  
  // Responsive items per view
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2); // Tablet/Small screen
      } else {
        setItemsPerView(3); // Desktop
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, hotels.length - itemsPerView);

  const nextSlide = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleHotelClick = (hotel) => {
    if (selectedHotel?.id === hotel.id) {
      setSelectedHotel(null);
    } else {
      setSelectedHotel(hotel);
    }
  };

  const cycleHotelImage = (hotelId, totalImages) => {
    setHotelImageIndex(prev => ({
      ...prev,
      [hotelId]: ((prev[hotelId] || 0) + 1) % totalImages
    }));
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-red-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-orange-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-4 sm:mb-6"
          >
            <Bed className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
            <span className="text-red-400 font-semibold text-xs sm:text-sm uppercase tracking-wider">Accommodation</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 px-4">
            Nearby Hotels
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4">
            Comfortable stays near Jawaharlal Nehru Stadium, Chennai. Book your accommodation for the championship.
          </p>
        </motion.div>

        {/* Hotel Slider */}
        <div className="relative">
          {/* Desktop Navigation Buttons */}
          {currentIndex > 0 && (
            <button
              onClick={prevSlide}
              className="hidden md:block absolute -left-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 p-4 rounded-full transition-all shadow-xl active:scale-95"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
          )}

          {currentIndex < maxIndex && (
            <button
              onClick={nextSlide}
              className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 p-4 rounded-full transition-all shadow-xl active:scale-95"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          )}

          {/* Hotel Cards Container */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-3 sm:gap-4"
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
              {hotels.map((hotel) => (
                <motion.div
                  key={hotel.id}
                  className="flex-shrink-0"
                  style={{ 
                    width: itemsPerView === 1 
                      ? 'calc(100% - 0.75rem)' 
                      : itemsPerView === 2 
                      ? 'calc(50% - 0.5rem)'
                      : 'calc(33.333% - 0.667rem)'
                  }}
                >
                  <motion.div
                    whileHover={{ y: -8 }}
                    onClick={() => handleHotelClick(hotel)}
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
                    className={`bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl overflow-hidden border cursor-pointer transition-all relative ${
                      selectedHotel?.id === hotel.id
                        ? "border-red-500/50 shadow-2xl shadow-red-500/20"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    {/* Demo Ribbon */}
                    <DemoRibbon />

                    {/* Hotel Image */}
                    <div 
                      className="relative h-40 sm:h-48 overflow-hidden group/image"
                      onTouchStart={(e) => {
                        if (hotel.images.length <= 1) return;
                        e.stopPropagation();
                        const touch = e.touches[0];
                        const startX = touch.clientX;
                        let hasMoved = false;

                        const handleImageTouchMove = (e) => {
                          const touch = e.touches[0];
                          const deltaX = Math.abs(touch.clientX - startX);
                          if (deltaX > 5) {
                            hasMoved = true;
                          }
                        };

                        const handleImageTouchEnd = (e) => {
                          e.stopPropagation();
                          const touch = e.changedTouches[0];
                          const endX = touch.clientX;
                          const deltaX = startX - endX;

                          if (hasMoved && Math.abs(deltaX) > 30) {
                            const currentIdx = hotelImageIndex[hotel.id] || 0;
                            if (deltaX > 0) {
                              // Swipe left - next image
                              setHotelImageIndex(prev => ({
                                ...prev,
                                [hotel.id]: (currentIdx + 1) % hotel.images.length
                              }));
                            } else {
                              // Swipe right - previous image
                              setHotelImageIndex(prev => ({
                                ...prev,
                                [hotel.id]: (currentIdx - 1 + hotel.images.length) % hotel.images.length
                              }));
                            }
                          }

                          document.removeEventListener('touchmove', handleImageTouchMove);
                          document.removeEventListener('touchend', handleImageTouchEnd);
                        };

                        document.addEventListener('touchmove', handleImageTouchMove);
                        document.addEventListener('touchend', handleImageTouchEnd);
                      }}
                    >
                      <img
                        src={hotel.images[hotelImageIndex[hotel.id] || 0]}
                        alt={hotel.name}
                        className="w-full h-full object-cover transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      
                      {/* Image Navigation Dots */}
                      {hotel.images.length > 1 && (
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-1.5 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full opacity-100 md:opacity-0 md:group-hover/image:opacity-100 transition-opacity">
                          {hotel.images.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={(e) => {
                                e.stopPropagation();
                                setHotelImageIndex(prev => ({
                                  ...prev,
                                  [hotel.id]: idx
                                }));
                              }}
                              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
                                (hotelImageIndex[hotel.id] || 0) === idx 
                                  ? 'bg-white w-3 sm:w-4' 
                                  : 'bg-white/50 hover:bg-white/70'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                      
                      {/* Price Badge */}
                      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-red-600 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg shadow-lg">
                        <span className="text-white font-bold text-xs sm:text-sm">{hotel.price}/night</span>
                      </div>

                      {/* Rating */}
                      <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-white font-semibold text-xs sm:text-sm">{hotel.rating}</span>
                      </div>
                    </div>

                    {/* Hotel Info */}
                    <div className="p-3 sm:p-4 md:p-6">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1.5 sm:mb-2 line-clamp-1">{hotel.name}</h3>
                      <div className="flex items-start gap-2 text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3">
                        <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-2">{hotel.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-red-400 text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
                        <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>{hotel.distance}</span>
                      </div>

                      {/* Amenities */}
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] sm:text-xs bg-white/5 border border-white/10 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md text-gray-300"
                          >
                            {amenity}
                          </span>
                        ))}
                        {hotel.amenities.length > 3 && (
                          <span className="text-[10px] sm:text-xs bg-white/5 border border-white/10 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md text-gray-300">
                            +{hotel.amenities.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Mobile Navigation Buttons - Below Slider */}
          <div className="flex md:hidden justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className={`w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 rounded-full transition-all shadow-lg flex items-center justify-center active:scale-95 ${
                currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              className={`w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 rounded-full transition-all shadow-lg flex items-center justify-center active:scale-95 ${
                currentIndex >= maxIndex ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Expanded Hotel Details */}
        <AnimatePresence>
          {selectedHotel && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 24 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                exit={{ y: 20 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Left Side - Image */}
                  <div 
                    className="relative h-48 sm:h-64 md:h-auto md:min-h-[400px] group/expanded"
                    onTouchStart={(e) => {
                      if (selectedHotel.images.length <= 1) return;
                      e.stopPropagation();
                      const touch = e.touches[0];
                      const startX = touch.clientX;
                      let hasMoved = false;

                      const handleExpandedImageTouchMove = (e) => {
                        const touch = e.touches[0];
                        const deltaX = Math.abs(touch.clientX - startX);
                        if (deltaX > 5) {
                          hasMoved = true;
                        }
                      };

                      const handleExpandedImageTouchEnd = (e) => {
                        e.stopPropagation();
                        const touch = e.changedTouches[0];
                        const endX = touch.clientX;
                        const deltaX = startX - endX;

                        if (hasMoved && Math.abs(deltaX) > 30) {
                          const currentIdx = hotelImageIndex[selectedHotel.id] || 0;
                          if (deltaX > 0) {
                            // Swipe left - next image
                            setHotelImageIndex(prev => ({
                              ...prev,
                              [selectedHotel.id]: (currentIdx + 1) % selectedHotel.images.length
                            }));
                          } else {
                            // Swipe right - previous image
                            setHotelImageIndex(prev => ({
                              ...prev,
                              [selectedHotel.id]: (currentIdx - 1 + selectedHotel.images.length) % selectedHotel.images.length
                            }));
                          }
                        }

                        document.removeEventListener('touchmove', handleExpandedImageTouchMove);
                        document.removeEventListener('touchend', handleExpandedImageTouchEnd);
                      };

                      document.addEventListener('touchmove', handleExpandedImageTouchMove);
                      document.addEventListener('touchend', handleExpandedImageTouchEnd);
                    }}
                  >
                    <img
                      src={selectedHotel.images[hotelImageIndex[selectedHotel.id] || 0]}
                      alt={selectedHotel.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
                    
                    {/* Image Navigation for Expanded View */}
                    {selectedHotel.images.length > 1 && (
                      <>
                        <div className="absolute top-3 sm:top-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 bg-black/50 backdrop-blur-sm px-2 py-1.5 sm:px-3 sm:py-2 rounded-full">
                          {selectedHotel.images.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={(e) => {
                                e.stopPropagation();
                                setHotelImageIndex(prev => ({
                                  ...prev,
                                  [selectedHotel.id]: idx
                                }));
                              }}
                              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all ${
                                (hotelImageIndex[selectedHotel.id] || 0) === idx 
                                  ? 'bg-white w-4 sm:w-6' 
                                  : 'bg-white/50 hover:bg-white/70'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Right Side - Details */}
                  <div className="p-5 sm:p-6 md:p-8">
                    <div className="flex items-start justify-between mb-4 sm:mb-6">
                      <div className="flex-1 min-w-0 pr-2">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">{selectedHotel.name}</h3>
                        <div className="flex items-center gap-2 flex-wrap">
                          <div className="flex items-center gap-1 bg-yellow-500/20 border border-yellow-500/30 px-2 py-1 sm:px-3 sm:py-1 rounded-lg">
                            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-yellow-400 font-bold text-sm">{selectedHotel.rating}</span>
                          </div>
                          <span className="text-gray-400 text-xs sm:text-sm">Excellent</span>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedHotel(null)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-all flex-shrink-0"
                      >
                        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 rotate-90" />
                      </motion.button>
                    </div>

                    {/* Address */}
                    <div className="mb-4 sm:mb-6">
                      <div className="flex items-start gap-2 sm:gap-3 text-gray-300 mb-2 sm:mb-3">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 text-red-400 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm sm:text-base">{selectedHotel.address}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 text-red-400 font-semibold text-sm sm:text-base">
                        <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>{selectedHotel.distance}</span>
                      </div>
                    </div>

                    {/* Amenities Grid */}
                    <div className="mb-4 sm:mb-6">
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2 sm:mb-3">Amenities</h4>
                      <div className="grid grid-cols-2 gap-2 sm:gap-3">
                        {selectedHotel.amenities.map((amenity, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 bg-white/5 border border-white/10 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg"
                          >
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                            <span className="text-xs sm:text-sm text-gray-300 line-clamp-1">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price and Book Button */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-white/10">
                      <div>
                        <p className="text-xs sm:text-sm text-gray-400 mb-0.5 sm:mb-1">Starting from</p>
                        <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{selectedHotel.price}<span className="text-sm sm:text-base md:text-lg text-gray-400">/night</span></p>
                      </div>
                      <motion.a
                        href={selectedHotel.bookingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base transition-all shadow-lg shadow-red-500/30 w-full sm:w-auto justify-center"
                      >
                        <span>Book Now</span>
                        <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Indicators */}
        <div className="flex justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx ? "w-6 sm:w-8 bg-red-500" : "w-1.5 sm:w-2 bg-white/20 hover:bg-white/30"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}