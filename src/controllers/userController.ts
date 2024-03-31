import { Request, Response } from 'express';
import User from '../models/userModel';
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



// Display reset password page
export const showReset = async (req: Request, res: Response) => {
    res.render('resetPassword', { error: null });
};

/////////////////////////////////// CRUD //////////////////////////////////


////////////////
//// CREATE //// 
////////////////

export const createUser = async (req: Request, res: Response) => {
    try {
        // Extracting fields from req.body
        const { username, email, password, confirmPassword } = req.body; 

        // Check if the passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match." });
        }

        // Hashing the password and creating the user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            password: hashedPassword,
            email,
            isAdmin: false 
        });
        const savedUser = await newUser.save();
        
        // Redirect to '/chat' after successful account creation
        return res.redirect('/chat');
    } catch (error) {
        // Handling MongoDB validation and uniqueness errors
        if ((error as any).name === 'ValidationError' || (error as any).code === 11000) {
            let message = 'Validation error';
            if ((error as any).code === 11000) {
                message = 'This email already exists.';
            } else if ((error as any).errors?.email?.kind === 'unique') {
                message = 'This email already exists.';
            }
            return res.status(400).json({ message });
        }

        console.error('Error creating the user:', error);
        return res.status(500).json({ message: 'Error creating the user.' });
    }
};



////////////////
//// GET ALL ///
////////////////

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Trying to retrieve the users.. Guess what ? Error.. ', error);
        res.status(500).json({ message: 'Trying to retrieve the users.. Guess what ? Error..' });
    }
}

////////////////////////
//// GET ONE WITH ID ///
////////////////////////

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Houston, we have a problem! Channel not found.' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Trying to retrieve the users.. Guess what ? Error.. ', error);
        res.status(500).json({ message: 'Trying to retrieve the users.. Guess what ? Error..' });
    }
}

///////////////
//// UPDATE ///
///////////////

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
        if (!updateUser) {
            return res.status(404).json({ message: 'Trying to update the user.. Guess what ? Error.. ' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Trying to update the user.. Guess what ? Error.. ', error);
        res.status(500).json({ message: 'Trying to update the user.. Guess what ? Error.. ' });
    }
}

///////////////
//// DELETE ///
///////////////

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'Houston, we have a problem! User not found.' });
        }
        res.status(200).json({ message: 'User deleted. You won\'t see it again' });
    } catch (error) {
        console.error('Error deleting the channel... Hmm, that\'s not good.', error);
        res.json({ message: 'Error deleting the channel... Hmm, that\'s not good my friend.' });
    }
}