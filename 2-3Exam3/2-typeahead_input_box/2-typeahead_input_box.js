const DIRECTION = {
    UP: 'up',
    DOWN: 'down'
}


function typeAheadView(container, model){
    var _input = document.createElement('input'),
        _options = document.createElement('div');

    _input.setAttribute('type', 'text');
    _options.setAttribute('class', 'options');

    container.appendChild(_input);
    container.appendChild(_options);

    var cb = debouce(model.fetchData, 100);

    _input.addEventListener('keyup', function(e){
        var inputText = e.target.value;

        cb(inputText);
    });

    container.addEventListener('keyup', function(e) {
        var keyCode = e.keyCode;


        if(keyCode === 38) {
            // UP
            model.arrowKey(DIRECTION.UP);
        } else if(keyCode === 40) {
            // DOWN
            model.arrowKey(DIRECTION.DOWN);
        }
    });


    function render(data, selected){
        if(!data || !data.length) {
            _options.style.display = 'none';
        } else {
            _options.innerHTML = '';

            for(let i=0;i<data.length;i++) {
                let item = data[i];

                let singleOption = document.createElement('div');
                singleOption.innerHTML = item;

                if(i === selected) {
                    singleOption.innerHTML = item + ' selected';
                }

                _options.appendChild(singleOption);
            }

            _options.style.display = 'block';
        }
    }

    model.subscribe(render);
}



function model(){
    var _subscriber, _cache={}, _data, _selected = -1;

    function _fetchData(text){

        if(_cache[text]) {
            apiBack(_cache[text]);
        } else {
            fetch('https://swapi.co/api/people/?search=' + text)
                .then(response => response.json())
                .then(function(json){
                    _cache[text] = json;
                    apiBack(json);
                });
        }
    }

    function apiBack(json) {
        var names = json.results.map(function(item){
            return item.name;
        });

        _data = names;

        _subscriber(_data, _selected);
    }

    function _arrowKey(direction){
        // update _selected

        if(direction === DIRECTION.DOWN) {
            _selected++;

            _selected = _selected > _data.length-1 ?  _data.length-1 : _selected;
        } else if (direction === DIRECTION.UP) {
            _selected--;

            _selected = _selected < -1 ? -1 : _selected;
        }

        _subscriber(_data, _selected);
    }

    return {
        subscribe: function(cb) {
            if(!_subscriber) _subscriber = cb;
        },
        fetchData: _fetchData,
        arrowKey: _arrowKey
    }
}


function debouce(fn, wait) {
    var _timer;

    return function(...args){
        clearTimeout(_timer);

        _timer = setTimeout(function(){
            fn.apply(null, args);
        }, wait);
    };
}



var typeAheadContainer = document.querySelector('.typeahead-container');
var model = model();

typeAheadView(typeAheadContainer, model);
