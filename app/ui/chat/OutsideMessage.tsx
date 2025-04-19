"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const OutsideMessage = ({ chat }) => {
    const [name,setName] = useState();
    const [message, setMessage] = useState("");
    const [date, setDate] = useState("");
    const [color,setColor] = useState("light gray")
    const [Onread, setOnRead] = useState(true);
    const router = useRouter();

    useState(()=>{
        const storedUser = localStorage.getItem("user");
        if(!chat.isGroupChat){
            if(chat.users[0]._id!=storedUser._id){
              setName(chat.users[1].name);
              setColor(chat.users[1].profileColor);
            }else{
              setName(chat.users[0].name);
              setColor(chat.users[0].profileColor);
            }
          }else{
            setName(`${chat.chatName} (${chat.users.length})`);
            setColor("lightgray");
          }
        setMessage(chat.latestMessage?.content);
    })

    const handlerOnClick = () =>{
        router.push(`/chat/${chat._id}`);
        localStorage.setItem('chat', JSON.stringify(chat));
    }
    return (
        <button 
            className="btn d-flex align-items-center rounded-3 shadow-sm py-2 mb-2 w-100" 
            style={{ background: "white" }}
            onClick={handlerOnClick}
        >
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
            <div className="ms-3 text-start">
                <p className="fw-bold  m-0">{name}</p>
                <p className="m-0" style={{ fontSize: "14px" }}>{message}</p>
            </div>
            <div className="ms-4 mb-0 me-1">
            {!Onread && (
                    <div 
                        className="rounded-circle border border-dark ms-auto mb-3"
                        style={{ background: "red", width: "7px", height: "7px" }}
                    />
                )}
                <p 
                className="fw-semibold text-end mt-3 mb-0"
                style={{ fontSize: "13px", color: "gray" }}
            >
                {date}
            </p>
            </div>
            
        </button>
    );
};

export default OutsideMessage;