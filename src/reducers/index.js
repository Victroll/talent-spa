import * as types from "../constants/actions";

export default function(state, action) {
    switch (action.type) {
        case types.ADD_NEW_TALENT:
            // Check if the component exists in the array
            if (!state.talents.filter((talent) => {
                    return talent.props.id === action.talent.props.id;
                }).length) {
                    action.talent.showImage();
                    return {...state, 
                        ['talents']: state.talents.push(action.talent)
                    };
            } else {
                return state;
            }
        default:
            return state;
    }
}