const mainRouter = require('express').Router()

mainRouter.get('/', (req, res) =>  {
    try{
        res.render("home/index.twig")
    } catch(error){
        res.render(error)
    }
})  

module.exports = mainRouter