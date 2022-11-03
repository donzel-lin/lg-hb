class Schedule {
    constructor() {
        this.tasks = []
        this.maxNum = 2
        this.currentTask = 0
    }
    async add(promiseCreator) {
        if(this.currentTask >= this.maxNum) {
            await new Promise(resolve => {
                this.tasks.push(resolve)
            })
        }
        this.currentTask++
        const result = await promiseCreator()
        this.currentTask--
        if(this.tasks.length > 0) {
            this.tasks.shift()()
        }
        return result
    }
}
const timeout = time => new Promise(resolve => {
    setTimeout(resolve, time)
})

const schedule = new Schedule()

const addTask = (time, order) => {
    schedule.add(() => timeout(time)).then(() => console.log(order))
}

addTask(1000, 1)
addTask(500, 2)
addTask(400, 3)
addTask(100, 4)
addTask(800, 5)
addTask(300, 6)
addTask(600, 7)
addTask(100, 8)
// 2 1 3 4 