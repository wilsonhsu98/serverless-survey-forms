
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';

class IFrame extends PureComponent {

    constructor(props) {
        super(props);
        this._iFrameLoaded = this._iFrameLoaded.bind(this);
    }

    componentDidMount() {
        const eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
        const loadEvent = eventMethod === 'attachEvent' ? 'onload' : 'load';

        const iframe = document.getElementById('frame');
        iframe[eventMethod](loadEvent, this._iFrameLoaded, false);
    }

    componentWillReceiveProps() {
        const iframe = document.getElementById('frame');
        const frameLoad = document.getElementById('frameLoad');
        iframe.style.display = 'none';
        frameLoad.style.display = 'block';
    }

    render() {
        const { url, frameProps } = this.props;
        return (
            <div className={styles.wrap}>
                <div id="frameLoad" className={styles.loading}></div>
                <iframe
                    id="frame"
                    {...frameProps}
                    src={url}
                />
            </div>);
    }

    _iFrameLoaded() {
        const iframe = document.getElementById('frame');
        const frameLoad = document.getElementById('frameLoad');
        iframe.style.display = 'block';
        frameLoad.style.display = 'none';
    }
}

IFrame.defaultProps = {
    frameProps: { frameBorder: 0 }
};

export default IFrame;
