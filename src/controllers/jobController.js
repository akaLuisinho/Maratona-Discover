const Job = require('../model/job')
const JobUtils = require('../utils/jobUtils')

module.exports = {
    create(req, res) {
        return res.render('job')
    },
    save(req, res) {
        const lastId = Job.get()[Job.get().length - 1]?.id || 0

        Job.get().push({
            id: lastId + 1,
            name: req.body.name,
            'daily-hours': req.body['daily-hours'],
            'total-hours': req.body['total-hours'],
            created_at: Date.now()
        })
        return res.redirect('/')
    },
    show(req, res) {
        const jobId = req.params.id
        const job = Job.get().find(j => j.id == jobId)
        job.budget = JobUtils.calculateBudget(job)

        if (!job) {
            return res.send('Job Not Found!')
        }
        return res.render('job-edit', { job })
    },
    update(req, res) {
        const jobId = req.params.id
        const job = Job.get().find(j => j.id == jobId)
        job.budget = JobUtils.calculateBudget(job)

        if (!job) {
            return res.send('Job Not Found!')
        }
        const updatedJob = {
            ...job,
            name: req.body.name,
            'total-hours': req.body['total-hours'],
            'daily-hours': req.body['daily-hours']
        }

        const updateJob = Job.get().map(job => {
            if (jobId == job.id) {
                job = updatedJob
            }
            return job

        })
        Job.update(updateJob)
        res.redirect(jobId)
    },
    delete(req, res) {
        const jobId = req.params.id

        Job.delete(jobId)

        return res.redirect('/')
    }
}