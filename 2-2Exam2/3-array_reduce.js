
Array.prototype.myReduce = function(fn, initialVal) {
    let accumulator = (initialVal === undefined) ? undefined : initialVal;//判断initialVal是否存在，如果定义了，accumulator为initialVal的值
    let currentValue;
    for (let i = 0; i < this.length; i++) {
        if (accumulator !== undefined) {/*如果定义了initialVal*/
            currentValue = this[i];
            accumulator = fn(accumulator, currentValue);
        }
        else {/*如果没有定义initialVal*/
            accumulator = this[0];
            currentValue = this[1];
            accumulator = fn(accumulator,currentValue);
            i++;
        }
    }
    return accumulator;
}

//tests
var numbers3 = [20, 20, 2, 3];
var total = numbers3.myReduce((a, b)=> a + b);
console.log(total); // 55

var flattened = [[0, 1], [2, 3], [4, 5]].reduce(function(a, b) {
    return a.concat(b);
});
console.log(flattened); //[ 0, 1, 2, 3, 4, 5 ]

var multi=numbers3.myReduce((a,b)=>a*b);
console.log(multi);