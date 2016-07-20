
import * as types from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch';
import Config from '../config';

function requestSurveysFailure(err) {
    console.log(err);
}

function receiveSurveysSuccess(data) {
    return {
        type: types.RECIEVE_SURVEYS_SUCCESS,
        surveys: data
    };
}

export function getSurveys() {
    return (dispatch, getState) => {
        const { account, token } = getState();
        return fetch(`${Config.baseURL}/mgnt/surveys/${account.accountid}/`, {
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
        .catch(err => requestSurveysFailure(err.responseJSON));
    };
}
