import expect from 'expect';
import * as actions from '../../../src/actions/settings';
import * as types from '../../../src/constants/ActionTypes';

describe('[Feedback] settings action', () => {
    it('should create an action to set settings', () => {
        const settings = {
            accountid: "facebook-11111111",
            locale: "en-US",
            preview: false,
            surveyid: "1111-2222-3333-4444",
            type: "default"
        };
        expect(
            actions.settings(settings)
        ).toEqual({
            type: types.SET_SETTINGS,
            settings
        });
    });
});
