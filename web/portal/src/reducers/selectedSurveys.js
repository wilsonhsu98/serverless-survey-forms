
import * as types from '../constants/ActionTypes';

export default function selectedSurveys(state = '', action) {
    switch (action.type) {
    case types.ADD_SELECTED_SURVEYS:
        return action.selectedSurveys;
    case types.REMOVE_SELECTED_SURVEYS:
        return '';
    default:
        return state;
    }
}
