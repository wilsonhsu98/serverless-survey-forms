/**
 * @module Privacy
 **/

// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';
import $ from 'jquery';

class Privacy extends PureComponent {

    constructor(props) {
        super(props);
        this._onChangeHandle = this._onChangeHandle.bind(this);
    }

    render() {
        const { surveyPolicy } = this.props;
        const chk = surveyPolicy.privacy.hasOwnProperty('label');

        return (
            <div ref="root">
                <hr className={styles.hr} />
                <div className={styles.title}>Thank You Page: Thank You!</div>
                <div className={styles.box}>
                    <div className={styles.upper}>
                        Thanks for sharing your feedback with Trend Micro.
                    </div>
                    <hr className={styles.separate} />
                    <div className={styles.lower}>
                        <div className={styles.lower_txt}>Post Survey Options</div>
                        <div className={`${styles.checkboxItem} checkboxItem`}>
                            <input
                                id="chk"
                                type="checkbox"
                                className="ut-chk"
                                checked={chk}
                                onChange={this._onChangeHandle}
                            />
                            <label htmlFor="chk">
                                Let Trend Micro follow up later
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    _onChangeHandle() {
        const { questionsActions } = this.props;
        questionsActions.editSurveyPolicy($('#chk').is(':checked'));
    }
}

export default Privacy;
