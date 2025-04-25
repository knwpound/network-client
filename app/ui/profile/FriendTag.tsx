import { useRouter } from "next/navigation";
import React from "react";
import { createPrivateChat } from "../../../services/profile";

interface FriendTagProps {
  name: string;
  email: string; // ✅ Add email prop
  color: string;
  userId: string;
  onClose: () => void;
}

const FriendTag: React.FC<FriendTagProps> = ({ name, email, color, userId, onClose }) => {
  const router = useRouter();

  const handleCreatePrivateChat = async () => {
    try {
      const res = await createPrivateChat(userId);
      const chat = res?.data;

      if (!chat || !chat._id) throw new Error("Chat ID not returned");

      localStorage.setItem("chat", JSON.stringify(chat));
      if (onClose) onClose();
      router.push(`/chat/${chat._id}`);
    } catch (err: any) {
      alert("Error creating private chat: " + err.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-white shadow-sm border border-dark rounded-2 py-2 mb-3">
      <div
        className="ms-3 rounded-circle d-flex justify-content-center align-items-center"
        style={{ background: color, width: "35px", height: "35px" }}
      >
        <img src="../images/icon/user.png" alt="user" style={{ width: "20px" }} />
      </div>

      <div className="ms-4">
        <h5 className="fw-bold m-0">{name}</h5>
        <p className="m-0 text-muted" style={{ fontSize: "0.9rem" }}>{email}</p> {/* ✅ Show email */}
      </div>

      <button
        className="btn fw-bold rounded-3 ms-auto me-4"
        style={{ background: "#FFCEB4" }}
        onClick={handleCreatePrivateChat}
      >
        Chat
      </button>
    </div>
  );
};

export default FriendTag;
