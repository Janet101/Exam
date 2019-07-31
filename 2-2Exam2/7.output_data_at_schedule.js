//current time
function get_time(){
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    console.log(dateTime);
}

//
function printTasks(list){
    let index=0;
    function printTask(){
        if(!list[index]) return;
        setTimeout(()=>{
            get_time();
            console.log(list[index].Value);
            index++;
            printTask()
        },list[index].Time)
    }
    printTask()

}

/*-------------------------test-------------------------*/
let input = [{
    Value:"a",
    Time: 2000
},
{
    Value:"b",
    Time: 1000
},
{
    Value:"c",
    Time: 3000
},
];
printTasks(input);
