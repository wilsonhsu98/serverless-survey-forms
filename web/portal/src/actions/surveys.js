
import * as types from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch';
import Config from '../config';

function requestSurveysFailure(err) {
    return {
        type: types.RECIEVE_SURVEYS_FAILURE,
        errorMsg: err
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
        const { account, token } = getState();
        return fetch(`${Config.baseURL}/api/v1/mgnt/surveys/${account.accountid}`, {
            // TODOS: wait back end
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
        .catch(err => requestSurveysFailure(err.responseJSON));
    };
}
