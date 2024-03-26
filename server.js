const express = require('express');
const session = require('express-session')
const mongoose = require('mongoose');
const nodemailer = require('nodemailer')
const mainRouter = require("./router/mainRouter")
const adminRouter = require('./router/adminRouter')
const projectRouter = require('./router/projectRouter')
const contactRouter = require('./router/contactRouter')


const app = express()

app.use(express.static("./assets"))
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: 'votre _secret_key',
    resave: true,
    saveUninitialized: true,

}))
app.use(mainRouter)
app.use(adminRouter)
app.use(projectRouter)
app.use(contactRouter)
app.listen(3001, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Connexion réussie')
    }
})
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        admin: 'azzurra.vittorietti@gmail.com',
        pass: 'dolcegattinamia'
    }
});
mongoose.connect("mongodb://localhost:27017/portfolio")