const Profile = require('../model/profile')

module.exports = {
    remainingDays(job) {
        const dayInMs = 1000 * 60 * 60 * 24
        const createdDate = new Date(job.created_at)
        
        const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed()

        const dueDay = createdDate.getDate() + Number(remainingDays)
        const dueDayInMs = createdDate.setDate(dueDay)
    
        const timeDiffInMS = dueDayInMs - Date.now()
        const dayDiff = Math.floor(timeDiffInMS / dayInMs)
        
        return dayDiff
    },
    calculateBudget(totalHours, valueHour) {
        return( totalHours * valueHour)
    },
}