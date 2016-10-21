
import * as types from '../constants/ActionTypes';

import Config from '../config';
// import { push } from 'react-router-redux';
import { openEdit } from './editSubject';
import { postSurvey, setSurveyID, saveQuestion } from './questions';
import { expiredToken } from './account';
import { setWebpage } from './webpage';

export function setSubject(data) {
    return {
        type: types.SET_SUBJECT,
        subject: data
    };
}

export function setSubjectSuccess() {
    return {
        type: types.SET_SUBJECT_SUCCESS
    };
}

export function setSubjectFailure(err) {
    return (dispatch) => {
        dispatch(openEdit(false));
        dispatch(expiredToken());
        dispatch({
            type: types.SET_SUBJECT_FAILURE,
            errorMsg: err
        });
    };
}

export function saveSubject(subject) {
    return (dispatch, getState) => {
        dispatch({ type: types.REQUEST_SET_SUBJECT });
        const { account, surveyPolicy, token } = getState();
        const postData = {
            subject: subject,
            survey: { format: Config.surveyFormat, content: [], thankyou: surveyPolicy }
        };

        dispatch(setSubject(subject));
        return postSurvey(account.accountid, postData, token)
            .then(response => response.json())
            .then(data => {
                if (data.surveyid) {
                    dispatch(setSurveyID(data.surveyid));
                    dispatch(openEdit(false));
                    dispatch(setSubjectSuccess());
                    // TODOS: temporarily remove router
                    // dispatch(push('/create'));
                    dispatch(setWebpage('create'));
                } else {
                    dispatch(setSubjectFailure(data));
                }
            })
            .catch(err => dispatch(setSubjectFailure(err)));
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
