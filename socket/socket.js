// lib/socket.js
import { io } from "socket.io-client";

const serverAddr = process.env.NEXT_PUBLIC_BACKEND_URL;

const socket = io(serverAddr, {
  autoConnect: false, 
});

export default socket;
