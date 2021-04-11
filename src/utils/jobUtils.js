const Profile = require('../model/profile')

module.exports = {
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
    calculateBudget(totalHours, valueHour) {
        return( totalHours * valueHour)
    },
}