/* eslint-disable no-unused-vars */
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ExternalLink, X, Gift, Phone, Mail, Crown, Medal, Trophy, Star, Briefcase, Building2 } from "lucide-react";
import Lottie from "lottie-react";
import { getTierColor } from "./sponsorData";
import coinAnimation from "../../assets/Coin.json"; // Gold coin animation
import silverCoinAnimation from "../../assets/Silver.json"; // Silver coin animation

const iconMap = {
  Crown: <Crown className="w-10 h-10" />,
  Medal: <Medal className="w-10 h-10" />,
  Trophy: <Trophy className="w-10 h-10" />,
  Star: <Star className="w-10 h-10" />,
  Briefcase: <Briefcase className="w-10 h-10" />,
  Building2: <Building2 className="w-10 h-10" />,
};

export default function SponsorshipPackages({ packages, selectedPackage, onPackageClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <div className="text-center mb-12">
        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Sponsorship Packages</h3>
        <p className="text-lg text-gray-600 mb-6">Choose the perfect package to support martial arts excellence</p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span>Exclusive Brand Visibility</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span>Stage Recognition</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span>Reach 1000+ Families</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {packages.map((pkg, index) => {
          const colors = getTierColor(pkg.tier);
          const isSelected = selectedPackage?.id === pkg.id;
          const selectedIndex = packages.findIndex(p => p.id === selectedPackage?.id);
          const currentRow = Math.floor(index / 3);
          const selectedRow = Math.floor(selectedIndex / 3);
          const shouldPushDown = selectedPackage && ((currentRow === selectedRow && !isSelected) || currentRow > selectedRow);
          
          return (
            <React.Fragment key={pkg.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                animate={{ 
                  y: shouldPushDown ? 20 : 0,
                  opacity: 1 
                }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: isSelected ? 0 : -8 }}
                className="group relative cursor-pointer"
                onClick={() => onPackageClick(isSelected ? null : pkg)}
              >
                <div className={`bg-gradient-to-br ${colors.bg} rounded-2xl p-6 ${isSelected ? 'h-auto' : 'h-full'} flex flex-col border-2 ${isSelected ? 'border-red-400 shadow-2xl' : colors.border} hover:bg-white transition-all duration-300 shadow-md hover:shadow-xl ${colors.glow} relative overflow-visible`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />
                  
                  {/* Tier Badge - Top Right */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${colors.badge} shadow-lg`}>
                      {pkg.tier}
                    </span>
                  </div>

                  {/* Gold Coins Badge with Lottie - Top Center */}
                  {pkg.goldCoins && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                      <motion.div
                        animate={{ 
                          y: [0, -5, 0],
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 text-white px-4 py-2 rounded-full shadow-2xl border-2 border-yellow-300 flex items-center gap-2"
                      >
                        <div className="w-6 h-6 flex-shrink-0">
                          <Lottie 
                            animationData={coinAnimation} 
                            loop={true}
                            style={{ width: '100%', height: '100%' }}
                          />
                        </div>
                        <span className="font-bold text-sm whitespace-nowrap">
                          {pkg.goldCoins} Gold
                        </span>
                      </motion.div>
                    </div>
                  )}

                  {/* Silver Coins Badge with Lottie - Top Center */}
                  {pkg.silverCoins && !pkg.goldCoins && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                      <motion.div
                        animate={{ 
                          y: [0, -5, 0],
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 text-white px-4 py-2 rounded-full shadow-2xl border-2 border-gray-200 flex items-center gap-2"
                      >
                        <div className="w-6 h-6 flex-shrink-0">
                          <Lottie 
                            animationData={silverCoinAnimation} 
                            loop={true}
                            style={{ width: '100%', height: '100%' }}
                          />
                        </div>
                        <span className="font-bold text-sm whitespace-nowrap">
                          {pkg.silverCoins} Silver
                        </span>
                      </motion.div>
                    </div>
                  )}

                  <div className={`relative z-10 flex flex-col h-full ${(pkg.goldCoins || pkg.silverCoins) ? 'mt-4' : ''}`}>
                    <div className="mb-4 text-gray-700 group-hover:scale-110 transition-transform duration-300">
                      {iconMap[pkg.iconType] || iconMap.Trophy}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                    
                    <div className="text-3xl font-bold text-red-600 mb-2">{pkg.price}</div>
                    <div className="text-xs text-gray-500 mb-3">+ 18% GST</div>
                    
                    <p className="text-sm text-gray-600 italic mb-4">{pkg.tagline}</p>

                    {/* Gold Coin Highlight Box with Lottie - In Card */}
                    {pkg.goldCoins && (
                      <div className="mb-4 p-3 bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 flex-shrink-0">
                            <Lottie 
                              animationData={coinAnimation} 
                              loop={true}
                              style={{ width: '100%', height: '100%' }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-yellow-800 text-xs uppercase tracking-wide">Exclusive Gift</div>
                            <div className="text-yellow-900 font-semibold text-sm leading-tight">
                              {pkg.goldCoins} Special Edition Gold Coin{pkg.goldCoins > 1 ? 's' : ''}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Silver Coin Highlight Box with Lottie - In Card */}
                    {pkg.silverCoins && !pkg.goldCoins && (
                      <div className="mb-4 p-3 bg-gradient-to-r from-gray-50 to-slate-50 border-2 border-gray-300 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 flex-shrink-0">
                            <Lottie 
                              animationData={silverCoinAnimation} 
                              loop={true}
                              style={{ width: '100%', height: '100%' }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-gray-700 text-xs uppercase tracking-wide">Exclusive Gift</div>
                            <div className="text-gray-900 font-semibold text-sm leading-tight">
                              50gm Silver Coin (999 Purity)
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-3 gap-2 mt-auto">
                      <div className="text-center">
                        <div className="text-xs text-gray-500">Reach</div>
                        <div className="text-sm font-bold text-gray-900">{pkg.stats.reach.split('+')[0]}+</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500">Visibility</div>
                        <div className="text-sm font-bold text-gray-900">{pkg.stats.visibility}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500">Honor</div>
                        <div className="text-sm font-bold text-gray-900">✓</div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200 text-center text-xs text-gray-400 group-hover:text-red-600 transition-colors flex items-center justify-center gap-1">
                      <span>{isSelected ? 'Click to close' : 'View Details'}</span>
                      {isSelected ? <X className="w-3 h-3" /> : <ExternalLink className="w-3 h-3" />}
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-orange-500/0 group-hover:from-red-500/5 group-hover:to-orange-500/5 rounded-2xl transition-all duration-300 -z-10" />
              </motion.div>

              {/* Expanded Details Below */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="lg:col-span-3 sm:col-span-2 col-span-1 overflow-hidden"
                  >
                    <motion.div
                      initial={{ y: -20 }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border-2 border-red-200 p-6 md:p-10 mt-4"
                    >
                      {/* Package Header */}
                      <div className="flex items-start gap-4 md:gap-6 mb-6 pb-6 border-b-2 border-gray-200">
                        <div className="text-gray-700 flex-shrink-0">
                          {iconMap[pkg.iconType] || iconMap.Trophy}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                          <p className="text-base md:text-lg text-gray-600 italic mb-3">{pkg.tagline}</p>
                          <div className="flex items-baseline gap-3 flex-wrap">
                            <span className="text-3xl md:text-4xl font-bold text-red-600">{pkg.price}</span>
                            <span className="text-sm md:text-base text-gray-500 font-medium">+ 18% GST</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
                        {pkg.description}
                      </p>

                      {/* Gold Coins Highlight with Lottie - Expanded View */}
                      {pkg.goldCoins && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 }}
                          className="mb-6 p-5 md:p-6 bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 border-3 border-yellow-400 rounded-xl shadow-lg relative overflow-hidden"
                        >
                          <div className="absolute -top-10 -right-10 opacity-10 w-48 h-48">
                            <Lottie 
                              animationData={coinAnimation} 
                              loop={true}
                              style={{ width: '100%', height: '100%' }}
                            />
                          </div>
                          <div className="relative z-10">
                            <div className="flex items-start gap-4">
                              <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
                                <Lottie 
                                  animationData={coinAnimation} 
                                  loop={true}
                                  style={{ width: '100%', height: '100%' }}
                                />
                              </div>
                              <div className="flex-1">
                                <div className="inline-block bg-gradient-to-r from-yellow-600 to-amber-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                                  Exclusive Commemorative Gift
                                </div>
                                <h4 className="text-xl md:text-2xl font-bold text-yellow-900 mb-2">
                                  {pkg.goldCoinLabel}
                                </h4>
                                <p className="text-sm md:text-base text-yellow-800 leading-relaxed">
                                  Receive {pkg.goldCoins} exclusive IWKA 50th Anniversary Special Edition Gold Coin{pkg.goldCoins > 1 ? 's' : ''} as a commemorative gift - a collector's item celebrating half a century of Isshinryu Karate excellence in India.
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Silver Coins Highlight with Lottie - Expanded View */}
                      {pkg.silverCoins && !pkg.goldCoins && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 }}
                          className="mb-6 p-5 md:p-6 bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 border-3 border-gray-400 rounded-xl shadow-lg relative overflow-hidden"
                        >
                          <div className="absolute -top-10 -right-10 opacity-10 w-48 h-48">
                            <Lottie 
                              animationData={silverCoinAnimation} 
                              loop={true}
                              style={{ width: '100%', height: '100%' }}
                            />
                          </div>
                          <div className="relative z-10">
                            <div className="flex items-start gap-4">
                              <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
                                <Lottie 
                                  animationData={silverCoinAnimation} 
                                  loop={true}
                                  style={{ width: '100%', height: '100%' }}
                                />
                              </div>
                              <div className="flex-1">
                                <div className="inline-block bg-gradient-to-r from-gray-600 to-slate-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                                  Exclusive Commemorative Gift
                                </div>
                                <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                                  50gm IWKA 50-Year Special Edition Silver Coin
                                </h4>
                                <p className="text-sm md:text-base text-gray-800 leading-relaxed">
                                  Receive an exclusive IWKA 50th Anniversary Special Edition Silver Coin (999 purity, 50 grams) as a commemorative gift - a collector's item celebrating half a century of Isshinryu Karate excellence in India.
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Package Benefits */}
                      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 md:p-6 mb-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg flex-shrink-0">
                            <Gift className="w-5 h-5 text-white" />
                          </div>
                          <h4 className="text-lg md:text-xl font-bold text-gray-900">Package Benefits</h4>
                        </div>
                        <div className="space-y-3">
                          {pkg.contribution?.map((item, idx) => (
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

                      {/* CTA Section */}
                      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 text-center text-white">
                        <h4 className="text-xl md:text-2xl font-bold mb-2">Ready to Sponsor?</h4>
                        <p className="text-sm md:text-base text-gray-300 mb-4">Contact us now to book your sponsorship package</p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <a 
                            href="tel:8248752737"
                            className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-bold text-sm transition-all transform hover:scale-105 shadow-lg"
                          >
                            <Phone className="w-4 h-4" />
                            Call: 82487 52737
                          </a>
                          <a 
                            href="https://wa.me/918248752737"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 px-6 py-3 rounded-lg font-bold text-sm transition-all transform hover:scale-105"
                          >
                            <Mail className="w-4 h-4" />
                            WhatsApp Us
                          </a>
                        </div>
                      </div>
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