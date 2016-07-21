
import React from 'react';
import PureComponent from 'react-pure-render/component';

import Item from './Item';

class OrderPage extends PureComponent {

    constructor() {
        super();

        this._btnClickEvent = this._btnClickEvent.bind(this);
        this._moveItem = this._moveItem.bind(this);
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
            <div className="modalEditPanel">
                <div id="editPanel" className="editpanel">
                    <div className="edit">
                        <div className="editContent">
                            <div>Move Pages</div>
                            {queList}
                        </div>
                    </div>

                    <div className="bottom">
                        <button
                            data-type="save"
                            className="actionBtn"
                            onClick={this._btnClickEvent}
                        >
                            Save
                        </button>
                        <button
                            data-type="cancel"
                            className="actionBtn"
                            onClick={this._btnClickEvent}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    _btnClickEvent(e) {
        const { questionsActions, orderPageActions } = this.props;
        if (e.target.getAttribute('data-type') === 'cancel') {
            orderPageActions.setOrderPage([]);
        } else if (e.target.getAttribute('data-type') === 'save') {
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
