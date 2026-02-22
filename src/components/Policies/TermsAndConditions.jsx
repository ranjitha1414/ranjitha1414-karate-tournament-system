/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';

export default function TermsAndConditions() {
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
            Terms and Conditions
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
              Welcome to the ISSHIN-RYU WORLD KARATE ASSOCIATION Championship 2026 ("IWKA 2026")! These Terms and Conditions ("Terms") govern your registration and participation in the tournament. By registering for IWKA 2026, you agree to comply with and be bound by these Terms. If you do not agree with these Terms, please do not register or participate in the tournament.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Tournament Registration</h2>
            <div className="space-y-3 text-gray-300">
              <p><strong className="text-white">1.1. Eligibility:</strong> Participants must meet the age and skill requirements specified for their respective categories. Minors must have parental or guardian consent to participate.</p>
              <p><strong className="text-white">1.2. Registration Process:</strong> To register, you must complete the online registration form and provide accurate information including name, age, contact details, category, and emergency contact information.</p>
              <p><strong className="text-white">1.3. Payment:</strong> Registration fees must be paid in full at the time of registration as specified on our website. We accept various payment methods as indicated during the registration process.</p>
              <p><strong className="text-white">1.4. Confirmation:</strong> Upon successful registration and payment, you will receive a confirmation email with your registration details and tournament information.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. No Cancellations or Refunds</h2>
            <div className="space-y-3 text-gray-300">
              <p><strong className="text-white">2.1. Non-Refundable:</strong> All registration fees are non-refundable. Once payment is processed, no refunds will be issued under any circumstances, including withdrawal, disqualification, injury, or inability to attend.</p>
              <p><strong className="text-white">2.2. No Cancellation:</strong> Registrations cannot be cancelled once submitted and paid. Please ensure you can commit to participating before completing your registration.</p>
              <p><strong className="text-white">2.3. No Transfers:</strong> Registration is non-transferable to another person or to future tournaments.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Tournament Rules and Conduct</h2>
            <div className="space-y-3 text-gray-300">
              <p><strong className="text-white">3.1. Compliance:</strong> All participants must comply with the official tournament rules, regulations, and the decisions of referees and officials.</p>
              <p><strong className="text-white">3.2. Conduct:</strong> Participants are expected to demonstrate good sportsmanship, respect, and discipline at all times. Inappropriate behavior, including but not limited to violence, harassment, or unsportsmanlike conduct, may result in disqualification without refund.</p>
              <p><strong className="text-white">3.3. Equipment:</strong> Participants must provide their own appropriate safety equipment as specified in the tournament guidelines.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Health and Safety</h2>
            <div className="space-y-3 text-gray-300">
              <p><strong className="text-white">4.1. Medical Fitness:</strong> By registering, you confirm that you are in good health and physically fit to participate in competitive karate activities. It is your responsibility to consult with a healthcare professional before participating.</p>
              <p><strong className="text-white">4.2. Risk Acknowledgment:</strong> You acknowledge that participation in martial arts tournaments involves inherent risks of injury. You voluntarily assume all risks associated with participation.</p>
              <p><strong className="text-white">4.3. Medical Emergency:</strong> In case of injury or medical emergency, tournament organizers reserve the right to seek medical assistance on your behalf. You consent to emergency medical treatment if necessary.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Intellectual Property and Media</h2>
            <div className="space-y-3 text-gray-300">
              <p><strong className="text-white">5.1. Tournament Materials:</strong> All tournament materials, including logos, designs, and promotional content, are the property of IWKA 2026 and Born to Fight School of Martial Arts.</p>
              <p><strong className="text-white">5.2. Photography and Video:</strong> By participating, you grant IWKA 2026 the right to photograph and video record your participation and to use such media for promotional purposes without compensation.</p>
              <p><strong className="text-white">5.3. Social Media:</strong> You agree not to post content that misrepresents the tournament or damages its reputation.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Liability and Indemnification</h2>
            <div className="space-y-3 text-gray-300">
              <p><strong className="text-white">6.1. Waiver of Liability:</strong> To the maximum extent permitted by law, IWKA 2026, Born to Fight School of Martial Arts, and their organizers, sponsors, officials, and volunteers are not liable for any injuries, losses, damages, or expenses arising from your participation in the tournament.</p>
              <p><strong className="text-white">6.2. Indemnification:</strong> You agree to indemnify and hold harmless IWKA 2026 and Born to Fight School of Martial Arts from any claims, liabilities, damages, or expenses arising from your participation or violation of these Terms.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Tournament Modifications</h2>
            <div className="space-y-3 text-gray-300">
              <p><strong className="text-white">7.1. Changes:</strong> We reserve the right to modify tournament schedules, categories, rules, or venue due to unforeseen circumstances. We will notify registered participants of any significant changes as soon as possible.</p>
              <p><strong className="text-white">7.2. Cancellation by Organizers:</strong> In the unlikely event that the tournament is cancelled by the organizers, we will provide appropriate alternatives or refunds at our discretion.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Data Protection</h2>
            <div className="space-y-3 text-gray-300">
              <p><strong className="text-white">8.1. Personal Information:</strong> We collect and process personal information in accordance with our Privacy Policy. By registering, you consent to the collection and use of your information as described.</p>
              <p><strong className="text-white">8.2. Data Security:</strong> We implement reasonable security measures to protect your personal information, though we cannot guarantee absolute security.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Modifications to Terms</h2>
            <div className="space-y-3 text-gray-300">
              <p>We reserve the right to modify these Terms at any time. Any changes will be effective immediately upon posting on our website. Your continued participation after modifications constitutes acceptance of the revised Terms.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Governing Law</h2>
            <div className="space-y-3 text-gray-300">
              <p>These Terms are governed by and construed in accordance with the laws of India. Any disputes arising from these Terms or your participation in IWKA 2026 shall be subject to the exclusive jurisdiction of the courts located in Chennai, India.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. Contact Us</h2>
            <div className="space-y-3 text-gray-300">
              <p>If you have any questions or concerns about these Terms, please contact us at:</p>
              <div className="bg-gray-800 p-6 rounded-lg mt-4">
                <p><strong className="text-white">Email:</strong> iwkatournament2026@gmail.com</p>
                <p><strong className="text-white">Phone:</strong> +91 82487 52737</p>
                <p><strong className="text-white">Address:</strong> No. 106/26, Landons Road, Kilpauk, Chennai - 600 010, India</p>
              </div>
            </div>
          </section>

          <div className="mt-12 p-6 bg-red-900/20 border border-red-800 rounded-lg">
            <p className="text-white font-semibold mb-2">Important Notice:</p>
            <p className="text-red-200 text-sm">
              By registering for IWKA 2026, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. Thank you for being part of IWKA 2026!
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