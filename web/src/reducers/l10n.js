import * as types from '../constants/ActionTypes';

export default function l10n(state = {}, action) {
    switch (action.type) {
    case types.SET_SURVEY_L10N:
        return action.l10n;
    default:
        return state;
    }
}
