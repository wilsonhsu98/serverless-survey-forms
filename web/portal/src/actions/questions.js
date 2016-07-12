
import * as types from '../constants/ActionTypes';

export function addQuestion(page, data) {
    return {
        type: types.ADD_QUESTION,
        page,
        questions: data
    };
}

export function editQuestion(id, data) {
    return {
        type: types.EDIT_QUESTION,
        id,
        questions: data
    };
}

export function exchangeQuestion(afPage, afIdx, bfPage, bfIdx, data) {
    return {
        type: types.EXCHANGE_QUESTION,
        afPage,
        afIdx,
        bfPage,
        bfIdx,
        questions: data
    };
}
