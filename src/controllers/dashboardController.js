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

        let jobTotalHours = 0

        const updatedJobs = Job.get().map((job) => {
            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'
            const budget = JobUtils.calculateBudget(job)

            statusCount[status] += 1

            status == 'progress' ? jobTotalHours += job['daily-hours'] : jobTotalHours

            return {
                ...job,
                remaining,
                status,
                budget
            }
        })

        const freeHours = Profile.get()['hours-per-day'] - jobTotalHours

        return res.render('index', { updatedJobs, profile: Profile.get(), status: statusCount, freeHours })
    }
}