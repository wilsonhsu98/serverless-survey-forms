/**
 * @module Question
 * question text
 **/

// CSS
import styles from './style.css';

import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';
import classNames from 'classnames';

class Question extends PureComponent {

    render() {
        const { id, text, required } = this.props;
        return (
            <div
                ref="root"
                className={classNames({
                    [`${styles.question}`]: true,
                    [`${styles.required}`]: required,
                    'ut-question': true,
                    'ut-required': required
                })}
            >
                <div>{`${id}.`}</div>
                <div dangerouslySetInnerHTML={this._handleQuestionTitle(text)} />
                {this.props.children}
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
