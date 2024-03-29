import { Request, Response } from 'express';

export const registerUser = (req: Request, res: Response) => {
    // Logical to registre user
    res.send("Registre User");
};

export const loginUser = (req: Request, res: Response) => {
    // Logical to login
    res.send("User logged");
};
