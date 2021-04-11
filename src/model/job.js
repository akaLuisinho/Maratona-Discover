const Database = require('../db/config')

//let data = [
//    {
//        id: 1,
//        name: 'Pizzaria Guloso',
//        'daily-hours': 2,
//        'total-hours': 6,
//        created_at: Date.now(),
//    },
//    {
//        id: 2,
//        name: 'One Two Project',
//        'daily-hours': 3,
//        'total-hours': 47,
//        created_at: Date.now(),
//    }
//]

module.exports = {
    async get() {

        db = await Database()

        const data = await db.all(`SELECT * FROM jobs`)

        await db.close()

        return data.map((job) => ({
            name: job.name,
            'daily-hours': job.daily_hours,
            'total-hours': job.total_hours,
            created_at: job.created_at
        }))
    },
    update(newData) {
        data = newData
    },
    delete(id) {
        data = data.filter(job => job.id !== id)
    },
    create(newJob) {
        data.push(newJob)
    }
}