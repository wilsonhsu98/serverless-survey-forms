
import * as types from '../constants/ActionTypes';

export default function orderPage(state = [], action) {
    switch (action.type) {
    case types.SET_ORDERPAGE:
        return [...action.orderPage];
    case types.EXCHANGE_ORDERPAGE:
        let originP = [...state];
        const { bfIdx:bfPageIdx, afIdx:afPageIdx } = action;
        const movePage = originP[bfPageIdx];
        originP.splice(bfPageIdx, 1);
        originP.splice(afPageIdx, 0, movePage);
        return [...originP];
    default:
        return state;
    }
}


