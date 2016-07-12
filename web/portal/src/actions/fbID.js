
import * as types from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch';
import { fetchAccount } from './account';
import { setLoading } from './loading';
import Config from '../config';
import { push } from 'react-router-redux';

function receiveFBIDSuccess(data) {
    return {
        type: types.RECIEVE_FBID_SUCCESS,
        fbID: data
    };
}

function receiveFBIDFailure(err) {
    return {
        type: types.RECIEVE_FBID_FAILURE,
        errorMsg: err
    };
}

export function fetchFBID() {
    return (dispatch) =>
        fetch(`${Config.baseURL}/mgnt/users`, {
            credentials: 'same-origin'
        })
        .then(response => response.json())
        .then(data => {
            const temp = '10206181895733803';
            dispatch(receiveFBIDSuccess(temp));
            // dispatch(receiveFBIDSuccess(data));
        })
        // TODOS: fetch FBID
        .catch(data => {
            const temp = '10206181895733803';
            dispatch(receiveFBIDSuccess(temp));
        });
        // .catch(err => dispatch(receiveFBIDFailure(err)));
}


function setFBID(data) {
    return {
        type: types.SET_FBID,
        fbID: data
    };
}

export function getFBToAccount(data) {
    return (dispatch) => {
        dispatch(setFBID(data));
        return dispatch(fetchAccount()).then(() => {
            dispatch(push('/list'));
            dispatch(setLoading(false));
        });
    };
}
