import React from "react";
import "./i18n"; // Import i18n configuration
import "./css/style.css";
import "./css/bootstrap.min.css";
import "./css/animate.css";
import "./css/animate.min.css";
import "./css/social-icons.css";
import "./App.css";
import Header from "./components/common/Header";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {
  Home,
  Booking,
  BookingStatus,
  AboutUs,
  Contact,
  PageNotFound,
  Room,
  Services,
  Team,
  Testimonial,
} from "./pages/index";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/common/Footer";
import Birdmapping from "./pages/Birdmapping";
export default function App() {
  return (
    <>
      <div>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/booking-status" element={<BookingStatus />} />
            <Route path="/strukturkampung" element={<Team />} />
            <Route path="/testimonial" element={<Testimonial />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/*" element={<PageNotFound />} />
            <Route path="/paketwisata" element={<Room />} />
            <Route path="/potensilokal" element={<Services />} />
            <Route path="/birdmapping" element={<Birdmapping />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </>
  );
}
