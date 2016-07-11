// Init i18next using nodejs file system

import i18n from 'i18next';
import backend from 'i18next-sync-fs-backend';

const locale = 'en-US';

function i18nBasicSetting(locale) {
    const patch = require(`../../assets/L10N_basic/${locale}/basic.json`);
    return patch;
}

i18n
    .use(backend)
    .init({
        lng: locale,
        fallbackLng: 'en-US',
        debug: true,
        ns: 'translation',
        backend: {
            loadPath: 'assets/L10N/__lng__/__ns__.json'
        },
        interpolation: {
            prefix: '__',
            suffix: '__'
        },
        load: 'currentOnly'
    }, () => {
        // add basic keys
        i18n.addResourceBundle(locale, 'translation', { basic: i18nBasicSetting(locale) }, true);
    });

module.exports = i18n;
