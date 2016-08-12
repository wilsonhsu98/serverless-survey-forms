import DomMock from '../../helpers/dom-mock';
import jsdom from 'mocha-jsdom';
import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Header from '../../../portal/src/components/Header';

DomMock('<html><body></body></html>');

describe('[Portal] Testing Header Component', () => {
    jsdom({ skipWindowCheck: true });

    const props = {
        subject: '',
        surveyID: '',
        editSubjectActions: () => {},
        questionsActions: () => {},
        questionsActions: () => {}
    };

    it('header: normal mode', () => {
        const content = TestUtils.renderIntoDocument(<Header {...props} />);
        const trend = TestUtils.findRenderedDOMComponentWithClass(content, 'ut-trend');
        expect(trend).toExist();
        const qustom = TestUtils.scryRenderedDOMComponentsWithClass(content, 'ut-qustom');
        expect(qustom).toEqual([]);
    });

    it('header: edit survey mode', () => {
        const editProps = Object.assign({}, props,
            {
                subject: 'New questionnaire',
                surveyID: 'N97ABN2A1A0FAL'
            });
        const content = TestUtils.renderIntoDocument(<Header {...editProps} />);
        const trend = TestUtils.scryRenderedDOMComponentsWithClass(content, 'ut-trend');
        expect(trend).toEqual([]);
        const qustom = TestUtils.findRenderedDOMComponentWithClass(content, 'ut-qustom');
        expect(qustom).toExist();

        const title = TestUtils.findRenderedDOMComponentWithClass(content, 'ut-title');
        expect(title.textContent).toEqual(editProps.subject);
    });
});
