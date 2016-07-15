
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';
import $ from 'jquery';

import * as values from '../../../constants/DefaultValues';

class EditPage extends PureComponent {

    constructor() {
        super();

        this._btnClickEvent = this._btnClickEvent.bind(this);
        this._handleChangeEvent = this._handleChangeEvent.bind(this);
    }

    render() {
        const { questions, editPage } = this.props;
        const page = questions[editPage - 1];

        return (
            <div className="modalEditPanel">
                <div id="editPanel" className="editpanel">
                    <div>Edit Page</div>
                    <div className={styles.item}>
                        Page #{page.page}:&nbsp;
                        <input
                            type="text"
                            value={page.description}
                            onChange={this._handleChangeEvent}
                        />
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
            const { editPageActions } = this.props;
            editPageActions.stopEditPage();
        }
    }

    _handleChangeEvent(e) {
        const { editPage, questionsActions } = this.props;
        const data = { description: e.target.value || values.PAGE_TITLE };
        questionsActions.editPageTitle(editPage, data);
    }
}

export default EditPage;
