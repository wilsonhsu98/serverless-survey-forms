import '../../helpers/env';
import DomMock from '../../helpers/dom-mock';
import nock from 'nock';
import configureStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import expect from 'expect';
import * as actions from '../../../portal/src/actions/account';
import * as types from '../../../portal/src/constants/ActionTypes';
import Config from '../../../portal/src/config';

DomMock('<html><body></body></html>');
const mockStore = configureStore([thunkMiddleware]);

describe('[Portal] account action', () => {
    beforeEach(() => {
        global.window = { localStorage: {} };
    });

    afterEach(() => {
        global.window = document.defaultView;
        nock.cleanAll();
    });

    it('should create an action to handle token expired', () => {
        const expectedActions = [
            { type: types.EXPIRED_TOKEN }
        ];
        const store = mockStore({ surveyID: '', subject: '' });

        store.dispatch(actions.expiredToken());
        expect(
            store.getActions()
        ).toEqual(expectedActions);
    });

    it('should create an action to handle verify token', () => {
        const account = {
            accountid: 'facebook-xxxxxx',
            username: 'Mr. Test',
            role: 'Admin'
        };
        const token = 'xxxxxxx';

        nock(Config.baseURL, {
            reqheaders: { 'authorization': token }
        })
        .get('/api/v1/mgnt/users/me')
        .reply(200, account);

        const expectedActions = [
            { type: types.SET_TOKEN, token },
            { type: types.RECIEVE_ACCOUNT_SUCCESS, account }
        ];
        const store = mockStore({});

        return store.dispatch(actions.verifyToken(token))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });
});
