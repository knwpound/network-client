import React, { useState } from "react";
import { renameGroup } from "../../../services/group"
import { useRouter } from "next/navigation";

const RenameGroupModal = ({ isOpen, onClose, chat}) =>{
  const [groupName, setGroupName] = useState("");
  const router = useRouter();
  
  const handleRename = async () => {
    if (!groupName.trim()) {
      alert("Please enter a valid group name");
      return;
    }

    try {
      const response = await renameGroup(chat._id, groupName);
      
      if (!response.success) throw new Error("Rename failed");


      setGroupName("");
      onClose(); // close the modal
    } catch (err) {
      alert("Error renaming group: " + err.message);
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
            <h4 className="text-black mt-2 ms-auto fw-bold">Rename Group</h4>
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
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="New Group Name"
              />
            <div className="d-flex mt-4 align-items-center justify-content-center">
                <button
                  className="btn fw-bold me-5 py-2 px-4 "
                  style={{backgroundColor:"lightgray"}}
                  onClick={onClose}>
                  Cancel
                </button>
                <button
                  className="btn fw-bold py-2 px-4 "
                  style={{backgroundColor:"#FFCEB4"}}
                  onClick={handleRename}>
                  Rename
                </button>
            </div>
        </div>
      </div>
    </div>
    )
}

export default RenameGroupModal;