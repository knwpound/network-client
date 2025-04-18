"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  name: string;
}

interface PrivateChatModalProps {
  show: boolean;
  onClose: () => void;
}

const PrivateChatModal: React.FC<PrivateChatModalProps> = ({ show, onClose }) => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  // Check if we're on the client side
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);  // Ensure useRouter is only used on the client
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user._id) setCurrentUserId(user._id);
    }
  }, []);

  useEffect(() => {
    if (currentUserId) fetchUsers();
  }, [currentUserId]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users`,
        {
          params: { exclude: currentUserId },
          withCredentials: true,
        }
      );
      setUsers(res.data.data);
      setFilteredUsers(res.data.data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (show) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [show, onClose]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    setFilteredUsers(
      users.filter((user) =>
        user.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleStartChat = async (otherUserId: string) => {
    if (!currentUserId || !otherUserId) {
      alert("Both users must be selected.");
      return;
    }
  
    try {
      setLoading(true);
  
      // Get current user's name
      const userFromStorage = JSON.parse(localStorage.getItem("user") || "{}");
      const currentUserName = userFromStorage.name || "Me";
  
      // Get the other user's name
      const otherUser = users.find((user) => user._id === otherUserId);
      const otherUserName = otherUser?.name || "Friend";
  
      // Create the group name
      const groupName = `${currentUserName} and ${otherUserName}`;
  
      const usersArray = [currentUserId, otherUserId];
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/chat/group`,
        {
          name: groupName,
          users: JSON.stringify(usersArray),
        },
        {
          withCredentials: true,
        }
      );
  
      const newChatId = response?.data?.data?._id;
      console.log("New Chat ID:", newChatId);
      console.log("Chat Data:", response.data.data);
  
      localStorage.setItem("chat", JSON.stringify(response.data.data));
  
      if (!newChatId) throw new Error("Chat ID not found in response");
  
      onClose(); // Close the modal
      if (isClient) {
        router.push(`/chat/${newChatId}`);
      }
    } catch (error) {
      console.error("Error creating group chat:", error);
      alert("Failed to create private chat.");
    } finally {
      setLoading(false);
    }
  };
  

  if (!show) return null;

  return (
    <div className="modal-overlay d-flex align-items-center justify-content-center">
      <div
        ref={modalRef}
        className="bg-white py-4 px-5 rounded-4 shadow-lg"
        style={{ width: "500px", maxWidth: "90vw" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header justify-content-between align-items-center">
          <h4 className="text-black mt-2 fw-bold">Start Private Chat</h4>
          <button
            onClick={onClose}
            className="text-dark fs-3 border-0 bg-transparent"
          >
            &times;
          </button>
        </div>

        <input
          type="text"
          className="form-control rounded-3 mt-3"
          placeholder="Search friends..."
          value={search}
          onChange={handleSearch}
        />

        <div className="mt-4" style={{ maxHeight: "200px", overflowY: "auto" }}>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user._id}
                className="d-flex justify-content-between align-items-center p-2 border-bottom"
              >
                <span>{user.name}</span>
                <button
                  className="btn btn-sm fw-bold"
                  style={{ backgroundColor: "#FFCEB4" }}
                  onClick={() => handleStartChat(user._id)}
                >
                  Chat
                </button>
              </div>
            ))
          ) : (
            <div>No users found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrivateChatModal;
