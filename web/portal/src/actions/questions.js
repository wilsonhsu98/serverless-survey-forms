
import * as types from '../constants/ActionTypes';

import fetch from 'isomorphic-fetch';
import Config from '../config';

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

export function addPage(page) {
    return {
        type: types.ADD_PAGE,
        page
    };
}

export function copyPage(page_id) {
    return {
        type: types.COPY_PAGE,
        page_id
    };
}

export function editPageTitle(page, description) {
    return {
        type: types.EDIT_PAGE_TITLE,
        page,
        description
    };
}

export function deletePage(page_id) {
    return {
        type: types.DELETE_PAGE,
        page_id
    };
}

export function exchangePage(order) {
    return {
        type: types.EXCHANGE_PAGE,
        order
    };
}

export function receiveQuestionsSuccess() {
    return {
        type: types.RECIEVE_QUESTIONS_SUCCESS
    };
}

export function receiveQuestionsFailure(err) {
    return {
        type: types.RECIEVE_QUESTIONS_FAILURE,
        errorMsg: err
    };
}

export function saveQuestion() {
    return (dispatch, getState) => {
        const { account, surveyID, subject, questions, token } = getState();
        const postData = {
            subject: subject,
            survey: [...questions]
        };

        return fetch(`${Config.baseURL}/mgnt/surveys/${account.accountid}/${surveyID}`, {
            method: 'PUT',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                // Authenticated: token
            },
            body: JSON.stringify(postData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.datetime) {
                dispatch(receiveQuestionsSuccess());
            } else {
                dispatch(receiveQuestionsFailure(data));
            }
        })
        .catch(err => dispatch(receiveQuestionsFailure(err.responseJSON)));
    };
}
