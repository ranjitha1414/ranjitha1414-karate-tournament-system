/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { X } from "lucide-react";
import TermsAndConditions from "../components/Policies/TermsAndConditions";
import PrivacyPolicy from "../components/Policies/PrivacyPolicies";
import RefundCancellationPolicy from "../components/Policies/Refund";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const sections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "venue", label: "Venue" },
    { id: "register", label: "Register" },
    { id: "gallery", label: "Gallery" },
    { id: "contact", label: "Contact" },
  ];

  const socialLinks = [
    { 
      name: "Facebook", 
      icon: <FaFacebook size={20} />, 
      url: "https://www.facebook.com/Borntofightschoolofkarate?ref=hl" 
    },
    { 
      name: "Instagram", 
      icon: <FaInstagram size={20} />, 
      url: "https://www.instagram.com/btfschoolofmartialarts/?__pwa=1#" 
    },
    { 
      name: "YouTube", 
      icon: <FaYoutube size={20} />, 
      url: "https://www.youtube.com/@BTF_2003" 
    },
  ];

  const openModal = (content) => {
    setModalContent(content);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <footer className="bg-gray-900 text-gray-400 relative overflow-hidden">
        {/* Decorative Top Border */}
        <div className="h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500"></div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Column 1: Brand */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-white mb-4">
                  IWKA 2026
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  Organized by Born to Fight School of Martial Arts. Join us for
                  an unforgettable championship experience.
                </p>
                <a 
                  href="https://borntofight.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-red-500 transition-colors"
                >
                  <span className="text-red-500">🌐</span>
                  <span>borntofight.in</span>
                </a>
              </motion.div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold text-white mb-4">
                  Quick Links
                </h4>
                <ul className="space-y-2">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <Link
                        to={section.id}
                        smooth={true}
                        duration={600}
                        offset={-80}
                        className="text-sm hover:text-red-500 transition-colors cursor-pointer inline-block"
                      >
                        {section.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Column 3: Contact Info */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold text-white mb-4">
                  Contact Us
                </h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-0.5">📧</span>
                    <a
                      href="mailto:iwkatournament2026@gmail.com"
                      className="hover:text-red-500 transition-colors"
                    >
                      iwkatournament2026@gmail.com
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-0.5">📞</span>
                    <a
                      href="tel:+918248752737"
                      className="hover:text-red-500 transition-colors"
                    >
                      +91 82487 52737
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-0.5">⏰</span>
                    <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
                  </li>
                </ul>
              </motion.div>
            </div>

            {/* Column 4: Social Media */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold text-white mb-4">
                  Follow Us
                </h4>
                <p className="text-sm mb-4">
                  Stay updated with the latest news and announcements
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-all duration-300 text-white"
                      title={social.name}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800 mb-8"></div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm"
          >
            <p className="text-gray-500">
              © IWKA 2026. All Rights Reserved.
            </p>
            <div className="flex items-center gap-6">
              <button
                onClick={() => openModal('privacy')}
                className="hover:text-red-500 transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => openModal('terms')}
                className="hover:text-red-500 transition-colors cursor-pointer"
              >
                Terms & Conditions
              </button>
              <button
                onClick={() => openModal('refund')}
                className="hover:text-red-500 transition-colors cursor-pointer"
              >
                Refund Policy
              </button>
            </div>
          </motion.div>

          {/* Credits */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-8 pt-8 border-t border-gray-800"
          >
            <p className="text-xs text-gray-600">
              Organized by{" "}
              <span className="text-red-500 font-semibold">
                Born to Fight School of Martial Arts
              </span>
            </p>
          </motion.div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>
      </footer>

      {/* Modal for Policies */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl max-h-[90vh] bg-gray-900 rounded-xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 p-2 bg-gray-800 hover:bg-red-600 rounded-lg transition-colors text-white"
              >
                <X size={24} />
              </button>

              {/* Modal Content */}
              <div className="overflow-y-auto max-h-[90vh]">
                {modalContent === 'privacy' && <PrivacyPolicy />}
                {modalContent === 'terms' && <TermsAndConditions />}
                {modalContent === 'refund' && <RefundCancellationPolicy />}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}