/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Phone, Mail, Check, Clock, Calendar, Search, Edit3, X, Users, Ticket, Send, Loader2, CheckCircle2, Circle
} from "lucide-react";

export default function SpectatorTable({ 
  spectators,
  onUpdatePaymentStatus,
  onResendEmail,
  onUpdateCheckIn
}) {
  const [editingSpectatorId, setEditingSpectatorId] = useState(null);
  const [confirmChange, setConfirmChange] = useState(false);
  const [resendingEmailId, setResendingEmailId] = useState(null);
  const [updatingCheckIn, setUpdatingCheckIn] = useState(null);

  const handleUpdatePayment = async (spectator) => {
    if (!confirmChange) {
      alert("Please confirm that you want to make this change");
      return;
    }

    try {
      const updatedData = {
        paymentStatus: "paid",
        razorpay_payment_id: "cash"
      };

      console.log("Updating spectator payment with data:", updatedData);
      
      if (onUpdatePaymentStatus) {
        await onUpdatePaymentStatus(spectator.id, updatedData);
        setEditingSpectatorId(null);
        setConfirmChange(false);
      } else {
        console.error("onUpdatePaymentStatus function not provided");
        alert("Error: Update function not available");
      }
    } catch (error) {
      console.error("Error updating spectator payment:", error);
      alert("Failed to update payment: " + error.message);
    }
  };

  const handleResendEmail = async (spectator) => {
    if (!onResendEmail) {
      alert("Resend email function not available");
      return;
    }

    try {
      setResendingEmailId(spectator.id);
      await onResendEmail(spectator);
      alert("Email sent successfully!");
    } catch (error) {
      console.error("Error resending email:", error);
      alert("Failed to send email: " + error.message);
    } finally {
      setResendingEmailId(null);
    }
  };

  const handleCheckInToggle = async (spectator) => {
    if (!onUpdateCheckIn) {
      alert("Check-in function not available");
      return;
    }

    try {
      setUpdatingCheckIn(spectator.id);
      const newCheckInStatus = !spectator.check_in;
      await onUpdateCheckIn(spectator.id, { check_in: newCheckInStatus });
    } catch (error) {
      console.error("Error updating check-in status:", error);
      alert("Failed to update check-in: " + error.message);
    } finally {
      setUpdatingCheckIn(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-xl border border-white/10 overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="py-4 px-6 text-left text-xs font-bold text-gray-400 uppercase">#</th>
              <th className="py-4 px-6 text-left text-xs font-bold text-gray-400 uppercase">Check-in</th>
              <th className="py-4 px-6 text-left text-xs font-bold text-gray-400 uppercase">Order Id</th>
              <th className="py-4 px-6 text-left text-xs font-bold text-gray-400 uppercase">Payment Id</th>
              <th className="py-4 px-6 text-left text-xs font-bold text-gray-400 uppercase">Name</th>
              <th className="py-4 px-6 text-left text-xs font-bold text-gray-400 uppercase">Age</th>
              <th className="py-4 px-6 text-left text-xs font-bold text-gray-400 uppercase">Contact</th>
              <th className="py-4 px-6 text-left text-xs font-bold text-gray-400 uppercase">Email</th>
              <th className="py-4 px-6 text-left text-xs font-bold text-gray-400 uppercase">Email Sent</th>
              <th className="py-4 px-6 text-left text-xs font-bold text-gray-400 uppercase">Ticket Type</th>
              <th className="py-4 px-6 text-left text-xs font-bold text-gray-400 uppercase">Quantity</th>
              <th className="py-4 px-6 text-left text-xs font-bold text-gray-400 uppercase">Base Price</th>
              <th className="py-4 px-6 text-left text-xs font-bold text-gray-400 uppercase">Tax</th>
              <th className="py-4 px-6 text-left text-xs font-bold text-gray-400 uppercase">Total Amount</th>
              <th className="py-4 px-6 text-left text-xs font-bold text-gray-400 uppercase">Status</th>
              <th className="py-4 px-6 text-left text-xs font-bold text-gray-400 uppercase">Booked On</th>
              <th className="py-4 px-6 text-left text-xs font-bold text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {spectators.map((s, index) => {
              const isEditing = editingSpectatorId === s.id;
              const isResending = resendingEmailId === s.id;
              const isUpdatingCheckIn = updatingCheckIn === s.id;
              const totalAmount = s.totalAmount || 0;
              const ticketQuantity = s.ticketQuantity || 1;
              const basePrice = s.basePrice || 0;
              const tax = s.tax || 0;
              const isCheckedIn = s.check_in || false;
              
              return (
                <React.Fragment key={s.id}>
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-all"
                  >
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-white/5 rounded-lg text-gray-400 font-semibold text-sm">
                        {index + 1}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleCheckInToggle(s)}
                        disabled={isUpdatingCheckIn}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase transition-all ${
                          isCheckedIn
                            ? "bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30"
                            : "bg-gray-500/20 text-gray-400 border border-gray-500/30 hover:bg-gray-500/30"
                        } ${isUpdatingCheckIn ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                        title={isCheckedIn ? "Mark as not checked in" : "Mark as checked in"}
                      >
                        {isUpdatingCheckIn ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : isCheckedIn ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <Circle className="w-3.5 h-3.5" />
                        )}
                        {isCheckedIn ? "Checked In" : "Not Checked In"}
                      </button>
                    </td>
                     <td className="py-4 px-6">
                      <span className="text-gray-300">{s.razorpay_order_id || "-"}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-300">{s.razorpay_payment_id || "-"}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
                          {s.name?.charAt(0).toUpperCase() || "S"}
                        </div>
                        <span className="font-semibold text-white">{s.name || "-"}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-300">{s.age || "-"}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{s.contact || s.whatsappNumber || "-"}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{s.email || "-"}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase ${s.emailSent ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-amber-500/20 text-amber-400 border border-amber-500/30"}`}>
                        {s.emailSent ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            Sent
                          </>
                        ) : (
                          <>
                            <Clock className="w-3.5 h-3.5" />
                            Pending
                          </>
                        )}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 rounded-lg text-indigo-400 text-sm font-semibold">
                        <Ticket className="w-3.5 h-3.5" />
                        {s.ticketType || "Spectator"}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-400 text-sm font-semibold">
                          {ticketQuantity} {ticketQuantity === 1 ? 'Ticket' : 'Tickets'}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-bold text-white">
                        ₹{basePrice.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </span>
                      {ticketQuantity > 1 && (
                        <p className="text-xs text-gray-500 mt-1">
                          ₹{(basePrice / ticketQuantity).toLocaleString('en-IN', { maximumFractionDigits: 0 })} per ticket
                        </p>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-300">
                        ₹{tax.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-bold text-lg text-white">
                        ₹{totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase ${
                          s.paymentStatus === "paid" 
                            ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                            : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        }`}>
                          {s.paymentStatus === "paid" ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              Paid
                            </>
                          ) : (
                            <>
                              <Clock className="w-3.5 h-3.5" />
                              Pending
                            </>
                          )}
                        </span>
                        {s.paymentStatus !== "paid" && !isEditing && (
                          <button
                            onClick={() => setEditingSpectatorId(s.id)}
                            className="p-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all"
                            title="Update payment status"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-white" />
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">
                          {s.createdAt ? new Date(s.createdAt.toDate()).toLocaleDateString("en-IN", { 
                            day: '2-digit', 
                            month: 'short', 
                            year: 'numeric' 
                          }) : "-"}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {s.paymentStatus === "paid" ? (
                        <button
                          onClick={() => handleResendEmail(s)}
                          disabled={isResending}
                          className="p-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-all flex items-center gap-2"
                          title="Resend confirmation email"
                        >
                          {isResending ? (
                            <Loader2 className="w-4 h-4 text-white animate-spin" />
                          ) : (
                            <Send className="w-4 h-4 text-white" />
                          )}
                        </button>
                      ) : (
                        <span className="text-gray-500 text-xs">Payment pending</span>
                      )}
                    </td>
                  </motion.tr>
                  
                  {/* Payment Update Modal Row */}
                  <AnimatePresence>
                    {isEditing && (
                      <motion.tr
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <td colSpan="17" className="py-0 px-0">
                          <div className="bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border-y border-blue-500/30 p-6 mx-6">
                            <div className="max-w-2xl">
                              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <Edit3 className="w-5 h-5 text-blue-400" />
                                Update Payment Status for {s.name}
                              </h4>
                              
                              <div className="space-y-4 mb-4">
                                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <span className="text-gray-400">Ticket Type:</span>
                                      <span className="text-white font-bold ml-2">{s.ticketType || "Spectator"}</span>
                                    </div>
                                    <div>
                                      <span className="text-gray-400">Quantity:</span>
                                      <span className="text-white font-bold ml-2">{ticketQuantity}</span>
                                    </div>
                                    <div>
                                      <span className="text-gray-400">Base Price:</span>
                                      <span className="text-white font-bold ml-2">
                                        ₹{basePrice.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                                      </span>
                                    </div>
                                    <div>
                                      <span className="text-gray-400">Tax:</span>
                                      <span className="text-white font-bold ml-2">
                                        ₹{tax.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                                      </span>
                                    </div>
                                    <div className="col-span-2">
                                      <span className="text-gray-400">Total Amount:</span>
                                      <span className="text-white font-bold ml-2 text-lg">
                                        ₹{totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                                  <input
                                    type="checkbox"
                                    id={`confirm-${s.id}`}
                                    checked={confirmChange}
                                    onChange={(e) => setConfirmChange(e.target.checked)}
                                    className="w-5 h-5 rounded border-amber-500/50 bg-white/5 text-amber-600 focus:ring-2 focus:ring-amber-500 cursor-pointer"
                                  />
                                  <label htmlFor={`confirm-${s.id}`} className="text-white font-semibold cursor-pointer">
                                    I confirm this payment status change (will be marked as "cash")
                                  </label>
                                </div>
                              </div>

                              <div className="flex gap-3">
                                <motion.button
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => handleUpdatePayment(s)}
                                  disabled={!confirmChange}
                                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-6 py-3 rounded-xl font-semibold transition-all"
                                >
                                  <Check className="w-5 h-5" />
                                  Mark as Paid (Cash)
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => {
                                    setEditingSpectatorId(null);
                                    setConfirmChange(false);
                                  }}
                                  className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-xl font-semibold transition-all"
                                >
                                  <X className="w-5 h-5" />
                                  Cancel
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </td>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>

        {spectators.length === 0 && (
          <div className="py-20 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/5 rounded-2xl mb-4">
              <Search className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No spectators found</h3>
            <p className="text-gray-400 text-sm">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}