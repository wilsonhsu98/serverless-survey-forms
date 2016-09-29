
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
        this._onCopySurveyClick = this._onCopySurveyClick.bind(this);
        this._onAddSurveyClick = this._onAddSurveyClick.bind(this);
        this._onPreviewSurveyClick = this._onPreviewSurveyClick.bind(this);
        this._onReportSurveyClick = this._onReportSurveyClick.bind(this);
    }

    render() {
        const { selectedSurveys, selectedUser } = this.props;
        const btnsData = [
            { id: 'createBtn', string: 'Create Survey', img: '', func: this._onAddSurveyClick },
            { id: 'shareBtn', string: 'Share', img: 'share', func: this._onPreviewSurveyClick },
            { id: 'reportBtn', string: 'Report', img: 'report', func: this._onReportSurveyClick },
            { id: 'copyBtn', string: 'Duplicate', img: 'report', func: this._onCopySurveyClick },
            { id: 'delBtn', string: 'Delete', img: 'delete', func: this._onDeleteSurveyClick }
        ];
        let btns = [];
        btnsData.forEach((btn, idx) => {
            if ((idx === 0 && !selectedUser.hasOwnProperty('accountid'))
                || (idx !== 0 && selectedSurveys !== '')) {
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
        const { popupActions } = this.props;
        popupActions.setPopup('deleteOneSurvey');
    }

    _onCopySurveyClick() {
        const { surveysActions } = this.props;
        surveysActions.copySurvey();
    }

    _onReportSurveyClick() {
        const { surveysActions } = this.props;
        surveysActions.exportSurvey();
    }

    _onPreviewSurveyClick() {
        const { account, selectedSurveys, selectedUser } = this.props;
        const url = `${config.baseURL}/feedback/index.html`;
        // selected user account or user's account
        const accountid = selectedUser.hasOwnProperty('accountid') ?
            selectedUser.accountid : account.accountid;
        window.open(`${url}?accountid=${accountid}&surveyid=${selectedSurveys}`, '_blank');
    }
}

export default ControlBtn;
