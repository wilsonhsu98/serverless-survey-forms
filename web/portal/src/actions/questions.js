
/* eslint new-cap: ["error", { "capIsNew": false, "properties": true }] */

import * as types from '../constants/ActionTypes';
import * as values from '../constants/DefaultValues';

// import { push } from 'react-router-redux';
import fetch from 'isomorphic-fetch';
import Immutable from 'immutable';

import Config from '../config';
import Mixins from '../mixins/global';
import { setSubject } from './subject';
import { expiredToken } from './account';
import { setWebpage } from './webpage';

export function postSurvey(accountid, postData, token) {
    return fetch(`${Config.baseURL}/api/v1/mgnt/surveys/${accountid}`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            authorization: token
        },
        body: JSON.stringify(postData)
    });
}

export function getOneSurvey(accountid, surveyID) {
    return fetch(`${Config.baseURL}/api/v1/surveys/${accountid}/${surveyID}`, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Cache-Control': 'max-age=0'
        }
    });
}

export function setSurveyID(data) {
    return {
        type: types.SET_SURVEYID,
        surveyID: data
    };
}

export function setQuestionEditable(flag) {
    if (flag) {
        return {
            type: types.SET_EDITABLE
        };
    }
    return {
        type: types.SET_NOT_EDITABLE
    };
}

export function finishEdit() {
    return (dispatch, getState) => {
        const { selectedUser } = getState();
        dispatch(setSurveyID(''));
        dispatch(setSubject(''));
        dispatch(setQuestionEditable(true));
        dispatch({ type: types.INIT_QUESTIONS });
        dispatch({ type: types.INIT_SURVEY_POLICY });
        // TODOS: temporarily remove router
        // dispatch(push('/'));
        if (selectedUser.hasOwnProperty('accountid')) {
            dispatch(setWebpage('userSurvey'));
        } else {
            dispatch(setWebpage('index'));
        }
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
        // Use immutable to generate immutable objects and arrays
        const originQuestions = Immutable.fromJS(getState().questions);
        const newQuestions = originQuestions.updateIn(
            [pageIdx, 'question'],
            quelist => quelist.push(newQuestion)
        );

        dispatch({
            type: types.ADD_QUESTION,
            questions: newQuestions.toJS()
        });
    };
}

export function updateQuestionItem() {
    return (dispatch, getState) => {
        const { questions, editQuestion } = getState();
        const originQuestions = Immutable.fromJS(questions);
        let newQuestions;
        let flag = false;
        originQuestions.find((page, pageIdx) => {
            page.get('question').find((quelist, quelistIdx) => {
                flag = quelist.get('id').includes(editQuestion.id);
                if (flag) {
                    // update question
                    newQuestions = originQuestions.updateIn(
                        [pageIdx, 'question', quelistIdx],
                        () => editQuestion
                    );
                }
                return flag;
            });
            return flag;
        });

        dispatch({
            type: types.EDIT_QUESTION,
            questions: newQuestions.toJS()
        });
    };
}

export function copyQuestion(page, queId) {
    return (dispatch, getState) => {
        const { questions } = getState();
        const pageIdx = page - 1;
        const originQuestions = Immutable.fromJS(questions);
        let newQuestion = originQuestions.getIn([pageIdx, 'question', queId]);
        newQuestion.get('data').forEach((optlist, optlistIdx) => {
            // regenerate options id
            newQuestion = newQuestion.updateIn(
                ['data', optlistIdx, 'value'],
                () => Mixins.generateQuestionID()
            );
        });
        const newQuestions = originQuestions.updateIn(
            [pageIdx, 'question'],
            // regenerate question id
            quelist => quelist.push(newQuestion.set('id', Mixins.generateQuestionID()))
        );

        dispatch({
            type: types.COPY_QUESTION,
            questions: newQuestions.toJS()
        });
    };
}

export function deleteQuestion(page, queId) {
    return (dispatch, getState) => {
        const { questions } = getState();
        const pageIdx = page - 1;
        const originQuestions = Immutable.fromJS(questions);
        const newQuestions = originQuestions.deleteIn([pageIdx, 'question', queId]);
        dispatch({
            type: types.DELETE_QUESTION,
            questions: newQuestions.toJS()
        });
    };
}

export function exchangeQuestion(bfPage, bfIdx, afPage, afIdx, data) {
    return (dispatch, getState) => {
        const { questions } = getState();
        const originQuestions = Immutable.fromJS(questions);
        let newQuestions = originQuestions.deleteIn([bfPage - 1, 'question', bfIdx]);
        const len = newQuestions.getIn([afPage - 1, 'question']).size;
        // subtract itself
        const afterIndex = (bfPage === afPage && bfIdx < afIdx) ? afIdx - 1 : afIdx;

        newQuestions = newQuestions.updateIn(
            [afPage - 1, 'question'],
            quelist => {
                if (afterIndex < len) {
                    return quelist.insert(afterIndex, data);
                }
                return quelist.push(data);
            });

        dispatch({
            type: types.EXCHANGE_QUESTION,
            questions: newQuestions.toJS()
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
        const originQuestions = Immutable.fromJS(getState().questions);
        let newPage = originQuestions.get(pageId - 1);
        newPage.get('question').forEach((que, queIdx) => {
            newPage = newPage.updateIn(
                ['question', queIdx, 'id'],
                () => Mixins.generateQuestionID()
            );
            que.get('data').forEach((optlist, optlistIdx) => {
                // regenerate options id
                newPage = newPage.updateIn(
                    ['question', queIdx, 'data', optlistIdx, 'value'],
                    () => Mixins.generateQuestionID()
                );
            });
        });
        let newQuestions = originQuestions.push(newPage);
        newQuestions.map((page, pageIdx) => {
            newQuestions = newQuestions.setIn([pageIdx, 'page'], pageIdx + 1);
        });
        dispatch({
            type: types.COPY_PAGE,
            questions: newQuestions.toJS()
        });
    };
}

export function editPageTitle() {
    return (dispatch, getState) => {
        const { page, description } = getState().editPage;
        let newQuestions = Immutable.fromJS(getState().questions);
        newQuestions = newQuestions.setIn([page - 1, 'description'], description);

        dispatch({
            type: types.EDIT_PAGE_TITLE,
            questions: newQuestions.toJS()
        });
    };
}

export function deletePage(pageId) {
    return (dispatch, getState) => {
        let newQuestions = Immutable.fromJS(getState().questions);
        newQuestions = newQuestions.delete(pageId - 1);
        newQuestions.map((page, pageIdx) => {
            newQuestions = newQuestions.setIn([pageIdx, 'page'], pageIdx + 1);
        });

        dispatch({
            type: types.DELETE_PAGE,
            questions: newQuestions.toJS()
        });
    };
}

export function exchangePage() {
    return (dispatch, getState) => {
        const { questions, orderPage } = getState();
        const newQuestions = [];
        orderPage.forEach((pageNum, idx) => {
            newQuestions.push(
                Object.assign({}, questions[pageNum - 1], { page: idx + 1 })
            );
        });

        dispatch({
            type: types.EXCHANGE_PAGE,
            questions: newQuestions
        });
    };
}

export function saveQuestionsSuccess() {
    return {
        type: types.SAVE_QUESTIONS_SUCCESS
    };
}

export function saveQuestionsFailure(err) {
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
        const { account, surveyID, subject, questions,
            surveyPolicy, selectedUser, token } = getState();
        // save question by selected user account or user's account
        const accountid = selectedUser.hasOwnProperty('accountid') ?
            selectedUser.accountid : account.accountid;
        let genQuestions = Immutable.fromJS(questions);
        // generate order number
        let idx = 0;
        genQuestions.forEach((page, pageIdx) => {
            if (page.get('description') === '') {
                genQuestions = genQuestions.setIn([pageIdx, 'description'], values.PAGE_TITLE);
            }
            page.get('question').forEach((que, queIdx) => {
                idx ++;
                if (que.get('label') === '') {
                    genQuestions = genQuestions.setIn(
                        [pageIdx, 'question', queIdx, 'label'],
                        values.QUESTION_TITLE);
                }
                if (que.has('input') && que.get('input') === '') {
                    genQuestions = genQuestions.setIn(
                        [pageIdx, 'question', queIdx, 'input'],
                        values.PLACEHOLDER_TITLE);
                }
                genQuestions = genQuestions.setIn([pageIdx, 'question', queIdx, 'order'], idx);
                if (que.has('data')) {
                    que.get('data').forEach((opt, optIdx) => {
                        if (opt.get('label') === '') {
                            genQuestions = genQuestions.setIn(
                                [pageIdx, 'question', queIdx, 'data', optIdx, 'label'],
                                values.OPTION_TITLE);
                        }
                        if (opt.has('input') && opt.get('input') === '') {
                            genQuestions = genQuestions.setIn(
                                [pageIdx, 'question', queIdx, 'data', optIdx, 'input'],
                                values.PLACEHOLDER_TITLE);
                        }
                    });
                }
            });
        });
        dispatch({
            type: types.UPDATE_QUESTIONS,
            questions: genQuestions.toJS()
        });
        const postData = {
            subject: subject,
            survey: {
                format: Config.surveyFormat,
                content: genQuestions.toJS(),
                thankyou: surveyPolicy }
        };

        return fetch(`${Config.baseURL}/api/v1/mgnt/surveys/${accountid}/${surveyID}`, {
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
                dispatch(saveQuestionsSuccess());
            } else {
                dispatch(saveQuestionsFailure(data));
            }
        })
        .catch(err => dispatch(saveQuestionsFailure(err)));
    };
}

export function setSurveyPolicy(data) {
    return {
        type: types.SET_SURVEY_POLICY,
        surveyPolicy: data
    };
}

export function editSurveyPolicy(flag) {
    const data = {
        description: 'Thanks for sharing your feedback with Trend Micro.',
        privacy: {}
    };

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

export function receiveQuestionsSuccess(data) {
    return {
        type: types.RECIEVE_QUESTIONS_SUCCESS,
        questions: data
    };
}

export function receiveQuestionsFailure(err) {
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
        const { account, selectedUser } = getState();
        // get question by selected user account or user's account
        const accountid = selectedUser.hasOwnProperty('accountid') ?
            selectedUser.accountid : account.accountid;
        return getOneSurvey(accountid, surveyID)
            .then(response => response.json())
            .then(data => {
                if (data.surveyid) {
                    dispatch(setSubject(data.subject));
                    dispatch(setSurveyPolicy(data.survey.thankyou));
                    dispatch(receiveQuestionsSuccess(data.survey.content));
                    dispatch(setSurveyID(data.surveyid));
                    // TODOS: temporarily remove router
                    // dispatch(push('/create'));
                    if (selectedUser.hasOwnProperty('accountid')) {
                        dispatch(setWebpage('create'));
                    } else {
                        dispatch(setWebpage('userCreate'));
                    }
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
