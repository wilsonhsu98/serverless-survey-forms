
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';

class Loading extends PureComponent {

    render() {
        return (
            <div className={styles.loading}>
                <div className={styles.wrap}>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                </div>
            </div>
        );
    }
}

export default Loading;
