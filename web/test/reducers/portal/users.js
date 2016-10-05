import expect from 'expect';
import users from '../../../portal/src/reducers/users';
import * as types from '../../../portal/src/constants/ActionTypes';

describe('[Portal] users reducer', () => {
    it('should handle users state for default value', () => {
        expect(
            users(undefined, { type: '' })
        ).toEqual([]);
    });

    it('should handle users state', () => {
        expect(
            users({}, {
                type: types.RECIEVE_USERS_SUCCESS,
                users: [
                    {
                        accountid: 'facebook-XXXXXX',
                        username: 'Mr. Cheng',
                        email: 'cheng@trend.com.tw',
                        role: 'User'
                    }, {
                        accountid: 'facebook-YYYYYY',
                        username: 'Mr. Wang',
                        email: 'wang@trend.com.tw',
                        role: 'Designer'
                    }, {
                        accountid: 'facebook-ZZZZZZZ',
                        username: 'Miss Lin',
                        email: 'lin@trend.com.tw',
                        role: 'Admin'
                    }]
            })
        ).toEqual([
            {
                accountid: 'facebook-XXXXXX',
                username: 'Mr. Cheng',
                email: 'cheng@trend.com.tw',
                role: 'User'
            }, {
                accountid: 'facebook-YYYYYY',
                username: 'Mr. Wang',
                email: 'wang@trend.com.tw',
                role: 'Designer'
            }, {
                accountid: 'facebook-ZZZZZZZ',
                username: 'Miss Lin',
                email: 'lin@trend.com.tw',
                role: 'Admin'
            }]);
    });

    it('should handle users state when change specific user\'s role', () => {
        expect(
            users([
                {
                    accountid: 'facebook-XXXXXX',
                    username: 'Mr. Cheng',
                    email: 'cheng@trend.com.tw',
                    role: 'User'
                }, {
                    accountid: 'facebook-YYYYYY',
                    username: 'Mr. Wang',
                    email: 'wang@trend.com.tw',
                    role: 'Designer'
                }, {
                    accountid: 'facebook-ZZZZZZZ',
                    username: 'Miss Lin',
                    email: 'lin@trend.com.tw',
                    role: 'Admin'
                }], {
                type: types.RECIEVE_CHANGE_ROLE_SUCCESS,
                users: [
                    {
                        accountid: 'facebook-XXXXXX',
                        username: 'Mr. Cheng',
                        email: 'cheng@trend.com.tw',
                        role: 'User'
                    }, {
                        accountid: 'facebook-YYYYYY',
                        username: 'Mr. Wang',
                        email: 'wang@trend.com.tw',
                        role: 'Admin'
                    }, {
                        accountid: 'facebook-ZZZZZZZ',
                        username: 'Miss Lin',
                        email: 'lin@trend.com.tw',
                        role: 'Admin'
                    }]
            })
        ).toEqual([
            {
                accountid: 'facebook-XXXXXX',
                username: 'Mr. Cheng',
                email: 'cheng@trend.com.tw',
                role: 'User'
            }, {
                accountid: 'facebook-YYYYYY',
                username: 'Mr. Wang',
                email: 'wang@trend.com.tw',
                role: 'Admin'
            }, {
                accountid: 'facebook-ZZZZZZZ',
                username: 'Miss Lin',
                email: 'lin@trend.com.tw',
                role: 'Admin'
            }]);
    });
});
