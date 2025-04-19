import axios from "axios";

const serverAddr = process.env.NEXT_PUBLIC_BACKEND_URL;

const config = {
    headers: {
        "Content-type": "application/json",
    },
};

export const renameGroup = async (chatId, chatName) => {
    try {
        const response = await axios.put(`${serverAddr}/api/v1/chat/rename`, 
            {
                chatId: chatId,
                chatName: chatName
            },
            {
                withCredentials: true,
                config,
            } 
        );

        localStorage.setItem('chat', JSON.stringify(response.data.data));
        return response.data;
    } catch (error) {
        console.error("Failed to get chat info:", error);
        throw new Error("Failed to get chat info. Please try again.");
    }
};

export const removeFriend = async (chatId, userId) => {
    try {
        const response = await axios.put(`${serverAddr}/api/v1/chat/groupremove`,
            {
                chatId: chatId,
                userId : userId
            },
            {
                withCredentials: true,
                config,
            }
        );

        localStorage.setItem('chat', JSON.stringify(response.data.data));
        return response.data;
    } catch (error) {
        console.error("Failed to send messages:", error);
        throw new Error("Failed to send message. Please try again.");
    }
};

export const addFriend = async (chatId, email) => {
    try {
        const userList = await axios.get(`${serverAddr}/api/v1/users`, {},
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

        const response = await axios.post(`${serverAddr}/api/v1/chat/groupadd`,
            {
                chatId: chatId,
                userId : userId
            },
            {
                withCredentials: true,
                config,
            }
        )

        localStorage.setItem('chat', JSON.stringify(response.data.data));
        return response.data;
    } catch (error) {
        console.error("Failed to add friend:", error);
        throw new Error("Failed to add friend. Please try again.");
    }
};
