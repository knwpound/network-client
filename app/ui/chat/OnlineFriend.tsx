import React from "react";

const OnlineFriend = ({name,color}) =>{
    return(
        <button className="flex bg-white rounded-3 p-2 me-2 d-flex flex-column justify-content-center align-items-center shadow-sm border-0" 
                style={{width: "100px",
                    minWidth: "100px",
                    maxWidth: "100px",
                    position: "relative"
                    }}>
                    <div className="rounded-circle mt-1" 
                    style={{
                        background: color,
                        width: "35px",
                        height: "35px",
                        position: "relative"
                    }}>
                    </div>
                    <div 
                        className="rounded-circle border border-2 border-white" 
                        style={{
                        background: "#73EA5B",
                        width: "12px",
                        height: "12px",
                        position: "absolute",
                        top: "32px", 
                        right: "28px", 
                        }}
                    >
                    </div>

                <p className="fw-bold m-0 mt-2">{name}</p>
                </button>
    )
}

export default OnlineFriend;