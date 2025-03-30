import React from "react";

const MainPage = () =>{
    return(
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: "100vh" }}>
            <h1 className="fw-bold mb-4" style={{color:"white", textShadow: "2px 2px 5px gray"}}>Welcome to Chat</h1>
            <h6 className="text-white fw-semibold">Chat with your friends, share</h6>
            <h6 className="text-white fw-semibold"> story and create memories</h6>
            <h6 className="text-white fw-semibold">with our application</h6>
            <button className="btn text-white fw-bold  shadow-sm rounded-5 px-5 mt-3" style={{background:"#FFCEB4"}}>Start Chat</button>
        </div>
    )
}

export default MainPage;