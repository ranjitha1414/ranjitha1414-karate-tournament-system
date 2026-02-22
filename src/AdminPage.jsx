/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import LoginScreen from "./Admin/LoginScreen";
import DashboardHeader from "./Admin/DashboardHeader";
import StatsGrid from "./Admin/StatsGrid";
import SpectatorStatsGrid from "./Admin/SpectatorStatsGrid";
import CurrencyConverter from "./Admin/CurrencyConverter";
import AddCategorySection from "./Admin/AddCategory";
import PricingManagement from "./Admin/PricingManagement";
import SearchFilterBar from "./Admin/SearchFilterBar";
import ParticipantsTable from "./Admin/ParticipantsTable";
import SpectatorTable from "./Admin/SpectatorTable";
import { sub } from "framer-motion/client";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Data states
  const [participants, setParticipants] = useState([]);
  const [spectators, setSpectators] = useState([]);
  const [categories, setCategories] = useState([]);
  const [usdToInrRate, setUsdToInrRate] = useState(83);
  const [activeTab, setActiveTab] = useState("participants");

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Category management states
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  
  // Event management states
  const [addingEventToCategoryId, setAddingEventToCategoryId] = useState(null);
  const [newEventData, setNewEventData] = useState({ name: "", description: "", price: 0 });
  const [deletingCategoryId, setDeletingCategoryId] = useState(null);
  const [deletingEventId, setDeletingEventId] = useState(null);

  // Price editing states
  const [editMode, setEditMode] = useState(false);
  const [editedCategories, setEditedCategories] = useState({});

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        loadParticipants(),
        loadSpectators(),
        loadCategories()
      ]);
    } catch (err) {
      console.error("Error loading data:", err);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

 // Update loadParticipants to include check_in field (around line 80)
const loadParticipants = async () => {
  const { data, error } = await supabase
    .from("registrations")
    .select("*")
    .order("created_at", { ascending: false });
  
  if (error) throw error;
  
  setParticipants(data.map(d => ({
    id: d.id,
    name: d.name,
    email: d.email,
    age: d.age,
    sex: d.sex,
    countryCode: d.country_code,
    contact: d.contact,
    category: d.category,
    selectedEvents: d.selected_events,
    emailSent: d.email_sent,
    currency: d.currency,
    basePrice: parseFloat(d.base_price),
    subTotal: parseFloat(d.subtotal),
    discountPercent: d.discount_percentage ? parseFloat(d.discount_percentage) : 0,
    discountAmount: d.discount_amount ? parseFloat(d.discount_amount) : 0,
    discountLabel: d.discount_label || "",
    totalCost: parseFloat(d.total_cost),
    cost: parseFloat(d.total_cost),
    gst: parseFloat(d.gst),
    paymentStatus: d.payment_status,
    razorpay_order_id: d.razorpay_order_id,
    razorpay_payment_id: d.razorpay_payment_id,
    dateOfEnrolment: d.date_of_enrolment,
    createdAt: d.created_at,
    check_in: d.check_in || false  // ADD THIS LINE
  })));
};

const loadSpectators = async () => {
  const { data, error } = await supabase
    .from("spectator_tickets")
    .select("*")
    .order("created_at", { ascending: false });
  
  if (error) throw error;
  
  setSpectators(data.map(d => ({
    id: d.id,
    name: d.name,
    email: d.email,
    age: d.age,
    contact: d.contact,
    whatsappNumber: d.whatsapp_number,
    ticketQuantity: d.ticket_quantity,
    emailSent: d.email_sent,
    ticketType: d.ticket_type,
    basePrice: parseFloat(d.base_price),
    tax: parseFloat(d.tax),
    totalAmount: parseFloat(d.total_amount),
    paymentStatus: d.payment_status,
    razorpay_order_id: d.razorpay_order_id,
    razorpay_payment_id: d.razorpay_payment_id,
    createdAt: { toDate: () => new Date(d.created_at) },
    check_in: d.check_in || false  // ADD THIS LINE
  })));
};

  const loadCategories = async () => {
    const { data: categories, error: catError } = await supabase
      .from("event_categories")
      .select("*")
      .order("id");
    
    if (catError) throw catError;

    const { data: subEvents, error: subError } = await supabase
      .from("sub_events")
      .select("*")
      .order("id");
    
    if (subError) throw subError;

    const { data: junctions, error: juncError } = await supabase
      .from("event_category_sub_events")
      .select("*");
    
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

    setCategories(transformedCategories);
  };

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase
        .from("settings")
        .select("value")
        .eq("key", "admin_password")
        .single();
      
      if (error) throw error;
      
      const adminPwd = data.value.password;
      if (loginPassword === adminPwd) {
        setIsAuthenticated(true);
        setError("");
      } else {
        setError("Invalid password");
      }
    } catch (err) {
      setError("Failed to verify password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginPassword("");
  };

  const calculateStats = () => {
  // Filter for paid participants only
  const paidParticipants = participants.filter(p => p.paymentStatus === "paid");
  
  const inrParticipants = paidParticipants.filter(p => p.currency === "INR");
  const usdParticipants = paidParticipants.filter(p => p.currency === "USD");
  
  const inrBasePrice = inrParticipants.reduce((sum, p) => sum + p.basePrice, 0);
  const inrTotalWithTax = inrParticipants.reduce((sum, p) => sum + p.totalCost, 0);
  const usdBasePrice = usdParticipants.reduce((sum, p) => sum + p.basePrice, 0);
  const usdTotalWithTax = usdParticipants.reduce((sum, p) => sum + p.totalCost, 0);
  
  const combinedInrBasePrice = inrBasePrice + (usdBasePrice * usdToInrRate);
  const combinedInrTotalWithTax = inrTotalWithTax + (usdTotalWithTax * usdToInrRate);
  
  const paid = paidParticipants.length;
  
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const recentRegistrations = participants.filter(p => 
    new Date(p.createdAt) > sevenDaysAgo
  ).length;
  
  return {
    inrBasePrice: combinedInrBasePrice,
    inrTotalWithTax: combinedInrTotalWithTax,
    usdBasePrice,
    usdTotalWithTax,
    paid,
    recentRegistrations
  };
};
  const calculateSpectatorStats = () => {
    const totalRevenue = spectators
      .filter(s => s.paymentStatus === "paid")
      .reduce((sum, s) => sum + s.totalAmount, 0);
    
    const paid = spectators.filter(s => s.paymentStatus === "paid").length;
    
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentRegistrations = spectators.filter(s => 
      new Date(s.createdAt.toDate()) > sevenDaysAgo
    ).length;
    
    return {
      totalRevenue,
      paid,
      recentRegistrations
    };
  };

  const filteredParticipants = participants.filter(p => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.contact.includes(searchTerm);
    const matchesFilter = filterStatus === "all" || p.paymentStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredSpectators = spectators.filter(s => {
    const matchesSearch = 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.contact.includes(searchTerm);
    const matchesFilter = filterStatus === "all" || s.paymentStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleUpdateParticipantPayment = async (id, updateData) => {
    try {
      const { error } = await supabase
        .from("registrations")
        .update({
          payment_status: updateData.paymentStatus,
          razorpay_payment_id: updateData.razorpay_payment_id,
          total_cost: updateData.totalCost || undefined,
          updated_at: new Date().toISOString()
        })
        .eq("id", id);
      
      if (error) throw error;
      await loadParticipants();
      alert("Payment status updated successfully");
    } catch (err) {
      alert("Failed to update payment: " + err.message);
    }
  };

  const handleUpdateSpectatorPayment = async (id, updateData) => {
    try {
      const { error } = await supabase
        .from("spectator_tickets")
        .update({
          payment_status: updateData.paymentStatus,
          razorpay_payment_id: updateData.razorpay_payment_id,
          updated_at: new Date().toISOString()
        })
        .eq("id", id);
      
      if (error) throw error;
      await loadSpectators();
      alert("Payment status updated successfully");
    } catch (err) {
      alert("Failed to update payment: " + err.message);
    }
  };

  // Resend email handlers
  const handleResendParticipantEmail = async (participant) => {
    try {
      const cat = categories.find(c => c.id === participant.category);
      
      const emailPayload = {
        customerName: participant.name,
        customerEmail: participant.email,
        amount: (participant.totalCost || participant.cost) * 100,
        currency: participant.currency || "INR",
        paymentId: participant.razorpay_payment_id,
        orderId: participant.razorpay_order_id,
        registrationData: {
          name: participant.name,
          email: participant.email,
          age: participant.age,
          contact: participant.contact,
          countryCode: participant.countryCode,
          category: cat?.name || participant.category,
          selectedEvents: participant.selectedEvents,
          basePrice: participant.basePrice,
          totalCost: participant.totalCost || participant.cost,
          currency: participant.currency || "INR"
        },
        paymentMethod: participant.razorpay_payment_id === "cash" ? "Cash" : "Razorpay"
      };

      const response = await fetch("https://api-qsupm6mm7a-uc.a.run.app/resend-participant-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailPayload)
      });

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || "Failed to send email");
      }

      await supabase
        .from("registrations")
        .update({ email_sent: true })
        .eq("id", participant.id);

      await loadParticipants();
      
      return result;
    } catch (error) {
      console.error("Error resending participant email:", error);
      throw error;
    }
  };
const handleUpdateParticipantCheckIn = async (id, updateData) => {
  try {
    const { error } = await supabase
      .from("registrations")
      .update({
        check_in: updateData.check_in,
        updated_at: new Date().toISOString()
      })
      .eq("id", id);
    
    if (error) throw error;
    await loadParticipants();
  } catch (err) {
    console.error("Failed to update check-in:", err);
    throw err;
  }
};

const handleUpdateSpectatorCheckIn = async (id, updateData) => {
  try {
    const { error } = await supabase
      .from("spectator_tickets")
      .update({
        check_in: updateData.check_in,
        updated_at: new Date().toISOString()
      })
      .eq("id", id);
    
    if (error) throw error;
    await loadSpectators();
  } catch (err) {
    console.error("Failed to update check-in:", err);
    throw err;
  }
};

  const handleResendSpectatorEmail = async (spectator) => {
    try {
      const emailPayload = {
        name: spectator.name,
        email: spectator.email,
        totalAmount: spectator.totalAmount,
        currency: "INR",
        razorpay_payment_id: spectator.razorpay_payment_id,
        razorpay_order_id: spectator.razorpay_order_id,
        ticketQuantity: spectator.ticketQuantity.toString(),
        ticketType: spectator.ticketType || "Spectator",
        basePrice: spectator.basePrice,
        tax: spectator.tax,
        paymentStatus: spectator.paymentStatus
      };

      const response = await fetch("https://api-qsupm6mm7a-uc.a.run.app/resend-spectator-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailPayload)
      });

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || "Failed to send email");
      }

      await supabase
        .from("spectator_tickets")
        .update({ email_sent: true })
        .eq("id", spectator.id);

      await loadSpectators();
      
      return result;
    } catch (error) {
      console.error("Error resending spectator email:", error);
      throw error;
    }
  };

  const handleAddCategory = async () => {
    try {
      const { data, error: pwdError } = await supabase
        .from("settings")
        .select("value")
        .eq("key", "admin_password")
        .single();
      
      if (pwdError) throw pwdError;
      if (adminPassword !== data.value.password) {
        setError("Invalid admin password");
        return;
      }

      const categoryId = newCategoryName.toLowerCase().replace(/\s+/g, "_");
      
      const { error } = await supabase
        .from("event_categories")
        .insert([{
          id: categoryId,
          name: newCategoryName,
          description: "",
          combo_price: 6000
        }]);
      
      if (error) throw error;
      
      await loadCategories();
      setShowAddCategory(false);
      setNewCategoryName("");
      setAdminPassword("");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddEvent = async (categoryId) => {
    try {
      const { data, error: pwdError } = await supabase
        .from("settings")
        .select("value")
        .eq("key", "admin_password")
        .single();
      
      if (pwdError) throw pwdError;
      if (adminPassword !== data.value.password) {
        setError("Invalid admin password");
        return;
      }

      const eventId = newEventData.name.toLowerCase().replace(/\s+/g, "_");
      
      const { error: eventError } = await supabase
        .from("sub_events")
        .insert([{
          id: eventId,
          name: newEventData.name,
          description: newEventData.description,
          price: newEventData.price
        }]);
      
      if (eventError) throw eventError;
      
      const { error: junctionError } = await supabase
        .from("event_category_sub_events")
        .insert([{
          event_category_id: categoryId,
          sub_event_id: eventId
        }]);
      
      if (junctionError) throw junctionError;
      
      await loadCategories();
      setAddingEventToCategoryId(null);
      setNewEventData({ name: "", description: "", price: 0 });
      setAdminPassword("");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const { data, error: pwdError } = await supabase
        .from("settings")
        .select("value")
        .eq("key", "admin_password")
        .single();
      
      if (pwdError) throw pwdError;
      if (adminPassword !== data.value.password) {
        setError("Invalid admin password");
        return;
      }

      await supabase
        .from("event_category_sub_events")
        .delete()
        .eq("event_category_id", categoryId);
      
      const { error } = await supabase
        .from("event_categories")
        .delete()
        .eq("id", categoryId);
      
      if (error) throw error;
      
      await loadCategories();
      setDeletingCategoryId(null);
      setAdminPassword("");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteEvent = async (categoryId, eventId) => {
    try {
      const { data, error: pwdError } = await supabase
        .from("settings")
        .select("value")
        .eq("key", "admin_password")
        .single();
      
      if (pwdError) throw pwdError;
      if (adminPassword !== data.value.password) {
        setError("Invalid admin password");
        return;
      }

      await supabase
        .from("event_category_sub_events")
        .delete()
        .eq("sub_event_id", eventId);
      
      const { error } = await supabase
        .from("sub_events")
        .delete()
        .eq("id", eventId);
      
      if (error) throw error;
      
      await loadCategories();
      setDeletingEventId(null);
      setAdminPassword("");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleStartEdit = () => {
    const edited = {};
    categories.forEach(cat => {
      edited[cat.id] = {
        comboPrice: cat.comboPrice,
        events: cat.events.map(e => ({ ...e }))
      };
    });
    setEditedCategories(edited);
    setEditMode(true);
  };

  const handleEventPriceChange = (categoryId, eventId, newPrice) => {
    setEditedCategories(prev => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        events: prev[categoryId].events.map(e =>
          e.id === eventId ? { ...e, price: Number(newPrice) } : e
        )
      }
    }));
  };

  const handleComboPriceChange = (categoryId, newPrice) => {
    setEditedCategories(prev => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        comboPrice: Number(newPrice)
      }
    }));
  };

  const handleSaveAllPrices = async () => {
    try {
      const { data, error: pwdError } = await supabase
        .from("settings")
        .select("value")
        .eq("key", "admin_password")
        .single();
      
      if (pwdError) throw pwdError;
      if (adminPassword !== data.value.password) {
        setError("Invalid admin password");
        return;
      }

      for (const categoryId in editedCategories) {
        const category = editedCategories[categoryId];
        
        await supabase
          .from("event_categories")
          .update({ combo_price: category.comboPrice })
          .eq("id", categoryId);
        
        for (const event of category.events) {
          await supabase
            .from("sub_events")
            .update({ price: event.price })
            .eq("id", event.id);
        }
      }
      
      await loadCategories();
      setEditMode(false);
      setAdminPassword("");
      setError("");
      alert("Prices updated successfully");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedCategories({});
    setAdminPassword("");
    setError("");
  };

  const exportToCSV = () => {
    const data = activeTab === "participants" ? filteredParticipants : filteredSpectators;
    const headers = activeTab === "participants" 
      ? ["Name", "Email", "Contact", "Category", "Events", "Base Price","Sub Total","Discount percent","Discount Amount","Discount Label", "Total", "Currency", "Status", "Razorpay Order ID", "Razorpay Payment ID"]
      : ["Name", "Email", "Contact", "Ticket Type", "Quantity", "Total", "Status"];
    
    const rows = data.map(item => {
      if (activeTab === "participants") {
        return [
          item.name,
          item.email,
          item.contact,
          item.category,
          item.selectedEvents?.join("; "),
          item.basePrice,
          item.subTotal,
          item.discountPercent,
          item.discountAmount,
          item.discountLabel,
          item.totalCost,
          item.currency,
          item.paymentStatus,
          item.razorpay_order_id,
          item.razorpay_payment_id
        ];
      } else {
        return [
          item.name,
          item.email,
          item.contact,
          item.ticketType,
          item.ticketQuantity,
          item.totalAmount,
          item.paymentStatus
        ];
      }
    });
    
    const csv = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${activeTab}-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  if (!isAuthenticated) {
    return (
      <LoginScreen
        onLogin={handleLogin}
        error={error}
        adminPassword={loginPassword}
        setAdminPassword={setLoginPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const stats = calculateStats();
  const spectatorStats = calculateSpectatorStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader onLogout={handleLogout} />
        
        <div className="mb-6">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab("participants")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === "participants"
                  ? "bg-blue-600 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              Participants ({participants.length})
            </button>
            <button
              onClick={() => setActiveTab("spectators")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === "spectators"
                  ? "bg-blue-600 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              Spectators ({spectators.length})
            </button>
            <button
              onClick={() => setActiveTab("categories")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === "categories"
                  ? "bg-blue-600 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              Manage Events
            </button>
          </div>

          {activeTab === "participants" && (
            <>
              <StatsGrid stats={stats} participants={participants} usdToInrRate={usdToInrRate} />
              <CurrencyConverter usdToInrRate={usdToInrRate} setUsdToInrRate={setUsdToInrRate} />
              <SearchFilterBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                onExport={exportToCSV}
                filteredCount={filteredParticipants.length}
                totalCount={participants.length}
              />
            <ParticipantsTable
  participants={filteredParticipants}
  categories={categories}
  usdToInrRate={usdToInrRate}
  onUpdatePaymentStatus={handleUpdateParticipantPayment}
  onResendEmail={handleResendParticipantEmail}
  onUpdateCheckIn={handleUpdateParticipantCheckIn}  // ADD THIS LINE
/>

            </>
          )}

          {activeTab === "spectators" && (
            <>
              <SpectatorStatsGrid stats={spectatorStats} spectators={spectators} />
              <SearchFilterBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                onExport={exportToCSV}
                filteredCount={filteredSpectators.length}
                totalCount={spectators.length}
              />
             <SpectatorTable
  spectators={filteredSpectators}
  onUpdatePaymentStatus={handleUpdateSpectatorPayment}
  onResendEmail={handleResendSpectatorEmail}
  onUpdateCheckIn={handleUpdateSpectatorCheckIn}  // ADD THIS LINE
/>
            </>
          )}

          {activeTab === "categories" && (
            <>
              <AddCategorySection
                showAddCategory={showAddCategory}
                setShowAddCategory={setShowAddCategory}
                newCategoryName={newCategoryName}
                setNewCategoryName={setNewCategoryName}
                adminPassword={adminPassword}
                setAdminPassword={setAdminPassword}
                error={error}
                onAddCategory={handleAddCategory}
              />
              <PricingManagement
                categories={categories}
                editMode={editMode}
                editedCategories={editedCategories}
                adminPassword={adminPassword}
                setAdminPassword={setAdminPassword}
                error={error}
                onStartEdit={handleStartEdit}
                onSaveAllPrices={handleSaveAllPrices}
                onCancelEdit={handleCancelEdit}
                onEventPriceChange={handleEventPriceChange}
                onComboPriceChange={handleComboPriceChange}
                addingEventToCategoryId={addingEventToCategoryId}
                setAddingEventToCategoryId={setAddingEventToCategoryId}
                newEventData={newEventData}
                setNewEventData={setNewEventData}
                onAddEvent={handleAddEvent}
                deletingCategoryId={deletingCategoryId}
                setDeletingCategoryId={setDeletingCategoryId}
                onDeleteCategory={handleDeleteCategory}
                deletingEventId={deletingEventId}
                setDeletingEventId={setDeletingEventId}
                onDeleteEvent={handleDeleteEvent}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}