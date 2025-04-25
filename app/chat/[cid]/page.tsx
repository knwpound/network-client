"use client";
import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import SentMessage from "../../ui/chat/SentMessage";
import RecievedMessage from "../../ui/chat/RecievedMessage";
import DropDownList from "../../ui/chat/DropDownList";
import socket from "../../../socket/socket.js";
import { sendMessage, fetchAllMessages, markMessagesAsRead } from "../../../services/message";
import { addFriend } from "../../../services/group";
import axios from "axios";

const ChatPage = () => {
  const params = useParams();
  const router = useRouter();
  const cid = String(params!.cid);

  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatName, setChatName] = useState("Sender");
  const [currentUser, setCurrentUser] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [userInGroup, setUserInGroup] = useState(true);
  const [isGroupAdmin, setIsGroupAdmin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [searchMessageTerm, setSearchMessageTerm] = useState(""); // Search term for messages
  const bottomRef = useRef(null);
  
  const messageRefs = useRef([]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const fetchChatInfo = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/chat/${cid}`, {
        withCredentials: true,
      });
  
      const chatData = response.data.data;
  
      if (chatData && chatData.users && chatData._id) {
        setChat(chatData);
        localStorage.setItem("chat", JSON.stringify(chatData));
      } else {
        throw new Error("Incomplete chat data");
      }
    } catch (error) {
      console.error("❌ Failed to load chat info:", error);
      alert("Chat not found or you don't have access.");
      router.push("/chat");
    }
  };

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const data = await fetchAllMessages(cid);
      await markMessagesAsRead(cid);
      setMessages(data.data);
      if (socket.connected) {
        socket.emit("join chat", cid);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      alert("Failed to fetch messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user?._id) return;

    setCurrentUser(user);

    const cachedChat = JSON.parse(localStorage.getItem("chat"));

    if (cachedChat && cachedChat._id === cid) {
      setChat(cachedChat);
    } else {
      fetchChatInfo();
    }
  }, [cid]);

  useEffect(() => {
    if (!chat || !currentUser) return;

    if (chat.isGroupChat) {
      const isAdmin = chat.groupAdmin?._id === currentUser._id;
      setIsGroupAdmin(isAdmin);
      const isInGroup = chat.users?.some((u) => u._id === currentUser._id);
      setUserInGroup(isInGroup);
      setChatName(`${chat.chatName} (${chat.users?.length || 0})`);
      if (isInGroup) fetchMessages();
    } else {
      setIsGroupAdmin(false);
      setUserInGroup(true);
  
      const other = chat.users?.find((u) => u._id !== currentUser._id);
      setChatName(other?.name || "Private Chat");
      fetchMessages();
    }
  }, [chat, currentUser]);

  useEffect(() => {
    const handleMessageReceived = (newMsg) => {
      if (newMsg.chat._id !== cid) return;
      setMessages((prev) => [...prev, newMsg]);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
      setTimeout(() => markMessagesAsRead(cid), 150);
    };
  
    socket.on("message recieved", handleMessageReceived);
  
    return () => {
      socket.off("message recieved", handleMessageReceived); 
    };
  }, [cid]);

  useEffect(() => {
    socket.on("messages read", ({ chatId, readerId }) => {
      setMessages((prev) =>
        prev.map((msg) => {
          const match = msg.chat === chatId || msg.chat?._id === chatId;
          const alreadyRead = msg.readBy.includes(readerId);
          return match && !alreadyRead
            ? { ...msg, readBy: [...msg.readBy, readerId] }
            : msg;
        })
      );
    });
    return () => socket.off("messages read");
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    return () => clearTimeout(timeout);
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      const sent = await sendMessage({ content: newMessage, chatId: cid });
      const updated = { ...sent.data, readBy: [currentUser._id] };
      setNewMessage("");
      socket.emit("new message", updated);
    
    } catch (error) {
      alert(`Failed to send message: ${error.message}`);
    }
  };

  const handleGroupUpdated = ({ chatId, users, chatName }) => {
    if (chatId === cid && chat) {
      const updatedChat = {
        ...chat,
        users,
        chatName,
      };
      setChat(updatedChat);
      setChatName(`${chatName} (${users.length})`);
    }
  };

  useEffect(() => {
    socket.on("group updated", handleGroupUpdated);
    return () => socket.off("group updated", handleGroupUpdated);
  }, [cid, chat]);
  
  const typingHandler = (e) => setNewMessage(e.target.value);

  // Search messages based on the searchTerm
  const filteredMessages = messages.filter((message) => {
    return (
      message.content.toLowerCase().includes(searchTerm.toLowerCase()) || 
      chat.chatName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Function to handle scrolling to a message
  const scrollToMessage = (index) => {
    messageRefs.current[index].scrollIntoView({ behavior: "smooth" });
  };

  const handleJoinGroup = async () => {
    try {
      if (socket.connected) {
        socket.emit("join chat", cid); 
        console.log("✅ Emitting join chat");
      }
      await addFriend(cid, currentUser.email);
      setUserInGroup(true);
    } catch (err) {
      alert("Failed to join group: " + err.message);
    }
  };

  const handleSearchClick = (message) => {
    setSearchTerm(""); // Clear search term
    const messageIndex = messages.findIndex((msg) => msg._id === message._id);
    scrollToMessage(messageIndex); // Scroll to the message
  };

  if (!chat) return <div>Loading...</div>;

  return (
    <div className="container vh-100 d-flex flex-column bg-white">
      <div className="container d-flex p-3 pt-5 fw-bold align-items-center border-bottom">
        <div className="dropdown m-0 ms-3">
          <button className="btn fw-bold fs-3" onClick={toggleDropdown}>{chatName}</button>
          <div className={`dropdown-menu ${isOpen ? "show" : ""}`}>
            {chat.users?.map((user) => (
              <div key={user.email} className="fw-medium ms-3">{user.name}</div>
            ))}
          </div>
        </div>
        <DropDownList chat={chat} currentUser={currentUser} />
      </div>

      {chat.isGroupChat && !userInGroup && (
        <div className="container text-center mt-4">
          <h4 className="mb-3">You're not a member of this group.</h4>
          <button
            className="btn btn-primary px-4 py-2 rounded-4"
            onClick={handleJoinGroup}
          >
            Join Group (Add Yourself)
          </button>
        </div>
      )}

      {/* Only render message input and search if the user is in the group */}
      {userInGroup && (
        <>
          

          <div className="flex-grow-1 overflow-auto p-3 bg-white">
            <div className="d-flex flex-column gap-3">
              {loading ? (
                <div>Loading...</div>
              ) : (
                <>
                  {filteredMessages.map((message, index) => {
  const isMe = message.sender?._id === currentUser?._id;

  return isMe ? (
    <SentMessage
      key={message._id}
      ref={(el) => (messageRefs.current[index] = el)}
      message={message.content}
      time={message.createdAt}
      readBy={message.readBy}
      onClick={() => {
        setSearchTerm(""); // Clear search
        messageRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
      }}
    />
  ) : (
    <RecievedMessage
      key={message._id}
      ref={(el) => (messageRefs.current[index] = el)}
      name={message.sender?.name}
      color={message.sender?.profileColor}
      message={message.content}
      onClick={() => {
        setSearchTerm(""); // Clear search
        messageRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
      }}
    />
  );
})}

                  <div ref={bottomRef} />
                </>
              )}
            </div>
          </div>
          <div className="sticky-top p-3">
            {/* Search input */}
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term
            />
          </div>
          <div className="p-3 bg-white border-top d-flex">
            <input
              type="text"
              className="form-control me-2 rounded-4 px-5 border border-0"
              placeholder="Type a message..."
              style={{ background: "#FFE4D6" }}
              onChange={typingHandler}
              value={newMessage}
            />
            <button className="btn fw-semibold" onClick={handleSendMessage}>Send</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatPage;
