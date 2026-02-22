/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { FloatingInput, FloatingTextarea, CategoryCard, EventCard, CountryCodeDropdown, CountryDropdown } from "./FormComponents";
import { TAX_RATES } from "../../constants/registrationConstants";

// ==================== CATEGORY SELECTION SECTION ====================
export const CategorySection = ({ categories, selectedCategory, onCategoryChange, currency, error }) => (
  <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 md:p-8 rounded-2xl border-2 border-red-200 shadow-sm">
    <label className="block text-base font-bold text-gray-800 mb-6 flex items-center gap-3">
      <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
          <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
        </svg>
      </div>
      <span className="text-lg">Select Age Category *</span>
    </label>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          isSelected={selectedCategory === category.id}
          onClick={() => onCategoryChange(category.id)}
          currency={currency}
        />
      ))}
    </div>
    {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
  </div>
);

// ==================== EVENT SELECTION SECTION ====================
export const EventSection = ({ 
  availableEvents, 
  selectedEvents, 
  onEventToggle, 
  error, 
  priceInfo, 
  currency,
  taxLabel
}) => {
  // Determine tax label based on currency
  const displayTaxLabel = taxLabel || (currency === "INR" ? `${TAX_RATES.INR.label}` : `${TAX_RATES.USD.label}`);
  const currencySymbol = currency === "INR" ? "₹" : "$";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-orange-50 to-red-50 p-6 md:p-8 rounded-2xl border-2 border-orange-200 shadow-sm"
    >
      <label className="block text-base font-bold text-gray-800 mb-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 100-4V6z" />
          </svg>
        </div>
        <span className="text-lg">Select Events * (Choose one or more)</span>
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {availableEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            isSelected={selectedEvents.includes(event.id)}
            onClick={() => onEventToggle(event.id)}
          />
        ))}
      </div>
      {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

      {selectedEvents.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 p-6 bg-white rounded-2xl border-2 border-orange-300 shadow-md space-y-3"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="font-semibold text-gray-700 text-lg">
                {selectedEvents.length} Event{selectedEvents.length > 1 ? "s" : ""} Selected
              </span>
              {selectedEvents.length === 3 && (
                <div className="text-sm text-green-600 font-medium mt-1">
                  🎉 Special combo price applied!
                </div>
              )}
            </div>
          </div>
          
          {/* Price Breakdown */}
          <div className="space-y-2 text-sm border-t pt-3">
            <div className="flex items-center justify-between text-gray-700">
              <span>Base Price:</span>
              <span className="font-semibold">{currencySymbol}{priceInfo.basePrice}</span>
            </div>
            
            <div className="flex items-center justify-between text-gray-700">
              <span>{displayTaxLabel}:</span>
              <span className="font-semibold">{currencySymbol}{priceInfo.gst}</span>
            </div>
            
            <div className="flex items-center justify-between text-gray-700 font-medium pt-2 border-t">
              <span>Subtotal:</span>
              <span className="font-semibold">{currencySymbol}{priceInfo.total}</span>
            </div>
            
            {/* Discount Section - Only show if discount exists */}
            {priceInfo.discount && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between text-green-700 bg-gradient-to-r from-green-50 to-emerald-50 -mx-6 px-6 py-3 rounded-lg border border-green-200"
              >
                <span className="font-semibold flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Discount ({priceInfo.discount.percentage}%):</span>
                </span>
                <span className="font-bold text-lg">-{currencySymbol}{Math.round(priceInfo.total * (priceInfo.discount.percentage / 100))}</span>
              </motion.div>
            )}
            
            {/* Final Total */}
            <div className="flex items-center justify-between border-t-2 border-orange-300 pt-3 mt-3">
              <span className="font-bold text-gray-800 text-lg">Total Amount:</span>
              <div className="text-right">
                <span className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  {currencySymbol}{priceInfo.finalPrice}
                </span>
                {priceInfo.discount && (
                  <div className="text-xs text-gray-500 line-through mt-1">
                    Was {currencySymbol}{priceInfo.total}
                  </div>
                )}
              </div>
            </div>
            
            {/* Savings Message */}
            {priceInfo.discount && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center pt-2"
              >
                <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full">
                  <span className="text-sm font-bold text-green-800">
                    🎉 You save {currencySymbol}{Math.round(priceInfo.total * (priceInfo.discount.percentage / 100))} with {priceInfo.discount.label}!
                  </span>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

// ==================== BENEFITS SECTION ====================
export const BenefitsSection = ({ benefits }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 md:p-8 rounded-2xl border-2 border-green-200 shadow-sm"
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>
      <h3 className="text-lg font-bold text-gray-800">Your Benefits</h3>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {benefits.map((benefit, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-green-200"
        >
          <span className="text-sm font-medium">{benefit}</span>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

// ==================== PERSONAL INFORMATION SECTION ====================
export const PersonalInfoSection = ({ form, errors, handleChange, ageLimits }) => (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 pb-2 border-b-2 border-gray-200">
      <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
      </svg>
      Personal Information
    </h3>

    <FloatingInput
      label="Full Name *"
      name="name"
      value={form.name}
      onChange={handleChange}
      error={errors.name}
      required
    />

    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-4">Gender *</label>
      <div className="flex flex-wrap gap-4">
        {["Male", "Female", "Other"].map((s) => (
          <label
            key={s}
            className="flex items-center gap-3 cursor-pointer group px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-red-300 transition-all"
          >
            <input
              type="radio"
              name="sex"
              value={s}
              checked={form.sex === s}
              onChange={handleChange}
              className="w-5 h-5 text-red-600 border-gray-300 focus:ring-red-500"
              required
            />
            <span className="text-gray-700 group-hover:text-red-600 transition-colors font-medium">
              {s}
            </span>
          </label>
        ))}
      </div>
      {errors.sex && <p className="text-red-500 text-sm mt-1">{errors.sex}</p>}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <FloatingInput
          label={`Age * (${ageLimits.min}-${ageLimits.max} years)`}
          name="age"
          type="number"
          value={form.age}
          onChange={handleChange}
          min={ageLimits.min}
          max={ageLimits.max}
          error={errors.age}
          required
        />
        {!errors.age && form.category && (
          <p className="text-xs text-gray-500 mt-1">
            Age range for selected category: {ageLimits.min}-{ageLimits.max} years
          </p>
        )}
      </div>

      <div>
        <div className="flex gap-0">
          <div className="relative flex-1">
            <FloatingInput
              label="Height *"
              name="height"
              type="number"
              value={form.height}
              onChange={handleChange}
              step={form.heightUnit === "inches" ? "0.1" : "1"}
              error={errors.height}
              required
            />
          </div>
          <select
            name="heightUnit"
            value={form.heightUnit}
            onChange={handleChange}
            className="w-20 md:w-24 p-4 border-2 border-l-0 border-gray-200 rounded-r-xl bg-gray-50 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none font-medium text-sm"
          >
            <option value="cm">cm</option>
            <option value="inches">in</option>
          </select>
        </div>
      </div>

      <div>
        <div className="flex gap-0">
          <div className="relative flex-1">
            <FloatingInput
              label="Weight *"
              name="weight"
              type="number"
              value={form.weight}
              onChange={handleChange}
              step="0.1"
              error={errors.weight}
              required
            />
          </div>
          <select
            name="weightUnit"
            value={form.weightUnit}
            onChange={handleChange}
            className="w-20 md:w-24 p-4 border-2 border-l-0 border-gray-200 rounded-r-xl bg-gray-50 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none font-medium text-sm"
          >
            <option value="kg">kg</option>
            <option value="lbs">lbs</option>
          </select>
        </div>
      </div>
    </div>
  </div>
);

// ==================== CONTACT INFORMATION SECTION ====================
export const ContactInfoSection = ({ 
  form, 
  errors, 
  handleChange,
  countryCodeDropdownState,
  whatsappCountryCodeDropdownState,
  countryCodes,
  phoneFormatHint,
  whatsappFormatHint
}) => (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 pb-2 border-b-2 border-gray-200">
      <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
      </svg>
      Contact Information
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      <div className="md:col-span-4">
        <CountryCodeDropdown
          value={form.countryCode}
          onChange={(code) => handleChange({ target: { name: "countryCode", value: code } })}
          show={countryCodeDropdownState.show}
          onToggle={countryCodeDropdownState.toggle}
          search={countryCodeDropdownState.search}
          onSearchChange={countryCodeDropdownState.setSearch}
          countries={countryCodes}
          label="Country Code *"
        />
      </div>
      <div className="md:col-span-8">
        <FloatingInput
          label="Mobile Number *"
          name="contact"
          value={form.contact}
          onChange={handleChange}
          error={errors.contact}
          required
        />
        {phoneFormatHint && !errors.contact && (
          <p className="text-xs text-gray-500 mt-1">Format: {phoneFormatHint}</p>
        )}
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      <div className="md:col-span-4">
        <CountryCodeDropdown
          value={form.whatsappCountryCode}
          onChange={(code) => handleChange({ target: { name: "whatsappCountryCode", value: code } })}
          show={whatsappCountryCodeDropdownState.show}
          onToggle={whatsappCountryCodeDropdownState.toggle}
          search={whatsappCountryCodeDropdownState.search}
          onSearchChange={whatsappCountryCodeDropdownState.setSearch}
          countries={countryCodes}
          label="WhatsApp Code *"
        />
      </div>
      <div className="md:col-span-8">
        <FloatingInput
          label="WhatsApp Number *"
          name="whatsappNumber"
          value={form.whatsappNumber}
          onChange={handleChange}
          error={errors.whatsappNumber}
          required
        />
        {whatsappFormatHint && !errors.whatsappNumber && (
          <p className="text-xs text-gray-500 mt-1">Format: {whatsappFormatHint}</p>
        )}
      </div>
    </div>

    <FloatingInput
      label="Email Address *"
      name="email"
      type="email"
      value={form.email}
      onChange={handleChange}
      error={errors.email}
      required
    />
  </div>
);

// ==================== ADDRESS INFORMATION SECTION ====================
export const AddressInfoSection = ({ 
  form, 
  errors, 
  handleChange,
  addressCountryDropdownState,
  countries,
  hasPostalCode,
  postalCodeInfo = {}
}) => (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 pb-2 border-b-2 border-gray-200">
      <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
      </svg>
      Address Information
    </h3>

    <FloatingInput
      label="Address Line 1 *"
      name="addressLine1"
      value={form.addressLine1}
      onChange={handleChange}
      error={errors.addressLine1}
      required
    />

    <FloatingInput
      label="Address Line 2"
      name="addressLine2"
      value={form.addressLine2}
      onChange={handleChange}
    />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <CountryDropdown
        value={form.country}
        onChange={(country) => handleChange({ target: { name: "country", value: country } })}
        show={addressCountryDropdownState.show}
        onToggle={addressCountryDropdownState.toggle}
        search={addressCountryDropdownState.search}
        onSearchChange={addressCountryDropdownState.setSearch}
        countries={countries}
        label="Country *"
        error={errors.country}
      />

      {hasPostalCode && (
        <div>
          <FloatingInput
            label={`Postal Code / ZIP Code * ${postalCodeInfo.postalCodeFormat ? `(${postalCodeInfo.postalCodeFormat})` : ''}`}
            name="postalCode"
            value={form.postalCode}
            onChange={handleChange}
            error={errors.postalCode}
            required
          />
          {postalCodeInfo.example && !errors.postalCode && (
            <p className="text-xs text-gray-500 mt-1">Example: {postalCodeInfo.example}</p>
          )}
        </div>
      )}
    </div>
  </div>
);

// ==================== TRAINING INFORMATION SECTION ====================
export const TrainingInfoSection = ({ form, errors, handleChange, beltColors }) => (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 pb-2 border-b-2 border-gray-200">
      <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
      </svg>
      Training Information
    </h3>

    <FloatingInput
      label="Dojo Name *"
      name="dojoName"
      value={form.dojoName}
      onChange={handleChange}
      error={errors.dojoName}
      required
    />

    <FloatingInput
      label="Master Name *"
      name="masterName"
      value={form.masterName}
      onChange={handleChange}
      error={errors.masterName}
      required
    />

    <div>
      <select
        name="belt"
        value={form.belt}
        onChange={handleChange}
        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none bg-white font-medium"
        required
      >
        <option value="">Select Belt Level *</option>
        {beltColors.map((belt) => (
          <option key={belt} value={belt}>
            {belt}
          </option>
        ))}
      </select>
      {errors.belt && <p className="text-red-500 text-sm mt-1">{errors.belt}</p>}
    </div>

    <FloatingTextarea
      label="Physical Ailments (if any)"
      name="ailment"
      value={form.ailment}
      onChange={handleChange}
      rows={2}
    />

    <div className="relative">
      <input
        type="text"
        value={new Date(form.dateOfEnrolment).toLocaleDateString("en-IN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        disabled
        className="w-full p-4 pt-6 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-600"
      />
      <label className="absolute left-4 top-2 text-xs text-gray-500 font-medium">
        Date of Enrolment
      </label>
    </div>
  </div>
);