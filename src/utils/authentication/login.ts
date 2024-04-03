import { Request, Response } from 'express';
import User from '../../models/userModel';
import bcrypt from 'bcrypt';


// Process login data
export const handleLogin = async (req: Request, res: Response) => {

    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }); // Mock method to find the use
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials.' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ error: 'Invalid credentials.' });
        }
        res.redirect('/chat'); // Redirect to a secure page after login
    }
    catch (error) {
        res.render('index', { error: 'Incorrect credentials.' });
    }
};
