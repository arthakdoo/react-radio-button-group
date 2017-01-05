import ReactDOM from 'react-dom';
import React from 'react';
import {createStore} from 'redux';
import { Provider} from 'react-redux';
import Reducer from './reducer';
import App from './app';

window.onload = function() {
    const store = createStore(Reducer);

    ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>,
        document.getElementById('root')
    );
};
