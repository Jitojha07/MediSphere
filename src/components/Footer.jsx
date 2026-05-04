import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
    return(
        <footer className="footer">
        <div className="footer-container">
          <div className="footer-col">
            <h2>🩺 MediSphere</h2>
            <p>Connecting patients with trusted healthcare professionals.</p>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <a href="/doctors">Find Doctors</a>
            <a href="/doctors">Book Appointment</a>
          </div>

          <div className="footer-col">
            <h4>Specialties</h4>
            <a href="#">Cardiology</a>
            <a href="#">Dermatology</a>
          </div>

          <div className="footer-col">
            <h4>Support</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Contact</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026. Built by JIT OJHA</p>
        </div>
      </footer>
    );
};

export default Footer;