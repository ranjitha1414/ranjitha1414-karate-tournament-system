import QRCode from "qrcode";

const generateQRCode = async (data) => {
  try {
    const qrDataUrl = await QRCode.toDataURL(JSON.stringify(data), {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      quality: 1,
      margin: 2,
      width: 300,
      color: {
        dark: '#1e3a8a',
        light: '#ffffff'
      }
    });
    return qrDataUrl;
  } catch (error) {
    console.error("❌ Error generating QR code:", error);
    return null;
  }
};

export const generateParticipantEmail = async (paymentDetails) => {
  const { 
    customerName, 
    customerEmail, 
    amount, 
    currency, 
    paymentId, 
    orderId,
    registrationData,
    paymentMethod 
  } = paymentDetails;

  // Generate QR code with payment details
  const qrData = {
    type: 'PARTICIPANT',
    paymentId: paymentId,
    orderId: orderId,
    name: customerName,
    email: customerEmail,
    amount: amount,
    events: registrationData?.selectedEvents || [],
    category: registrationData?.category || 'N/A',
  };
  
  const qrCodeDataUrl = await generateQRCode(qrData);

  // Prepare attachment if QR code was generated
  const attachments = [];
  if (qrCodeDataUrl) {
    // Remove the data:image/png;base64, prefix
    const base64Data = qrCodeDataUrl.replace(/^data:image\/png;base64,/, '');
    
    attachments.push({
      filename: `karate-cup-registration-${paymentId}.png`,
      content: base64Data,
      encoding: 'base64',
      contentType: 'image/png',
      cid: 'qrcode@karatecup' // Content ID for inline reference
    });
  }

  return {
    subject: "🥋 Registration Confirmed - Karate Cup 2025",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6; 
            color: #1f2937; 
            background: #f3f4f6;
            padding: 20px;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          .email-wrapper { 
            max-width: 600px; 
            margin: 0 auto; 
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          }
          .header { 
            background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #6366f1 100%);
            color: white; 
            padding: 50px 30px;
            text-align: center;
            position: relative;
            overflow: hidden;
          }
          .success-badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 80px;
            height: 80px;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            border-radius: 50%;
            margin-bottom: 20px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            position: relative;
            z-index: 1;
          }
          .checkmark {
            font-size: 48px;
          }
          .header h1 { 
            font-size: 32px; 
            font-weight: 700; 
            margin-bottom: 10px;
            position: relative;
            z-index: 1;
          }
          .header p { 
            font-size: 16px; 
            opacity: 0.95;
            position: relative;
            z-index: 1;
          }
          .content { 
            padding: 40px 30px;
          }
          .greeting {
            font-size: 18px;
            color: #1f2937;
            margin-bottom: 20px;
            font-weight: 600;
          }
          .intro-text {
            color: #4b5563;
            margin-bottom: 30px;
            font-size: 15px;
          }
          .qr-section {
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            border: 2px solid #3b82f6;
            border-radius: 16px;
            padding: 30px;
            margin: 30px 0;
            text-align: center;
          }
          .qr-section h3 {
            color: #1e40af;
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 15px;
          }
          .qr-section p {
            color: #4b5563;
            font-size: 14px;
            margin-bottom: 20px;
          }
          .qr-code-container {
            background: white;
            border-radius: 12px;
            padding: 20px;
            display: inline-block;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            max-width: 100%;
          }
          .qr-code-container img {
            display: block;
            width: 250px;
            height: 250px;
            margin: 0 auto;
            max-width: 100%;
            height: auto;
          }
          .qr-instructions {
            background: #fef3c7;
            border-left: 4px solid #f59e0b;
            border-radius: 8px;
            padding: 15px;
            margin-top: 20px;
            text-align: left;
            font-size: 13px;
            color: #92400e;
          }
          .attachment-note {
            background: #dbeafe;
            border-left: 4px solid #3b82f6;
            border-radius: 8px;
            padding: 15px;
            margin-top: 15px;
            text-align: left;
            font-size: 13px;
            color: #1e40af;
          }
          .amount-highlight {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            text-align: center;
            margin: 25px 0;
            box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.3);
          }
          .amount-highlight .label {
            font-size: 12px;
            opacity: 0.9;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 5px;
          }
          .amount-highlight .value {
            font-size: 32px;
            font-weight: 700;
          }
          .info-card {
            background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
            border-radius: 12px;
            padding: 25px;
            margin: 25px 0;
            border: 1px solid #e5e7eb;
            position: relative;
            overflow: hidden;
          }
          .info-card::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background: linear-gradient(180deg, #3b82f6 0%, #6366f1 100%);
          }
          .info-card h3 {
            color: #1e40af;
            font-size: 16px;
            font-weight: 700;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .info-row {
            display: flex;
            justify-content: space-between;
            padding: 12px 0;
            border-bottom: 1px solid #e5e7eb;
          }
          .info-row:last-child {
            border-bottom: none;
          }
          .info-label {
            color: #6b7280;
            font-size: 14px;
            font-weight: 500;
          }
          .info-value {
            color: #1f2937;
            font-size: 14px;
            font-weight: 600;
            text-align: right;
            word-break: break-word;
          }
          .events-section {
            background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
            border-radius: 12px;
            padding: 25px;
            margin: 25px 0;
            border: 1px solid #bfdbfe;
          }
          .events-section h3 {
            color: #1e40af;
            font-size: 16px;
            font-weight: 700;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .event-tag {
            background: white;
            color: #1e40af;
            padding: 10px 16px;
            margin: 8px 8px 8px 0;
            border-radius: 8px;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            font-weight: 600;
            border: 2px solid #3b82f6;
            box-shadow: 0 2px 4px rgba(59, 130, 246, 0.1);
          }
          .event-tag::before {
            content: '🥋';
            font-size: 16px;
          }
          .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent 0%, #e5e7eb 50%, transparent 100%);
            margin: 30px 0;
          }
          .important-note {
            background: #fef3c7;
            border: 1px solid #fbbf24;
            border-left: 4px solid #f59e0b;
            border-radius: 8px;
            padding: 15px;
            margin: 25px 0;
            font-size: 14px;
            color: #92400e;
          }
          .important-note strong {
            display: block;
            margin-bottom: 5px;
            color: #78350f;
          }
          .contact-section {
            background: #f9fafb;
            border-radius: 12px;
            padding: 20px;
            margin: 25px 0;
            text-align: center;
          }
          .contact-section h4 {
            color: #1f2937;
            font-size: 15px;
            margin-bottom: 10px;
          }
          .contact-section p {
            color: #6b7280;
            font-size: 14px;
            margin: 5px 0;
          }
          .contact-section a {
            color: #3b82f6;
            text-decoration: none;
            font-weight: 600;
          }
          .footer {
            background: #1f2937;
            color: #9ca3af;
            padding: 30px;
            text-align: center;
            font-size: 13px;
          }
          .footer p {
            margin: 8px 0;
          }
          .footer-logo {
            font-size: 24px;
            margin-bottom: 10px;
          }
          @media only screen and (max-width: 600px) {
            body { padding: 10px; }
            .header { padding: 35px 20px; }
            .content { padding: 25px 20px; }
            .header h1 { font-size: 24px; }
            .header p { font-size: 15px; }
            .success-badge { 
              width: 70px; 
              height: 70px;
              margin-bottom: 15px;
            }
            .checkmark { font-size: 40px; }
            .greeting { font-size: 17px; }
            .intro-text { font-size: 14px; }
            .amount-highlight { 
              padding: 12px 16px;
              margin: 20px 0;
            }
            .amount-highlight .value { font-size: 28px; }
            .info-card { 
              padding: 20px;
              margin: 20px 0;
            }
            .info-card h3 { font-size: 15px; }
            .info-row { 
              flex-direction: column; 
              gap: 4px;
              padding: 10px 0;
            }
            .info-value { text-align: left; }
            .events-section { 
              padding: 20px;
              margin: 20px 0;
            }
            .event-tag { 
              margin: 6px 6px 6px 0;
              padding: 8px 12px;
              font-size: 13px;
            }
            .qr-section { 
              padding: 20px;
              margin: 20px 0;
            }
            .qr-section h3 { font-size: 16px; }
            .qr-code-container { 
              padding: 15px;
            }
            .qr-code-container img { 
              width: 100%;
              max-width: 220px;
            }
            .qr-instructions, .attachment-note, .important-note {
              font-size: 12px;
              padding: 12px;
            }
            .contact-section {
              padding: 18px;
              margin: 20px 0;
            }
            .contact-section h4 { font-size: 14px; }
            .contact-section p { font-size: 13px; }
            .footer { padding: 25px 20px; }
          }
          @media only screen and (max-width: 480px) {
            body { padding: 0; background: white; }
            .email-wrapper { 
              border-radius: 0; 
              box-shadow: none;
            }
            .header { padding: 30px 16px; }
            .content { padding: 20px 16px; }
            .header h1 { font-size: 22px; }
            .success-badge { 
              width: 65px; 
              height: 65px;
            }
            .checkmark { font-size: 36px; }
            .qr-section { padding: 16px; }
            .info-card { padding: 16px; }
            .events-section { padding: 16px; }
          }
        </style>
      </head>
      <body>
        <div class="email-wrapper">
          <div class="header">
            <div class="success-badge">
              <div class="checkmark">🥋</div>
            </div>
            <h1>Registration Confirmed!</h1>
            <p>Welcome to Karate Cup 2025</p>
          </div>

          <div class="content">
            <p class="greeting">Dear ${customerName || 'Participant'},</p>
            <p class="intro-text">
              Congratulations! Your registration for <strong>Karate Cup 2025</strong> has been successfully confirmed. Get ready to showcase your skills and compete with the best martial artists! 🥋
            </p>

            <div class="qr-section">
              <h3>🎟️ Your Registration QR Code</h3>
              <p>Present this QR code at the venue for check-in</p>
              <div class="qr-code-container">
                <img src="cid:qrcode@karatecup" alt="Registration QR Code" />
              </div>
              <div class="qr-instructions">
                <strong>📌 Important:</strong> Save this QR code on your phone or print it out. You'll need to present it at the registration desk during check-in at the venue.
              </div>
              <div class="attachment-note">
                <strong>💾 Download Your QR Code:</strong> Your QR code is also attached to this email as a separate file. You can save it to your phone or print it for easy access at the venue.
              </div>
            </div>

            <div class="amount-highlight">
              <div class="label">Total Amount Paid</div>
              <div class="value">${currency === 'INR' ? '₹' : '$'}${parseFloat(amount).toLocaleString(currency === 'INR' ? 'en-IN' : 'en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            </div>

            <div class="info-card">
              <h3>💳 Payment Information</h3>
              <div class="info-row">
                <span class="info-label">Amount Paid</span>
                <span class="info-value">${currency === 'INR' ? '₹' : '$'}${parseFloat(amount).toLocaleString(currency === 'INR' ? 'en-IN' : 'en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Payment Method</span>
                <span class="info-value">${paymentMethod}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Transaction ID</span>
                <span class="info-value">${paymentId}</span>
              </div>
              ${orderId ? `
              <div class="info-row">
                <span class="info-label">Order Reference</span>
                <span class="info-value">${orderId}</span>
              </div>
              ` : ''}
              <div class="info-row">
                <span class="info-label">Payment Status</span>
                <span class="info-value" style="color: #10b981;">✓ Confirmed</span>
              </div>
              <div class="info-row">
                <span class="info-label">Date & Time</span>
                <span class="info-value">${new Date().toLocaleString('en-US', { 
                  dateStyle: 'medium', 
                  timeStyle: 'short' 
                })}</span>
              </div>
            </div>

            <div class="info-card">
              <h3>📋 Registration Details</h3>
              <div class="info-row">
                <span class="info-label">Participant Name</span>
                <span class="info-value">${customerName || 'N/A'}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Email</span>
                <span class="info-value">${customerEmail}</span>
              </div>
              ${registrationData?.category ? `
              <div class="info-row">
                <span class="info-label">Category</span>
                <span class="info-value">${registrationData.category}</span>
              </div>
              ` : ''}
              ${registrationData?.dojoName ? `
              <div class="info-row">
                <span class="info-label">Dojo Name</span>
                <span class="info-value">${registrationData.dojoName}</span>
              </div>
              ` : ''}
              ${registrationData?.masterName ? `
              <div class="info-row">
                <span class="info-label">Master Name</span>
                <span class="info-value">${registrationData.masterName}</span>
              </div>
              ` : ''}
            </div>

            ${registrationData?.selectedEvents?.length ? `
            <div class="events-section">
              <h3>🏆 Registered Events</h3>
              <div>
                ${registrationData.selectedEvents.map(event => `
                  <span class="event-tag">${event}</span>
                `).join('')}
              </div>
            </div>
            ` : ''}

            <div class="divider"></div>

            <div class="important-note">
              <strong>📌 Event Information</strong>
              Please arrive at least 30 minutes before your scheduled event time. Present your QR code at the registration desk during check-in. Tournament schedule, venue details, and rules will be sent closer to the event date. Make sure to bring valid ID proof for verification.
            </div>

            <div class="contact-section">
              <h4>Need Help?</h4>
              <p>If you have any questions or concerns, we're here to help!</p>
              <p>Email: <a href="mailto:eowviniitb@gmail.com">eowviniitb@gmail.com</a></p>
            </div>
          </div>

          <div class="footer">
            <div class="footer-logo">🥋</div>
            <p><strong>Karate Cup 2025</strong></p>
            <p>Organized by Excellence of World Foundation</p>
            <div class="divider" style="background: rgba(255,255,255,0.1); margin: 20px 0;"></div>
            <p style="font-size: 12px; opacity: 0.8;">
              This is an automated confirmation email. Please do not reply to this message.<br>
              For support, contact us at eowviniitb@gmail.com
            </p>
            <p style="margin-top: 15px; font-size: 11px; opacity: 0.7;">
              © 2025 Karate Cup. All rights reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
🥋 REGISTRATION CONFIRMED - KARATE CUP 2025

Dear ${customerName || 'Participant'},

Congratulations! Your registration for Karate Cup 2025 has been successfully confirmed.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💰 AMOUNT PAID: ${currency.toUpperCase()} ${parseFloat(amount).toFixed(2)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PAYMENT INFORMATION:
• Amount Paid: ${currency === 'INR' ? '₹' : '$'}${parseFloat(amount).toFixed(2)}
• Payment Method: ${paymentMethod}
• Transaction ID: ${paymentId}
${orderId ? `• Order Reference: ${orderId}` : ''}
• Payment Status: ✓ Confirmed
• Date & Time: ${new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}

REGISTRATION DETAILS:
• Participant: ${customerName || 'N/A'}
• Email: ${customerEmail}
${registrationData?.category ? `• Category: ${registrationData.category}` : ''}
${registrationData?.dojoName ? `• Dojo Name: ${registrationData.dojoName}` : ''}
${registrationData?.masterName ? `• Master Name: ${registrationData.masterName}` : ''}

${registrationData?.selectedEvents?.length ? `
REGISTERED EVENTS:
${registrationData.selectedEvents.map(event => `  🏆 ${event}`).join('\n')}
` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 IMPORTANT:
Please save this email and present your QR code (attached) at the registration desk during check-in. Arrive at least 30 minutes before your scheduled event time.

💾 Your QR code is attached to this email as a PNG file.

Need help? Contact us at: eowviniitb@gmail.com

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Karate Cup 2025
© 2025 All rights reserved
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `,
    attachments: attachments
  };
};