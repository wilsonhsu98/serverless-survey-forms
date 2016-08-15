
import React from 'react';
import ReactDOM from 'react-dom';
import PureComponent from 'react-pure-render/component';

class IFrame extends PureComponent {

    componentDidMount() {
        const frameBody = ReactDOM.findDOMNode(this).contentDocument.body;
        const el = document.createElement('div');
        frameBody.appendChild(el);
    }

    render() {
        const { url, frameProps } = this.props;
        return (
            <iframe
                style={{
                    width: '100%',
                    height: '100%'
                }}
                {...frameProps}
                src={url}
            />
        );
    }
}

IFrame.defaultProps = {
    frameProps: { frameBorder: 0 }
};

export default IFrame;
