
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

import * as AccountActions from './actions/account';
import MainRouter from './routers';
import Mixins from './mixins/global';

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
    const token = Mixins.getParameterByName('token') ||
        window.localStorage.QustomPortalTK || '';

    if (token) {
        store.dispatch(AccountActions.verifyToken(token))
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
