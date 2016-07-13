
import React from 'react';
import PureComponent from 'react-pure-render/component';
import ReactDOM from 'react-dom';

import Qustom from '../../src/index';

class App extends PureComponent {
    render() {
        return (
            <div>
                <Qustom
                    accountid='context.authorizer.principalId'
                    surveyid='759e7930-3219-11e6-b8fc-ed3df7fb1eab'
                    localize_path='../../assets/L10N'
                />
            </div>
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
