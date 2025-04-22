"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import FriendTag from "../../ui/profile/FriendTag"; // or wherever you keep it

interface PrivateChatModalProps {
  show: boolean;
  onClose: () => void;
}

const PrivateChatModal: React.FC<PrivateChatModalProps> = ({ show, onClose }) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user._id) setCurrentUserId(user._id);
  }, []);

  useEffect(() => {
    if (!currentUserId) return;
    fetchUsers();
  }, [currentUserId]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users`, {
        params: { exclude: currentUserId },
        withCredentials: true,
      });
      setUsers(res.data.data);
      setFilteredUsers(res.data.data);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    setFilteredUsers(users.filter((user) =>
      user.name.toLowerCase().includes(value) || user.email?.toLowerCase().includes(value)
    ));
  };

  if (!show) return null;

  return (
    <div className="modal-overlay d-flex align-items-center justify-content-center">
      <div className="bg-white py-4 px-5 rounded-4 shadow-lg" style={{ width: "500px" }}>
        <div className="modal-header justify-content-between align-items-center">
          <h4 className="fw-bold">Start Private Chat</h4>
          <button onClick={onClose} className="text-dark fs-3 border-0 bg-transparent">&times;</button>
        </div>

        <input
          type="text"
          className="form-control mt-3"
          placeholder="Search users..."
          value={search}
          onChange={handleSearch}
        />

        <div className="mt-4" style={{ maxHeight: "250px", overflowY: "auto" }}>
          {filteredUsers.map(user => (
            <FriendTag
              key={user._id}
              name={user.name}
              color={user.profileColor || "lightgray"}
              userId={user._id}
              onClose={onClose}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivateChatModal;
