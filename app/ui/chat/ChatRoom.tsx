"use client"
import React, { useEffect, useState } from "react";
import OutsideMessage from "./OutsideMessage";
import OnlineFriend from "./OnlineFriend";
import axios from "axios";
import socket from "../../../socket/socket.js";
import ChatTypeModal from "../modal/ChatTypeModal";
import { useRouter } from "next/navigation";
import PrivateChatModal from "../modal/PrivateChatModal";

const ChatRoom = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showChatTypeModal, setShowChatTypeModal] = useState(false);
  const [showPrivateModal, setShowPrivateModal] = useState(false);
  const router = useRouter();

  const fetchChats = async () => {
    try {
      const config = {
        withCredentials: true,
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/chat`, config);
  
      const chatList = data.data;
      setChats(chatList);
    
      // ✅ Join all chat rooms so we can receive socket messages
      chatList.forEach((chat) => {
        socket.emit("join chat", chat._id);
        console.log("🔗 Joined chat room:", chat._id);
      });
    } catch (error) {
      console.error("Error fetching chats:", error);
      alert("Failed to fetch chats. Please try again.");
      router.push("/");
    }
  };
  

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.emit("get online users");

    socket.on("online users", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("online users");
    };
  }, []);

  // ✅ Socket listener: message recieved
  useEffect(() => {
    socket.on("message recieved", (newMsg) => {
      setChats((prevChats) => {
        const updated = [...prevChats];
        const index = updated.findIndex((c) => c._id === newMsg.chat._id);
        if (index !== -1) {
          const updatedChat = { ...updated[index], latestMessage: newMsg };
          updated.splice(index, 1);
          updated.unshift(updatedChat);
        }
        return updated;
      });
    });

    return () => socket.off("message recieved");
  }, []);

  // ✅ Socket listener: group updated
  useEffect(() => {
    socket.on("group updated", ({ chatId, users }) => {
      setChats((prev) =>
        prev.map((chat) =>
          chat._id === chatId ? { ...chat, users } : chat
        )
      );
    });

    return () => socket.off("group updated");
  }, []);

  const filteredChats = chats.filter((chat) => {
    const lowerSearch = searchTerm.toLowerCase();
    const currentUser = JSON.parse(localStorage.getItem("user"));

    if (chat.isGroupChat) {
      return chat.chatName?.toLowerCase().includes(lowerSearch);
    } else if (Array.isArray(chat.users)) {
      const otherUser = chat.users.find((user) => user._id !== currentUser._id);
      return otherUser?.name?.toLowerCase().includes(lowerSearch);
    }
    return false;
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
    // Trigger or create private chat logic
  };

  return (
    <div className="container-fluid">
      <h2 className="fw-bold mt-5">Chat Room</h2>

      <div className="d-flex align-items-center mt-4">
        <input
          type="text"
          className="form-control rounded-3 px-4 me-3"
          placeholder="Search Conversations"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => setShowChatTypeModal(true)}
          className="btn rounded-circle d-flex justify-content-center align-items-center"
          style={{ background: "#EBBEFE", width: "35px", height: "35px" }}
        >
          <img src="../images/icon/plus-small.png" alt="" style={{ width: "20px" }} />
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

      <div
        className="mt-3 d-flex"
        style={{
          width: "320px",
          maxWidth: "400px",
          height: "100%",
          overflowX: "auto",
          overflowY: "hidden",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {onlineUsers.map((user) => (
          <OnlineFriend key={user._id} name={user.name} color={"lightgray"} />
        ))}
      </div>

      <div
        className="container ps-0"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          maxHeight: "320px",
          overflowY: "auto",
          marginTop: "1rem",
          paddingRight: "5px",
        }}
      >
        {filteredChats.map((chat) => (
          <OutsideMessage chat={chat} key={chat._id} />
        ))}
      </div>
    </div>
  );
};

export default ChatRoom;
