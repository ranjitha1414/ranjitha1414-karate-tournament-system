/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { FiAward, FiTrendingUp, FiTarget, FiStar } from "react-icons/fi";
import championshipIcon from "../assets/grandcup2.webp";

export default function GrandChampionship() {
  const requirements = [
    {
      icon: <FiTarget size={24} />,
      title: "Register in 3 Events",
      description: "Choose any 3 categories from the tournament",
    },
    {
      icon: <FiTrendingUp size={24} />,
      title: "Win All 3 Events",
      description: "Secure 1st place in each of your registered events",
    },
    {
      icon: <FiAward size={24} />,
      title: "Qualify for Grand Championship",
      description: "Get automatic entry to the ultimate championship round",
    },
  ];

  const benefits = [
    "Exclusive Grand Champion Trophy",
    "Special Recognition Ceremony",
    "Featured on Hall of Fame",
    "Premium Championship Belt",
    "Ultimate Bragging Rights",
  ];

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          {/* Championship Cup */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
            className="relative inline-block mb-4 sm:mb-6"
          >
            {/* Glow Effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl sm:rounded-3xl blur-lg sm:blur-xl opacity-60 animate-pulse"></div>
            
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl sm:rounded-2xl shadow-2xl p-3 sm:p-4 flex items-center justify-center">
              <span className="text-4xl sm:text-5xl md:text-6xl">🏆</span>
            </div>

            {/* Floating Sparkles */}
            <motion.div
              className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 text-xl sm:text-2xl"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.3, 1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ✨
            </motion.div>
            <motion.div
              className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 text-xl sm:text-2xl"
              animate={{ 
                rotate: [360, 0],
                scale: [1, 1.3, 1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5
              }}
            >
              ⭐
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 sm:mb-4">
              Ultimate Challenge
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 px-4"
          >
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Grand Championship
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto px-4"
          >
            Register for all 3 events, win them all, and earn your place in the Grand Championship Tournament. Only one ultimate champion will emerge victorious!
          </motion.p>
        </motion.div>

        {/* How It Works */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-12 md:mb-16">
          {requirements.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Connector Line - Desktop Only */}
              {index < 2 && (
                <div className="hidden md:block absolute top-1/2 left-full w-8 h-0.5 overflow-hidden z-20 -translate-y-1/2">
                  <motion.div
                    className="h-full bg-gradient-to-r from-red-600 via-orange-500 to-red-600"
                    animate={{
                      x: ['-100%', '100%']
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </div>
              )}

              {/* Card */}
              <div className="relative h-full">
                {/* Hover Glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl sm:rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
                
                <div className="relative bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-white/10 group-hover:border-red-500/50 transition-all duration-300 h-full z-10">
                  {/* Step Number */}
                  <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-red-600 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-lg">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="mb-4 sm:mb-6 inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-red-600/20 to-orange-600/20 rounded-lg sm:rounded-xl text-red-500 group-hover:scale-110 transition-transform duration-300">
                    <div className="scale-90 sm:scale-100">
                      {item.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 to-orange-600/0 group-hover:from-red-600/5 group-hover:to-orange-600/5 rounded-xl sm:rounded-2xl transition-all duration-300 -z-10"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section with Tournament Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-2xl sm:rounded-3xl blur-lg sm:blur-xl opacity-20"></div>
          
          <div className="relative bg-gradient-to-r from-red-950/40 to-orange-950/40 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 border border-red-500/20 shadow-xl">
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
              {/* Left Side */}
              <div>
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                    <FiStar className="text-gray-900 w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                    Grand Champion Rewards
                  </h3>
                </div>
                
                {/* Tournament Info */}
                <div className="bg-gradient-to-br from-amber-950/60 to-orange-950/60 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border border-amber-500/30">
                  <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="text-2xl sm:text-3xl md:text-4xl flex-shrink-0">🏆</div>
                    <div>
                      <h4 className="text-base sm:text-lg md:text-xl font-bold text-yellow-400 mb-1.5 sm:mb-2">The Grand Championship Tournament</h4>
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                        All qualified champions will compete head-to-head in an exclusive tournament to determine the <span className="text-yellow-400 font-bold">ultimate IWKA 50 Grand Champion</span>. Only the best of the best will claim this legendary title!
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                  The ultimate champion who wins the Grand Championship Tournament will receive exclusive recognition and rewards that set them apart as the pinnacle of excellence.
                </p>
                
                {/* Benefits List */}
                <div className="space-y-2 sm:space-y-3">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2 sm:gap-3 group"
                    >
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="none" strokeWidth="3" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-200 font-medium text-sm sm:text-base">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right Side - Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
                className="relative mt-6 md:mt-0"
              >
                <div className="relative bg-gradient-to-br from-yellow-400/10 to-orange-500/10 rounded-xl sm:rounded-2xl p-8 sm:p-10 md:p-12 border border-yellow-400/20">
                  {/* Championship Image */}
                  <div className="text-center">
                    <motion.div
                      animate={{ 
                        y: [0, -10, 0],
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="mb-3 sm:mb-4 flex justify-center"
                    >
                      <img src={championshipIcon} alt="Championship" className="w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 object-contain" />
                    </motion.div>
                    <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-1 sm:mb-2">
                      Grand Champion
                    </div>
                    <div className="text-gray-400 text-xs sm:text-sm">
                      Elite Status Achieved
                    </div>
                  </div>

                  {/* Sparkle Effects */}
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 text-2xl sm:text-3xl"
                  >
                    ✨
                  </motion.div>
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                    className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 text-2xl sm:text-3xl"
                  >
                    ⭐
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}