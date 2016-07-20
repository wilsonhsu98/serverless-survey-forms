
import * as types from '../constants/ActionTypes';

export function setOrderPage(data) {
    return {
        type: types.SET_ORDERPAGE,
        orderPage: data
    };
}

export function exchangeOrderPage(data, bfIdx, afIdx) {
    let originP = [...data];
    const movePage = originP[bfIdx];
    originP.splice(bfIdx, 1);
    originP.splice(afIdx, 0, movePage);
    return {
        type: types.EXCHANGE_ORDERPAGE,
        orderPage: originP
    };
}
