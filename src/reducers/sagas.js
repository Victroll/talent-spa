import { call, put, select, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import * as types from "../constants/actions";
import { loadTalentTreeList, showLoadedTalentTree, closeModalList, closeModalSave } from '../actions';

function saveTalentTree(tree, name) {
    return axios.post(
        'http://localhost:3210/saveTalentTree',
        {
            tree: tree,
            name: name
        });
}

function getTalentTreeList() {
    return axios.get(
        'http://localhost:3210/getTalentTreeList'
    );
}

function getTalentTree(name) {
    return axios.get(
        'http://localhost:3210/getTalentTree/' + name
    );
}

function* loadTalentTree(data) {
    const response = yield call(getTalentTree, data.name);
    yield put(closeModalList());
    yield put(showLoadedTalentTree(response.data.talentTree));
}

function* fetchTalentTreeList() {
    const response = yield call(getTalentTreeList);
    yield put(loadTalentTreeList(response.data.list));
}

function* saveTalents(data) {
    const s = (state) => state;
    const st = yield select(s);
    const talentTree = getTalentTreeInfo(st);
    yield put(closeModalSave());
    yield call(saveTalentTree, talentTree, data.name);
}

function getTalentTreeInfo(state) {
    const talentsId = Object.keys(state.talents);
    var stateTalents = state.talents;
    var talents = [];

    talentsId.forEach((id) => {
        talents.push({
            id: id,
            name: stateTalents[id].name,
            desc: stateTalents[id].desc,
            hasPoints: stateTalents[id].hasPoints,
            initPoints: stateTalents[id].initPoints,
            currentPoints: stateTalents[id].currentPoints,
            maxPoints: stateTalents[id].maxPoints,
            posX: stateTalents[id].posX,
            posY: stateTalents[id].posY,
            triggersTalent: stateTalents[id].triggersTalent,
            triggers: stateTalents[id].triggers,
            triggerBy: [...stateTalents[id].triggerBy],
            disabled: stateTalents[id].disabled,
            transform: document.getElementById(id.split('Canvas')[0]).style.transform
        });
    });

    return talents;
}

function* watchServerActions() {
    yield [
        takeLatest(types.SAVE_TALENTS, saveTalents),
        takeLatest(types.FETCH_TALENT_TREE_LIST, fetchTalentTreeList),
        takeLatest(types.LOAD_TALENT_TREE, loadTalentTree)
    ]
}

export default watchServerActions;