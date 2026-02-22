/* eslint-disable no-unused-vars */
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy, Users, Award, Gift, CheckCircle2, Globe, Mail, Phone, Crown, Medal, Star, Briefcase, Building2 } from "lucide-react";
import { getTierColor } from "./sponsorData";

const iconMap = {
  Crown: <Crown className="w-12 h-12 md:w-16 md:h-16" />,
  Medal: <Medal className="w-12 h-12 md:w-16 md:h-16" />,
  Trophy: <Trophy className="w-12 h-12 md:w-16 md:h-16" />,
  Star: <Star className="w-12 h-12 md:w-16 md:h-16" />,
  Briefcase: <Briefcase className="w-12 h-12 md:w-16 md:h-16" />,
  Building2: <Building2 className="w-12 h-12 md:w-16 md:h-16" />,
};

export default function SponsorDetails({ selectedSponsor, onClose }) {
  if (!selectedSponsor) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="mb-16 overflow-hidden"
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-white rounded-3xl shadow-2xl border-2 border-red-100 overflow-hidden relative"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-50 bg-red-600 hover:bg-red-700 p-3 rounded-full transition-all shadow-lg hover:scale-110"
            aria-label="Close"
          >
            <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </button>

          {selectedSponsor.image ? (
            <>
              {/* Current Sponsor Layout */}
              <div className="relative h-48 md:h-80 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
                <img 
                  src={selectedSponsor.image}
                  alt={selectedSponsor.name}
                  className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 right-20 md:right-24">
                  <div className="flex items-start gap-3 md:gap-4 mb-3">
                    <div className="text-4xl md:text-6xl flex-shrink-0">
                      {selectedSponsor.tier === "Platinum" ? "💎" : selectedSponsor.tier === "Gold" ? "🏆" : "⭐"}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xl md:text-4xl font-bold text-white mb-1 md:mb-2 break-words">{selectedSponsor.name}</h3>
                      <p className="text-sm md:text-lg text-gray-300 italic">{selectedSponsor.tagline}</p>
                    </div>
                  </div>
                  <span className={`inline-block text-xs md:text-sm font-bold px-4 py-2 rounded-full ${getTierColor(selectedSponsor.tier).badge} shadow-lg`}>
                    {selectedSponsor.tier}
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-10">
                <p className="text-base md:text-xl text-gray-700 leading-relaxed mb-8">
                  {selectedSponsor.description}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 md:gap-6 mb-8">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 md:p-6 text-center transform hover:scale-105 transition-transform">
                    <Trophy className="w-6 h-6 md:w-8 md:h-8 text-blue-600 mx-auto mb-2 md:mb-3" />
                    <div className="text-lg md:text-3xl font-bold text-blue-900">{selectedSponsor.stats?.events || "N/A"}</div>
                    <div className="text-xs md:text-sm text-blue-700 font-semibold mt-1">Sponsored</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 md:p-6 text-center transform hover:scale-105 transition-transform">
                    <Users className="w-6 h-6 md:w-8 md:h-8 text-purple-600 mx-auto mb-2 md:mb-3" />
                    <div className="text-lg md:text-3xl font-bold text-purple-900">{selectedSponsor.stats?.athletes || "N/A"}</div>
                    <div className="text-xs md:text-sm text-purple-700 font-semibold mt-1">Supported</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 md:p-6 text-center transform hover:scale-105 transition-transform">
                    <Award className="w-6 h-6 md:w-8 md:h-8 text-green-600 mx-auto mb-2 md:mb-3" />
                    <div className="text-lg md:text-3xl font-bold text-green-900">{selectedSponsor.stats?.years || "N/A"}</div>
                    <div className="text-xs md:text-sm text-green-700 font-semibold mt-1">Partnership</div>
                  </div>
                </div>

                {/* Contributions */}
                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 md:p-8 mb-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex-shrink-0">
                      <Gift className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-xl md:text-2xl font-bold text-gray-900">Contribution Details</h4>
                  </div>
                  <div className="space-y-4">
                    {selectedSponsor.contribution?.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm md:text-base text-gray-700 leading-relaxed">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Contact Links */}
                {selectedSponsor.website && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <a 
                      href={selectedSponsor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 p-5 rounded-xl transition-all transform hover:scale-105"
                    >
                      <Globe className="w-6 h-6 text-blue-600 flex-shrink-0" />
                      <span className="font-semibold text-gray-800">Visit Website</span>
                    </a>
                    <a 
                      href={`mailto:${selectedSponsor.email}`}
                      className="flex items-center gap-3 bg-gradient-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 p-5 rounded-xl transition-all transform hover:scale-105"
                    >
                      <Mail className="w-6 h-6 text-red-600 flex-shrink-0" />
                      <span className="font-semibold text-gray-800">Send Email</span>
                    </a>
                    <a 
                      href={`tel:${selectedSponsor.phone}`}
                      className="flex items-center gap-3 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 p-5 rounded-xl transition-all transform hover:scale-105"
                    >
                      <Phone className="w-6 h-6 text-green-600 flex-shrink-0" />
                      <span className="font-semibold text-gray-800">Call Now</span>
                    </a>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Package Layout */}
              <div className="p-6 md:p-10">
                <div className="flex items-start gap-4 md:gap-6 mb-8 pb-8 border-b-4 border-gray-200">
                  <div className="text-gray-700 flex-shrink-0">
                    {iconMap[selectedSponsor.iconType] || iconMap.Trophy}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">{selectedSponsor.name}</h3>
                    <p className="text-base md:text-xl text-gray-600 italic mb-4">{selectedSponsor.tagline}</p>
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <span className="text-3xl md:text-5xl font-bold text-red-600">{selectedSponsor.price}</span>
                      <span className="text-sm md:text-base text-gray-500 font-medium">+ 18% GST</span>
                    </div>
                  </div>
                </div>

                <p className="text-base md:text-xl text-gray-700 leading-relaxed mb-8">
                  {selectedSponsor.description}
                </p>

                {/* Package Benefits */}
                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 md:p-8 mb-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex-shrink-0">
                      <Gift className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-xl md:text-2xl font-bold text-gray-900">Package Benefits</h4>
                  </div>
                  <div className="space-y-4">
                    {selectedSponsor.contribution?.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm md:text-base text-gray-700 leading-relaxed">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-center text-white">
                  <h4 className="text-2xl md:text-3xl font-bold mb-3">Ready to Sponsor?</h4>
                  <p className="text-base md:text-lg text-gray-300 mb-6">Contact us now to book your sponsorship package</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a 
                      href="tel:8248752737"
                      className="inline-flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 px-8 py-4 rounded-xl font-bold text-base transition-all transform hover:scale-105 shadow-lg"
                    >
                      <Phone className="w-5 h-5" />
                      Call: 82487 52737
                    </a>
                    <a 
                      href="https://wa.me/918248752737"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 px-8 py-4 rounded-xl font-bold text-base transition-all transform hover:scale-105"
                    >
                      <Mail className="w-5 h-5" />
                      WhatsApp Us
                    </a>
                  </div>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}