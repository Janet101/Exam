let array = [1, 2, [3,4, [5,6,0]], 4, [3,7], 0];
let result=flatten(array);

console.log(result);

/*bfs：从上到下*/
 function flatten(arr){
     res = []
     while(arr.length){
         let pop = arr.shift(1)//shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。
         /*如果这个元素是数字类型，就把这个元素放到res中*/
         if (typeof pop === "number"){
             res.push(pop)
         }
         /*如果不是数字类型，就把它拆掉最外面一层数组，放到arr的后面*/
         else{
             arr.push.apply(arr,pop)
         }
     }
     return res
 }

//dfs:从左到右，从上到下
function flatten(arr) {
    let res=[];
    dfs(arr,res);
    return res;
}

function dfs(arr1,res1) {
    for(let item of arr1){
            if(Array.isArray(item)){
                dfs(item,res1);
            }else{
                res1.push(item);
            }
    }
}



