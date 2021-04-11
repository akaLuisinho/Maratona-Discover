const Job = require('../model/job')
const JobUtils = require('../utils/jobUtils')
const Profile = require('../model/profile')

module.exports = {
    create(req, res) {
        return res.render('job')
    },
    async save(req, res) {
        const Jobs = await Job.get()

        await Job.create({
            name: req.body.name,
            'daily-hours': req.body['daily-hours'],
            'total-hours': req.body['total-hours'],
            created_at: Date.now()
        })

        return res.redirect('/')
    },
    async show(req, res) {
        const profileData = await Profile.get()
        const Jobs = await Job.get()
        
        const jobId = req.params.id
        const job = Jobs.find(j => j.id == jobId)
        job.budget = JobUtils.calculateBudget(job['total-hours'], profileData['value-hour'])

        if (!job) {
            return res.send('Job Not Found!')
        }
        return res.render('job-edit', { job })
    },
    async update(req, res) {
        const Jobs = await Job.get()

        const jobId = req.params.id
        const job = Jobs.find(j => j.id == jobId)
        job.budget = JobUtils.calculateBudget(job['total-hours'], profileData['value-hour'])
        if (!job) {
            return res.send('Job Not Found!')
        }
        const updatedJob = {
            ...job,
            name: req.body.name,
            'total-hours': req.body['total-hours'],
            'daily-hours': req.body['daily-hours']
        }

        const updateJob = Jobs.map(job => {
            if (jobId == job.id) {
                job = updatedJob
            }
            return job

        })
        Job.update(updateJob)
        res.redirect(jobId)
    },
    async delete(req, res) {
        const jobId = req.params.id

        await Job.delete(jobId)

        return res.redirect('/')
    }
}