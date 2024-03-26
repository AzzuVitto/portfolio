const mongoose = require('mongoose')


const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "L email est requis"],
        unique: true,
        validate: {
            validator: function (v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(v)
            },
            message: 'Entrez un mail valide'
        },
    },

    password: {
        type: String,
        required: [true, 'Le mot de passe est requis'],
        validate: {
            validator: function (v) {
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(v)
            },
            message: 'Entrez un mot de passe valide'
        },
    },
    projectCollection: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Projects'
    }]
})


const adminModel = mongoose.model('admins', adminSchema)
module.exports = adminModel