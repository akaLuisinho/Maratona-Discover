const Job = require('../model/job')
const JobUtils = require('../utils/jobUtils')
const Profile = require('../model/profile')


module.exports = {
    async index(req, res) {
        const Jobs = await Job.get()
        const profileData = await Profile.get()
        let statusCount = {
            total: Jobs.length,
            progress: 0,
            done: 0
        }

        let jobTotalHours = 0

        const updatedJobs = Jobs.map((job) => {
            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'
            const budget = JobUtils.calculateBudget(job['total-hours'], profileData['value-hour'])
            statusCount[status] += 1

            status == 'progress' ? jobTotalHours += job['daily-hours'] : jobTotalHours
            return {
                ...job,
                remaining,
                status,
                budget
            }
        })

        const freeHours = profileData['hours-per-day'] - jobTotalHours

        return res.render('index', { updatedJobs, profile: profileData, status: statusCount, freeHours })
    }
}