import React, { forwardRef } from "react";

const RecievedMessage = forwardRef(({ name, color, message, onClick }, ref) => {
  return (
    <div className="d-flex align-items-start mt-3" ref={ref} onClick={onClick} style={{ cursor: onClick ? "pointer" : "default" }}>
      {/* Profile */}
      <div className="ms-3 mt-4 rounded-circle d-flex justify-content-center align-items-center"
        style={{ background: color, width: "35px", height: "35px" }}>
        <img src="../images/icon/user.png" alt="" style={{ width: "20px" }} />
      </div>
      {/* Message */}
      <div className="ms-3 d-flex flex-column" style={{ maxWidth: "60%" }}>
        <p className="fw-bold m-0">{name}</p>
        <div className="p-2 px-3 rounded-3" style={{ background: "#E7C5F9" }}>
          {message}
        </div>
      </div>
    </div>
  );
});

export default RecievedMessage;
