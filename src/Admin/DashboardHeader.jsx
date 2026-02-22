/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { BarChart3, Activity, LogOut } from "lucide-react";

export default function DashboardHeader({ onLogout }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/10 mb-8"
    >
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg">
            <BarChart3 className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white">
              Admin Dashboard
            </h1>
            <p className="text-gray-400 mt-1 text-sm">Participant management system</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-400 bg-white/5 px-4 py-2 rounded-lg border border-white/10">
            <Activity className="w-4 h-4 text-green-500" />
            <span>Live</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLogout}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-2.5 rounded-lg transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden sm:inline">Logout</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}