function task2() {
    console.log('task2')
    setTimeout(() => {
        console.log('task2-1')
    }, 1000)
    new Promise((resolve) => {
        console.log('task2-2')
        resolve()

    }).then(() => {
        console.log('task2-3')
    })
    console.log('task2-end')
}

console.log('task2')
task2()
console.log('task3')
