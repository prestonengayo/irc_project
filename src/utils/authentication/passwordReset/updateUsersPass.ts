import { Request, Response } from 'express';
import User from '../../../models/userModel';
import bcrypt from 'bcrypt';

export const updateUsersPassword = async (req: Request, res: Response) => {
    try {
        const { userId, newPassword } = req.body; 

        
        if (!userId || !newPassword) {
            return res.status(400).json({ message: 'L\'ID de l\'utilisateur et le nouveau mot de passe sont requis.' });
        }

        
        const user = await User.findById(userId);

        
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

       
         // Hash the new password
         const hashedPassword = await bcrypt.hash(newPassword, 10);

         // Update user's password with the hashed password
         user.password = hashedPassword;
         
        await user.save();

        res.render('update-succes-pass');
        
    } catch (error) {
        console.error('Erreur lors de la mise à jour du mot de passe de l\'utilisateur :', error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du mot de passe de l\'utilisateur.' });
    }
};