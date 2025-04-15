import React,{useState} from "react";
import LeaveModal from "../modal/LeaveModal";

const DropDownList = ({ chat, currentUser }) => {
    const [isOpen, setIsOpen] = useState(false);
        
          const toggleDropdown = () => {
            setIsOpen(!isOpen);
          };
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
                      <button className="dropdown-item fw-semibold text-center">Rename Group</button>
                      <button className="dropdown-item fw-semibold text-center">Add Friend</button>
                      <button className="dropdown-item fw-semibold text-center">Kick Friend</button>
    
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