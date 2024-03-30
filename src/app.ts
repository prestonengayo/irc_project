import express, { Request, Response } from 'express';
import path from 'path';

import indexRoutes from './routes/indexRoutes';
import userRoutes from './routes/userRoutes';
import chatRoutes from './routes/chatRoutes';

// Creating the Express application instance
const app = express();


//Configuration of various aspects of rendering
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'src', 'views'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); 


// Middleware for parsing JSON request bodies
app.use(express.json());


// Middleware for use Routes
app.use('/', indexRoutes);
app.use('/user', userRoutes);
app.use('/chat', chatRoutes);


// Middleware for handling not found routes
app.use((req: Request, res: Response) => {
  res.status(404).send('Page not found');
});

// Exporting the application instance for use in server.ts
export default app;
