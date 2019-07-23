/**
 * @param {number[]} nums
 * @return {number[][]}
 */

var threeSum = function(nums) {
    //申请一个空的数组来储存结果
    var rtn = [];

    //如果nums长度小于3，肯定没有结果，返回一个空数组
    if (nums.length < 3) {
        return rtn;
    }

    //升序排序,function(a,b)为参数，为了可以升序，用于对数组排序，暂时不用管
    nums = nums.sort(function(a, b) {
        return a - b;
    });

    //
    for (var i = 0; i < nums.length - 2; i++) {
        //如果这个数是大于0，就返回现在为止的数组，因为不可能再有组合了（已排过序）
        if (nums[i] > 0) {
            return rtn;
        }
        //去重：如果i不是第一次循环，并且nums中第i个和nums中i的前一个相等，就跳过这次循环。因为已经排过序，比如在nums=[-2,-2,-1，0,1,2]中，[-2,j,k],i=0已经出现过的所有可能结果肯定包含i=1的出现过           的所有可能结果。
        if (i > 0 && nums[i] == nums[i - 1]) {
            continue;//跳过这一次循环
        }
        //双指针的方法来找所有可能的组合
        for (var j = i + 1, k = nums.length - 1; j < k;) {
            //相加等于0，放进去
            if (nums[i] + nums[j] + nums[k] === 0) {
                rtn.push([nums[i], nums[j], nums[k]]);
                j++;
                k--;//减少1次循环
                //去重
                while (j < k && nums[j] == nums[j - 1]) {
                    j++;
                }
                //去重
                while (j < k && nums[k] == nums[k + 1]) {
                    k--;
                }
                //如果和大了，k再往小的方向移1位
            } else if (nums[i] + nums[j] + nums[k] > 0) {
                k--;
                //如果和小了，j往大的方向移1位
            } else {
                j++;
            }
        }
    }
    return rtn;
};

let arr = [-1, 0, 1, 2, -1, -4];
let result=threeSum(arr);

console.log(result);