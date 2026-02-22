/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { 
  Users, DollarSign, CreditCard, Check, ArrowUpRight, IndianRupee
} from "lucide-react";

export default function StatsGrid({ stats, participants, usdToInrRate }) {
  // Safe check for participants
  const totalParticipants = participants?.length || 0;
  const paidCount = stats?.paid || 0;
  const completionPercentage = totalParticipants > 0 ? ((paidCount / totalParticipants) * 100).toFixed(1) : 0;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-blue-500/10 rounded-xl">
            <Users className="w-6 h-6 text-blue-400" />
          </div>
          <div className="flex items-center gap-1 text-blue-400 text-sm font-semibold">
            <ArrowUpRight className="w-4 h-4" />
            <span>+{stats?.recentRegistrations || 0}</span>
          </div>
        </div>
        <h3 className="text-gray-400 text-xs font-semibold mb-1 uppercase tracking-wide">Total Participants</h3>
        <p className="text-4xl font-bold text-white mb-1">{totalParticipants}</p>
        <p className="text-blue-400 text-xs">Last 7 days: {stats?.recentRegistrations || 0}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-green-500/30 transition-all"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-green-500/10 rounded-xl">
            <IndianRupee className="w-6 h-6 text-green-400" />
          </div>
        </div>
        <h3 className="text-gray-400 text-xs font-semibold mb-1 uppercase tracking-wide">Total Base Price(INR+USD)</h3>
        <p className="text-3xl font-bold text-white mb-1">₹{(stats?.inrBasePrice || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
        <p className="text-green-400 text-xs">Before tax/GST</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-emerald-500/30 transition-all"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-emerald-500/10 rounded-xl">
            <CreditCard className="w-6 h-6 text-emerald-400" />
          </div>
        </div>
        <h3 className="text-gray-400 text-xs font-semibold mb-1 uppercase tracking-wide">Total(INR+USD ) + Tax</h3>
        <p className="text-3xl font-bold text-white mb-1">₹{(stats?.inrTotalWithTax || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
        <p className="text-emerald-400 text-xs">Tax: ₹{((stats?.inrTotalWithTax || 0) - (stats?.inrBasePrice || 0)).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.27 }}
        className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-yellow-500/30 transition-all"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-yellow-500/10 rounded-xl">
            <DollarSign className="w-6 h-6 text-yellow-400" />
          </div>
        </div>
        <h3 className="text-gray-400 text-xs font-semibold mb-1 uppercase tracking-wide">USD Base Price</h3>
        <p className="text-3xl font-bold text-white mb-1">${(stats?.usdBasePrice || 0).toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
        <p className="text-yellow-400 text-xs">≈ ₹{((stats?.usdBasePrice || 0) * (usdToInrRate || 83)).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-orange-500/30 transition-all"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-orange-500/10 rounded-xl">
            <CreditCard className="w-6 h-6 text-orange-400" />
          </div>
        </div>
        <h3 className="text-gray-400 text-xs font-semibold mb-1 uppercase tracking-wide">USD Total + Tax</h3>
        <p className="text-3xl font-bold text-white mb-1">${(stats?.usdTotalWithTax || 0).toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
        <p className="text-orange-400 text-xs">≈ ₹{((stats?.usdTotalWithTax || 0) * (usdToInrRate || 83)).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-purple-500/10 rounded-xl">
            <Check className="w-6 h-6 text-purple-400" />
          </div>
        </div>
        <h3 className="text-gray-400 text-xs font-semibold mb-1 uppercase tracking-wide">Paid</h3>
        <p className="text-4xl font-bold text-white mb-1">{paidCount}</p>
        <p className="text-purple-400 text-xs">{completionPercentage}% completion</p>
      </motion.div>
    </div>
  );
}