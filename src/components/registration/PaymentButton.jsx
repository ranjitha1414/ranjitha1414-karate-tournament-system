/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  createRegistration, 
  createSpectatorTicket,
  updateRegistrationPaymentStatus 
} from "../../services/supabaseService";
import { API_BASE_URL, RAZORPAY_KEY_ID } from "../../constants/registrationConstants";

const PaymentButton = ({ 
  amount, 
  currency, 
  customerData, 
  registrationData,
  registrationType,
  disabled = false,
  buttonText = "Proceed to Payment",
  onSuccess,
  onError
}) => {
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [countdown, setCountdown] = useState(5);

  React.useEffect(() => {
    if (paymentStatus === "success" && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (paymentStatus === "success" && countdown === 0) {
      if (onSuccess) onSuccess();
      setPaymentStatus(null);
    }
  }, [paymentStatus, countdown, onSuccess]);

  const handlePayment = async () => {
    try {
      setLoading(true);

      // Use Razorpay for both INR and international payments
      const { data } = await axios.post(`${API_BASE_URL}/create-order`, {
        amount: amount,
        currency: currency, // Can be INR, USD, EUR, etc.
      });

      if (!data.id) throw new Error("Failed to create order");

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "IWKA 2026",
        description: registrationType === "spectator" 
          ? "Spectator Ticket" 
          : registrationType === "shopping" 
            ? "Merchandise Purchase" 
            : "Tournament Registration",
        order_id: data.id,
        handler: async (response) => {
          try {
            // Verify payment with backend
            const verifyResponse = await axios.post(`${API_BASE_URL}/verify-payment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              customerEmail: customerData.email,
              customerName: customerData.name,
              amount: data.amount,
              currency: currency,
              registrationData,
              registrationType,
            });

            if (!verifyResponse.data.success) {
              throw new Error("Payment verification failed");
            }

            // Save to Supabase based on registration type
            let savedRecord;
            
            if (registrationType === "spectator") {
              // Save spectator ticket
              const ticketData = {
                name: customerData.name,
                email: customerData.email,
                age: customerData.age,
                contact: customerData.contact,
                whatsappNumber: customerData.whatsappNumber,
                ticketQuantity: registrationData.ticketQuantity,
                ticketType: registrationData.ticketType || 'Spectator - Regular',
                isComplimentary: registrationData.isComplimentary || false,
                benefitReason: registrationData.benefitReason || null,
                currency: currency,
                basePrice: registrationData.basePrice,
                tax: registrationData.tax,
                totalAmount: amount,
                paymentStatus: 'paid',
                paymentMethod: 'razorpay',
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                participantRegistrationId: registrationData.participantRegistrationId || null,
                participantName: registrationData.participantName || null,
                participantEmail: registrationData.participantEmail || null,
                emailSent: verifyResponse.data.emailSent || false,
              };
              savedRecord = await createSpectatorTicket(ticketData);
            } 
            else if (registrationType === "shopping") {
              // For shopping orders, you'll need to create a similar service function
              // For now, we'll use a generic approach
              console.log("Shopping order payment successful:", {
                customerData,
                registrationData,
                paymentDetails: {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                }
              });
              // TODO: Implement createShoppingOrder in supabaseService.js
              savedRecord = { id: 'shopping-' + response.razorpay_payment_id };
            } 
            else {
              // Save participant registration
              const registrationPayload = {
                name: customerData.name,
                email: customerData.email,
                sex: customerData.sex,
                age: customerData.age,
                countryCode: customerData.countryCode,
                contact: customerData.contact,
                whatsappCountryCode: customerData.whatsappCountryCode,
                whatsappNumber: customerData.whatsappNumber,
                addressLine1: customerData.addressLine1,
                addressLine2: customerData.addressLine2,
                postalCode: customerData.postalCode,
                country: customerData.country,
                address: customerData.address,
                height: customerData.height,
                heightUnit: customerData.heightUnit,
                weight: customerData.weight,
                weightUnit: customerData.weightUnit,
                dojoName: customerData.dojoName,
                masterName: customerData.masterName,
                belt: customerData.belt,
                category: registrationData.category,
                ailment: customerData.ailment,
                selectedEvents: registrationData.selectedEvents,
                currency: currency,
                basePrice: registrationData.basePrice,
                discountPercentage: registrationData.discountPercentage || 0,
                discountAmount: registrationData.discountAmount || 0,
                discountLabel: registrationData.discountLabel || null,
                subtotal: registrationData.subtotal,
                gst: registrationData.gst,
                totalCost: amount,
                paymentStatus: 'paid',
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
              };
              savedRecord = await createRegistration(registrationPayload);
            }

            console.log("Record saved to Supabase:", savedRecord);

            setLoading(false);
            setPaymentStatus("success");
            setCountdown(5);
          } catch (error) {
            console.error("Error in payment handler:", error);
            setLoading(false);
            if (onError) onError(error);
            alert(
              "Payment successful but registration failed to save. Please contact support with payment ID: " + 
              response.razorpay_payment_id
            );
          }
        },
        prefill: { 
          name: customerData.name, 
          email: customerData.email, 
          contact: customerData.contact 
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
      rzp.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);
        setLoading(false);
        setPaymentStatus("failed");
        if (onError) onError(response.error);
      });
      rzp.open();
      
    } catch (err) {
      console.error("Payment initialization error:", err);
      setLoading(false);
      setPaymentStatus("failed");
      if (onError) onError(err);
      alert("Failed to initialize payment. Please try again.");
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {paymentStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              className="bg-white rounded-3xl p-12 max-w-md mx-4 text-center shadow-2xl"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center"
              >
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Payment Successful!</h3>
              <p className="text-gray-600 mb-6">
                Thank you for your {registrationType === "spectator" ? "ticket purchase" : registrationType === "shopping" ? "merchandise order" : "registration"}. 
                A confirmation email has been sent.
              </p>
              <div className="text-sm text-gray-500">
                Redirecting in {countdown} seconds...
              </div>
            </motion.div>
          </motion.div>
        )}

        {paymentStatus === "failed" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              className="bg-white rounded-3xl p-12 max-w-md mx-4 text-center shadow-2xl"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center"
              >
                <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Payment Failed</h3>
              <p className="text-gray-600 mb-8">
                Your payment could not be processed. Please try again.
              </p>
              <button
                onClick={() => setPaymentStatus(null)}
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Try Again
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {loading && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4"
          >
            <svg
              className="animate-spin h-12 w-12 text-red-600"
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
            <p className="text-gray-700 font-medium">Processing Payment...</p>
          </motion.div>
        </div>
      )}

      <motion.button
        type="button"
        disabled={disabled || loading}
        onClick={handlePayment}
        whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
        className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : (
          <>
            {buttonText}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </>
        )}
      </motion.button>
    </>
  );
};

export default PaymentButton;