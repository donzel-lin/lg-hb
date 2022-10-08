// 采用的发布订阅模式


class Bus {
    constructor() {
        this.cbs = {}
    }
    on(type, cb) {
        const existCbs = this.cbs[type]
        if(!existCbs) {
            this.cbs[type] = []
        }
        this.cbs[type].push(cb)
    }
    emit(type, params) {
        const cbs = this.cbs[type] || []
        cbs.forEach(cb => {
            cb(params)
        })
    }
    off(type, cb) {
        const existCbs = this.cbs[type]
        const index = existCbs.findIndex(x => x === cb)
        this.cbs[type].splice(index, 1)
    }
}