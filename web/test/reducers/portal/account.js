import expect from 'expect';
import account from '../../../portal/src/reducers/account';
import * as types from '../../../portal/src/constants/ActionTypes';

describe('[Portal] account reducer', () => {
    it('should handle account state', () => {
        expect(
            account({}, {
                type: types.RECIEVE_ACCOUNT_SUCCESS,
                account: {
                    accountid: 'facebook-xxxxxxx',
                    role: 'Designer',
                    username: 'User TM'
                }
            })
        ).toEqual({
            accountid: 'facebook-xxxxxxx',
            role: 'Designer',
            username: 'User TM'
        });
    });
});
