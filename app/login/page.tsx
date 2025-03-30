import React from "react";
import LoginForm from "../ui/LoginForm";

const LoginPage = () => {
  return (
    <div className="row justify-content-center align-items-center vh-100">
      <div className="col-11 col-sm-10 col-md-7 col-lg-5">
        <div className="container rounded-4 p-5 text-center bg-white shadow">
          <h1 className="fw-bold mb-4">Log In</h1>
          <p className="m">Hello Friends! I’m Youchat, your chat companion.
            Please log in to Chat to message others</p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
