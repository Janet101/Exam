function progressView(container, model){//传model进来有啥意义？
    function render(data){
        // render new HTML with data given
        // data -> 24
        let innerEle = container.querySelector('.inner');//获取文档中 class="inner" 的元素, 附给innerEle

        innerEle.style.width = data + '%';
    };

    container.innerHTML = '<div class="inner"></div>';//往.progress-bar的标签内插入标签

    model.subscribe(render);

    render();
}


function model(){

    let _subscriber,
        _data = 0,
        _SPEED = 100,//0.1s
        _DURATION = 3000,//3s
        _interval;

    function _updateData(){
        // keep updating _data;
        _data += (_SPEED/_DURATION)*100;//第一次_data=3.333

        _data = _data > 100 ? 100 : _data;
        _subscriber(_data);

        if(_data >= 100){
            clearInterval(_interval);//To stop further calls, we should call clearInterval(timerId).
        }
    }

    _interval = setInterval(_updateData, _SPEED);

    return {
        subscribe: function(cb){ //第一次运行model()，
            if(!_subscriber) _subscriber = cb;
        }
    }
}

let i_progressBarContainer = document.querySelector('.progress-bar');//获取文档中 class="progress-bar" 的元素, 附给i_progressBarContainer
let i_model = model();//先运行model()

let i_progressView = progressView(i_progressBarContainer, i_model);
