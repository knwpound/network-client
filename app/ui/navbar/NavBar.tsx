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
                src="../images/icon/home.png" 
                alt="" 
                style={{
                    width: "25px",
                    marginTop:"-70px"
                }}
            />
            <div className="row align-items-center mb-5 mx-2 mt-auto"> {/* ไว้ใส่ icon หรือ menu */} 
              <button
                type="button"
                className="btn p-0 mb-4"
                title="Dashboard"
              >
                <img
                  src="../images/icon/home.png"
                  alt=""
                  style={{
                    width: "25px",
                  }}
                />
              </button>
              <button
                type="button"
                className="btn p-0 mb-4"
                title="Dashboard"
              >
                <img
                  src="../images/icon/square-plus.png"
                  alt=""
                  style={{
                    width: "25px",
                  }}
                />
              </button>
              <button
                type="button"
                className="btn p-0 mb-4 rounded-circle"
                title="Dashboard"
                style={{
                    background:"#FFCEB4",
                    
                }}
              >
                <img
                  src="../images/icon/user.png"
                  alt=""
                  style={{
                    width: "22px",
                  }}
                />
              </button>
            </div>
        </nav>
    )
}

export default Navbar;