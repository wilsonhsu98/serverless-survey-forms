import expect from 'expect';
import clientID from '../../../src/reducers/clientID';
import * as types from '../../../src/constants/ActionTypes';

describe('[Feedback] clientID reducer', () => {
    it('should handle clientID state for default value', () => {
        expect(
            clientID(undefined, { type: '' })
        ).toEqual('');
    });

    it('should handle clientID state', () => {
        expect(
            clientID('', {
                type: types.SAVE_CLIENT_ID,
                clientID: 'chrome-xxxxxx'
            })
        ).toEqual('chrome-xxxxxx');
    });
});
