/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle2, Phone, Mail } from "lucide-react";
import CurrentSponsors from "../components/SponsorComponents/CurrentSponsors";
import SponsorshipPackages from "../components/SponsorComponents/SponsorshipPackages";
import AdditionalOptions from "../components/SponsorComponents/AdditionalOptions";
import { currentSponsorsData, sponsorPackagesData, additionalOptionsData } from "../components/SponsorComponents/sponsorData";

export default function Sponsors() {
  const [selectedSponsor, setSelectedSponsor] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);

  return (
    <section id="sponsors" className="py-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #000 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-red-100 to-orange-100 rounded-full blur-3xl opacity-20"
      />
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-20"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Main Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.span 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider mb-6 shadow-lg"
          >
            <Sparkles className="w-4 h-4" />
            50 Years of Excellence
          </motion.span>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Sponsors & Partners
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Supporting martial arts excellence and celebrating 50 glorious years of Isshinryu Karate in India
          </p>
        </motion.div>

        {/* Current Sponsors Section with Inline Details */}
        <CurrentSponsors 
          sponsors={currentSponsorsData} 
          selectedSponsor={selectedSponsor}
          onSponsorClick={setSelectedSponsor} 
        />

        {/* Divider */}
        <div className="relative mb-24">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-6 py-2 text-gray-500 font-semibold">Become a Sponsor</span>
          </div>
        </div>

        {/* Sponsorship Packages Section with Inline Details */}
        <SponsorshipPackages 
          packages={sponsorPackagesData} 
          selectedPackage={selectedPackage}
          onPackageClick={setSelectedPackage} 
        />

        {/* Additional Options */}
        <AdditionalOptions options={additionalOptionsData} />

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-12 text-center text-white relative overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)`
            }} />
          </div>

          <div className="relative z-10">
            <motion.div
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block text-6xl mb-4"
            >
              🤝
            </motion.div>
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Join the Legacy
            </h3>
            <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto leading-relaxed">
              By sponsoring, you become part of the CORE TEAM celebrating 50 years of Isshinryu Karate in India. Your sponsorship means you become part of the legacy!
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>Exclusive Brand Visibility</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>Stage Honours with Memento</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>Special Edition IWKA Gifts</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="tel:8248752737"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-2xl"
              >
                <Phone className="w-5 h-5" />
                Call: 82487 52737
              </motion.a>
              <motion.a
                href="https://wa.me/918248752737"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:bg-white/20 px-8 py-4 rounded-xl font-semibold transition-all"
              >
                <Mail className="w-5 h-5" />
                WhatsApp Us
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}