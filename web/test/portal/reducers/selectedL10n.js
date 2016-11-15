import expect from 'expect';
import selectedL10n from '../../../portal/src/reducers/selectedL10n';
import * as types from '../../../portal/src/constants/ActionTypes';

describe('[Portal] selectedL10n reducer', () => {
    it('should handle selectedL10n state for default value', () => {
        expect(
            selectedL10n(undefined, { type: '' })
        ).toEqual('');
    });

    it('should handle selectedL10n state when add selected l10n language', () => {
        expect(
            selectedL10n('', { type: types.ADD_SELECTED_L10N, selectedL10n: 'zh-TW' })
        ).toEqual('zh-TW');
    });

    it('should handle selectedL10n state when remove selected l10n language', () => {
        expect(
            selectedL10n('en-US', { type: types.REMOVE_SELECTED_L10N })
        ).toEqual('');
    });
});
