import 'express-session';
import { Server as SocketIOServer } from 'socket.io';

declare module 'express-session' {
    interface SessionData {
        userId?: string; 
    }
}

// socket.js
let io = null; // Cela stocke l'instance de io

module.exports = {
  init: (httpServer) => {
    io = require('socket.io')(httpServer);
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized!");
    }
    return io;
  },
};
