"use client"
import React,{useEffect, useState, useRef} from "react";
import SentMessage from "../../ui/chat/SentMessage";
import RecievedMessage from "../../ui/chat/RecievedMessage";
import {sendMessage,fetchAllMessages,markMessagesAsRead} from "../../../services/message";
import { useParams } from "next/navigation";
import socket from "../../../socket/socket.js";
import DropDownList from "../../ui/chat/DropDownList";
import LeaveModal from "../../ui/modal/LeaveModal";
import RenameGroupModal from "../../ui/modal/RenameGroupModal";
import AddFriendModal from "../../ui/modal/AddFriendModal";
import KickFriendModal from "../../ui/modal/KickFriendModal";
var selectedChatCompare;

const ChatPage = () =>{
  const params = useParams();
  const cid = String(params!.cid);
  const [messages, setMessages] = useState([]);
  const [loading,setLoading]= useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  // const [socketConnected, setSocketConnected] = useState(false);
  const [chatName, setChatName] = useState("Sender");
  const [chat, setChat] = useState();
  const bottomRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);       
  const selectedChatCompareRef = useRef("");
  const toggleDropdown = () => {
              setIsOpen(!isOpen);
            };
  const fetchMessages = async () => {
    try {
      setLoading(true);
  
      const data = await fetchAllMessages(cid);
      const data2 = await markMessagesAsRead(cid);
      setMessages(data.data);  
      
      if (socket.connected) {
        socket.emit("join chat", cid);
      }

    } catch (error) {
      console.error("Error fetching messages:", error);
      alert("Failed to fetch messages. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (cid) 
      fetchMessages();
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(user);
    
    const chat = JSON.parse(localStorage.getItem("chat"));
    setChat(chat);
    if(!chat.isGroupChat){
      if(chat.users[0]._id==user._id){
        setChatName(chat.users[1].name);
      }else{
        setChatName(chat.users[0].name);
      }
    }else{
      setChatName(`${chat.chatName} (${chat.users.length})`);
    }

  }, [cid]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (!cid || cid !== newMessageRecieved.chat._id) return;
  
      // Update local state first
      setMessages((prevMessages) => {
        const updated = [...prevMessages, newMessageRecieved];
  
        // Scroll to bottom
        setTimeout(() => {
          bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
  
        // Delay marking as read slightly AFTER state is updated
        setTimeout(() => {
          markMessagesAsRead(cid).catch((err) =>
            console.error("Failed to mark as read:", err)
          );
        }, 150); // wait until the new message is rendered
  
        return updated;
      });
    });
  
    return () => {
      socket.off("message recieved");
    };
  }, [cid]);
  
  
  useEffect(() => {
    socket.on("messages read", ({ chatId, readerId }) => {
      console.log("📬 Server pushed read:", chatId, readerId);
      console.log("yayS");
      // Update local message state if needed
      setMessages((prevMessages) =>
        prevMessages.map((msg) => {
          const chatMatch = msg.chat === chatId || msg.chat?._id === chatId;
          const alreadyRead = msg.readBy.includes(readerId);
      
          console.log(
            `[MAP] msgID: ${msg._id} | chatMatch: ${chatMatch} | alreadyRead: ${alreadyRead}`
          );
      
          if (chatMatch && !alreadyRead) {
            console.log(`🔄 Updating readBy for message ${msg._id}`);
            return { ...msg, readBy: [...msg.readBy, readerId] };
          }
      
          return msg;
        })
      );
      
    });
  
    return () => {
      socket.off("messages read");
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50); // delay ensures DOM is fully rendered
  
    return () => clearTimeout(timeout);
  }, [messages]);
  

  const handleSendMessage = async (e) => {
    if (newMessage) {
      try {
        const messageData = {
          content: newMessage,
          chatId: cid,
        };
  
        const sentMessage = await sendMessage(messageData);
  
        const updatedMessage = {
          ...sentMessage.data,
          readBy: [...(sentMessage.data.readBy || []), currentUser._id], // 👈 ensure you appear in readBy
        };
  
        setNewMessage("");
  
        socket.emit("new message", updatedMessage);
        setMessages([...messages, updatedMessage]); // 👈 update with local readBy
  
      } catch (error) {
        alert(`Failed to send message: ${error.message}`);
      }
    }
  };

  const typingHandler = (e) =>{
    setNewMessage(e.target.value);

    //Typing Indicator Logic
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }


    return(
        <div className="container vh-100 d-flex flex-column bg-white">
            {/* Header */}
            <div className="container d-flex p-3 pt-5 fw-bold align-items-center rounded-top border-bottom">
                
                <div className="dropdown  m-0 ms-3">
                <button className="btn fw-bold fs-3" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                onClick={toggleDropdown}>
                  {chatName}
                </button>
                <div className={`dropdown-menu ${isOpen ? "show" : ""}`} aria-labelledby="dropdownMenuButton">
                {chat.users.map(user => {
                  return <div key={user.email} className="fw-medium ms-3">{user.name}</div>;
                })}

                  
                </div>
              </div>
                <DropDownList chat={chat} currentUser={currentUser} /> 
            </div>

            {/* Chat Box */}
            <div className="flex-grow-1 overflow-auto p-3 bg-white" 
            >
                <div className="d-flex flex-column gap-3">
                    {loading?(
                      <div>Loading</div>
                    ):(
                      <div> {/* Messages */}
                        {messages.map((message) => {
                            const isSentByMe = message.sender?._id === currentUser?._id;
                            return isSentByMe ? (
                              <SentMessage
                              key={message._id}
                              message={message.content}
                              time={message.createdAt}
                              readBy={message.readBy} // pass read status
                            />
                            ) : (
                              <RecievedMessage
                              key={message._id}
                              name={message.sender?.name}
                              color={message.sender?.profileColor}
                              message={message.content}
                              time={message.createdAt}
                            />
                            );
                          })}
                        <div ref={bottomRef} />
                      </div>
                      
                    )}
                    
                </div>
            </div>

            {/* Input Box */}
            <div className="p-3 bg-white border-top d-flex">
                <input type="text" className="form-control me-2 rounded-4 px-5 border border-0" placeholder="Type a message..."
                style={{background:"#FFE4D6"}} 
                onChange={typingHandler}
                value={newMessage}
                required
                />
                <button className="btn fw-semibold" onClick={handleSendMessage}>Send</button>
            </div>
            {/* <LeaveModal/> */}
            {/* <RenameGroupModal/> */}
            {/* <AddFriendModal/> */}
            {/* <KickFriendModal/> */}
        </div>
    )
}

export default ChatPage;