import axios from "axios";

const serverAddr = process.env.NEXT_PUBLIC_BACKEND_URL;

const config = {
    headers: {
        "Content-type": "application/json",
    },
};

export const registerUser = async (name, email, password) => {
    try {
        const role = "user";

        const response = await axios.post(
            `${serverAddr}/api/v1/auth/register`,
            { name, email, password, role },
            {
                withCredentials: true,
                config
            }
        );

        console.log("Registration Successful");
        localStorage.setItem("user", JSON.stringify(response.data.user));
        

        return data;
    } catch (error) {
        if (error.response) {
            console.error("Response error:", error.response.data);
            console.error("Status code:", error.response.status);
        } else if (error.request) {
            console.error("No response received:", error.request);
        } else {
            console.error("Axios error:", error.message);
        }
        throw new Error("Failed to create user. Check console for details.");
    }
};

//Login user


export const login = async (email,password) => {
        try {
            const response = await axios.post(`${serverAddr}/api/v1/auth/login`, 
                {email, password},{
                    withCredentials:true,
                    config 
                } );
            
            if (response.data) {
                localStorage.setItem('user', JSON.stringify(response.data.user)); 
            }
    
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error("Login failed:", error);
            throw new Error("Login failed. Please try again.");
        }
    };
    

//Logout user
const logout = () => {
    localStorage.setItem('user', null);
}
const authService = {
    registerUser,
    // logout,
    login,
}
export default authService;
