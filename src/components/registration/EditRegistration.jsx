/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { updateRegistration } from "../../services/supabaseService";
import {
  countryCodes,
  countries,
  beltColors,
} from "../../constants/registrationConstants";

export default function EditRegistration({ registrationData, onClose, onSuccess }) {
  const [form, setForm] = useState({
    sex: "",
    age: "",
    height: "",
    heightUnit: "cm",
    weight: "",
    weightUnit: "kg",
    whatsappCountryCode: "+91",
    whatsappNumber: "",
    dojoName: "",
    masterName: "",
    addressLine1: "",
    addressLine2: "",
    country: "India",
    postalCode: "",
    belt: "",
    ailment: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (registrationData) {
      setForm({
        sex: registrationData.sex || "",
        age: registrationData.age || "",
        height: registrationData.height || "",
        heightUnit: registrationData.heightUnit || "cm",
        weight: registrationData.weight || "",
        weightUnit: registrationData.weightUnit || "kg",
        whatsappCountryCode: registrationData.whatsappCountryCode || "+91",
        whatsappNumber: registrationData.whatsappNumber || "",
        dojoName: registrationData.dojoName || "",
        masterName: registrationData.masterName || "",
        addressLine1: registrationData.addressLine1 || "",
        addressLine2: registrationData.addressLine2 || "",
        country: registrationData.country || "India",
        postalCode: registrationData.postalCode || "",
        belt: registrationData.belt || "",
        ailment: registrationData.ailment || "",
      });
    }
  }, [registrationData]);

  const getPhoneLength = (countryCode) => {
    const country = countryCodes.find((c) => c.code === countryCode);
    return country ? country.phoneLength : 10;
  };

  const hasPostalCode = () => {
    const country = countries.find((c) => c.name === form.country);
    return country ? country.hasPostalCode : true;
  };

  const getPostalCodeInfo = () => {
    const country = countries.find((c) => c.name === form.country);
    return country || { hasPostalCode: true, postalCodeFormat: "", example: "" };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "whatsappNumber") {
      const maxLength = getPhoneLength(form.whatsappCountryCode);
      const digitsOnly = value.replace(/\D/g, "").slice(0, maxLength);
      setForm({ ...form, [name]: digitsOnly });
      setErrors({ ...errors, [name]: "" });
      return;
    }
    
    if (name === "postalCode") {
      const postalInfo = getPostalCodeInfo();
      if (postalInfo.postalCodePattern) {
        setForm({ ...form, [name]: value.toUpperCase() });
      } else {
        setForm({ ...form, [name]: value });
      }
      if (errors[name]) setErrors({ ...errors, [name]: "" });
      return;
    }
    
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    
    const age = parseInt(form.age);
    if (!age || age < 1 || age > 120) {
      newErrors.age = "Please enter a valid age (1-120)";
    }
    
    const whatsappLength = getPhoneLength(form.whatsappCountryCode);
    if (form.whatsappNumber.length !== whatsappLength) {
      newErrors.whatsappNumber = `WhatsApp number must be exactly ${whatsappLength} digits`;
    }
    
    if (!form.sex) newErrors.sex = "Please select gender";
    
    if (!form.height || form.height <= 0) {
      newErrors.height = "Height is required";
    } else {
      const heightInCm = form.heightUnit === "inches" ? form.height * 2.54 : parseFloat(form.height);
      if (heightInCm < 91 || heightInCm > 244)
        newErrors.height = "Height must be between 3 feet (91 cm) and 8 feet (244 cm)";
    }
    
    if (!form.weight || form.weight <= 0) {
      newErrors.weight = "Weight is required";
    } else {
      const weightInKg = form.weightUnit === "lbs" ? form.weight * 0.453592 : parseFloat(form.weight);
      if (weightInKg < 20 || weightInKg > 160)
        newErrors.weight = "Weight must be between 20 kg (44 lbs) and 160 kg (353 lbs)";
    }
    
    if (!form.belt) newErrors.belt = "Please select your belt level";
    if (!form.dojoName) newErrors.dojoName = "Dojo name is required";
    if (!form.masterName) newErrors.masterName = "Master name is required";
    if (!form.addressLine1) newErrors.addressLine1 = "Address line 1 is required";
    
    if (hasPostalCode()) {
      const postalInfo = getPostalCodeInfo();
      if (!form.postalCode) {
        newErrors.postalCode = `Postal code is required (${postalInfo.postalCodeFormat || 'required'})`;
      } else if (postalInfo.postalCodePattern && !postalInfo.postalCodePattern.test(form.postalCode)) {
        newErrors.postalCode = `Invalid postal code format. Example: ${postalInfo.example}`;
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      // Create full address
      let fullAddress = form.addressLine1;
      if (form.addressLine2) fullAddress += ", " + form.addressLine2;
      if (form.postalCode) fullAddress += ", " + form.postalCode;
      fullAddress += ", " + form.country;

      // Update using Supabase
      const updateData = {
        sex: form.sex,
        age: form.age,
        height: form.height,
        heightUnit: form.heightUnit,
        weight: form.weight,
        weightUnit: form.weightUnit,
        whatsappNumber: form.whatsappNumber,
        dojoName: form.dojoName,
        masterName: form.masterName,
        address: fullAddress,
        addressLine1: form.addressLine1,
        addressLine2: form.addressLine2,
        postalCode: form.postalCode,
        belt: form.belt,
        ailment: form.ailment,
      };

      await updateRegistration(registrationData.id, updateData);
      
      setLoading(false);
      alert("Registration details updated successfully!");
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (error) {
      console.error("Error updating registration:", error);
      setLoading(false);
      alert("Failed to update registration. Please try again.");
    }
  };

  const getCountryName = (countryCode) => {
    const country = countryCodes.find((c) => c.code === countryCode);
    return country ? country.name : countryCode;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-md z-[110] flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-4xl w-full my-4 sm:my-8 max-h-[95vh] sm:max-h-[90vh] flex flex-col"
        >
          {/* Fixed Header */}
          <div className="sticky top-0 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white p-4 sm:p-6 rounded-t-xl sm:rounded-t-2xl flex justify-between items-start sm:items-center z-20 shadow-lg">
            <div className="flex-1 min-w-0 pr-2">
              <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span className="truncate">Edit Registration</span>
              </h2>
              <p className="text-orange-100 text-xs sm:text-sm mt-1 truncate">
                {registrationData?.name} • {registrationData?.email}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-1.5 sm:p-2 transition-all hover:scale-110 active:scale-95 flex-shrink-0"
              disabled={loading}
              aria-label="Close"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto flex-1">
            {/* Read-only Info Banner */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-3 sm:p-4 shadow-sm"
            >
              <div className="flex items-start gap-2 sm:gap-3">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-xs sm:text-sm text-blue-900 leading-relaxed">
                    <strong className="font-semibold">Note:</strong> Name, Email, Mobile Number, Category, Events, Country, and WhatsApp Country Code cannot be changed. Contact support if you need to modify these fields.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Personal Information */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-3 sm:space-y-4"
            >
              <div className="flex items-center gap-2 pb-2 border-b-2 border-orange-200">
                <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <h3 className="text-base sm:text-lg font-bold text-gray-800">
                  Personal Information
                </h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="sex"
                    value={form.sex}
                    onChange={handleChange}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm sm:text-base ${
                      errors.sex ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.sex && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs sm:text-sm mt-1 flex items-center gap-1"
                    >
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.sex}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                    Age <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    placeholder="Enter age"
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm sm:text-base ${
                      errors.age ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
                    }`}
                  />
                  {errors.age && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs sm:text-sm mt-1 flex items-center gap-1"
                    >
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.age}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                    Height <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      name="height"
                      value={form.height}
                      onChange={handleChange}
                      placeholder="Height"
                      step="0.01"
                      className={`flex-1 px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm sm:text-base ${
                        errors.height ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
                      }`}
                    />
                    <select
                      name="heightUnit"
                      value={form.heightUnit}
                      onChange={handleChange}
                      className="w-16 sm:w-20 px-1 sm:px-2 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 hover:border-gray-400 transition-all text-xs sm:text-sm"
                    >
                      <option value="cm">cm</option>
                      <option value="inches">in</option>
                    </select>
                  </div>
                  {errors.height && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs sm:text-sm mt-1 flex items-center gap-1"
                    >
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.height}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                    Weight <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      name="weight"
                      value={form.weight}
                      onChange={handleChange}
                      placeholder="Weight"
                      step="0.1"
                      className={`flex-1 px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm sm:text-base ${
                        errors.weight ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
                      }`}
                    />
                    <select
                      name="weightUnit"
                      value={form.weightUnit}
                      onChange={handleChange}
                      className="w-16 sm:w-20 px-1 sm:px-2 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 hover:border-gray-400 transition-all text-xs sm:text-sm"
                    >
                      <option value="kg">kg</option>
                      <option value="lbs">lbs</option>
                    </select>
                  </div>
                  {errors.weight && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs sm:text-sm mt-1 flex items-center gap-1"
                    >
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.weight}
                    </motion.p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* WhatsApp Contact - READ ONLY Country Code */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-3 sm:space-y-4"
            >
              <div className="flex items-center gap-2 pb-2 border-b-2 border-orange-200">
                <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <h3 className="text-base sm:text-lg font-bold text-gray-800">
                  WhatsApp Contact
                </h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                    Country Code <span className="text-red-500">*</span>
                  </label>
                  <div className="relative w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 text-gray-600 flex items-center justify-between shadow-inner">
                    <span className="text-xs sm:text-sm font-medium truncate pr-2">
                      {form.whatsappCountryCode} - {getCountryName(form.whatsappCountryCode)}
                    </span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Cannot be changed
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                    WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="whatsappNumber"
                    value={form.whatsappNumber}
                    onChange={handleChange}
                    placeholder="WhatsApp number"
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm sm:text-base ${
                      errors.whatsappNumber ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
                    }`}
                  />
                  {errors.whatsappNumber && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs sm:text-sm mt-1 flex items-center gap-1"
                    >
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.whatsappNumber}
                    </motion.p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Address Information - READ ONLY Country */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-3 sm:space-y-4"
            >
              <div className="flex items-center gap-2 pb-2 border-b-2 border-orange-200">
                <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <h3 className="text-base sm:text-lg font-bold text-gray-800">
                  Address Information
                </h3>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                    Address Line 1 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="addressLine1"
                    value={form.addressLine1}
                    onChange={handleChange}
                    placeholder="Street address, P.O. box"
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm sm:text-base ${
                      errors.addressLine1 ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
                    }`}
                  />
                  {errors.addressLine1 && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs sm:text-sm mt-1 flex items-center gap-1"
                    >
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.addressLine1}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    name="addressLine2"
                    value={form.addressLine2}
                    onChange={handleChange}
                    placeholder="Apartment, suite, unit, building (optional)"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent hover:border-gray-400 transition-all text-sm sm:text-base"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <div className="relative w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 text-gray-600 flex items-center justify-between shadow-inner">
                      <span className="text-xs sm:text-sm font-medium truncate pr-2">{form.country}</span>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      Cannot be changed
                    </p>
                  </div>

                  {hasPostalCode() && (
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                        Postal Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={form.postalCode}
                        onChange={handleChange}
                        placeholder={getPostalCodeInfo().example || "Postal code"}
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm sm:text-base ${
                          errors.postalCode ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
                        }`}
                      />
                      {errors.postalCode && (
                        <motion.p 
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-xs sm:text-sm mt-1 flex items-center gap-1"
                        >
                          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.postalCode}
                        </motion.p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Training Information */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-3 sm:space-y-4"
            >
              <div className="flex items-center gap-2 pb-2 border-b-2 border-orange-200">
                <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
                <h3 className="text-base sm:text-lg font-bold text-gray-800">
                  Training Information
                </h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                    Dojo Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="dojoName"
                    value={form.dojoName}
                    onChange={handleChange}
                    placeholder="Your training dojo"
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm sm:text-base ${
                      errors.dojoName ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
                    }`}
                  />
                  {errors.dojoName && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs sm:text-sm mt-1 flex items-center gap-1"
                    >
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.dojoName}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                    Master Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="masterName"
                    value={form.masterName}
                    onChange={handleChange}
                    placeholder="Your master's name"
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm sm:text-base ${
                      errors.masterName ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
                    }`}
                  />
                  {errors.masterName && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs sm:text-sm mt-1 flex items-center gap-1"
                    >
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.masterName}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                    Belt Level <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="belt"
                    value={form.belt}
                    onChange={handleChange}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm sm:text-base ${
                      errors.belt ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <option value="">Select your belt</option>
                    {beltColors.map((belt) => (
                      <option key={belt} value={belt}>
                        {belt}
                      </option>
                    ))}
                  </select>
                  {errors.belt && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs sm:text-sm mt-1 flex items-center gap-1"
                    >
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.belt}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                    Medical Conditions/Ailments
                  </label>
                  <input
                    type="text"
                    name="ailment"
                    value={form.ailment}
                    onChange={handleChange}
                    placeholder="Any medical conditions (optional)"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent hover:border-gray-400 transition-all text-sm sm:text-base"
                  />
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6 border-t-2 border-gray-200 sticky bottom-0 bg-white -mx-4 sm:-mx-6 px-4 sm:px-6 pb-4 sm:pb-6"
            >
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="flex-1 px-4 sm:px-6 py-3 sm:py-3.5 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 hover:border-gray-400 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base shadow-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white py-3 sm:py-3.5 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Saving...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Save Changes</span>
                  </span>
                )}
              </button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}