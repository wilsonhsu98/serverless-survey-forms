
// CSS
// import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';
import $ from 'jquery';

class Design extends PureComponent {

    componentDidMount() {
        $(this.refs.root).localize();
    }

    componentDidUpdate() {
        $(this.refs.root).localize();
    }

    render() {
        return (
            <div ref="root">
                Gogo Design! Drag and click.
            </div>
        );
    }
}

export default Design;
