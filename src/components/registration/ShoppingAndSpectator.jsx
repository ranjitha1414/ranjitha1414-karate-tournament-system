/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Ticket, Target, Video, UtensilsCrossed, Gift, Sparkles, Lock, Mail, Smartphone, ArrowRight, TicketCheck, X, User, Phone, MessageCircle, CheckCircle, XCircle, Loader, AlertTriangle } from "lucide-react";
import { createSpectatorTicket, checkSeatAvailability, getCurrentSeatStatus, getSpectatorSettings } from "../../services/supabaseService";
import { RAZORPAY_KEY_ID } from "../../constants/registrationConstants";
import { INR_TO_USD, TAX_RATES } from "../../constants/registrationConstants";
import { countryCodes } from "../../constants/registrationConstants";
import { API_BASE_URL } from "../../constants/registrationConstants";

const TAX_RATE = TAX_RATES["INR"].rate;

// Seat Unavailable Component
const SeatUnavailable = ({ availableSeats, requestedSeats, onClose }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
  >
    <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
      <div className="w-20 h-20 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4">
        <AlertTriangle className="w-12 h-12 text-orange-600" />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">
        {availableSeats === 0 ? 'Tickets Full!' : 'Limited Seats Available'}
      </h3>
      <p className="text-gray-600 mb-4">
        {availableSeats === 0 
          ? 'Sorry, all spectator tickets have been sold out.' 
          : `Only ${availableSeats} ticket${availableSeats === 1 ? '' : 's'} available. You requested ${requestedSeats}.`}
      </p>
      {availableSeats > 0 && (
        <p className="text-sm text-gray-500 mb-6">
          Please adjust the number of tickets and try again.
        </p>
      )}
      <button
        onClick={onClose}
        className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
      >
        {availableSeats === 0 ? 'Close' : 'Adjust Tickets'}
      </button>
    </div>
  </motion.div>
);

// Payment Success Component
const PaymentSuccess = ({ countdown, onClose }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
  >
    <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
      <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
        <CheckCircle className="w-12 h-12 text-green-600" />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h3>
      <p className="text-gray-600 mb-6">Your ticket booking has been confirmed. Check your email for details.</p>
      <div className="text-sm text-gray-500">Redirecting in {countdown} seconds...</div>
      <button
        onClick={onClose}
        className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        Close
      </button>
    </div>
  </motion.div>
);

// Payment Failed Component
const PaymentFailed = ({ onRetry, onClose }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
  >
    <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
      <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
        <XCircle className="w-12 h-12 text-red-600" />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">Payment Failed</h3>
      <p className="text-gray-600 mb-6">Something went wrong with your payment. Please try again.</p>
      <div className="flex gap-3 justify-center">
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  </motion.div>
);

// Loading Overlay Component
const LoadingOverlay = ({ message = "Processing Payment..." }) => (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
    <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 shadow-2xl">
      <Loader className="w-12 h-12 text-red-600 animate-spin" />
      <p className="text-gray-700 font-semibold">{message}</p>
    </div>
  </div>
);

const useRegion = () => ({ region: 'india' });

const KarateTournamentHub = () => {
  const { region } = useRegion();
  const [showTickets, setShowTickets] = useState(false);
  const [seatStatus, setSeatStatus] = useState(null);
  const [spectatorSettings, setSpectatorSettings] = useState(null);
  const formRef = useRef(null);

  const getCurrency = () => region === "india" ? "INR" : "USD";
  
  const convertPrice = (priceINR) => {
    if (getCurrency() === "USD") {
      return Math.ceil(priceINR * INR_TO_USD);
    }
    return priceINR;
  };

  const currencySymbol = getCurrency() === "INR" ? "₹" : "$";

  const benefits = [
    { icon: Target, title: "Premium Seating", description: "Best views of competition" },
    { icon: Video, title: "Live Commentary", description: "Expert analysis included" },
    { icon: UtensilsCrossed, title: "Food & Beverages", description: "Complimentary food and refreshments" },
    { icon: Gift, title: "Exclusive Store", description: "Special tournament merchandise" },
  ];

  // Fetch seat status and spectator settings on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [status, settings] = await Promise.all([
          getCurrentSeatStatus(),
          getSpectatorSettings()
        ]);
        setSeatStatus(status);
        setSpectatorSettings(settings);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleBookClick = () => {
    setShowTickets(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-5 w-48 h-48 bg-red-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-5 w-64 h-64 bg-orange-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 border border-red-100"
        >
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg mb-4">
              <Ticket className="w-8 h-8 text-white" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Spectator Tickets
            </h2>
            <p className="text-sm md:text-base text-gray-600 mb-4">
              Experience the <span className="font-semibold text-red-600">IWKA 2026</span> live
            </p>
            
            {/* Seat Availability Display */}
            {seatStatus && (
              <div className="mb-4">
                {seatStatus.seatsAvailable > 0 ? (
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-lg border border-green-300">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">
                      {seatStatus.seatsAvailable} seats available
                    </span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-50 to-orange-50 px-4 py-2 rounded-lg border border-red-300">
                    <XCircle className="w-4 h-4 text-red-600" />
                    <span className="text-sm font-medium text-red-800">
                      Tickets Sold Out
                    </span>
                  </div>
                )}
              </div>
            )}
            
            {spectatorSettings && (
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 px-5 py-2.5 rounded-lg border border-green-300 shadow-md">
                <div className="text-left">
                  <div className="text-xs text-green-700 font-medium">Starting from</div>
                  <div className="text-xl font-black text-green-900">
                    {currencySymbol}{convertPrice(spectatorSettings.price)}
                  </div>
                </div>
                <TicketCheck className="w-6 h-6 text-green-700" />
              </div>
            )}
          </div>

          <div className="mb-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 text-center flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              What's Included
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className="bg-gradient-to-br from-gray-50 to-red-50 p-3 md:p-4 rounded-lg border border-gray-200 hover:border-red-300 hover:shadow-md transition-all"
                  >
                    <IconComponent className="w-8 h-8 md:w-10 md:h-10 mb-1.5 text-red-600" />
                    <h4 className="font-bold text-gray-800 text-xs md:text-sm mb-1">{benefit.title}</h4>
                    <p className="text-[10px] md:text-xs text-gray-600">{benefit.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {!showTickets && (
            <motion.button
              onClick={handleBookClick}
              disabled={seatStatus && seatStatus.seatsAvailable === 0}
              whileHover={{ scale: seatStatus && seatStatus.seatsAvailable > 0 ? 1.02 : 1 }}
              whileTap={{ scale: seatStatus && seatStatus.seatsAvailable > 0 ? 0.98 : 1 }}
              className={`w-full py-3.5 md:py-4 rounded-xl font-bold text-base md:text-lg shadow-lg transition-all mb-4 ${
                seatStatus && seatStatus.seatsAvailable === 0
                  ? 'bg-gray-400 cursor-not-allowed text-gray-600'
                  : 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white hover:shadow-xl'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <Ticket className="w-5 h-5" />
                {seatStatus && seatStatus.seatsAvailable === 0 ? 'Tickets Sold Out' : 'Book Your Tickets Now'}
                {seatStatus && seatStatus.seatsAvailable > 0 && <ArrowRight className="w-5 h-5" />}
              </span>
            </motion.button>
          )}

          {showTickets && spectatorSettings && (
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.4 }}
              className="border-t border-gray-200 pt-6 mt-2"
            >
              <SpectatorTicket 
                region={region} 
                onClose={() => setShowTickets(false)}
                onSeatStatusUpdate={setSeatStatus}
                spectatorSettings={spectatorSettings}
              />
            </motion.div>
          )}

          {!showTickets && (
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-5 text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>Instant Confirmation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-purple-600 flex-shrink-0" />
                <span>Mobile Tickets</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.15; }
        }

        .animate-pulse {
          animation: pulse 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

const SpectatorTicket = ({ region = 'india', onClose, onSeatStatusUpdate, spectatorSettings }) => {
  const [spectatorForm, setSpectatorForm] = useState({
    name: "",
    age: "",
    email: "",
    countryCode: region === 'india' ? "+91" : "+1",
    contact: "",
    whatsappCountryCode: region === 'india' ? "+91" : "+1",
    whatsappNumber: "",
    ticketQuantity: 1,
  });
  const [spectatorErrors, setSpectatorErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [countdown, setCountdown] = useState(5);
  const [seatAvailability, setSeatAvailability] = useState(null);

  const spectatorPrice = spectatorSettings?.price || 200;

  const getCurrency = () => region === "india" ? "INR" : "USD";
  
  const convertPrice = (priceINR) => {
    if (getCurrency() === "USD") {
      return Math.ceil(priceINR * INR_TO_USD);
    }
    return priceINR;
  };

  const getPhoneLength = (countryCode) => {
    const country = countryCodes.find((c) => c.code === countryCode);
    return country ? country.phoneLength : 10;
  };

  const getPhoneFormatHint = (countryCode) => {
    const country = countryCodes.find((c) => c.code === countryCode);
    return country ? country.format : "";
  };

  const handleSpectatorChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "contact" || name === "whatsappNumber") {
      const maxLength = getPhoneLength(name === "contact" ? spectatorForm.countryCode : spectatorForm.whatsappCountryCode);
      const digitsOnly = value.replace(/\D/g, "").slice(0, maxLength);
      setSpectatorForm({ ...spectatorForm, [name]: digitsOnly });
      setSpectatorErrors({ ...spectatorErrors, [name]: "" });
      return;
    }
    
    setSpectatorForm({ ...spectatorForm, [name]: value });
    if (spectatorErrors[name]) setSpectatorErrors({ ...spectatorErrors, [name]: "" });
  };

  const isSpectatorFormValid = () => {
    const age = parseInt(spectatorForm.age);
    return (
      spectatorForm.name &&
      spectatorForm.email &&
      /\S+@\S+\.\S+/.test(spectatorForm.email) &&
      age >= 1 && age <= 120 &&
      spectatorForm.contact.length === getPhoneLength(spectatorForm.countryCode) &&
      spectatorForm.whatsappNumber.length === getPhoneLength(spectatorForm.whatsappCountryCode) &&
      spectatorForm.ticketQuantity >= 1 && spectatorForm.ticketQuantity <= 10
    );
  };

  const currencySymbol = getCurrency() === "INR" ? "₹" : "$";
  const basePrice = convertPrice(spectatorPrice * spectatorForm.ticketQuantity);
  const taxAmount = Math.round(basePrice * TAX_RATE);
  const spectatorTotal = basePrice + taxAmount;

  useEffect(() => {
    if (paymentStatus === "success" && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (paymentStatus === "success" && countdown === 0) {
      handleSuccessClose();
    }
  }, [paymentStatus, countdown]);

  const handleSuccessClose = () => {
    setSpectatorForm({
      name: "",
      age: "",
      email: "",
      countryCode: region === 'india' ? "+91" : "+1",
      contact: "",
      whatsappCountryCode: region === 'india' ? "+91" : "+1",
      whatsappNumber: "",
      ticketQuantity: 1,
    });
    setSpectatorErrors({});
    setPaymentStatus(null);
    setCountdown(5);
    if (onClose) onClose();
  };

  const handlePayment = async () => {
    if (!isSpectatorFormValid()) {
      alert("Please fill all required fields correctly");
      return;
    }

    try {
      // STEP 1: Check seat availability BEFORE payment
      setLoading(true);
      
      const availabilityCheck = await checkSeatAvailability(spectatorForm.ticketQuantity);
      
      if (!availabilityCheck.available) {
        setLoading(false);
        setSeatAvailability({
          available: false,
          seatsAvailable: availabilityCheck.seatsAvailable,
          requestedSeats: spectatorForm.ticketQuantity,
        });
        
        // Update parent component's seat status
        if (onSeatStatusUpdate) {
          const currentStatus = await getCurrentSeatStatus();
          onSeatStatusUpdate(currentStatus);
        }
        return; // Stop here if seats unavailable
      }

      // STEP 2: Proceed with Razorpay payment
      const currency = getCurrency();
      const response = await fetch(`${API_BASE_URL}/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: spectatorTotal, currency }),
      });

      const data = await response.json();
      if (!data.id) throw new Error("Failed to create order");

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "IWKA 2026",
        description: "Spectator Ticket Booking",
        order_id: data.id,
        handler: async (paymentResponse) => {
          try {
            // STEP 3: Double-check availability before finalizing
            const finalCheck = await checkSeatAvailability(spectatorForm.ticketQuantity);
            
            if (!finalCheck.available) {
              setLoading(false);
              alert(`Sorry, seats are no longer available. Only ${finalCheck.seatsAvailable} seats remaining.`);
              return;
            }

            // Verify payment
            const verifyResponse = await fetch(`${API_BASE_URL}/verify-payment`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_signature: paymentResponse.razorpay_signature,
                customerEmail: spectatorForm.email,
                customerName: spectatorForm.name,
                amount: data.amount,
                currency,
                isSpectator: true,
                ticketCount: spectatorForm.ticketQuantity,
              }),
            });

            const verifyData = await verifyResponse.json();
            if (!verifyData.success) throw new Error("Payment verification failed");

            // Save to database (triggers will update seat count)
            const ticketData = {
              name: spectatorForm.name,
              age: parseInt(spectatorForm.age),
              email: spectatorForm.email,
              contact: `${spectatorForm.countryCode}${spectatorForm.contact}`,
              whatsappNumber: `${spectatorForm.whatsappCountryCode}${spectatorForm.whatsappNumber}`,
              ticketQuantity: spectatorForm.ticketQuantity,
              ticketType: "Spectator - Regular",
              basePrice: basePrice,
              tax: taxAmount,
              totalAmount: spectatorTotal,
              currency,
              paymentStatus: "paid",
              paymentMethod: "razorpay",
              razorpay_order_id: paymentResponse.razorpay_order_id,
              razorpay_payment_id: paymentResponse.razorpay_payment_id,
              isComplimentary: false,
              emailSent: verifyData.emailSent || false,
            };

            await createSpectatorTicket(ticketData);
            console.log("Spectator ticket saved successfully");
            
            // Update seat display
            if (onSeatStatusUpdate) {
              const updatedStatus = await getCurrentSeatStatus();
              onSeatStatusUpdate(updatedStatus);
            }

            setLoading(false);
            setPaymentStatus("success");
          } catch (error) {
            console.error("Payment verification error:", error);
            setLoading(false);
            setPaymentStatus("failed");
            alert("Payment successful but registration failed. Please contact support with payment ID: " + paymentResponse.razorpay_payment_id);
          }
        },
        prefill: {
          name: spectatorForm.name,
          email: spectatorForm.email,
          contact: spectatorForm.countryCode + spectatorForm.contact,
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
      rzp.on("payment.failed", () => {
        setLoading(false);
        setPaymentStatus("failed");
      });
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      setLoading(false);
      setPaymentStatus("failed");
    }
  };

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingOverlay message="Checking seat availability..." />}
        {seatAvailability && !seatAvailability.available && (
          <SeatUnavailable
            availableSeats={seatAvailability.seatsAvailable}
            requestedSeats={seatAvailability.requestedSeats}
            onClose={() => setSeatAvailability(null)}
          />
        )}
        {paymentStatus === "success" && (
          <PaymentSuccess countdown={countdown} onClose={handleSuccessClose} />
        )}
        {paymentStatus === "failed" && (
          <PaymentFailed 
            onRetry={() => setPaymentStatus(null)} 
            onClose={() => setPaymentStatus(null)}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-4 md:space-y-5"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-white to-gray-50 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-md border border-gray-200"
        >
          <h3 className="text-base md:text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <TicketCheck className="w-5 h-5 text-purple-600" />
            Select Tickets
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                Number of Tickets
              </label>
              <input
                type="number"
                name="ticketQuantity"
                value={spectatorForm.ticketQuantity}
                onChange={handleSpectatorChange}
                min="1"
                max="10"
                className="w-full px-4 py-2.5 md:py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base md:text-lg font-semibold transition-all"
              />
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-4 border-2 border-purple-200">
              <div className="space-y-2">
                <div className="flex justify-between text-xs md:text-sm text-gray-600">
                  <span>Per ticket:</span>
                  <span className="font-bold text-gray-800">{currencySymbol}{convertPrice(spectatorPrice)}</span>
                </div>
                <div className="flex justify-between text-xs md:text-sm text-gray-600">
                  <span>Subtotal:</span>
                  <span className="font-bold text-gray-800">{currencySymbol}{basePrice}</span>
                </div>
                <div className="flex justify-between text-xs md:text-sm text-gray-600">
                  <span>Tax (18%):</span>
                  <span className="font-bold text-gray-800">{currencySymbol}{taxAmount}</span>
                </div>
                <div className="border-t-2 border-purple-300 pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm md:text-base text-gray-800">Total:</span>
                    <span className="text-xl md:text-2xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{currencySymbol}{spectatorTotal}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-white to-gray-50 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-md border border-gray-200"
        >
          <h3 className="text-base md:text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            Personal Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={spectatorForm.name}
                onChange={handleSpectatorChange}
                className="w-full px-4 py-2.5 md:py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base transition-all"
                placeholder="Enter your name"
              />
              {spectatorErrors.name && <p className="text-red-500 text-xs mt-1">{spectatorErrors.name}</p>}
            </div>
            
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                Age <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="age"
                value={spectatorForm.age}
                onChange={handleSpectatorChange}
                className="w-full px-4 py-2.5 md:py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base transition-all"
                placeholder="Enter your age"
              />
              {spectatorErrors.age && <p className="text-red-500 text-xs mt-1">{spectatorErrors.age}</p>}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-white to-gray-50 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-md border border-gray-200"
        >
          <h3 className="text-base md:text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Phone className="w-5 h-5 text-green-600" />
            Contact Information
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2 flex items-center gap-1.5">
                <Mail className="w-4 h-4" />
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={spectatorForm.email}
                onChange={handleSpectatorChange}
                className="w-full px-4 py-2.5 md:py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base transition-all"
                placeholder="your@email.com"
              />
              {spectatorErrors.email && <p className="text-red-500 text-xs mt-1">{spectatorErrors.email}</p>}
            </div>

            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2 flex items-center gap-1.5">
                <Smartphone className="w-4 h-4" />
                Mobile <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <select
                  value={spectatorForm.countryCode}
                  onChange={(e) => handleSpectatorChange({ target: { name: 'countryCode', value: e.target.value }})}
                  className="w-24 md:w-32 px-3 py-2.5 md:py-3 border-2 border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-green-500 text-xs md:text-sm transition-all"
                >
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.code}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  name="contact"
                  value={spectatorForm.contact}
                  onChange={handleSpectatorChange}
                  maxLength={getPhoneLength(spectatorForm.countryCode)}
                  className="flex-1 px-4 py-2.5 md:py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base transition-all"
                  placeholder={getPhoneFormatHint(spectatorForm.countryCode)}
                />
              </div>
              {spectatorErrors.contact && <p className="text-red-500 text-xs mt-1">{spectatorErrors.contact}</p>}
            </div>

            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2 flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4" />
                WhatsApp <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <select
                  value={spectatorForm.whatsappCountryCode}
                  onChange={(e) => handleSpectatorChange({ target: { name: 'whatsappCountryCode', value: e.target.value }})}
                  className="w-24 md:w-32 px-3 py-2.5 md:py-3 border-2 border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-green-500 text-xs md:text-sm transition-all"
                >
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.code}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  name="whatsappNumber"
                  value={spectatorForm.whatsappNumber}
                  onChange={handleSpectatorChange}
                  maxLength={getPhoneLength(spectatorForm.whatsappCountryCode)}
                  className="flex-1 px-4 py-2.5 md:py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base transition-all"
                  placeholder={getPhoneFormatHint(spectatorForm.whatsappCountryCode)}
                />
              </div>
              {spectatorErrors.whatsappNumber && <p className="text-red-500 text-xs mt-1">{spectatorErrors.whatsappNumber}</p>}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="pt-2"
        >
          <button
            onClick={handlePayment}
            disabled={!isSpectatorFormValid() || loading}
            className={`w-full py-3.5 md:py-4 px-6 rounded-xl font-bold text-base md:text-lg transition-all flex items-center justify-center gap-2 ${
              !isSpectatorFormValid() || loading
                ? 'bg-gray-400 cursor-not-allowed text-gray-600'
                : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
            }`}
          >
            <Ticket className="w-5 h-5" />
            Buy {spectatorForm.ticketQuantity} {spectatorForm.ticketQuantity === 1 ? 'Ticket' : 'Tickets'} - {currencySymbol}{spectatorTotal}
          </button>
          
          <p className="text-center text-gray-500 text-xs mt-3 flex items-center justify-center gap-2">
            <Lock className="w-4 h-4 text-green-600" />
            Secure payment powered by Razorpay
          </p>
        </motion.div>
      </motion.div>
    </>
  );
};

export default KarateTournamentHub;