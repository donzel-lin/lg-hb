

function getMobile() {

    var prefixArray = new Array("130", "131", "132", "133", "135", "137", "138", "170",'177',"181", "187", "189", '199');

    var i = parseInt(10 * Math.random());

    var prefix = prefixArray[i];

    for (var j = 0; j < 8; j++) {

        prefix = prefix + Math.floor(Math.random() * 10);
    }
    return prefix;

}
function getGift() {
    const list = [
        'gift1','gift2','gift3'
    ]
    const index = Math.floor(Math.random() * list.length)
    return list[index]
}
function hidePhone(str) {
    const prefix = str.slice(0,3)
    const tail = str.slice(-4)
    return prefix + '****' + tail
}

$(document).ready(function(){
    const list =  [...new Array(30).keys()].reduce((all, item) => {
        all.push({
            mobile: hidePhone(getMobile()),
            gift: getGift()
        })
        return all
    }, [])
    let children = ''
    list.forEach(item => {
        const li = `
                <li class="gift-item">
                    <span>${item.mobile}</span>
                    <span>******************</span>
                    <span>抽中获得了${item.gift}</span>
                </li>
            `
        children += li
    })
    $('#giftList').html(children)
});
