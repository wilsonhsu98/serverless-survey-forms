
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';
import moment from 'moment';

class SurveyList extends PureComponent {

    constructor() {
        super();
        this._renderList = this._renderList.bind(this);
        this._onClickEdit = this._onClickEdit.bind(this);
        this._toggleChange = this._toggleChange.bind(this);
    }

    render() {
        const { surveys } = this.props;
        return (
            <div ref="root" className={`${styles.list} ${surveys.length === 0 ? 'nodata' : ''}`}>
                {surveys.length > 0 ?
                    this._renderList() :
                    <div className={styles.description}>No survey. Just create one.</div>}
            </div>
        );
    }

    _renderList() {
        const { surveys, selectedSurveys } = this.props;
        let list = [];
        surveys.forEach((item, idx) => {
            const title = !item.count ?
                (<a
                    className="link ut-title"
                    data-id={item.surveyid}
                    onClick={this._onClickEdit}
                >{item.subject}</a>) :
                (<span className="link disabled ut-title">{item.subject}</span>);
            const tr = (
                <tr key={idx}>
                    <td className={styles.subject}>
                        <div className="checkboxItem ut-list">
                            <input
                                type="checkbox"
                                className={styles.checkbox}
                                value={item.surveyid}
                                checked={item.surveyid === selectedSurveys}
                                onChange={this._toggleChange}
                            />
                            <label></label>
                            {title}
                        </div>
                    </td>
                    <td className={`${styles.response} ut-count`}>{item.count}</td>
                    <td className={styles.dt}>{moment(item.datetime).format('LLL')}</td>
                </tr>
            );
            list.push(tr);
        });
        return (
            <table className={styles.listTb}>
                <thead>
                    <tr>
                        <th className={styles.subject}>
                            <span>Name</span>
                        </th>
                        <th className={styles.response}>
                            <span>Responses</span>
                        </th>
                        <th className={styles.dt}>
                            <span>Date Updated</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {list}
                </tbody>
            </table>
        );
    }

    _toggleChange(e) {
        const { surveysActions } = this.props;
        surveysActions.toggleSelectedSurveys(e.currentTarget.value);
    }

    _onClickEdit(e) {
        const { questionsActions } = this.props;
        questionsActions.getQuestion(e.currentTarget.getAttribute('data-id'));
    }
}

export default SurveyList;
