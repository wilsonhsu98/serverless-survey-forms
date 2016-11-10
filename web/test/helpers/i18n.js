// Init i18next using nodejs file system

import i18n from 'i18next';
import backend from 'i18next-sync-fs-backend';

const locale = 'en-US';

i18n
    .use(backend)
    .init({
        lng: locale,
        fallbackLng: 'en-US',
        debug: false,
        ns: 'translation',
        backend: {
            loadPath: 'assets/L10N/__lng__/__ns__.json'
        },
        interpolation: {
            prefix: '__',
            suffix: '__'
        },
        load: 'currentOnly'
    }, () => {});

module.exports = i18n;
