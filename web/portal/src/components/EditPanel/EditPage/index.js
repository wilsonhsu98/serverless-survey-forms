
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';

import Button from '../../Button';

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
                            <div className={styles.item}>
                                Page #{editPage.page}:&nbsp;
                                <input
                                    type="text"
                                    value={editPage.description}
                                    onChange={this._handleChangeEvent}
                                    className={`${styles.input} input input--small`}
                                />
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
        if (e.currentTarget.getAttribute('data-type') === 'cancel') {
            editPageActions.stopEditPage();
        } else if (e.currentTarget.getAttribute('data-type') === 'save') {
            // save editPage to Question
            questionsActions.editPageTitle();
            questionsActions.saveQuestion();
            editPageActions.stopEditPage();
        }
    }

    _handleChangeEvent(e) {
        const { editPageActions } = this.props;
        const data = { description: e.target.value };
        editPageActions.setEditPage(data);
    }
}

export default EditPage;
