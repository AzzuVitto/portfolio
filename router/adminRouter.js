
const adminRouter = require('express').Router()
const adminModel = require('../models/adminModel')
const contactRouter = require('express').Router()
const projectModel = require('../models/projectModel')
const contactModel = require ('../models/contactModel')
const authguard = require('../services/authguard')
const bcrypt = require("bcrypt");
const session = require('express-session')

adminRouter.get('/login', (req, res) => {

    res.render('admin/login.twig',
        {
            title: "connexion -bookstore"
        }
    )
})


adminRouter.post('/login', async (req, res) => {
    try {
        let admin = await adminModel.findOne({ email: req.body.email })
        if (admin) {
            if (await bcrypt.compare(req.body.password, admin.password)) {
                req.session.admin = admin._id
                res.redirect('/dashboard')
            } else {
                throw { password: "Mauvais mot de passe" }
}
        } else {
            throw {email: "Cet administratuer n'est pas enregistré"}
        }
} catch (error) {
    res.render('admin/login.twig',
    {
        title: 'connexion - bookstore',
        error : error
    }
    )
}
})
adminRouter.get('/dashboard', authguard, async (req,res) => {
    res.render('admin/dashboard.twig', 
    {
        title: 'dashboard - bookstore',
        admin: await adminModel.findById(req.session.admin._id),
        projects : await projectModel.find()


})
})


module.exports = adminRouter
