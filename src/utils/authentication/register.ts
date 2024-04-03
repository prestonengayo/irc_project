import { Request, Response } from 'express';
import User from '../../models/userModel';
import bcrypt from 'bcrypt';


export const registerUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password, confirmPassword } = req.body;
        // checking massword match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords dont't match my friend !" });
        }
        // checking email unique or not ( exists already or not)
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "This account already axists !" });
        }
        // Hashing pass
        const hashedPassword = await bcrypt.hash(password, 10);
        // Here is our new great user
        const newUser = new User({
            username,
            password: hashedPassword,
            email,
            isAdmin: false
        });
        await newUser.save();

        console.log(`Guess what ? you're in :p ${username} ! It worked !`);
    } catch (error) {
        console.error("Guess what? There is an error while I'm trying to create an account for you!", error);
        res.status(500).json({ message: "Guess what? There is an error while I'm trying to create an account for you!" });
    }

};