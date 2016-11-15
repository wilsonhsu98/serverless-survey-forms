
import * as types from '../constants/ActionTypes';

export default function surveyVersion(state = '', action) {
    switch (action.type) {
    case types.SET_SURVEY_VERSION:
        return action.surveyVersion;
    default:
        return state;
    }
}
