"use client"

import {useState} from "react";
import {registerUser} from "../../services/authService";
import { useRouter } from "next/navigation";

const RegisterForm = () =>{
    const [show,setShow] = useState(false);
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleClick = () => setShow(true);

    const submitHandler = async (e) => {
      e.preventDefault();
      setLoading(true);
      
  
      if (!name || !email || !password) {
          alert("Please fill all the fields.");
          setLoading(false);
          return;
      }
  
      try {
        await registerUser(name, email, password);
        setLoading(false);
        router.push("/chat");

      } catch (error: any) {
        alert(`Registration failed: ${error.message}`);
        setLoading(false);
      }
  };

    return(
        <form>
            <input 
                type="username" 
                className="form-control rounded-5 fw-semibold px-4 mb-3" 
                id="InputUserName" 
                aria-describedby="userNameHelp"
                placeholder="User name"
                style={{background:"#E9E9E9"}}
                onChange={(e)=> setName(e.target.value)}
                required
                />
            <input 
                type="email" 
                className="form-control rounded-5 fw-semibold px-4 mb-3" 
                id="InputEmail" 
                aria-describedby="emailHelp"
                placeholder="Email"
                style={{background:"#E9E9E9"}}
                onChange={(e)=> setEmail(e.target.value)}
                required
                />
              <div className="input-group">
                <input 
                type="password" 
                className="form-control rounded-5 fw-semibold px-4 mb-4" 
                id="InputPassword" 
                placeholder="Password"
                style={{background:"#E9E9E9"}}
                onChange={(e)=> setPassword(e.target.value)}
                required
                />
                {/* <div className="input-group-prepend">
                  <button className="btn btn-outline-secondary" type="button" onClick={handleClick}>{show? "Hide":"Show"}</button>
                </div> */}
              </div>
              
              <button className="btn w-100 rounded-5 fw-bold mb-4"
              style={{background:"#FFCEB4"}}
              onClick={submitHandler}>
                Create Account
              </button>
              <p className="fw-medium">Already have an account?{" "} 
                <a href="/login" className="fw-bold" style={{color:"#FF6500"}}>Log in</a></p>
        </form>
    )
}

export default RegisterForm;