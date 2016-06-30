
import * as types from '../constants/ActionTypes';

export default function loading(state = true, action) {
    switch (action.type) {
    case types.SET_LOADING:
        return action.loading;
    // case types.REQUEST_SURVEY:
    //     return true;
    // case types.RECEIVE_SURVEY_SUCCESS:
    // case types.RECEIVE_SURVEY_FAILURE:
    //     return false;
    default:
        return state;
    }
}
