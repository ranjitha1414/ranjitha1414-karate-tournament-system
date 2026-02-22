/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-env node */
import { onRequest } from "firebase-functions/v2/https";
import express from "express";
import Razorpay from "razorpay";
import cors from "cors";
import crypto from "crypto";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import { generateParticipantEmail } from "./participantEmailTemplate.js";
import { generateSpectatorEmail } from "./spectatorEmailTemplate.js";

const app = express();
const allowedOrigins = [
  "https://iwka2026.com",
  "https://www.iwka2026.com",
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn("⚠️ CORS blocked for origin:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(bodyParser.json());

// ==================== LAZY INITIALIZATION ====================
// These will be initialized on first request, not at module load time
let razorpay = null;
let transporter = null;
let isInitialized = false;

// Initialize services with secrets (called on first request)
const initializeServices = () => {
  if (isInitialized) return;

  console.log("🔧 Initializing services with secrets...");

  // Get secrets from environment
  const EMAIL_USER = process.env.EMAIL_USER;
  const EMAIL_PASS = process.env.EMAIL_PASS;
  const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
  const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

  // Validate secrets
  if (!EMAIL_USER || !EMAIL_PASS) {
    console.error("❌ Email credentials not found in environment");
  } else {
    // Initialize email transporter
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    // Verify email configuration
    transporter.verify((error, success) => {
      if (error) {
        console.error("❌ Email configuration error:", error);
      } else {
        console.log("✅ Email server is ready");
      }
    });
  }

  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    console.error("❌ Razorpay credentials not found in environment");
  } else {
    // Initialize Razorpay
    razorpay = new Razorpay({
      key_id: RAZORPAY_KEY_ID,
      key_secret: RAZORPAY_KEY_SECRET,
    });
    console.log("✅ Razorpay initialized");
  }

  isInitialized = true;
};

// Middleware to ensure services are initialized
app.use((req, res, next) => {
  if (!isInitialized) {
    initializeServices();
  }
  next();
});

// ==================== EMAIL FUNCTIONS ====================
const sendPaymentConfirmationEmail = async (paymentDetails) => {
  if (!transporter) {
    console.error("❌ Email transporter not initialized");
    return { success: false, error: "Email service not available" };
  }

  try {
    console.log("📧 Sending payment confirmation email to:", paymentDetails.customerEmail);
    const emailContent = await generateParticipantEmail(paymentDetails);
    
    const mailOptions = {
      from: `"IWKA 2026" <${process.env.EMAIL_USER}>`,
      to: paymentDetails.customerEmail,
      subject: emailContent.subject,
      text: emailContent.text,
      html: emailContent.html,
      attachments: emailContent.attachments || [],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully to:", paymentDetails.customerEmail);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return { success: false, error: error.message };
  }
};

const sendSpectatorConfirmationEmail = async (paymentDetails) => {
  if (!transporter) {
    console.error("❌ Email transporter not initialized");
    return { success: false, error: "Email service not available" };
  }

  try {
    console.log("📧 Sending spectator confirmation email to:", paymentDetails.email);
    const emailContent = await generateSpectatorEmail(paymentDetails);
    
    const mailOptions = {
      from: `"IWKA 2026" <${process.env.EMAIL_USER}>`,
      to: paymentDetails.email,
      subject: emailContent.subject,
      text: emailContent.text,
      html: emailContent.html,
      attachments: emailContent.attachments || [],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Spectator email sent successfully to:", paymentDetails.email);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Error sending spectator email:", error);
    return { success: false, error: error.message };
  }
};

// List of currencies supported by Razorpay
const SUPPORTED_CURRENCIES = [
  "INR", "USD", "EUR", "GBP", "AUD", "CAD", "SGD", "AED", "MYR", "THB",
  "CHF", "HKD", "NZD", "SEK", "DKK", "NOK", "ZAR", "PHP", "IDR", "SAR",
  "QAR", "KWD", "OMR", "BHD", "JPY", "CNY", "ILS", "MXN", "BRL", "CLP"
];

// ==================== RAZORPAY: CREATE ORDER ====================
app.post("/create-order", async (req, res) => {
  if (!razorpay) {
    return res.status(503).json({ 
      error: "Payment service not available. Please check server configuration." 
    });
  }

  console.log("📝 Creating Razorpay order...");
  const { amount, currency } = req.body;

  if (!amount || isNaN(amount)) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  const orderCurrency = currency || "INR";

  if (!SUPPORTED_CURRENCIES.includes(orderCurrency)) {
    console.warn(`⚠️ Currency ${orderCurrency} not supported`);
    return res.status(400).json({ 
      error: `Currency ${orderCurrency} is not supported. Supported currencies: ${SUPPORTED_CURRENCIES.join(", ")}` 
    });
  }

  try {
    const options = {
      amount: Math.round(amount * 100),
      currency: orderCurrency,
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);
    console.log(`✅ Razorpay order created: ${order.id} | ${orderCurrency} ${amount}`);
    
    return res.json(order);
  } catch (err) {
    console.error("❌ Error creating Razorpay order:", err);
    return res.status(500).json({ error: err.message });
  }
});

// ==================== RAZORPAY: VERIFY PAYMENT ====================
app.post("/verify-payment", async (req, res) => {
  if (!razorpay) {
    return res.status(503).json({ 
      error: "Payment service not available" 
    });
  }

  console.log("🔍 Verifying Razorpay payment...");
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      customerEmail,
      customerName,
      amount,
      currency,
      registrationData,
      registrationType,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: "Missing payment parameters" });
    }

    // Verify signature
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature !== razorpay_signature) {
      console.log("❌ Payment signature verification failed");
      return res.json({ success: false, error: "Invalid signature" });
    }

    console.log("✅ Payment signature verified successfully");

    // Fetch payment details from Razorpay
    try {
      const payment = await razorpay.payments.fetch(razorpay_payment_id);
      console.log(`💳 Payment Details: ${payment.method} | ${payment.currency} ${payment.amount / 100}`);
      
      if (payment.amount !== Math.round(amount * 100)) {
        console.warn(`⚠️ Amount mismatch: Expected ${amount * 100}, Got ${payment.amount}`);
      }
      
      if (payment.currency !== currency) {
        console.warn(`⚠️ Currency mismatch: Expected ${currency}, Got ${payment.currency}`);
      }
    } catch (fetchError) {
      console.warn("⚠️ Could not fetch payment details:", fetchError.message);
    }

    // Send appropriate confirmation email
    if (customerEmail) {
      let emailResult;
      
      if (registrationType === "spectator") {
        emailResult = await sendSpectatorConfirmationEmail({
          name: customerName,
          email: customerEmail,
          totalAmount: amount / 100,
          currency: currency || "INR",
          razorpay_payment_id: razorpay_payment_id,
          razorpay_order_id: razorpay_order_id,
          ticketQuantity: (registrationData?.ticketQuantity || 1).toString(),
          paymentStatus: "paid"
        });
      } else if (registrationType === "shopping") {
        console.log("🛒 Shopping order confirmed:", {
          customerName,
          customerEmail,
          amount: amount / 100,
          currency,
          razorpay_payment_id,
        });
        emailResult = { success: true };
      } else {
        emailResult = await sendPaymentConfirmationEmail({
          customerName,
          customerEmail,
          amount: amount / 100,
          currency: currency || "INR",
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id,
          registrationData,
          paymentMethod: "Razorpay"
        });
      }

      return res.json({ 
        success: true, 
        emailSent: emailResult.success,
        emailError: emailResult.error 
      });
    }
    
    return res.json({ success: true });
  } catch (err) {
    console.error("❌ Error verifying payment:", err);
    return res.status(500).json({ error: err.message });
  }
});

// ==================== RESEND PARTICIPANT EMAIL ====================
app.post("/resend-participant-email", async (req, res) => {
  console.log("📧 Resending participant confirmation email...");
  try {
    const {
      customerName,
      customerEmail,
      amount,
      currency,
      paymentId,
      orderId,
      registrationData,
      paymentMethod
    } = req.body;

    if (!customerEmail) {
      return res.status(400).json({ 
        success: false, 
        error: "Email address is required" 
      });
    }

    const emailResult = await sendPaymentConfirmationEmail({
      customerName,
      customerEmail,
      amount: amount / 100,
      currency: currency || "INR",
      paymentId,
      orderId,
      registrationData,
      paymentMethod: paymentMethod || "Razorpay"
    });

    if (emailResult.success) {
      console.log("✅ Participant email resent successfully to:", customerEmail);
      return res.json({ 
        success: true, 
        messageId: emailResult.messageId,
        message: "Email sent successfully"
      });
    } else {
      console.error("❌ Failed to resend participant email:", emailResult.error);
      return res.status(500).json({ 
        success: false, 
        error: emailResult.error 
      });
    }
  } catch (error) {
    console.error("❌ Error in resend participant email endpoint:", error);
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// ==================== RESEND SPECTATOR EMAIL ====================
app.post("/resend-spectator-email", async (req, res) => {
  console.log("📧 Resending spectator confirmation email...");
  try {
    const {
      name,
      email,
      totalAmount,
      currency,
      razorpay_payment_id,
      razorpay_order_id,
      ticketQuantity,
      ticketType,
      basePrice,
      tax,
      paymentStatus
    } = req.body;

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        error: "Email address is required" 
      });
    }

    const emailResult = await sendSpectatorConfirmationEmail({
      name,
      email,
      totalAmount,
      currency: currency || "INR",
      razorpay_payment_id,
      razorpay_order_id,
      ticketQuantity,
      ticketType: ticketType || "Spectator",
      basePrice,
      tax,
      paymentStatus: paymentStatus || "paid"
    });

    if (emailResult.success) {
      console.log("✅ Spectator email resent successfully to:", email);
      return res.json({ 
        success: true, 
        messageId: emailResult.messageId,
        message: "Email sent successfully"
      });
    } else {
      console.error("❌ Failed to resend spectator email:", emailResult.error);
      return res.status(500).json({ 
        success: false, 
        error: emailResult.error 
      });
    }
  } catch (error) {
    console.error("❌ Error in resend spectator email endpoint:", error);
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// ==================== RAZORPAY: GET PAYMENT DETAILS ====================
app.get("/payment-details/:paymentId", async (req, res) => {
  if (!razorpay) {
    return res.status(503).json({ error: "Payment service not available" });
  }

  console.log("🔍 Fetching payment details...");
  const { paymentId } = req.params;

  try {
    const payment = await razorpay.payments.fetch(paymentId);
    console.log("✅ Payment details fetched:", payment.id);
    
    return res.json({
      success: true,
      payment: {
        id: payment.id,
        amount: payment.amount / 100,
        currency: payment.currency,
        status: payment.status,
        method: payment.method,
        email: payment.email,
        contact: payment.contact,
        created_at: payment.created_at,
      }
    });
  } catch (err) {
    console.error("❌ Error fetching payment details:", err);
    return res.status(500).json({ error: err.message });
  }
});

// ==================== RAZORPAY: REFUND PAYMENT ====================
app.post("/refund-payment", async (req, res) => {
  if (!razorpay) {
    return res.status(503).json({ error: "Payment service not available" });
  }

  console.log("💸 Processing refund...");
  const { paymentId, amount, reason } = req.body;

  if (!paymentId) {
    return res.status(400).json({ error: "Payment ID is required" });
  }

  try {
    const refundOptions = {
      amount: amount ? Math.round(amount * 100) : undefined,
      notes: {
        reason: reason || "Refund requested",
        timestamp: new Date().toISOString(),
      }
    };

    const refund = await razorpay.payments.refund(paymentId, refundOptions);
    console.log("✅ Refund processed:", refund.id);
    
    return res.json({
      success: true,
      refund: {
        id: refund.id,
        amount: refund.amount / 100,
        currency: refund.currency,
        status: refund.status,
      }
    });
  } catch (err) {
    console.error("❌ Error processing refund:", err);
    return res.status(500).json({ error: err.message });
  }
});

// ==================== HEALTH CHECK ====================
app.get("/", (req, res) => {
  const status = {
    status: "Server is running",
    email: transporter ? "Configured ✅" : "Not initialized ⚠️",
    payment: razorpay ? "Razorpay (Domestic & International) ✅" : "Not initialized ⚠️",
    environment: "Live Keys",
    supportedCurrencies: SUPPORTED_CURRENCIES,
    endpoints: {
      razorpay: [
        "POST /create-order", 
        "POST /verify-payment",
        "POST /resend-participant-email",
        "POST /resend-spectator-email",
        "GET /payment-details/:paymentId",
        "POST /refund-payment"
      ]
    }
  };
  
  res.json(status);
});

// ==================== EXPORT AS CLOUD FUNCTION ====================
export const api = onRequest({
  secrets: ["EMAIL_USER", "EMAIL_PASS", "RAZORPAY_KEY_ID", "RAZORPAY_KEY_SECRET"]
}, app);