
import * as types from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch';
import Config from '../config';
import * as AccountActions from './account';

function setToken(token) {
    window.localStorage["QustomPortalTK"] = token;
    return {
        type: types.SET_TOKEN,
        token
    };
}

export function verifyToken(token) {
    return (dispatch) => {
        return fetch(`${Config.baseURL}/mgnt/users/verify`, {
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
            if (data.hasOwnProperty('accountid') && data.accountid) {
                dispatch(setToken(token));
                dispatch(AccountActions.receiveAccountSuccess(data));
            } else {
                // token no used: token expired / user doesn't have a account
                dispatch(AccountActions.receiveAccountFailure(data));
            }
        })
        .catch(err => AccountActions.receiveAccountFailure(err.responseJSON));
    };
}
