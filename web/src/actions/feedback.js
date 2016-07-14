import * as types from '../constants/ActionTypes';
// import fetch from 'isomorphic-fetch';
// import config from '../config';

// Record ongoing feedback data to store
export function recordFeedback(feedback) {
    return {
        type: types.RECORD_FEEDBACK,
        feedback
    };
}
