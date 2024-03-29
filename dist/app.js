"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose = require('mongoose');
const body_parser_1 = __importDefault(require("body-parser"));
// Import routes
//import chatRoutes from './routes/chatRoutes';
//import userRoutes from './routes/userRoutes';
// Creating the Express application instance
const app = (0, express_1.default)();
// Middleware for parsing JSON request bodies
app.use(body_parser_1.default.json());
// Connexion à MongoDB
mongoose.connect('mongodb+srv://team:gIkEwOcKbxr9o1bk@myirc.p4cjyiw.mongodb.net/test?retryWrites=true&w=majority')
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
// Use Routes
//app.use('/chat', chatRoutes);
//app.use('/user', userRoutes);
// Middleware for handling not found routes
app.use((req, res) => {
    res.status(404).send('Page not found');
});
// Exporting the application instance for use in server.ts
exports.default = app;
