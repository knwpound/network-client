"use client"

import { useState } from "react";

const InvitedFriend = ({name,color}) =>{
    const [isAdded, setIsAdded] = useState(false);

    return(
        <div className="d-flex justify-content-center align-items-center bg-white shadow-sm border border-dark 
        rounded-2 py-2 mb-3">
                    <div
                            className="ms-3 rounded-circle d-flex justify-content-center align-items-center"
                            style={{
                                background: color,
                                width: "35px",
                                height: "35px"
                            }}
                        >
                            <img
                                src="../images/icon/user.png"
                                alt=""
                                style={{
                                    width: "20px",
                                }}
                            />
                        </div>
                        <h5 className="fw-bold m-0 ms-4">{name}</h5>
                        <button 
                            className="btn fw-bold rounded-3 ms-auto me-4" 
                            style={{ background: isAdded ? "#FFAB81" : "#FFCEB4" }}
                            onClick={() => setIsAdded(!isAdded)} // Toggle state on click
                        >
                            {isAdded ? "Remove" : "Add"}
                        </button>

                    </div>
    )
}

export default InvitedFriend;