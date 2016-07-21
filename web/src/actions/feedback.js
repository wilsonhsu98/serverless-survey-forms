import * as types from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch';
import config from '../config';

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// Record ongoing feedback data to store
export function recordFeedback(feedback) {
    return {
        type: types.RECORD_FEEDBACK,
        feedback
    };
}

function saveClientID(clientID) {
    return {
        type: types.SAVE_CLIENT_ID,
        clientID
    };
}

export function saveFeedback() {
    const clientID = `${getRandomArbitrary(1000, 9999)}${new Date().getTime()}`;
    return (dispatch, getState) => {
        const feedback = getState().feedback;
        const surveyid = getState().settings.surveyid;
        dispatch(saveClientID(clientID));
        return fetch(`${config.baseURL}/api/v1/feedbacks/${surveyid}/${clientID}`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                feedback: feedback
            })
        })
        .then((response) => {
            if (response.status >= 400) {
                throw new Error('Bad response from server');
            }
            console.log(`POST Feedback from ${clientID}`, response);
        });
    };
}

export function updateFeedback() {
    return (dispatch, getState) => {
        const feedback = getState().feedback;
        const surveyid = getState().settings.surveyid;
        const clientID = getState().clientID;
        return fetch(`${config.baseURL}/api/v1/feedbacks/${surveyid}/${clientID}`, {
            method: 'PUT',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                feedback: feedback
            })
        })
        .then((response) => {
            if (response.status >= 400) {
                throw new Error('Bad response from server');
            }
            console.log(`UPDATE Feedback from ${clientID}`, response);
        });
    };
}
