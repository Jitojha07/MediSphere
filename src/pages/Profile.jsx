import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";
import emailjs from "@emailjs/browser";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isSignedIn, user } = useUser();
  const { openSignIn } = useClerk();

  const [doctor, setDoctor] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [confirmedSlot, setConfirmedSlot] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  if (doctor) {
    document.title = `${doctor.name} - Profile`;
  } else {
    document.title = "Doctor Profile";
  }
}, [doctor]);

  // ===============================
  // LOAD DOCTOR (STATE + FALLBACK)
  // ===============================
  useEffect(() => {
    if (location.state?.doctor) {
      setDoctor(location.state.doctor);
      localStorage.setItem(
        "selectedDoctor",
        JSON.stringify(location.state.doctor)
      );
    } else {
      const saved = JSON.parse(localStorage.getItem("selectedDoctor"));
      if (saved) setDoctor(saved);
    }
  }, [location.state]);

  // ===============================
  // LOAD BOOKING (PER DOCTOR)
  // ===============================
  useEffect(() => {
    if (!doctor) return;

    const bookings = JSON.parse(localStorage.getItem("bookings")) || {};

    if (bookings[doctor.name]) {
      setConfirmedSlot(bookings[doctor.name].slot);
    }
  }, [doctor]);

  // ===============================
  // GENERATE SLOTS
  // ===============================
  useEffect(() => {
    const times = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM"];

    const formatDate = (date) =>
      date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });

    let generatedSlots = [];

    for (let i = 0; i < 4; i++) {
      let date = new Date();
      date.setDate(date.getDate() + i);
      generatedSlots.push(`${formatDate(date)}, ${times[i]}`);
    }

    setSlots(generatedSlots);
  }, []);

  // ===============================
  // BOOK APPOINTMENT
  // ===============================
  const handleBooking = async () => {
    if (!isSignedIn) {
      alert("⚠️ Please login first");
      openSignIn();
      return;
    }

    if (!selectedSlot) {
      alert("Please select a slot!");
      return;
    }

    if (confirmedSlot) {
      alert("You already booked this doctor!");
      return;
    }

    setLoading(true);

    try {
      // 📧 SEND EMAIL
      await emailjs.send(
        "service_rtnqd28",
        "template_msep9cy",
        {
          user_email: user?.primaryEmailAddress?.emailAddress,
          doctor_name: doctor.name,
          slot: selectedSlot,
        },
        "Pd6ZknYPGuuRi8gGa"
      );

      // ✅ SAVE PER DOCTOR
      const bookings = JSON.parse(localStorage.getItem("bookings")) || {};

      bookings[doctor.name] = {
        slot: selectedSlot,
        date: new Date().toISOString(),
      };

      localStorage.setItem("bookings", JSON.stringify(bookings));

      setConfirmedSlot(selectedSlot);
      setSuccessMsg(
        `✅ Appointment confirmed with ${doctor.name} on ${selectedSlot}`
      );
    } catch (err) {
      console.log(err);
      alert("❌ Email failed");
    }

    setLoading(false);
  };

  // ===============================
  // CANCEL BOOKING
  // ===============================
  const cancelBooking = async () => {
    const bookings = JSON.parse(localStorage.getItem("bookings")) || {};

    try {
      // 📧 CANCEL EMAIL
      await emailjs.send(
        "service_s6zfzml",
        "template_56v7s96", // (you can create separate cancel template later)
        {
          user_email: user?.primaryEmailAddress?.emailAddress,
          doctor_name: doctor.name,
          slot: confirmedSlot,
          message: "Your appointment has been cancelled.",
        },
        "wno9or4KEC44Fj7vX"
      );

      delete bookings[doctor.name];
      localStorage.setItem("bookings", JSON.stringify(bookings));

      setConfirmedSlot("");
      setSelectedSlot("");
      setSuccessMsg("❌ Appointment cancelled successfully");
    } catch (err) {
      console.log(err);
      alert("Cancel email failed");
    }
  };

  // ===============================
  // EMPTY STATE
  // ===============================
  if (!doctor) {
    return (
      <>
        <Navbar />
        <h2 style={{ textAlign: "center", padding: "40px" }}>
          ⚠️ No doctor selected
        </h2>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      {/* TOP */}
      <section className="profile-top">
        <span className="back" onClick={() => navigate("/doctors")}>
          ← Back to Doctors
        </span>

        <div className="profile-card">
          <img src={doctor.img} alt={doctor.name} />

          <div className="profile-info">
            <h2>{doctor.name}</h2>
            <p className="speciality">{doctor.speciality}</p>

            <div className="rating">
              ⭐⭐⭐⭐⭐ {doctor.rating} (2 reviews)
            </div>

            <div className="meta">
              <span>{doctor.exp}</span>
              <span>📍 Available Online & In-person</span>
            </div>

            <div className="tag">📹 Virtual Visit (Coming Soon)</div>
          </div>
        </div>
      </section>

      {/* SUCCESS */}
      {successMsg && <div className="success-box">{successMsg}</div>}

      {/* MAIN */}
      <section className="profile-content">
        {/* LEFT */}
        <div className="left">
          <div className="card">
            <h3>About Doctor</h3>
            <p>
              {doctor.name} is a skilled {doctor.speciality} specialist with{" "}
              {doctor.exp}.
            </p>
          </div>

          <div className="card">
            <h3>Patient Reviews</h3>
            <p>⭐⭐⭐⭐⭐</p>
            <p>Excellent doctor with great experience.</p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="right">
          <div className="card">
            <h3>Available Slots</h3>

            {slots.map((slot, index) => {
              const isSelected = selectedSlot === slot;
              const isConfirmed = confirmedSlot === slot;

              return (
                <div
                  key={index}
                  className={`slot ${isSelected ? "active" : ""}`}
                  style={{
                    background: isConfirmed ? "#28a745" : "",
                    color: isConfirmed ? "white" : "",
                    fontWeight: isConfirmed ? "bold" : "normal",
                    cursor: confirmedSlot ? "not-allowed" : "pointer",
                  }}
                  onClick={() => {
                    if (!confirmedSlot) setSelectedSlot(slot);
                  }}
                >
                  {slot}
                  {isConfirmed && " ✔ Confirmed"}
                </div>
              );
            })}

            {!confirmedSlot ? (
              <button
                className="btn-primary full"
                onClick={handleBooking}
                disabled={loading}
              >
                {loading ? "Booking..." : "Book Appointment"}
              </button>
            ) : (
              <button
                className="btn-secondary full"
                onClick={cancelBooking}
              >
                Cancel Booking ❌
              </button>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Profile;