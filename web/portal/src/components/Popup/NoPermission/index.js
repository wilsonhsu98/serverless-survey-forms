
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';

import Config from '../../../config';
import Button from '../../Button';

class NoPermission extends PureComponent {

    constructor() {
        super();

        this._btnClickEvent = this._btnClickEvent.bind(this);
    }

    render() {
        return (
            <div className={`${styles.popup} popup`}>
                <div className={`${styles.wrap} wrap`}>
                    <div className={`${styles.content} content`}>
                        <div className={styles.title}>
                            Please wait for admin setting permission.
                        </div>
                        <div className={`bottom ${styles.bottom}`}>
                            <Button
                                string="Contact Admin"
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
        window.open(`mailto:${Config.adminEmail}`);
    }
}

export default NoPermission;
