
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';
import classNames from 'classnames';

class Footer extends PureComponent {

    render() {
        return (
            <footer
                className={classNames({
                    [styles['trend-footer']]: true
                })}
            >
                <div className={styles.container}>
                    <div
                        className={classNames({
                            [styles['row-fluid']]: true,
                            [styles['footer-wrapper']]: true
                        })}
                    >
                        <div className={styles['footer-links']}>
                            <a
                                className={styles.link}
                                target="_blank"
                                href="http://www.trendmicro.com/us/about-us/legal-policies/privacy-statement/index.html"
                            >Privacy Policy</a>
                            <a
                                className={styles.link}
                                id="footercontactus"
                                target="_blank"
                                href="http://www.trendmicro.com/us/about-us/contact/index.html"
                            >Contact Us</a>
                            <a
                                className={styles.link}
                                target="_blank"
                                href="http://www.trendmicro.com"
                            >TrendMicro.com</a>
                        </div>
                        <div
                            className={styles.copyright}
                        >
                            Copyright © {(new Date()).getFullYear()}
                            Trend Micro Incorporated. All rights reserved
                        </div>
                        <span className={styles['tm-logo']}></span>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
