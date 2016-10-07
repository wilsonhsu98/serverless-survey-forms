import expect from 'expect';
import selectedUser from '../../../portal/src/reducers/selectedUser';
import * as types from '../../../portal/src/constants/ActionTypes';

describe('[Portal] selectedUser reducer', () => {
    it('should handle selectedUser state for default value', () => {
        expect(
            selectedUser(undefined, { type: '' })
        ).toEqual({});
    });

    it('should handle selectedUser state', () => {
        expect(
            selectedUser({}, {
                type: types.SET_SELECTED_USER,
                selectedUser: {
                    accountid: 'facebook-xxxxx',
                    role: 'Designer',
                    username: 'Selected TM'
                }
            })
        ).toEqual({
            accountid: 'facebook-xxxxx',
            role: 'Designer',
            username: 'Selected TM'
        });
    });

    it('should handle selectedUser state when stop select', () => {
        expect(
            selectedUser({}, {
                type: types.SET_SELECTED_USER,
                selectedUser: {}
            })
        ).toEqual({});
    });
});
