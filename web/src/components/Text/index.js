/**
 * @module Text
 *
 *  {'type': 'text',
 *   'label': 'I am single line text'
 *  }
 **/

// CSS
// import styles from './style.css';

import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';

import Question from '../Question/index';

class Text extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            input: ''
        };
        this._onChangeHandle = this._onChangeHandle.bind(this);
    }

    render() {
        const { id, item } = this.props;
        return (
            <div ref="root" className="question">
                <Question
                    id={id}
                    text={item.label}
                    required={item.required}
                />
                <div>
                    <input
                        id={`text_${id}`}
                        type="text"
                        onChange={this._onChangeHandle}
                        value={this.state.input}
                    />
                </div>
            </div>
        );
    }

    _onChangeHandle(e) {
        this.setState({
            input: e.target.value
        }, () => {
            const feedback = {
                [`Q${this.props.id}`]: this.state.input
            };
            this.props.onChangeHandle(feedback);
        });
    }

}

Text.PropTypes = {
    id: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired,
    onChangeHandle: PropTypes.func.isRequired
};

Text.defaultProps = {};

export default Text;
