

// function SingleInstance() {
//     let instance
//     return function() {
//         if(!instance) {
//             instance = new SingleInstance()
//         }
//         return instance
//     }
// }

// es6 

// class SingleInstance{
//     constructor(name, age) {
//         if(!SingleInstance.instance) {
//             this.name = name
//             this.age = age
//             SingleInstance.instance = this
//         }
//         return SingleInstance.instance
//     }
// }
// class SingleInstance{
//     constructor(name, age) {
//         this.name = name
//         this.age = age
//     }
//     static getInstance(name, age) {
//         if(!this.instance) {
//             this.instance =  new SingleInstance(name, age)
//         }
//         return this.instance
//     }
// }
// const appleCom = SingleInstance.getInstance('苹果啊啊', 20)
// const copyCom = SingleInstance.getInstance('苹果1', 18)
// console.log(appleCom === copyCom) // true

// 实现一个登录框
class LoginModal {
    constructor({ title, content, }) {
        this.title = title
        this.content = content
        this.init()
    }
    static getInstance({ title= 'aa', content='' }) {
        if(!this.instance) {
            this.instance = new LoginModal({ title, content, })
        }
        return this.instance
    }
    init() {
        const that = this
        // 创建弹框
        const $box = $('<div class="login-box">')
        $box.css({
            display: 'none'
        })
        console.log($box, 'asdf')
        const child = `
           <div class="login-body">
                <div class="header">
                    <span>title</span>
                    <span class="close">close</span>
                </div>
                <div class="content">
                    <p>content</p>
                </div>
                <div class="footer">
                    <span>取消</span>
                    <span>确定</span>
                </div>
            </div>
        `
        $box.html(child)
        $('body').append($box)
        this.bindEvents()
    }
    bindEvents() {
        // 打开
        $('#btn').click(() => {
            this.openDialog()
        })
        $('.close').click(() => {
            this.closeDialog()
        })
    }
    openDialog() {
        $('.login-box').css({
            display: 'block'
        })
    }
    closeDialog() {
        $('.login-box').css({
            display: 'none'
        })
    }
}



class Subject {
    constructor() {
        this.observerList = []
    }
    // 添加observer
    addObserver(observer) {
        this.observerList.push(observer)
    }
    // 删除observer
    removeObserver(observer) {
        const index = this.observerList.findIndex(x => x.id === observer.id)
        this.observerList.splice(index,1)
    }
    // 通知修改
    notify(message) {
        this.observerList.forEach(observer => {
            observer.update(message)
        })
    }
}

class Observer {
    constructor(id, subject) {
        this.id = id
        if(subject) {
            subject.addObserver(this)
        }
    }
    update(message) {
        console.log(message, '更新数据')
    }
}




// class Dep {
//     constructor() {
//         this.message = {}
//         this.subscribers = {}
//     }
//     publish(type, content) {// 发布消息
//         const existMessages = this.message[type]
//         if(!existMessages) {
//             this.message[type] = []
//         }
//         this.message[type].push(content)
//     }
//     subscribe(type, subscriber) {//订阅
//         const existSubscribes = this.subscribers[type]
//         if(!existSubscribes) {
//             this.subscribers[type].push(subscriber)
//         }
//     }
//     notify(type) {
//         const info = this.message[type]
//         const existSubscribes = this.subscribers[type] || []
//         existSubscribes.forEach(subscriber => {
//             subscriber.update(type, info) // 调用其更新函数
//         })
//     }
// }

// class Publisher {
//     constructor(id,dep) {
//         this.id = id
//         this.dep = dep
//     }
//     puslish(type, message) {
//         this.dep.publish(type, message)
//     }
// }

// class Subscriber {
//     constructor(id, dep) {
//         this.id = id
//         this.dep = dep
//     }
//     subscribe(type) {
//         this.dep.subscribe(type, this)
//     }
//     update(tpye, message) {
//         console.log(message, '更新了')
//     }
// }

@women
class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    @log
    sayHello() {
        console.log('hello')
    }
}

function women(target) {
    target.sex = 'formal'
    const prototype = target.prototype
    prototype.hasChildren = true
}
function log(target, name, descripter) {
    const fn = descripter.value
    descripter.value = function (...args) {
        console.time()
        const result = fn.apply(this, ...args)
        console.timeEnd()
    }
}