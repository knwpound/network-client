"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import InvitedFriend from "../../ui/group/InvitedFriend";
import { useRouter } from "next/navigation";

const GroupPage = () => {
  const [groupName, setGroupName] = useState("");

  const [page, setPage] = useState(1);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const listRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      setCurrentUserId(user._id);
    }
  }, []);

  const fetchUsers = async () => {
    if (!currentUserId) return;
  
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users`,
        {
          params: {
            exclude: currentUserId,
          },
          withCredentials: true,
        }
      );
  
      const usersFetched = res.data.data;
      setAllUsers(usersFetched);
      setUsers(usersFetched); // initialize displayed users
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };
  useEffect(() => {
    if (currentUserId) {
      fetchUsers();
    }
  }, [currentUserId]);

  const handleAddUser = (user) => {
    if (!selectedUsers.find((u) => u._id === user._id)) {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleCreateGroup = async () => {
    const usersArray = selectedUsers.map((u) => u._id);
    if (!groupName || usersArray.length < 1) {
      alert("Please enter a group name and select at least one user.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/chat/group`,
        {
          name: groupName,
          users: JSON.stringify([...usersArray, currentUserId]),
        },
        {
          withCredentials: true,
        }
      );

      const newChatId = response?.data?.data?._id;
      if (!newChatId) throw new Error("Chat ID not found in response");

      router.push(`/chat/${newChatId}`);
    } catch (error) {
      console.error("Error creating group chat:", error);
      alert("Failed to create group chat.");
    } finally {
      setLoading(false);
    }
  };



  const handleSearchChange = (e) => {
    const text = e.target.value;
    setSearchText(text);
    const filtered = allUsers.filter((user) =>
      user.name.toLowerCase().includes(text.toLowerCase())
    );
    setUsers(filtered);
  };

  return (
    <div className="container my-4 px-4" style={{ maxWidth: "700px" }}>
      <h2 className="fw-bold mt-5">Create a Group Chat</h2>

      <div className="d-flex align-items-center mt-4">
        <div className="rounded-circle d-flex justify-content-center align-items-center shadow-sm" style={{ background: "#D9D9D9", width: "40px", height: "40px" }}>
          <img src="../images/icon/user.png" alt="user" style={{ width: "22px" }} />
        </div>
        <input
          type="text"
          className="form-control rounded-3 ms-3 fw-medium shadow-sm"
          placeholder="Name your group"
          style={{ background: "#F0F0F0" }}
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
      </div>

      <div className="mt-5">
        <h5 className="fw-bold">Invite Group Members</h5>

        <div className="bg-white py-4 px-4 rounded-3 shadow-sm mt-3">
          <input
            type="text"
            className="form-control rounded-3 fw-medium py-2 w-50"
            placeholder="Search by name"
            style={{ background: "#D9D9D9" }}
            value={searchText}
            onChange={handleSearchChange}
          />

          <div
            ref={listRef}
       
            style={{
              maxHeight: "300px",
              overflowY: "auto",
              marginTop: "1rem",
              paddingRight: "5px",
            }}
          >
          {users.map((user) => {
  const isAdded = selectedUsers.some((u) => u._id === user._id);
  return (
    <div key={user._id}>
      <InvitedFriend
        name={user.name}
        color={"pink"}
        isAdded={isAdded}
        onToggle={() => {
          if (isAdded) {
            setSelectedUsers(selectedUsers.filter((u) => u._id !== user._id));
          } else {
            setSelectedUsers([...selectedUsers, user]);
          }
        }}
      />
    </div>
  );
})}

            {loading && <p className="text-center mt-2">Loading...</p>}
            {!hasMore && <p className="text-center text-muted small">No more users</p>}
          </div>
        </div>

       
      </div>

      <div className="d-flex mt-3">
      <button
  className="btn fw-bold shadow-sm rounded-3 ms-auto"
  style={{ background: "#D9D9D9" }}
  onClick={() => {
    setSelectedUsers([]);
    setGroupName("");
  }}
>
  Cancel
</button>
        <button
          className="btn fw-bold shadow-sm rounded-3 ms-2"
          style={{ background: "#FFCEB4" }}
          disabled={loading}
          onClick={handleCreateGroup}
        >
          {loading ? "Creating..." : "Confirm"}
        </button>
      </div>
    </div>
  );
};

export default GroupPage;
