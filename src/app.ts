import express, { Request, Response } from 'express';

import indexRoutes from './routes/indexRoutes';
import userRoutes from './routes/userRoutes';
import chatRoutes from './routes/chatRoutes';

// Creating the Express application instance
const app = express();

// Middleware for parsing JSON request bodies
app.use(express.json());


// Middleware for use Routes
app.use('/', indexRoutes);
app.use('/user', userRoutes);
app.use('/chat', chatRoutes);


//INDEX | CHANNEL
app.use('/all', indexRoutes);
app.use('/add', indexRoutes);
app.use('/ch/:channelId', indexRoutes);
app.use('/set/:channelId', indexRoutes);
app.use('/del/:channelId', indexRoutes);

// Middleware for handling not found routes
app.use((req: Request, res: Response) => {
  res.status(404).send('Page not found');
});

// Exporting the application instance for use in server.ts
export default app;
