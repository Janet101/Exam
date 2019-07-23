/**
 * @param {number[]} nums
 * @param set
 * @param answers
 * @return {number[][]}
 */
let permute = function(nums, set=[],answers=[]) {
    if(!nums.length) answers.push([...set]);/*如果nums为空了，就把set加到answer里*/

    for(let i=0;i<nums.length;i++){
        const newNums = nums.filter((n,index)=> index !==i);/* n代表遍历nums中的每一项，当n不等于1，就放进newNums中，例如此时newNums=[2,3] */
        set.push(nums[i]);//例如把2放进set,此时set[1,2]
        permute(newNums, set, answers);//例如递归一次后，set为[1,2,3]
        set.pop();//返回到上一层，例如让set变回[1,2]
    }
    return answers;//返回最终的结果
};

let array=[1,2,3];
let res=permute(array);

console.log(res);

/*
//n所有可能结果的数量
for(let i=nums.length ; i>1; i--){
    n=n*(i-1);
}*/
