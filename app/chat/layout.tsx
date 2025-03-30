"use client";
import React from "react";
import { useParams } from "next/navigation";
import Navbar from "../ui/navbar/NavBar";
import ChatRoom from "../ui/chat/ChatRoom";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <div className="d-flex h-screen">
        {/* Sidebar / Navbar */}
        <Navbar/>

        {/* Content Area */}
        <div className="container-fluid">
            <div className="row ">
                {/* Col 1 */}
                <div className="col-4 px-4 vh-100 shadow-sm" style={{backgroundColor:"#FBDAEB"}}>
                    <ChatRoom/>
                
                </div>

                {/* Col 2 */}
                <div className="col-6 flex-grow-1 md:overflow-y-auto p-0">
                    {children}
                </div>
        </div>
</div>
      </div>
    );
  }
  
