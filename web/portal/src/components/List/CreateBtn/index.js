
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';

class CreateBtn extends PureComponent {

    constructor() {
        super();
        this._onAddSurveyClick = this._onAddSurveyClick.bind(this);
    }

    render() {
        return (
            <div ref="root" className={styles.control}>
                <div className={styles.createBtn} onClick={this._onAddSurveyClick}>
                    <span className={styles.icon}>+</span>
                    <span>Create Survey</span>
                </div>
            </div>
        );
    }

    _onAddSurveyClick() {
        const { editSubjectActions } = this.props;
        editSubjectActions.openEdit(true);
    }
}

export default CreateBtn;
