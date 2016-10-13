
import fetch from 'isomorphic-fetch';
import moment from 'moment';

import * as types from '../constants/ActionTypes';
import Config from '../config';
import Mixins from '../mixins/global';
import { expiredToken } from './account';
import { getOneSurvey, postSurvey, receiveQuestionsFailure } from './questions';

export function requestSurveysFailure(err) {
    return (dispatch) => {
        dispatch(expiredToken());
        dispatch({
            type: types.RECIEVE_SURVEYS_FAILURE,
            errorMsg: err
        });
    };
}

export function receiveSurveysSuccess(data) {
    return {
        type: types.RECIEVE_SURVEYS_SUCCESS,
        surveys: data
    };
}

export function getSurveys() {
    return (dispatch, getState) => {
        dispatch({ type: types.REMOVE_SELECTED_SURVEYS });
        dispatch({ type: types.REQUEST_SURVEYS_LIST });
        const { account, selectedUser, token } = getState();
        // fetch selected user account or user's account
        const accountid = selectedUser.hasOwnProperty('accountid') ?
            selectedUser.accountid : account.accountid;

        return fetch(`${Config.baseURL}/api/v1/mgnt/surveys/${accountid}`, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                authorization: token
            }
        })
        .then(response => response.json())
        .then(data => {
            const surveys = data.surveys.sort((a, b) => {
                if (a.datetime < b.datetime) return 1;
                if (a.datetime > b.datetime) return -1;
                return 0;
            });
            dispatch(receiveSurveysSuccess(surveys));
        })
        .catch(err => dispatch(requestSurveysFailure(err)));
    };
}

export function toggleSelectedSurveys(data) {
    return (dispatch, getState) => {
        if (getState().selectedSurveys === data) {
            dispatch({
                type: types.REMOVE_SELECTED_SURVEYS
            });
        } else {
            dispatch({
                type: types.ADD_SELECTED_SURVEYS,
                selectedSurveys: data
            });
        }
    };
}

export function requestDeleteSurveysFailure(err) {
    return (dispatch) => {
        dispatch(expiredToken());
        dispatch({
            type: types.RECIEVE_DELETE_SURVEYS_FAILURE,
            errorMsg: err
        });
    };
}

export function receiveDeleteSurveysSuccess() {
    return {
        type: types.RECIEVE_DELETE_SURVEYS_SUCCESS
    };
}

export function deleteSurvey() {
    return (dispatch, getState) => {
        dispatch({ type: types.REQUEST_DELETE_SURVEYS });
        const { account, selectedUser, selectedSurveys, token } = getState();
        // delete selected user account or user's account
        const accountid = selectedUser.hasOwnProperty('accountid') ?
            selectedUser.accountid : account.accountid;
        return fetch(
            `${Config.baseURL}/api/v1/mgnt/surveys/${accountid}/${selectedSurveys}`, {
                method: 'DELETE',
                credentials: 'same-origin',
                headers: {
                    authorization: token
                }
            })
            .then(response => response.json())
            .then(() => {
                dispatch(receiveDeleteSurveysSuccess());
                dispatch(toggleSelectedSurveys(selectedSurveys));
                dispatch(getSurveys());
            })
            .catch(err => dispatch(requestDeleteSurveysFailure(err)));
    };
}

export function receiveReportSuccess() {
    return {
        type: types.RECIEVE_REPORT_SUCCESS
    };
}

export function receiveReportFailure(err) {
    return {
        type: types.RECIEVE_REPORT_FAILURE,
        errorMsg: err
    };
}

export function handleReportHeader(survey, privacy) {
    const header = ['Client ID'];
    survey.forEach((que) => {
        header.push(que.label);
        switch (que.type) {
        case 'checkbox':
            for (const opt of que.data) {
                header.push(opt.label);
                if (opt.hasOwnProperty('input')) {
                    header.push(opt.input);
                }
            }
            break;
        case 'radio':
            for (const opt of que.data) {
                if (opt.hasOwnProperty('input')) {
                    header.push(opt.input);
                    break;
                }
            }
            break;
        case 'rating':
            if (que.hasOwnProperty('input')) {
                header.push(que.input);
            }
            break;
        case 'text':
        case 'textarea':
        default:
        }
    });
    if (privacy) header.push('Privacy email');
    header.push('Feedback time');

    return [header];
}

export function handleReportContent(survey, privacy, feedbackAllData) {
    const content = [];
    for (const feed of feedbackAllData) {
        const data = feed.feedback;
        const body = [`${feed.clientid}${String.fromCharCode(8)}`];
        survey.forEach((que, idx) => {
            const num = idx + 1;
            const feedbackQue = data[`Q${num}`];
            if (feedbackQue) {
                let i = 0;
                const chk = [];
                switch (que.type) {
                case 'checkbox':
                    que.data.forEach((opt, optIdx) => {
                        chk.push(feedbackQue.data[optIdx].label);
                        if (opt.hasOwnProperty('input')) {
                            chk.push(feedbackQue.data[optIdx].input);
                        }
                        if (opt.label === feedbackQue.data[optIdx].label) i ++;
                    });
                    body.push(i.toString());
                    body.push(...chk);
                    break;
                case 'radio':
                    body.push(feedbackQue.data[0].label);
                    for (const opt of que.data) {
                        if (opt.hasOwnProperty('input')) {
                            body.push(feedbackQue.data[0].hasOwnProperty('input') ?
                                feedbackQue.data[0].input : '');
                            break;
                        }
                    }
                    break;
                case 'rating':
                    body.push(feedbackQue.data[0].label);
                    if (que.hasOwnProperty('input')) {
                        body.push(feedbackQue.data[0].hasOwnProperty('input') ?
                            feedbackQue.data[0].input : '');
                    }
                    break;
                case 'text':
                case 'textarea':
                    body.push(feedbackQue.data[0].input);
                    break;
                default:
                }
            } else {
                // if no feedback in this one question
                body.push('');
                switch (que.type) {
                case 'checkbox':
                    que.data.forEach((opt) => {
                        body.push('');
                        if (opt.hasOwnProperty('input')) {
                            body.push('');
                        }
                    });
                    break;
                case 'radio':
                    for (const opt of que.data) {
                        if (opt.hasOwnProperty('input')) {
                            body.push('');
                            break;
                        }
                    }
                    break;
                case 'rating':
                    if (que.hasOwnProperty('input')) {
                        body.push('');
                    }
                    break;
                case 'text':
                case 'textarea':
                default:
                }
            }
        });
        if (privacy) {
            body.push(
                data.hasOwnProperty('thankyou') ?
                data.thankyou.privacy.input :
                ''
            );
        }
        body.push(moment(feed.datetime).format('LLL'));

        content.push(body);
    }

    return content;
}

export function exportSurvey() {
    return (dispatch, getState) => {
        dispatch({ type: types.REQUEST_REPORT });
        const { account, selectedUser, selectedSurveys, token } = getState();
        // export selected user account or user's account
        const accountid = selectedUser.hasOwnProperty('accountid') ?
            selectedUser.accountid : account.accountid;
        return fetch(
            `${Config.baseURL}/api/v1/mgnt/report/${accountid}/${selectedSurveys}`, {
                method: 'GET',
                credentials: 'same-origin',
                headers: {
                    authorization: token
                }
            })
            .then(response => response.json())
            .then(report => {
                const survey = report.survey.content;
                const feedback = report.data;
                const privacy = report.survey.thankyou.privacy.hasOwnProperty('label');

                let allSurvey = [];
                survey.forEach((page) => {
                    allSurvey = [...allSurvey, ...page.question];
                });

                Mixins.exportCSV(
                    `[Qustom]${report.subject}_${moment(Date.now()).format('YYYYMMDDHHmmss')}`,
                    'v1',
                    handleReportHeader(allSurvey, privacy),
                    handleReportContent(allSurvey, privacy, feedback)
                );
                dispatch(receiveReportSuccess());
            })
            .catch(err => dispatch(receiveReportFailure(err)));
    };
}

export function postCopiedSurveySuccess() {
    return {
        type: types.POST_COPIEDSURVEY_SUCCESS
    };
}

export function postCopiedSurveyFailure(err) {
    return {
        type: types.POST_COPIEDSURVEY_FAILURE,
        errorMsg: err
    };
}

export function postCopiedSurvey(questions) {
    return (dispatch, getState) => {
        const { account, token } = getState();
        const postData = {
            subject: questions.subject,
            survey: questions.survey
        };

        return postSurvey(account.accountid, postData, token)
            .then(response => response.json())
            .then(data => {
                if (data.surveyid) {
                    dispatch(postCopiedSurveySuccess());
                    dispatch(getSurveys());
                } else {
                    dispatch(postCopiedSurveyFailure(data));
                }
            })
            .catch(err => dispatch(postCopiedSurveyFailure(err)));
    };
}

export function copySurvey() {
    return (dispatch, getState) => {
        dispatch({ type: types.REQUEST_COPY_SURVEY });
        const { account, selectedSurveys } = getState();

        return getOneSurvey(account.accountid, selectedSurveys)
            .then(response => response.json())
            .then(data => {
                if (data.surveyid) {
                    dispatch(postCopiedSurvey(data));
                } else {
                    dispatch(receiveQuestionsFailure(data));
                }
            })
            .catch(err => dispatch(receiveQuestionsFailure(err)));
    };
}

export function requestDeleteAllFeedbacksFailure(err) {
    return (dispatch) => {
        dispatch(expiredToken());
        dispatch({
            type: types.DELETE_ALLFEEDBACKS_FAILURE,
            errorMsg: err
        });
    };
}

export function receiveDeleteAllFeedbacksSuccess() {
    return {
        type: types.DELETE_ALLFEEDBACKS_SUCCESS
    };
}

export function deleteAllFeedbacks() {
    return (dispatch, getState) => {
        dispatch({ type: types.REQUEST_DELETE_ALLFEEDBACKS });
        const { selectedSurveys, token } = getState();
        return fetch(
            // `${Config.baseURL}/api/v1/mgnt/feedbacks/${selectedSurveys}`, {
            `${Config.baseURL}/api/v1/feedbacks/${selectedSurveys}`, {
                method: 'DELETE',
                credentials: 'same-origin',
                headers: {
                    authorization: token
                }
            })
            .then(response => response.json())
            .then(() => {
                dispatch(receiveDeleteAllFeedbacksSuccess());
                dispatch(toggleSelectedSurveys(selectedSurveys));
                dispatch(getSurveys());
            })
            .catch(err => dispatch(requestDeleteAllFeedbacksFailure(err)));
    };
}
