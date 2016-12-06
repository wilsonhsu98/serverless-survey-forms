import expect from 'expect';
import settings from '../../../src/reducers/settings';
import * as types from '../../../src/constants/ActionTypes';

describe('[Feedback] settings reducer', () => {
    it('should handle settings state for default value', () => {
        expect(
            settings(undefined, { type: '' })
        ).toEqual({});
    });

    it('should handle settings state', () => {
        const data = {
            accountid: "facebook-xxxxxx",
            locale: "zh-TW",
            preview: false,
            surveyid: "1111-2222-3333-4444",
            type: "default"
        };
        expect(
            settings({}, {
                type: types.SET_SETTINGS,
                settings: data
            })
        ).toEqual(data);
    });
});
