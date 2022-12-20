// 翻转字符串
const string = 'abcdefg'
const aa = string.split('').reverse().join('')
// console.log(aa, 'aa') // gfedcba

// 回文 字符串， 对称
function isSymmetryString(str) {
    return str === str.split('').reverse().join('')
}
isSymmetryString('aba')


// 删除一个字符后，是否为 对称 回字文
// const aa = 'abca'

function isSymmetryDeleteOneChart(str) {
    const arr = str.split('')
    let i = 0
    let len = str.length
    let j = len - 1
    while(i < j && arr[i] === arr[j]) {
        i++
        j--
    }
    // 判断拿掉左指针后，是否 符合
    if(isPalidron(i+1, j)) {
        return true
    }
    // 判断拿掉右指针后，是否 符合
    if(isPalidron(i, j - 1)) {
        return true
    }
    function isPalidron(st, ed) {
        while(st < ed) {
            if(arr[st] !== arr[ed]) {
                return false
            }
            st++
            ed--
        }
        return true
    }
    // 默认 是不符合
    return false
}
isSymmetryDeleteOneChart('abcda')

// 可添加，搜索（支持 正则）
// addWord("bad")
// addWord("dad")
// addWord("mad")
// search("pad") -> false
// search("bad") -> true
// search(".ad") -> true
// search("b..") -> true
class WordDictionary {
    constructor() {
        this.dictionary = {}
    }
    addWord(str) {
        const len = str.length
        if(this.dictionary[len]) {
            this.dictionary[len].push(str)
        } else {
            this.dictionary[len] = [str]
        }
    }

    searchWord(str) {
        const len = str.length
        if(!this.dictionary[len]) {
            return false
        }
        if(!str.includes('.')) {
            return this.dictionary[len].includes(str)
        }
        // 含有. 需要匹配正则
        const reg = new RegExp(str)
        return this.dictionary[len].some(word => {
            return reg.test(word)
        })
    }
}
const wordDictionary = new WordDictionary()
wordDictionary.addWord("bad")
wordDictionary.addWord("dad")
wordDictionary.addWord("mad")
const a = wordDictionary.searchWord("pad")
const a1 = wordDictionary.searchWord("bad")
const a2 = wordDictionary.searchWord(".ad")
const a3 = wordDictionary.searchWord("b..")

// 字符串转数字


