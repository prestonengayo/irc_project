
import { Request, Response } from 'express';
import User from '../../../models/userModel';

export const renderResetPasswordPage = async (req: Request, res: Response) => {
    try {

        const { token } = req.params;
        const user = await User.findOne({ resetPasswordToken: token });

        if (!user) {
            return res.status(400).json({ message: 'User not found.' });
        }
        const userId = user._id;

        console.log('Token:', token);
        console.log('UserID:', userId);

        //const creationTime = user.resetPasswordExpires.getTime();
        //const expirationTime = creationTime + (5 * 60 * 1000); // Add 5 minutes in milliseconds
        //const currentTime = Date.now();

        // if (currentTime > expirationTime) {
        //     return res.status(400).json({ message: 'Password reset token is invalid or has expired. '});
        // }

        // if all good render page for password reset
        res.render('resetPassword', { userId: userId, token: token });
    } catch (error) {
        console.error('Error rendering password reset page:', error);
        res.status(500).json({ message: 'Error rendering password reset page.' });
    }
}
