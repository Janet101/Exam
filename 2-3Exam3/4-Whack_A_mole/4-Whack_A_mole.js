
let view = function(container, model) {
    let grid = document.createElement('div'),
        point = document.createElement('div');

    grid.setAttribute('class', 'grid');
    point.setAttribute('class', 'score');

    container.appendChild(grid);
    container.appendChild(point);

    function render(data){
        let {fills, score, count} = data;

        grid.innerHTML = '';//把旧的表格给擦掉，之后再调用createGrid()重新画

        if(count < 10) {
            grid.appendChild(createGrid(fills));
        }

        point.innerHTML = 'Final score ' + score;
    }

    //监听grid的鼠标点击事件，如果点击了grid,判断点击的是否为M,并把判断的结果传给model.click
    grid.addEventListener('click', (e) => {//e代表鼠标事件，e.target代表<li class="cell">M</li>，e.target.tagName是比如LI

        if(e.target.tagName.toLowerCase() !== 'li') return;
        console.log(e.target.tagName);
        let val = e.target.innerHTML;

        model.click(val === 'M')
    });

    model.setSubscriber(render);//把render为参数传给setSubscriber（fn）,使得_subscriber为render

    render(model.getData());//把model函数中的_data传入render
}


var model = function() {
    var _subscriber,
        _data = {
            fills: new Array(9),
            score: 0,
            count: 0
        };

    _data.fills = getRandom();

    function setSubscriber(fn) {
        _subscriber = fn;
    }

    function getData() {
        return _data;
    }

    function click(addScore) {
        _data.score += addScore ? 1 : 0;//计分
        _data.count ++;//计点击次数
        _data.fills = getRandom();//刷新表格

        _subscriber(_data);
    }

    return {setSubscriber, getData, click};
}

//画格子
function createGrid(arr) {
    let result = document.createElement('div');

    for(let i=0;i<3;i++) {
        let row = document.createElement('li');//怎么用ul才能让九宫格合在一块？

        for(let j=0;j<3;j++) {
            let cell = document.createElement('li');//一个li是一个cell
            cell.setAttribute('class', 'cell');

            let index = i*3 + j;

            if(arr[index]) cell.innerHTML = 'M';

            row.append(cell);//把li放到ul里面
        }

        result.appendChild(row);//把ul放大div里面
    }

    return result;
}


function getRandom() {
    let result = new Array(9);

    let candidates = [0,1,2,3,4,5,6,7,8], count = 0;

    while(count < 3) {
        let index = getRandomByRange(0, candidates.length-1);//随机选择index
        result[candidates[index]] = true;

        candidates.splice(index, 1);//把已经赋值为true的index去掉，比如[0,1,2]变为[0,2]

        count++;
    }

    return result;//返回新的随机生成的数组
}

function getRandomByRange(low, high) {
    let diff = high - low;

    return Math.floor(Math.random()*diff) + low;
}



let container = document.querySelector('.container');

view(container, model());
