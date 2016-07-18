
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
            // headers: {
            //     Authenticated: token
            // },
            credentials: 'same-origin'
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
