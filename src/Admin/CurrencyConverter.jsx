/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { DollarSign } from "lucide-react";

export default function CurrencyConverter({ usdToInrRate, setUsdToInrRate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45 }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl mb-8"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-xl shadow-lg">
            <DollarSign className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Currency Conversion Rate</h3>
            <p className="text-gray-400 text-sm">Set USD to INR conversion rate for revenue calculation</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-400 font-semibold">1 USD =</label>
          <input
            type="number"
            value={usdToInrRate}
            onChange={(e) => setUsdToInrRate(Number(e.target.value))}
            className="w-24 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white font-bold focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20 outline-none transition-all"
          />
          <span className="text-sm text-gray-400 font-semibold">INR</span>
        </div>
      </div>
    </motion.div>
  );
}