
// CSS
// import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';
import $ from 'jquery';

class FBLogin extends PureComponent {

    constructor() {
        super();
        this._onClickFBBtn = this._onClickFBBtn.bind(this);
    }

    componentDidMount() {
        $(this.refs.root).localize();
    }

    componentDidUpdate() {
        $(this.refs.root).localize();
    }

    render() {
        return (
            <div ref="root">
                <h1 data-i18n="fblogin_title"></h1>
                <div data-i18n="fblogin_desc"></div>

                <button
                    onClick={this._onClickFBBtn}
                    data-i18n="fblogin_btn"
                />
            </div>
        );
    }

    _onClickFBBtn() {
        this.props.fbIDActions.getFBToAccount('i am log in xxxxxxxx');
    }
}

export default FBLogin;
