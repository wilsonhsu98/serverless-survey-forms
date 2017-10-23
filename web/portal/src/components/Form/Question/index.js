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
            <div
                ref="root"
                className={classNames({
                    [`${styles.question}`]: true,
                    [`${styles.required}`]: required
                })}
            >
                <div>{`${id}.`}</div>
                <div dangerouslySetInnerHTML={this._handleQuestionTitle(text)} />
            </div>
        );
    }

    _handleQuestionTitle(text) {
        return { __html: text.replace(/(\r\n|\r|\n)/g, '<br />') };
    }

}

Question.PropTypes = {
    id: PropTypes.number.isRequired,
    text: PropTypes.string,
    required: PropTypes.bool
};

Question.defaultProps = {};

export default Question;
