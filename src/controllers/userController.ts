import { Request, Response } from 'express';
import User from '../models/userModel';

// Process login data
export const handleLogin = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        //const user = await User.findByCredentials(username, password); // Mock method to find the user
        if (true) {
            // Session management/login success logic
            res.redirect('/chatRoutes'); // Redirect to a secure page after login
        }
    } catch (error) {
        res.render('index', { error: 'Incorrect credentials.' });
    }
};


// Process registration data
export const handleRegistration = async (req: Request, res: Response) => {
    const { username, password, email } = req.body;
    try {
        //const user = await User.findByCredentials(username, password); // Mock method to find the user
        if (true) {
            // Session management/login success logic
            res.redirect('/indexRoutes'); // Redirect to a secure page after login
        }
    } catch (error) {
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
        const { username, password, email, isAdmin } = req.body;
        const newUser = new User({ username, password, email, isAdmin });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        // Vérifier si l'erreur est due à l'unicité de l'email
        if ((error as any).errors.email.kind === 'unique') {
            return res.status(400).json({ message: 'This email already exists my friend.' });
        }
        console.error('You won\'t belive .. Error creating the user:', error);
        res.status(500).json({ message: 'You won\'t belive .. Error creating the user:'});

    }
};


  ////////////////
 //// GET ALL ///
////////////////

export const getAllUsers = async (req: Request, res: Response) => {
    try{
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Trying to retrieve the users.. Guess what ? Error.. ', error);
        res.status(500).json({message :'Trying to retrieve the users.. Guess what ? Error..'});
    }
}

  ////////////////////////
 //// GET ONE WITH ID ///
////////////////////////

export const getUserById = async (req: Request, res: Response) => {
    try{
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Houston, we have a problem! Channel not found.' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Trying to retrieve the users.. Guess what ? Error.. ', error);
        res.status(500).json({message :'Trying to retrieve the users.. Guess what ? Error..'});
    }
}

  ///////////////
 //// UPDATE ///
///////////////

export const updateUser = async (req: Request, res:  Response) => {
    try{ 
        const { userId } = req.params;
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, {new : true});
        if(!updateUser) {
          return res.status(404).json({message: 'Trying to update the user.. Guess what ? Error.. '});
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Trying to update the user.. Guess what ? Error.. ', error);
        res.status(500).json({message: 'Trying to update the user.. Guess what ? Error.. '});
    }
}

  ///////////////
 //// DELETE ///
///////////////

export const deleteUser = async (req: Request, res: Response) => {
    try{ 
        const { userId } = req.params;
        const deletedUser = await User.findByIdAndDelete(userId);
        if(!deletedUser) {
            return res.status(404).json({message: 'Houston, we have a problem! User not found.'});
        }
        res.status(200).json({message: 'User deleted. You won\'t see it again'});
    } catch (error) {
        console.error('Error deleting the channel... Hmm, that\'s not good.', error);
        res.json({message: 'Error deleting the channel... Hmm, that\'s not good my friend.'});
    }
}