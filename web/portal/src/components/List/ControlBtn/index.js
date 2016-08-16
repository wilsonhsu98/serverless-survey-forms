
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
        const btnsData = [
            { id: 'createBtn', string: 'Create Survey', img: '', func: this._onAddSurveyClick },
            { id: 'shareBtn', string: 'Share', img: 'share', func: this._onPreviewSurveyClick },
            { id: 'reportBtn', string: 'Report', img: 'report', func: this._onReportSurveyClick },
            { id: 'delBtn', string: 'Delete', img: 'delete', func: this._onDeleteSurveyClick }
        ];
        let btns = [];
        btnsData.forEach((btn, idx) => {
            if (idx === 0 || selectedSurveys !== '') {
                btns.push(
                    <IconButton
                        key={idx}
                        id={btn.id}
                        string={btn.string}
                        i18nKey={false}
                        img={btn.img}
                        onClick={btn.func}
                    />);
            }
        });

        return (
            <div ref="root" className={styles.control}>
                <div className={styles.wrap}>{btns}</div>
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
        window.open(`${url}${account.accountid}/${selectedSurveys}?v=${Date.now()}`, '_blank');
    }

    _onPreviewSurveyClick() {
        const { account, selectedSurveys } = this.props;
        const url = `${config.baseURL}/feedback/index.html`;
        window.open(`${url}?accountid=${account.accountid}&surveyid=${selectedSurveys}`, '_blank');
    }
}

export default ControlBtn;
