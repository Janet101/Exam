function throttle(func, ms) {

    let isThrottled = false,//此时setTimeout还在运行那1s，传入f1000(2)的时候，改变了哪里？
        savedArgs,
        savedThis;

    function wrapper() {

        if (isThrottled) { // (2) 如果isThrottled为null or false,可以立即运行func这个函数；如果为true,不断更新最后一个执行的函数及其参数，等时间到了之后会运行最后一个func
            savedArgs = arguments;
            savedThis = this;
            return;//结束运行此次的wrapper
        }

        func.apply(this, arguments); // (1)  this为func,func此时为f；argument将作为单独的参数传给 func 函数。

        isThrottled = true;//成功完成（1）后要卡住一下，记录（2），等（3）的时间到了会使用（2）的参数运行wrapper

        setTimeout(function() {
            isThrottled = false; // (3)运行完长达ms的时间后，设置isThrottled为false
            if (savedArgs) {//如果有在等待被新传入参数待执行的func，执行长达ms的时间内被传入的最后一个参数的fanc
                wrapper.apply(savedThis, savedArgs);//isThrottled已经为false，意味着会运行一次func.apply(this, arguments)，并且会再运行一次时间长达ms的setTimeout，运行完ms后才会回来此处的下一行代码
                savedArgs = savedThis = null;
            }
        }, ms);
    }

    return wrapper;
}


/*---------------------------test--------------------------*/
function f(a) {
    console.log(a)
};

// f1000 passes calls to f at maximum once per 1000 ms
let f1000 = throttle(f, 1000);

f1000(1); // shows 1 0
f1000(2); // (throttling, 1000ms not out yet)
f1000(3); // (throttling, 1000ms not out yet) 1

// when 1000 ms time out...
// ...outputs 3, intermediate value 2 was ignored

