import React, { useState } from "react";
import RenameGroupModal from "../modal/RenameGroupModal";
import LeaveModal from "../modal/LeaveModal";
import AddFriendModal from "../modal/AddFriendModal";
import KickFriendModal from "../modal/KickFriendModal";

const DropDownList = ({ chat, currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [showRemoveFriendModal, setShowRemoveFriendModal] = useState(false);
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // ✅ Check membership and chat type
  const userInGroup = chat.users?.some((u) => u._id === currentUser._id);
  const isGroupChat = chat.isGroupChat === true;
  const isAdmin = chat.groupAdmin?._id === currentUser._id;

  // ✅ Only show for group chat members
  if (!isGroupChat || !userInGroup) return null;

  return (
    <>
      <div className="dropdown ms-auto">
        <button
          type="button"
          className="btn p-2"
          title="setting"
          onClick={toggleDropdown}
        >
          <img
            src="../images/icon/settings.png"
            alt="settings"
            style={{ width: "25px" }}
          />
        </button>

        <div
          className={`dropdown-menu dropdown-menu-end ${isOpen ? "show" : ""}`}
          data-bs-popper="static"
        >
          {/* Admin Options */}
          {isAdmin && (
            <>
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
                onClick={() => setShowAddFriendModal(true)}
              >
                Add Friend
              </button>
              <AddFriendModal
                isOpen={showAddFriendModal}
                onClose={() => setShowAddFriendModal(false)}
                chat={chat}
              />

              <button
                className="dropdown-item fw-semibold text-center"
                onClick={() => setShowRemoveFriendModal(true)}
              >
                Kick Friend
              </button>
              <KickFriendModal
                isOpen={showRemoveFriendModal}
                onClose={() => setShowRemoveFriendModal(false)}
                chat={chat}
              />

              <button
                className="dropdown-item fw-semibold text-center text-danger"
                onClick={() => setShowLeaveModal(true)}
              >
                Leave Group
              </button>
              <LeaveModal
                isOpen={showLeaveModal}
                onClose={() => setShowLeaveModal(false)}
                chat={chat}
                user={currentUser._id}
              />
            </>
          )}

          {/* Non-admin Options */}
          {!isAdmin && (
            <>
              <button
                className="dropdown-item fw-semibold text-center"
                onClick={() => setShowAddFriendModal(true)}
              >
                Add Friend
              </button>
              <AddFriendModal
                isOpen={showAddFriendModal}
                onClose={() => setShowAddFriendModal(false)}
                chat={chat}
              />

              <button
                className="dropdown-item fw-semibold text-center text-danger"
                onClick={() => setShowLeaveModal(true)}
              >
                Leave Group
              </button>
              <LeaveModal
                isOpen={showLeaveModal}
                onClose={() => setShowLeaveModal(false)}
                chat={chat}
                user={currentUser._id}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DropDownList;
