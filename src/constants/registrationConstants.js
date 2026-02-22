// ==================== COUNTRY CODES WITH VALIDATION ====================
export const countryCodes = [
  { name: "India", code: "+91", flag: "🇮🇳", phoneLength: 10, format: "XXXXXXXXXX" },
  { name: "United States", code: "+1", flag: "🇺🇸", phoneLength: 10, format: "XXX-XXX-XXXX" },
  { name: "United Kingdom", code: "+44", flag: "🇬🇧", phoneLength: 10, format: "XXXX XXXXXX" },
  { name: "Canada", code: "+1", flag: "🇨🇦", phoneLength: 10, format: "XXX-XXX-XXXX" },
  { name: "Australia", code: "+61", flag: "🇦🇺", phoneLength: 9, format: "XXX XXX XXX" },
  { name: "Germany", code: "+49", flag: "🇩🇪", phoneLength: 10, format: "XXX XXXXXXX" },
  { name: "France", code: "+33", flag: "🇫🇷", phoneLength: 9, format: "X XX XX XX XX" },
  { name: "Japan", code: "+81", flag: "🇯🇵", phoneLength: 10, format: "XX-XXXX-XXXX" },
  { name: "China", code: "+86", flag: "🇨🇳", phoneLength: 11, format: "XXX XXXX XXXX" },
  { name: "South Korea", code: "+82", flag: "🇰🇷", phoneLength: 10, format: "XX-XXXX-XXXX" },
  { name: "Singapore", code: "+65", flag: "🇸🇬", phoneLength: 8, format: "XXXX XXXX" },
  { name: "UAE", code: "+971", flag: "🇦🇪", phoneLength: 9, format: "XX XXX XXXX" },
  { name: "Saudi Arabia", code: "+966", flag: "🇸🇦", phoneLength: 9, format: "XX XXX XXXX" },
  { name: "Pakistan", code: "+92", flag: "🇵🇰", phoneLength: 10, format: "XXX XXXXXXX" },
  { name: "Bangladesh", code: "+880", flag: "🇧🇩", phoneLength: 10, format: "XXXX-XXXXXX" },
  { name: "Sri Lanka", code: "+94", flag: "🇱🇰", phoneLength: 9, format: "XX XXX XXXX" },
  { name: "Nepal", code: "+977", flag: "🇳🇵", phoneLength: 10, format: "XXX-XXXXXXX" },
  { name: "Malaysia", code: "+60", flag: "🇲🇾", phoneLength: 9, format: "XX-XXX XXXX" },
  { name: "Indonesia", code: "+62", flag: "🇮🇩", phoneLength: 10, format: "XXX-XXX-XXXX" },
  { name: "Thailand", code: "+66", flag: "🇹🇭", phoneLength: 9, format: "XX-XXX-XXXX" },
];

// ==================== COUNTRIES LIST WITH POSTAL CODE FORMATS ====================
export const countries = [
  { name: "India", flag: "🇮🇳", hasPostalCode: true, postalCodeFormat: "6 digits", postalCodePattern: /^\d{6}$/, example: "400001" },
  { name: "United States", flag: "🇺🇸", hasPostalCode: true, postalCodeFormat: "5 digits (ZIP)", postalCodePattern: /^\d{5}(-\d{4})?$/, example: "10001" },
  { name: "United Kingdom", flag: "🇬🇧", hasPostalCode: true, postalCodeFormat: "UK Postcode", postalCodePattern: /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i, example: "SW1A 1AA" },
  { name: "Canada", flag: "🇨🇦", hasPostalCode: true, postalCodeFormat: "A1A 1A1", postalCodePattern: /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i, example: "M5H 2N2" },
  { name: "Australia", flag: "🇦🇺", hasPostalCode: true, postalCodeFormat: "4 digits", postalCodePattern: /^\d{4}$/, example: "2000" },
  { name: "Germany", flag: "🇩🇪", hasPostalCode: true, postalCodeFormat: "5 digits", postalCodePattern: /^\d{5}$/, example: "10115" },
  { name: "France", flag: "🇫🇷", hasPostalCode: true, postalCodeFormat: "5 digits", postalCodePattern: /^\d{5}$/, example: "75001" },
  { name: "Japan", flag: "🇯🇵", hasPostalCode: true, postalCodeFormat: "7 digits", postalCodePattern: /^\d{3}-?\d{4}$/, example: "100-0001" },
  { name: "China", flag: "🇨🇳", hasPostalCode: true, postalCodeFormat: "6 digits", postalCodePattern: /^\d{6}$/, example: "100000" },
  { name: "South Korea", flag: "🇰🇷", hasPostalCode: true, postalCodeFormat: "5 digits", postalCodePattern: /^\d{5}$/, example: "03086" },
  { name: "Singapore", flag: "🇸🇬", hasPostalCode: true, postalCodeFormat: "6 digits", postalCodePattern: /^\d{6}$/, example: "018956" },
  { name: "UAE", flag: "🇦🇪", hasPostalCode: false },
  { name: "Saudi Arabia", flag: "🇸🇦", hasPostalCode: true, postalCodeFormat: "5 digits", postalCodePattern: /^\d{5}$/, example: "11564" },
  { name: "Pakistan", flag: "🇵🇰", hasPostalCode: true, postalCodeFormat: "5 digits", postalCodePattern: /^\d{5}$/, example: "44000" },
  { name: "Bangladesh", flag: "🇧🇩", hasPostalCode: true, postalCodeFormat: "4 digits", postalCodePattern: /^\d{4}$/, example: "1000" },
  { name: "Sri Lanka", flag: "🇱🇰", hasPostalCode: true, postalCodeFormat: "5 digits", postalCodePattern: /^\d{5}$/, example: "00100" },
  { name: "Nepal", flag: "🇳🇵", hasPostalCode: true, postalCodeFormat: "5 digits", postalCodePattern: /^\d{5}$/, example: "44600" },
  { name: "Malaysia", flag: "🇲🇾", hasPostalCode: true, postalCodeFormat: "5 digits", postalCodePattern: /^\d{5}$/, example: "50450" },
  { name: "Indonesia", flag: "🇮🇩", hasPostalCode: true, postalCodeFormat: "5 digits", postalCodePattern: /^\d{5}$/, example: "10110" },
  { name: "Thailand", flag: "🇹🇭", hasPostalCode: true, postalCodeFormat: "5 digits", postalCodePattern: /^\d{5}$/, example: "10200" },
];

// ==================== BELT COLORS ====================
export const beltColors = [
  "Colour Belt",
  "Brown Belt",
  "Black (Level 1 and 2)",
  "Black Senior (Level 3 and above)",
];

// ==================== EXCHANGE RATE ====================
// In your registrationConstants.js file

export let INR_TO_USD = 0.012; // Default fallback value

// This function runs immediately when the file is imported
(async () => {
  try {
    const response = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/inr.json');
    const data = await response.json();
    
    if (data && data.inr && data.inr.usd) {
      INR_TO_USD = parseFloat(data.inr.usd.toFixed(4));
      console.log('Exchange rate updated:', INR_TO_USD);
    } else {
      console.warn('Failed to fetch exchange rate, using default');
    }
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    console.warn('Using default exchange rate:', INR_TO_USD);
  }
})();

// ==================== TAX RATES ====================
export const TAX_RATES = {
  INR: {
    rate: 0.18, // 18% GST for India
    label: "GSST (18%)"
  },
  USD: {
    rate: 0.18, // 18% service tax for international participants
    label: "Service Tax (18%)"
  }
};

// ==================== PAYMENT KEYS ====================
export const RAZORPAY_KEY_ID = "rzp_live_RyCMfT5Ef9Vyi9";

// ==================== API URLS ====================
export const API_BASE_URL = "https://api-qsupm6mm7a-uc.a.run.app";