import React from "react";
import OutsideMessage from "./OutsideMessage";

const ChatRoom = () => {
    return (
        <div className="container-fluid">
            <h2 className="fw-bold mt-5">Chat Room</h2>
            <div className="d-flex align-items-center mt-4">
                <input
                    type="text"
                    className="form-control rounded-3 px-4 me-3"
                    id="InputUserName"
                    aria-describedby="userNameHelp"
                    placeholder="Search Conversations"
                />
                <button
                    className="btn rounded-circle d-flex justify-content-center align-items-center"
                    style={{
                        background: "#EBBEFE",
                        width: "35px",
                        height: "35px"
                    }}
                >
                    <img
                        src="../images/icon/plus-small.png"
                        alt=""
                        style={{
                            width: "20px", // ลดขนาดเพื่อให้ดูบาลานซ์กับปุ่ม
                        }}
                    />
                </button>
            </div>
            <div className="dropdown">
                <button className="btn dropdown-toggle fw-semibold ps-0 mt-2" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Lastest First
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <a className="dropdown-item" href="#">Something else here</a>
                </div>
            </div>
            <div className="container ps-0">
            <OutsideMessage 
                name="John Doe" 
                message="See you next week!" 
                date="Yesterday" 
                color="#D9D9D9" 
                Onread={true}
            />
            <OutsideMessage 
                name="John Doe" 
                message="See you next week!" 
                date="Yesterday" 
                color="#D9D9D9" 
                Onread={true}
            />
            <OutsideMessage 
                name="John Doe" 
                message="See you next week!" 
                date="Yesterday" 
                color="#D9D9D9" 
                Onread={false}
            />
            <OutsideMessage 
                name="John Doe" 
                message="See you next week!" 
                date="Yesterday" 
                color="#D9D9D9" 
                Onread={true}
            />
            <OutsideMessage 
                name="John Doe (3)" 
                message="See you next week!" 
                date="Yesterday" 
                color="#D9D9D9" 
                Onread={true}
            />
            </div>

        </div>
    )
}

export default ChatRoom;