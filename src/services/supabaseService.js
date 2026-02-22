// =============================================
// FILE: src/services/supabaseService.js
// Complete Service Layer for Database Operations
// =============================================

import { supabase } from '../supabaseClient';

// Cache for event categories to reduce database calls
let eventCategoriesCache = null;
let eventCategoriesCacheTime = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Cache for discounts
let discountsCache = null;
let discountsCacheTime = null;

// Cache for spectator settings
let spectatorSettingsCache = null;
let spectatorSettingsCacheTime = null;

// =============================================
// HELPER FUNCTION
// =============================================

const handleSupabaseError = (error) => {
  console.error('Supabase error:', error);
  if (error.code === 'PGRST116') {
    return 'No data found';
  }
  return error.message || 'An unexpected error occurred';
};

// =============================================
// CHECK-IN FUNCTIONS (NEW)
// =============================================

/**
 * Update participant registration check-in status
 * @param {string} registrationId - The registration ID
 * @param {boolean} checkInStatus - True for checked in, false for not checked in
 * @returns {Promise<Object>} Updated registration data
 */
export const updateParticipantCheckIn = async (registrationId, checkInStatus) => {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .update({ 
        check_in: checkInStatus, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', registrationId)
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      sex: data.sex,
      age: data.age,
      countryCode: data.country_code,
      contact: data.contact,
      whatsappCountryCode: data.whatsapp_country_code,
      whatsappNumber: data.whatsapp_number,
      addressLine1: data.address_line1,
      addressLine2: data.address_line2,
      postalCode: data.postal_code,
      country: data.country,
      address: data.address,
      height: data.height,
      heightUnit: data.height_unit,
      weight: data.weight,
      weightUnit: data.weight_unit,
      dojoName: data.dojo_name,
      masterName: data.master_name,
      belt: data.belt,
      category: data.category,
      ailment: data.ailment,
      selectedEvents: data.selected_events,
      currency: data.currency,
      basePrice: parseFloat(data.base_price),
      discountPercentage: data.discount_percentage,
      discountAmount: parseFloat(data.discount_amount || 0),
      discountLabel: data.discount_label,
      subtotal: parseFloat(data.subtotal),
      gst: parseFloat(data.gst),
      totalCost: parseFloat(data.total_cost),
      paymentStatus: data.payment_status,
      check_in: data.check_in,
      dateOfEnrolment: data.date_of_enrolment,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  } catch (error) {
    console.error('Error updating participant check-in:', error);
    throw new Error(handleSupabaseError(error));
  }
};

/**
 * Update spectator ticket check-in status
 * @param {string} ticketId - The ticket ID
 * @param {boolean} checkInStatus - True for checked in, false for not checked in
 * @returns {Promise<Object>} Updated ticket data
 */
export const updateSpectatorCheckIn = async (ticketId, checkInStatus) => {
  try {
    const { data, error } = await supabase
      .from('spectator_tickets')
      .update({ 
        check_in: checkInStatus, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', ticketId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating spectator check-in:', error);
    throw new Error(handleSupabaseError(error));
  }
};

/**
 * Get all checked-in participants
 * @returns {Promise<Array>} Array of checked-in participants
 */
export const getCheckedInParticipants = async () => {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .eq('check_in', true)
      .eq('payment_status', 'paid')
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching checked-in participants:', error);
    throw new Error(handleSupabaseError(error));
  }
};

/**
 * Get all checked-in spectators
 * @returns {Promise<Array>} Array of checked-in spectator tickets
 */
export const getCheckedInSpectators = async () => {
  try {
    const { data, error } = await supabase
      .from('spectator_tickets')
      .select('*')
      .eq('check_in', true)
      .or('payment_status.eq.paid,is_complimentary.eq.true')
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching checked-in spectators:', error);
    throw new Error(handleSupabaseError(error));
  }
};

/**
 * Get check-in statistics
 * @returns {Promise<Object>} Check-in stats
 */
export const getCheckInStats = async () => {
  try {
    // Get participant stats
    const { data: participantStats, error: pError } = await supabase
      .from('registrations')
      .select('check_in, payment_status')
      .eq('payment_status', 'paid');

    if (pError) throw pError;

    // Get spectator stats
    const { data: spectatorStats, error: sError } = await supabase
      .from('spectator_tickets')
      .select('check_in, payment_status, is_complimentary')
      .or('payment_status.eq.paid,is_complimentary.eq.true');

    if (sError) throw sError;

    const participantCheckedIn = participantStats.filter(p => p.check_in).length;
    const participantTotal = participantStats.length;
    
    const spectatorCheckedIn = spectatorStats.filter(s => s.check_in).length;
    const spectatorTotal = spectatorStats.length;

    return {
      participants: {
        checkedIn: participantCheckedIn,
        total: participantTotal,
        percentage: participantTotal > 0 ? ((participantCheckedIn / participantTotal) * 100).toFixed(1) : 0
      },
      spectators: {
        checkedIn: spectatorCheckedIn,
        total: spectatorTotal,
        percentage: spectatorTotal > 0 ? ((spectatorCheckedIn / spectatorTotal) * 100).toFixed(1) : 0
      },
      total: {
        checkedIn: participantCheckedIn + spectatorCheckedIn,
        total: participantTotal + spectatorTotal,
        percentage: (participantTotal + spectatorTotal) > 0 ? 
          (((participantCheckedIn + spectatorCheckedIn) / (participantTotal + spectatorTotal)) * 100).toFixed(1) : 0
      }
    };
  } catch (error) {
    console.error('Error fetching check-in stats:', error);
    throw new Error(handleSupabaseError(error));
  }
};

// =============================================
// SEAT AVAILABILITY CHECK
// =============================================

export const checkSeatAvailability = async (requestedTickets) => {
  try {
    const { data, error } = await supabase
      .rpc('check_seat_availability', { requested_tickets: requestedTickets });

    if (error) throw error;

    const result = data[0];
    
    return {
      available: result.available,
      seatsAvailable: result.seats_available,
      message: result.message,
    };
  } catch (error) {
    console.error('Error checking seat availability:', error);
    throw new Error(handleSupabaseError(error));
  }
};

// =============================================
// GET SPECTATOR TICKETS BY PHONE
// =============================================

export const getSpectatorTicketsByPhone = async (countryCode, phoneNumber) => {
  try {
    // Try multiple phone number formats to improve matching
    const phoneVariations = [
      phoneNumber,
      `${countryCode}${phoneNumber}`,
      `${countryCode} ${phoneNumber}`,
      phoneNumber.replace(/^0+/, ''),
    ];

    const { data, error } = await supabase
      .from('spectator_tickets')
      .select('*')
      .or(phoneVariations.map(p => `contact.eq.${p}`).join(','))
      .order('created_at', { ascending: false });

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    console.log('Fetched spectator tickets:', data);
    return data || [];
  } catch (error) {
    console.error('Error fetching spectator tickets by phone:', error);
    return [];
  }
};

// =============================================
// GET CURRENT SEAT STATUS
// =============================================

export const getCurrentSeatStatus = async () => {
  try {
    const { data, error } = await supabase
      .from('spectator_settings')
      .select('total_seats, seats_sold, seats_available')
      .single();

    if (error) throw error;

    return {
      totalSeats: data.total_seats,
      seatsSold: data.seats_sold,
      seatsAvailable: data.seats_available,
    }; 
  } catch (error) {
    console.error('Error fetching seat status:', error);
    throw new Error(handleSupabaseError(error));
  }
};

// =============================================
// EVENT CATEGORIES & SUB-EVENTS
// =============================================

export const getEventCategories = async (forceRefresh = false) => {
  try {
    const now = Date.now();
    if (!forceRefresh && eventCategoriesCache && eventCategoriesCacheTime && 
        (now - eventCategoriesCacheTime < CACHE_DURATION)) {
      console.log('Using cached event categories');
      return eventCategoriesCache;
    }

    console.log('Fetching event categories from database');

    const { data: categories, error: catError } = await supabase
      .from('event_categories')
      .select('*')
      .order('id');

    if (catError) throw catError;

    const { data: subEvents, error: subError } = await supabase
      .from('sub_events')
      .select('*')
      .order('id');

    if (subError) throw subError;

    const { data: junctions, error: juncError } = await supabase
      .from('event_category_sub_events')
      .select('*');

    if (juncError) throw juncError;

    const transformedCategories = categories.map(category => {
      const categorySubEventIds = junctions
        .filter(j => j.event_category_id === category.id)
        .map(j => j.sub_event_id);
      
      const categorySubEvents = subEvents
        .filter(se => categorySubEventIds.includes(se.id))
        .map(se => ({
          id: se.id,
          name: se.name,
          description: se.description,
          price: parseFloat(se.price),
        }));

      return {
        id: category.id,
        name: category.name,
        description: category.description,
        comboPrice: parseFloat(category.combo_price),
        events: categorySubEvents,
      };
    });

    eventCategoriesCache = transformedCategories;
    eventCategoriesCacheTime = now;

    return transformedCategories;
  } catch (error) {
    console.error('Error fetching event categories:', error);
    throw new Error(handleSupabaseError(error));
  }
};

// =============================================
// DISCOUNTS
// =============================================

export const getActiveDiscounts = async (forceRefresh = false) => {
  try {
    const now = Date.now();
    if (!forceRefresh && discountsCache && discountsCacheTime && 
        (now - discountsCacheTime < CACHE_DURATION)) {
      console.log('Using cached discounts');
      return discountsCache;
    }

    console.log('Fetching discounts from database');

    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('discounts')
      .select('*')
      .eq('is_active', true)
      .lte('start_date', today)
      .gte('end_date', today)
      .order('percentage', { ascending: false });

    if (error) throw error;

    const transformedDiscounts = data.map(discount => ({
      label: discount.label,
      percentage: discount.percentage,
      startDate: discount.start_date,
      endDate: discount.end_date,
    }));

    discountsCache = transformedDiscounts;
    discountsCacheTime = now;

    return transformedDiscounts;
  } catch (error) {
    console.error('Error fetching discounts:', error);
    return [];
  }
};

// =============================================
// SPECTATOR SETTINGS
// =============================================

export const getSpectatorSettings = async (forceRefresh = false) => {
  try {
    const now = Date.now();
    if (!forceRefresh && spectatorSettingsCache && spectatorSettingsCacheTime && 
        (now - spectatorSettingsCacheTime < CACHE_DURATION)) {
      console.log('Using cached spectator settings');
      return spectatorSettingsCache;
    }

    console.log('Fetching spectator settings from database');

    const { data, error } = await supabase
      .from('spectator_settings')
      .select('*')
      .single();

    if (error) throw error;

    const settings = {
      price: parseFloat(data.price),
      taxRate: parseFloat(data.tax_rate),
      maxTicketsPerPurchase: data.max_tickets_per_purchase,
      benefits: data.benefits || [],
    };

    spectatorSettingsCache = settings;
    spectatorSettingsCacheTime = now;

    return settings;
  } catch (error) {
    console.error('Error fetching spectator settings:', error);
    return {
      price: 200,
      taxRate: 0.18,
      maxTicketsPerPurchase: 10,
      benefits: [
        "Access to all tournament days",
        "Premium seating area",
        "Event program booklet",
        "Complimentary food & refreshments"
      ],
    };
  }
};

// =============================================
// REGISTRATIONS
// =============================================

export const createRegistration = async (registrationData) => {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .insert([{
        name: registrationData.name,
        email: registrationData.email,
        sex: registrationData.sex,
        age: registrationData.age,
        country_code: registrationData.countryCode,
        contact: registrationData.contact,
        whatsapp_country_code: registrationData.whatsappCountryCode,
        whatsapp_number: registrationData.whatsappNumber,
        address_line1: registrationData.addressLine1,
        address_line2: registrationData.addressLine2,
        postal_code: registrationData.postalCode,
        country: registrationData.country,
        address: registrationData.address,
        height: registrationData.height,
        height_unit: registrationData.heightUnit,
        weight: registrationData.weight,
        weight_unit: registrationData.weightUnit,
        dojo_name: registrationData.dojoName,
        master_name: registrationData.masterName,
        belt: registrationData.belt,
        category: registrationData.category,
        ailment: registrationData.ailment,
        selected_events: registrationData.selectedEvents,
        currency: registrationData.currency,
        base_price: registrationData.basePrice,
        discount_percentage: registrationData.discountPercentage || 0,
        discount_amount: registrationData.discountAmount || 0,
        discount_label: registrationData.discountLabel || null,
        subtotal: registrationData.subtotal,
        gst: registrationData.gst,
        total_cost: registrationData.totalCost,
        payment_status: registrationData.paymentStatus || 'pending',
        razorpay_order_id: registrationData.razorpay_order_id || null,
        razorpay_payment_id: registrationData.razorpay_payment_id || null,
        date_of_enrolment: new Date().toISOString().split('T')[0],
        check_in: false, // Default to not checked in
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating registration:', error);
    throw new Error(handleSupabaseError(error));
  }
};

export const getRegistrationByPhone = async (countryCode, phoneNumber) => {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .eq('country_code', countryCode)
      .eq('contact', phoneNumber)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw error;
    }

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      sex: data.sex,
      age: data.age,
      countryCode: data.country_code,
      contact: data.contact,
      whatsappCountryCode: data.whatsapp_country_code,
      whatsappNumber: data.whatsapp_number,
      addressLine1: data.address_line1,
      addressLine2: data.address_line2,
      postalCode: data.postal_code,
      country: data.country,
      address: data.address,
      height: data.height,
      heightUnit: data.height_unit,
      weight: data.weight,
      weightUnit: data.weight_unit,
      dojoName: data.dojo_name,
      masterName: data.master_name,
      belt: data.belt,
      category: data.category,
      ailment: data.ailment,
      selectedEvents: data.selected_events,
      currency: data.currency,
      basePrice: parseFloat(data.base_price),
      discountPercentage: data.discount_percentage,
      discountAmount: parseFloat(data.discount_amount || 0),
      discountLabel: data.discount_label,
      subtotal: parseFloat(data.subtotal),
      gst: parseFloat(data.gst),
      totalCost: parseFloat(data.total_cost),
      paymentStatus: data.payment_status,
      check_in: data.check_in || false,
      dateOfEnrolment: data.date_of_enrolment,
      createdAt: data.created_at,
    };
  } catch (error) {
    console.error('Error fetching registration:', error);
    throw new Error(handleSupabaseError(error));
  }
};

export const updateRegistration = async (registrationId, updateData) => {
  try {
    const dbData = {
      sex: updateData.sex,
      age: updateData.age,
      height: updateData.height,
      height_unit: updateData.heightUnit,
      weight: updateData.weight,
      weight_unit: updateData.weightUnit,
      whatsapp_number: updateData.whatsappNumber,
      dojo_name: updateData.dojoName,
      master_name: updateData.masterName,
      address: updateData.address,
      address_line1: updateData.addressLine1,
      address_line2: updateData.addressLine2,
      postal_code: updateData.postalCode,
      belt: updateData.belt,
      ailment: updateData.ailment,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('registrations')
      .update(dbData)
      .eq('id', registrationId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating registration:', error);
    throw new Error(handleSupabaseError(error));
  }
};

export const updateRegistrationPaymentStatus = async (registrationId, paymentData) => {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .update({
        payment_status: 'paid',
        razorpay_payment_id: paymentData.razorpay_payment_id,
        razorpay_order_id: paymentData.razorpay_order_id,
        updated_at: new Date().toISOString(),
      })
      .eq('id', registrationId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating payment status:', error);
    throw new Error(handleSupabaseError(error));
  }
};

export const deleteRegistration = async (registrationId) => {
  try {
    const { error } = await supabase
      .from('registrations')
      .delete()
      .eq('id', registrationId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting registration:', error);
    throw new Error(handleSupabaseError(error));
  }
};

// =============================================
// SPECTATOR TICKETS
// =============================================

export const createSpectatorTicket = async (ticketData) => {
  try {
    const { data, error } = await supabase
      .from('spectator_tickets')
      .insert([{
        name: ticketData.name,
        email: ticketData.email,
        age: ticketData.age ? parseInt(ticketData.age) : null,
        contact: ticketData.contact,
        whatsapp_number: ticketData.whatsappNumber,
        ticket_quantity: ticketData.ticketQuantity,
        ticket_type: ticketData.ticketType || 'Spectator - Regular',
        is_complimentary: ticketData.isComplimentary || false,
        benefit_reason: ticketData.benefitReason || null,
        currency: ticketData.currency,
        base_price: ticketData.basePrice,
        tax: ticketData.tax,
        total_amount: ticketData.totalAmount,
        payment_status: ticketData.paymentStatus || 'pending',
        payment_method: ticketData.paymentMethod || null,
        razorpay_order_id: ticketData.razorpay_order_id || null,
        razorpay_payment_id: ticketData.razorpay_payment_id || null,
        participant_registration_id: ticketData.participantRegistrationId || null,
        participant_name: ticketData.participantName || null,
        participant_email: ticketData.participantEmail || null,
        email_sent: ticketData.emailSent || false,
        check_in: false, // Default to not checked in
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating spectator ticket:', error);
    throw new Error(handleSupabaseError(error));
  }
};

// =============================================
// SETTINGS
// =============================================

export const getAdminPassword = async () => {
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'admin_password')
      .single();

    if (error) throw error;
    return data.value.password;
  } catch (error) {
    console.error('Error fetching admin password:', error);
    throw new Error(handleSupabaseError(error));
  }
};

// =============================================
// UTILITY
// =============================================

export const clearAllCaches = () => {
  eventCategoriesCache = null;
  eventCategoriesCacheTime = null;
  discountsCache = null;
  discountsCacheTime = null;
  spectatorSettingsCache = null;
  spectatorSettingsCacheTime = null;
  console.log('All caches cleared');
};