import * as types from "../constants/actions";

export default function(state, action) {
    let newState = {};
    let triggers = [];
    let talents = [];
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
                        currentPoints: 0,
                        maxPoints: 1,
                        posX: Math.floor(Math.random() * 30),
                        posY: Math.floor(Math.random() * 16),
                        triggersTalent: false,
                        triggers: [],
                        triggerBy: new Set(),
                        disabled: false
                    }
                }
            };
        case types.UPDATE_TALENT:
            triggers = [...state.modalTalent.trigger];
            
            newState = {...state,
                talents: {...state.talents,
                    [state.currentTalentId]: {...state.talents[state.currentTalentId],
                        name: action.name,
                        desc: action.desc,
                        hasPoints: action.hasPoints,
                        initPoints: Number(action.initPoints),
                        currentPoints: Number(action.initPoints),
                        maxPoints: Number(action.maxPoints),
                        posX: state.formIcon.posX,
                        posY: state.formIcon.posY,
                        triggersTalent: action.triggersTalent,
                        triggers: triggers
                    }
                },
                modalTalent: {...state.modalTalent,
                    isOpen: false
                }
            };

            triggers.forEach((current) => {
                newState = {...newState,
                    talents: {...newState.talents,
                        [current + 'Canvas']: {...newState.talents[current + 'Canvas'],
                            triggerBy: newState.talents[current + 'Canvas'].triggerBy.add(newState.currentTalentId)
                        }
                    }
                };
            });

            return newState;
        case types.OPEN_MODAL_TALENT:
            return {...state,
                currentTalentId: action.id,
                modalTalent: {...state.modalTalent,
                    isOpen: true,
                    trigger: new Set(state.talents[action.id].triggers)
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
        case types.UPDATE_TRIGGER:
            if (action.add) {
                return {...state,
                    modalTalent: {...state.modalTalent,
                        trigger: state.modalTalent.trigger.add(action.id)
                    },
                    talents: {...state.talents,
                        [state.currentTalentId]: {...state.talents[state.currentTalentId],
                            triggersTalent: true
                        }
                    }
                };
            } else {
                let newSet = state.modalTalent.trigger;
                newSet.delete(action.id);
                return {...state,
                    modalTalent: {...state.modalTalent,
                        trigger: newSet
                    },
                    talents: {...state.talents,
                        [state.currentTalentId]: {...state.talents[state.currentTalentId],
                            triggersTalent: state.modalTalent.trigger.size !== 0
                        }
                    }
                };
            }
        case types.OPEN_MODAL_SETTINGS:
            return {...state,
                modalSettings: {...state.modalSettings,
                    isOpen: true
                }
            };
        case types.CLOSE_MODAL_SETTINGS:
            return {...state,
                modalSettings: {...state.modalSettings,
                    isOpen: false
                }
            };
        case types.UPDATE_TALENT_TREE_SETTINGS:
            return {...state,
                modalSettings: {...state.modalSettings,
                    isOpen: false
                },
                talentTreeSettings: {...state.talentTreeSettings,
                    triggerValue: action.settings.triggerValue
                }
            };
        case types.ACTIVE_EDIT_MODE:
            newState = {...state,
                editMode: true
            };

            talents = Object.keys(state.talents);

            talents.forEach((current) => {
                newState.talents[current].currentPoints = newState.talents[current].initPoints;
            });
            
            return newState;
        case types.ACTIVE_PLAY_MODE:
            // Disable talents that should be
            talents = Object.keys(state.talents);
            newState = {...state};

            // For each talent, look for the talents that triggers
            talents.forEach((current) => {
                newState.talents[current].triggers.forEach((t) => {
                    newState.talents[t + 'Canvas'].disabled = true;
                });
                newState.talents[current].currentPoints = newState.talents[current].initPoints;
            });
            return {...newState,
                editMode: false
            };
        case types.INCREASE_TALENT_POINTS:
            if (state.talents[action.id].disabled) return state;

            newState = {...state,
                talents: {...state.talents,
                    [action.id]: {...state.talents[action.id],
                        currentPoints: 
                            state.talents[action.id].currentPoints < state.talents[action.id].maxPoints ?
                            state.talents[action.id].currentPoints + 1
                            : state.talents[action.id].currentPoints
                    }
                }
            };

            triggers = state.talents[action.id].triggers;

            if (newState.talentTreeSettings.triggerValue === 'max') {
                if (newState.talents[action.id].currentPoints === 
                    newState.talents[action.id].maxPoints) { // Enable talents
                        triggers.forEach((current) => {
                            // Check all the talents tha trigger this one
                            newState.talents[current + 'Canvas'].disabled = ![...newState.talents[current + 'Canvas'].triggerBy].reduce(
                                (l, t) =>  l && (newState.talents[t].currentPoints ===
                                                newState.talents[t].maxPoints),
                            true);
                        });
                    }
            } else {
                if (newState.talents[action.id].currentPoints > 
                    newState.talents[action.id].initPoints) { // Enable talents
                        triggers.forEach((current) => {
                            newState.talents[current + 'Canvas'].disabled = ![...newState.talents[current + 'Canvas'].triggerBy].reduce(
                                (l, t) =>  l && (newState.talents[t].currentPoints >
                                                newState.talents[t].initPoints),
                            true);
                        });
                }
            }

            return newState;
        case types.DECREASE_TALENT_POINTS:
            newState = {...state,
                talents: {...state.talents,
                    [action.id]: {...state.talents[action.id],
                        currentPoints: 
                            state.talents[action.id].currentPoints > state.talents[action.id].initPoints ?
                            state.talents[action.id].currentPoints - 1
                            : state.talents[action.id].currentPoints
                    }
                }
            };

            triggers = state.talents[action.id].triggers;

            // If any of the talents tat action.id triggers has points, it couldn't be
            // under the settings value
            let canDecrease = true;

            if (newState.talentTreeSettings.triggerValue === 'max') {
                if (newState.talents[action.id].currentPoints < 
                    newState.talents[action.id].maxPoints) { // Disable talents
                        triggers.forEach((current) => {
                            if (newState.talents[current + 'Canvas'].currentPoints > 
                            newState.talents[current + 'Canvas'].initPoints) canDecrease = false;
                            else newState.talents[current + 'Canvas'].disabled = true;
                        });
                    }
            } else {
                if (newState.talents[action.id].currentPoints === 
                newState.talents[action.id].initPoints) { // Disable talents
                    triggers.forEach((current) => {
                        if (newState.talents[current + 'Canvas'].currentPoints > 
                            newState.talents[current + 'Canvas'].initPoints) canDecrease = false;
                        else newState.talents[current + 'Canvas'].disabled = true;
                    });
                }
            }

            return canDecrease ? newState : state;
        case types.REMOVE_TALENT:
            newState = {...state};
            delete newState.talents[action.id];
            
            talents = Object.keys(newState.talents);
            talents.forEach((current) => {
                let i = newState.talents[current].triggers.indexOf(action.id.split('Canvas')[0]);
                if (i > -1) {
                    newState.talents[current].triggers.splice(i, 1);
                    if (newState.talents[current].triggers.length === 0)
                        newState.talents[current].triggersTalent = false;
                }
                
                if (newState.talents[current].triggerBy.has(action.id))
                    newState.talents[current].triggerBy.delete(action.id);
            });

            return newState;
        default:
            return state;
    }
}