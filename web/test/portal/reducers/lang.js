import expect from 'expect';
import lang from '../../../portal/src/reducers/lang';
import * as types from '../../../portal/src/constants/ActionTypes';

describe('[Portal] lang reducer', () => {
    it('should handle lang state for default value', () => {
        expect(
            lang(undefined, { type: '' })
        ).toEqual('en-US');
    });

    it('should handle lang state when set or get survey language', () => {
        expect(
            lang('en-US', { type: types.SET_SUBJECT, lang: 'zh-TW' })
        ).toEqual('zh-TW');
    });
});
