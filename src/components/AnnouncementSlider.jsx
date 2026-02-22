/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiGift, FiShoppingBag, FiStar, FiClock } from "react-icons/fi";

export default function AnnouncementsSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const region = 'india'; // Default region
  const buddle_price = region === 'india' ? '₹6,000' : '$80';

  const announcements = [
    {
      id: 1,
      icon: <FiClock size={40} />,
      badge: "Limited Time",
      title: "Early Bird Discount",
      subtitle: "Register Before February 28th!",
      description: "Be among the first to register and enjoy exclusive early bird benefits. Save big on everything!",
      highlights: [
        "upto 10% OFF on All Event Registrations",
        "Priority Placement in Categories",
      ],
      bgGradient: "from-orange-600 to-red-600",
      accentColor: "orange",
      note: "Offer valid only until Feb 28th, 2026. All prices exclude GST.",
    },
    {
      id: 2,
      icon: <FiGift size={40} />,
      badge: "Lucky Draw",
      title: "Lucky Draw Competition",
      subtitle: "50 Winners, Amazing Prizes!",
      description: "All registered participants are automatically entered into our exclusive lucky draw. No separate registration needed!",
      highlights: [
        "1st Prize (2 Winners): ₹10,000 Worth Each",
        "2nd Prize (5 Winners): ₹5,000 Worth Each",
        "3rd Prize (8 Winners): ₹3,000 Worth Each",
        "4th Prize (10 Winners): ₹2,000 Worth Each",
        "5th Prize (25 Winners): ₹1,000 Worth Each",
      ],
      bgGradient: "from-purple-600 to-indigo-600",
      accentColor: "purple",
      note: "Prize values exclude GST. Winners announced on tournament day!",
    },
    {
      id: 3,
      icon: <FiShoppingBag size={40} />,
      badge: "Special Offer",
      title: "3 Events Bundle Pack",
      subtitle: "Save ₹1,500 & Get Exclusive Perks",
      description: "Register for all 3 events and unlock amazing benefits with our special bundle pricing!",
      highlights: [
        `Bundle Price: ${buddle_price} (Save ₹1,500)`,
        "Free Exclusive Tournament T-Shirt",
        "Complimentary Food & Refreshments",
        "Priority Check-in Access",
      ],
      bgGradient: "from-emerald-600 to-teal-600",
      accentColor: "emerald",
      note: "Individual event price: ₹2,500 each. All prices exclude GST.",
    },
    {
      id: 4,
      icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
      badge: "Exclusive",
      title: "Tournament Magazine",
      subtitle: "Feature Your Achievement!",
      description: "Get featured in our special tournament magazine with highlights, updates, and memorable moments from the event!",
      highlights: [
        "Comprehensive Tournament Coverage",
        "Photo Gallery & Event Highlights",
        "Optional Participant Photo Features",
        "Achievement Recognition Section",
        "Collectible Souvenir Edition",
      ],
      bgGradient: "from-rose-600 to-pink-600",
      accentColor: "rose",
      note: "Passport-size photo inclusion is optional. Contact us for photo submission.",
    },
    {
      id: 5,
      icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
      badge: "Support",
      title: "Official Selection Letter",
      subtitle: "For School & College Permission",
      description: "Need permission from your school or college to participate? We provide official selection letters for all registered students!",
      highlights: [
        "Official IWKA Selection Letter (contact via email)",
        "Valid for School/College Submissions",
        "Includes Tournament Details",
        "Professional Format & Seal",
        "Fast Processing & Delivery",
      ],
      bgGradient: "from-blue-600 to-cyan-600",
      accentColor: "blue",
      note: "Contact our team for selection letter requests and assistance.",
    },
    {
      id: 6,
      icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
      badge: "Coverage",
      title: "Media & Press Coverage",
      subtitle: "Showcase Your Talent!",
      description: "Media and press representatives will be invited to cover the entire tournament, bringing visibility to participants and the martial arts community!",
      highlights: [
        "Professional Media Coverage",
        "Press Representatives Invited",
        "Photo & Video Documentation",
        "Social Media Highlights",
        "Recognition for Achievements",
      ],
      bgGradient: "from-amber-600 to-yellow-600",
      accentColor: "amber",
      note: "Media coverage helps showcase student achievements and promote martial arts.",
    },
  ];
  
  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % announcements.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [currentSlide, isPaused]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const current = announcements[currentSlide];

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-teal-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
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
          <span className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider mb-3 sm:mb-4">
            Special Announcements
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 px-4">
            Don't Miss Out!
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto px-4 mb-6 sm:mb-8">
            Exclusive offers and exciting opportunities for all participants
          </p>

          {/* Announcement Categories Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 max-w-5xl mx-auto px-4">
            {announcements.map((announcement, index) => (
              <motion.button
                key={announcement.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => goToSlide(index)}
                className="group relative p-3 sm:p-4 rounded-xl sm:rounded-2xl overflow-hidden"
              >
                {/* Base Background */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-white/5" />
                
                {/* Animated Gradient Background */}
                <motion.div
                  className={`absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br ${announcement.bgGradient} shadow-lg`}
                  initial={false}
                  animate={{
                    opacity: currentSlide === index ? 1 : 0,
                    scale: currentSlide === index ? 1 : 0.95,
                  }}
                  transition={{ 
                    duration: 0.4, 
                    ease: "easeInOut",
                    opacity: { duration: 0.3 }
                  }}
                />
                
                {/* Hover Background */}
                <div className={`absolute inset-0 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  currentSlide === index ? 'pointer-events-none' : ''
                }`} />

                {/* Active Indicator Border */}
                <motion.div
                  className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-white/30"
                  initial={false}
                  animate={{
                    opacity: currentSlide === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <motion.div
                    className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
                    animate={{
                      scale: currentSlide === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <motion.div
                      className="scale-75 sm:scale-100"
                      animate={{
                        color: currentSlide === index ? '#ffffff' : '#d1d5db',
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      {announcement.icon}
                    </motion.div>
                  </motion.div>
                  <motion.span
                    className="text-[10px] sm:text-xs font-semibold text-center leading-tight"
                    animate={{
                      color: currentSlide === index ? '#ffffff' : '#d1d5db',
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {announcement.badge}
                  </motion.span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Slider Container */}
        <div 
          className="relative pb-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main Slide */}
          <div className="relative overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) * velocity.x;
                  if (swipe < -10000) {
                    nextSlide();
                  } else if (swipe > 10000) {
                    prevSlide();
                  }
                }}
              >
                <div className={`bg-gradient-to-br ${current.bgGradient} rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-10 lg:p-12 relative overflow-hidden`}>
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

                  {/* Content Grid */}
                  <div className="relative z-10 grid md:grid-cols-2 gap-6 md:gap-8">
                    {/* Left Side - Info */}
                    <div className="flex flex-col justify-center">
                      {/* Badge */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full w-fit mb-3 sm:mb-4"
                      >
                        <FiStar className="text-yellow-300 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span className="text-white text-xs sm:text-sm font-semibold">{current.badge}</span>
                      </motion.div>

                      {/* Title */}
                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 leading-tight"
                      >
                        {current.title}
                      </motion.h3>

                      {/* Subtitle */}
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-base sm:text-lg md:text-xl text-white/90 mb-3 sm:mb-4"
                      >
                        {current.subtitle}
                      </motion.p>

                      {/* Description */}
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-sm sm:text-base text-white/80 leading-relaxed mb-4 sm:mb-6"
                      >
                        {current.description}
                      </motion.p>

                      {/* Icon Circle - Mobile Only */}
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.6, type: "spring" }}
                        className="md:hidden w-14 h-14 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white mb-4 sm:mb-6"
                      >
                        <div className="scale-75 sm:scale-100">
                          {current.icon}
                        </div>
                      </motion.div>
                    </div>

                    {/* Right Side - Highlights */}
                    <div className="flex flex-col justify-center">
                      {/* Icon (Desktop) */}
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.6, type: "spring" }}
                        className="hidden md:flex w-20 h-20 lg:w-24 lg:h-24 bg-white/20 backdrop-blur-sm rounded-2xl items-center justify-center text-white mb-6 lg:mb-8 mx-auto"
                      >
                        {current.icon}
                      </motion.div>

                      {/* Highlights List */}
                      <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 space-y-2.5 sm:space-y-3">
                        {current.highlights.map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 + index * 0.1 }}
                            className="flex items-start gap-2 sm:gap-3"
                          >
                            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" fill="none" strokeWidth="3" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-white font-medium text-xs sm:text-sm md:text-base leading-snug">{item}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Note */}
                      {current.note && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.1 }}
                          className="mt-4 sm:mt-5 bg-white/10 backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/20"
                        >
                          <p className="text-white/90 text-xs sm:text-sm text-center leading-relaxed">
                            💡 {current.note}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 sm:-left-4 md:-left-6 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all z-20 group shadow-lg active:scale-95"
            aria-label="Previous slide"
          >
            <FiChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 sm:-right-4 md:-right-6 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all z-20 group shadow-lg active:scale-95"
            aria-label="Next slide"
          >
            <FiChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
            {announcements.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "w-6 sm:w-8 bg-white"
                    : "w-1.5 sm:w-2 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}