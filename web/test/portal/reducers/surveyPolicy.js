import expect from 'expect';
import surveyPolicy from '../../../portal/src/reducers/surveyPolicy';
import * as types from '../../../portal/src/constants/ActionTypes';

describe('[Portal] surveyPolicy reducer', () => {
    it('should handle surveyPolicy state for default value', () => {
        const init = {
            description: 'privacy_description',
            privacy: {}
        };
        expect(
            surveyPolicy(undefined, { type: '' })
        ).toEqual(init);
    });

    it('should handle surveyPolicy state', () => {
        expect(
            surveyPolicy({}, {
                type: types.SET_SURVEY_POLICY,
                surveyPolicy: {
                    description: 'privacy_description',
                    privacy: {
                        input: 'privacy_label',
                        label: 'privacy_terms',
                        terms: 'privacy_input'
                    }
                }
            })
        ).toEqual({
            description: 'privacy_description',
            privacy: {
                input: 'privacy_label',
                label: 'privacy_terms',
                terms: 'privacy_input'
            }
        });
    });


    it('should handle surveyPolicy state to init', () => {
        expect(
            surveyPolicy({}, {
                type: types.INIT_SURVEY_POLICY
            })
        ).toEqual({
            description: 'privacy_description',
            privacy: {}
        });
    });
});
