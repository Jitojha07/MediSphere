import { useNavigate } from "react-router-dom";

function DoctorCard({ doc }) {
  const navigate = useNavigate();

  return (
    <div className="doctor-card">
      <div className="doctor-header">
        <img src={doc.img} />
        <div>
          <h4>{doc.name}</h4>
          <p className="speciality">{doc.speciality}</p>
          <small>{doc.exp}</small>
        </div>
      </div>

      <div className="rating">⭐ {doc.rating}</div>
      <div className="availability">⏰ Check availability</div>

      <div className="tag">📹 Virtual Visit</div>

      <button
        className="btn-profile"
        onClick={() => navigate("/profile", { state: doc })}
      >
        View Profile
      </button>
    </div>
  );
}

export default DoctorCard;