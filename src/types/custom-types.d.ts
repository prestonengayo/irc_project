import 'express-session';
import { Server as SocketIOServer } from 'socket.io';

declare module 'express-session' {
    interface SessionData {
        userId?: string; 
    }
}

declare global {
  namespace NodeJS {
    interface Global {
      io: SocketIOServer;
    }
  }
}
