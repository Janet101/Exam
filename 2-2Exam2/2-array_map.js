
//我自己的方法
Array.prototype.myMap =  function (fn) {
    if (!fn || typeof fn !== 'function') {
        throw new TypeError();
    }
    const newArray = [];
    for (let i = 0; i < this.length; i++) {
        var a=fn(this[i]);
        newArray.push(a);
    }
    return newArray
};

/*//用callback
Array.prototype.myMap = function(callback) {
    arr = [];
    for (var i = 0; i < this.length; i++)
        arr.push(callback(this[i], i, this));
    return arr;
};
*/

// Function Export
module.exports = Array;

/*-------------------------test-------------------------*/
const array1 = [1, 4, 9, 16];
const map1 = array1.myMap(x => x * 2);
console.log(map1);