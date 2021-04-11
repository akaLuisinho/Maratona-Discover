const Database = require('../db/config')

//let data = {
//    name: 'Luís',
//    avatar: 'https://avatars.githubusercontent.com/u/75910800?v=4',
//    "monthly-budget": 3000,
//    "days-per-week": 5,
//    'hours-per-day': 5,
//    'vacation-per-year': 4,
//    'value-hour': 75
//}

module.exports = {
    async get() {
        const db = await Database()

        const data = await db.get(`SELECT * FROM profile`)
        
        await db.close() 
        return {
            name: data.name,
            avatar: data.avatar,
            'monthly-budget': data.monthly_budget,
            'days-per-week': data.days_per_week,
            'hours-per-day': data.hours_per_day,
            'vacation-per-year': data.vacation_per_year,
            'value-hour': 75
        }
    },
    update(newData) {
        data = newData
    }
}