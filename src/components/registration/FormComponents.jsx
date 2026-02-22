/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

// Removed framer-motion - use CSS animations instead for these simple components

// ==================== FLOATING INPUT ====================
export const FloatingInput = ({ label, name, value, onChange, type = "text", error, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value !== "";

  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full p-4 pt-6 border-2 rounded-xl transition-all outline-none ${
          error
            ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
            : "border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200"
        }`}
        {...props}
      />
      <label
        className={`absolute left-4 transition-all pointer-events-none ${
          isFocused || hasValue
            ? "top-2 text-xs text-red-600 font-medium"
            : "top-4 text-gray-500"
        }`}
      >
        {label}
      </label>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

// ==================== FLOATING TEXTAREA ====================
export const FloatingTextarea = ({ label, name, value, onChange, error, rows = 3, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value !== "";

  return (
    <div className="relative">
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        rows={rows}
        className={`w-full p-4 pt-6 border-2 rounded-xl transition-all outline-none resize-none ${
          error
            ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
            : "border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200"
        }`}
        {...props}
      />
      <label
        className={`absolute left-4 transition-all pointer-events-none ${
          isFocused || hasValue
            ? "top-2 text-xs text-red-600 font-medium"
            : "top-4 text-gray-500"
        }`}
      >
        {label}
      </label>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

// ==================== CATEGORY CARD ====================
export const CategoryCard = ({ category, isSelected, onClick }) => (
  <label
    className={`relative flex flex-col p-4 md:p-5 border-2 rounded-2xl cursor-pointer transition-all duration-200 ${
      isSelected
        ? "border-red-500 bg-gradient-to-br from-red-50 to-orange-50 shadow-lg scale-105"
        : "border-gray-200 bg-white hover:border-red-300 hover:shadow-md hover:scale-102"
    }`}
  >
    <input type="radio" checked={isSelected} onChange={onClick} className="sr-only" />
    <div className="flex items-start justify-between mb-3">
      <div>
        <span className="font-bold text-gray-800 text-base md:text-lg block mb-1">
          {category.name}
        </span>
        <p className="text-xs md:text-sm text-gray-600">{category.description}</p>
      </div>
      {isSelected && (
        <div className="flex-shrink-0 animate-scale-in">
          <svg className="w-7 h-7 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </div>
  </label>
);

// ==================== EVENT CARD ====================
export const EventCard = ({ event, isSelected, onClick }) => (
  <label
    className={`relative flex flex-col p-5 border-2 rounded-2xl cursor-pointer transition-all duration-200 ${
      isSelected
        ? "border-orange-500 bg-gradient-to-br from-orange-50 to-red-50 shadow-lg scale-105"
        : "border-gray-200 bg-white hover:border-orange-300 hover:shadow-md hover:scale-102"
    }`}
  >
    <input type="checkbox" checked={isSelected} onChange={onClick} className="sr-only" />
    <div className="flex items-start justify-between mb-2">
      <span className="font-bold text-gray-800 text-lg">{event.name}</span>
      {isSelected && (
        <div className="animate-scale-in">
          <svg className="w-7 h-7 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </div>
    <p className="text-sm text-gray-600">{event.description}</p>
  </label>
);

// ==================== COUNTRY CODE DROPDOWN ====================
export const CountryCodeDropdown = ({ value, onChange, show, onToggle, search, onSearchChange, countries, label }) => {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const placeholders = ["Search by Country name", "Search by Country code"];

  useEffect(() => {
    if (show) {
      const interval = setInterval(() => {
        setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [show]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none text-left flex items-center justify-between bg-white hover:border-red-300"
      >
        <span className="font-semibold text-sm md:text-base">
          {countries.find((c) => c.code === value)?.flag} {value}
        </span>
        <svg
          className={`w-5 h-5 transition-transform ${show ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <label className="absolute left-4 top-1 text-xs text-gray-500 font-medium">{label}</label>

      {show && (
        <div className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-2xl max-h-64 overflow-hidden animate-fade-in">
          <div className="p-3 border-b relative">
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={placeholders[placeholderIndex]}
              className="w-full p-3 border-2 border-gray-300 rounded-lg outline-none focus:border-red-500 transition-all"
            />
          </div>
          <div className="overflow-y-auto max-h-48">
            {countries
              .filter(
                (country) =>
                  country.name.toLowerCase().includes(search.toLowerCase()) ||
                  country.code.includes(search)
              )
              .map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => {
                    onChange(country.code);
                    onToggle();
                    onSearchChange("");
                  }}
                  className="w-full p-3 text-left hover:bg-red-50 transition-colors flex items-center gap-3"
                >
                  <span className="text-2xl">{country.flag}</span>
                  <span className="font-medium">{country.name}</span>
                  <span className="text-gray-500 ml-auto">{country.code}</span>
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ==================== COUNTRY DROPDOWN ====================
export const CountryDropdown = ({ value, onChange, show, onToggle, search, onSearchChange, countries, label, error }) => {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const placeholders = ["Search by Country name"];

  useEffect(() => {
    if (show) {
      const interval = setInterval(() => {
        setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [show]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className={`w-full p-4 pt-6 border-2 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none text-left flex items-center justify-between bg-white hover:border-red-300 ${
          error ? "border-red-300" : "border-gray-200"
        }`}
      >
        <span className="font-semibold text-sm md:text-base">
          {value ? (
            <>
              {countries.find((c) => c.name === value)?.flag} {value}
            </>
          ) : (
            <span className="text-gray-500 font-normal">Select country</span>
          )}
        </span>
        <svg
          className={`w-5 h-5 transition-transform ${show ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <label className="absolute left-4 top-2 text-xs text-red-600 font-medium">{label}</label>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

      {show && (
        <div className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-2xl max-h-64 overflow-hidden animate-fade-in">
          <div className="p-3 border-b relative">
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={placeholders[placeholderIndex]}
              className="w-full p-3 border-2 border-gray-300 rounded-lg outline-none focus:border-red-500 transition-all"
            />
          </div>
          <div className="overflow-y-auto max-h-48">
            {countries
              .filter((country) =>
                country.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((country) => (
                <button
                  key={country.name}
                  type="button"
                  onClick={() => {
                    onChange(country.name);
                    onToggle();
                    onSearchChange("");
                  }}
                  className="w-full p-3 text-left hover:bg-red-50 transition-colors flex items-center gap-3"
                >
                  <span className="text-2xl">{country.flag}</span>
                  <span className="font-medium">{country.name}</span>
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Add CSS for animations in your global CSS file:
/*
@keyframes scale-in {
  from {
    transform: scale(0) rotate(-180deg);
  }
  to {
    transform: scale(1) rotate(0);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-scale-in {
  animation: scale-in 0.3s ease-out;
}

.animate-fade-in {
  animation: fade-in 0.2s ease-out;
}
*/