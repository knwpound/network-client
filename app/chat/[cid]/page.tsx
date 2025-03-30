import React from "react";
import SentMessage from "../../ui/chat/SentMessage";
import RecievedMessage from "../../ui/chat/RecievedMessage";

const ChatPage = () =>{
    return(
        <div className="container vh-100 d-flex flex-column bg-white">
            {/* Header */}
            <div className="container d-flex p-3 pt-5 fw-bold align-items-center rounded-top border-bottom">
                <h3 className="fw-bold m-0 ms-3">Susan</h3>
                <button
                type="button"
                className="btn p-2 ms-auto"
                title="Dashboard"
              >
                <img
                  src="../images/icon/settings.png"
                  alt=""
                  style={{
                    width: "25px",
                  }}
                />
              </button>
            </div>

            {/* Chat Box */}
            <div className="flex-grow-1 overflow-auto p-3 bg-white">
                <div className="d-flex flex-column gap-3">
                    <SentMessage message={"Hello, I miss you so much"}/>
                    <RecievedMessage name={"Susan"} color={"Pink"} message={"Miss you too babe"} />
                    <SentMessage message={"Hello, I miss you so much"}/>
                    <RecievedMessage name={"Susan"} color={"Pink"} message={"Miss you too babe"} />
                    <SentMessage message={"Hello, I miss you so much"}/>
                    <RecievedMessage name={"Susan"} color={"Pink"} message={"Miss you too babe"} />
                    <RecievedMessage name={"Susan"} color={"Pink"} message={"Miss you too babe"} />
                </div>
            </div>

            {/* Input Box */}
            <div className="p-3 bg-white border-top d-flex">
                <input type="text" className="form-control me-2 rounded-4 px-5 border border-0" placeholder="Type a message..."
                style={{background:"#FFE4D6"}} />
                <button className="btn fw-semibold">Send</button>
            </div>
        </div>
    )
}

export default ChatPage;