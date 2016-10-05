import expect from 'expect';
import loading from '../../../portal/src/reducers/loading';
import * as types from '../../../portal/src/constants/ActionTypes';

describe('[Portal] loading reducer', () => {
    it('should handle loading state for default value', () => {
        expect(
            loading(undefined, { type: '' })
        ).toEqual(false);
    });

    it('should handle loading state when set loading', () => {
        expect(
            loading(false, { type: types.SET_LOADING, loading: true })
        ).toEqual(true);

        expect(
            loading(true, { type: types.SET_LOADING, loading: false })
        ).toEqual(false);
    });

    it('should handle loading state when request API', () => {
        expect(
            loading(false, { type: types.REQUEST_SET_SUBJECT })
        ).toEqual(true);

        expect(
            loading(false, { type: types.REQUEST_SURVEYS_LIST })
        ).toEqual(true);

        expect(
            loading(false, { type: types.REQUEST_DELETE_SURVEYS })
        ).toEqual(true);

        expect(
            loading(false, { type: types.REQUEST_GET_QUESTION })
        ).toEqual(true);

        expect(
            loading(false, { type: types.REQUEST_REPORT })
        ).toEqual(true);

        expect(
            loading(false, { type: types.REQUEST_USERS_LIST })
        ).toEqual(true);

        expect(
            loading(false, { type: types.REQUEST_CHANGE_ROLE })
        ).toEqual(true);

        expect(
            loading(false, { type: types.REQUEST_COPY_SURVEY })
        ).toEqual(true);
    });

    it('should handle loading state when request API success', () => {
        expect(
            loading(true, { type: types.SET_SUBJECT_SUCCESS })
        ).toEqual(false);

        expect(
            loading(true, { type: types.RECIEVE_SURVEYS_SUCCESS })
        ).toEqual(false);

        expect(
            loading(true, { type: types.RECIEVE_DELETE_SURVEYS_SUCCESS })
        ).toEqual(false);

        expect(
            loading(true, { type: types.RECIEVE_QUESTIONS_SUCCESS })
        ).toEqual(false);

        expect(
            loading(true, { type: types.RECIEVE_REPORT_SUCCESS })
        ).toEqual(false);

        expect(
            loading(true, { type: types.RECIEVE_USERS_SUCCESS })
        ).toEqual(false);

        expect(
            loading(true, { type: types.RECIEVE_CHANGE_ROLE_SUCCESS })
        ).toEqual(false);

        expect(
            loading(true, { type: types.POST_COPIEDSURVEY_SUCCESS })
        ).toEqual(false);
    });

    it('should handle loading state when receive API fail', () => {
        expect(
            loading(true, { type: types.SET_SUBJECT_FAILURE })
        ).toEqual(false);

        expect(
            loading(true, { type: types.RECIEVE_SURVEYS_FAILURE })
        ).toEqual(false);

        expect(
            loading(true, { type: types.RECIEVE_DELETE_SURVEYS_FAILURE })
        ).toEqual(false);

        expect(
            loading(true, { type: types.RECIEVE_QUESTIONS_FAILURE })
        ).toEqual(false);

        expect(
            loading(true, { type: types.RECIEVE_REPORT_FAILURE })
        ).toEqual(false);

        expect(
            loading(true, { type: types.RECIEVE_USERS_FAILURE })
        ).toEqual(false);

        expect(
            loading(true, { type: types.RECIEVE_CHANGE_ROLE_FAILURE })
        ).toEqual(false);

        expect(
            loading(true, { type: types.POST_COPIEDSURVEY_FAILURE })
        ).toEqual(false);
    });
});
