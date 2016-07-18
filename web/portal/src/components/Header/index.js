
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';

class Header extends PureComponent {

    render() {
        return (
            <div className={styles.header}>
                <div className={styles.container}>
                    <div className={styles.trend}>
                        <div className={styles.logo}></div>
                        <h1 className={styles.title}>Qustom</h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
