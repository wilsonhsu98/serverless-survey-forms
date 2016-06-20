/**
 * @module Question
 * question text
 **/

import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';

class Question extends PureComponent {

    componentDidMount() {
        // TODO: i18n
    }

    componentDidUpdate() {
        // TODO: i18n
    }

    render() {
        const { id, text } = this.props;
        return (
            <div className="question"><h2>{`Q${id}. ${text}`}</h2></div>
        );
    }

}

Question.PropTypes = {
    id: PropTypes.number.isRequired,
    text: PropTypes.string
};

Question.defaultProps = {};

export default Question;
