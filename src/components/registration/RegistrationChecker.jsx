/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  getRegistrationByPhone, 
  updateRegistrationPaymentStatus,
  deleteRegistration,
  getAdminPassword 
} from "../../services/supabaseService";
import axios from "axios";
import { API_BASE_URL, RAZORPAY_KEY_ID } from "../../constants/registrationConstants";
import { countryCodes } from "../../constants/registrationConstants";

export default function RegistrationChecker({ onEditRequest }) {
  const [showModal, setShowModal] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);
  const [spectatorData, setSpectatorData] = useState(null);
  const [error, setError] = useState("");
  const [processingPayment, setProcessingPayment] = useState(false);
  
  // Password modal states
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [verifyingPassword, setVerifyingPassword] = useState(false);
  const [actionType, setActionType] = useState("");

  // Updated function to search for spectator tickets with better matching
  const getSpectatorTicketsByPhone = async (countryCode, phone) => {
    try {
      const { supabase } = await import('../../supabaseClient');
      
      // Try multiple phone number formats to improve matching
      const phoneVariations = [
        phone, // Just the number
        `${countryCode}${phone}`, // With country code
        `${countryCode} ${phone}`, // With country code and space
        phone.replace(/^0+/, ''), // Remove leading zeros
      ];
      
      console.log('Searching for phone variations:', phoneVariations);
      
      // Search for any of the phone variations
      const { data, error } = await supabase
        .from('spectator_tickets')
        .select('*')
        .or(phoneVariations.map(p => `contact.eq.${p}`).join(','));

      if (error && error.code !== 'PGRST116') {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Found spectator tickets:', data);
      return data || [];
    } catch (error) {
      console.error('Error fetching spectator tickets:', error);
      return [];
    }
  };

  // Updated handleCheck function
  const handleCheck = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      setError("Please enter a valid phone number");
      return;
    }

    setLoading(true);
    setError("");
    setRegistrationData(null);
    setSpectatorData(null);

    try {
      // Check participant registration
      const participantData = await getRegistrationByPhone(countryCode, phoneNumber);
      
      // Check spectator tickets - NOW PASSING COUNTRY CODE
      const spectatorTickets = await getSpectatorTicketsByPhone(countryCode, phoneNumber);
      
      if (!participantData && (!spectatorTickets || spectatorTickets.length === 0)) {
        setError("No registration or spectator tickets found with this phone number");
      } else {
        if (participantData) {
          setRegistrationData(participantData);
        }
        if (spectatorTickets && spectatorTickets.length > 0) {
          setSpectatorData(spectatorTickets);
        }
      }
    } catch (err) {
      console.error("Error checking registration:", err);
      setError("Failed to check registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePayNow = async () => {
    if (!registrationData) return;

    setProcessingPayment(true);
    
    try {
      const amount = registrationData.totalCost;
      const currency = registrationData.currency;

      // Process payment through Razorpay for both INR and USD
      const { data } = await axios.post(`${API_BASE_URL}/create-order`, {
        amount: amount,
        currency: currency, // Now supports both INR and USD
        registrationId: registrationData.id,
      });

      if (!data.id) throw new Error("Failed to create order");

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "IWKA 2026",
        description: "Complete Tournament Registration",
        order_id: data.id,
        handler: async (response) => {
          try {
            const verifyResponse = await axios.post(`${API_BASE_URL}/verify-payment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              customerEmail: registrationData.email,
              customerName: registrationData.name,
              amount: data.amount,
              currency: currency, // Send the actual currency
              registrationId: registrationData.id,
              registrationData: {
                selectedEvents: registrationData.selectedEvents,
                category: registrationData.category,
                dojoName: registrationData.dojoName,
                masterName: registrationData.masterName,
              },
            });

            if (!verifyResponse.data.success) {
              throw new Error("Payment verification failed");
            }

            await updateRegistrationPaymentStatus(registrationData.id, {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
            });

            setProcessingPayment(false);
            alert("Payment successful! Your registration is now complete.");
            setShowModal(false);
            setRegistrationData(null);
            setSpectatorData(null);
            setPhoneNumber("");
          } catch (error) {
            console.error("Error in payment handler:", error);
            setProcessingPayment(false);
            alert("Payment successful but registration failed to update. Please contact support.");
          }
        },
        prefill: {
          name: registrationData.name,
          email: registrationData.email,
          contact: registrationData.contact,
        },
        theme: { color: "#d32f2f" },
        modal: {
          escape: true,
          ondismiss: () => {
            setProcessingPayment(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function () {
        setProcessingPayment(false);
        alert("Payment failed. Please try again.");
      });
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      setProcessingPayment(false);
      alert("Failed to initiate payment. Please try again.");
    }
  };

  const handleEditClick = () => {
    setActionType("edit");
    setShowPasswordModal(true);
    setPassword("");
    setPasswordError("");
  };

  const handleDeleteClick = () => {
    setActionType("delete");
    setShowPasswordModal(true);
    setPassword("");
    setPasswordError("");
  };

  const verifyPassword = async () => {
    if (!password) {
      setPasswordError("Please enter password");
      return;
    }

    setVerifyingPassword(true);
    setPasswordError("");

    try {
      const adminPassword = await getAdminPassword();

      if (password === adminPassword) {
        setShowPasswordModal(false);
        setPassword("");
        
        if (actionType === "edit") {
          handleEdit();
        } else if (actionType === "delete") {
          handleDelete();
        }
      } else {
        setPasswordError("Incorrect password");
      }
    } catch (error) {
      console.error("Error verifying password:", error);
      setPasswordError("Failed to verify password. Please try again.");
    } finally {
      setVerifyingPassword(false);
    }
  };

  const handleEdit = () => {
    if (onEditRequest && registrationData) {
      onEditRequest(registrationData);
      setShowModal(false);
    }
  };

  const handleDelete = async () => {
    if (!registrationData) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete the registration for ${registrationData.name}? This action cannot be undone.`
    );

    if (!confirmDelete) return;

    setLoading(true);

    try {
      await deleteRegistration(registrationData.id);
      alert("Registration deleted successfully!");
      setShowModal(false);
      setRegistrationData(null);
      setSpectatorData(null);
      setPhoneNumber("");
    } catch (error) {
      console.error("Error deleting registration:", error);
      alert("Failed to delete registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      {/* Floating Check Button */}
      <motion.button
        onClick={() => setShowModal(true)}
        className="fixed bottom-4 left-4 sm:bottom-8 sm:left-8 z-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 sm:px-6 sm:py-4 rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all flex items-center gap-2 font-semibold text-sm sm:text-base"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <span className="hidden sm:inline">Check Registration</span>
        <span className="sm:hidden">Check</span>
      </motion.button>

      {/* Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[120] flex items-center justify-center p-4"
            onClick={() => !verifyingPassword && setShowPasswordModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Admin Verification</h3>
                  <p className="text-sm text-gray-600">Enter admin password to {actionType}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError("");
                    }}
                    onKeyPress={(e) => e.key === 'Enter' && verifyPassword()}
                    placeholder="Enter admin password"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                      passwordError ? "border-red-500 bg-red-50" : "border-gray-300"
                    }`}
                    disabled={verifyingPassword}
                    autoFocus
                  />
                  {passwordError && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-2 flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {passwordError}
                    </motion.p>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      setShowPasswordModal(false);
                      setPassword("");
                      setPasswordError("");
                    }}
                    disabled={verifyingPassword}
                    className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={verifyPassword}
                    disabled={verifyingPassword || !password}
                    className="flex-1 bg-gradient-to-r from-orange-600 to-orange-700 text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                  >
                    {verifyingPassword ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Verifying...
                      </span>
                    ) : (
                      "Verify"
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={() => !loading && !processingPayment && setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4"
            >
              <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 sm:p-6 rounded-t-2xl flex justify-between items-center z-10">
                <h2 className="text-lg sm:text-2xl font-bold">Check Registration Status</h2>
                <button
                  onClick={() => !loading && !processingPayment && setShowModal(false)}
                  className="text-white hover:bg-white/20 rounded-full p-1.5 sm:p-2 transition-colors"
                  disabled={loading || processingPayment}
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-4 sm:p-6">
                {!registrationData && !spectatorData ? (
                  <div className="space-y-4 sm:space-y-6">
                    <p className="text-sm sm:text-base text-gray-600">Enter your registered phone number to check your registration or spectator ticket status</p>
                    
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Country Code
                        </label>
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          disabled={loading}
                        >
                          {countryCodes.map((cc) => (
                            <option key={cc.code} value={cc.code}>
                              {cc.code} ({cc.country})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            setPhoneNumber(value);
                            setError("");
                          }}
                          placeholder="Enter phone number"
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          disabled={loading}
                        />
                      </div>
                    </div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg"
                      >
                        {error}
                      </motion.div>
                    )}

                    <button
                      onClick={handleCheck}
                      disabled={loading || !phoneNumber}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Checking...
                        </span>
                      ) : (
                        "Check Status"
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Participant Registration Section */}
                    {registrationData && (
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-800">Participant Registration</h3>
                          </div>
                          <span
                            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-bold text-xs sm:text-sm w-fit ${
                              registrationData.paymentStatus === "paid"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {registrationData.paymentStatus === "paid" ? "✓ PAID" : "⏳ PENDING"}
                          </span>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-4 sm:p-5 space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div>
                              <p className="text-xs sm:text-sm text-gray-600">Name</p>
                              <p className="font-semibold text-sm sm:text-base text-gray-900">{registrationData.name}</p>
                            </div>
                            <div>
                              <p className="text-xs sm:text-sm text-gray-600">Email</p>
                              <p className="font-semibold text-sm sm:text-base text-gray-900 break-all">{registrationData.email}</p>
                            </div>
                            <div>
                              <p className="text-xs sm:text-sm text-gray-600">Phone</p>
                              <p className="font-semibold text-sm sm:text-base text-gray-900">
                                {registrationData.countryCode} {registrationData.contact}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs sm:text-sm text-gray-600">Category</p>
                              <p className="font-semibold text-sm sm:text-base text-gray-900">{registrationData.category}</p>
                            </div>
                            <div>
                              <p className="text-xs sm:text-sm text-gray-600">Events</p>
                              <p className="font-semibold text-sm sm:text-base text-gray-900">{registrationData.selectedEvents?.length || 0} events</p>
                            </div>
                            <div>
                              <p className="text-xs sm:text-sm text-gray-600">Amount</p>
                              <p className="font-semibold text-sm sm:text-base text-gray-900">
                                {registrationData.currency === "INR" ? "₹" : "$"}
                                {registrationData.totalCost}
                              </p>
                            </div>
                            <div className="sm:col-span-2">
                              <p className="text-xs sm:text-sm text-gray-600">Registered On</p>
                              <p className="font-semibold text-sm sm:text-base text-gray-900">{formatDate(registrationData.createdAt)}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                          {registrationData.paymentStatus === "pending" && (
                            <button
                              onClick={handlePayNow}
                              disabled={processingPayment}
                              className="w-full sm:flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                            >
                              {processingPayment ? (
                                <span className="flex items-center justify-center gap-2">
                                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                  </svg>
                                  Processing...
                                </span>
                              ) : (
                                `Pay Now via Razorpay (${registrationData.currency})`
                              )}
                            </button>
                          )}
                          
                          <button
                            onClick={handleEditClick}
                            disabled={processingPayment || registrationData.paymentStatus === "paid"}
                            className="w-full sm:flex-1 bg-gradient-to-r from-orange-600 to-orange-700 text-white py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Edit Details
                          </button>

                          <button
                            onClick={handleDeleteClick}
                            disabled={processingPayment || registrationData.paymentStatus === "paid"}
                            className="w-full sm:flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Delete Entry
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Spectator Tickets Section */}
                    {spectatorData && spectatorData.length > 0 && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-t-2 border-gray-200 pt-4">
                          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                          </svg>
                          <h3 className="text-lg sm:text-xl font-bold text-gray-800">Spectator Tickets</h3>
                          <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 font-bold text-xs">
                            {spectatorData.length} ticket{spectatorData.length > 1 ? 's' : ''}
                          </span>
                        </div>

                        {spectatorData.map((ticket, index) => (
                          <div key={ticket.id} className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-4 sm:p-5 space-y-3 border-2 border-purple-200">
                            <div className="flex justify-between items-start">
                              <span className="text-xs font-bold text-purple-600">TICKET #{index + 1}</span>
                              <span
                                className={`px-3 py-1 rounded-full font-bold text-xs ${
                                  ticket.payment_status === "paid"
                                    ? "bg-green-100 text-green-800"
                                    : ticket.is_complimentary
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {ticket.payment_status === "paid" ? "✓ PAID" : ticket.is_complimentary ? "🎁 FREE" : "⏳ PENDING"}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <p className="text-xs text-gray-600">Name</p>
                                <p className="font-semibold text-sm text-gray-900">{ticket.name}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-600">Email</p>
                                <p className="font-semibold text-sm text-gray-900 break-all">{ticket.email}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-600">Quantity</p>
                                <p className="font-semibold text-sm text-gray-900">{ticket.ticket_quantity} ticket{ticket.ticket_quantity > 1 ? 's' : ''}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-600">Amount</p>
                                <p className="font-semibold text-sm text-gray-900">
                                  {ticket.is_complimentary ? "FREE" : `${ticket.currency === "INR" ? "₹" : "$"}${ticket.total_amount}`}
                                </p>
                              </div>
                              {ticket.is_complimentary && ticket.benefit_reason && (
                                <div className="sm:col-span-2">
                                  <p className="text-xs text-gray-600">Reason</p>
                                  <p className="font-semibold text-sm text-gray-900">{ticket.benefit_reason}</p>
                                </div>
                              )}
                              <div className="sm:col-span-2">
                                <p className="text-xs text-gray-600">Purchased On</p>
                                <p className="font-semibold text-sm text-gray-900">{formatDate(ticket.created_at)}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <button
                      onClick={() => {
                        setRegistrationData(null);
                        setSpectatorData(null);
                        setPhoneNumber("");
                        setError("");
                      }}
                      className="w-full text-blue-600 hover:text-blue-700 font-semibold py-2 text-sm sm:text-base"
                    >
                      ← Check Another Number
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}