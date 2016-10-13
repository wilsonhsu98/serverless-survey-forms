
import * as types from '../constants/ActionTypes';

export function setEditQuestion(data) {
    // for update part of properties
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

export function updateEditQuestion(data) {
    // for replace all properties
    return {
        type: types.UPDATE_EDITQUESTION,
        editQuestion: data
    };
}

export function deleteRatingInput() {
    return (dispatch, getState) => {
        const data = Object.assign({}, getState().editQuestion);
        delete data.input;
        dispatch(updateEditQuestion(data));
    };
}
