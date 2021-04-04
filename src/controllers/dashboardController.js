const Job = require('../model/job')
const JobUtils = require('../utils/jobUtils')

module.exports = {
    index(req, res) {
        const upatatedJobs = Job.get().map((job) => {
            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'
            const budget = JobUtils.calculateBudget(job)
            return {
                ...job,
                remaining,
                status,
                budget
            }
        })
        return res.render('index', { upatatedJobs })
    }
}