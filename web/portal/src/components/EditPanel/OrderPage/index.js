
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';
import $ from 'jquery';

import Item from './Item';

class OrderPage extends PureComponent {

    constructor() {
        super();

        this._mouseClickEvent = this._mouseClickEvent.bind(this);
        this._panelClickEvent = this._panelClickEvent.bind(this);
        this._moveItem = this._moveItem.bind(this);
    }

    componentDidMount() {
        window.addEventListener('click', this._mouseClickEvent);
        $('#editPanel').on('click', this._panelClickEvent);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this._mouseClickEvent);
        $('#editPanel').off('click', this._panelClickEvent);
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
            <div id="editPanel" className="editpanel">
                <div>ORDER PAGE</div>
                {queList}

                <div className="bottom">
                    <button
                        data-type="save"
                        className="actionBtn"
                    >
                        Save
                    </button>
                    <button
                        data-type="cancel"
                        className="actionBtn"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        );
    }

    _mouseClickEvent(e) {
        const { editPageActions } = this.props;
        if (e.target.id !== 'editPanel') {
            editPageActions.setEditPage('');
        }
    }

    _panelClickEvent(e) {
        e.stopPropagation();

        if (e.target.getAttribute('data-type') === 'cancel') {
            const { editPageActions } = this.props;
            editPageActions.setEditPage('');
        }
    }

    _moveItem(dragIndex, hoverIndex) {
        console.log(dragIndex +', '+hoverIndex);
        const { questionsActions } = this.props;
        if (dragIndex !== hoverIndex) {
            questionsActions.exchangePage(dragIndex, hoverIndex);
        }
    }
}

export default OrderPage;
