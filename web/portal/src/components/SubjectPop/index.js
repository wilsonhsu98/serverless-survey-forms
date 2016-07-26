
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
        const { subject } = this.props;
        return (
            <div className={styles.popup}>
                <div className={styles.wrap}>
                    <div
                        data-type="cancel"
                        className={`${styles.close} close`}
                        onClick={this._btnClickEvent}
                    >X</div>
                    <div className={styles.content}>
                        <div className={styles.title}>What would you like to name this survey?</div>
                        <input
                            id="subject"
                            className={`${styles.input} input input--medium`}
                            type="text"
                            defaultValue={subject}
                            placeholder="Subject Name"
                            onChange={this._handleInput}
                        />
                        <div id="msg" className={`${styles.input__msg} input__msg`}></div>

                        <div className={`bottom ${styles.bottom}`}>
                            <button
                                data-type="save"
                                className={`${styles.button} button button--medium button--red`}
                                onClick={this._btnClickEvent}
                            >
                                Save
                            </button>
                            <button
                                data-type="cancel"
                                className={`${styles.button} button button--medium`}
                                onClick={this._btnClickEvent}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    _handleInput() {
        const msg = document.getElementById('msg');
        if (msg.innerHTML.length) msg.innerHTML = '';
    }

    _btnClickEvent(e) {
        const { surveyID, editSubjectActions, subjectActions } = this.props;
        const msg = document.getElementById('msg');
        msg.innerHTML = '';

        if (e.target.getAttribute('data-type') === 'cancel') {
            editSubjectActions.openEdit(false);
        } else if (e.target.getAttribute('data-type') === 'save') {
            const subject = document.getElementById('subject').value;
            if (subject === '') {
                msg.innerHTML = 'Please fill the subject';
            } else {
                if (!surveyID) {
                    subjectActions.saveSubject(subject);
                } else {
                    subjectActions.editSubject(subject);
                }
            }
        }
    }
}

export default SubjectPop;
