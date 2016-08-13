/**
 * @module Question
 * question text
 **/

// CSS
import styles from './style.css';

import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';
import I18Next from 'i18next';
import classNames from 'classnames';

class Question extends PureComponent {

    render() {
        const { id, text, required } = this.props;
        return (
            <div ref="root">
                <div
                    className={classNames({
                        [`${styles.question}`]: true,
                        'ut-question': true
                    })}
                >
                    {`${id}. ${text}`}
                </div>
                {required ?
                    <span
                        className={classNames({
                            [`${styles.required}`]: true,
                            'ut-required': true
                        })}
                    >
                        {I18Next.t('basic.required')}
                    </span> : ''}
            </div>
        );
    }
}

Question.PropTypes = {
    id: PropTypes.number.isRequired,
    text: PropTypes.string,
    required: PropTypes.bool
};

Question.defaultProps = {};

export default Question;
