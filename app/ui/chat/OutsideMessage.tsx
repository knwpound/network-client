import React from "react";

const OutsideMessage = ({ name, message, date, color, Onread }) => {
    return (
        <button 
            className="btn d-flex align-items-center rounded-3 shadow-sm py-2 mb-2" 
            style={{ background: "white" }}
        >
            <div 
                className="ms-3 rounded-circle d-flex justify-content-center align-items-center" 
                style={{
                    background: color,
                    width: "35px",
                    height: "35px"
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
                <p className="fw-bold  m-0">{name}</p>
                <p className="m-0" style={{ fontSize: "14px" }}>{message}</p>
            </div>
            <div className="ms-4 mb-0 me-1">
            {!Onread && (
                    <div 
                        className="rounded-circle border border-dark ms-auto mb-3"
                        style={{ background: "red", width: "7px", height: "7px" }}
                    />
                )}
                <p 
                className="fw-semibold text-end mt-3 mb-0"
                style={{ fontSize: "13px", color: "gray" }}
            >
                {date}
            </p>
            </div>
            
        </button>
    );
};

export default OutsideMessage;