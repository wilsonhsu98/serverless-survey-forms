
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';

class L10nList extends PureComponent {

    constructor() {
        super();
        this._renderList = this._renderList.bind(this);
        this._onClickEdit = this._onClickEdit.bind(this);
        this._toggleChange = this._toggleChange.bind(this);
    }

    render() {
        const { surveyL10n } = this.props;
        const l10n = Object.keys(surveyL10n);

        return (
            <div ref="root" className={`${styles.list} ${l10n.length === 0 ? 'nodata' : ''}`}>
                {l10n.length > 0 ?
                    this._renderList() :
                    <div className={styles.description}>No l10n data.</div>}
            </div>
        );
    }

    _renderList() {
        const { surveyL10n, selectedL10n } = this.props;
        let list = [];
        Object.keys(surveyL10n).forEach((item, idx) => {
            const language = (
                <a
                    className="link ut-title"
                    data-id={item}
                    onClick={this._onClickEdit}
                >{item}</a>);
            const tr = (
                <tr key={idx}>
                    <td className={styles.subject}>
                        <div className={`${styles.checkboxItem} checkboxItem ut-list`}>
                            <input
                                type="checkbox"
                                className={styles.checkbox}
                                value={item}
                                checked={item === selectedL10n}
                                onChange={this._toggleChange}
                            />
                            <label></label>
                            {language}
                        </div>
                    </td>
                </tr>
            );
            list.push(tr);
        });
        return (
            <table className={styles.listTb}>
                <thead>
                    <tr>
                        <th className={styles.subject}>
                            <span>Language</span>
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
        const { questionsActions } = this.props;
        questionsActions.toggleSelectedL10n(e.currentTarget.value);
    }

    _onClickEdit() {

    }
}

export default L10nList;
