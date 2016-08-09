/**
 * @module Privacy
 * Privacy agreement component
 *
 **/
import styles from './style.css';

import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';
import classNames from 'classnames';
import Button from '../Button';

class Privacy extends PureComponent {

    constructor(props) {
        super(props);
        let email = '';
        if (props.prefillData && props.prefillData.email) {
            email = props.prefillData.email;
        }
        this.state = {
            email,
            terms: false
        };
        this._onChange = this._onChange.bind(this);
        this._participate = this._participate.bind(this);
        this._onToggleTerms = this._onToggleTerms.bind(this);
    }

    render() {
        const { info } = this.props;
        return (
            <div ref="root" className="question">
                <div
                    className={classNames({
                        [`${styles.question}`]: true,
                        'ut-label': true
                    })}
                >{info.label}
                </div>
                <div className={styles.terms}>
                    <div className={styles.topWrapper}>
                        <div className="checkboxItem">
                            <input
                                type="checkbox"
                                checked={this.state.terms}
                                onChange={this._onToggleTerms}
                            />
                            <label
                                className={classNames({
                                    'ut-terms': true
                                })}
                            >
                            {info.terms}
                            </label>
                        </div>
                    </div>
                    <div className={styles.bottomWrapper}>
                        <input
                            type="text"
                            placeholder={info.input}
                            value={this.state.email}
                            onChange={this._onChange}
                        />
                        <Button
                            string={'participate'}
                            onClick={this._participate}
                            extraClass={{
                                'ut-participate': true,
                                [`${styles.btn}`]: true
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }

    _onToggleTerms() {
        this.setState({
            terms: !this.state.terms
        });
    }

    _participate() {
        const emailFormat = /^(?=.{5,200}$)([\w\-]+)([\w\.\-]*)@([\w\-]+)\.([\w\-]*)\w+([-.]\w+)*$/;
        if (!this.state.terms) {
            console.log('Please agree to terms');
        } else if (!this.state.email || !emailFormat.test(this.state.email)) {
            console.log('Please input correct email');
        } else {
            window.parent.postMessage({
                source: window.location.origin,
                msg: 'followup',
                email: this.state.email
            }, '*');
        }
    }

    _onChange(e) {
        this.setState({
            email: e.target.value
        });
    }

}

Privacy.PropTypes = {
    item: PropTypes.object.isRequired,
    onChangeHandle: PropTypes.func.isRequired
};

Privacy.defaultProps = {};

export default Privacy;
