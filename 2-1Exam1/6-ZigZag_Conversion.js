const convert = function (s, numRows) {
    if (numRows <= 1)
        return s;

    let res = '';
    let len = s.length;
    let dis = numRows * 2 - 2;

    /* first row */
    for (let i = 0; i < len; i = i + dis) {
        res = res + s.charAt(i);
    }

    /* middle */
    for (let i = 1; i < numRows - 1; i++) {
        let tempDis = 2 * i;
        for (let j = i; j < len; j += tempDis) {
            res += s.charAt(j);
            tempDis = dis - tempDis;
        }
    }

    /* last row */
    for (let i = numRows - 1; i < len; i += dis) {
        res += s.charAt(i);
    }
    return res;
};

let s= "PAYPALISHIRING";
let numRows = 4;
let result=convert(s,numRows);
console.log(result);