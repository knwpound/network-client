import axios from "axios";

const serverAddr = process.env.NEXT_PUBLIC_BACKEND_URL;

const config = {
    headers: {
        "Content-type": "application/json",
    },
};

export const sendMessage = async (data) => {
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

export const fetchAllMessages = async(cid) =>{
    try{
        const response = await axios.get(
                `${serverAddr}/api/v1/message/${cid}`,
                {
                    withCredentials: true,
                    config
                }
        );
        console.log(response.data);
        return response.data
    }catch{
        console.error("Failed to fetch all messages:", error);
        throw new Error("Failed to fetch all messages. Please try again.");
    }
}