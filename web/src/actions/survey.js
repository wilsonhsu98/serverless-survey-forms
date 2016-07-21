import * as types from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch';
import config from '../config';

function requestSurvey() {
    return {
        type: types.REQUEST_SURVEY
    };
}

function receiveSurveySuccess(data) {
    return {
        type: types.RECEIVE_SURVEY_SUCCESS,
        survey: data
    };
}

function receiveSurveyFailure(err) {
    return {
        type: types.RECEIVE_SURVEY_FAILURE,
        errorMsg: err
    };
}

export function fetchSurvey(accountid, surveyid) {
    return (dispatch) => {
        dispatch(requestSurvey());
        return fetch(`${config.baseURL}/api/v1/surveys/${accountid}/${surveyid}`, {
            credentials: 'same-origin'
        })
        .then((response) => {
            if (response.status >= 400) {
                throw new Error('Bad response from server');
            }
            return response.json();
        })
        .then(data => {
            if (data && data.survey) {
                dispatch(receiveSurveySuccess(data.survey));
            } else {
                dispatch(receiveSurveyFailure('Error'));
            }
        });
    };
}

export function surveyDone() {
    // TODO: postMessage to client
    // window.parent.postMessage(`Survey done: ${clientID}`,
    //    window.parent.location.origin);
    return {
        type: types.SURVEY_DONE
    };
}

export function goToPage(index) {
    return {
        type: types.GO_TO_PAGE,
        index
    };
}
