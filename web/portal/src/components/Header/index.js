
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';

class Header extends PureComponent {

    constructor() {
        super();
        this._onEditSubject = this._onEditSubject.bind(this);
        this._onBackClick = this._onBackClick.bind(this);
    }

    render() {
        const { subject, surveyID } = this.props;
        let content;
        if (surveyID) {
            content = (
                <div className={styles.qustom}>
                    <div
                        className={styles.back}
                        onClick={this._onBackClick}
                    ></div>
                    <div
                        id="title"
                        className={styles.title}
                        onClick={this._onEditSubject}
                    >
                        {subject}
                    </div>
                    <div className={styles.build}>
                        <div className={styles.status}>Build</div>
                    </div>
                </div>
            );
        } else {
            content = (
                <div className={styles.trend}>
                    <div className={styles.logo}></div>
                    <h1 className={styles.title}>Qustom</h1>
                </div>
            );
        }

        return (
            <div id="header" className={`${styles.header} ${surveyID ? styles.edit : ''}`}>
                <div className={styles.container}>
                    {content}
                </div>
            </div>
        );
    }

    _onEditSubject() {
        const { editSubjectActions } = this.props;
        editSubjectActions.openEdit(true);
    }

    _onBackClick() {
        const { questionsActions } = this.props;
        questionsActions.finishEdit('');
    }
}

export default Header;
