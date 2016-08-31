
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';

import Config from '../../config';
import Button from '../Button';

class FBLogin extends PureComponent {

    constructor() {
        super();
        this._onClickFBBtn = this._onClickFBBtn.bind(this);
    }

    render() {
        return (
            <div ref="root" className={styles.wrap}>
                <div className={styles.content_bg}></div>
                <div className={styles.container}>
                    <div className={styles.content}>
                        <div className={styles.title}>Thanks for Participating</div>
                        <div className={styles.description}>
                            Ready to get started?
                        </div>
                        <div className={styles.grantBtn}>
                            <Button
                                string="Sign in with Facebook"
                                i18nKey={false}
                                color="ruby"
                                size="medium"
                                onClick={this._onClickFBBtn}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.photo}></div>
            </div>
        );
    }

    _onClickFBBtn() {
        window.location.href = `${Config.baseURL}/authentication/signin/facebook`;
    }
}

export default FBLogin;
