"use client"
import React,{useEffect, useState, useRef} from "react";
import SentMessage from "../../ui/chat/SentMessage";
import RecievedMessage from "../../ui/chat/RecievedMessage";
import {sendMessage,fetchAllMessages} from "../../../services/message";
import { useParams } from "next/navigation";
import socket from "../../../socket/socket.js";

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
  const bottomRef = useRef(null);
  const selectedChatCompareRef = useRef("");

  const fetchMessages = async () => {
    try {
      setLoading(true);
  
      const data = await fetchAllMessages(cid);
      
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

  useEffect(() =>{
    socket.on('message recieved',(newMessageRecieved)=>{
      console.log("I'm here");
      if(!cid || cid !== newMessageRecieved.chat._id){
        console.log(cid,newMessageRecieved.chat._id);
      }else{
        console.log("Received message:", newMessageRecieved);
        setMessages((prevMessages) => [...prevMessages, newMessageRecieved]);
      }
      
    });
    return () => {
      socket.off('message recieved');
    };
  },[]);
  

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  

  const handleSendMessage = async (e) =>{
    if(newMessage){
      try {
        const messageData = {
          content: newMessage, 
          chatId: cid, 
        };
  
        const sentMessage = await sendMessage(messageData);
  
        setNewMessage(""); 

        socket.emit('new message', sentMessage.data);
        console.log("1");
        setMessages([...messages,sentMessage.data]);
        
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
                <h3 className="fw-bold m-0 ms-3">{chatName}</h3>
                <button
                type="button"
                className="btn p-2 ms-auto"
                title="Dashboard"
              >
                <img
                  src="../images/icon/settings.png"
                  alt=""
                  style={{
                    width: "25px",
                  }}
                />
              </button>
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
                              <SentMessage key={message._id} message={message.content} />
                            ) : (
                              <RecievedMessage
                                key={message._id}
                                name={message.sender?.name}
                                color={message.sender?.profileColor}
                                message={message.content}
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
        </div>
    )
}

export default ChatPage;