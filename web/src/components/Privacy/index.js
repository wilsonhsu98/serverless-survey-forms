/**
 * @module Privacy
 * Privacy agreement component
 *
 **/
import styles from './style.css';

import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';
import classNames from 'classnames';
import I18Next from 'i18next';

class Privacy extends PureComponent {

    render() {
        const { info } = this.props;
        return (
            <div ref="root" className="question">
                <div
                    className={classNames({
                        [`${styles.question}`]: true,
                        'ut-label': true
                    })}
                >{info.label}
                </div>
                <div className={styles.terms}>
                    <div className={styles.topWrapper}>
                        <input type="checkbox" />
                        <div
                            className={classNames({
                                [`${styles.desc}`]: true,
                                'ut-terms': true
                            })}
                        >
                        {info.terms}
                        </div>
                    </div>
                    <div className={styles.bottomWrapper}>
                        <input type="text" placeholder={info.input} />
                        <button className={styles.btn}>{I18Next.t('participate')}</button>
                    </div>
                </div>
            </div>
        );
    }

}

Privacy.PropTypes = {
    item: PropTypes.object.isRequired,
    onChangeHandle: PropTypes.func.isRequired
};

Privacy.defaultProps = {};

export default Privacy;
