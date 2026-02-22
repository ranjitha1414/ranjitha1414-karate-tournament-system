/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

export default function IWKAJourney() {
  const journeyData = [
    { year: "1976", location: "A TRIBUTE TO A MASTER - NYC, NY" },
    { year: "1981", location: "FREEHOLD, NJ" },
    { year: "1983", location: "INDIANAPOLIS, IN" },
    { year: "1985", location: "PITTSBURGH, PA" },
    { year: "1986", location: "GUSHIKAWA CITY, OKINAWA" },
    { year: "1988", location: "AKRON, OH" },
    { year: "1992", location: "PITTSBURGH, PA" },
    { year: "1994", location: "ROCHESTER, NY" },
    { year: "1996", location: "GAINESVILLE, FL" },
    { year: "1997", location: "NEW YORK, NY" },
    { year: "1999", location: "McAFEE, NJ" },
    { year: "2001", location: "INDIANAPOLIS, IN" },
    { year: "2003", location: "DALLAS, TX" },
    { year: "2005", location: "AKRON, OH" },
    { year: "2007", location: "PRINCETON, NJ" },
    { year: "2009", location: "PITTSBURGH, PA" },
    { year: "2011", location: "INDIANAPOLIS, IN" },
    { year: "2013", location: "AKRON, OH" },
    { year: "2015", location: "PRINCETON, NJ" },
    { year: "2017", location: "AUGUSTA, ME" },
    { year: "2019", location: "LONDON, UK" },
    { year: "2024", location: "PITTSBURGH" },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            50 Year Journey of IWKA
          </h2>
          <p className="text-xl text-gray-600">1976 - 2026</p>
        </motion.div>

        {/* Timeline */}
        <div className="bg-white rounded-xl shadow-sm p-8 md:p-10 mb-8">
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-3">
            {journeyData.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.01 }}
                viewport={{ once: true }}
                className="flex gap-3"
              >
                <span className="font-semibold text-red-600 min-w-[50px]">
                  {event.year}
                </span>
                <span className="text-gray-700">-</span>
                <span className="text-gray-800">{event.location}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 2026 Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-red-600 to-orange-600 rounded-xl shadow-lg p-8 text-center text-white"
        >
          <p className="text-lg mb-2">And 2026</p>
          
          {/* India with Flags */}
          <div className="flex items-center justify-center gap-4 md:gap-6 mb-2">
            {/* Left Flag */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex-shrink-0"
            >
              <svg 
                className="w-16 h-12 md:w-20 md:h-16 drop-shadow-lg"
                viewBox="0 0 900 600" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Indian Flag - Saffron */}
                <rect width="900" height="200" fill="#FF9933"/>
                {/* White */}
                <rect y="200" width="900" height="200" fill="#FFFFFF"/>
                {/* Green */}
                <rect y="400" width="900" height="200" fill="#138808"/>
                {/* Ashoka Chakra */}
                <circle cx="450" cy="300" r="80" fill="none" stroke="#000080" strokeWidth="8"/>
                {/* 24 spokes of Ashoka Chakra */}
                {[...Array(24)].map((_, i) => {
                  const angle = (i * 15 * Math.PI) / 180;
                  const x1 = 450 + 25 * Math.cos(angle);
                  const y1 = 300 + 25 * Math.sin(angle);
                  const x2 = 450 + 75 * Math.cos(angle);
                  const y2 = 300 + 75 * Math.sin(angle);
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#000080"
                      strokeWidth="6"
                    />
                  );
                })}
              </svg>
            </motion.div>

            {/* INDIA Text */}
            <motion.h3 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl lg:text-7xl font-black"
            >
              INDIA
            </motion.h3>

            {/* Right Flag */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex-shrink-0"
            >
              <svg 
                className="w-16 h-12 md:w-20 md:h-16 drop-shadow-lg"
                viewBox="0 0 900 600" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Indian Flag - Saffron */}
                <rect width="900" height="200" fill="#FF9933"/>
                {/* White */}
                <rect y="200" width="900" height="200" fill="#FFFFFF"/>
                {/* Green */}
                <rect y="400" width="900" height="200" fill="#138808"/>
                {/* Ashoka Chakra */}
                <circle cx="450" cy="300" r="80" fill="none" stroke="#000080" strokeWidth="8"/>
                {/* 24 spokes of Ashoka Chakra */}
                {[...Array(24)].map((_, i) => {
                  const angle = (i * 15 * Math.PI) / 180;
                  const x1 = 450 + 25 * Math.cos(angle);
                  const y1 = 300 + 25 * Math.sin(angle);
                  const x2 = 450 + 75 * Math.cos(angle);
                  const y2 = 300 + 75 * Math.sin(angle);
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#000080"
                      strokeWidth="6"
                    />
                  );
                })}
              </svg>
            </motion.div>
          </div>

          <p className="text-lg">Chennai, Tamil Nadu</p>
        </motion.div>
      </div>
    </section>
  );
}