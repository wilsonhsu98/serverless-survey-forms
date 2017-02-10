
import * as types from '../constants/ActionTypes';

export default function subscribers(state = [], action) {
    switch (action.type) {
    case types.RECEIVE_SUBSCRIBERS_SUCCESS:
        return [...action.subscribers];
    default:
        return state;
    }
}
