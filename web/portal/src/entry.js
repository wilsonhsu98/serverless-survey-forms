
// bootstrap css
// import styles from './css/main.css';
require('../../css/main.css');

import React from 'react';
import PureComponent from 'react-pure-render/component';
import ReactDOM from 'react-dom';
import $ from 'jquery';

// Router
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

// Redux
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

// I18N/Formats
import I18Next from 'i18next/index';
import XHR from 'i18next-xhr-backend/index';
import I18nextJquery from 'jquery-i18next';

import * as LoadingActions from './actions/loading';
import * as FBIDActions from './actions/fbID';
import * as AccountActions from './actions/account';

import MainRouter from './routers';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

function getPromise(fetchFunc, ...extraParams) {
    return new Promise((resolve, reject) => {
        fetchFunc(resolve, reject, ...extraParams);
    });
}

function i18nSetting(resolve, reject, locale) {
    I18Next
    .use(XHR)
    .init({
        lng: locale,
        fallbackLng: 'en-US',
        debug: false,
        ns: 'basic',
        defaultNS: 'basic',
        backend: {
            loadPath: '/assets/L10N_basic/__lng__/__ns__.json'
        },
        interpolation: {
            prefix: '__',
            suffix: '__'
        },
        load: 'currentOnly'
    }, () => {
        resolve('i18next init');
        // add basic keys
        $('[data-i18n]').localize();
    });

    I18nextJquery.init(I18Next, $, {
        tName: 't',
        i18nName: 'i18n',
        handleName: 'localize',
        selectorAttr: 'data-i18n',
        targetAttr: 'i18n-target',
        optionsAttr: 'i18n-options',
        useOptionsAttr: true,
        parseDefaultValueFromContent: false
    });
}

class App extends PureComponent {

    constructor(props) {
        super(props);

        // TODOS: change locale, maybe pass by props
        const locale = 'en-US';

        // Localization init settings
        getPromise(i18nSetting, locale)
        .then(() =>
            store.dispatch(FBIDActions.fetchFBID())
        )
        .then(() => {
            if (store.getState().fbID) {
                return store.dispatch(AccountActions.fetchAccount());
            }
        })
        .then(() => {
            store.dispatch(LoadingActions.setLoading(false));
        });
    }

    render() {
        return (
            <Provider store={store}>
                <MainRouter history={history} />
            </Provider>
        );
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
