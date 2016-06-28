
// CSS
// import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';
import $ from 'jquery';

class FBLogin extends PureComponent {
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
            </div>
        );
    }
}

export default FBLogin;
