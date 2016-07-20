
import * as types from '../constants/ActionTypes';

export function setOrderPage(data) {
    return {
        type: types.SET_ORDERPAGE,
        orderPage: data
    };
}

export function exchangeOrderPage(bfIdx, afIdx) {
    return (dispatch, getState) => {
        // exchange order
        let data = [...getState().orderPage];
        data.splice(afIdx, 0, ...data.splice(bfIdx, 1));

        dispatch(setOrderPage(data));
    };
}
