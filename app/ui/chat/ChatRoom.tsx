"use client"
import React,{use, useState, useEffect} from "react";
import OutsideMessage from "./OutsideMessage";
import axios from "axios";

const ChatRoom = () => {
    const [chats, setChats] = useState([]);
    const [loading,setLoading] = useState(false);
     const fetchChats = async () => {
        try{
            
            const config = {
                withCredentials: true,
                headers: {
                    "Content-type": "application/json",
                },
            };

            const {data} = await axios.get("http://localhost:5000/api/v1/chat",config);
            console.log(data.data);
            setChats(data.data);
        }catch(error){
            console.error("Error fetching chats:", error);
            alert("Failed to fetch chats. Please try again.");
        }
     }

     useEffect(()=>{
        fetchChats();
      },[]);

    return (
        <div className="container-fluid">
            <h2 className="fw-bold mt-5">Chat Room</h2>
            <div className="d-flex align-items-center mt-4">
                <input
                    type="text"
                    className="form-control rounded-3 px-4 me-3"
                    id="InputUserName"
                    aria-describedby="userNameHelp"
                    placeholder="Search Conversations"
                />
                <button
                    className="btn rounded-circle d-flex justify-content-center align-items-center"
                    style={{
                        background: "#EBBEFE",
                        width: "35px",
                        height: "35px"
                    }}
                >
                    <img
                        src="../images/icon/plus-small.png"
                        alt=""
                        style={{
                            width: "20px", // ลดขนาดเพื่อให้ดูบาลานซ์กับปุ่ม
                        }}
                    />
                </button>
            </div>
            <div className="dropdown">
                <button className="btn dropdown-toggle fw-semibold ps-0 mt-2" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Lastest First
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <a className="dropdown-item" href="#">Something else here</a>
                </div>
            </div>
            <div className="container ps-0">
                {chats.map((chat) => (
                    <OutsideMessage chat={chat} key={chat._id} />
                ))}
            </div>

        </div>
    )
}

export default ChatRoom;