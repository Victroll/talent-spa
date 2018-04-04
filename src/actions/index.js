import * as types from "../constants/actions";

export function addNewTalent(component) {
    return {
        type: types.ADD_NEW_TALENT,
        talent: component
    };
}

export function openModalTalent(id) {
    return {
        type: types.OPEN_MODAL_TALENT,
        id: id
    };
}

export function closeModalTalent() {
    return {
        type: types.CLOSE_MODAL_TALENT
    };
}

export function openModalIcon() {
    return {
        type: types.OPEN_MODAL_ICON
    };
}

export function closeModalIcon() {
    return {
        type: types.CLOSE_MODAL_ICON
    };
}

export function updateFormICon(posX, posY) {
    return {
        type: types.UPDATE_FORM_ICON,
        posX: posX,
        posY: posY
    };
}

export function updateTalent(state) {
    return {
        type: types.UPDATE_TALENT,
        name: state.name,
        desc: state.desc,
        hasPoints: state.hasPoints,
        initPoints: state.initPoints,
        maxPoints: state.maxPoints,
        triggersTalent: state.triggersTalent
    };
}

export function updateTrigger(triggerId, add) {
    return {
        type: types.UPDATE_TRIGGER,
        id: triggerId,
        add: add
    };
}

export function openModalSettings() {
    return {
        type: types.OPEN_MODAL_SETTINGS
    };
}

export function closeModalSettings() {
    return {
        type: types.CLOSE_MODAL_SETTINGS
    };
}

export function updateTalentTreeSettings(state) {
    return {
        type: types.UPDATE_TALENT_TREE_SETTINGS,
        settings: state
    };
}

export function activePlayMode() {
    return {
        type: types.ACTIVE_PLAY_MODE
    };
}

export function activeEditMode() {
    return {
        type: types.ACTIVE_EDIT_MODE
    };
}

export function increaseTalentPoints(id) {
    return {
        type: types.INCREASE_TALENT_POINTS,
        id: id
    };
}

export function decreaseTalentPoints(id) {
    return {
        type: types.DECREASE_TALENT_POINTS,
        id: id
    };
}

export function removeTalent(id) {
    return {
        type: types.REMOVE_TALENT,
        id: id
    };
}

export function saveTalents(name) {
    return {
        type: types.SAVE_TALENTS,
        name: name
    };
}

export function openModalList() {
    return {
        type: types.OPEN_MODAL_LIST
    };
}

export function closeModalList() {
    return {
        type: types.CLOSE_MODAL_LIST
    };
}

export function fetchTalentTreeList() {
    return {
        type: types.FETCH_TALENT_TREE_LIST
    };
}

export function loadTalentTreeList(list) {
    return {
        type: types.LOAD_TALENT_TREE_LIST,
        list: list
    };
}

export function loadTalentTree(name) {
    return {
        type: types.LOAD_TALENT_TREE,
        name: name
    };
}

export function showLoadedTalentTree(talentTree) {
    return {
        type: types.SHOW_LOADED_TALENT_TREE,
        talentTree: talentTree
    };
}

export function addLoadedTalent(talent, index) {
    return {
        type: types.ADD_LOADED_TALENT,
        talent: talent,
        index: index
    };
}

export function openModalSave() {
    return {
        type: types.OPEN_MODAL_SAVE
    };
}

export function closeModalSave() {
    return {
        type: types.CLOSE_MODAL_SAVE
    };
}

export function goToHome() {
    return {
        type: types.GO_TO_HOME
    };
}

export function goToCreate() {
    return {
        type: types.GO_TO_CREATE
    };
}