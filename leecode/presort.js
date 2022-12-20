// [1, null, 2,3]  => 1,2,3
// []
const root = {
    val: 'A',
    left: {
        val: 'B',
        left: {
            val: 'D'
        },
        right: {
            val: 'E'
        }
    },
    right: {
        val: 'C',
        right: {
            val: 'F'
        }
    }
}
function presort(root) {
    if(!root) {
        return
    }
    console.log(root.val)
    presort(root.left)
    presort(root.right)
}

presort(root)