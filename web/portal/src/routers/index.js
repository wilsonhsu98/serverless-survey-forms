
import React from 'react';
import PureComponent from 'react-pure-render/component';
import { Router, Route } from 'react-router';
// IndexRoute

import Portal from '../containers/Portal/';
// import Create from '../containers/Create/';
// import List from '../containers/List/';

class MainRouter extends PureComponent {
    render() {
        // TODOS: temporarily remove router
        // /create
        // /report
        // <IndexRoute component={List} />
        // <Route path="create" component={Create} />
        return (
            <Router history={this.props.history}>
                <Route path="*" component={Portal} />
            </Router>
        );
    }
}

export default MainRouter;
