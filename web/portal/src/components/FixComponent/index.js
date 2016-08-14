/**
 * @module FixComponent
 * Extend react-pure-render/component
 * Add componentDidMount and componentWillUnmount function for fix html scroll
 **/

import PureComponent from 'react-pure-render/component';

class FixComponent extends PureComponent {

    componentDidMount() {
        const html = document.getElementsByTagName('html')[0];
        const scrollTop = (document.documentElement && document.documentElement.scrollTop)
            || document.body.scrollTop;
        html.style.top = `${0 - scrollTop}px`;
        html.classList.add('non-scroll');
    }

    componentWillUnmount() {
        const html = document.getElementsByTagName('html')[0];
        const scrollTop = html.style.top.replace(/px/g, '');
        const body = document.documentElement && document.documentElement.scrollTop ?
            document.documentElement : document.body;
        html.style.top = '';
        html.classList.remove('non-scroll');
        body.scrollTop = 0 - scrollTop;
    }
}

export default FixComponent;
