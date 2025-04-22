"use client";
import React from "react";

const OutsideMessage = ({ chat, unreadCount = 0, onClick }) => {
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

  return (
    <button
      className="btn d-flex align-items-center rounded-3 shadow-sm py-2 mb-2 w-100"
      style={{ background: "white" }}
      onClick={onClick} // 🔁 Controlled by parent
    >
      <div
        className="ms-3 rounded-circle d-flex justify-content-center align-items-center"
        style={{ background: color, width: "35px", height: "35px" }}
      >
        <img src="../images/icon/user.png" alt="" style={{ width: "20px" }} />
      </div>
      <div className="ms-3 text-start flex-grow-1">
        <p className="fw-bold m-0">{name}</p>
        {userInGroup ? (
          <p className="m-0" style={{ fontSize: "14px" }}>{message}</p>
        ) : (
          <p className="m-0" style={{ fontSize: "14px", color: "gray" }}>
            You’re not in this group
          </p>
        )}
      </div>
      <div className="ms-auto mb-0 me-1 text-end d-flex flex-column align-items-end">
        {userInGroup && (
          <>
            <p
              className="fw-semibold mt-3 mb-0"
              style={{ fontSize: "13px", color: "gray" }}
            >
              {date}
            </p>
            {unreadCount > 0 && (
              <div
                className="badge bg-danger rounded-pill mt-1"
                style={{ fontSize: "12px", padding: "4px 8px", minWidth: "24px" }}
              >
                {unreadCount > 99 ? "99+" : unreadCount}
              </div>
            )}
          </>
        )}
      </div>
    </button>
  );
};

export default OutsideMessage;
