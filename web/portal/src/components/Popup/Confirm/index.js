
import styles from './style.css';
import React from 'react';
import PureComponent from 'react-pure-render/component';

import GeneralBox from '../GeneralBox';
import Button from '../../Button';

class Confirm extends PureComponent {

    constructor() {
        super();

        this._renderText = this._renderText.bind(this);
        this._renderFooter = this._renderFooter.bind(this);
        this._btnYesHandler = this._btnYesHandler.bind(this);
        this._btnNoHandler = this._btnNoHandler.bind(this);
    }

    render() {
        return (<GeneralBox
            renderText={this._renderText}
            renderFooter={this._renderFooter}
            closeHandler={this._btnNoHandler}
        />);
    }

    _renderText() {
        const { popup } = this.props;
        // message is an object records every confirmed action
        // its key should correspond with 'popup'
        const message = {
            deleteOneSurvey: 'Do you really want to delete this survey?',
            deleteAllFeedbacks: 'Do you really want to clear all feedbacks in this survey?',
            notEditableSurvey:
                'Because there are some feedback in this survey, '
                + 'you can\'t change format. You can only modify text.',
            notEditableAdmin: 'You can\'t edit survey in Admin mode.',
            addSubscriber: 'Please fill subscriber\'s email.'
        };
        if (popup === 'addSubscriber') {
            return (
                <div>
                    <div className="ut-title">{message[popup]}</div>
                    <div>
                        <input
                            id="subsInput"
                            className={`${styles.input__msg} input input--medium`}
                            type="text"
                            placeholder="Type email here"
                            onChange={this._handleInput}
                        />
                        <div id="msg" className="input__msg"></div>
                    </div>
                </div>
            );
        }

        return (<div className="ut-title">{message[popup]}</div>);
    }

    _renderFooter() {
        const { popup } = this.props;
        const style = { margin: '0 4px', display: 'inline-block' };
        if (popup === 'notEditableSurvey' || popup === 'notEditableAdmin') {
            return (
                <div style={{ margin: '0', display: 'block' }}>
                    <Button
                        string="OK"
                        i18nKey={false}
                        color="ruby"
                        onClick={this._btnNoHandler}
                        extraProps={{ style: style }}
                    />
                </div>
            );
        }
        return (
            <div style={{ margin: '0', display: 'block' }}>
                <Button
                    string="Yes"
                    i18nKey={false}
                    color="ruby"
                    onClick={this._btnYesHandler}
                    extraProps={{ style: style }}
                />
                <Button
                    string="No"
                    i18nKey={false}
                    color="ruby"
                    onClick={this._btnNoHandler}
                    extraProps={{ style: style }}
                />
            </div>
        );
    }

    _btnYesHandler() {
        const { popup, subscribers, popupActions, surveysActions, subscribersActions } = this.props;
        if (popup === 'deleteOneSurvey') {
            surveysActions.deleteSurvey();
            popupActions.closePopup();
        } else if (popup === 'deleteAllFeedbacks') {
            surveysActions.deleteAllFeedbacks();
            popupActions.closePopup();
        } else if (popup === 'addSubscriber') {
            const subsInput = document.getElementById('subsInput').value;
            const msg = document.getElementById('msg');
            // eslint-disable-next-line max-len, no-useless-escape
            const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
            if (subsInput === '') {
                msg.innerHTML = 'Please fill subscriber\'s email';
            } else if (!emailRule.test(subsInput)) {
                msg.innerHTML = 'Please fill valid email';
            } else if (subscribers.indexOf(subsInput) >= 0) {
                msg.innerHTML = 'The email is already in subscriber list';
            } else {
                subscribersActions.addSubscriber(subsInput);
                popupActions.closePopup();
            }
        }
    }

    _btnNoHandler() {
        const { popupActions } = this.props;
        popupActions.closePopup();
    }

    _handleInput() {
        const msg = document.getElementById('msg');
        if (msg.innerHTML.length) msg.innerHTML = '';
    }
}

export default Confirm;
