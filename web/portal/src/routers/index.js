
import React from 'react';
import PureComponent from 'react-pure-render/component';
import { Router, Route } from 'react-router';

import Portal from '../containers/Portal/';
import Create from '../containers/Create/';
import List from '../containers/List/';

class MainRouter extends PureComponent {
    render() {
    	// TODOS: add route to
        // /create
        // /edit?surveyid=xxx
        // /report
        return (
        	<Router history={this.props.history}>
        		<Route path="/" component={Portal}>
        			<Route path="create" component={Create} />
                	<Route path="list" component={List} />
            	</Route>
            </Router>
        );
    }
}

export default MainRouter;
