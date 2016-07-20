
import * as types from '../constants/ActionTypes';

export default function questions(state = [], action) {
    switch (action.type) {
    case types.ADD_QUESTION:
    case types.EDIT_QUESTION:
    case types.COPY_QUESTION:
    case types.DELETE_QUESTION:
    case types.EXCHANGE_QUESTION:
    case types.COPY_PAGE:
    case types.EDIT_PAGE_TITLE:
    case types.DELETE_PAGE:
    case types.EXCHANGE_PAGE:
        return action.questions;

    case types.ADD_PAGE:
        return [
            ...state,
            action.page
        ];
    default:
        return state;
    }
}
