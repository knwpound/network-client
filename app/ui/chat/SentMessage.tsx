import React from "react";

const SentMessage = ({ message, time, readBy = [] }) => {
  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString([], {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="d-flex flex-column align-items-end">
      <div
        className="p-2 px-3 rounded-3 mt-3 text-white"
        style={{ maxWidth: "60%", background: "#FFCEB4" }}
      >
        {message}
      </div>
      <small className="text-muted mt-1 me-2">
        {formatDateTime(time)} {readBy.length > 1 && `• Seen by ${readBy.length - 1}`}
      </small>
    </div>
  );
};

export default SentMessage;
