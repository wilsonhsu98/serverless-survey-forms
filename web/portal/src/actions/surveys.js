
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
        return fetch(`${Config.baseURL}/api/v1/mgnt/surveys/${account_id}/`, {
            headers: {
                Authenticated: token
            },
            credentials: 'same-origin'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            dispatch(receiveSurveysSuccess(data.surveys));
        })
        .catch(err => {
            dispatch(requestSurveysFailure(err.responseJSON));
        });
    };
}
