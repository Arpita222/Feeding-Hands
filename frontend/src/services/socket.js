import { io } from "socket.io-client";

const socket = io("https://feeding-hands-m10a.onrender.com", {
  withCredentials: true,
  autoConnect: false,
});

export default socket;
