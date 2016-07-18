
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
            <div ref="root" className={styles.list}>
                {surveys.length > 0 ?
                    this._renderList() :
                    <div className={styles.description}>No survey. Just create one.</div>}
            </div>
        );
    }

    _renderList() {
        // TODOS:
    }
}

export default SurveyList;
