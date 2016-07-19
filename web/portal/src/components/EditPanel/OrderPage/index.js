
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';
import $ from 'jquery';

import Item from './Item';

class OrderPage extends PureComponent {

    constructor() {
        super();

        this._btnClickEvent = this._btnClickEvent.bind(this);
        this._moveItem = this._moveItem.bind(this);
    }

    render() {
        const { questions } = this.props;
        let queList = [];
        questions.forEach((page, idx) => {
            queList.push(
                <Item
                    key={idx}
                    id={idx}
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
        if (e.target.getAttribute('data-type') === 'cancel') {
            const { orderPageActions } = this.props;
            orderPageActions.setOrderPage(false);
        }
    }

    _moveItem(dragIndex, hoverIndex) {
        const { questionsActions } = this.props;
        if (dragIndex !== hoverIndex) {
            questionsActions.exchangePage(dragIndex, hoverIndex);
        }
    }
}

export default OrderPage;
