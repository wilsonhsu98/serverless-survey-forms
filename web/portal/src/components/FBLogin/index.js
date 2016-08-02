
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
                <div className={styles.content}>
                    <div className={styles.title}>The survey form you ever need</div>
                    <div className={styles.description}>
                        Cras quis nulla commodo, aliquam lectus sed, blandit augue.
                        Crasullamcorper bibendum bibendum.
                        Duis tincidunt urna non pretium porta.
                        Nam condimentum vitae ligula vel ornare. Phasellus atsemper turpis.
                        Nunc eu tellus tortor. Etiam at condimentum nisl, vitae sagittis orci.
                        Donec id dignissim nunc. Donec elit ante, eleifend a dolor et,
                        venenatis facilisis dolor. In feugiat orci odio,
                        sedlacinia sem elementum quis.
                        Aliquam consectetur, eros etvulputate euismod,
                        nunc leo tempor lacus, ac rhoncus neque erosnec lacus.
                        Cras lobortis molestie faucibus.
                    </div>
                    <div className={styles.grantBtn}>
                        <Button
                            string="Log in with your Facebook"
                            i18nKey={false}
                            color="ruby"
                            size="medium"
                            onClick={this._onClickFBBtn}
                        />
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
