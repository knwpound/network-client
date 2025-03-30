
import React from "react";

const Navbar = () =>{
    return(
        <nav
          className="navbar navbar-dark align-items-center justify-content-center px-3"
          style={{
            backgroundColor: "white",
            width: "70px",
            height: "100vh", // ทำให้ Navbar เต็มจอแนวตั้ง
          }}
        >
            <img 
                src="../images/icon/chat.png" 
                alt="Icon" 
                style={{
                    width: "25px",
                    marginTop:"-70px"
                }}
            />
            <div className="row align-items-center mb-5 mx-2 mt-auto"> {/* ไว้ใส่ icon หรือ menu */} 
              <a
                href="/chat"
                className="p-0 mb-4"
                title="Home"
              >
                <img
                  src="../images/icon/home.png"
                  alt=""
                  style={{
                    width: "25px",
                  }}
                />
              </a>
              <a
                href="/chat/group"
                className="p-0 mb-4 "
                title="Create Group"
              >
                <img
                  src="../images/icon/square-plus.png"
                  alt=""
                  style={{
                    width: "25px",
                  }}
                />
              </a>
              <a
                href="/chat/profile"
                className="p-0 mb-4 rounded-circle d-flex align-items-center justify-content-center"
                title="Profile"
                style={{
                    background:"#FFCEB4",
                    width:"25px",
                    height:"25px"
                }}
              >
                <img
                  src="../images/icon/user.png"
                  alt=""
                  style={{
                    width: "22px",
                  }}
                />
              </a>
            </div>
        </nav>
    )
}

export default Navbar;