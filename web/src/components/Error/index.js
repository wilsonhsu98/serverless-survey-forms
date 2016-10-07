/**
 * @module Error msg
 * Error msg in form
 **/

// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';

class Error extends PureComponent {

    render() {
        const { msg } = this.props;
        return (
            <span ref="root" className={styles.error}>
                {msg}
            </span>
        );
    }
}

export default Error;
