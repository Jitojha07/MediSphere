import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Home - MediSphere";
  }, []);

  // ✅ STATE (for search)
  const [search, setSearch] = useState("");
    const [speciality, setSpeciality] = useState("All Specialties");

    const handleSearch = () => {
    navigate(`/doctors?name=${search}&speciality=${speciality}`);
  };

  // ✅ DOCTORS DATA
  const doctors = [
    {
      name: "Dr. Arjun Mehta",
      speciality: "Cardiology",
      exp: "18 yrs experience",
      rating: 4.2,
      img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Dr. Meena Krishnan",
      speciality: "Oncology",
      exp: "17 yrs experience",
      rating: 4.4,
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Dr. Harish Gupta",
      speciality: "Family Medicine",
      exp: "25 yrs experience",
      rating: 4.6,
      img: "https://randomuser.me/api/portraits/men/46.jpg",
    },
  ];

  // ✅ SEARCH FUNCTION (FIXED)
  const filteredDoctors = doctors.filter((doc) => {
    const matchName = doc.name.toLowerCase().includes(search.toLowerCase());
    const matchSpeciality =
      speciality === "All Specialties" || doc.speciality === speciality;

    return matchName && matchSpeciality;
  });

  // ✅ VIEW PROFILE
  const viewProfile = (doc) => {
    localStorage.setItem("selectedDoctor", JSON.stringify(doc));
    navigate("/profile");
  };

  return (
    <>
      {/* NAVBAR */}
      
      <Navbar/>

      {/* HERO */}
      <section className="hero">
        <h1>
          Your Health, <span>Our Priority</span>
        </h1>

        <p>
          Book appointments with top doctors, get expert medical advice,
          and manage your health — all in one place.
        </p>

        {/* SEARCH BOX */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by doctor name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
          >
            <option>All Specialties</option>
            <option>Cardiology</option>
            <option>Dermatology</option>
            <option>Neurology</option>
            <option>Dentist</option>
            <option>Orthopedics</option>
            <option>Pulmonology</option>
          </select>

          <button onClick={() => handleSearch()}>🔍 Find Doctors</button>
        </div>

        {/* STATS */}
        <div className="stats">
          <div>
            <h2>500+</h2>
            <p>Verified Doctors</p>
          </div>
          <div>
            <h2>21</h2>
            <p>Specialties</p>
          </div>
          <div>
            <h2>50K+</h2>
            <p>Patients Served</p>
          </div>
          <div>
            <h2>98%</h2>
            <p>Satisfaction Rate</p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features" id="features">
        <div className="feature">
          <div className="icon">🛡️</div>
          <h3>Verified Doctors</h3>
          <p>All physicians are board-certified and background-checked</p>
        </div>

        <div className="feature">
          <div className="icon">📅</div>
          <h3>Easy Scheduling</h3>
          <p>Book appointments in seconds, 24/7</p>
        </div>

        <div className="feature">
          <div className="icon">💬</div>
          <h3>Secure Messaging</h3>
          <p>HIPAA-compliant communication with your doctor</p>
        </div>

        <div className="feature">
          <div className="icon">🎥</div>
          <h3>Virtual Visits</h3>
          <p>Consult from the comfort of your home</p>
        </div>
      </section>

      {/* DOCTORS */}
      <section className="doctors">
        <h2>Featured Doctors</h2>
        <p>Meet some of our top-rated specialists</p>

        <div className="doctor-container">
          {doctors.map((doc, index) => (
            <div className="doctor-card" key={index}>
              <div className="doctor-header">
                <img src={doc.img} alt={doc.name} />
                <div>
                  <h4>{doc.name}</h4>
                  <p className="speciality">{doc.speciality}</p>
                  <small>{doc.exp}</small>
                </div>
              </div>

              <div className="rating">⭐ {doc.rating}</div>
              <div className="availability">⏰ Check availability</div>
              <div className="tag">📹 Virtual Visit (Coming Soon)</div>

              <button
                className="btn-profile"
                onClick={() => viewProfile(doc)}
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* VIEW ALL */}
      <section className="viewAllDoctor">
        <div className="view-all">
          <button onClick={() => navigate("/doctors")}>
            View All Doctors →
          </button>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works" id="how-it-works">
        <h2>How It Works</h2>
        <p>Get expert medical care in 3 simple steps</p>

        <div className="steps">
          <div className="step">
            <div className="circle">01</div>
            <h3>Search & Find</h3>
            <p>Browse our network of verified specialists.</p>
          </div>

          <div className="step">
            <div className="circle">02</div>
            <h3>Book Online</h3>
            <p>Select time slot and book instantly.</p>
          </div>

          <div className="step">
            <div className="circle">03</div>
            <h3>Get Care</h3>
            <p>Consult online or visit clinic.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Ready to Take Control of Your Health?</h2>
        <p>Join thousands of patients using MediBook.</p>

        <div className="cta-buttons">
          <button className="btn-primary" onClick={() => navigate("/login")}>Get Started →</button>
          <button className="btn-secondary">✔ Learn More</button>
        </div>
      </section>

      {/* FOOTER */}
      
      <Footer/>

    </>
  );
};

export default Home;