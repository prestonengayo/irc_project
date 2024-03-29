import { Request, Response } from 'express';

export const sendMessage = (req: Request, res: Response) => {
    // Logical to send a message
    res.send("Message envoyé");
};
