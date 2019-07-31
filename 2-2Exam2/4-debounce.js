
function myDebouce(fn, wait) {
    let _timer;
    return function(...args) {
        clearTimeout(_timer);
        _timer = setTimeout(() => {
            fn.apply(null, args);//????
        }, wait)
    }
}

//test
function printResult(){
    console.log("This is myDebouce function");
}
myDebouce(printResult(),3000);

