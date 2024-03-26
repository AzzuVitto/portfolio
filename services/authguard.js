const adminModel = require('../models/adminModel')

const authguard = async (req, res, next) => {
    try {
        console.log(req.session.admin)
        if (req.session.admin) {
            let admin = await adminModel.findOne({ _id: req.session.admin });
            if (admin) {
                return next()
            }
        }
        throw new Error('Administrateur non connecté')
    } catch (error) {
        console.error(error.message);
        res.status(401).render('admin/login.twig', {
            title: 'connexion - bookstore',
            errorAuth: error.message
        }
        )
    }
}
module.exports = authguard