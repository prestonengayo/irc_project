import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import app from './app'; // Import the configured Express instance from app.ts
import { connectDB } from './utils/db';
import Message from './models/chatModel';
import { initSocket, getIO } from "./config/socket";

// Database connexion
connectDB();

const PORT = 3000;

const server = http.createServer(app); // use app here

// Attach Socket.IO to an HTTP server
initSocket(server);
const io = getIO();
  /////////////////////////////////
 //// Socket.io configuration //// 
/////////////////////////////////
io.on('connection', (socket) => {
    console.log(`Connecté : ${socket.id}`);

    // Public chat
    socket.on('public_message', async (msg) => {
        try {
            // Créez un nouveau message à partir des données reçues
            const newMessage = new Message({
                content: msg.content,
                user: msg.user,
                channel: msg.channel,
                receiverId: msg.receiverId,
                messageType: msg.messageType,
                createdAt: msg.createdAt
            });

            // Enregistrez le nouveau message dans la base de données
            const savedMessage = await newMessage.save();

            // Envoyez le message enregistré à tous les clients connectés
            io.emit('public_message', savedMessage);
        } catch (error) {
            console.error('Error saving message:', error);
        }
    });


    // Private chat 
    socket.on('private_message', async (msg) => {
        try {
            // Créez un nouveau message à partir des données reçues
            const newMessage = new Message({
                content: msg.content,
                user: msg.user,
                channel: msg.channel,
                receiverId: msg.receiverId,
                messageType: msg.messageType,
                createdAt: msg.createdAt
            });

            // Enregistrez le nouveau message dans la base de données
            const savedMessage = await newMessage.save();
            // Envoyez le message enregistré à tous les clients connectés
            io.emit('private_message', savedMessage);
        } catch (error) {
            console.error('Error saving message:', error);
        }
    });

    // Group Chat
    socket.on('group_message', async (msg) => {
        try {
            // Créez un nouveau message à partir des données reçues
            const newMessage = new Message({
                content: msg.content,
                user: msg.user,
                channel: msg.channel,
                receiverId: msg.receiverId,
                messageType: msg.messageType,
                createdAt: msg.createdAt
            });

            // Enregistrez le nouveau message dans la base de données
            const savedMessage = await newMessage.save();

            // Envoyez le message enregistré à tous les clients connectés
            io.emit('group_message', savedMessage);
        } catch (error) {
            console.error('Error saving message:', error);
        }
    });
});

server.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
});
