
// bootstrap css
import '../../css/main.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';
import ReactDOM from 'react-dom';

// Router
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

// Redux
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import * as TokenActions from './actions/token';
import * as AccountActions from './actions/account';

import MainRouter from './routers';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

class App extends PureComponent {
    render() {
        return (
            <Provider store={store}>
                <MainRouter history={history} />
            </Provider>
        );
    }
}

function getPromise(fetchFunc, ...extraParams) {
    return new Promise((resolve, reject) => {
        fetchFunc(resolve, reject, ...extraParams);
    });
}

function getToken(resolve) {
    // Check localStorage QustomPortal, Verify toekn
    const token = window.localStorage.QustomPortalTK || '';
    console.log(`token:${token}`);

    // TODOS: wait for backend API, temporarily
    if (token === '') {
        const data = {
            accountid: '123456',
            username: 'Chiou Chu',
            role: 'Designer'
        };
        store.dispatch(AccountActions.receiveAccountSuccess(data));
        resolve('Finish Verify Token');
        window.localStorage.QustomPortalTK = '';
        return;
    }

    if (token) {
        store.dispatch(TokenActions.verifyToken(token))
        .then(() => {
            resolve('Finish Verify Token');
        });
    } else {
        resolve('No Token');
    }
}

getPromise(getToken)
.then(() => {
    // initApp
    ReactDOM.render(
        <App />,
        document.getElementById('main')
    );
});

if (module.hot) {
    module.hot.accept();
}
