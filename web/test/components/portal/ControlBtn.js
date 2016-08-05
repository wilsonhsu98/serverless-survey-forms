import DomMock from '../../helpers/dom-mock';
import jsdom from 'mocha-jsdom';
import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ControlBtn from '../../../portal/src/components/List/ControlBtn';
import IconButton from '../../../portal/src/components/IconButton';

DomMock('<html><body></body></html>');

describe('[Portal] Testing ControlBtn Component', () => {
    jsdom({ skipWindowCheck: true });

    const props = {
        selectedSurveys: '',
        editSubjectActions: () => {},
        surveysActions: () => {},
        previewActions: () => {}
    };

    it('survey list control button: count surveys number', () => {
        const content = TestUtils.renderIntoDocument(
            <ControlBtn {...props} />
        );
        const btn = TestUtils.scryRenderedComponentsWithType(content, IconButton);
        expect(btn.length).toEqual(4);
    });

    it('survey list control button: if no selectedSurveys, buttons disable will be true', () => {
        const content = TestUtils.renderIntoDocument(
            <ControlBtn {...props} />
        );
        const btn = TestUtils.scryRenderedComponentsWithType(content, IconButton);
        expect(btn[0].props.disabled).toBe(false);
        expect(btn[1].props.disabled).toBe(true);
        // TODOS: wait feature ready
        // expect(btn[2].props.disabled).toBe(true);
        expect(btn[3].props.disabled).toBe(true);
    });

    it('survey list control button: if one selectedSurveys, buttons disable will be false', () => {
        props.selectedSurveys = '2222-3333-4444-0000';

        const content = TestUtils.renderIntoDocument(
            <ControlBtn {...props} />
        );
        const btn = TestUtils.scryRenderedComponentsWithType(content, IconButton);
        expect(btn[0].props.disabled).toBe(false);
        expect(btn[1].props.disabled).toBe(false);
        // TODOS: wait feature ready
        // expect(btn[2].props.disabled).toBe(false);
        expect(btn[3].props.disabled).toBe(false);
    });
});
