
import * as types from '../constants/ActionTypes';

export function receiveAccountSuccess(data) {
    return {
        type: types.RECIEVE_ACCOUNT_SUCCESS,
        account: data
    };
}

export function receiveAccountFailure(err) {
    console.log(err);
}
