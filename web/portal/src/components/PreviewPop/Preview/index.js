
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';

import Qustom from '../../../../../src/index';

class Preview extends PureComponent {

    constructor() {
        super();

        this._btnClickEvent = this._btnClickEvent.bind(this);
    }

    render() {
        const { account, previewID, preview } = this.props;
        const type = preview === 'embedded' ? preview : 'preview';

        return (
            <div className={styles.popup}>
                <div className={styles.wrap}>
                    <button
                        type="button"
                        onClick={this._btnClickEvent}
                        className={`${styles.close} close`}
                        data-type="cancel"
                    >×
                    </button>
                    <div className={styles.content}>
                        <div className={styles.title}>Preview</div>
                        <div className={styles.preview}>
                            <Qustom
                                accountid={account.accountid}
                                surveyid={previewID}
                                type={type}
                                localize_path="../../../../../assets/L10N"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    _btnClickEvent() {
        const { previewActions } = this.props;
        previewActions.closePreview();
    }
}

export default Preview;
