import axios from "axios";

const serverAddr = process.env.NEXT_PUBLIC_BACKEND_URL;

const config = {
    headers: {
        "Content-type": "application/json",
    },
};

export const accessChat = async (data) => {
    try {
        const { content, chatId } = data;

        const response = await axios.post(`${serverAddr}/api/v1/message`,
                  {
                  content: content,
                  chatId : chatId
                  },
                  {
                    withCredentials: true,
                    config,
                  } 
        );

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to send messages:", error);
        throw new Error("Failed to send message. Please try again.");
    }
};

export const getChat = async (chatId) => {
    try {
        const response = await axios.get(`${serverAddr}/api/v1/chat/${chatId}`, {
            withCredentials: true, 
            headers: {
                'Content-Type': 'application/json', 
            },
        });

        if (response.data) {
            localStorage.setItem('chat', JSON.stringify(response.data));
        }

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to get chat info:", error);
        throw new Error("Failed to get chat info. Please try again.");
    }
};
