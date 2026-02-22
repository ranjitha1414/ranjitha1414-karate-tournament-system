/* eslint-disable no-unused-vars */
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Plus, Trash2, Check, X, AlertCircle } from "lucide-react";

export default function CategoryList({
  categories,
  addingEventToCategoryId,
  setAddingEventToCategoryId,
  newEventData,
  setNewEventData,
  adminPassword,
  setAdminPassword,
  error,
  onAddEvent,
  deletingCategoryId,
  setDeletingCategoryId,
  onDeleteCategory,
  deletingEventId,
  setDeletingEventId,
  onDeleteEvent
}) {
  return (
    <div className="grid gap-6">
      {categories.map((cat) => (
        <div key={cat.id} className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-400" />
              {cat.name}
            </h3>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setAddingEventToCategoryId(cat.id)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg font-semibold text-sm transition-all"
              >
                <Plus className="w-4 h-4" />
                Add Event
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDeletingCategoryId(cat.id)}
                disabled={deletingCategoryId === cat.id}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg font-semibold text-sm transition-all disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </motion.button>
            </div>
          </div>

          {/* Add Event Form */}
          <AnimatePresence>
            {addingEventToCategoryId === cat.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 space-y-3"
              >
                <h4 className="text-sm font-semibold text-blue-400 mb-2">Add New Event</h4>
                <input
                  type="text"
                  placeholder="Event name"
                  value={newEventData.name}
                  onChange={(e) => setNewEventData({...newEventData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                />
                <input
                  type="text"
                  placeholder="Event description"
                  value={newEventData.description}
                  onChange={(e) => setNewEventData({...newEventData, description: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={newEventData.price}
                  onChange={(e) => setNewEventData({...newEventData, price: Number(e.target.value)})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                />
                <input
                  type="password"
                  placeholder="Admin password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                />
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-2">
                    <p className="text-red-400 text-xs">{error}</p>
                  </div>
                )}
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onAddEvent(cat.id)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                  >
                    <Check className="w-4 h-4" />
                    Add
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setAddingEventToCategoryId(null);
                      setNewEventData({ name: "", description: "", price: 0 });
                    }}
                    className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Delete Category Form */}
          <AnimatePresence>
            {deletingCategoryId === cat.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 bg-red-500/10 border border-red-500/20 rounded-lg p-4 space-y-3"
              >
                <h4 className="text-sm font-semibold text-red-400 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Confirm Category Deletion
                </h4>
                <p className="text-xs text-gray-400">Enter admin password to confirm deletion of "{cat.name}"</p>
                <input
                  type="password"
                  placeholder="Admin password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                />
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-2">
                    <p className="text-red-400 text-xs">{error}</p>
                  </div>
                )}
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onDeleteCategory(cat.id)}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                    Confirm Delete
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setDeletingCategoryId(null)}
                    className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Event Cards */}
          <div className="grid md:grid-cols-4 gap-4">
            {cat.events?.map((event) => (
              <div key={event.id} className="bg-white/5 border border-white/10 rounded-lg p-4 relative group">
                <button
                  onClick={() => setDeletingEventId(event.id)}
                  className="absolute top-2 right-2 p-1.5 bg-red-600/80 hover:bg-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5 text-white" />
                </button>
                <h4 className="text-sm font-semibold text-gray-300 mb-1">{event.name}</h4>
                <p className="text-xs text-gray-500 mb-2">{event.description}</p>
                <p className="text-2xl font-bold text-white">₹{event.price.toLocaleString('en-IN')}</p>

                {/* Delete Event Confirmation */}
                <AnimatePresence>
                  {deletingEventId === event.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-red-900/95 backdrop-blur-sm rounded-lg p-3 flex flex-col justify-center items-center gap-2"
                    >
                      <p className="text-xs text-white text-center font-semibold">Delete this event?</p>
                      <input
                        type="password"
                        placeholder="Password"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-xs focus:outline-none"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className="flex gap-1 w-full">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteEvent(cat.id, event.id);
                          }}
                          className="flex-1 bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs font-semibold transition-all"
                        >
                          Delete
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeletingEventId(null);
                          }}
                          className="flex-1 bg-white/10 hover:bg-white/20 px-2 py-1 rounded text-xs font-semibold transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                      {error && (
                        <p className="text-xs text-red-300 text-center">{error}</p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-green-400 mb-1 flex items-center gap-1">
                <Award className="w-4 h-4" />
                Combo (All 3)
              </h4>
              <p className="text-xs text-gray-400 mb-2">Special Offer</p>
              <p className="text-2xl font-bold text-green-400">₹{cat.comboPrice?.toLocaleString('en-IN') || 0}</p>
              {cat.events?.length === 3 && cat.comboPrice && (
                <p className="text-xs text-gray-500 mt-2">
                  Save ₹{cat.events.reduce((sum, e) => sum + e.price, 0) - cat.comboPrice}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}