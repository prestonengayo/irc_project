import { Request, Response } from 'express';

import User from '../models/userModel';

// Display the login page
export const showLoginForm = (req: Request, res: Response) => {
    res.render('index', { error: null }); 
};


// Display registration page
export const showRegistration = async (req: Request, res: Response) => {
    res.render('registration', { error: null }); 
};
