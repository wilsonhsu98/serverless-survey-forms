
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';
import IconButton from '../../IconButton';

class CreateBtn extends PureComponent {

    constructor() {
        super();
        this._onAddSurveyClick = this._onAddSurveyClick.bind(this);
    }

    render() {
        return (
            <div ref="root" className={styles.control}>
                <div className={styles.wrap}>
                    <IconButton
                        id="createBtn"
                        string="Create Survey"
                        i18nKey={false}
                        onClick={this._onAddSurveyClick}
                    />
                    <IconButton
                        id="shareBtn"
                        string="Share"
                        i18nKey={false}
                        img="share"
                        disabled
                        onClick={this._onAddSurveyClick}
                    />
                    <IconButton
                        id="reportBtn"
                        string="Report"
                        i18nKey={false}
                        img="report"
                        disabled
                        onClick={this._onAddSurveyClick}
                    />
                    <IconButton
                        id="delBtn"
                        string="Delete"
                        i18nKey={false}
                        img="delete"
                        disabled
                        onClick={this._onAddSurveyClick}
                    />
                </div>
                <div className={styles.bird}></div>
            </div>
        );
    }

    _onAddSurveyClick() {
        const { editSubjectActions } = this.props;
        editSubjectActions.openEdit(true);
    }
}

export default CreateBtn;
