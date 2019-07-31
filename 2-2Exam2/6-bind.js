
Function.prototype.myBind = function(newThis) {
    if (typeof this !== "function") {
        throw new Error(this + "cannot be bound as it's not callable");
    }
    var boundTargetFunction = this;
    return function boundFunction() {
        return boundTargetFunction.apply(newThis);
    };
};


/*-------------------------test-------------------------*/
var module = {
    x: 42,
    getX: function() {
        return this.x;
    }
};
var unboundGetX = module.getX;
console.log(unboundGetX()); // The function gets invoked at the global scope

// expected output: undefined
var boundGetX = unboundGetX.myBind(module);
console.log(boundGetX());
// expected output: 42