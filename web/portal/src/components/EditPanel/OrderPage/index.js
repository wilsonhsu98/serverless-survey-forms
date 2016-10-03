
import React from 'react';
import PureComponent from 'react-pure-render/component';
import $ from 'jquery';

import Mixins from '../../../mixins/global';
import Item from './Item';
import Button from '../../Button';

class OrderPage extends PureComponent {

    constructor() {
        super();

        this._btnClickEvent = this._btnClickEvent.bind(this);
        this._moveItem = this._moveItem.bind(this);
        this._handleEditModeClick = this._handleEditModeClick.bind(this);
    }

    componentDidMount() {
        Mixins.fixScrollbar();
        $('#editModal').on('click', this._handleEditModeClick);
    }

    componentWillUnmount() {
        Mixins.freeScrollbar();
        $('#editModal').off('click', this._handleEditModeClick);
    }

    _handleEditModeClick(e) {
        const target = e.target;
        const hint = document.getElementsByClassName('js-hint');
        if (target.getAttribute('id') === 'editModal') {
            hint[0].style.display = 'block';
        } else {
            hint[0].style.display = 'none';
        }
    }

    render() {
        const { questions, orderPage } = this.props;
        let queList = [];
        orderPage.forEach((pageNum, idx) => {
            const page = questions[pageNum - 1];
            queList.push(
                <Item
                    key={idx}
                    id={idx}
                    orderId={idx + 1}
                    page={page}
                    moveItem={this._moveItem}
                />
            );
        });
        return (
            <div id="editModal" className="modalEditPanel">
                <div id="editPanel" className="editpanel">
                    <div className="edit">
                        <div className="editContent">
                            {queList}
                        </div>
                    </div>

                    <div className="bottom">
                        <div className="edit-hint shake js-hint" style={{ display: 'none' }}>
                            Please confirm your change
                        </div>
                        <Button
                            string="Save"
                            i18nKey={false}
                            color="ruby"
                            onClick={this._btnClickEvent}
                            extraProps={{ 'data-type': 'save' }}
                        />
                        <Button
                            string="Cancel"
                            i18nKey={false}
                            onClick={this._btnClickEvent}
                            extraProps={{ 'data-type': 'cancel' }}
                        />
                    </div>
                </div>
            </div>
        );
    }

    _btnClickEvent(e) {
        const { questionsActions, orderPageActions } = this.props;
        if (e.currentTarget.getAttribute('data-type') === 'cancel') {
            orderPageActions.setOrderPage([]);
        } else if (e.currentTarget.getAttribute('data-type') === 'save') {
            // save orderPage to Question
            questionsActions.exchangePage();
            questionsActions.saveQuestion();
            orderPageActions.setOrderPage([]);
        }
    }

    _moveItem(dragIndex, hoverIndex) {
        const { orderPageActions } = this.props;
        if (dragIndex !== hoverIndex) {
            orderPageActions.exchangeOrderPage(dragIndex, hoverIndex);
        }
    }
}

export default OrderPage;
