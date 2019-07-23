var find132pattern = function(nums) {
    var min_i = Number.MAX_SAFE_INTEGER;
    //ai, aj, ak
    for(let j=0;j<nums.length-1;j++){
        var min_i = Math.min(min_i ,nums[j]);
        for (let k = j + 1; k < nums.length; k++) {
            if (nums[k] < nums[j] && min_i < nums[k])
                return true;
        }
    }
    return false;
}