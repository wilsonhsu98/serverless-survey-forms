
import * as types from '../constants/ActionTypes';

export function addQuestion(page, data) {
    return {
        type: types.ADD_QUESTION,
        page,
        questions: data
    };
}

export function editQuestion(que_id, data) {
    return {
        type: types.EDIT_QUESTION,
        que_id,
        questions: data
    };
}

export function copyQuestion(page, que_id) {
    return {
        type: types.COPY_QUESTION,
        page,
        que_id
    };
}

export function deleteQuestion(page, que_id) {
    return {
        type: types.DELETE_QUESTION,
        page,
        que_id
    };
}

export function exchangeQuestion(bfPage, bfIdx, afPage, afIdx, data) {
    return {
        type: types.EXCHANGE_QUESTION,
        afPage,
        afIdx,
        bfPage,
        bfIdx,
        questions: data
    };
}

export function deleteRatingInput(que_id) {
    return {
        type: types.DELETE_RATING_INPUT,
        que_id
    };
}

export function addPage(page) {
    return {
        type: types.ADD_PAGE,
        page
    };
}

export function editPageTitle(page_id, data) {
    return {
        type: types.EDIT_PAGE_TITLE,
        page_id,
        data
    };
}

export function deletePage(page_id) {
    return {
        type: types.DELETE_PAGE,
        page_id
    };
}

export function exchangePage(bfIdx, afIdx) {
    return {
        type: types.EXCHANGE_PAGE,
        bfIdx,
        afIdx
    };
}
