
import * as types from '../constants/ActionTypes';
import * as values from '../constants/DefaultValues';

// import { push } from 'react-router-redux';
import fetch from 'isomorphic-fetch';
import deepClone from 'deep-clone';
import Config from '../config';
import Mixins from '../mixins/global';
import { setSubject } from './subject';
import { expiredToken } from './account';

export function setSurveyID(data) {
    return {
        type: types.SET_SURVEYID,
        surveyID: data
    };
}

export function finishEdit() {
    return (dispatch) => {
        dispatch(setSurveyID(''));
        dispatch(setSubject(''));
        dispatch({ type: types.INIT_QUESTIONS });
        dispatch({ type: types.INIT_SURVEY_POLICY });
        // TODOS: temporarily remove router
        // dispatch(push('/'));
    };
}

export function addQuestion(page) {
    return (dispatch, getState) => {
        const newQuestion = {
            id: Mixins.generateQuestionID(),
            type: 'radio',
            label: values.QUESTION_TITLE,
            data: [
                { value: Mixins.generateQuestionID(), label: values.OPTION_TITLE }
            ],
            required: true
        };
        const pageIdx = page - 1;
        const newQuestions = [...getState().questions];
        // if this page already existed, edit this page content
        // object and array need copy reference
        const pageData = Object.assign({}, newQuestions[pageIdx]);
        pageData.question = [...pageData.question];
        pageData.question.push(newQuestion);
        newQuestions[pageIdx] = pageData;

        dispatch({
            type: types.ADD_QUESTION,
            questions: newQuestions
        });
    };
}

export function updateQuestionItem() {
    return (dispatch, getState) => {
        const { questions, editQuestion } = getState();
        const newQuestions = [];
        for (const obj of questions) {
            const newPages = Object.assign({}, obj);
            newPages.question = [];
            for (const que of obj.question) {
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

export function copyQuestion(page, queId) {
    return (dispatch, getState) => {
        const { questions } = getState();
        const pageIdx = page - 1;
        const newQuestions = deepClone(questions);
        const duplicateQue = deepClone(newQuestions[pageIdx].question[queId]);
        // regenerate question id
        Object.assign(duplicateQue, { id: Mixins.generateQuestionID() });
        duplicateQue.data.forEach((item) => {
            // regenerate options id
            Object.assign(item, { value: Mixins.generateQuestionID() });
        });
        newQuestions[pageIdx].question.splice(queId + 1, 0, duplicateQue);
        dispatch({
            type: types.COPY_QUESTION,
            questions: newQuestions
        });
    };
}

export function deleteQuestion(page, queId) {
    return (dispatch, getState) => {
        const { questions } = getState();
        const pageIdx = page - 1;
        const newQuestions = [...questions];
        newQuestions[pageIdx] = Object.assign({}, questions[pageIdx]);
        newQuestions[pageIdx].question = [...questions[pageIdx].question];
        newQuestions[pageIdx].question.splice(queId, 1);

        dispatch({
            type: types.DELETE_QUESTION,
            questions: newQuestions
        });
    };
}

export function exchangeQuestion(bfPage, bfIdx, afPage, afIdx, data) {
    return (dispatch, getState) => {
        const { questions } = getState();
        const newQuestions = [];
        if (bfPage !== afPage) {
            for (const obj of questions) {
                const newPages = Object.assign({}, obj);
                newPages.question = [...obj.question];
                if (obj.page === bfPage) {
                    newPages.question.splice(bfIdx, 1);
                } else if (obj.page === afPage) {
                    newPages.question.splice(afIdx, 0, data);
                }
                newQuestions.push(newPages);
            }
        } else {
            for (const obj of questions) {
                const newPages = Object.assign({}, obj);
                newPages.question = [...obj.question];
                if (obj.page === afPage) {
                    newPages.question.splice(bfIdx, 1);
                    if (bfIdx < afIdx) {
                        // subtract itself
                        newPages.question.splice(afIdx - 1, 0, data);
                    } else {
                        newPages.question.splice(afIdx, 0, data);
                    }
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

export function copyPage(pageId) {
    return (dispatch, getState) => {
        const newQuestions = deepClone(getState().questions);
        const newPage = deepClone(newQuestions[pageId - 1]);
        newPage.question.forEach((que) => {
            // regenerate question id
            Object.assign(que, { id: Mixins.generateQuestionID() });
            que.data.forEach((item) => {
                // regenerate options id
                Object.assign(item, { value: Mixins.generateQuestionID() });
            });
        });
        newQuestions.splice(pageId, 0, newPage);
        newQuestions.forEach((page, idx) => {
            Object.assign(page, { page: idx + 1 });
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
        newQuestions[page - 1] = Object.assign({}, newQuestions[page - 1],
            { description: description });

        dispatch({
            type: types.EDIT_PAGE_TITLE,
            questions: newQuestions
        });
    };
}

export function deletePage(pageId) {
    return (dispatch, getState) => {
        const newQuestions = [...getState().questions];
        newQuestions.splice(pageId - 1, 1);
        newQuestions.forEach((page, idx) => {
            Object.assign(page, { page: idx + 1 });
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
        const newQuestions = [];
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

function saveQuestionsSuccess() {
    return {
        type: types.SAVE_QUESTIONS_SUCCESS
    };
}

function saveQuestionsFailure(err) {
    return (dispatch) => {
        dispatch(expiredToken());
        dispatch({
            type: types.SAVE_QUESTIONS_FAILURE,
            errorMsg: err
        });
    };
}

export function saveQuestion() {
    return (dispatch, getState) => {
        dispatch({ type: types.REQUEST_SAVE_QUESTION });
        const { account, surveyID, subject, questions, surveyPolicy, token } = getState();
        const genQuestions = deepClone(questions);
        // generate order number
        let idx = 0;
        for (const page of genQuestions) {
            if (page.description === '') Object.assign(page, { description: values.PAGE_TITLE });
            for (const que of page.question) {
                idx ++;
                if (que.label === '') Object.assign(que, { label: values.QUESTION_TITLE });
                if (que.hasOwnProperty('input') && que.input === '') {
                    Object.assign(que, { input: values.PLACEHOLDER_TITLE });
                }
                Object.assign(que, { order: idx });
                for (const opt of que.data) {
                    if (opt.label === '') Object.assign(opt, { label: values.OPTION_TITLE });
                    if (opt.hasOwnProperty('input') && opt.input === '') {
                        Object.assign(opt, { input: values.PLACEHOLDER_TITLE });
                    }
                }
            }
        }
        const postData = {
            subject: subject,
            survey: { format: Config.surveyFormat, content: genQuestions, thankyou: surveyPolicy }
        };

        return fetch(`${Config.baseURL}/api/v1/mgnt/surveys/${account.accountid}/${surveyID}`, {
            method: 'PUT',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                authorization: token
            },
            body: JSON.stringify(postData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.datetime) {
                dispatch({
                    type: types.UPDATE_QUESTIONS,
                    questions: genQuestions
                });
                dispatch(saveQuestionsSuccess());
            } else {
                dispatch(saveQuestionsFailure(data));
            }
        })
        .catch(err => dispatch(saveQuestionsFailure(err)));
    };
}

function setSurveyPolicy(data) {
    return {
        type: types.SET_SURVEY_POLICY,
        surveyPolicy: data
    };
}

export function editSurveyPolicy(flag) {
    const data = Object.assign({},
        {
            description: 'Thanks for sharing your feedback with Trend Micro.',
            privacy: {}
        });

    if (flag) {
        const label = 'If Trend Micro has a follow-up survey on the Email Scan,'
            + ' would you like to participate?';
        const privacy = {
            label: label,
            terms: 'Yes, Trend Micro can reach me at this address: ',
            input: 'Please enter your email address.'
        };
        data.privacy = privacy;
    }

    return (dispatch) => {
        dispatch(setSurveyPolicy(data));
        dispatch(saveQuestion());
    };
}

function receiveQuestionsSuccess(data) {
    return {
        type: types.RECIEVE_QUESTIONS_SUCCESS,
        questions: data
    };
}

function receiveQuestionsFailure(err) {
    return (dispatch) => {
        dispatch(expiredToken());
        dispatch({
            type: types.RECIEVE_QUESTIONS_FAILURE,
            errorMsg: err
        });
    };
}

export function getQuestion(surveyID) {
    return (dispatch, getState) => {
        dispatch({ type: types.REQUEST_GET_QUESTION });
        const { account } = getState();
        return fetch(`${Config.baseURL}/api/v1/surveys/${account.accountid}/${surveyID}`, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Cache-Control': 'max-age=0'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.surveyid) {
                dispatch(setSubject(data.subject));
                dispatch(setSurveyPolicy(data.survey.thankyou));
                dispatch(receiveQuestionsSuccess(data.survey.content));
                dispatch(setSurveyID(data.surveyid));
                // TODOS: temporarily remove router
                // dispatch(push('/create'));
            } else {
                dispatch(receiveQuestionsFailure(data));
            }
        })
        .catch(err => dispatch(receiveQuestionsFailure(err)));
    };
}

export function setDropQuestion(dropQuestion) {
    return {
        type: types.SET_DROP_QUESTION,
        dropQuestion
    };
}

export function stopDropQuestion() {
    return {
        type: types.STOP_DROP_QUESTION
    };
}
