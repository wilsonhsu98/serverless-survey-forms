
import * as types from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch';
import Config from '../config';

export function receiveAccountSuccess(data) {
    return {
        type: types.RECIEVE_ACCOUNT_SUCCESS,
        account: data
    };
}

function receiveAccountFailure(err) {
    console.log(err);
}

function setToken(token) {
    window.localStorage.QustomPortalTK = token;
    return {
        type: types.SET_TOKEN,
        token
    };
}

export function verifyToken(token) {
    return (dispatch) =>
        fetch(`${Config.baseURL}/api/v1/mgnt/users/`, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: token
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.hasOwnProperty('accountid') && data.accountid) {
                dispatch(setToken(token));
                dispatch(receiveAccountSuccess(data));
            } else {
                // token no used: token expired / user doesn't have a account
                dispatch(receiveAccountFailure(data));
            }
        })
        .catch(err => receiveAccountFailure(err.responseJSON));
}
