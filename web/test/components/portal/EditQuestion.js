import DomMock from '../../helpers/dom-mock';
import { wrapInTestContext } from '../../helpers/dnd-test';
import jsdom from 'mocha-jsdom';
import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import EditQuestion from '../../../portal/src/components/EditPanel/EditQuestion';

DomMock('<html><body></body></html>');

const fakeData = {
    id: '1AN2AL0F9BNA7A',
    type: 'rating',
    label: 'Testing question text',
    data: [
        { value: 1, label: 'Very dissatisfied' },
        { value: 2, label: 'Very satisfied' }
    ],
    input: 'Tell us the reason why you choose this answe',
    required: false
};

describe('[Portal] Testing EditQuestion Component', () => {
    jsdom({ skipWindowCheck: true });

    it('show question editor: question label and advance', () => {
        const props = {
            editQuestion: fakeData,
            editQuestionActions: () => {},
            questionsActions: () => {}
        };

        const EditQuestionContext = wrapInTestContext(EditQuestion);
        const contentRoot = TestUtils.renderIntoDocument(<EditQuestionContext {...props} />);
        // const backend = contentRoot.getManager().getBackend();
        const textarea = TestUtils.scryRenderedDOMComponentsWithClass(contentRoot, 'ut-editQuestion');
        // Expect  component
        expect(textarea[0].textContent).toEqual(fakeData.label);

        const div = TestUtils.scryRenderedDOMComponentsWithClass(contentRoot, 'ut-advance');
        // Expect one component
        expect(div.length).toEqual(1);
    });
});
