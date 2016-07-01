
import * as types from '../constants/ActionTypes';

export default function loading(state = true, action) {
    switch (action.type) {
    case types.SET_LOADING:
        return action.loading;
    case types.REQUEST_ACCOUNT:
        return true;
    default:
        return state;
    }
}
