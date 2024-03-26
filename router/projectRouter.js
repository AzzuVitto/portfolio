const projectRouter = require('express').Router()
const projectModel = require('../models/projectModel')
const adminModel = require('../models/adminModel')
const authguard = require('../services/authguard')
const multer = require('../services/multer')


projectRouter.get('/dashboard', authguard, async (req, res) => {
    try {
        const project = await projectModel.find()
        res.render("admin/dashboard.twig", {
            'route': '/dashboard',
            projects: project
        })
    } catch (error) {
        res.send(error)
    }

})

projectRouter.post('/addProject', authguard, multer.single("image"), async (req, res) => {
    try {
        const project = new projectModel(req.body)
        project.adminid = req.session.admin
        if (req.file) {
            if(req.multerError) {
                throw{errorUpload: "le fichier n'est pas valide"}
            }
           req.body.image = req.file.filename
           project.image = req.file.filename

        }
        project.validateSync()
        await project.save()
        res.redirect('/dashboard')
    } catch (error) {
        console.log(error);
        res.render('admin/dashboard.twig')

    }
})

projectRouter.get('/projectDelete/:projectid', authguard, async (req, res) => {
    try {
        await projectModel.deleteOne({ _id: req.params.projectid });
        res.redirect('/dashboard');

    } catch (error) {

        res.render('admin/dashboard.twig',
            {
                errorDelete: 'Un pb est survenu pendant la suppression',
                admin: await adminModel.findById(req.session.admin._id).populate,
                title: 'dashboard - bookstore'

            })
    }

})

projectRouter.get('/projectUpdate/:projectid', authguard, async (req, res) => {
    try {
        let project = await projectModel.findById(req.params.projectid);

        if (!project) {
            throw { error: 'projet introuvable' }
        }
        res.render('admin/updateForm.twig', {
            project: project
        })

    } catch (error) {
        res.render('admin/dashboard.twig')

    }
})

projectRouter.post('/projectUpdate/:projectid', authguard, multer.single("image"), async (req, res) => {
    try {
        await projectModel.updateOne({ _id: req.params.projectid }, req.body);
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
        res.render('admin/dashboard.twig');
    }
});

module.exports = projectRouter


