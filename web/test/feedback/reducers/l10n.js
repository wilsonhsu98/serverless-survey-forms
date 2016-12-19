import expect from 'expect';
import l10n from '../../../src/reducers/l10n';
import * as types from '../../../src/constants/ActionTypes';

describe('[Feedback] l10n reducer', () => {
    it('should handle l10n state for default value', () => {
        expect(
            l10n(undefined, { type: '' })
        ).toEqual({});
    });

    it('should handle l10n state', () => {
        const data = {
            basic: "en-US",
            subject: "I am subject"
        };
        expect(
            l10n({}, {
                type: types.SET_SURVEY_L10N,
                l10n: data
            })
        ).toEqual(data);
    });
});
