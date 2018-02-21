import * as types from "../constants/actions";

export default function(state, action) {
    switch (action.type) {
        case types.ADD_ONE:
            return {...state, ['value']: state.value + 1}
        case types.SUBSTRACT_ONE:
            return {...state, ['value']: state.value - 1}   
        case types.DOUBLE_VALUE:
            return {...state, ['value']: state.value * 2}
        default:
            return state;
    }
}