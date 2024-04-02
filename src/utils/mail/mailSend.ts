import crypto from 'crypto';
import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import User from '../../models/userModel';
import { sendResetEmail } from './mailPrepare';


// generating token for passw
const generateToken = () => {
    return crypto.randomBytes(20).toString('hex'); // A random hexadecimal string of 40 characters, representing 20 bytes of random data.
};

// saving token in db
const saveResetToken = async (email: string, token: string,) => {//time: Date
    await User.updateOne({ email }, { resetPasswordToken: token });// { resetPasswordExpires: time}
}

// Request for mail send 
export const passwordResetMail = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found .. Maybe a mistake in the email ?" });
        }
        const resetToken = generateToken();
        //const currentTime = new Date();
        await saveResetToken(email, resetToken,);
        await sendResetEmail(email, resetToken);
        return res.render('resetRequestSent', { error: null });
    } catch (error) {
        console.error(' Error while trying to send the email for password reset. ', error);
        res.status(500).json({ message: 'Error while trying to send the email for password reset.' });
    }
};
