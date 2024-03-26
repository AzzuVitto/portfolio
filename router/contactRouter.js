const contactRouter = require('express').Router()
const contactModel = require('../models/contactModel')
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Utilisez le protocole SSL/TLS
    auth: {
        user: 'azzurra.vittorietti@gmail.com',
        pass: 'ersk mitm ujrn zplt'
        }
});

contactRouter.get('/', (req, res) => {
    res.render('contacts.twig');
});

contactRouter.post('/contacts', async (req, res) => {
    const { nom, prenom, email, message } = req.body;

    try {
        await contactModel.create({ nom, prenom, email, message });
 const mailOptions = {
            from: email,
            to: 'azzurra.vittorietti@gmail.com',
            subject: 'Nouveau formulaire de contact',
            text: `Nom: ${nom}\`nPrénom: ${prenom}\nEmail: ${email}\nMessage: ${message}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
            } else {
                console.log(`E-mail envoyé: ${info.response}`);
            }
        });

        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de l\'enregistrement des données.');
    }
});

module.exports = contactRouter;
