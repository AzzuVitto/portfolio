const express = require('express');
const mainRouter = require ("./router/mainRouter")


const app = express()

app.use(express.static("./assets"))
app.use (mainRouter)

app.listen(3001, (err) => {
    if (err){
        console.log(err)
    } else {
        console.log('Connexion réussie')
    }
})