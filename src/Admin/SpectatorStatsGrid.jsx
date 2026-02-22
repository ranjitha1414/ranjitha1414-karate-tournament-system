/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { 
  Users, DollarSign, Check, Clock, ArrowUpRight, Calendar
} from "lucide-react";

export default function SpectatorStatsGrid({ stats, spectators }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
            <span>+{stats.recentRegistrations}</span>
          </div>
        </div>
        <h3 className="text-gray-400 text-xs font-semibold mb-1 uppercase tracking-wide">Total Spectators</h3>
        <p className="text-4xl font-bold text-white mb-1">{spectators.length}</p>
        <p className="text-blue-400 text-xs">Last 7 days: {stats.recentRegistrations}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-green-500/30 transition-all"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-green-500/10 rounded-xl">
            <DollarSign className="w-6 h-6 text-green-400" />
          </div>
        </div>
        <h3 className="text-gray-400 text-xs font-semibold mb-1 uppercase tracking-wide">Total Revenue</h3>
        <p className="text-3xl font-bold text-white mb-1">₹{stats.totalRevenue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
        <p className="text-green-400 text-xs">From {stats.paid} paid entries</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-purple-500/10 rounded-xl">
            <Check className="w-6 h-6 text-purple-400" />
          </div>
        </div>
        <h3 className="text-gray-400 text-xs font-semibold mb-1 uppercase tracking-wide">Paid</h3>
        <p className="text-4xl font-bold text-white mb-1">{stats.paid}</p>
        <p className="text-purple-400 text-xs">{((stats.paid / spectators.length) * 100).toFixed(1)}% completion</p>
      </motion.div>

      
    </div>
  );
}