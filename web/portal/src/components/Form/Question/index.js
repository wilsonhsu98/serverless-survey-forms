/**
 * @module Question
 * question text
 **/

// CSS
import styles from './style.css';

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class Question extends Component {

    render() {
        const { id, text, required } = this.props;
        return (
            <div ref="root">
                <span
                    className={classNames({
                        [`${styles.question}`]: true,
                        [`${styles.required}`]: required
                    })}
                >
                    {`${id}. ${text}`}
                </span>
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
