/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import logo from "../assets/slider1.webp";
import kataIcon from "../assets/kata.webp";
import kumiteIcon from "../assets/kumite.webp";
import kobudoIcon from "../assets/kobodu.webp";
import verticalPunchImg from "../assets/vertical.png"; 


// Import Isshinryu logo
import isshinryuLogo from "../assets/isshinryu.png"; // Replace with your actual path

export default function About() {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-24 bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-48 sm:w-96 h-48 sm:h-96 bg-red-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-40 sm:w-80 h-40 sm:h-80 bg-orange-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 sm:w-96 h-48 sm:h-96 bg-yellow-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "3s" }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Main Content Section */}
        <div className="md:flex md:items-center md:gap-16 mb-16">
          {/* Image Section with 3D Card Effect */}
          <motion.div
            className="md:w-1/2 mb-8 sm:mb-10 md:mb-0"
            initial={{ opacity: 0, x: -80, rotateY: -15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 60 }}
            viewport={{ once: true }}
          >
            <div className="relative group">
              {/* Glowing Border Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-2xl sm:rounded-3xl blur-lg sm:blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              
              {/* Image Container */}
              <div className="relative bg-white rounded-2xl sm:rounded-3xl p-2 sm:p-3 shadow-2xl">
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
                  {/* Karate Image */}
                  <div className="aspect-[4/3]">
                    <img
                      src={logo}
                      alt="IWKA 50 Isshinryu Karate Tournament"
                      className="w-full h-full object-cover object-center rounded-xl sm:rounded-2xl hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                  </div>
                  
                  {/* Overlay with Stats */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 sm:p-6">
                    <div className="flex justify-around text-white">
                      <div className="text-center">
                        <div className="text-2xl sm:text-3xl md:text-4xl font-bold">50th</div>
                        <div className="text-xs sm:text-sm opacity-90 mt-0.5">Edition</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl sm:text-3xl md:text-4xl font-bold">1500+</div>
                        <div className="text-xs sm:text-sm opacity-90 mt-0.5">Trophies</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl sm:text-3xl md:text-4xl font-bold">15+</div>
                        <div className="text-xs sm:text-sm opacity-90 mt-0.5">Categories</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Badge */}
                <motion.div
                  className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-gradient-to-br from-yellow-400 to-orange-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full shadow-xl font-bold text-sm sm:text-base"
                  animate={{ 
                    rotate: [0, 5, 0, -5, 0],
                    y: [0, -10, 0]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  🏆 IWKA 50
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Text Section */}
          <motion.div
            className="md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-block mb-4 sm:mb-6"
            >
              <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-1.5 sm:px-6 sm:py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg">
                First Time in India • July 25-26, 2026
              </span>
            </motion.div>

            {/* Enhanced Title with Logo */}
            <div className="mb-4 sm:mb-6">
              {/* Isshinryu World text with logo inline */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-4 mb-2"
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight whitespace-nowrap">
                  Isshinryu World
                </h2>
                
                {/* Animated Logo */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="flex-shrink-0"
                >
                  <div className="relative">
                    {/* Glow effect behind logo */}
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 blur-xl opacity-40 scale-110 animate-pulse"></div>
                    <img 
                      src={isshinryuLogo} 
                      alt="Isshinryu Logo" 
                      className="relative w-20 h-16 sm:w-25 sm:h-20 md:w-30 md:h-24 lg:w-30 lg:h-28 object-contain drop-shadow-2xl"
                    />
                  </div>
                </motion.div>
              </motion.div>

              {/* Karate Tournament text with gradient */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight px-2 sm:px-0"
              >
                <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent drop-shadow-2xl">
                  Karate Tournament
                </span>
              </motion.h2>
            </div>

            {/* Approval Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8"
            >
              <div className="text-yellow-400 font-bold text-sm sm:text-base mb-2">Tournament Approved By:</div>
              <div className="text-white">
                <div className="text-lg sm:text-xl font-bold mb-1">Grand Master Soke Kichiro Shimabuku</div>
                <div className="text-sm sm:text-base text-gray-300">10th Dan Black Belt</div>
                <div className="text-sm sm:text-base text-gray-300">President IWKA, Okinawa, Japan</div>
              </div>
            </motion.div>

            <div className="mb-6 sm:mb-8 px-2 sm:px-0">
              <p className="text-base sm:text-lg text-gray-300 mb-4 leading-relaxed">
                This historic tournament marks the <span className="font-bold text-orange-400">first-ever IWKA Direct Tournament in India</span>, bringing the authentic spirit of Isshinryu Karate to the subcontinent.
              </p>
              
              <p className="text-base sm:text-lg text-orange-300 font-bold italic mb-4">
                "Born to Fight" • The Place of Positive Vibration
              </p>
            </div>

            {/* Feature Cards - Categories */}
            <div className="grid grid-cols-3 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 px-2 sm:px-0">
              {[
                { 
                  image: kataIcon,
                  title: "Kata", 
                  desc: "Form & Precision",
                  color: "from-red-500 to-orange-500"
                },
                { 
                  image: kumiteIcon,
                  title: "Kumite", 
                  desc: "Combat & Fighting",
                  color: "from-orange-500 to-yellow-500"
                },
                { 
                  image: kobudoIcon,
                  title: "Kobudo", 
                  desc: "Weapons & Honor",
                  color: "from-yellow-500 to-red-500"
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotate: [0, -2, 2, 0],
                    transition: { duration: 0.3 }
                  }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  {/* Card Glow Effect */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.color} rounded-xl sm:rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500`}></div>
                  
                  {/* Card Content */}
                  <div className="relative bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <motion.div 
                      className="mb-2 sm:mb-3 flex justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img src={item.image} alt={item.title} className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain" />
                    </motion.div>
                    <div className="font-bold text-lg sm:text-xl text-gray-900 mb-0.5 sm:mb-1">{item.title}</div>
                    <div className="text-xs sm:text-sm text-gray-600">{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* What is Isshinryu Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              What is{" "}
              <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent">
                Isshinryu?
              </span>
            </h3>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Discover the "One Heart Way" - A unique martial art philosophy now in India
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Left Column - Philosophy */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="text-4xl">❤️</div>
                <h4 className="text-2xl sm:text-3xl font-bold text-white">The Philosophy</h4>
              </div>
              
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4">
                <span className="font-bold text-yellow-400">Isshinryu</span> means <span className="text-orange-400">"One Heart Way"</span> - a martial art that goes beyond physical combat to develop character, spirit, and lifelong dedication.
              </p>
              
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                It represents a holistic approach to martial arts, understanding that true mastery is a <span className="text-yellow-400">lifelong journey</span> rather than just a quick path to becoming a fighter.
              </p>
            </motion.div>

            {/* Right Column - Synthesis */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="text-4xl">⚡</div>
                <h4 className="text-2xl sm:text-3xl font-bold text-white">Synthesis of Styles</h4>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🎯</div>
                  <div>
                    <div className="text-yellow-400 font-bold mb-1">Gojū-ryū Influence</div>
                    <div className="text-gray-300 text-sm sm:text-base">Direct, powerful linear attacks</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🌀</div>
                  <div>
                    <div className="text-orange-400 font-bold mb-1">Shorin-ryū Influence</div>
                    <div className="text-gray-300 text-sm sm:text-base">Quick, flowing circular movements</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="text-2xl">💫</div>
                  <div>
                    <div className="text-red-400 font-bold mb-1">Unique Blend</div>
                    <div className="text-gray-300 text-sm sm:text-base">Combining power with agility and speed</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Key Characteristics */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Key{" "}
              <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent">
                Characteristics
              </span>
            </h3>
            <p className="text-lg sm:text-xl text-gray-300">
              What makes Isshinryu unique and effective
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
            
              {
  iconImage: verticalPunchImg,
  title: "Vertical Fist Punch",
  description:
    "A defining feature - the vertical fist punch executed with a snapping motion, unlike the horizontal fist of other styles.",
  color: "from-red-500 to-orange-500",
},

              {
                icon: "⚔️",
                title: "Close-Range Combat",
                description: "Designed for practical, close-range fighting with low snapping kicks and rapidly retracting hand strikes.",
                color: "from-orange-500 to-yellow-500"
              },
              {
                icon: "🎯",
                title: "Maximum Efficiency",
                description: "Eliminates unnecessary movements and emphasizes using every part of the body in both blocks and strikes.",
                color: "from-yellow-500 to-red-500"
              },
              {
                icon: "🥋",
                title: "Practical Techniques",
                description: "Incorporates throws, joint locks, and techniques that work in real-world self-defense situations.",
                color: "from-red-500 to-pink-500"
              },
              {
                icon: "💪",
                title: "Full-Body Power",
                description: "Every technique utilizes complete body mechanics for maximum impact and efficiency.",
                color: "from-purple-500 to-red-500"
              },
              {
                icon: "❤️",
                title: "One Heart Spirit",
                description: "Develops strong fighting spirit and character - understanding martial arts as a lifelong journey.",
                color: "from-pink-500 to-orange-500"
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group"
              >
                {/* Card Glow */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.color} rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500`}></div>
                
                {/* Card Content */}
                <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
<div className="mb-4 flex justify-center">
  {item.iconImage ? (
    <motion.img
      src={item.iconImage}
      alt={item.title}
      className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
      whileHover={{ scale: 1.15, rotate: -5 }}
      transition={{ type: "spring", stiffness: 200 }}
    />
  ) : (
    <div className="text-4xl">{item.icon}</div>
  )}
</div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievement Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-wrap gap-3 sm:gap-4 justify-center"
        >
          {[
            { emoji: "🌍", text: "International Level" },
            { emoji: "🇯🇵", text: "Okinawa Approved" },
            { emoji: "🎖️", text: "Certified Judges" },
            { emoji: "🏆", text: "1500+ Trophies" },
            { emoji: "🎁", text: "Premium Gifts" },
            { emoji: "📜", text: "Official Certificates" },
          ].map((badge, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, scale: 1.05 }}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-white shadow-lg"
            >
              <span className="text-xl sm:text-2xl">{badge.emoji}</span>
              <span className="text-sm sm:text-base font-semibold">{badge.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
      ></motion.div>
    </section>
  );
}