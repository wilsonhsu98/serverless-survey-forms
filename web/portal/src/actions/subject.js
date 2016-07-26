
import * as types from '../constants/ActionTypes';

import { push } from 'react-router-redux';
import fetch from 'isomorphic-fetch';
import Config from '../config';
import { openEdit } from './editSubject';
import { setSuveyID } from './surveyID';
import { saveQuestion } from './questions';

function setSubject(data) {
    return {
        type: types.SET_SUBJECT,
        subject: data
    };
}

function setSubjectError(err) {
    return {
        type: types.SET_SUBJECT_FAILURE,
        errorMsg: err
    };
}

export function saveSubject(subject) {
    return (dispatch, getState) => {
        const { account, token } = getState();
        const postData = {
            subject: subject,
            survey: []
        };

        dispatch(setSubject(subject));
        fetch(`${Config.baseURL}/api/v1/mgnt/surveys/${account.accountid}`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: token
            },
            body: JSON.stringify(postData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.surveyid) {
                dispatch(setSuveyID(data.surveyid));
                dispatch(push('/create'));
                dispatch(openEdit(false));
            } else {
                setSubjectError(data);
            }
        })
        .catch(err => setSubjectError(err.responseJSON));
    };
}

export function editSubject(subject) {
    return (dispatch) => {
        dispatch(setSubject(subject));
        dispatch(saveQuestion())
        .then(() => {
            dispatch(openEdit(false));
        });
    };
}
