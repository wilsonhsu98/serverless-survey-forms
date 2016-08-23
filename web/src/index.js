
// bootstrap css
// import styles from './css/main.css';
require('../css/main.css');

import React from 'react';
import PureComponent from 'react-pure-render/component';
import $ from 'jquery';

// Router
import { browserHistory, Router, Route } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

// Redux
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

// Actions
import * as SettingsActions from './actions/settings';
import * as SurveyActions from './actions/survey';

// I18N/Formats
import I18Next from 'i18next/index';
import XHR from 'i18next-xhr-backend/index';
import I18nextJquery from 'jquery-i18next';

import Survey from './containers/Survey/';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

function getPromise(fetchFunc, ...extraParams) {
    return new Promise((resolve, reject) => {
        fetchFunc(resolve, reject, ...extraParams);
    });
}

function i18nBasicSetting(locale) {
    const patch = require(`../assets/L10N_basic/${locale}/basic.json`);
    return patch;
}

function i18nSetting(resolve, reject, locale, path) {
    I18Next
    .use(XHR)
    .init({
        lng: locale,
        fallbackLng: 'en-US',
        debug: false,
        ns: 'translation',
        backend: {
            loadPath: `${path}/__lng__/__ns__.json`
        },
        interpolation: {
            prefix: '__',
            suffix: '__'
        },
        load: 'currentOnly'
    }, () => {
        resolve('i18next init');
        // add basic keys
        I18Next.addResourceBundle(locale, 'translation', { basic: i18nBasicSetting(locale) }, true);
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
        const settings = Object.assign({}, props, { locale: locale });

        store.dispatch(SettingsActions.settings(settings));
        // Localization init settings
        getPromise(i18nSetting, locale, props.localize_path)
        .then(() =>
            // fetch survey from API
            store.dispatch(SurveyActions.fetchSurvey(settings.accountid, settings.surveyid))
        );
    }

    componentWillReceiveProps(nextProps) {
        store.dispatch(SettingsActions.settings(Object.assign({}, nextProps)));
    }

    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Route path="*" component={Survey} {...this.state} />
                </Router>
            </Provider>
        );
    }
}

function receiveClientMessage(e) {
    if (e.origin !== e.data.source) return;
    console.log('Message received from Client!:  ', e.data);
    // Store client prefilling info
    if (e.data) {
        store.dispatch(SurveyActions.savePrefill(e.data));
    }
}

// Create IE + others compatible event handler
const eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
const eventer = window[eventMethod];
const messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';
eventer(messageEvent, (e) => receiveClientMessage(e), false);

// Tell Client that Qustom has initialized
window.parent.postMessage({
    source: window.location.origin,
    msg: 'init'
}, '*');

export default App;
