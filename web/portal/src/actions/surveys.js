
import fetch from 'isomorphic-fetch';
import moment from 'moment';

import * as types from '../constants/ActionTypes';
import Config from '../config';
import Mixins from '../mixins/global';
import { expiredToken } from './account';

function requestSurveysFailure(err) {
    return (dispatch) => {
        dispatch(expiredToken());
        dispatch({
            type: types.RECIEVE_SURVEYS_FAILURE,
            errorMsg: err
        });
    };
}

function receiveSurveysSuccess(data) {
    return {
        type: types.RECIEVE_SURVEYS_SUCCESS,
        surveys: data
    };
}

export function getSurveys() {
    return (dispatch, getState) => {
        dispatch({ type: types.REQUEST_SURVEYS_LIST });
        const { account, token } = getState();
        return fetch(`${Config.baseURL}/api/v1/mgnt/surveys/${account.accountid}`, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                authorization: token
            }
        })
        .then(response => response.json())
        .then(data => {
            dispatch(receiveSurveysSuccess(data.surveys));
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

function requestDeleteSurveysFailure(err) {
    return (dispatch) => {
        dispatch(expiredToken());
        dispatch({
            type: types.RECIEVE_DELETE_SURVEYS_FAILURE,
            errorMsg: err
        });
    };
}

function receiveDeleteSurveysSuccess() {
    return {
        type: types.RECIEVE_DELETE_SURVEYS_SUCCESS
    };
}

export function deleteSurvey() {
    return (dispatch, getState) => {
        dispatch({ type: types.REQUEST_DELET_SURVEYS });
        const { account, selectedSurveys, token } = getState();
        return fetch(
            `${Config.baseURL}/api/v1/mgnt/surveys/${account.accountid}/${selectedSurveys}`, {
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

function receiveReportSuccess() {
    return {
        type: types.RECIEVE_REPORT_SUCCESS
    };
}

function receiveReportFailure(err) {
    return {
        type: types.RECIEVE_REPORT_FAILURE,
        errorMsg: err
    };
}

function handleReportHeader(survey, privacy) {
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
        default:
        }
    });
    if (privacy) header.push('Privacy email');
    header.push('Feedback time');

    return [header];
}

function handleReportContent(survey, privacy, feedbackAllData) {
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
                default:
                }
            } else {
                // if no feedback in this one question
                body.push('');
                switch (que.type) {
                case 'checkbox':
                    que.data.forEach((opt) => {
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
                default:
                }
            }
        });
        if (privacy) body.push(feed.thankyou.privacy.input);
        body.push(moment(feed.datetime).format('LLL'));

        content.push(body);
    }

    return content;
}

export function exportSurvey() {
    return (dispatch, getState) => {
        dispatch({ type: types.REQUEST_REPORT });
        const { account, selectedSurveys, token } = getState();
        return fetch(
            `${Config.baseURL}/api/v1/mgnt/report/${account.accountid}/${selectedSurveys}`, {
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
