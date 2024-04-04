import { Request, Response } from 'express';

export const handleLogout = async (req: Request, res: Response) => {
    try {

        if (!req.session) {
            return res.status(401).send('You are not connected');
        }
       
        req.session.destroy((err) => {
            if (err) {
                console.error('An error occurred while trying to disconnect :', err);
                return res.status(500).send('An error occurred while trying to disconnect');
            }
            
            res.redirect('/');
        });
    } catch (error) {
        console.error('An error occurred while trying to disconnect :', error);
        res.status(500).send('An error occurred while trying to disconnect');
    }
}