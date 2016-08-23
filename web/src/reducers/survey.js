import * as types from '../constants/ActionTypes';

export default function survey(state = {}, action) {
    switch (action.type) {
    case types.RECEIVE_SURVEY_SUCCESS:
        return Object.assign({}, state, action.survey);
    default:
        return state;
    }
}
