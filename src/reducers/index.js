import * as types from "../constants/actions";

export default function(state, action) {
    switch (action.type) {
        case types.ADD_NEW_TALENT:
            // Check if the component exists in the array
            for (let id in state.talentsObj) {
                if (id === action.talent.props.id + 'Canvas')
                    return state;
            }
            return {...state,
                talents: {...state.talents,
                    [action.talent.props.id + 'Canvas']: {
                        talent: action.talent,
                        name: 'New talent',
                        desc: 'Description',
                        hasPoints: false,
                        initPoints: 0,
                        maxPoints: 1,
                        posX: 0,
                        posY: 0,
                        triggersTalent: false
                    }
                }
            };
        case types.UPDATE_TALENT:
            return {...state,
                talents: {...state.talents,
                    [state.currentTalentId]: {...state.talents[state.currentTalentId],
                        name: action.name,
                        desc: action.desc,
                        hasPoints: action.hasPoints,
                        initPoints: action.initPoints,
                        maxPoints: action.maxPoints,
                        posX: state.formIcon.posX,
                        posY: state.formIcon.posY,
                        triggersTalent: action.triggersTalent
                    }
                },
                modalTalent: {...state.modalTalent,
                    isOpen: false
                }
            };
        case types.OPEN_MODAL_TALENT:
            return {...state,
                currentTalentId: action.id,
                modalTalent: {...state.modalTalent,
                    isOpen: true
                },
                formIcon: {...state.formIcon,
                    posX: state.talents[action.id].posX,
                    posY: state.talents[action.id].posY
                }
            };
        case types.CLOSE_MODAL_TALENT:
            return {...state,
                modalTalent: {...state.modalTalent,
                    isOpen: false
                }
            };
        case types.OPEN_MODAL_ICON:
            return {...state,
                modalIcon: {...state.modalIcon,
                    isOpen: true
                }
            };
        case types.CLOSE_MODAL_ICON:
            return {...state,
                modalIcon: {...state.modalIcon,
                    isOpen: false
                }
            };
        case types.UPDATE_FORM_ICON:
            return {...state,
                formIcon: {...state.formIcon,
                    posX: action.posX,
                    posY: action.posY
                }
            };
        default:
            return state;
    }
}