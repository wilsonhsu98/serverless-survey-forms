import * as types from '../constants/ActionTypes';
// import fetch from 'isomorphic-fetch';
// import config from '../config';

export function saveFeedback(feedback) {
    return {
        type: types.SAVE_FEEDBACK,
        feedback
    };
}
