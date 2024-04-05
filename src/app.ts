import express, { Request, Response } from 'express';
import path from 'path';
import session from 'express-session';

import indexRoutes from './routes/indexRoutes';
import userRoutes from './routes/userRoutes';
import chatRoutes from './routes/chatRoutes';

// Creating the Express application instance
const app = express();

// creation of session
app.use(session({
  secret: 'monSecretDeSession', 
  resave: false, 
  saveUninitialized: false, 
  cookie: {
    httpOnly: true,
    secure: false, 
    //maxAge: 3600000,
  }
}));


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
  res.status(404).render('notFound'); ;
});

// Exporting the application instance for use in server.ts
export default app;
