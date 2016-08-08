import DomMock from '../../helpers/dom-mock';
import { wrapInTestContext } from '../../helpers/dnd-test';
import jsdom from 'mocha-jsdom';
import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Item from '../../../portal/src/components/Form/Item';
import Radio from '../../../portal/src/components/Form/Radio';
import Checkbox from '../../../portal/src/components/Form/Checkbox';
import Rating from '../../../portal/src/components/Form/Rating';

DomMock('<html><body></body></html>');

describe('[Portal] Testing Pagination Item Component', () => {
    jsdom({ skipWindowCheck: true });

    const props = {
        id: 1,
        page: 1,
        data: {
            id: '1A0F97AN2ABNAL',
            type: 'radio',
            label: 'Testing',
            data: [
                { value: 1, label: 'Option 1' },
                { value: 2, label: 'Option 2' },
                { value: 3, label: 'Option 3' },
                { value: 4, label: 'Option 4' },
                { value: 5, label: 'Option 5' }
            ],
            required: false
        },
        editQuestion: {
            id: '1A0F97AN2ABNAL',
            type: 'radio',
            label: 'Testing',
            data: [
                { value: 1, label: 'Option 1' },
                { value: 2, label: 'Option 2' },
                { value: 3, label: 'Option 3' },
                { value: 4, label: 'Option 4' },
                { value: 5, label: 'Option 5' }
            ],
            required: false
        },
        questionsActions: () => {},
        editQuestionActions: () => {},
        moveQuestion: () => {},
        getQuestion: (val) => {
            return { index: val };
        }
    };

    it('pagination item edit: selected item class', () => {
        const ItemContext = wrapInTestContext(Item);
        const contentRoot = TestUtils.renderIntoDocument(<ItemContext {...props} />);
        const item = TestUtils.findRenderedDOMComponentWithClass(contentRoot, 'ut-item');
        expect(item.classList.contains('edit')).toBe(true);
    });

    it('pagination item edit: radio item', () => {
        const ItemContext = wrapInTestContext(Item);
        const contentRoot = TestUtils.renderIntoDocument(<ItemContext {...props} />);
        const radio = TestUtils.findRenderedComponentWithType(contentRoot, Radio);
        expect(
            TestUtils.isCompositeComponentWithType(radio, Radio)
        ).toBe(true);
    });

    it('pagination item edit: checkbox item', () => {
        props.editQuestion.type = 'checkbox';
        const ItemContext = wrapInTestContext(Item);
        const contentRoot = TestUtils.renderIntoDocument(<ItemContext {...props} />);
        const chk = TestUtils.findRenderedComponentWithType(contentRoot, Checkbox);
        expect(
            TestUtils.isCompositeComponentWithType(chk, Checkbox)
        ).toBe(true);
    });

    it('pagination item edit: rating item', () => {
        props.editQuestion.type = 'rating';
        const ItemContext = wrapInTestContext(Item);
        const contentRoot = TestUtils.renderIntoDocument(<ItemContext {...props} />);
        const rating = TestUtils.findRenderedComponentWithType(contentRoot, Rating);
        expect(
            TestUtils.isCompositeComponentWithType(rating, Rating)
        ).toBe(true);
    });

    it('pagination item edit: drag item style', () => {
        const ItemContext = wrapInTestContext(Item);
        const contentRoot = TestUtils.renderIntoDocument(<ItemContext {...props} />);
        const backend = contentRoot.getManager().getBackend();
        const component = TestUtils.findRenderedDOMComponentWithClass(contentRoot, 'ut-item');

        // Expect opacity is 1 before drag
        expect(component.style.opacity).toEqual(1);

        const dragItem = TestUtils.findRenderedComponentWithType(contentRoot, Item);
        const targetItem = dragItem.decoratedComponentInstance;
        backend.simulateBeginDrag([dragItem.getHandlerId()]);
        backend.simulateHover([targetItem.getHandlerId()]);

        // Expect opacity is 0.1 when hover
        expect(component.style.opacity).toEqual(0.1);
    });
});
