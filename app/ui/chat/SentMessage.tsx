import React, { forwardRef } from "react";

const SentMessage = forwardRef(({ message, time, readBy = [], onClick }, ref) => {
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

  const seenByCount = readBy.length > 1 ? readBy.length - 1 : 0;

  return (
    <div className="d-flex flex-column align-items-end" ref={ref} onClick={onClick} style={{ cursor: onClick ? "pointer" : "default" }}>
      {/* Message bubble */}
      <div
        className="p-2 px-3 rounded-3 mt-3 text-white"
        style={{ maxWidth: "60%", background: "#FFCEB4" }}
      >
        {message}
      </div>

      {/* Timestamp + Read status */}
      <small className="text-muted mt-1 me-2">
        {formatDateTime(time)}
        {seenByCount > 0 && ` • Seen by ${seenByCount}`}
      </small>
    </div>
  );
});

export default SentMessage;
