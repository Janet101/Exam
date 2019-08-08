var autoCompleteView = function(container, model) {
    // construct HTML for autocomplete
    var _inputDom = document.createElement('input'),
        _optionsDom = document.createElement('div');

    _inputDom.setAttribute('type', 'text');
    _optionsDom.setAttribute('class', 'options');

    container.appendChild(_inputDom);
    container.appendChild(_optionsDom);
    // initial setup done

    _inputDom.addEventListener('keyup', function(e){
        var text = e.target.value;

        model.filterOptions(text);
    });

    function render(data){
        if(!data || !data.length) {
            _optionsDom.style.display = 'none';
        } else {
            _optionsDom.innerHTML = '';

            for(let option of data) {
                let singleOption = document.createElement('div');
                singleOption.innerHTML = option;

                _optionsDom.appendChild(singleOption);
            }

            _optionsDom.style.display = 'block';
        }
    }

    model.subscribe(render);
};

var model = function(config){
    var _subscriber,
        _options = config.options || [];


    function filterOptions(key){
        var result = [], key = key.toUpperCase();

        if(key !== '') {
            for(let option of _options){
                if(option.indexOf(key) > -1) {
                    result.push(option);
                }
            }
        }

        _subscriber(result);
    }

    return {
        subscribe: function(fn) {
            if(!_subscriber) _subscriber = fn;
        },
        filterOptions: filterOptions
    }
};


var autoCompleteContainer = document.querySelector('.auto-complete');

var config = {
    options: [
        'CA',
        'AZ',
        'WA',
        'NY',
        'OR',
        'TX',
        'TS',
        'ML',
        'MX'
    ]
};
var model = model(config);

var view = autoCompleteView(autoCompleteContainer, model);
