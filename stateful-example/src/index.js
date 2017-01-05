import ReactDOM from 'react-dom';
import React from 'react';
import ReactRadioButtonGroup from 'react-radio-button-group';

window.onload = function() {
    let props = {
        name: "number",
        options: ['One', 'Two', 'Three'],
        value: 'Two',
        onChange: (val) => console.log('Changed val: ', val),
        isStateful: true
    };

    ReactDOM.render(
        <div>
            <form action='/'>
                <ReactRadioButtonGroup {...props} />
                <input type='submit'/>
                <div>
                    {window.location.search}
                </div>
            </form>
        </div>,
        document.getElementById('root')
    );
};
