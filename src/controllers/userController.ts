import { Request, Response } from 'express';

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
        res.render('index', { error: 'Identifiants incorrects.' });
    }
};


// Process registration data
export const handleRegistration = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        //const user = await User.findByCredentials(username, password); // Mock method to find the user
        if (true) {
            // Session management/login success logic
            res.redirect('/indexRoutes'); // Redirect to a secure page after login
        }
    } catch (error) {
        res.render('index', { error: 'Identifiants incorrects.' });
    }
};


// Display reset password page
export const showReset = async (req: Request, res: Response) => {
    res.render('resetPassword', { error: null }); 
};
