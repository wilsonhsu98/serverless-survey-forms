
import * as types from '../constants/ActionTypes';

export function setOrderPage(flag) {
    return {
        type: types.SET_ORDERPAGE,
        orderPage: flag
    };
}
