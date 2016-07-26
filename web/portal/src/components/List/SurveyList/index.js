
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';

class SurveyList extends PureComponent {

    constructor() {
        super();
        this._renderList = this._renderList.bind(this);
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
        const { surveys } = this.props;
        let list = [];
        surveys.forEach((item, idx) => {
            const dt = new Date(item.datetime);
            const tr = (
                <tr key={idx}>
                    <td>{item.subject}</td>
                    <td>100</td>
                    <td>{dt.toString()}</td>
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
                            <span>Response</span>
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
}

export default SurveyList;
