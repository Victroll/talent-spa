import * as types from "../constants/actions";

export function addNewTalent(component) {
    return {
        type: types.ADD_NEW_TALENT,
        talent: component
    };
}