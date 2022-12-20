// 两数求和
// const aa = [2,5,7,11] 9 => [0,2]
const arr = [2,5,7,11]
function findIndex(arr, sum) {
    const len = arr.length
    const res = {}
    for(let i = 0; i < len; i++) {
        const val = sum - arr[i]
        if(res[val] !== undefined) {
            return [res[val], i]
        } else {
            // 没有，那就先保存下来
            res[arr[i]] = i
        }
    }
}
// findIndex(arr, 9) // [0,2]

// 合并 有序 数组
// nums1 = [1,2,3, 7] nums2 = [2,5,6] => nums1 = [1,2,2,3,5,6]
// 双指针法
function mergeArr(nums1, nums2) {
    const m = nums1.length
    const n = nums2.length
    let i = m + n - 1
    // 从尾部开始判断
    let j = m-1
    let k = n-1
    while(j >= 0 && k >= 0) {
        // 都有
        if(nums1[j] < nums2[k]) {
            // nums2值大，需要前移一位
            nums1[i] = nums2[k]
            k--
            i--
        } else {
            // nums1值大，需要前移一位
            nums1[i] = nums1[j]
            i--
            j--
        }
    }
    // 处理 有一个遍历完的情况
    while(k >= 0) {
        // nums1 遍历完了，剩余nums2 元素放到最前面
        nums1[i] = nums2[k]
        i--
        k--
    }
    return nums1
}
const nums1 = [1,2,3,7]
const nums2 = [2,5,6]
// mergeArr(nums1, nums2)



// 三数求和
// const nums =  [-1, 0, 1, 2, -1, -4], 求 a +b+c = 0  =>  [ [-1, 0, 1], [-1, -1, 2] ]
// 双指针
function sumThreeNums(arr, sum) {
    let len = arr.length
    const res = []
    arr = arr.sort((a, b) => {
        return a - b
    })
    for(let i = 0; i < len - 2;i++) {
        // 左指针
        let j = i + 1
        // 右指针
        let k = len - 1
        // 如果值相同，代表前面已经算过了，那么就跳过
        if(i > 0 && arr[i] === arr[i-1]) {
            continue
        }
        while(j < k) {
            if(arr[j] + arr[k] > sum - arr[i]) {
                // 前后相加 大于后面的值,endI需要向前移动
                k--
                // 右指针重复
                while(j < k && arr[k] === arr[k+1]) {
                    k--
                }
            } else if(arr[j] + arr[k] === sum - arr[i]) {
                // 记录
                res.push([arr[i],arr[j], arr[k]])
                k--
                j++
                // 左指针重复
                while(j < k && arr[j] === arr[j-1]) {
                    j++
                }
                // 右指针重复
                while(j < k && arr[k] === arr[k+1]) {
                    k--
                }
            } else {
                j++
                // 左指针重复
                while(j < k && arr[j] === arr[j-1]) {
                    j++
                }
            }
        }
    }
    return res
}
const nums =  [-1, 0, 1, 2, -1, -4]
sumThreeNums(nums, 0)
