
import * as types from '../constants/ActionTypes';

import { push } from 'react-router-redux';
import fetch from 'isomorphic-fetch';
import Config from '../config';
import { openEdit } from './editSubject';
import { setSuveyID } from './surveyID';
import { saveQuestion } from './questions';

export function setSubject(data) {
    return {
        type: types.SET_SUBJECT,
        subject: data
    };
}

export function saveSubject(account_id, subject, token) {
    const postData = {
        subject: subject,
        survey: []
    };

    return (dispatch) => {
        fetch(`${Config.baseURL}/mgnt/surveys/${account_id}`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                // Authenticated: token
            },
            body: JSON.stringify(postData)
        })
        .then(response => response.json())
        .then(data => {
            dispatch(setSubject(subject));
            dispatch(setSuveyID(data.surveyid));
            dispatch(push('/create'));
            dispatch(openEdit(false));
        })
        .catch(err => {

        });
    };
}

export function editSubject(account_id, survey_id, subject, surveys, token) {
    return (dispatch) => {
        dispatch(saveQuestion(account_id, survey_id, subject, surveys, token))
        .then(() => {
            dispatch(setSubject(subject));
            dispatch(openEdit(false));
        });
    };
}
