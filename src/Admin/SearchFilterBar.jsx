/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { Search, Filter, Download } from "lucide-react";

export default function SearchFilterBar({
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  onExport,
  filteredCount,
  totalCount
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl mb-6"
    >
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or contact..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
          />
        </div>

        <div className="flex gap-3">
          <div className="relative min-w-[160px]">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none appearance-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onExport}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-semibold transition-all shadow-lg whitespace-nowrap"
          >
            <Download className="w-5 h-5" />
            Export
          </motion.button>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        <span>Showing <span className="text-white font-semibold">{filteredCount}</span> of <span className="text-white font-semibold">{totalCount}</span> participants</span>
      </div>
    </motion.div>
  );
}