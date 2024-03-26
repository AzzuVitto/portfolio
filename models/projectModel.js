const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Le titre est requis'],
        validate: {

            validator: function (v) {
                return /^[\w\s\-!@#$%^&*()_+={}[\]:;<>,.?~\\\/]+$/u.test(v)
            },
            message: "Entrez un titre valide"
        },

    },
    description: {
        type: String,
        required: [true, "La description est requise"],
        validate: {
            validator: function (v) {
                return /^[\w\s\-!@#$%^&*()_+={}[\]:;<>,.?~\\\/]+$/u.test(v)

            },
            message: 'Entrez une description valide'
        },
    },
    url: {
        type: String,
        // required: [true, "L'url est requis"],
        validate: {
            validator: function (v) {

                return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$|^$/i.test(v);

            },
            message: 'Entrez un url valide'
        },
    },

    gitUrl: {
        type: String,
        required: [true, "Le giturl est requis"],

        validate: {
            validator: function (v) {
                return /^(https:\/\/|git@)([\w\.@\:\/\-~]+)(\.git)?$/i.test(v)
            },
            message: 'Entrez un giturl valide'
        },

    },
    image: {
        type: String,
        default:""
        

    }

});


const projectModel = mongoose.model('projects', projectSchema)
module.exports = projectModel