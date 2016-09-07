import configureStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import expect from 'expect';
import * as actions from '../../../portal/src/actions/orderPage';
import * as types from '../../../portal/src/constants/ActionTypes';

const mockStore = configureStore([thunkMiddleware]);

describe('[Portal] orderPage action', () => {
    it('should create an action to set orderPage', () => {
        const orderPage = [2, 1];
        expect(
            actions.setOrderPage(orderPage)
        ).toEqual({
            type: types.SET_ORDERPAGE,
            orderPage
        });
    });

    it('should create an action to exchange page', () => {
        const expectedActions = [
            { type: types.SET_ORDERPAGE, orderPage: [1, 2] }
        ];
        const store = mockStore({ orderPage: [2, 1] });

        store.dispatch(actions.exchangeOrderPage(0, 1));
        expect(
            store.getActions()
        ).toEqual(expectedActions);
    });
});
