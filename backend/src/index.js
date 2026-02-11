import "dotenv/config";
console.log("MONGO URI:", process.env.MONGODB_URI);

import connectDB from "./db/index.js";
import { app } from "./app.js";
import http from "http";
import { Server } from "socket.io";
import { startCronJobs } from "./services/cron.service.js";

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Socket connected: ", socket.id);

  socket.on("joinRoom", (userId) => {
    socket.join(userId);
    console.log(`User joined room: ${userId}`);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected: ", socket.id);
  });
});

//export io
export { io };

connectDB()
  .then(() => {
    server.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
    });

    startCronJobs();
    console.log("Cron jobs started successfully");
  })
  .catch((err) => {
    console.log("MONGODB connection failed !!! ", err);
  });
