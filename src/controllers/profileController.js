const Profile = require('../model/profile')

module.exports = {
    async index(req, res) {
        const profileData = await Profile.get()
        return res.render('profile', { profile: profileData })
    },
    async update(req, res) {
     const profileData = await profile.get()
        const data = req.body

        const weeksPerYear = 52
        const weeksPerMonth = (weeksPerYear - data['vacation-per-year']) / 12

        //total de horas na semana
        const weekTotalHours = data['hours-per-day'] * data['days-per-week']
        const monthlyTotalHours = weekTotalHours * weeksPerMonth

        const valueHour = data['monthly-budget'] / monthlyTotalHours

        Profile.update({
            ...profileData,
            ...req.body,
            'value-hour': valueHour
        })
        return res.redirect('profile')
    }
}