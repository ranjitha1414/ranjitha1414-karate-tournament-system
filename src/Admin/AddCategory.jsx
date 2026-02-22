/* eslint-disable no-unused-vars */
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, AlertCircle } from "lucide-react";

export default function AddCategorySection({
  showAddCategory,
  setShowAddCategory,
  newCategoryName,
  setNewCategoryName,
  adminPassword,
  setAdminPassword,
  error,
  onAddCategory
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl mb-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl shadow-lg">
            <Plus className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Add New Category</h2>
            <p className="text-gray-400 text-sm">Create a new event category</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddCategory(!showAddCategory)}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg"
        >
          <Plus className="w-4 h-4" />
          {showAddCategory ? "Cancel" : "Add Category"}
        </motion.button>
      </div>

      <AnimatePresence>
        {showAddCategory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <label className="block text-sm font-semibold text-gray-300 mb-2">Category Name</label>
              <input
                type="text"
                placeholder="Enter category name (e.g., Junior, Senior)"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
              />
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <label className="block text-sm font-semibold text-gray-300 mb-2">Admin Password (Required)</label>
              <input
                type="password"
                placeholder="Enter password to confirm"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                <p className="text-red-400 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </p>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onAddCategory}
              className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl font-semibold transition-all shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Create Category
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}