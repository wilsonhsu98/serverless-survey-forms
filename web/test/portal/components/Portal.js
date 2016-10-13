import DomMock from '../../helpers/dom-mock';
import jsdom from 'mocha-jsdom';
import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Portal } from '../../../portal/src/containers/Portal';
import FBLogin from '../../../portal/src/components/FBLogin';
import Subject from '../../../portal/src/components/Popup/Subject';

DomMock('<html><body></body></html>');

describe('[Portal] Testing Portal Component', () => {
    jsdom({ skipWindowCheck: true });

    const props = {
        loading: false,
        token: 'xxxx',
        account: {},
        subject: '',
        surveyID: '',
        editSubject: false,
        preview: '',
        previewID: '',
        routing: {},
        editSubjectActions: () => {},
        subjectActions: () => {},
        questionsActions: () => {},
        previewActions: () => {},
        accountActions: () => {}
    };

    it('Portal: FB Login', () => {
        const content = TestUtils.renderIntoDocument(<Portal {...props} />);
        const fb = TestUtils.scryRenderedComponentsWithType(content, FBLogin);
        expect(fb.length).toEqual(1);
    });

    it('Portal: edit subject popup', () => {
        const editProps = Object.assign({}, props,
            { editSubject: true });
        const content = TestUtils.renderIntoDocument(<Portal {...editProps} />);
        const subject = TestUtils.findRenderedComponentWithType(content, Subject);
        expect(subject).toExist();
    });
});
