import { Request, Response } from 'express';
import { passwordResetMail } from '../utils/authentication/passwordReset/mail/mailSend';
import { handleLogin } from '../utils/authentication/login';
import { handleLogout } from '../utils/authentication/logout';
import { registerUser } from '../utils/authentication/register';
import { renderResetPasswordPage } from '../utils/authentication/passwordReset/renderResetPasswordPage'; 
import { savePassword } from '../utils/authentication/passwordReset/savePassword';
import { profilePage } from '../utils/authentication/profile'; 
import { updateUsersPassword } from '../utils/authentication/passwordReset/updateUsersPass';
import User from '../models/userModel';
import bcrypt from 'bcrypt';


// ================= LOGIN ================= //

// Login
export const handleLoginController = async (req: Request, res: Response) => {
    try {
        await handleLogin(req, res);
    } catch (error) {
        console.error('Error when calling the function handleLogin :', error);
        res.status(500).json({ message: 'Error when calling the function handleLogin.' });
    }
};

// Logout
export const handleLogoutController = async (req: Request, res: Response) => {
 try {
    await handleLogout(req, res);
 }catch(error) {
    console.error('Error when calling the function handleLogout :', error);
    res.status(500).json({ message: 'Error when calling the function handleLogout.' });
    
 }
};

// ================= REGISTRATION ================= //

export const registerUserController = async (req: Request, res: Response) => {
    try {
        await registerUser(req, res);
    } catch (error) {
        console.error('Error when calling the function registerUser :', error);
        res.status(500).json({ message: 'Error when calling the function registerUser.' });
    }
};

// ================= PASSWORD RESET ================= // 

export const askReset = (req: Request, res: Response) => {
    res.render('./askLink', { error: null });
};

// Function to send message for passw reset
export const passwordResetController = async (req: Request, res: Response) => {
    try {
        await passwordResetMail(req, res);
    } catch (error) {
        console.error('Error when calling the function passwordResetMail :', error);
        res.status(500).json({ message: 'Error when calling the function passwordResetMail.' });
    }
};

// Receive the token and register the knew password
export const renderResetPasswordPageController = async (req: Request, res: Response) => {
    try {
        await renderResetPasswordPage(req, res);
    } catch (error) {
        console.error('Error when calling the function renderResetPasswordPage :', error);
        res.status(500).json({ message: 'Error when calling the function renderResetPasswordPage.' });
    }
};

// Save the knew password
export const savePasswordController = async (req: Request, res: Response) => {
    try {
        await savePassword(req, res);
    } catch (error) {
        console.error('Error when calling the function savePassword :', error);
        res.status(500).json({ message: 'Error when calling the function savePassword.' });
    }
};

// User and Admin profile page

export const profilePageController =  async (req: Request, res: Response) => {
    try {
        await profilePage(req, res);
    } catch (error) {
        console.error('Error when calling the function profilePage :', error);
        res.status(500).json({ message: 'Error when calling the function profilePage.' });
    }
};


// Update users pass by Admin account
export const updateUsersPasswordController =  async (req: Request, res: Response) => {
    try {
        await updateUsersPassword(req, res);
    } catch (error) {
        console.error('Error when calling the function profilePage :', error);
        res.status(500).json({ message: 'Error when calling the function profilePage.' });
    }
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

        // Add the user's ID to the session here
        if (req.session) {
            req.session.userId = savedUser._id.toString(); 
            return res.redirect('/chat/');
        }
        

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