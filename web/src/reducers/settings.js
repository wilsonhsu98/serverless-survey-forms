import * as types from '../constants/ActionTypes';

export default function settings(state = {}, action) {
    switch (action.type) {
    case types.SET_SETTINGS:
        return Object.assign({}, state, action.settings);
    default:
        return state;
    }
}
