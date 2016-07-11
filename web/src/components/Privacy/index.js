/**
 * @module Privacy
 * Privacy agreement component
 *
 **/
import styles from './style.css';

import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';
import classNames from 'classnames';

class Privacy extends PureComponent {

    render() {
        const { item } = this.props;
        return (
            <div ref="root" className="question">
                <div
                    className={classNames({
                        [`${styles.question}`]: true,
                        'ut-label': true
                    })}
                >{item.label}
                </div>
                <div className={styles.terms}>
                    <input type="checkbox" />
                    <div
                        className={classNames({
                            [`${styles.desc}`]: true,
                            'ut-terms': true
                        })}
                    >
                    {item.terms}
                    </div>
                    <input type="text" placeholder={item.input} />
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
