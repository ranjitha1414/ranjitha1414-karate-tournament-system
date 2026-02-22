/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

// ==================== SUCCESS STATUS ====================
export const PaymentSuccess = ({ countdown }) => (
  <motion.div
    key="success"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-12 text-center"
  >
    <div className="w-32 h-32 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
      <svg className="w-16 h-16 text-green-500" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    </div>
    <h2 className="text-4xl font-bold text-green-600 mb-4">Payment Successful!</h2>
    <p className="text-gray-600 text-lg mb-2">Your registration has been confirmed.</p>
    <p className="text-gray-500 text-sm">Resetting page in {countdown} seconds...</p>
  </motion.div>
);

// ==================== FAILED STATUS ====================
export const PaymentFailed = ({ onRetry }) => (
  <motion.div
    key="failed"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-12 text-center"
  >
    <div className="w-32 h-32 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
      <svg className="w-16 h-16 text-red-500" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        />
      </svg>
    </div>
    <h2 className="text-4xl font-bold text-red-600 mb-4">Payment Failed</h2>
    <p className="text-gray-600 text-lg mb-6">Something went wrong. Please try again.</p>
    <button
      onClick={onRetry}
      className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
    >
      Try Again
    </button>
  </motion.div>
);

// ==================== LOADING OVERLAY ====================
export const LoadingOverlay = ({ isLoadingCategories }) => (
  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-3xl z-50 flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-white text-xl font-semibold">
        {isLoadingCategories ? "Loading categories..." : "Processing your registration..."}
      </p>
    </div>
  </div>
);