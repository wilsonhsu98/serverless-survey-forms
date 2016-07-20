
import * as types from '../constants/ActionTypes';
import * as values from '../constants/DefaultValues';

import fetch from 'isomorphic-fetch';
import Config from '../config';
import Mixins from '../mixins/global';

export function addQuestion(page, data) {
    return (dispatch, getState) => {
        const pageIdx = page - 1;
        let newQuestions = [...getState().questions];
        // if this page already existed, edit this page content
        // object and array need copy reference
        let pageData = Object.assign({}, newQuestions[pageIdx]);
        pageData.question = [...pageData.question];
        pageData.question.push(data);
        newQuestions[pageIdx] = pageData;

        dispatch({
            type: types.ADD_QUESTION,
            questions: newQuestions
        });
    };
}

export function editQuestion() {
    return (dispatch, getState) => {
        const { questions, editQuestion } = getState();
        let newQuestions = [];
        for (let obj of questions) {
            let newPages = Object.assign({}, obj);
            newPages.question = [];
            for (let que of obj.question) {
                let newItems = Object.assign({}, que);
                if (que.id === editQuestion.id) {
                    newItems = Object.assign(newItems, editQuestion);
                    if (!editQuestion.hasOwnProperty('input')) {
                        delete newItems.input;
                    }
                }
                newPages.question.push(newItems);
            }
            newQuestions.push(newPages);
        }

        dispatch({
            type: types.EDIT_QUESTION,
            questions: newQuestions
        });
    };
}

export function copyQuestion(page, que_id) {
    return (dispatch, getState) => {
        const { questions } = getState();
        const pageIdx = page - 1;
        let newQuestions = [...questions];
        const duplicateQue = Object.assign({}, newQuestions[pageIdx].question[que_id], { id: Mixins.generateQuestionID() });
        newQuestions[pageIdx] = Object.assign({}, questions[pageIdx]);
        newQuestions[pageIdx].question = [...questions[pageIdx].question];
        newQuestions[pageIdx].question.splice(que_id, 0, duplicateQue);

        dispatch({
            type: types.COPY_QUESTION,
            questions: newQuestions
        });
    };
}

export function deleteQuestion(page, que_id) {
    return (dispatch, getState) => {
        const { questions } = getState();
        const pageIdx = page - 1;
        let newQuestions = [...questions];
        newQuestions[pageIdx] = Object.assign({}, questions[pageIdx]);
        newQuestions[pageIdx].question = [...questions[pageIdx].question];
        newQuestions[pageIdx].question.splice(que_id, 1);

        dispatch({
            type: types.DELETE_QUESTION,
            questions: newQuestions
        });
    };
}

export function exchangeQuestion(bfPage, bfIdx, afPage, afIdx, data) {
    return (dispatch, getState) => {
        const { questions } = getState();
        let newQuestions = [];
        if (bfPage !== afPage) {
            for (let obj of questions) {
                let newPages = Object.assign({}, obj);
                newPages.question = [...obj.question];
                if (obj.page === bfPage) {
                    newPages.question.splice(bfIdx, 1);
                } else if (obj.page === afPage) {
                    newPages.question.splice(afIdx, 0, data);
                }
                newQuestions.push(newPages);
            }
        } else {
            for (let obj of questions) {
                let newPages = Object.assign({}, obj);
                newPages.question = [...obj.question];
                if (obj.page === afPage) {
                    newPages.question.splice(bfIdx, 1);
                    newPages.question.splice(afIdx, 0, data);
                }
                newQuestions.push(newPages);
            }
        }

        dispatch({
            type: types.EXCHANGE_QUESTION,
            questions: newQuestions
        });
    };
}

export function addPage(page) {
    const newPage = {
        page: page,
        description: values.PAGE_TITLE,
        question: []
    };

    return {
        type: types.ADD_PAGE,
        page: newPage
    };
}

export function copyPage(page_id) {
    return (dispatch, getState) => {
        let newQuestions = [...getState().questions];
        const originPage = newQuestions[page_id - 1];
        let duplicateQues = [];
        for (let que of originPage.question) {
            // regenerate question id
            duplicateQues.push(Object.assign({}, que, { id: Mixins.generateQuestionID() }));
        }
        newQuestions.splice(page_id, 0, Object.assign({}, originPage, { question: duplicateQues }));
        newQuestions.forEach((page, idx) => {
            page.page = idx + 1;
        });

        dispatch({
            type: types.COPY_PAGE,
            questions: newQuestions
        });
    };
}

export function editPageTitle() {
    return (dispatch, getState) => {
        const { page, description } = getState().editPage;
        const newQuestions = [...getState().questions];
        newQuestions[page - 1] = Object.assign({}, newQuestions[page - 1], { description: description });

        dispatch({
            type: types.EDIT_PAGE_TITLE,
            questions: newQuestions
        });
    };
}

export function deletePage(page_id) {
    return (dispatch, getState) => {
        const newQuestions = [...getState().questions];
        newQuestions.splice(page_id - 1, 1);
        newQuestions.forEach((page, idx) => {
            page.page = idx + 1;
        });

        dispatch({
            type: types.DELETE_PAGE,
            questions: newQuestions
        });
    };
}

export function exchangePage() {
    return (dispatch, getState) => {
        const { questions, orderPage } = getState();
        let newQuestions = [];
        orderPage.forEach((pageNum, idx) => {
            const page = Object.assign({}, questions[pageNum - 1]);
            page.page = idx + 1;
            newQuestions.push(page);
        });

        dispatch({
            type: types.EXCHANGE_PAGE,
            questions: newQuestions
        });
    };
}

function receiveQuestionsSuccess() {
    return {
        type: types.RECIEVE_QUESTIONS_SUCCESS
    };
}

function receiveQuestionsFailure(err) {
    console.log(err);
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
        .catch(err => receiveQuestionsFailure(err.responseJSON));
    };
}
