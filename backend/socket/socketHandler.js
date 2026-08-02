import { Server } from "socket.io";

let io;
const userSocketMap = {}; // { userId: socketId }

export const initSocket = (server) => {
  io = new Server(server, {
    cors: { origin: process.env.FRONTEND_URL, credentials: true },
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) userSocketMap[userId] = socket.id;

    socket.on("disconnect", () => {
      if (userId) delete userSocketMap[userId];
    });
  });

  return io;
};

export const sendNotification = (userId, payload) => {
  const socketId = userSocketMap[userId];
  if (socketId && io) {
    io.to(socketId).emit("notification", payload);
  }
};