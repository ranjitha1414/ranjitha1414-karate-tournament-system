/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

export default function AdditionalOptions({ options }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">Additional Sponsorship Options</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {options.map((option, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-4 border-2 border-gray-200 hover:border-red-300 hover:shadow-lg transition-all"
          >
            <div className="text-3xl mb-2">{option.icon}</div>
            <div className="text-sm text-gray-700 mb-2 font-medium">{option.name}</div>
            <div className="text-lg font-bold text-red-600">{option.price}</div>
            <div className="text-xs text-gray-500">+ 18% GST</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}