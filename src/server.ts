import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import app from './app'; // Import the configured Express instance from app.ts
import { connectDB } from './utils/db';

// Database connexion
connectDB();

const PORT = 3000;

const server = http.createServer(app); // use app here

// Attach Socket.IO to an HTTP server
const io = new SocketIOServer(server);

  /////////////////////////////////
 //// Socket.io configuration //// 
/////////////////////////////////
io.on('connection', (socket) => {
    console.log(`Connecté : ${socket.id}`);

    // Public chat
    socket.on('public_message', (msg) => {
        io.emit('public_message', msg); // to all
    });

    // Private chat 
    socket.on('private_message', (data) => {
        const { message, toUserId } = data;
        socket.to(toUserId).emit('private_message', { message, from: socket.id });
    });

    // Join Group Chat
    socket.on('join_room', (roomName) => {
        socket.join(roomName);
    });

    // Group Chat
    socket.on('group_message', (data) => {
        const { message, roomName } = data;
        io.to(roomName).emit('group_message', { message, from: socket.id });
    });
});

server.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
});
