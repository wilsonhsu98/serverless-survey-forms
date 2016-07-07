
import * as types from '../constants/ActionTypes';

export default function questions(state = [], action) {
    switch (action.type) {
    case types.ADD_QUESTION:
        return [
            ...state,
            action.questions
        ]
    default:
        return state;
    }
}
