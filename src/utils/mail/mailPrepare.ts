
import nodemailer from 'nodemailer';

const smtpUsername = '4948a2620958689777a4049301d90ea7';
const smtpPassword = '5428433b0c42039379f5d5277a1dc996';

export const sendResetEmail = async (email: string, token: string) => {
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
            `http://localhost:3000/user/reset/${token} \n\n` +
            `Si vous n'avez pas demandé cela, veuillez ignorer cet e-mail.\n`
    };

    await transporter.sendMail(mailOptions);
}