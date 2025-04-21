"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { removeFriend } from "../../../services/group";

const LeaveModal = ({ isOpen, onClose, chat, user }) => {
  const router = useRouter();

  const handleLeave = async () => {
    try {
      const response = await removeFriend(chat._id, user);

      if (!response.success) throw new Error("Leaving failed");

      alert("You have left the group.");
      onClose(); // close modal first
      
    } catch (err) {
      alert("Error Leaving: " + err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50"
      onClick={onClose}
      style={{ zIndex: 1050 }}
    >
      <div
        className="bg-white py-4 px-5 rounded-4 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header align-items-center justify-content-center">
          <h4 className="text-black mt-2 fw-bold">Are you sure?</h4>
        </div>
        <div className="modal-body mb-3 text-center align-items-center justify-content-center">
          <p className="fw-semibold">Do you really want to leave this group?</p>
          <div className="d-flex align-items-center justify-content-center gap-3">
            <button
              className="btn fw-bold shadow-sm"
              style={{ backgroundColor: "lightgray" }}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="btn fw-bold shadow-sm px-3"
              style={{ backgroundColor: "#FF9551" }}
              onClick={handleLeave}
            >
              Leave
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveModal;
