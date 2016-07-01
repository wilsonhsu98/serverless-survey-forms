
import * as types from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch';

function requestAccount() {
    return {
        type: types.REQUEST_ACCOUNT
    };
}

function receiveAccountSuccess(data) {
    return {
        type: types.RECIEVE_ACCOUNT_SUCCESS,
        account: data
    };
}

function receiveAccountFailure(err) {
    return {
        type: types.RECIEVE_ACCOUNT_FAILURE,
        errorMsg: err
    };
}

export function fetchAccount() {
    return (dispatch) => {
        dispatch(requestAccount());
        return fetch('https://r2c5wmub95.execute-api.ap-northeast-1.amazonaws.com/devjim', {
            credentials: 'same-origin'
        })
        .then(response => response.json())
        .then(data => {
            dispatch(receiveAccountSuccess(data));
        })
        // TODOS: fetch http
        .catch(data => {
            const temp = {
                accountid: 'facebook-10206181895733803',
                username: 'jonas cheng',
                email: 'jonas_cheng@trend.com.tw',
                role: 'Admin'
            };
            dispatch(receiveAccountSuccess(temp));
        });
        // .catch(err => dispatch(receiveAccountFailure(err)));
    };
}
