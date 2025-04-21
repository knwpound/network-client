import React, { useState } from "react";
import { addFriend } from "../../../services/group";
import { useRouter } from "next/navigation";

const AddFriendModal = ({ isOpen, onClose, chat}) =>{
  const [friendId, setFriendId] = useState("");
  const router = useRouter();
  
  const handleAddFriend = async () => {
  if (!friendId.trim()) {
    alert("Please enter a valid friend email");
    return;
  }

  const friendAlreadyExists = chat.users.some(user => user.email === friendId);
  if (friendAlreadyExists) {
    alert("This user is already in the chat");
    return;
  }

  try {
    const response = await addFriend(chat._id, friendId);

    if (!response.success) throw new Error("Add Friend failed");

    alert("Friend added successfully!");

    // ✅ get updated chatId from response
    const updatedChatId = response.data._id;

    // ✅ navigate directly to chat page
    router.push(`/chat/${updatedChatId}`);

    setFriendId("");
    onClose();
  } catch (err) {
    alert("Error adding friend: " + err.message);
  }
};

  if (!isOpen) return null;
    return(
        <div className="modal-overlay items-center justify-center">
      <div
        className="bg-white py-4 px-5 rounded-4 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header align-items-center justify-content-center">
            <h4 className="text-black mt-2 ms-auto fw-bold">Add new Friend</h4>
            <button
              onClick={onClose}
              className="m-2 ms-auto text-dark fs-3 border-0 bg-transparent"
            >
          &times;
        </button>
        </div>
        <div className="modal-body mb-3 text-center align-items-center justify-content-center">
            <input 
              type="text"
              className="form-control px-3 py-1 rounded-2 text-center fw-medium"
              onChange={(e) => setFriendId(e.target.value)}
              placeholder="Enter Friend's email"
            />
            <div className="d-flex mt-4 align-items-center justify-content-center">
                <button
                  className="btn fw-bold me-5 py-2 px-4 "
                  style={{backgroundColor:"lightgray"}}
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  className="btn fw-bold py-2 px-4 "
                  style={{backgroundColor:"#FFCEB4"}}
                  onClick={handleAddFriend}>
                  Add
                </button>
            </div>
        </div>
      </div>
    </div>
    )
}

export default AddFriendModal;