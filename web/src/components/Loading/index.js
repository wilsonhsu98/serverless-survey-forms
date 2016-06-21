
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';

class Loading extends PureComponent {

    render() {
        return (
            <div className={styles.loading}>
                <div className={styles.loading_wrap}>
                    <div className={styles.loading_line}></div>
                    <div className={styles.loading_line}></div>
                    <div className={styles.loading_line}></div>
                </div>
            </div>
        );
    }
}

export default Loading;
