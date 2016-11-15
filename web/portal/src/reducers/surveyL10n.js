
import * as types from '../constants/ActionTypes';

export default function surveyL10n(state = {}, action) {
    switch (action.type) {
    case types.SET_SURVEY_L10N:
        return action.surveyL10n;
    default:
        return state;
    }
}
