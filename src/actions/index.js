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

export function updateTalent() {
    return {
        type: types.UPDATE_TALENT
    };
}