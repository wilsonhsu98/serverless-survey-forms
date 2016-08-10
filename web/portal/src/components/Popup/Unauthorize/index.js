
// CSS
import styles from './style.css';

import React from 'react';
import FixComponent from '../../FixComponent';

import Config from '../../../config';
import Button from '../../Button';

class Unauthorize extends FixComponent {

    constructor() {
        super();

        this._btnClickEvent = this._btnClickEvent.bind(this);
    }

    render() {
        return (
            <div className={`${styles.popup} popup`}>
                <div className={`${styles.wrap} wrap`}>
                    <div className={`${styles.content} content`}>
                        <div className={styles.title}>Token expired. You have to log in again.</div>
                        <div className={`bottom ${styles.bottom}`}>
                            <Button
                                string="Log in"
                                i18nKey={false}
                                color="ruby"
                                onClick={this._btnClickEvent}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    _btnClickEvent() {
        window.location.href = `${Config.baseURL}/authentication/signin/facebook`;
    }
}

export default Unauthorize;
