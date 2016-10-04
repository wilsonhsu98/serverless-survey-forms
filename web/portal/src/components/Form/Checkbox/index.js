
import React, { Component } from 'react';

import Question from '../Question';

class Checkbox extends Component {

    render() {
        const { data, onClick } = this.props;
        return (
            <div
                className="question"
                onClick={onClick}
            >
                <Question
                    id={data.order}
                    text={data.label}
                    required={data.required}
                />
                <div className="checkboxGrp">
                    {this._renderCheckboxItem()}
                </div>
            </div>
        );
    }

    _renderCheckboxItem() {
        const { data } = this.props;
        const items = data.data.map((itm, idx) => {
            const label = itm.label;
            const input = itm.input;
            return (
                <div
                    className="checkboxItem ut-chk"
                    key={idx}
                >
                    <input type="checkbox" />
                    <label>
                        {label}
                    </label>
                    {
                        itm.hasOwnProperty('input') ?
                            <input
                                type="text"
                                className="input input--medium ut-input"
                                placeholder={input}
                            /> :
                            ''
                    }
                </div>
            );
        });
        return items;
    }
}

export default Checkbox;
