let data = [
    {
        id: 1,
        name: 'Pizzaria Guloso',
        'daily-hours': 2,
        'total-hours': 6,
        created_at: Date.now(),
    },
    {
        id: 2,
        name: 'One Two Project',
        'daily-hours': 3,
        'total-hours': 47,
        created_at: Date.now(),
    }
]

module.exports = {
    get() {
        return data
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