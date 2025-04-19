"use client"
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { createPrivateChat } from "../../../services/profile";


const FriendTag = ({name, color, userId}) =>{
    const router = useRouter()
    const handleCreatePrivateChat = async () => {
        try {
            const res = await createPrivateChat(userId);
            console.log("response",res);
            alert("Succesfully create private chat: ");

            router.push(`/chat/${res._id}`);
            location.reload()
        } catch (err) {
            alert("Error create private chat: " + err.message);
        }
    };
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
                            style={{ background: "#FFCEB4" }}
                            onClick={() => {
                                handleCreatePrivateChat()
                            }}>Chat</button>
                    </div>
    )
}

export default FriendTag;