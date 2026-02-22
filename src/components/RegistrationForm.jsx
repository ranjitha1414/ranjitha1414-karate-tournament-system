/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useRegion } from "./RegionContext";
import { Link } from "react-scroll";
import RegistrationChecker from "./registration/RegistrationChecker";
import EditRegistration from "./registration/EditRegistration";
import {
  getEventCategories,
  getActiveDiscounts,
  createRegistration,
  getRegistrationByPhone,
  updateRegistrationPaymentStatus,
  createSpectatorTicket,
} from "../services/supabaseService";
import logo from "../assets/logo.png";
// Import components
import {
  CategorySection,
  EventSection,
  BenefitsSection,
  PersonalInfoSection,
  ContactInfoSection,
  AddressInfoSection,
  TrainingInfoSection,
} from "./registration/FormSections";
import { PaymentSuccess, PaymentFailed, LoadingOverlay } from "./registration/PaymentStatus";

// Import constants
import {
  countryCodes,
  countries,
  beltColors,
  INR_TO_USD,
  TAX_RATES,
  RAZORPAY_KEY_ID,
  API_BASE_URL,
} from "../constants/registrationConstants";

export default function RegistrationForm() {
  const { region } = useRegion();
  
  const [form, setForm] = useState({
    name: "",
    sex: "",
    age: "",
    height: "",
    heightUnit: "cm",
    weight: "",
    weightUnit: "kg",
    countryCode: region === 'india' ? "+91" : "+1",
    contact: "",
    whatsappCountryCode: region === 'india' ? "+91" : "+1",
    whatsappNumber: "",
    email: "",
    category: "",
    selectedEvents: [],
    dojoName: "",
    masterName: "",
    addressLine1: "",
    addressLine2: "",
    country: region === 'india' ? "India" : "United States",
    postalCode: "",
    belt: "",
    ailment: "",
    dateOfEnrolment: new Date().toISOString().split("T")[0],
  });

  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [categories, setCategories] = useState([]);
  const [availableEvents, setAvailableEvents] = useState([]);
  const [errors, setErrors] = useState({});
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [countdown, setCountdown] = useState(5);
  const [discountSettings, setDiscountSettings] = useState(null);
  
  // Dropdown states
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showWhatsappCountryDropdown, setShowWhatsappCountryDropdown] = useState(false);
  const [showAddressCountryDropdown, setShowAddressCountryDropdown] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [whatsappCountrySearch, setWhatsappCountrySearch] = useState("");
  const [addressCountrySearch, setAddressCountrySearch] = useState("");

  // Edit modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingRegistration, setEditingRegistration] = useState(null);

  useEffect(() => {
    setForm(prevForm => ({
      ...prevForm,
      countryCode: region === 'india' ? "+91" : "+1",
      whatsappCountryCode: region === 'india' ? "+91" : "+1",
      country: region === 'india' ? "India" : "United States",
    }));
  }, [region]);

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const categoriesData = await getEventCategories();
      setCategories(categoriesData);
      setLoadingCategories(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      alert("Failed to load event categories. Please refresh the page.");
      setLoadingCategories(false);
    }
  };

  const fetchDiscountSettings = async () => {
    try {
      const discounts = await getActiveDiscounts();
      if (discounts && discounts.length > 0) {
        setDiscountSettings({ earlyBird: discounts });
      }
    } catch (error) {
      console.error("Error fetching discount settings:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchDiscountSettings();
  }, []);

  useEffect(() => {
    if (form.category) {
      const selectedCategory = categories.find((cat) => cat.id === form.category);
      if (selectedCategory && selectedCategory.events) {
        setAvailableEvents(selectedCategory.events);
      } else {
        setAvailableEvents([]);
      }
    } else {
      setAvailableEvents([]);
    }
  }, [form.category, categories]);

  useEffect(() => {
    if (paymentStatus === "success" && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (paymentStatus === "success" && countdown === 0) {
      resetForm();
    }
  }, [paymentStatus, countdown]);

  const getCurrency = () => region === "india" ? "INR" : "USD";

  const hasPostalCode = () => {
    const country = countries.find((c) => c.name === form.country);
    return country ? country.hasPostalCode : true;
  };

  const getAgeLimits = () => {
  const selectedCategory = categories.find(
    (cat) => cat.id === form.category
  );

  if (!selectedCategory) return { min: 5, max: 100 };

  const text = (selectedCategory.description || "").trim();

  const underMatch = text.match(/Under\s*(\d+)/i);
  if (underMatch) {
    return { min: 5, max: parseInt(underMatch[1]) - 1 };
  }

  const rangeMatch = text.match(/(\d+)\s*-\s*(\d+)/);
  if (rangeMatch) {
    return { min: parseInt(rangeMatch[1]), max: parseInt(rangeMatch[2]) };
  }

  const plusMatch = text.match(/(\d+)\+/);
  if (plusMatch) {
    const min = parseInt(plusMatch[1]);
    return { min, max: 100 };
  }

  return { min: 5, max: 100 };
};

  const getPhoneLength = (countryCode) => {
    const country = countryCodes.find((c) => c.code === countryCode);
    return country ? country.phoneLength : 10;
  };

  const getPhoneFormatHint = (countryCode) => {
    const country = countryCodes.find((c) => c.code === countryCode);
    return country ? country.format : "";
  };

  const getPostalCodeInfo = () => {
    const country = countries.find((c) => c.name === form.country);
    return country || { hasPostalCode: true, postalCodeFormat: "", example: "" };
  };

  const convertPrice = (priceINR) => {
    if (getCurrency() === "USD") {
      return parseFloat((priceINR * INR_TO_USD).toFixed(2));
    }
    return parseFloat(priceINR.toFixed(2));
  };

  const calculateGST = (basePrice) => {
    const currency = getCurrency();
    const taxRate = TAX_RATES[currency].rate;
    return parseFloat((basePrice * taxRate).toFixed(2));
  };

  const calculateFinalPrice = (basePrice) => {
    const gst = calculateGST(basePrice);
    return parseFloat((basePrice + gst).toFixed(2));
  };

  const getActiveDiscount = () => {
    if (!discountSettings || !discountSettings.earlyBird) return null;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (const discount of discountSettings.earlyBird) {
      const startDate = new Date(discount.startDate);
      const endDate = new Date(discount.endDate);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
      
      if (today >= startDate && today <= endDate) {
        return discount;
      }
    }
    
    return null;
  };

  const applyDiscount = (price) => {
    const activeDiscount = getActiveDiscount();
    if (!activeDiscount) return price;
    
    const discountAmount = parseFloat((price * (activeDiscount.percentage / 100)).toFixed(2));
    return parseFloat((price - discountAmount).toFixed(2));
  };

  const calculateFinalPriceWithDiscount = (basePrice) => {
    const gst = calculateGST(basePrice);
    const subtotal = basePrice + gst;
    return parseFloat(applyDiscount(subtotal).toFixed(2));
  };

  const getSelectedCategoryPrice = () => {
    const selectedCategory = categories.find((cat) => cat.id === form.category);
    if (!selectedCategory || !selectedCategory.events || form.selectedEvents.length === 0) return 0;
    
    let totalPrice = 0;
    if (form.selectedEvents.length === 3 && selectedCategory.comboPrice) {
      totalPrice = selectedCategory.comboPrice;
    } else {
      form.selectedEvents.forEach(eventId => {
        const event = selectedCategory.events.find(e => e.id === eventId);
        if (event && event.price) {
          totalPrice += event.price;
        }
      });
    }
    
    return parseFloat(convertPrice(totalPrice).toFixed(2));
  };

  const getFreeSpectatorTickets = (eventCount) => {
    if (eventCount === 1) return 0;
    if (eventCount === 2) return 0;
    if (eventCount === 3) return 0;
    return 0;
  };

  const getBenefits = () => {
    const eventCount = form.selectedEvents.length;
    const selectedCategory = categories.find((cat) => cat.id === form.category);
    const benefits = [];
    
    if (eventCount === 1) {
      benefits.push("✅ Free food for the day");
      benefits.push("✅ Event participation certificate");
    } else if (eventCount === 2) {
      benefits.push("✅ Free food for both days");
      benefits.push("✅ Event participation certificates");
    } else if (eventCount === 3) {
      benefits.push("✅ Free food for all days");
      
      if (selectedCategory && selectedCategory.events && selectedCategory.comboPrice) {
        const regularTotal = selectedCategory.events.reduce((sum, e) => sum + (e.price || 0), 0);
        const savings = regularTotal - selectedCategory.comboPrice;
        const convertedSavings = convertPrice(savings);
        const currencySymbol = getCurrency() === "INR" ? "₹" : "$";
        benefits.push(`✅ Special discount - Save ${currencySymbol}${convertedSavings}!`);
      } else {
        benefits.push("✅ Special combo discount!");
      }
      
      benefits.push("✅ All event participation certificates");
    }
    return benefits;
  };

  const resetForm = () => {
    setForm({
      name: "",
      sex: "",
      age: "",
      height: "",
      heightUnit: "cm",
      weight: "",
      weightUnit: "kg",
      countryCode: region === 'india' ? "+91" : "+1",
      contact: "",
      whatsappCountryCode: region === 'india' ? "+91" : "+1",
      whatsappNumber: "",
      email: "",
      category: "",
      selectedEvents: [],
      dojoName: "",
      masterName: "",
      addressLine1: "",
      addressLine2: "",
      country: region === 'india' ? "India" : "United States",
      postalCode: "",
      belt: "",
      ailment: "",
      dateOfEnrolment: new Date().toISOString().split("T")[0],
    });
    setPaymentStatus(null);
    setCountdown(5);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "contact") {
      const maxLength = getPhoneLength(form.countryCode);
      const digitsOnly = value.replace(/\D/g, "").slice(0, maxLength);
      setForm({ ...form, [name]: digitsOnly });
      setErrors({ ...errors, [name]: "" });
      return;
    }
    
    if (name === "whatsappNumber") {
      const maxLength = getPhoneLength(form.whatsappCountryCode);
      const digitsOnly = value.replace(/\D/g, "").slice(0, maxLength);
      setForm({ ...form, [name]: digitsOnly });
      setErrors({ ...errors, [name]: "" });
      return;
    }
    
    if (name === "category") {
      setForm({ ...form, [name]: value, selectedEvents: [], age: "" });
      if (errors[name]) setErrors({ ...errors, [name]: "" });
      return;
    }
    
    if (name === "country") {
      const newCountry = countries.find(c => c.name === value);
      if (newCountry && !newCountry.hasPostalCode) {
        setForm({ ...form, [name]: value, postalCode: "" });
      } else {
        setForm({ ...form, [name]: value });
      }
      if (errors[name]) setErrors({ ...errors, [name]: "" });
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

  const handleEventToggle = (eventId) => {
    const isSelected = form.selectedEvents.includes(eventId);
    const newSelectedEvents = isSelected
      ? form.selectedEvents.filter((id) => id !== eventId)
      : [...form.selectedEvents, eventId];
    setForm({ ...form, selectedEvents: newSelectedEvents });
    if (errors.events) setErrors({ ...errors, events: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email format";
    
    const age = parseInt(form.age);
    if (!age || age < 1 || age > 120) {
      newErrors.age = "Please enter a valid age (1-120)";
    }
    
    const contactLength = getPhoneLength(form.countryCode);
    if (form.contact.length !== contactLength) {
      newErrors.contact = `Mobile number must be exactly ${contactLength} digits`;
    }
    
    const whatsappLength = getPhoneLength(form.whatsappCountryCode);
    if (form.whatsappNumber.length !== whatsappLength) {
      newErrors.whatsappNumber = `WhatsApp number must be exactly ${whatsappLength} digits`;
    }
    
    if (!form.sex) newErrors.sex = "Please select gender";
    if (!form.category) newErrors.category = "Please select a category";
    if (form.selectedEvents.length === 0) newErrors.events = "Please select at least one event";
    
    const ageLimits = getAgeLimits();
    if (age < ageLimits.min || age > ageLimits.max) {
      newErrors.age = `Age must be between ${ageLimits.min} and ${ageLimits.max} years for this category`;
    }
    
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
    if (!form.country) newErrors.country = "Please select your country";
    
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
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    try {
      setLoading(true);
      
      // Check if phone number already exists in Supabase
      const existingRegistration = await getRegistrationByPhone(form.countryCode, form.contact);
      if (existingRegistration) {
        alert("A registration with this mobile number already exists!");
        setLoading(false);
        return;
      }

      const basePrice = getSelectedCategoryPrice();
      const gstAmount = calculateGST(basePrice);
      const subtotal = calculateFinalPrice(basePrice);
      const activeDiscount = getActiveDiscount();
      const finalPrice = calculateFinalPriceWithDiscount(basePrice);
      const discountAmount = activeDiscount ? (subtotal * (activeDiscount.percentage / 100)) : 0;
      const currency = getCurrency();
      
      // Create full address
      let fullAddress = form.addressLine1;
      if (form.addressLine2) fullAddress += ", " + form.addressLine2;
      if (form.postalCode) fullAddress += ", " + form.postalCode;
      fullAddress += ", " + form.country;

      // Prepare registration data for Supabase
      const registrationPayload = {
        name: form.name,
        age: parseInt(form.age),
        sex: form.sex,
        height: parseFloat(form.height),
        heightUnit: form.heightUnit,
        weight: parseFloat(form.weight),
        weightUnit: form.weightUnit,
        countryCode: form.countryCode,
        contact: form.contact,
        whatsappCountryCode: form.whatsappCountryCode,
        whatsappNumber: form.whatsappNumber,
        email: form.email,
        category: form.category,
        selectedEvents: form.selectedEvents,
        dojoName: form.dojoName,
        masterName: form.masterName,
        address: fullAddress,
        addressLine1: form.addressLine1,
        addressLine2: form.addressLine2,
        country: form.country,
        postalCode: form.postalCode,
        belt: form.belt,
        ailment: form.ailment,
        dateOfEnrolment: form.dateOfEnrolment,
        basePrice: basePrice,
        gst: gstAmount,
        subtotal: subtotal,
        discountPercentage: activeDiscount ? activeDiscount.percentage : 0,
        discountLabel: activeDiscount ? activeDiscount.label : null,
        discountAmount: discountAmount,
        totalCost: finalPrice,
        currency: currency,
        paymentStatus: "pending",
      };

      // Save registration to Supabase with PENDING status
      const savedRegistration = await createRegistration(registrationPayload);
      console.log("Registration created in Supabase:", savedRegistration.id);
      
      // Create Razorpay order (supports both INR and USD)
      const { data } = await axios.post(`${API_BASE_URL}/create-order`, {
        amount: finalPrice,
        currency: currency, // INR or USD
        registrationId: savedRegistration.id,
      });

      if (!data.id) throw new Error("Failed to create order");

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "IWKA 2026",
        description: "Tournament Registration",
        order_id: data.id,
        handler: async (response) => {
          try {
            const verifyResponse = await axios.post(`${API_BASE_URL}/verify-payment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              customerEmail: form.email,
              customerName: form.name,
              amount: data.amount,
              currency: currency,
              registrationId: savedRegistration.id,
              registrationData: {
                selectedEvents: form.selectedEvents.map(eventId => {
                  const event = availableEvents.find(e => e.id === eventId);
                  return event ? event.name : eventId;
                }),
                category: categories.find(cat => cat.id === form.category)?.name || form.category,
                dojoName: form.dojoName,
                masterName: form.masterName,
              },
            });

            if (!verifyResponse.data.success) {
              throw new Error("Payment verification failed");
            }

            // Update Supabase with payment success
            await updateRegistrationPaymentStatus(savedRegistration.id, {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
            });

            // Add free spectator tickets to Supabase
            const freeTicketCount = getFreeSpectatorTickets(form.selectedEvents.length);
            if (freeTicketCount > 0) {
              try {
                const spectatorData = {
                  participantRegistrationId: savedRegistration.id,
                  participantName: form.name,
                  participantEmail: form.email,
                  name: form.name,
                  age: parseInt(form.age),
                  email: form.email,
                  contact: `${form.countryCode}${form.contact}`,
                  whatsappNumber: `${form.whatsappCountryCode}${form.whatsappNumber}`,
                  ticketQuantity: freeTicketCount,
                  ticketType: "Spectator - Free (Participant Benefit)",
                  basePrice: 0,
                  tax: 0,
                  totalAmount: 0,
                  currency: currency,
                  paymentStatus: "complimentary",
                  paymentMethod: "participant_benefit",
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  isComplimentary: true,
                  benefitReason: `Free spectator tickets for registering ${form.selectedEvents.length} event(s)`,
                  emailSent: false,
                };

                await createSpectatorTicket(spectatorData);
                console.log(`Successfully added ${freeTicketCount} free spectator ticket(s)`);
              } catch (spectatorError) {
                console.error("Error adding free spectator tickets:", spectatorError);
              }
            }

            setLoading(false);
            setPaymentStatus("success");
          } catch (error) {
            console.error("Error in payment handler:", error);
            setLoading(false);
            alert("Payment successful but registration failed to update. Please contact support with payment ID: " + response.razorpay_payment_id);
          }
        },
        prefill: { 
          name: form.name, 
          email: form.email, 
          contact: form.countryCode + form.contact 
        },
        theme: { color: "#d32f2f" },
        modal: {
          escape: true,
          ondismiss: () => {
            setLoading(false);
            setPaymentStatus("failed");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function () {
        setLoading(false);
        setPaymentStatus("failed");
      });
      rzp.open();
    } catch (err) {
      console.error(err);
      setLoading(false);
      setPaymentStatus("failed");
    }
  };

  const basePrice = getSelectedCategoryPrice();
  const priceInfo = {
    basePrice,
    gst: calculateGST(basePrice),
    total: calculateFinalPrice(basePrice),
    discount: getActiveDiscount(),
    finalPrice: calculateFinalPriceWithDiscount(basePrice),
  };

  const handleEditRequest = (registrationData) => {
    setEditingRegistration(registrationData);
    setShowEditModal(true);
  };

  const handleEditSuccess = () => {
    setShowEditModal(false);
    setEditingRegistration(null);
  };

  const handleEditClose = () => {
    setShowEditModal(false);
    setEditingRegistration(null);
  };

  return (
    <section
      id="register"
      className="py-20 bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 relative overflow-hidden min-h-screen"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-500 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <AnimatePresence mode="wait">
          {paymentStatus === "success" && <PaymentSuccess countdown={countdown} />}
          {paymentStatus === "failed" && <PaymentFailed onRetry={() => setPaymentStatus(null)} />}

          {!paymentStatus && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-red-100"
            >
              {(loading || loadingCategories) && <LoadingOverlay isLoadingCategories={loadingCategories} />}

              <div className="text-center mb-10">
<motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ type: "spring", stiffness: 200, damping: 15 }}
  className="inline-block mb-6"
>
  <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 mx-auto rounded-full flex items-center justify-center p-3">
    <img 
      src={logo} 
      alt="Isshinryu Logo" 
      className="w-full h-full object-contain"
    />
  </div>
</motion.div>

                <h2 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  Tournament Registration
                </h2>
                <p className="text-gray-600 text-lg">
                  Join the <span className="font-semibold text-red-600">IWKA 2026</span>
                </p>
                
                {/* Region and Currency Status */}
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2.5 rounded-lg border border-blue-200 shadow-sm">
                    <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <span className="text-sm font-medium text-blue-800">
                        <span className="font-bold">{region === 'india' ? 'India' : 'International'}</span> | Currency: <span className="font-bold">{getCurrency() === "INR" ? "₹ INR" : "$ USD"}</span>
                      </span>
                      <span className="hidden sm:inline text-blue-600">•</span>
                      <Link
                        to="home"
                        smooth={true}
                        duration={600}
                        offset={-80}
                        className="text-blue-600 hover:text-blue-800 underline cursor-pointer font-semibold text-sm whitespace-nowrap transition-colors"
                      >
                        Click here to change
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* Early Bird Discount Badge */}
                {priceInfo.discount && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                    className="mt-6"
                  >
                    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 px-6 py-4 rounded-xl border-2 border-green-300 shadow-lg hover:shadow-xl transition-shadow">
                      <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <span className="block text-xs font-bold text-green-700 uppercase tracking-wider mb-0.5">🎉 Active Offer</span>
                        <span className="block text-base font-extrabold text-green-900">{priceInfo.discount.label}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <CategorySection
                  categories={categories}
                  selectedCategory={form.category}
                  onCategoryChange={(category) => handleChange({ target: { name: "category", value: category } })}
                  currency={getCurrency()}
                  error={errors.category}
                />

                {form.category && (
                  <>
                    <EventSection
                      availableEvents={availableEvents}
                      selectedEvents={form.selectedEvents}
                      onEventToggle={handleEventToggle}
                      error={errors.events}
                      priceInfo={priceInfo}
                      currency={getCurrency()}
                    />

                    {form.selectedEvents.length > 0 && (
                      <BenefitsSection benefits={getBenefits()} />
                    )}
                  </>
                )}

                <PersonalInfoSection
                  form={form}
                  errors={errors}
                  handleChange={handleChange}
                  ageLimits={getAgeLimits()}
                />

                <ContactInfoSection
                  form={form}
                  errors={errors}
                  handleChange={handleChange}
                  countryCodeDropdownState={{
                    show: showCountryDropdown,
                    toggle: () => setShowCountryDropdown(!showCountryDropdown),
                    search: countrySearch,
                    setSearch: setCountrySearch,
                  }}
                  whatsappCountryCodeDropdownState={{
                    show: showWhatsappCountryDropdown,
                    toggle: () => setShowWhatsappCountryDropdown(!showWhatsappCountryDropdown),
                    search: whatsappCountrySearch,
                    setSearch: setWhatsappCountrySearch,
                  }}
                  countryCodes={countryCodes}
                  phoneFormatHint={getPhoneFormatHint(form.countryCode)}
                  whatsappFormatHint={getPhoneFormatHint(form.whatsappCountryCode)}
                />

                <AddressInfoSection
                  form={form}
                  errors={errors}
                  handleChange={handleChange}
                  addressCountryDropdownState={{
                    show: showAddressCountryDropdown,
                    toggle: () => setShowAddressCountryDropdown(!showAddressCountryDropdown),
                    search: addressCountrySearch,
                    setSearch: setAddressCountrySearch,
                  }}
                  countries={countries}
                  hasPostalCode={hasPostalCode()}
                  postalCodeInfo={getPostalCodeInfo()}
                />

                <TrainingInfoSection
                  form={form}
                  errors={errors}
                  handleChange={handleChange}
                  beltColors={beltColors}
                />

                <motion.button
                  type="submit"
                  disabled={loading || !form.category || form.selectedEvents.length === 0}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-6 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-8"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg
                        className="animate-spin h-6 w-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing Payment...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Register & Pay {getCurrency() === "INR" ? "₹" : "$"}
                      {form.category && form.selectedEvents.length > 0 
                        ? priceInfo.finalPrice
                        : "---"}
                      {priceInfo.discount && form.category && form.selectedEvents.length > 0 && (
                        <span className="ml-2 text-sm line-through opacity-75">
                          {getCurrency() === "INR" ? "₹" : "$"}{priceInfo.total}
                        </span>
                      )}
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  )}
                </motion.button>
              </form>

              <p className="text-center text-gray-500 text-sm mt-8 pb-2 flex items-center justify-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Secure payment powered by Razorpay
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <RegistrationChecker onEditRequest={handleEditRequest} />
      
      {showEditModal && editingRegistration && (
        <EditRegistration
          registrationData={editingRegistration}
          onClose={handleEditClose}
          onSuccess={handleEditSuccess}
        />
      )}
    </section>
  );
}