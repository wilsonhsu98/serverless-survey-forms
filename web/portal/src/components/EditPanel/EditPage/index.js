
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
        const { editPage } = this.props;

        return (
            <div className="modalEditPanel">
                <div id="editPanel" className="editpanel">
                    <div className="edit">
                        <div className="editContent">
                            <div>Edit Page</div>
                            <div className={styles.item}>
                                Page #{editPage.page}:&nbsp;
                                <input
                                    type="text"
                                    value={editPage.description}
                                    onChange={this._handleChangeEvent}
                                />
                            </div>
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
        const { editPage, editPageActions, questionsActions } = this.props;
        if (e.target.getAttribute('data-type') === 'cancel') {
            editPageActions.stopEditPage();
        } else if (e.target.getAttribute('data-type') === 'save') {
            // save editPage to Question
            questionsActions.editPageTitle(editPage.page, editPage.description);
            editPageActions.stopEditPage();
        }
    }

    _handleChangeEvent(e) {
        const { editPage, editPageActions } = this.props;
        const data = { description: e.target.value || values.PAGE_TITLE };
        editPageActions.setEditPage(data);
    }
}

export default EditPage;
