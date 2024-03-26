const mongoose = require('mongoose')
const contactSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: [true, 'Le nom est requis'],
    },
    prenom: {
        type: String,
        required: [true, 'Le prénom est requis'],
    },
    email: {
        type: String,
        required: [true, 'Le mail est requis'],
    },
    message: {
        type: String,
        required: [true, 'Le message est requis'],
    } 
   
});

const contactModel = mongoose.model('contacts', contactSchema);
module.exports = contactModel