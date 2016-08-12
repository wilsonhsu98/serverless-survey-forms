import * as types from '../constants/ActionTypes';

export default function done(state = false, action) {
    switch (action.type) {
    case types.SURVEY_DONE:
        return true;
    default:
        return state;
    }
}
