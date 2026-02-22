/* eslint-disable no-unused-vars */
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, Trophy, Users, Award, Gift, CheckCircle2, Globe, Mail, Phone } from "lucide-react";
import { getTierColor } from "./sponsorData";

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
export default function CurrentSponsors({ sponsors, selectedSponsor, onSponsorClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mb-24"
    >
      <div className="text-center mb-12">
        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Proud Sponsors</h3>
        <p className="text-lg text-gray-600">Thank you to our partners who make this tournament possible</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {sponsors.map((sponsor, index) => {
          const colors = getTierColor(sponsor.tier);
          const isSelected = selectedSponsor?.id === sponsor.id;
          
          return (
            <React.Fragment key={sponsor.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className={`group relative cursor-pointer ${isSelected ? 'lg:col-span-4 sm:col-span-2' : ''}`}
                onClick={() => onSponsorClick(isSelected ? null : sponsor)}
              >
                <div className={`bg-white rounded-2xl p-8 h-48 flex flex-col items-center justify-center border-2 ${isSelected ? 'border-red-400 shadow-2xl' : colors.border} hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-xl ${colors.glow} relative overflow-hidden`}>
                  {/* Demo Ribbon */}
                  <DemoRibbon />
                  
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  <div className="absolute top-3 right-3 z-10">
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${colors.badge} shadow-lg`}>
                      {sponsor.tier}
                    </span>
                  </div>

                  <div className="w-full h-full flex flex-col items-center justify-center gap-2 relative z-10">
                    <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                      {sponsor.tier === "Platinum" ? "💎" : sponsor.tier === "Gold" ? "🏆" : "⭐"}
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900 mb-1">{sponsor.name}</div>
                      <div className="text-xs text-gray-500 italic">{sponsor.tagline}</div>
                    </div>
                  </div>

                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-gray-400 group-hover:text-red-600 transition-colors flex items-center gap-1">
                    <span>{isSelected ? 'Click to close' : 'Click to view'}</span>
                    {isSelected ? <X className="w-3 h-3" /> : <ExternalLink className="w-3 h-3" />}
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-orange-500/0 group-hover:from-red-500/5 group-hover:to-orange-500/5 rounded-2xl transition-all duration-300 -z-10" />
              </motion.div>

              {/* Expanded Details Below - Only shows on same row for this sponsor */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="lg:col-span-4 sm:col-span-2 col-span-1 overflow-hidden"
                  >
                    <motion.div
                      initial={{ y: -20 }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border-2 border-red-200 p-6 md:p-10 mt-4"
                    >
                      {/* Image Header */}
                      <div className="relative h-48 md:h-64 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden mb-6">
                        <img 
                          src={sponsor.image}
                          alt={sponsor.name}
                          className="w-full h-full object-cover opacity-50"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                        <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4">
                          <div className="flex items-start gap-3 md:gap-4 mb-3">
                            <div className="text-4xl md:text-5xl flex-shrink-0">
                              {sponsor.tier === "Platinum" ? "💎" : sponsor.tier === "Gold" ? "🏆" : "⭐"}
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="text-xl md:text-3xl font-bold text-white mb-1 break-words">{sponsor.name}</h3>
                              <p className="text-sm md:text-base text-gray-300 italic">{sponsor.tagline}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
                        {sponsor.description}
                      </p>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-3 gap-4 md:gap-6 mb-6">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center transform hover:scale-105 transition-transform">
                          <Trophy className="w-6 h-6 md:w-8 md:h-8 text-blue-600 mx-auto mb-2" />
                          <div className="text-lg md:text-2xl font-bold text-blue-900">{sponsor.stats?.events || "N/A"}</div>
                          <div className="text-xs md:text-sm text-blue-700 font-semibold">Sponsored</div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center transform hover:scale-105 transition-transform">
                          <Users className="w-6 h-6 md:w-8 md:h-8 text-purple-600 mx-auto mb-2" />
                          <div className="text-lg md:text-2xl font-bold text-purple-900">{sponsor.stats?.athletes || "N/A"}</div>
                          <div className="text-xs md:text-sm text-purple-700 font-semibold">Supported</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center transform hover:scale-105 transition-transform">
                          <Award className="w-6 h-6 md:w-8 md:h-8 text-green-600 mx-auto mb-2" />
                          <div className="text-lg md:text-2xl font-bold text-green-900">{sponsor.stats?.years || "N/A"}</div>
                          <div className="text-xs md:text-sm text-green-700 font-semibold">Partnership</div>
                        </div>
                      </div>

                      {/* Contributions */}
                      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 md:p-6 mb-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg flex-shrink-0">
                            <Gift className="w-5 h-5 text-white" />
                          </div>
                          <h4 className="text-lg md:text-xl font-bold text-gray-900">Contribution Details</h4>
                        </div>
                        <div className="space-y-3">
                          {sponsor.contribution?.map((item, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="flex items-start gap-2"
                            >
                              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                              <span className="text-sm md:text-base text-gray-700">{item}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Contact Links */}
                      {sponsor.website && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <a 
                            href={sponsor.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 p-4 rounded-xl transition-all transform hover:scale-105"
                          >
                            <Globe className="w-5 h-5 text-blue-600 flex-shrink-0" />
                            <span className="font-semibold text-gray-800">Visit Website</span>
                          </a>
                          <a 
                            href={`mailto:${sponsor.email}`}
                            className="flex items-center gap-3 bg-gradient-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 p-4 rounded-xl transition-all transform hover:scale-105"
                          >
                            <Mail className="w-5 h-5 text-red-600 flex-shrink-0" />
                            <span className="font-semibold text-gray-800">Send Email</span>
                          </a>
                          <a 
                            href={`tel:${sponsor.phone}`}
                            className="flex items-center gap-3 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 p-4 rounded-xl transition-all transform hover:scale-105"
                          >
                            <Phone className="w-5 h-5 text-green-600 flex-shrink-0" />
                            <span className="font-semibold text-gray-800">Call Now</span>
                          </a>
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </React.Fragment>
          );
        })}
      </div>
    </motion.div>
  );
}