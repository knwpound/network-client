"use client"

import {useState} from "react";
import {login} from "../../services/authService";
import { useRouter } from "next/navigation";

const LoginForm = () =>{
  const [show,setShow] = useState(false);
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => setShow(true);
  
      const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        
    
        if (!email || !password) {
            alert("Please fill all the fields.");
            setLoading(false);
            return;
        }
    
        try {
          await login(email, password);
          setLoading(false);
          router.push("/chat");
  
        } catch (error: any) {
          alert(`Log in failed: ${error.message}`);
          setLoading(false);
        }
    };

    return(
        <form>
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
              <input 
                type="password" 
                className="form-control rounded-5 fw-semibold px-4 mb-4" 
                id="InputPassword" 
                placeholder="Password"
                style={{background:"#E9E9E9"}}
                onChange={(e)=> setPassword(e.target.value)}
                required
                />
              <button className="btn w-100 rounded-5 fw-bold mb-4"
              style={{background:"#FFCEB4"}}
              onClick={submitHandler}>
                Log in
              </button>
              <p className="fw-medium">Don't have an account?{" "} 
                <a href="/register" className="fw-bold" style={{color:"#FF6500"}}>Sign up</a></p>
        </form>
    )
}

export default LoginForm;