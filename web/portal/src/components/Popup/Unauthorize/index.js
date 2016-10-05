
import React from 'react';
import PureComponent from 'react-pure-render/component';

import GeneralBox from '../GeneralBox';
import Config from '../../../config';
import Button from '../../Button';

class Unauthorize extends PureComponent {

    constructor() {
        super();

        this._renderText = this._renderText.bind(this);
        this._renderFooter = this._renderFooter.bind(this);
        this._btnClickEvent = this._btnClickEvent.bind(this);
    }

    render() {
        return <GeneralBox renderText={this._renderText} renderFooter={this._renderFooter} />;
    }

    _renderText() {
        return (<div>To keep using Qustom, you must sign in again.</div>);
    }

    _renderFooter() {
        return (
            <Button
                string="Log In"
                i18nKey={false}
                color="ruby"
                onClick={this._btnClickEvent}
            />);
    }

    _btnClickEvent() {
        window.location.href = `${Config.baseURL}/authentication/signin/facebook`;
    }
}

export default Unauthorize;
