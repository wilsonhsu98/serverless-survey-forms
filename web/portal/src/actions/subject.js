
import * as types from '../constants/ActionTypes';

// import { push } from 'react-router-redux';
import fetch from 'isomorphic-fetch';
import Config from '../config';
import { openEdit } from './editSubject';
import { setSurveyID, saveQuestion } from './questions';
import { expiredToken } from './account';

export function setSubject(data) {
    return {
        type: types.SET_SUBJECT,
        subject: data
    };
}

function setSubjectError(err) {
    return (dispatch) => {
        dispatch(expiredToken());
        dispatch({
            type: types.SET_SUBJECT_FAILURE,
            errorMsg: err
        });
    };
}

export function saveSubject(subject) {
    return (dispatch, getState) => {
        const { account, surveyPolicy, token } = getState();
        const postData = {
            subject: subject,
            survey: { content: [], thankyou: surveyPolicy }
        };

        dispatch(setSubject(subject));
        fetch(`${Config.baseURL}/api/v1/mgnt/surveys/${account.accountid}`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                authorization: token
            },
            body: JSON.stringify(postData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.surveyid) {
                dispatch(setSurveyID(data.surveyid));
                // TODOS: temporarily remove router
                // dispatch(push('/create'));
                dispatch(openEdit(false));
            } else {
                setSubjectError(data);
            }
        })
        .catch(err => setSubjectError(err));
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
