import { Request, Response } from 'express';
import User from '../../models/userModel';
import bcrypt from 'bcrypt';


// Process login data
export const handleLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        // Attempt to find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials.' });
        }

        // Check if the submitted password matches the user's password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ error: 'Invalid credentials.' });
        }
        
        // If the user is authenticated, save their ID in the session
        if (req.session) {
            req.session.userId = user._id.toString(); 
            return  res.redirect('/chat/');
        }

        
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).render('index', { error: 'An error occurred during the login process.' });
    }
};

