import * as types from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch';
import config from '../config';

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

export function setFeedback(survey) {
    let questions = [];
    let surveyContent = survey.content;
    surveyContent = surveyContent.forEach((page) => {
        questions = questions.concat(page.question);
    });
    const feedback = {};
    questions.forEach((qitem) => {
        feedback[`Q${qitem.order}`] = {};
        feedback[`Q${qitem.order}`].data = qitem.data;
    });
    return {
        type: types.SET_FEEDBACK_FORMAT,
        feedback
    };
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
            // TODO: postMessage to client
            // window.parent.postMessage(`POST Feedback from ${clientID}`,
                // window.parent.location.origin);
        });
    };
}

export function updateFeedback(closeWhenDone, privacyData) {
    return (dispatch, getState) => {
        const feedback = getState().submit;
        const surveyid = getState().settings.surveyid;
        const clientID = getState().clientID;
        const submittedData = {
            feedback: feedback
        };
        // Privacy data
        if (privacyData) {
            feedback.thankyou = privacyData;
        }
        return fetch(`${config.baseURL}/api/v1/feedbacks/${surveyid}/${clientID}`, {
            method: 'PUT',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submittedData)
        })
        .then((response) => {
            if (response.status >= 400) {
                throw new Error('Bad response from server');
            }
            console.log(`UPDATE Feedback from ${clientID}`, response);
            if (closeWhenDone) {
                window.parent.postMessage({
                    source: window.location.origin,
                    msg: 'close'
                }, '*');
            }
            // TODO: postMessage to client
            // window.parent.postMessage(`UPDATE Feedback from ${clientID}`,
                // window.parent.location.origin);
        });
    };
}
