
import fetch from 'isomorphic-fetch';

import * as types from '../constants/ActionTypes';
import Config from '../config';
import { expiredToken } from './account';

export function receiveSubscribersFailure(err) {
    return (dispatch) => {
        dispatch(expiredToken());
        dispatch({
            type: types.RECEIVE_SUBSCRIBERS_FAILURE,
            errorMsg: err
        });
    };
}

export function receiveSubscribersSuccess(data) {
    return {
        type: types.RECEIVE_SUBSCRIBERS_SUCCESS,
        subscribers: data
    };
}

export function getSubscribers() {
    return (dispatch, getState) => {
        dispatch({ type: types.REQUEST_SUBSCRIBERS_LIST });
        const { token, surveyID } = getState();
        return fetch(`${Config.baseURL}/api/v1/mgnt/subscribers/${surveyID}`, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                authorization: token
            }
        })
        .then(response => {
            if (response.status >= 400) {
                return {};
            }
            return response.json();
        })
        .then(data => {
            if (data.hasOwnProperty('email')) {
                dispatch(receiveSubscribersSuccess(data.email));
            } else {
                dispatch(receiveSubscribersSuccess([]));
            }
        })
        .catch(err => dispatch(receiveSubscribersFailure(err)));
    };
}
