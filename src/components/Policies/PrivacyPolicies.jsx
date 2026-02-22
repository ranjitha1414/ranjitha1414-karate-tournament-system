/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
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
            Privacy Policy
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
              IWKA Tournament 2026 ("we," "our," "us"), organized by Born to Fight School of Martial Arts, is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share information about you when you register for and participate in the ISSHIN-RYU WORLD KARATE ASSOCIATION Championship 2026. By registering for the tournament, you consent to the practices described in this Privacy Policy.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">1.1. Personal Information</h3>
                <p className="text-gray-300">When you register for IWKA 2026, we collect personal information including:</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-gray-300">
                  <li>Full name, age, gender </li>
                  <li>Weight and height </li>
                  <li>Email address, phone number and WhatsApp number</li>
                  <li>Address</li>
                  <li>Emergency contact information</li>
                  <li>Payment details (processed securely)</li>
                  <li>Karate experience level, category, details on Dojo name and master</li>
                  <li>Medical information relevant to participation (if provided)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">1.2. Usage Data</h3>
                <p className="text-gray-300">We may collect information about how you use our website, including:</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-gray-300">
                  <li>IP address and browser type</li>
                  <li>Pages visited and time spent on the website</li>
                  <li>Device information and operating system</li>
                  <li>Referring website addresses</li>
                </ul>
              </div>

                            <div>
                <h3 className="text-lg font-semibold text-white mb-2">1.2. Technical Information</h3>
                <p className="text-gray-300">When you visit our website (iwka2026.com), which is hosted on Firebase Hosting, minimal technical data may be automatically collected by the hosting infrastructure, including:</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-gray-300">
                  <li>Basic server logs (IP addresses for security purposes)</li>
                  <li>Browser type and version</li>
                  <li>Device type (desktop/mobile)</li>
                  <li>Pages accessed and timestamps</li>
                </ul>
                <p className="text-gray-300 mt-2"><strong className="text-white">Important:</strong> We do NOT actively track, store, or analyze this data ourselves. This information is only collected by Firebase's hosting infrastructure for basic security and service delivery purposes.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">1.3. Cookies Policy</h3>
                <p className="text-gray-300"><strong className="text-white">We do NOT use cookies</strong> for tracking, analytics, advertising, or any other purpose on our website. Our website does not place any cookies on your device to track your behavior or collect personal information.</p>
                <p className="text-gray-300 mt-2">Firebase Hosting may use minimal essential cookies strictly for:</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-gray-300">
                  <li>Basic website functionality and security</li>
                  <li>Load balancing and content delivery</li>
                </ul>
                <p className="text-gray-300 mt-2">These are strictly necessary technical cookies that do not track or identify individual users.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">1.4. Photos and Videos</h3>
                <p className="text-gray-300">During the tournament, we may capture photographs and video recordings of participants for promotional and archival purposes.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. What We Do NOT Collect</h2>
            <p className="text-gray-300 mb-3">To be transparent about our data practices, we want to clearly state what we do NOT collect:</p>
            <ul className="list-disc list-inside ml-4 space-y-2 text-gray-300">
              <li><strong className="text-white">NO behavioral tracking:</strong> We do not track your browsing behavior across our website or other websites</li>
              <li><strong className="text-white">NO analytics cookies:</strong> We do not use Google Analytics or any other analytics tracking tools</li>
              <li><strong className="text-white">NO advertising cookies:</strong> We do not use cookies for advertising or marketing purposes</li>
              <li><strong className="text-white">NO detailed user profiling:</strong> We do not create detailed profiles of user behavior, preferences, or website usage patterns</li>
              <li><strong className="text-white">NO cross-site tracking:</strong> We do not track you across multiple websites</li>
            </ul>
            <p className="text-gray-300 mt-3">We only collect information that you explicitly provide during registration and what is minimally necessary for tournament administration.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">3.1. Tournament Administration</h3>
                <p className="text-gray-300">We use your personal information to:</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-gray-300">
                  <li>Process registrations and payments</li>
                  <li>Manage participant categories and schedules</li>
                  <li>Communicate tournament updates and information</li>
                  <li>Coordinate logistics and safety measures</li>
                  <li>Contact emergency contacts if necessary</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">2.2. Website Improvement</h3>
                <p className="text-gray-300">We use usage data to analyze trends, improve our website functionality, and enhance user experience.</p>
              </div>

                           
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">3.2. Communication</h3>
                <p className="text-gray-300">We may use your contact information to:</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-gray-300">
                  <li>Send tournament-related notifications and updates</li>
                  <li>Share results and achievements</li>
                  <li>Provide information about future events (with opt-out option)</li>
                  <li>Respond to your inquiries and requests</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">3.3. Marketing and Promotion</h3>
                <p className="text-gray-300">We may use photos, videos, and participant information for promotional materials, social media, and marketing purposes to showcase the tournament. You can opt out of promotional communications at any time.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Sharing Your Information</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">4.1. Service Providers</h3>
                <p className="text-gray-300">We may share your information with trusted third-party service providers who assist us in:</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-gray-300">
                  <li>Payment processing</li>
                  <li>Email communications</li>
                  <li>Website hosting and maintenance</li>
                  <li>Event management and logistics</li>
                </ul>
                <p className="text-gray-300 mt-2">These service providers are obligated to protect your information and use it only for specified purposes.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">4.2. Hosting Infrastructure</h3>
                <p className="text-gray-300">Our website is hosted on Firebase Hosting (Google Cloud Platform). Firebase may collect minimal technical data as described in Section 1.2 for basic service delivery and security purposes. We do not have direct access to or control over this infrastructure-level data collection.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">4.3. Tournament Officials and Partners</h3>
                <p className="text-gray-300">We share necessary participant information with referees, judges, and tournament officials to facilitate smooth tournament operations.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">4.4. Legal Requirements</h3>
                <p className="text-gray-300">We may disclose your information if required by law, to comply with legal processes, or to protect the rights, property, or safety of IWKA 2026, participants, or others.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">4.5. Business Transfers</h3>
                <p className="text-gray-300">In the event of a merger, acquisition, or transfer of tournament operations, your information may be transferred as part of the transaction. We will notify you of any such changes.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">4.6. Public Information</h3>
                <p className="text-gray-300">Tournament results, rankings, and achievements may be published publicly on our website and social media platforms.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Data Security</h2>
            <p className="text-gray-300 mb-3">We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. These measures include:</p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-gray-300">
              <li>Secure data encryption for payment processing</li>
              <li>Restricted access to personal information</li>
              <li>Regular security assessments and updates</li>
              <li>Secure server infrastructure</li>
            </ul>
            <p className="text-gray-300 mt-3">However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights and Choices</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">6.1. Access and Correction</h3>
                <p className="text-gray-300">You have the right to access, correct, or update your personal information. Contact us to make changes to your registration details.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">6.2. Marketing Opt-Out</h3>
                <p className="text-gray-300">You can opt out of receiving promotional communications by following the unsubscribe instructions in those communications or by contacting us directly. Note that you will still receive essential tournament-related communications.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">6.3. Browser Settings</h3>
                <p className="text-gray-300">Since we do not use tracking cookies or analytics, there are no cookie preferences to manage. Your browser's standard security settings are sufficient for visiting our website.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">6.4. Photo and Video Opt-Out</h3>
                <p className="text-gray-300">If you do not wish to be photographed or recorded during the tournament, please notify us in writing before the event.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">6.5. Data Deletion</h3>
                <p className="text-gray-300">You may request deletion of your personal information, subject to legal and operational requirements. Some information may need to be retained for record-keeping purposes.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Children's Privacy</h2>
            <p className="text-gray-300">Many participants in IWKA 2026 are minors. We collect personal information from minors only with parental or guardian consent. Parents and guardians have the right to review, correct, or request deletion of their child's information by contacting us.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Data Retention</h2>
            <p className="text-gray-300">We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, comply with legal obligations, resolve disputes, and maintain tournament records. After this period, we will securely delete or anonymize your information.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. International Data Transfers</h2>
            <p className="text-gray-300">If participants are registering from outside India, please note that your information will be transferred to and processed in India. By registering, you consent to the transfer of your information to India and its processing in accordance with this Privacy Policy.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Changes to This Privacy Policy</h2>
            <p className="text-gray-300">We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Any changes will be effective immediately upon posting on our website. Your continued use of our services after changes constitutes acceptance of the revised Privacy Policy. We encourage you to review this Privacy Policy periodically.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. Third-Party Services</h2>
            <p className="text-gray-300 mb-3">We use the following third-party services:</p>
            <ul className="list-disc list-inside ml-4 space-y-2 text-gray-300">
              <li><strong className="text-white">Firebase Hosting (Google):</strong> Website hosting infrastructure. Firebase may collect minimal technical data as described in Section 1.2.</li>
              <li><strong className="text-white">Razorpay:</strong> Payment processing for registration fees. Razorpay has its own privacy policy governing how they handle payment information.</li>
              <li><strong className="text-white">Email Service:</strong> For sending tournament communications and confirmations.</li>
            </ul>
            <p className="text-gray-300 mt-3">We do NOT use:</p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-gray-300">
              <li>Google Analytics or any analytics platform</li>
              <li>Advertising networks or tracking pixels</li>
              <li>Social media tracking or retargeting tools</li>
              <li>Third-party cookies for any purpose</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">12. Contact Us</h2>
            <p className="text-gray-300 mb-4">If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:</p>
            <div className="bg-gray-800 p-6 rounded-lg">
              <p className="mb-2"><strong className="text-white">Email:</strong> <a href="mailto:iwkatournament2026@gmail.com" className="text-red-400 hover:text-red-300">iwkatournament2026@gmail.com</a></p>
              <p className="mb-2"><strong className="text-white">Phone:</strong> <a href="tel:+918248752737" className="text-red-400 hover:text-red-300">+91 82487 52737</a></p>
              <p><strong className="text-white">Address:</strong> No. 106/26, Landons Road, Kilpauk, Chennai - 600 010, India</p>
            </div>
          </section>

          <div className="mt-12 p-6 bg-red-900/20 border border-red-800 rounded-lg">
            <p className="text-white font-semibold mb-2">Your Privacy Matters</p>
            <p className="text-red-200 text-sm">
              Thank you for trusting IWKA 2026 with your personal information. We are committed to protecting your privacy and ensuring a safe, secure tournament experience.
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