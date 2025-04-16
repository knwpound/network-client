import React,{useState} from "react";
import RenameGroupModal from "../modal/RenameGroupModal";
import LeaveModal from "../modal/LeaveModal";
import AddFriendModal from "../modal/AddFriendModal";
import KickFriendModal from "../modal/KickFriendModal";

const DropDownList = ({ chat, currentUser }) => {
    const [isOpen, setIsOpen] = useState(false);
        
          const toggleDropdown = () => {
            setIsOpen(!isOpen);
          };
    const [showRenameModal, setShowRenameModal] = useState(false);
    const [showRemoveFriendModal, setShowRemoveFriendModal] = useState(false);
    const [showAddFriendModal, setShowAddFriendModal] = useState(false);
    const [showLeaveModal, setShowLeaveModal] = useState(false);

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
                      <RenameGroupModal
                        isOpen={showRenameModal}
                        onClose={() => setShowRenameModal(false)}
                        chat={chat}
                      />

                      <button
                        className="dropdown-item fw-semibold text-center"
                        onClick={() => setShowAddFriendModal(true)}>
                        Add Friend
                      </button>
                      <AddFriendModal
                        isOpen={showAddFriendModal}
                        onClose={() => setShowAddFriendModal(false)}
                        chat={chat}
                      />

                      <button
                        className="dropdown-item fw-semibold text-center"
                        onClick={() => setShowRemoveFriendModal(true)}>
                        Kick Friend
                      </button>
                      <KickFriendModal
                        isOpen={showRemoveFriendModal}
                        onClose={() => setShowRemoveFriendModal(false)}
                        chat={chat}
                      />

                    </div>
                  ) : (
                    <div className="dropdown-menu dropdown-menu-end show" aria-labelledby="dropdownMenuButton"
                data-bs-popper="static">
                  <button 
                    className="dropdown-item fw-semibold text-center" 
                    onClick={() => setShowLeaveModal(true)}>
                    Leave Group
                  </button>
                  <LeaveModal
                    isOpen={showLeaveModal}
                    onClose={() => setShowLeaveModal(false)}
                    chat={chat}
                    user={currentUser._id}
                  />
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