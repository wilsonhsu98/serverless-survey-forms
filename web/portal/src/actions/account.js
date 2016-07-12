
import * as types from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch';
import Config from '../config';

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
        return fetch(`${Config.baseURL}/mgnt/users`, {
            credentials: 'same-origin'
        })
        .then(response => response.json())
        .then(data => {
            dispatch(receiveAccountSuccess(data.users[0]));
            // TODOS:
            // dispatch(receiveAccountSuccess(data));
        })
        // TODOS: fetch http
        // .catch(data => {
        //     const temp = {
        //         accountid: 'facebook-10206181895733803',
        //         username: 'jonas cheng',
        //         email: 'jonas_cheng@trend.com.tw',
        //         role: 'Admin'
        //     };
        //     dispatch(receiveAccountSuccess(temp));
        // });
        .catch(err => dispatch(receiveAccountFailure(err)));
    };
}
