"use client"
import React from "react";
import { useRouter } from "next/navigation";

const OutsideMessage = ({ chat }) => {
  const router = useRouter();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?._id;

  const isInGroup = chat.users?.some((u) => u._id === userId);
  const userInGroup = chat.isGroupChat ? isInGroup : true;

  const otherUser = !chat.isGroupChat
    ? chat.users?.find((u) => u._id !== userId)
    : null;

  const name = !chat.isGroupChat
    ? otherUser?.name || "Private Chat"
    : `${chat.chatName} (${chat.users?.length || 0})`;

  const color = !chat.isGroupChat
    ? otherUser?.profileColor || "lightgray"
    : "lightgray";

  const message = chat.latestMessage?.content || "";
  const date = new Date(chat.updatedAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

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
        style={{ background: color, width: "35px", height: "35px" }}
      >
        <img src="../images/icon/user.png" alt="" style={{ width: "20px" }} />
      </div>
      <div className="ms-3 text-start">
        <p className="fw-bold m-0">{name}</p>
        {userInGroup ? (
          <p className="m-0" style={{ fontSize: "14px" }}>{message}</p>
        ) : (
          <p className="m-0" style={{ fontSize: "14px", color: "gray" }}>
            You’re not in this group
          </p>
        )}
      </div>
      <div className="ms-auto mb-0 me-1 text-end">
        {userInGroup && (
          <>
            <p
              className="fw-semibold mt-3 mb-0"
              style={{ fontSize: "13px", color: "gray" }}
            >
              {date}
            </p>
          </>
        )}
      </div>
    </button>
  );
};

export default OutsideMessage;
