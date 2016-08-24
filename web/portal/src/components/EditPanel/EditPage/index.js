
// CSS
import styles from './style.css';

import React from 'react';

import * as values from '../../../constants/DefaultValues';
import FixComponent from '../../FixComponent';
import Button from '../../Button';

class EditPage extends FixComponent {

    constructor() {
        super();

        this._btnClickEvent = this._btnClickEvent.bind(this);
        this._handleChangeEvent = this._handleChangeEvent.bind(this);
        this._handleFocusEvent = this._handleFocusEvent.bind(this);
    }

    render() {
        const { editPage } = this.props;

        return (
            <div className="modalEditPanel">
                <div id="editPanel" className="editpanel">
                    <div className="edit">
                        <div className="editContent">
                            <div className={styles.item}>
                                <div className={styles.title}>Page {editPage.page}:</div>
                                <div className={styles.field}>
                                    <input
                                        id="pageTxt"
                                        type="text"
                                        value={editPage.description}
                                        onChange={this._handleChangeEvent}
                                        onFocus={this._handleFocusEvent}
                                        className={`${styles.input} input input--medium`}
                                    />
                                    <div className="input__msg js-msg"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bottom">
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
        const { editPageActions, questionsActions } = this.props;
        const msg = document.getElementsByClassName('js-msg')[0];
        msg.innerHTML = '';

        if (e.currentTarget.getAttribute('data-type') === 'cancel') {
            editPageActions.stopEditPage();
        } else if (e.currentTarget.getAttribute('data-type') === 'save') {
            // Error handling
            const pageTxt = document.getElementById('pageTxt');
            if (pageTxt.value === '') {
                msg.innerHTML = 'Please fill page title';
            } else {
                // save editPage to Question
                questionsActions.editPageTitle();
                questionsActions.saveQuestion();
                editPageActions.stopEditPage();
            }
        }
    }

    _handleChangeEvent(e) {
        const { editPageActions } = this.props;
        const data = { description: e.target.value };
        editPageActions.setEditPage(data);
    }

    _handleFocusEvent(e) {
        const target = e.target;
        if (target.value === values.PAGE_TITLE) {
            target.value = '';
        }
    }
}

export default EditPage;
