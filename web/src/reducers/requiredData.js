import * as types from '../constants/ActionTypes';

export default function requiredData(state = {}, action) {
    switch (action.type) {
    case types.SET_REQUIRED_DATA:
        return action.requiredData;
    default:
        return state;
    }
}
