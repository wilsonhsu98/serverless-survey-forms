
import React from 'react';
import PureComponent from 'react-pure-render/component';
import ReactDOM from 'react-dom';

import Qustom from '../../src/index';


class App extends PureComponent {
    render() {
        // TODO: get surveyID/accountID from Client
        return (
            <div>
                <Qustom {...this.props} />
            </div>
        );
    }
}

function initApp(accountID, surveyID, type) {
    const props = {
        accountid: accountID || 'context.authorizer.principalId',
        surveyid: surveyID || '759e7930-3219-11e6-b8fc-ed3df7fb1eab',
        type: type || 'preview',
        localize_path: '../../assets/L10N'
    };

    if (accountID && surveyID) {
        ReactDOM.render(
            <App {...props} />,
            document.getElementById('main')
        );
    } else {
        console.log('Survey ID / Account ID required');
    }
}

// Create IE + others compatible event handler

function receiveClientMessage(e) {
    console.log(e.origin);
    console.log(e.data.source);
    if (e.origin !== e.data.source) return;
    console.log('Message received from Client!:  ', e.data);
    initApp(e.data.accountID, e.data.surveyID, 'embedded');
}

const eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
const eventer = window[eventMethod];
const messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';
eventer(messageEvent, (e) => receiveClientMessage(e), false);

initApp();

if (module.hot) {
    module.hot.accept();
}
