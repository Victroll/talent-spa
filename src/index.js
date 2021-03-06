import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from "./containers/app";
import reducer from './reducers';
import watchServerActions from './reducers/sagas';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducer,
    {
    talents: {},
    modalTalent: {
        isOpen: false,
        trigger: new Set()
    },
    modalList: {
        isOpen: false,
        treeList: []
    },
    modalIcon: {
        isOpen: false
    },
    modalSettings: {
        isOpen: false
    },
    modalSave: {
        isOpen: false
    },
    formIcon: {
        posX: 0,
        posY:0
    },
    talentTreeSettings: {
        triggerValue: 'max'
    },
    talentsToShow: [],
    isLoading: false,
    editMode: true,
    currentPage: 'h'
},applyMiddleware(sagaMiddleware),);

sagaMiddleware.run(watchServerActions);

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>,
    document.getElementById('root')
);