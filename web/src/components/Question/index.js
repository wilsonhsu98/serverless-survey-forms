/**
 * @module Question
 * question text
 **/

// CSS
import styles from './style.css';

import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';
import $ from 'jquery';

class Question extends PureComponent {

    componentDidMount() {
        $(this.refs.root).localize();
    }

    componentDidUpdate() {
        $(this.refs.root).localize();
    }

    render() {
        const { id, text, required } = this.props;
        return (
            <div ref="root">
                <div className={styles.question}>{`Q${id}. ${text}`}</div>
                {required ? <span className={styles.required} data-i18n="basic.required" /> : ''}
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
