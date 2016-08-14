
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';

import config from '../../../config';
import IconButton from '../../IconButton';

class ControlBtn extends PureComponent {

    constructor() {
        super();
        this._onDeleteSurveyClick = this._onDeleteSurveyClick.bind(this);
        this._onAddSurveyClick = this._onAddSurveyClick.bind(this);
        this._onPreviewSurveyClick = this._onPreviewSurveyClick.bind(this);
        this._onReportSurveyClick = this._onReportSurveyClick.bind(this);
    }

    render() {
        const { selectedSurveys } = this.props;
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
                        disabled={!selectedSurveys.length}
                        onClick={this._onPreviewSurveyClick}
                    />
                    <IconButton
                        id="reportBtn"
                        string="Report"
                        i18nKey={false}
                        img="report"
                        disabled
                        onClick={this._onReportSurveyClick}
                    />
                    <IconButton
                        id="delBtn"
                        string="Delete"
                        i18nKey={false}
                        img="delete"
                        disabled={!selectedSurveys.length}
                        onClick={this._onDeleteSurveyClick}
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

    _onDeleteSurveyClick() {
        const { surveysActions } = this.props;
        surveysActions.deleteSurvey();
    }

    _onReportSurveyClick() {
        const { account, selectedSurveys } = this.props;
        const url = `${config.baseURL}/api/v1/mgnt/report/`;
        window.open(`${url}${account.accountid}/${selectedSurveys}`, '_blank');
    }

    _onPreviewSurveyClick() {
        const { account, selectedSurveys } = this.props;
        const url = `${config.baseURL}/feedback/index.html`;
        window.open(`${url}?accountid=${account.accountid}&surveyid=${selectedSurveys}`, '_blank');
    }
}

export default ControlBtn;
