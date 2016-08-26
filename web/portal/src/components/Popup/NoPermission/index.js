
// CSS
import styles from './style.css';

import React from 'react';
import FixComponent from '../../FixComponent';

import Config from '../../../config';

class NoPermission extends FixComponent {

    constructor() {
        super();

        this._btnClickEvent = this._btnClickEvent.bind(this);
    }

    render() {
        return (
            <div className={`${styles.popup} popup`}>
                <div className="popup_wrap">
                    <div className={`${styles.wrap} wrap`}>
                        <div className={`${styles.content} content`}>
                            <div className={styles.title}>
                                Your application of using Qustom is under evaluation.&nbsp;
                                We’ll inform you once it’s done.&nbsp;
                                Want to accelerate the process?&nbsp;
                                <a className="link" onClick={this._btnClickEvent}>
                                    Contact system admin.
                                </a>
                            </div>
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
