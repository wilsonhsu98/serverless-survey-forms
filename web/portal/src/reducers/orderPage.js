
import * as types from '../constants/ActionTypes';

export default function orderPage(state = [], action) {
    switch (action.type) {
    case types.SET_ORDERPAGE:
    case types.EXCHANGE_ORDERPAGE:
        return [...action.orderPage];
    default:
        return state;
    }
}


