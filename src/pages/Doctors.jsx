import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";

const Doctor = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Doctors - MediSphere";
  }, []);


  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const queryName = queryParams.get("name") || "";
  const querySpeciality = queryParams.get("speciality") || "All Specialties";

  const [search, setSearch] = useState(queryName);
  const [speciality, setSpeciality] = useState(querySpeciality);

  const doctors = [
    { name: "Dr. Arjun Mehta", speciality: "Cardiology", exp: "18 yrs", rating: 4.0, img: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "Dr. Meena Krishnan", speciality: "Dermatology", exp: "17 yrs", rating: 4.2, img: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "Dr. Harish Gupta", speciality: "Family Medicine", exp: "25 yrs", rating: 4.4, img: "https://randomuser.me/api/portraits/men/46.jpg" },
    { name: "Dr. Latha Venkatesh", speciality: "Pulmonology", exp: "13 yrs", rating: 4.6, img: "https://randomuser.me/api/portraits/women/65.jpg" },
    { name: "Dr. Ashish Saini", speciality: "Dentist", exp: "18 yrs", rating: 4.0, img: "https://randomuser.me/api/portraits/men/56.jpg" },
    { name: "Dr. Amrita Kumari", speciality: "Orthopedics", exp: "17 yrs", rating: 4.2, img: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "Dr. Tanu Gupta", speciality: "Child Specialist", exp: "25 yrs", rating: 4.4, img: "https://randomuser.me/api/portraits/women/74.jpg" },
    { name: "Dr. Anurag Chandna", speciality: "Neurology", exp: "13 yrs", rating: 4.6, img: "https://randomuser.me/api/portraits/men/65.jpg" }
  ];

  // 🔍 Filter logic
  const filteredDoctors = doctors.filter((doc) => {
    const matchName = doc.name.toLowerCase().includes(search.toLowerCase());
    const matchSpeciality =
      speciality === "All Specialties" || doc.speciality === speciality;

    return matchName && matchSpeciality;
  });

  // 👉 Navigate to profile
  const viewProfile = (doc) => {
    localStorage.setItem("selectedDoctor", JSON.stringify(doc));
    navigate("/profile");
  };

  return (
    <>
      {/* NAVBAR */}
      
      <Navbar/>

      {/* HERO */}
      <section className="doctor-hero">
        <h1>Find Doctors</h1>
        <p>Search from our network of verified medical professionals</p>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name..."
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
          </select>
        </div>
      </section>

      {/* RESULT BAR */}
      <div className="result-bar">
        <p>{filteredDoctors.length} doctors found</p>
        <p>Sort by: Best Match</p>
      </div>

      {/* DOCTOR LIST */}
      <section className="doctor-list">
        {filteredDoctors.map((doc, index) => (
          <div className="doctor-card" key={index}>
            <div className="doctor-header">
              <img src={doc.img} alt="" />
              <div>
                <h4>{doc.name}</h4>
                <p className="speciality">{doc.speciality}</p>
                <small>{doc.exp} experience</small>
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
      </section>

      {/* FOOTER */}
      
      <Footer />

    </>
  );
};

export default Doctor;