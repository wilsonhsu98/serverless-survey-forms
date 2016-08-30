
import fetch from 'isomorphic-fetch';

import * as types from '../constants/ActionTypes';
import Config from '../config';
import { expiredToken } from './account';

function requestUsersFailure(err) {
    return (dispatch) => {
        dispatch(expiredToken());
        dispatch({
            type: types.RECIEVE_USERS_FAILURE,
            errorMsg: err
        });
    };
}

function receiveUsersSuccess(data) {
    return {
        type: types.RECIEVE_USERS_SUCCESS,
        users: data
    };
}

export function getUsers() {
    return (dispatch, getState) => {
        dispatch({ type: types.REQUEST_USERS_LIST });
        const { token } = getState();
        return fetch(`${Config.baseURL}/api/v1/mgnt/users`, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                authorization: token
            }
        })
        .then(response => response.json())
        .then(data => {
            dispatch(receiveUsersSuccess(data.users));
        })
        .catch(err => dispatch(requestUsersFailure(err)));
    };
}
