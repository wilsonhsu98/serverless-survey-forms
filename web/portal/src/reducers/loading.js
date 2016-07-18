
import * as types from '../constants/ActionTypes';

export default function loading(state = false, action) {
    switch (action.type) {
    case types.SET_LOADING:
        return action.loading;
    default:
        return state;
    }
}
