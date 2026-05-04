import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
  useClerk
} from "@clerk/clerk-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  const handleBooking = () => {
    if (!isSignedIn) {
      alert("Please login before booking appointment");
      openSignIn(); // ✅ FIXED (popup instead of redirect)
    } else {
      navigate("/doctors");
    }
  };

  return (
    <header className="navbar">
      
      {/* LEFT: LOGO */}
      <div className="logo">
        <Link to="/">🩺 MediSphere</Link>
      </div>

      

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? "show" : ""}`}>
        <Link to="/doctors" onClick={() => setMenuOpen(false)}>
          Find Doctors
        </Link>

        <a href="/#how-it-works" onClick={() => setMenuOpen(false)}>
          How it Works
        </a>

        <a href="/#features" onClick={() => setMenuOpen(false)}>
          Features
        </a>

        {/* BOOK BUTTON (MOBILE) */}
        <button className="btn-primary-nav" onClick={handleBooking}>
          Book Appointment
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div className="nav-right">
        
        {/* LOGIN / USER */}
        <SignedOut>
          <button className="login-btn" onClick={openSignIn}>
            Login
          </button>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>

        <button className="btn-primary-navbar" onClick={handleBooking}>
          Book Appointment
        </button>

        {/* HAMBURGER */}
        <div
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>
      </div>
    </header>
  );
};

export default Navbar;