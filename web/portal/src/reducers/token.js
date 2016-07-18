
import * as types from '../constants/ActionTypes';

export default function token(state = '', action) {
    switch (action.type) {
    case types.SET_TOKEN:
        window.localStorage["QustomPortalTK"] = action.token;
        return action.token;
    default:
        return state;
    }
}
