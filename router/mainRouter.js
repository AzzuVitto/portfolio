const mainRouter = require('express').Router()
const projectModel = require('../models/projectModel')
mainRouter.get('/', async(req, res) =>  {
    try{
        const projects = await projectModel.find()
        res.render("home/index.twig",{
            projects: projects
        })
    } catch(error){
        res.render(error)
    }
})  

module.exports = mainRouter