"use client"
import React, { useState, useEffect } from "react";

const KickFriendModal = () => {
    const [friends, setFriends] = useState([]);
    const [admin, setAdmin] = useState();

    useEffect(() => {
        const chat = JSON.parse(localStorage.getItem("chat"));
        setFriends(chat.users);
        setAdmin(chat.groupAdmin);
        console.log(chat.users);
    }, []);
    return (
        <div className="modal-overlay items-center justify-center">
            <div
                className="bg-white py-4 px-5 rounded-4 shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header align-items-center justify-content-center">
                    <h4 className="text-black mt-2 ms-auto fw-bold">Kick Friend</h4>
                    <button
                        //   onClick={onClose}
                        className="m-2 ms-auto text-dark fs-3 border-0 bg-transparent"
                    >
                        &times;
                    </button>
                </div>
                <div className="modal-body mb-3 text-center align-items-center justify-content-center">
                    <div>
                        {friends
                            .filter(friend => friend._id !== admin._id)
                            .map(friend => (
                                <div
                                    key={friend._id}
                                    className="d-flex justify-content-center align-items-center bg-white shadow-sm border border-dark 
        rounded-2 py-2 mb-3"
                                >
                                    <div
                                        className="ms-3 rounded-circle d-flex justify-content-center align-items-center"
                                        style={{
                                            background: "lightgray",
                                            width: "35px",
                                            height: "35px",
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
                                    <h5 className="fw-bold m-0 ms-3 me-5">{friend.name}</h5>
                                    <button
                                        className="btn fw-bold rounded-3 ms-auto me-3"
                                        style={{ background: "#FFCEB4" }}
                                    >
                                        Kick
                                    </button>
                                </div>
                            ))}

                    </div>

                </div>
            </div>
        </div>
    )
}

export default KickFriendModal;