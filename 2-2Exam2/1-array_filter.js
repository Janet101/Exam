
//To define mfilter we must declare the method on Array.protoype.(Otherwise js interpreter will print the TyperError which tells us that mfilter is not a function because it cannot be found in Array.prototype)
Array.prototype.myfilter =  function (fn) {

    if (!fn || typeof fn !== 'function') {
        throw new TypeError();
    }

    const newArray = [];

    for (let i = 0; i < this.length; i++) {
        if (fn(this[i])) newArray.push(this[i])
    }

    return newArray
}

// Function Export
module.exports = Array;

/*-------------------------test-------------------------*/
var students = [
    { name: 'Quincy', grade: 96 },
    { name: 'Jason', grade: 84 },
    { name: 'Alexis', grade: 100 },
    { name: 'Sam', grade: 65 },
    { name: 'Katie', grade: 90 }
];
var studentGrades = students.myfilter(student => student.grade >= 90);
console.log(studentGrades);