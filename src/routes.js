const express = require('express')
const routes = express.Router()
const profileController = require('./controllers/profileController')

const Jobs = {
  data: [
    {
      id: 1,
      name: 'Pizzaria Guloso',
      'daily-hours': 2,
      'total-hours': 60,
      created_at: Date.now(),
    },
    {
      id: 2,
      name: 'One Two Project',
      'daily-hours': 3,
      'total-hours': 47,
      created_at: Date.now(),
    }
  ],
  controllers: {
    index(req, res) {
      const upatatedJobs = Jobs.data.map((job) => {
        const remaining = Jobs.services.remainingDays(job)
        const status = remaining <= 0 ? 'done' : 'progress'
        const budget = Jobs.services.calculateBudget(job)
        return {
          ...job,
          remaining,
          status,
          budget
        }
      })
      return res.render('index', { upatatedJobs })
    },
    create(req, res) {
      return res.render('job')
    },
    save(req, res) {
      const lastId = Jobs.data[Jobs.data.length - 1]?.id || 1

      Jobs.data.push({
        id: lastId + 1,
        name: req.body.name,
        'daily-hours': req.body['daily-hours'],
        'total-hours': req.body['total-hours'],
        created_at: Date.now()
      })
      return res.redirect('/')
    },
    show(req, res) {
      jobId = req.params.id
      const job = Jobs.data.find(j => j.id == jobId)
      job.budget = Jobs.services.calculateBudget(job)

      if (!job) {
        return res.send('Job Not Found!')
      }
      return res.render('job-edit', { job })
    },
    update(req, res) {
      jobId = req.params.id
      const job = Jobs.data.find(j => j.id == jobId)
      job.budget = Jobs.services.calculateBudget(job)

      if (!job) {
        return res.send('Job Not Found!')
      }
      const updatedJob = {
        ...job,
        name: req.body.name,
        'total-hours': req.body['total-hours'],
        'daily-hours': req.body['daily-hours']
      }

      Jobs.data = Jobs.data.map(job => {
        if (jobId == job.id) {
          job = updatedJob
        }
        return job
      })
      res.redirect('job/' + jobId)
    },
    delete(req, res) {
      const jobId = req.params.id

      Jobs.data = Jobs.data.filter(job => { job.id !== jobId })
      return res.redirect('/')
    }
  },
  services: {
    remainingDays(job) {
      const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed()
      const createdDate = new Date(job.created_at)
      const dueDay = createdDate.getDate() + Number(remainingDays)
      const dueDateInMs = createdDate.setDate(dueDay)

      const timeDiffInMS = dueDateInMs - Date.now()
      const dayInMs = 1000 * 60 * 60 * 24
      const dayDiff = Math.floor(timeDiffInMS / dayInMs)

      return dayDiff
    },
    calculateBudget(job) {
      return job['total-hours'] * Profile.data['value-hour']
    },
  }
}

routes.get('/', Jobs.controllers.index)
routes.get('/job', Jobs.controllers.create)
routes.post('/job', Jobs.controllers.save)
routes.get('/job/:id', Jobs.controllers.show)
routes.post('/job/:id', Jobs.controllers.update)
routes.post('/job/delete/:id', Jobs.controllers.delete)
routes.get('/profile', profileController.index)
routes.post('/profile', profileController.update)

module.exports = routes