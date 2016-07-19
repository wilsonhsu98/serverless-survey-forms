
import * as types from '../constants/ActionTypes';

export function setOrderPage(data) {
    return {
        type: types.SET_ORDERPAGE,
        orderPage: data
    };
}

export function exchangeOrderPage(bfIdx, afIdx) {
    return {
        type: types.EXCHANGE_ORDERPAGE,
        bfIdx,
        afIdx
    };
}
