const myThrottle = function(fn, limit) {
    let tr;
    return function(){
        const args = arguments;
        const hi_this=this;
        if(! tr)
        {
            fn.apply(hi_this, args);
            tr = true;
            setTimeOut(() => tr = false, limit)
        }
    }
}

function printResult(){
    console.log("This is myThrottle function");
}
myThrottle(printResult(),3000);
