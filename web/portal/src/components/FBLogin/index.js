
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';
import { push } from 'react-router-redux';

import Config from '../../config';

class FBLogin extends PureComponent {

    constructor() {
        super();
        this._onClickFBBtn = this._onClickFBBtn.bind(this);
    }

    render() {
        return (
            <div ref="root" className={styles.wrap}>
                <div className={styles.wording}>
                    <div className={styles.title}>The survey form you ever need</div>
                    <div className={styles.description}>Cras quis nulla commodo, aliquam lectus sed, blandit augue. Crasullamcorper bibendum bibendum. Duis tincidunt urna non pretium porta. Nam condimentum vitae ligula vel ornare. Phasellus atsemper turpis. Nunc eu tellus tortor. Etiam at condimentum nisl, vitae sagittis orci. Donec id dignissim nunc. Donec elit ante, eleifend a dolor et, venenatis facilisis dolor. In feugiat orci odio, sedlacinia sem elementum quis. Aliquam consectetur, eros etvulputate euismod, nunc leo tempor lacus, ac rhoncus neque erosnec lacus. Cras lobortis molestie faucibus.</div>

                    <button className={styles.grantBtn} onClick={this._onClickFBBtn}>Log in with your Facebook</button>
                </div>

                <div className={styles.photo}>
                </div>
            </div>
        );
    }

    _onClickFBBtn() {
        // window.location.href = `${Config.baseURL}/authentication/signin/Facebook`;

        // TODOS: integrate with backend authentication API
        window.localStorage["QustomPortalTK"] = 'FAKE_TOKEN';
        window.location.href = '/';
    }
}

export default FBLogin;
