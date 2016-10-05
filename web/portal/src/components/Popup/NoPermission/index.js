
import React from 'react';
import PureComponent from 'react-pure-render/component';

import GeneralBox from '../GeneralBox';
import Config from '../../../config';

class NoPermission extends PureComponent {

    constructor() {
        super();

        this._renderText = this._renderText.bind(this);
        this._btnClickEvent = this._btnClickEvent.bind(this);
    }

    render() {
        return <GeneralBox renderText={this._renderText} />;
    }

    _renderText() {
        return (
            <div>
                <p>You will soon receive a confirmation message&nbsp;
                when you have been approved.</p>
                Want to speed things up?
                <a className="link" onClick={this._btnClickEvent}>
                    Click here.
                </a>
            </div>
        );
    }

    _btnClickEvent() {
        window.open(`mailto:${Config.adminEmail}`);
    }
}

export default NoPermission;
