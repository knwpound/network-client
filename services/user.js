import axios from "axios";

const serverAddr = process.env.NEXT_PUBLIC_BACKEND_URL;

const config = {
    headers: {
        "Content-type": "application/json",
    },
};

export const changeUserInfo = async (data) => {
    try {
        const { userId, info } = data;

        const response = await axios.put(`${serverAddr}/api/v1/users/${userId}`, 
            info, 
            {
                withCredentials: true, // ใช้ cookie ถ้ามี
                headers: {
                    'Content-Type': 'application/json',  // แจ้งให้ server รู้ว่าเป็น JSON
                },
              }
        );
        
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data.data));
        }

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to update user info:", error);
        throw new Error("Failed to update user info. Please try again.");
    }
};

export const getUsers = async (query) => {
    try {
        const response = await axios.get(`${serverAddr}/api/v1/users`, {
            withCredentials: true, // ใช้ cookie ถ้ามี
            headers: {
                'Content-Type': 'application/json', // แจ้งให้ server รู้ว่าเป็น JSON
            },
            params: query, // ใช้ params แทนการต่อ query string เอง
        });

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to get users info:", error);
        throw new Error("Failed to get users info. Please try again.");
    }
};

export const searchByName = async (query) => {
    try {
        const response = await axios.get(`${serverAddr}/api/v1/users`, {
            withCredentials: true, // ใช้ cookie ถ้ามี
            headers: {
                'Content-Type': 'application/json', // แจ้งให้ server รู้ว่าเป็น JSON
            },
            params: query, // ใช้ params แทนการต่อ query string เอง
        });

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to get users info:", error);
        throw new Error("Failed to get users info. Please try again.");
    }
};

