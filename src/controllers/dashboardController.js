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
            done: 0,
            freeHours: 0
        }

        let jobTotalHours = 0
        
        const updatedJobs = Jobs.map((job) => {
            const remaining = JobUtils.remainingDays(job)
            const budget = JobUtils.calculateBudget(job['total-hours'], profileData['value-hour'])
            
            statusCount.freeHours = profileData['hours-per-day'] - jobTotalHours
            const status = remaining <= 0 ? 'done' : 'progress'
            status == 'progress' ? jobTotalHours += job['daily-hours'] : jobTotalHours
            statusCount[status] += 1
            
            return {
                ...job,
                remaining,
                status,
                budget
            }
        })

        //this is for the newer jobs to be shown in the top of the page
        updatedJobs.reverse()   

        return res.render('index', { updatedJobs, profile: profileData, status: statusCount })
    }
}
