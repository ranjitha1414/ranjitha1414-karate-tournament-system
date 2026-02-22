/* eslint-disable no-unused-vars */
import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RegionProvider } from "./components/RegionContext";
import { motion } from "framer-motion";
import logo from "./assets/logo.png";
import isshinryu from "./assets/isshinryu.png";


// Eager load critical components (above the fold)
import Header from "./components/Header";
import BannerSlider from "./components/BannerSlider";

// Lazy load below-the-fold components
const About = lazy(() => import("./components/About"));
const IWKAJourney = lazy(() => import("./components/HistoryComponent"));
const AnnouncementsSlider = lazy(() => import("./components/AnnouncementSlider"));
const GrandChampionship = lazy(() => import("./components/GrandChapionship"));
const Venue = lazy(() => import("./components/Venue"));
const HotelSlider = lazy(() => import("./components/Hotels"));
const TouristPlacesSlider = lazy(() => import("./components/Tourist"));
const KarateTournamentHub = lazy(() => import("./components/registration/ShoppingAndSpectator"));
const RegistrationForm = lazy(() => import("./components/RegistrationForm"));
const Sponsors = lazy(() => import("./components/Sponser"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));
const AdminDashboard = lazy(() => import("./AdminPage"));
const TermsAndConditions = lazy(() => import("./components/Policies/TermsAndConditions"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
  </div>
);

export default function App() {
  return (
    <RegionProvider>
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Public user-facing site */}
            <Route
              path="/"
              element={
                <div>
                  <Header logo={logo} />
                  <BannerSlider />
                  
                  <Suspense fallback={<LoadingFallback />}>
                    <section id="about">
                      <About />
                    </section>
                  </Suspense>

                  <Suspense fallback={<LoadingFallback />}>
                    <section id="history">
                      <IWKAJourney />
                    </section>
                  </Suspense>

                  <Suspense fallback={<LoadingFallback />}>
                    <section id="announcements">
                      <AnnouncementsSlider />
                    </section>
                  </Suspense>

                  <Suspense fallback={<LoadingFallback />}>
                    <section id="grand-championship">
                      <GrandChampionship />
                    </section>
                  </Suspense>

                  <Suspense fallback={<LoadingFallback />}>
                    <section id="venue">
                      <Venue />
                    </section>
                  </Suspense>

                  <Suspense fallback={<LoadingFallback />}>
                    <section id="hotels">
                      <HotelSlider />
                    </section>
                  </Suspense>

                  <Suspense fallback={<LoadingFallback />}>
                    <section id="tourist-places">
                      <TouristPlacesSlider />
                    </section>
                  </Suspense>

                  <Suspense fallback={<LoadingFallback />}>
                    <section id="ticket">
                      <KarateTournamentHub />
                    </section>
                  </Suspense>

                  <Suspense fallback={<LoadingFallback />}>
                    <section id="register">
                      <RegistrationForm />
                    </section>
                  </Suspense>

                  <Suspense fallback={<LoadingFallback />}>
                    <section id="sponsors">
                      <Sponsors />
                    </section>
                  </Suspense>

                  <Suspense fallback={<LoadingFallback />}>
                    <section id="contact">
                      <Contact />
                    </section>
                  </Suspense>

                  <Suspense fallback={<LoadingFallback />}>
                    <Footer />
                  </Suspense>

                  {/* Fixed Logo in Bottom Right Corner */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
                  >
                    <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 backdrop-blur-sm rounded-full shadow-2xl border-2 border-red-200 p-2 sm:p-3 hover:scale-110 transition-transform duration-300 cursor-pointer">
                      <img 
                        src={isshinryu} 
                        alt="Isshinryu Logo" 
                        className="w-full h-full object-contain"
                        title="IWKA 2026"
                      />
                    </div>
                  </motion.div>
                </div>
              }
            />
            
            {/* Admin dashboard */}
            <Route path="/admin" element={<AdminDashboard />} />
            
            {/* Terms and conditions */}
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          </Routes>
        </Suspense>
      </Router>
    </RegionProvider>
  );
}