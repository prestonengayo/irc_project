import express, { Request, Response } from 'express';
const mongoose = require('mongoose');

import bodyParser from 'body-parser';
// Import routes
//import chatRoutes from './routes/chatRoutes';
//import userRoutes from './routes/userRoutes';

// Creating the Express application instance
const app = express();

// Middleware for parsing JSON request bodies
app.use(bodyParser.json());

// Connexion à MongoDB
mongoose.connect('mongodb+srv://team:gIkEwOcKbxr9o1bk@myirc.p4cjyiw.mongodb.net/test?retryWrites=true&w=majority',)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// Use Routes
//app.use('/chat', chatRoutes);
//app.use('/user', userRoutes);

// Middleware for handling not found routes
app.use((req: Request, res: Response) => {
  res.status(404).send('Page not found');
});

// Exporting the application instance for use in server.ts
export default app;
