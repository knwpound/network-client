"use client"
import React,{use, useState, useEffect} from "react";
import OutsideMessage from "./OutsideMessage";
import OnlineFriend from "./OnlineFriend";
import axios from "axios";
import socket from "../../../socket/socket.js";
import ChatTypeModal from "../modal/ChatTypeModal";
import { useRouter } from "next/navigation";
import PrivateChatModal from "../modal/PrivateChatModal";

const ChatRoom = () => {
    const [chats, setChats] = useState([]);
    const [loading,setLoading] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [socketConnected, setSocketConnected] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();
    const [showChatTypeModal, setShowChatTypeModal] = useState(false);
    const [showPrivateModal, setShowPrivateModal] = useState(false);

    const serverAddr = process.env.NEXT_PUBLIC_BACKEND_URL;
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

      useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && !socket.connected) {
            socket.connect();
            socket.emit("setup", user);
      
            socket.on("connected", () => {
              console.log("✅ Socket connected!");
            });
          }
          
          return () => {
            socket.off("connected");
          };
      },[]);

      useEffect(() => {
        if (!socket) return;
      
        socket.emit("get online users");
      
        socket.on("online users", (users) => {
          setOnlineUsers(users); // users: array of { _id, name, ... }
        });
      
        return () => {
          socket.off("online users");
        };
      },[]);
      
      const filteredChats = chats.filter((chat) => {
        const lowerSearch = searchTerm.toLowerCase();
        const currentUser = JSON.parse(localStorage.getItem("user"));
      
        if (chat.isGroupChat) {
          return chat.chatName?.toLowerCase().includes(lowerSearch);
        } else {
          const otherUser = chat.users.find(
            (user) => user._id !== currentUser._id
          );
      
          return otherUser?.name?.toLowerCase().includes(lowerSearch);
        }
      });
      

      const handlePrivateClick = () => {
        setShowChatTypeModal(false);
        setShowPrivateModal(true);
      };
    
      const handleGroupClick = () => {
        setShowChatTypeModal(false);
        router.push("/chat/group");
      };
    
      const handleConfirmPrivate = (user: string) => {
        setShowPrivateModal(false);
        console.log("Selected user:", user);
        // You could trigger a request or navigate to a new chat room here
      };
      

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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    onClick={() => setShowChatTypeModal(true)}
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
                            width: "20px", 
                        }}
                    />
                </button>
                <ChatTypeModal
                    show={showChatTypeModal}
                    onClose={() => setShowChatTypeModal(false)}
                    onPrivate={handlePrivateClick}
                    onGroup={handleGroupClick}
                />

                <PrivateChatModal
                    show={showPrivateModal}
                    onClose={() => setShowPrivateModal(false)}
                    onConfirm={handleConfirmPrivate}
                />

            </div>
            <div className="mt-3 d-flex"
             style={{
                width: "320px", 
                maxWidth: "400px", 
                height: "100%", 
                overflowX: "auto",
                overflowY: "hidden",
                scrollbarWidth: "none",      
                msOverflowStyle: "none",
            }}>
                {onlineUsers.map((user) => (
            <OnlineFriend 
                key={user._id}
                name={user.name}
                color={"lightgray"} 
            />
            ))}

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
            <div className="container ps-0" 
            style={{
                scrollbarWidth: "none",      
                msOverflowStyle: "none",
                maxHeight: "280px",
                overflowY: "auto",
                marginTop: "1rem",
                paddingRight: "5px",
              }}>
                {filteredChats.map((chat) => (
                    <OutsideMessage chat={chat} key={chat._id} />
                ))}
            </div>
                {/* <ChatTypeModal/> */}
        </div>
    )
}

export default ChatRoom;