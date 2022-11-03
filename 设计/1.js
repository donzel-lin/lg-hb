// 异步调度器，同时两个执行，剩下的等待
class Schedule {
    constructor() {
        this.tasks = []
        this.maxNum = 2
        this.currentTask = 0
    }
    async add(promiseCreator) {
        return new Promise(resolve => {// 执行resolve时，才会执行 打印操作
            this.tasks.push(this.wrapFn(promiseCreator, resolve))
            this.runTask() // 执行任务
        })
    }

    wrapFn(fn, resolve) {
        return () => {
            // 执行fn主要是为了 延时
            Promise.resolve().then(() => fn()).then(() => {
                // 已经执行了函数了
                resolve()
                // 删除任务
                this.currentTask--
                this.runTask()
            })
        }
    }
    runTask() {
        if(this.currentTask < this.maxNum) {
            this.currentTask++
            // 及时将任务删除
            // console.log(this.tasks, '222222222222')
            const task = this.tasks.shift()
            task && task()
        }
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
addTask(150, 4)
addTask(800, 5)
addTask(780, 6)
addTask(600, 7)
addTask(100, 8)
// 2 1 3 4 5 6 8 7