
import * as types from '../constants/ActionTypes';

export default function surveyID(state = '', action) {
    switch (action.type) {
    case types.SET_SURVEYID:
        return action.surveyID;
    default:
        return state;
    }
}
