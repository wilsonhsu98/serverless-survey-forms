import expect from 'expect';
import webpage from '../../../portal/src/reducers/webpage';
import * as types from '../../../portal/src/constants/ActionTypes';

describe('[Portal] webpage reducer', () => {
    it('should handle webpage state for default value', () => {
        expect(
            webpage(undefined, { type: '' })
        ).toEqual('index');
    });

    it('should handle webpage state', () => {
        expect(
            webpage('', {
                type: types.SET_WEBPAGE,
                webpage: 'create'
            })
        ).toEqual('create');
    });
});
