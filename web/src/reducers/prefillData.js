import * as types from '../constants/ActionTypes';

export default function prefilData(state = {}, action) {
    switch (action.type) {
    case types.SAVE_PREFILL_DATA:
        return Object.assign({}, state, action.data);
    default:
        return state;
    }
}
