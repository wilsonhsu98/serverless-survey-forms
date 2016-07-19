
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';

class SubjectPop extends PureComponent {

    constructor() {
        super();

        this._btnClickEvent = this._btnClickEvent.bind(this);
    }

    render() {
        return (
            <div className={styles.popup}>
                <div className={styles.content}>
                    <div className={styles.title}>What would you like to name this survey?</div>
                    <input
                        id="subject"
                        className={styles.input}
                        type="text"
                        placeholder="Subject Name"
                    />

                    <div className={`bottom ${styles.buttom}`}>
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
        const { account, token, editSubjectActions, subjectActions } = this.props;

        if (e.target.getAttribute('data-type') === 'cancel') {
            editSubjectActions.openEdit(false);
        } else if (e.target.getAttribute('data-type') === 'save') {
            const subject = document.getElementById('subject').value;
            if (subject === '') {
                alert('Please fill the subject');
            } else {
                subjectActions.saveSubject(subject, account.accountid, token);
            }
        }
    }
}

export default SubjectPop;
