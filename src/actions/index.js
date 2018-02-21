import * as types from "../constants/actions";

export function addOne() {
    return {
        type: types.ADD_ONE
    };
}

export function substractOne() {
    return {
        type: types.SUBSTRACT_ONE
    };
}

export function doubleValue() {
    return {
        type: types.DOUBLE_VALUE
    };
}