// const map = new Map()
// map.set('aa', 1)
// map.set('bb', 2)
// map['cc'] = 3
// /*
// 0:{"aa" => 1}
// 1: {"bb" => 2}
// cc: 3
// size: 2
// */
// map.get('aa') // 1
// map['aa'] // undefined
// map.delete('aa')
// console.log(map, map.get('aa'), map.size)
// function replacer(key, value) {
//     if(value instanceof Map) {
//       return {
//         dataType: 'Map',
//         value: Array.from(value.entries()), // or with spread: value: [...value]
//       };
//     } else {
//       return value;
//     }
//   }
//   function reviver(key, value) {
//     if(typeof value === 'object' && value !== null) {
//       if (value.dataType === 'Map') {
//         return new Map(value.value);
//       }
//     }
//     return value;
// }
// const string = JSON.stringify(map, replacer)
// const _map = JSON.parse(string, reviver)
// console.log(string, _map) // {"dataType":"Map","value":[["bb",2]]}   Map(1){...}


// map与 数组的联系
// const list = [['a', 'value'], ['b', 'value2']]
// const map = new Map(list)
// console.log(map, 'map', map.get('a'), Array.from(map.values()))
// map.forEach((value, key) => {
//     console.log(key ,value , '1111111111')
// })
// for(item of map) {
//     console.log(item, 'item')
// }


// const first = [['a', '1'], ['b', 2]]
// const second = [['c', 3], ['d', 4]]
// const third = new Map([...[['e', 5], ['f', 6]]])
// const _first = new Map(first)
// const aa = new Map([..._first, ...second, ...third])
// console.log(aa, 'aa')