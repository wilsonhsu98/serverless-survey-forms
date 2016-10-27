import expect from 'expect';
import surveyL10n from '../../../portal/src/reducers/surveyL10n';
import * as types from '../../../portal/src/constants/ActionTypes';

describe('[Portal] surveyL10n reducer', () => {
    it('should handle surveyL10n state for default value', () => {
        expect(
            surveyL10n(undefined, { type: '' })
        ).toEqual({});
    });

    it('should handle surveyL10n state', () => {
        expect(
            surveyL10n({}, {
                type: types.SET_SURVEY_L10N,
                surveyL10n: {
                    'en-US': {
                        subject: 'Hello',
                        '1B02MFKVS0UXF2JYR95NQ': 'I am Page 1'
                    }
                }
            })
        ).toEqual({
            'en-US': {
                subject: 'Hello',
                '1B02MFKVS0UXF2JYR95NQ': 'I am Page 1'
            }
        });
    });
});
