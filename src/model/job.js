const Database = require('../db/config')

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
    async delete(id) {
        db = await Database()

        await db.run(`DELETE FROM jobs WHERE id = ${id}`)
        
        db.close()
    },
    async create(newJob) {
        db = await Database()

        await db.run(`INSERT INTO jobs 
        (
        name,
        daily_hours,
        total_hours,
        created_at
        ) VALUES (
            "${newJob.name}",
            ${newJob['daily-hours']},
            ${newJob['total-hours']},
            ${newJob.created_at}
        )`)
        
        await db.close()
    }
}