/**
 * @module Scale
 *
 *  {'type': 'scale',
 *   'label': 'I am scale question text',
 *   'data': [
 *       {'value': '1', 'label': 'scale label 1'},
 *       {'value': '2', 'label': 'scale label 2'},
 *       {'value': '3', 'label': 'scale label 3'},
 *       ...
 *   ]
 *  }
 **/

// CSS
import styles from './style.css';

import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';
import classNames from 'classnames';

import Question from '../Question/index';

class Scale extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            selected: false
        };
        this._onChangeHandle = this._onChangeHandle.bind(this);
        this._renderLabel = this._renderLabel.bind(this);
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
                <div className={styles.scaleWrapper}>
                    <ul className={styles.scaleGrp}>
                        {this._renderLabel(item.data[0])}
                        {this._renderScaleItem()}
                        {this._renderLabel(item.data[item.data.length - 1])}
                    </ul>
                    {
                        item.input ?
                            <input type="text" placeholder={item.input} /> : ''
                    }
                </div>
            </div>
        );
    }

    _renderScaleItem() {
        const { id, item } = this.props;
        const items = item.data.map((itm, idx) => {
            const inputID = `scale_${id}_${idx}`;
            const val = itm.value ? itm.value : itm.label;
            const label = itm.label;
            return (
                <li
                    id={inputID}
                    className={classNames({
                        [`${styles.scaleItemSelected}`]: this.state.selected === inputID,
                        [`${styles.scaleItem}`]: this.state.selected !== inputID
                    })}
                    key={idx}
                    title={label}
                    data-value={val}
                    onClick={this._onChangeHandle}
                />
            );
        });
        return items;
    }

    _renderLabel(item) {
        return (
            <li className={styles.label}>{item.label}</li>
        );
    }

    _onChangeHandle(e) {
        console.log(e.target.id);
        this.setState({
            selected: e.target.id
        });
        // TODO onChangeHandle
    }
}

Scale.PropTypes = {
    id: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired,
    onChangeHandle: PropTypes.func.isRequired
};

Scale.defaultProps = {};

export default Scale;
