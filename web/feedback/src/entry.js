
import React from 'react';
import PureComponent from 'react-pure-render/component';
import ReactDOM from 'react-dom';

import Qustom from '../../src/index';

class App extends PureComponent {

    constructor(props) {
        super(props);
        this.receiveClientMessage = this.receiveClientMessage.bind(this);
        this.state = {
            clientData: ''
        };
    }

    componentDidMount() {
        // Create IE + others compatible event handler
        const eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
        const eventer = window[eventMethod];
        const messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';
        eventer(messageEvent, (e) => this.receiveClientMessage(e), false);
    }

    render() {
        // TODO: get surveyID/accountID from Client
        return (
            <div>
                <Qustom
                    accountid="context.authorizer.principalId"
                    surveyid="759e7930-3219-11e6-b8fc-ed3df7fb1eab"
                    localize_path="../../assets/L10N"
                    type="embedded"
                />
            </div>
        );
    }

    receiveClientMessage(e) {
        // TODO: event origin detection
        // if (e.origin !== 'https://qustomURL') return;
        console.log('Message received from Client!:  ', e.data);
        this.setState({
            clientData: e.data
        });
    }
}

function initApp() {
    ReactDOM.render(
        <App />,
        document.getElementById('main')
    );
}

initApp();

if (module.hot) {
    module.hot.accept();
}
