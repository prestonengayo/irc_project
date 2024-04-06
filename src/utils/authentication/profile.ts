import { Request, Response } from 'express';
import User from '../../models/userModel';


export const profilePage = async (req: Request, res: Response) => {

    try {
       
        const { userId } = req.session;
        
        const user = await User.findById(userId);

        if (!user) {
                    return res.status(404).send('User nor found.');
        }

       
        const users = await User.find();
        
        
      
        res.render('profile', { users, isAdmin: user.isAdmin, username: user.username, email: user.email, userId: user._id  });
    } catch (error) {
        console.error('Erreur lors de la récupération du profil de l\'utilisateur:', error);
        res.status(500).send('Erreur lors de la récupération du profil de l\'utilisateur.');
    }
}
