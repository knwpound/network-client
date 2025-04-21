"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const OutsideMessage = ({ chat }) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [color, setColor] = useState("lightgray");
  const [onRead, setOnRead] = useState(true);
  const [userInGroup, setUserInGroup] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || !chat?.users) return;

    const userId = storedUser._id;
    const isInGroup = chat.users.some((u) => u._id === userId);
    setUserInGroup(isInGroup);

    // Name & Color
    if (!chat.isGroupChat) {
      const otherUser = chat.users.find((u) => u._id !== userId);
      setName(otherUser?.name || "Private Chat");
      setColor(otherUser?.profileColor || "lightgray");
    } else {
      setName(`${chat.chatName} (${chat.users.length})`);
      setColor("lightgray");
    }

    // Message & Time (only if user is in group or private chat)
    if (!chat.isGroupChat || isInGroup) {
      setMessage(chat.latestMessage?.content || "");
      setDate(new Date(chat.updatedAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }));
    }
  }, [chat]);

  const handlerOnClick = () => {
    router.push(`/chat/${chat._id}`);
    localStorage.setItem("chat", JSON.stringify(chat));
  };

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
      <div className="ms-3 text-start">
        <p className="fw-bold m-0">{name}</p>
        {userInGroup || !chat.isGroupChat ? (
          <p className="m-0" style={{ fontSize: "14px" }}>{message}</p>
        ) : (
          <p className="m-0" style={{ fontSize: "14px", color: "gray" }}>
            You’re not in this group
          </p>
        )}
      </div>
      <div className="ms-auto mb-0 me-1 text-end">
        {userInGroup || !chat.isGroupChat ? (
          <>
            {!onRead && (
              <div
                className="rounded-circle border border-dark ms-auto mb-3"
                style={{ background: "red", width: "7px", height: "7px" }}
              />
            )}
            <p
              className="fw-semibold mt-3 mb-0"
              style={{ fontSize: "13px", color: "gray" }}
            >
              {date}
            </p>
          </>
        ) : null}
      </div>
    </button>
  );
};

export default OutsideMessage;
