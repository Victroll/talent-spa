import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from "./containers/app";
import reducer from './reducers';

const store = createStore(reducer, {
    talents: {},
    modalTalent: {
        isOpen: false
    },
    modalIcon: {
        isOpen: false
    },
    formIcon: {
        posX: 0,
        posY:0
    }
});

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>,
    document.getElementById('root')
);