
import * as types from '../constants/ActionTypes';

export default function surveys(state = [], action) {
    switch (action.type) {
    case types.RECIEVE_SURVEYS_SUCCESS:
        return [...action.surveys];
    default:
        return state;
    }
}
