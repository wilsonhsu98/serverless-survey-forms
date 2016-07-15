
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

export function deleteQuestion(page, que_id) {
    return {
        type: types.DELETE_QUESTION,
        page,
        que_id
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

export function addPage(page) {
    return {
        type: types.ADD_PAGE,
        page
    };
}

export function exchangePage(bfIdx, afIdx) {
    return {
        type: types.EXCHANGE_PAGE,
        bfIdx,
        afIdx
    };
}

export function editPageTitle(id, data) {
    return {
        type: types.EDIT_PAGE_TITLE,
        id,
        data
    };
}

export function deletePage(page) {
    return {
        type: types.DELETE_PAGE,
        page
    };
}

export function deleteRatingInput(id) {
    return {
        type: types.DELETE_RATING_INPUT,
        id
    };
}
