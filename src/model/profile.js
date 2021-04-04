const { update } = require("../controllers/profileController")

let data = {
    name: 'Luís',
    avatar: 'https://avatars.githubusercontent.com/u/75910800?v=4',
    "monthly-budget": 3000,
    "days-per-week": 5,
    'hours-per-day': 5,
    'vacation-per-year': 4,
    'value-hour': 75
}

module.exports = {
    get() {
        return data
    },
    update(newData) {
        data = newData
    }
}