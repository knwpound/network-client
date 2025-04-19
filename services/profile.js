import axios from "axios";

const serverAddr = process.env.NEXT_PUBLIC_BACKEND_URL;

const config = {
    headers: {
        "Content-type": "application/json",
    },
};

export const userLogout = async () => {
    try {
        const response = await axios.get(`${serverAddr}/api/v1/auth/logout`,
            {
                withCredentials: true,
                config,
            }
        );
        localStorage.clear();
        sessionStorage.clear();
        document.cookie.split(';').forEach(cookie => {
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
        });
        return;
    } catch (error) {
        console.error("Failed to logout:", error);
        throw new Error("Failed to logout. Please try again.");
    }
};

export const deleteAccount = async (userId) => {
    try {
        const response = await axios.delete(`${serverAddr}/api/v1/users/${userId}`,
            {
                withCredentials: true,
                config,
            }
            
        );
        userLogout()

        return response.data;
    } catch (error) {
        console.error("Failed to delete account:", error);
        throw new Error("Failed to delete account. Please try again.");
    }
};

export const createPrivateChat = async (userId) => {
    try {
        const response = await axios.post(`${serverAddr}/api/v1/chat`, {
                userId: userId
            },
            {
                withCredentials: true,
                config,
            }
        )

        if (response.data) {
            localStorage.setItem('chat', JSON.stringify(response.data));
        }
        
        return response.data;
    } catch (error) {
        console.error("Failed to create private chat:", error);
        throw new Error("Failed to create private chat. Please try again.");
    }
};
