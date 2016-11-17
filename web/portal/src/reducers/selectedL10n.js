
import * as types from '../constants/ActionTypes';

export default function selectedL10n(state = '', action) {
    switch (action.type) {
    case types.ADD_SELECTED_L10N:
        return action.selectedL10n;
    case types.REMOVE_SELECTED_L10N:
        return '';
    default:
        return state;
    }
}
