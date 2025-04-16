import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { deleteAccount } from "../../../services/profile";

const DeleteAccountModal = ({ isOpen, onClose, user }) => {
  const router = useRouter();
  const [confirmMessage, setConfirmMessage] = useState("");
  const handleDeleteAccount = async () => {
    try {
      if(confirmMessage == "Delete Account") {
        const response = await deleteAccount(user);

        if (!response.success) throw new Error("Delete Account failed");
        localStorage.clear();
        sessionStorage.clear();

        document.cookie.split(";").forEach((cookie) => {
          const eqPos = cookie.indexOf("=");
          const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        });
        alert("Delete Account successfully!");
        router.push("/chat");
        onClose(); // close the modal
      }
      else {
        alert("Incorrect quote");

      }
    } catch (err) {
      alert("Error Delete Account: " + err.message);
    }
  };
  if (!isOpen) return null;
  return (
    <div className="modal-overlay items-center justify-center">
      <div
        className="bg-white py-4 px-5 rounded-4 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header align-items-center justify-content-center">
          <h4 className="text-black mt-2 fw-bold">Are you sure?</h4>
        </div>
        <div className="modal-body mb-3 text-center align-items-center justify-content-center">
          <p className="fw-semibold">
            Are you sure you want to leave this group
          </p>
          <div className="modal-body mb-3 text-center align-items-center justify-content-center">
            <input
              type="text"
              className="form-control px-3 py-1 rounded-2 text-center fw-medium"
              onChange={(e) => setConfirmMessage(e.target.value)}
              placeholder="Type 'Delete Account' without quote"
            />
            <div className="d-flex mt-4 align-items-center justify-content-center">
              <button
                className="btn fw-bold me-5 py-2 px-4 "
                style={{ backgroundColor: "lightgray" }}
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="btn fw-bold py-2 px-4 "
                style={{ backgroundColor: "#FFCEB4" }}
                onClick={handleDeleteAccount}
              >
                Rename
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
