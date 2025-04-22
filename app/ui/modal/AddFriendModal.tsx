import React, { useState, useEffect } from "react";
import { getUsers } from "../../../services/user"; // use your function
import { useRouter } from "next/navigation";
import socket from "../../../socket/socket";
import { addFriend } from "../../../services/group";
const AddFriendModal = ({ isOpen, onClose, chat }) => {
  const [searchText, setSearchText] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const router = useRouter();

  // ✅ Fetch all users on open
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await getUsers(); // This returns { success: true, data: [...] }
        setAllUsers(res.data); // ✅ Access the .data array
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    if (isOpen) fetchAllUsers();
  }, [isOpen]);

  // ✅ Filter users locally on searchText
  useEffect(() => {
    const lower = searchText.toLowerCase();
    const excludeIds = chat.users.map((u) => u._id);

    const filtered = allUsers.filter(
      (user) =>
        !excludeIds.includes(user._id) &&
        (user.name.toLowerCase().includes(lower) || user.email.toLowerCase().includes(lower))
    );

    setFilteredUsers(filtered);
  }, [searchText, allUsers, chat.users]);

  const handleAddFriend = async (email) => {
    try {
      const response = await addFriend(chat._id, email); // ✅ use your service
  
      if (!response.success) throw new Error("Add Friend failed");
  
      // Emit socket event with updated user list
      socket.emit("group updated", {
        chatId: chat._id,
        users: response.data.users || response.data.updatedUsers,
      });
  
      onClose();
    } catch (err) {
      alert("Error adding friend: " + err.message);
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="modal-overlay items-center justify-center">
      <div className="bg-white py-4 px-5 rounded-4 shadow-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header d-flex align-items-center justify-content-between">
          <h4 className="text-black fw-bold">Add New Friend</h4>
          <button onClick={onClose} className="text-dark fs-3 border-0 bg-transparent">
            &times;
          </button>
        </div>
        <div className="modal-body mb-3 text-center">
          <input
            type="text"
            className="form-control px-3 py-2 rounded-2 fw-medium"
            placeholder="Search by name or email"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {filteredUsers.length > 0 && (
  <div
    className="mt-3 text-start"
    style={{
      maxHeight: "180px", // roughly fits 3 users
      overflowY: "auto",
    }}
  >
    {filteredUsers.map((user) => (
      <div key={user._id} className="d-flex align-items-center justify-content-between border-bottom py-2">
        <div>
          <div className="fw-semibold">{user.name}</div>
          <small className="text-muted">{user.email}</small>
        </div>
        <button
          className="btn btn-sm fw-bold"
          style={{ backgroundColor: "#FFCEB4" }}
          onClick={() => handleAddFriend(user.email)}
        >
          Add
        </button>
      </div>
    ))}
  </div>
)}

          {searchText && filteredUsers.length === 0 && (
            <p className="text-muted mt-2">No matching users</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddFriendModal;
