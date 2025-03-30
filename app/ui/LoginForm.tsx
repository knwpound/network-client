import React from "react";

const LoginForm = () =>{
    return(
        <form>
            <input 
                type="email" 
                className="form-control rounded-5 fw-semibold px-4 mb-3" 
                id="InputEmail" 
                aria-describedby="emailHelp"
                placeholder="Email"
                style={{background:"#E9E9E9"}}
                />
              <input 
                type="password" 
                className="form-control rounded-5 fw-semibold px-4 mb-4" 
                id="InputPassword" 
                placeholder="Password"
                style={{background:"#E9E9E9"}}
                />
              <button className="btn w-100 rounded-5 fw-bold mb-4"
              style={{background:"#FFCEB4"}}>
                Log in
              </button>
              <p className="fw-medium">Don't have an account?{" "} 
                <a href="/register" className="fw-bold" style={{color:"#FF6500"}}>Sign up</a></p>
        </form>
    )
}

export default LoginForm;