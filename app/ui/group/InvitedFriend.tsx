"use client";

const InvitedFriend = ({ name, email, color, isAdded, onToggle }) => {

  return (
    <div className="d-flex justify-content-center align-items-center bg-white shadow-sm border border-dark rounded-2 py-2 mb-3">
      <div
        className="ms-3 rounded-circle d-flex justify-content-center align-items-center"
        style={{
          background: color,
          width: "35px",
          height: "35px",
        }}
      >
        <img
          src="../images/icon/user.png"
          alt=""
          style={{
            width: "20px",
          }}
        />
      </div>
      <div className="ms-4">
  <h5 className="fw-bold m-0">{name}</h5>
  <p className="m-0 text-muted" style={{ fontSize: "0.9rem" }}>{email}</p>
</div>

      <button
        className="btn fw-bold rounded-3 ms-auto me-4"
        style={{ background: isAdded ? "#FFAB81" : "#FFCEB4" }}
        onClick={onToggle}
      >
        {isAdded ? "Remove" : "Add"}
      </button>
    </div>
  );
};

export default InvitedFriend;
