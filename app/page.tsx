"use client";

import React from "react";
import { useRouter } from "next/navigation";
import LogInButton from "./components/LogInButton";
import SignUpButton from "./components/SignUpButton";


export default function Home() {
  const router = useRouter();

  return (
    <div
      className="mt-4 mx-auto d-flex flex-column justify-content-center"
      style={{ width: "1200px", height: "800px" }}
    >
      <div className="container rounded-4 p-5 text-center bg-white shadow">
        <div className="row justify-content-between align-items-center h-100">
          <div className="col-12 col-md-7">
            <h1 className="d-flex align-items-center gap-2 mb-4 mt-5 ps-3">
              <img
                src="images/homepage_icon.png"
                alt="Chat Icon"
                style={{ width: "50px", height: "50px" }}
              />
              <span>
                Welcome to <span className="display-4 fw-bold">Chatty</span>!
              </span>
            </h1>
  
            <p className="text-muted text-start">
              Chatty is your go-to platform for instant, secure, and seamless conversations. Whether
              you're connecting with friends, collaborating with a team, or meeting new people,
              we make chatting easy and fun — anytime, anywhere.
            </p>
            <div className="d-flex gap-3 mt-4 ps-4">
              <LogInButton onClick={() => router.push("/login")} />
              <SignUpButton onClick={() => router.push("/register")} />
            </div>
          </div>
  
          <div className="d-none d-md-block col-md-5 text-end text-xl-center">
            <img
              src="images/chatty_mascot.png"
              alt="Chatty Mascot"
              className="img-fluid"
              style={{ maxWidth: "500px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );  
  
}
