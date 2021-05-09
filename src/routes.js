const express = require('express')
const routes = express.Router()

const profileController = require('./controllers/profileController')
const jobController = require('./controllers/jobController')
const dashboardController = require('./controllers/dashboardController')

//show all the jobs in the index
routes.get('/', dashboardController.index)

//show an add job page 
routes.get('/job', jobController.create)

//add a new job
routes.post('/job', jobController.save)

//show a job for editing 
routes.get('/job/:id', jobController.show)

//edit a job
routes.post('/job/:id', jobController.update)

//delete a job
routes.post('/job/delete/:id', jobController.delete)

//show the profile data in profile page
routes.get('/profile', profileController.index)

//update profile data
routes.post('/profile', profileController.update)

module.exports = routes