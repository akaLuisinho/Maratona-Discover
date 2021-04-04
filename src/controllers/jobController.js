const Jobs = require('../model/job')




module.exports = {
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
}