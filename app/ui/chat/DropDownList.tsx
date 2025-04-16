import React,{useState} from "react";
import RenameGroupModal from "../modal/RenameGroupModal";
import LeaveModal from "../modal/LeaveModal";

const DropDownList = ({ chat, currentUser }) => {
    const [isOpen, setIsOpen] = useState(false);
        
          const toggleDropdown = () => {
            setIsOpen(!isOpen);
          };
    const [showRenameModal, setShowRenameModal] = useState(false);
    const [showRemoveFriendModal, setShowRemoveFriendModal] = useState(false);
    const [showAddFriendModal, setShowAddFriendModal] = useState(false);

    return (
        <>
            {chat.isGroupChat ? (
                  <div className="dropdown ms-auto">
                <button
                type="button"
                className="btn p-2"
                title="setting"
                id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                onClick={toggleDropdown}
              >
                <img
                  src="../images/icon/settings.png"
                  alt=""
                  style={{
                    width: "25px",
                  }}
                />
              </button>
                {chat.groupAdmin._id === currentUser._id ? (
                    <div className={`dropdown-menu dropdown-menu-end ${isOpen ? "show" : ""}`} aria-labelledby="dropdownMenuButton"
                    data-bs-popper="static">
                      <button
                        className="dropdown-item fw-semibold text-center"
                        onClick={() => setShowRenameModal(true)}
                        >
                        Rename Group
                      </button>
                      <button
                        className="dropdown-item fw-semibold text-center"
                        onClick={() => open("B")}>
                        Add Friend
                      </button>
                      <button
                        className="dropdown-item fw-semibold text-center"
                        onClick={() => open("C")}>
                        Kick Friend
                      </button>

                      <RenameGroupModal
                        isOpen={showRenameModal}
                        onClose={() => setShowRenameModal(false)}
                        chat={chat}
                      />
                    </div>
                  ) : (
                    <div className="dropdown-menu dropdown-menu-end show" aria-labelledby="dropdownMenuButton"
                data-bs-popper="static">
                  <button className="dropdown-item fw-semibold text-center">Leave Group</button>

                </div>
                  )}
                
              </div>
                ) : (
                  <div></div>
                )}
                {/* <LeaveModal/> */}
        </>
        
    )
}

export default DropDownList;