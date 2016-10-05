import expect from 'expect';
import token from '../../../portal/src/reducers/token';
import * as types from '../../../portal/src/constants/ActionTypes';

describe('[Portal] token reducer', () => {
    it('should handle token state for default value', () => {
        expect(
            token(undefined, { type: '' })
        ).toEqual('');
    });

    it('should handle token state', () => {
        expect(
            token('', {
                type: types.SET_TOKEN,
                token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImZhY2Vib29rLTMxYzJjYzFmN2YxMDUwMjQzZjliZDQ3OGU'
            })
        ).toEqual('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImZhY2Vib29rLTMxYzJjYzFmN2YxMDUwMjQzZjliZDQ3OGU');
    });

    it('should handle token state when expired', () => {
        expect(
            token('', {
                type: types.EXPIRED_TOKEN
            })
        ).toEqual('');
    });
});
