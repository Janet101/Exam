/*法2*/

//fn（实际的 handler）
//wait（时间间隔）
//immediate（为 true 是表示在时间段的开头执行，否则在末尾执行）
//executeOncePerWait（为 true 时表示 throttle 否则为 debounce）

function debounceOrThrottle({ fn, wait = 300, immediate = false, executeOncePerWait = false }) {
    let tId = null;
    let context = null;
    let args = null;
    let lastTriggerTime = null;
    let result = null;
    let lastExecutedTime = null;

    const later = function() {
        const last = Date.now() - lastTriggerTime

        if(last < wait && last > 0) {
            setTimeout(later, wait - last)
        } else {
            result = fn.apply(context, args)
            context = args = null
            tId = null
        }
    }

    return function() {/*函数的返回值是一个新的经过包装的函数*/
        // 返回函数的函数体

        context = this;//context（用于作为某个对象的方法时提供 this 绑定）
        args = arguments;//args（用于保存 fn 的参数）
        lastTriggerTime = Date.now();//lastTriggerTime、lastExecutedTime 这两个变量来作为下一次事件触发时的参考时间;Date.now() 方法返回自1970年1月1日 00:00:00 UTC到当前时间的毫秒数。

        if(!tId) {//tId（初始化为 null,用于保存 setTimeout 的返回值，作为判断延时是否到期的依据，当延时到期即 fn 执行后将之再设为 null）
            tId = setTimeout(anotherFn, wait) // 此处 被 setTimeout 延时的可能除了要执行 fn 以外还有其他操作，
            // 故先用 anotherFn 占位
        }

        return result;//result（初始化为 null,用于保存 fn 的返回值）

    }

    const anotherFn = function() {
        const last = Date.now() - lastTriggerTime

        if(last < wait && last > 0) {
            setTimeout(anotherFn, wait - last)
        } else {
            result = fn.apply(context, args);
            context = args = null;
            tId = null;
        }
    }

}