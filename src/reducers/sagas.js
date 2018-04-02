import { call, put, select, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import * as types from "../constants/actions";

function saveTalentTree(tree) {
    return axios.put(
        'http://localhost:3210/saveTalentTree',
        {
            crossdomain: true,
            params: tree
        });
}

function* saveTalents() {
    const s = (state) => state;
    const st = yield select(s);
    const talentTree = getTalentTreeInfo(st);
    console.log(talentTree);
    const response = yield call(saveTalentTree, talentTree);
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
    yield takeLatest(types.SAVE_TALENTS, saveTalents)
}

export default watchServerActions;