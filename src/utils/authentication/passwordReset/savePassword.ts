import { Request, Response } from 'express';
import User from '../../../models/userModel';
import bcrypt from 'bcrypt';


export const savePassword = async (req: Request, res: Response) => {

    try {
        const { password, confirmPassword, userId } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        if (!userId) {
            return res.status(400).json({ message: "User ID is missing" });
        }
        // Check if good pass length 
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }
        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Update the password in the database
        const updatedUser = await User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.render('passwordDone', { error: null });

    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Error resetting password' });
    }

};
