/**
 * @module Privacy
 **/

// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';

class Privacy extends PureComponent {

    render() {
        // const { text } = this.props;
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
                        <div className={styles.lower_txt}>Post Survey Option</div>
                        <input type="checkbox" />
                        <label className={styles.label}>
                            Allow Trend Micro to follow up with the user
                        </label>
                    </div>
                </div>
            </div>
        );
    }

}

export default Privacy;
