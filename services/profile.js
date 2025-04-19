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

export const searchByName = async (name) => {
    try {
        const userList = await axios.get(`${serverAddr}/api/v1/users`, {
                params: {
                    search: name,
                }
            },
            {
                withCredentials: true,
                config,
            }
        )
        let userId = null
        const users = userList.data.data

        for(let i = 0;i < userList.data.count;i++) {
            if(users[i].email == email) {
                userId = users[i]._id
            }
        };
        if(userId == null)
            throw new Error("No such user");

        const response = await axios.put(`${serverAddr}/api/v1/chat/groupadd`,
            {
                chatId: chatId,
                userId : userId
            },
            {
                withCredentials: true,
                config,
            }
        )

        return response.data;
    } catch (error) {
        console.error("Failed to add friend:", error);
        throw new Error("Failed to add friend. Please try again.");
    }
};
