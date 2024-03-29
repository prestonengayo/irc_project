import { Request, Response } from 'express';

// Display the chat page
export const showChat = (req: Request, res: Response) => {
    res.render('chat', { error: null }); 
};

// Display the private chat page
export const showPrivateChat = (req: Request, res: Response) => {
    res.render('privateChat', { error: null }); 
};

// Process send data
export const sendMessage = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        //const user = await User.findByCredentials(username, password); 
        if (true) {
            // Session management/login success logic
            res.redirect('/chatRoutes'); 
        }
    } catch (error) {
        res.render('index', { error: 'Identifiants incorrects.' });
    }
};
