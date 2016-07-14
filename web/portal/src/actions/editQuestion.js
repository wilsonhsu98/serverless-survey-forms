
import * as types from '../constants/ActionTypes';

export function setEditQuestion(data) {
    return {
        type: types.SET_EDITQUESTION,
        editQuestion: data
    };
}

export function stopEditQuestion() {
    return {
        type: types.STOP_EDITQUESTION
    };
}

export function deleteRatingInput() {
    return {
        type: types.DELETE_RATING_INPUT
    };
}
