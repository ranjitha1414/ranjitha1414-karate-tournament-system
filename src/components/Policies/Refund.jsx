/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, AlertTriangle } from 'lucide-react';

export default function RefundCancellationPolicy() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 py-8">
        <div className="max-w-4xl mx-auto px-6">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-white"
          >
            Refund and Cancellation Policy
          </motion.h1>
          <p className="text-red-100 mt-2">IWKA Tournament 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <div>
            <p className="text-sm text-gray-400 mb-8">
              <strong>Effective Date:</strong> November 27, 2025
            </p>
            
            <p className="mb-6 leading-relaxed">
              This Refund and Cancellation Policy outlines the terms regarding registration fees for the ISSHIN-RYU WORLD KARATE ASSOCIATION Championship 2026 ("IWKA 2026"). Please read this policy carefully before completing your registration.
            </p>
          </div>

          {/* Important Notice Box */}
          <div className="bg-red-900/30 border-2 border-red-600 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <AlertTriangle className="text-red-500 flex-shrink-0 mt-1" size={28} />
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Important Notice</h3>
                <p className="text-red-200 leading-relaxed">
                  All registration fees for IWKA 2026 are <strong className="text-white">strictly non-refundable and non-transferable</strong>. Once your registration is confirmed and payment is processed, no refunds will be issued under any circumstances.
                </p>
              </div>
            </div>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. No Refund Policy</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">1.1. Non-Refundable Registration Fees</h3>
                <p className="text-gray-300">All registration fees paid for IWKA 2026 are <strong className="text-white">100% non-refundable</strong>. This policy applies to all participants regardless of:</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-gray-300">
                  <li>Withdrawal from the tournament</li>
                  <li>Disqualification for any reason</li>
                  <li>Inability to attend due to personal reasons</li>
                  <li>Medical conditions or injuries</li>
                  <li>Travel difficulties or visa issues</li>
                  <li>Changes in personal circumstances</li>
                  <li>Weather conditions or force majeure events</li>
                  <li>Any other reason whatsoever</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">1.2. Payment Finality</h3>
                <p className="text-gray-300">Once payment is processed and registration is confirmed, the transaction is considered final and complete. No refunds, partial refunds, or credits will be issued.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">1.3. No Exceptions</h3>
                <p className="text-gray-300">This no-refund policy has <strong className="text-white">no exceptions</strong>. We understand that unexpected situations may arise, but we are unable to make exceptions to this policy for any reason.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. No Cancellation Policy</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">2.1. Registration Cannot Be Cancelled</h3>
                <p className="text-gray-300">Once you have completed your registration and payment has been processed, your registration <strong className="text-white">cannot be cancelled</strong>. Please ensure you are fully committed to participating before completing your registration.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">2.2. Withdrawal from Tournament</h3>
                <p className="text-gray-300">If you choose to withdraw from the tournament after registration:</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-gray-300">
                  <li>Your registration will remain in our records</li>
                  <li>No refund will be provided</li>
                  <li>Your spot will be considered forfeited</li>
                  <li>You will not be able to participate in the tournament</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">2.3. Non-Appearance</h3>
                <p className="text-gray-300">Failure to appear at the tournament on the scheduled date does not entitle you to any refund, credit, or transfer of registration fees.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Non-Transferable Registration</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">3.1. No Transfers to Other Participants</h3>
                <p className="text-gray-300">Registration is <strong className="text-white">non-transferable</strong>. You cannot transfer your registration to another person under any circumstances.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">3.2. No Transfers to Future Events</h3>
                <p className="text-gray-300">Registration fees cannot be transferred or credited toward future tournaments or events.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">3.3. Category Changes</h3>
                <p className="text-gray-300">Once registered in a specific category, changes to your category may be permitted only at the discretion of the tournament organizers and must be requested in writing at least 15 days before the tournament. Category changes do not affect the non-refundable nature of your registration fee.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Tournament Modifications by Organizers</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">4.1. Schedule or Venue Changes</h3>
                <p className="text-gray-300">If the tournament organizers make minor changes to the schedule, format, or venue, these changes do not entitle participants to refunds. We will notify all participants of significant changes as soon as possible.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">4.2. Tournament Cancellation by Organizers</h3>
                <p className="text-gray-300">In the unlikely event that IWKA 2026 is cancelled entirely by the organizers due to circumstances beyond our control (such as natural disasters, government restrictions, or other force majeure events), we will:</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-gray-300">
                  <li>Notify all registered participants immediately</li>
                  <li>Provide one of the following options at our discretion:
                    <ul className="list-circle list-inside ml-6 mt-1 space-y-1">
                      <li>Full refund of registration fees</li>
                      <li>Rescheduling the tournament to a future date</li>
                      <li>Credit toward a future tournament</li>
                    </ul>
                  </li>
                </ul>
                <p className="text-gray-300 mt-2"><strong className="text-white">Important:</strong> This is the only circumstance under which refunds may be considered, and the decision rests entirely with the tournament organizers.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">4.3. No Liability for Additional Costs</h3>
                <p className="text-gray-300">The tournament organizers are not responsible for any additional costs incurred by participants, including but not limited to travel expenses, accommodation, visa fees, or training costs, regardless of whether the tournament proceeds as scheduled or is modified or cancelled.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Before You Register</h2>
            
            <div className="bg-gray-800 p-6 rounded-lg space-y-3">
              <h3 className="text-lg font-semibold text-white mb-3">Please Consider the Following:</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-3">
                  <XCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                  <span>Are you fully committed to participating in IWKA 2026?</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                  <span>Have you confirmed your availability for the tournament dates?</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                  <span>Are you physically fit and cleared for competitive karate?</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                  <span>Have you arranged travel and accommodation if needed?</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                  <span>Do you understand that registration fees are non-refundable?</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Payment Security and Processing</h2>
            <div className="space-y-3 text-gray-300">
              <p><strong className="text-white">6.1. Payment Gateway:</strong> All payments are processed securely through Razorpay, our authorized payment gateway partner. Your payment information is protected with industry-standard security measures and encryption.</p>
              <p><strong className="text-white">6.2. Payment Methods:</strong> We accept various payment methods including credit cards, debit cards, UPI, net banking, and wallets as supported by Razorpay.</p>
              <p><strong className="text-white">6.3. Payment Confirmation:</strong> Upon successful payment, you will receive an automated confirmation email from both Razorpay and IWKA 2026 with your transaction details and registration confirmation.</p>
              <p><strong className="text-white">6.4. Failed Transactions:</strong> If a payment fails or is declined, no registration will be confirmed. If amount has been debited from your account but registration is not confirmed, please contact us immediately with your transaction details. We will investigate and resolve the issue within 7-10 business days.</p>
              <p><strong className="text-white">6.5. Technical Issues:</strong> In rare cases of technical errors where you are charged but registration is not processed due to system failure, a refund will be initiated at our discretion after proper verification.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Questions and Grievances</h2>
            <div className="space-y-3 text-gray-300">
              <p><strong className="text-white">7.1. Pre-Registration Queries:</strong> If you have any questions about this Refund and Cancellation Policy before registering, please contact us. Once you complete your registration, you acknowledge that you have read, understood, and agreed to this policy.</p>
              <p><strong className="text-white">7.2. Payment Disputes:</strong> For any payment-related disputes or technical issues with the payment gateway, please contact us with your transaction ID, payment screenshot, and details. We will work with Razorpay to resolve the issue.</p>
              <p><strong className="text-white">7.3. Grievance Redressal:</strong> If you have any grievances regarding payments or registration, please write to us at the contact details below. We aim to resolve all genuine issues within 7-10 business days.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg mt-4">
              <p className="mb-2"><strong className="text-white">Email:</strong> <a href="mailto:iwkatournament2026@gmail.com" className="text-red-400 hover:text-red-300">iwkatournament2026@gmail.com</a></p>
              <p className="mb-2"><strong className="text-white">Phone:</strong> <a href="tel:+918248752737" className="text-red-400 hover:text-red-300">+91 82487 52737</a></p>
              <p><strong className="text-white">Address:</strong> No. 106/26, Landons Road, Kilpauk, Chennai - 600 010, India</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Acknowledgment and Acceptance</h2>
            <p className="text-gray-300">By completing your registration for IWKA 2026, you acknowledge that:</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-2 text-gray-300">
              <li>You have read and understood this Refund and Cancellation Policy</li>
              <li>You agree to the non-refundable and non-transferable nature of registration fees</li>
              <li>You accept that no refunds will be issued under any circumstances except tournament cancellation by organizers</li>
              <li>You understand that withdrawal or non-appearance does not entitle you to any refund</li>
              <li>You accept full responsibility for your decision to register</li>
            </ul>
          </section>

          <div className="mt-12 p-6 bg-red-900/20 border border-red-800 rounded-lg">
            <p className="text-white font-semibold mb-2">Final Reminder</p>
            <p className="text-red-200 text-sm leading-relaxed">
              Registration fees for IWKA 2026 are <strong className="text-white">strictly non-refundable and non-transferable</strong>. Please ensure you are fully prepared and committed to participating before completing your registration. If you have any doubts or concerns, please contact us before registering.
            </p>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Thank you for your understanding and cooperation. We look forward to seeing you at IWKA 2026!
            </p>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="bg-gray-950 py-6 mt-12">
        <div className="max-w-4xl mx-auto px-6 text-center text-gray-500 text-sm">
          <p>© 2026 IWKA Tournament. Organized by Born to Fight School of Martial Arts.</p>
        </div>
      </div>
    </div>
  );
}