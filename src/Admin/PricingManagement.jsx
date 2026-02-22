/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { Award, Edit2, Save, X } from "lucide-react";
import CategoryList from "./CategoryList";
import EditPriceForm from "./EditPriceForm";

export default function PricingManagement({
  categories,
  editMode,
  editedCategories,
  adminPassword,
  setAdminPassword,
  error,
  onStartEdit,
  onSaveAllPrices,
  onCancelEdit,
  onEventPriceChange,
  onComboPriceChange,
  addingEventToCategoryId,
  setAddingEventToCategoryId,
  newEventData,
  setNewEventData,
  onAddEvent,
  deletingCategoryId,
  setDeletingCategoryId,
  onDeleteCategory,
  deletingEventId,
  setDeletingEventId,
  onDeleteEvent
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55 }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl mb-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg">
            <Award className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Event Pricing Management</h2>
            <p className="text-gray-400 text-sm">Manage categories, events and pricing</p>
          </div>
        </div>
        {!editMode && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartEdit}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg"
          >
            <Edit2 className="w-4 h-4" />
            Edit Prices
          </motion.button>
        )}
      </div>

      {editMode ? (
        <EditPriceForm
          categories={categories}
          editedCategories={editedCategories}
          adminPassword={adminPassword}
          setAdminPassword={setAdminPassword}
          error={error}
          onEventPriceChange={onEventPriceChange}
          onComboPriceChange={onComboPriceChange}
          onSave={onSaveAllPrices}
          onCancel={onCancelEdit}
        />
      ) : (
        <CategoryList
          categories={categories}
          addingEventToCategoryId={addingEventToCategoryId}
          setAddingEventToCategoryId={setAddingEventToCategoryId}
          newEventData={newEventData}
          setNewEventData={setNewEventData}
          adminPassword={adminPassword}
          setAdminPassword={setAdminPassword}
          error={error}
          onAddEvent={onAddEvent}
          deletingCategoryId={deletingCategoryId}
          setDeletingCategoryId={setDeletingCategoryId}
          onDeleteCategory={onDeleteCategory}
          deletingEventId={deletingEventId}
          setDeletingEventId={setDeletingEventId}
          onDeleteEvent={onDeleteEvent}
        />
      )}
    </motion.div>
  );
}