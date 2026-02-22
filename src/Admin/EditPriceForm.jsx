/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { Award, Save, X } from "lucide-react";

export default function EditPriceForm({
  categories,
  editedCategories,
  adminPassword,
  setAdminPassword,
  error,
  onEventPriceChange,
  onComboPriceChange,
  onSave,
  onCancel
}) {
  return (
    <div className="space-y-6">
      {categories.map((cat) => (
        <div key={cat.id} className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-400" />
            {cat.name}
          </h3>
          
          {/* Individual Events */}
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            {editedCategories[cat.id]?.events?.map((event) => (
              <div key={event.id} className="bg-white/5 border border-white/10 rounded-lg p-4">
                <label className="block text-sm font-semibold text-gray-300 mb-2">{event.name}</label>
                <p className="text-xs text-gray-500 mb-2">{event.description}</p>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                  <input
                    type="number"
                    value={event.price}
                    onChange={(e) => onEventPriceChange(cat.id, event.id, e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 pr-4 py-3 text-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all font-semibold"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Combo Price */}
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-4">
            <label className="block text-sm font-semibold text-green-400 mb-2 flex items-center gap-2">
              <Award className="w-4 h-4" />
              Combo Price (All 3 Events)
            </label>
            <div className="relative max-w-xs">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
              <input
                type="number"
                value={editedCategories[cat.id]?.comboPrice || 0}
                onChange={(e) => onComboPriceChange(cat.id, e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 pr-4 py-3 text-white focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 outline-none transition-all font-semibold"
              />
            </div>
            {editedCategories[cat.id]?.events?.length === 3 && (
              <p className="text-xs text-gray-400 mt-2">
                Regular Total: ₹{editedCategories[cat.id].events.reduce((sum, e) => sum + e.price, 0)} • 
                Savings: ₹{editedCategories[cat.id].events.reduce((sum, e) => sum + e.price, 0) - editedCategories[cat.id].comboPrice}
              </p>
            )}
          </div>
        </div>
      ))}
      
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <label className="block text-sm font-semibold text-gray-300 mb-2">Admin Password (Required)</label>
        <input
          type="password"
          placeholder="Enter password to confirm changes"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
        />
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}
      
      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSave}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-semibold transition-all shadow-lg"
        >
          <Save className="w-5 h-5" />
          Save All Changes
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onCancel}
          className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-xl font-semibold transition-all"
        >
          <X className="w-5 h-5" />
          Cancel
        </motion.button>
      </div>
    </div>
  );
}