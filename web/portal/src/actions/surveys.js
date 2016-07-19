
import * as types from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch';
import Config from '../config';

export function requestSurveysFailure(err) {
    return {
        type: types.RECIEVE_SURVEYS_FAILURE,
        errorMsg: err
    };
}

export function receiveSurveysSuccess(data) {
    return {
        type: types.RECIEVE_SURVEYS_SUCCESS,
        surveys: data
    };
}

export function getSurveys(account_id, token) {
    return (dispatch) => {
        return fetch(`${Config.baseURL}/mgnt/surveys/${account_id}/`, {
            // TODOS: wait back end
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                // Authenticated: token
            }
        })
        .then(response => response.json())
        .then(data => {
            dispatch(receiveSurveysSuccess(data.surveys));
        })
        .catch(err => {
            dispatch(requestSurveysFailure(err.responseJSON));
        });
    };
}
