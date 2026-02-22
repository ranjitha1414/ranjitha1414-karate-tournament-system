/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiClock, FiGlobe } from "react-icons/fi";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Contact() {
  const contactInfo = [
    {
      icon: <FiMail size={24} />,
      title: "Email Us",
      details: "iwkatournament2026@gmail.com",
      link: "mailto:iwkatournament2026@gmail.com",
    },
    {
      icon: <FiPhone size={24} />,
      title: "Call Us",
      details: "+91 82487 52737",
      link: "tel:+918248752737",
    },
    {
      icon: <FiGlobe size={24} />,
      title: "Visit Our Website",
      details: "borntofight.in",
      link: "https://borntofight.in",
    },
    {
      icon: <FiClock size={24} />,
      title: "Office Hours",
      details: "Mon - Sat: 9:00 AM - 6:00 PM",
      link: null,
    },
  ];

  const socialLinks = [
    { 
      name: "Facebook", 
      icon: <FaFacebook size={24} />, 
      url: "https://www.facebook.com/Borntofightschoolofkarate?ref=hl", 
      color: "hover:bg-blue-600" 
    },
    { 
      name: "Instagram", 
      icon: <FaInstagram size={24} />, 
      url: "https://www.instagram.com/btfschoolofmartialarts/?__pwa=1#", 
      color: "hover:bg-pink-600" 
    },
    { 
      name: "YouTube", 
      icon: <FaYoutube size={24} />, 
      url: "https://www.youtube.com/@BTF_2003", 
      color: "hover:bg-red-600" 
    },
  ];

  return (
    <section id="contact" className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
            Get in Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contact Us
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Reach out to us anytime.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              {info.link ? (
                <a href={info.link} target={info.link.startsWith('http') ? '_blank' : '_self'} rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''} className="block">
                  <div className="bg-gray-800 hover:bg-gray-750 border border-gray-700 hover:border-red-500 rounded-2xl p-6 text-center transition-all duration-300 h-full">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-red-600 rounded-xl mb-4 text-white group-hover:scale-110 transition-transform">
                      {info.icon}
                    </div>
                    <h3 className="text-white font-semibold mb-2">{info.title}</h3>
                    <p className="text-gray-400 text-sm">{info.details}</p>
                  </div>
                </a>
              ) : (
                <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 text-center h-full">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-red-600 rounded-xl mb-4 text-white">
                    {info.icon}
                  </div>
                  <h3 className="text-white font-semibold mb-2">{info.title}</h3>
                  <p className="text-gray-400 text-sm">{info.details}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Side - Quick Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Quick Information */}
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6">Tournament Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Registration Deadline</h4>
                    <p className="text-gray-400 text-sm">June 30, 2026</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Tournament Date</h4>
                    <p className="text-gray-400 text-sm">July 25-26, 2026</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Entry Fee</h4>
                    <p className="text-gray-400 text-sm">₹2500 per participant </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Age Categories</h4>
                    <p className="text-gray-400 text-sm">4-8 • 9-13 • 14-19 • 20-34 • 35+</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-4">Follow Us</h3>
              <p className="text-gray-400 mb-6 text-sm">
                Stay updated with the latest news, announcements, and behind-the-scenes content
              </p>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-14 h-14 bg-gray-700 ${social.color} rounded-xl flex items-center justify-center transition-all duration-300 text-white`}
                    title={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side - CTA Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Register CTA */}
            <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-3">Ready to Compete?</h3>
              <p className="mb-6 text-white/90">
                Don't miss your chance to be part of IWKA 2026. Register now and secure your spot!
              </p>
              <motion.a
                href="#register"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all"
              >
                Register Now →
              </motion.a>
            </div>

            {/* Email CTA */}
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-3">Have Questions?</h3>
              <p className="text-gray-400 mb-6">
                Send us an email and we'll get back to you within 24 hours
              </p>
              <motion.a
                href="mailto:iwkatournament2026@gmail.com"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
              >
                <FiMail size={18} />
                Send Email
              </motion.a>
            </div>

            {/* Call CTA */}
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-3">Prefer to Call?</h3>
              <p className="text-gray-400 mb-6">
                Our team is available Mon-Sat, 9 AM - 6 PM
              </p>
              <motion.a
                href="tel:+918248752737"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
              >
                <FiPhone size={18} />
                Call Now
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}