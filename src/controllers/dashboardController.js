const Job = require('../model/job')
const JobUtils = require('../utils/jobUtils')
const Profile = require('../model/profile')

module.exports = {
    index(req, res) {
        let statusCount = {
            total: Job.get().length,
            progress: 0,
            done: 0
        }
        const upatatedJobs = Job.get().map((job) => {
            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'
            const budget = JobUtils.calculateBudget(job)

            statusCount[status] += 1

            return {
                ...job,
                remaining,
                status,
                budget
            }
        })
        return res.render('index', { upatatedJobs, profile: Profile.get(), status: statusCount })
    }
}