"use client";
import React, { useEffect, useState } from "react";
import { removeFriend } from "../../../services/group";
import socket from "../../../socket/socket";
import { useRouter } from "next/navigation";

const KickFriendModal = ({ isOpen, onClose, chat }) => {
  const [friends, setFriends] = useState([]);
  const [admin, setAdmin] = useState();
  const router = useRouter();

  const refreshChatFromLocalStorage = () => {
    const localChat = JSON.parse(localStorage.getItem("chat"));
    if (localChat) {
      setFriends(localChat.users);
      setAdmin(localChat.groupAdmin);
    }
  };

  const handleKickFriend = async (kickId) => {
    try {
      const response = await removeFriend(chat._id, kickId);
      if (!response.success) throw new Error("Kick failed");
      onClose(); // optional
    } catch (err) {
      alert("Error Kick Friends: " + err.message);
    }
  };

  useEffect(() => {
    if (isOpen) refreshChatFromLocalStorage();
  }, [isOpen]);

  useEffect(() => {
    const handler = ({ chatId, users }) => {
      if (chatId === chat._id) {
        const updated = { ...chat, users };
        localStorage.setItem("chat", JSON.stringify(updated));
        refreshChatFromLocalStorage(); // ✅ refresh modal view
      }
    };

    socket.on("group updated", handler);
    return () => socket.off("group updated", handler);
  }, [chat]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay items-center justify-center">
      <div className="bg-white py-4 px-5 rounded-4 shadow-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header align-items-center justify-content-center">
          <h4 className="text-black mt-2 ms-auto fw-bold">Kick Friend</h4>
          <button onClick={onClose} className="m-2 ms-auto text-dark fs-3 border-0 bg-transparent">
            &times;
          </button>
        </div>
        <div className="modal-body mb-3 text-center align-items-center justify-content-center">
          {friends
            .filter((friend) => friend._id !== admin?._id)
            .map((friend) => (
              <div
                key={friend._id}
                className="d-flex justify-content-center align-items-center bg-white shadow-sm border border-dark rounded-2 py-2 mb-3"
              >
                <div
                  className="ms-3 rounded-circle d-flex justify-content-center align-items-center"
                  style={{ background: "lightgray", width: "35px", height: "35px" }}
                >
                  <img src="../images/icon/user.png" alt="" style={{ width: "20px" }} />
                </div>
                <h5 className="fw-bold m-0 ms-3 me-5">{friend.name}</h5>
                <button
                  className="btn fw-bold rounded-3 ms-auto me-3"
                  style={{ background: "#FFCEB4" }}
                  onClick={() => handleKickFriend(friend._id)}
                >
                  Kick
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default KickFriendModal;
