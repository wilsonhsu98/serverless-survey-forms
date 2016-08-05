
import * as types from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch';
import Config from '../config';
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
