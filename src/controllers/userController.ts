import { Request, Response } from 'express';
import User from '../models/userModel';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

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

// User Registration Process

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

// Password Lost User Process 

// generating token for passw
const generateToken = () => {
    return crypto.randomBytes(20).toString('hex'); // A random hexadecimal string of 40 characters, representing 20 bytes of random data.
};

// saving token in db
const saveResetToken = async (email: string, token: string) => {
    await User.updateOne({ email }, { resetPasswordToken: token });
}
const smtpUsername = '4948a2620958689777a4049301d90ea7';
const smtpPassword = '5428433b0c42039379f5d5277a1dc996';

const sendResetEmail = async (email: string, token: string) => {
    const transporter = nodemailer.createTransport({
        host: 'in-v3.mailjet.com',
        port: 25,
        secure: false, // true for TLS, false for no secur
        auth: {
            user: smtpUsername, // key API Mailjet
            pass: smtpPassword // secret API Mailjet
        }
    });
    const mailOptions = {
        from: 'ozdami_b@etna-alternance.net',
        to: email,
        subject: 'Réinitialisation du mot de passe',
        text: `Vous avez demandé une réinitialisation de mot de passe.\n\n` +
            `Veuillez cliquer sur le lien suivant pour réinitialiser votre mot de passe :\n\n` +
            `http://1721623628:3000/reset/${token} \n\n` +
            `Si vous n'avez pas demandé cela, veuillez ignorer cet e-mail.\n`
    };

    await transporter.sendMail(mailOptions);
}

// Request for mail reset 
export const requestPasswordReset = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found .. Maybe a mistake in the email ?" });
        }

        const resetToken = generateToken();
        await saveResetToken(email, resetToken);
        await sendResetEmail(email, resetToken);

        res.status(200).json({ message: "Email for password reset just sent !"});
        console.log("All good , message sent.");
        //return res.render('resetRequestSent');
    } catch (error) {
        console.error(' Error while trying to send the email for password reset. ', error);
        res.status(500).json({ message: 'Error while trying to send the email for password reset.'});
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