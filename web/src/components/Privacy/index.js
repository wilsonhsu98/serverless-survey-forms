/**
 * @module Privacy
 * Privacy agreement component
 *
 **/
import styles from './style.css';

import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';
import classNames from 'classnames';
import Button from '../Button';

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
                        <div className="checkboxItem">
                            <input type="checkbox" />
                            <label
                                className={classNames({
                                    'ut-terms': true
                                })}
                            >
                            {info.terms}
                            </label>
                        </div>
                    </div>
                    <div className={styles.bottomWrapper}>
                        <input type="text" placeholder={info.input} />
                        <Button
                            string={'participate'}
                            onClick={this._participate}
                            extraClass={{
                                'ut-participate': true,
                                [`${styles.btn}`]: true
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }

    _participate() {
        console.log('TODO: participate callback');
    }

}

Privacy.PropTypes = {
    item: PropTypes.object.isRequired,
    onChangeHandle: PropTypes.func.isRequired
};

Privacy.defaultProps = {};

export default Privacy;
