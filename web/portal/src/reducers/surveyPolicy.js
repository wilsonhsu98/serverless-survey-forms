
import * as types from '../constants/ActionTypes';

const init = {
    description: 'Thanks for sharing your feedback with Trend Micro.',
    privacy: {}
};

export default function surveyPolicy(state = init, action) {
    switch (action.type) {
    case types.SET_SURVEY_POLICY:
        return action.surveyPolicy;
    case types.INIT_SURVEY_POLICY:
        return init;
    default:
        return state;
    }
}
