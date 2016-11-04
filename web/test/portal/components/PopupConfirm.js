import DomMock from '../../helpers/dom-mock';
import jsdom from 'mocha-jsdom';
import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Confirm from '../../../portal/src/components/Popup/Confirm';
import Button from '../../../portal/src/components/Button';

DomMock('<html><body></body></html>');

describe('[Portal] Testing Confirm Component', () => {
    jsdom({ skipWindowCheck: true });

    const props = {
        popup: '',
        popupActions: () => {},
        surveysActions: () => {}
    };

    it('confirm popup for deleteOneSurvey', () => {
        const popProps = Object.assign({}, props, { popup: 'deleteOneSurvey' });
        const content = TestUtils.renderIntoDocument(<Confirm {...popProps} />);

        const title = TestUtils.findRenderedDOMComponentWithClass(content, 'ut-title');
        expect(title.textContent).toEqual('Do you really want to delete this survey?');

        const btn = TestUtils.scryRenderedComponentsWithType(content, Button);
        expect(btn.length).toEqual(2);
    });

    it('confirm popup for deleteAllFeedbacks', () => {
        const popProps = Object.assign({}, props, { popup: 'deleteAllFeedbacks' });
        const content = TestUtils.renderIntoDocument(<Confirm {...popProps} />);

        const title = TestUtils.findRenderedDOMComponentWithClass(content, 'ut-title');
        expect(title.textContent).toEqual('Do you really want to clear all feedbacks in this survey?');

        const btn = TestUtils.scryRenderedComponentsWithType(content, Button);
        expect(btn.length).toEqual(2);
    });

    it('confirm popup for notEditableSurvey', () => {
        const popProps = Object.assign({}, props, { popup: 'notEditableSurvey' });
        const content = TestUtils.renderIntoDocument(<Confirm {...popProps} />);

        const title = TestUtils.findRenderedDOMComponentWithClass(content, 'ut-title');
        expect(title.textContent).toEqual('Because there are some feedback in this survey, '
                + 'you can\'t change format. You can only modify text.');

        const btn = TestUtils.scryRenderedComponentsWithType(content, Button);
        expect(btn.length).toEqual(1);
    });

    it('confirm popup for notEditableAdmin', () => {
        const popProps = Object.assign({}, props, { popup: 'notEditableAdmin' });
        const content = TestUtils.renderIntoDocument(<Confirm {...popProps} />);

        const title = TestUtils.findRenderedDOMComponentWithClass(content, 'ut-title');
        expect(title.textContent).toEqual('You can\'t edit survey in Admin mode.');

        const btn = TestUtils.scryRenderedComponentsWithType(content, Button);
        expect(btn.length).toEqual(1);
    });
});
