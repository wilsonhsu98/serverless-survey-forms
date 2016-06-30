
import React from 'react';
import PureComponent from 'react-pure-render/component';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';

// Actions
// import * as SurveyActions from '../../actions/survey';

import FBLogin from '../../components/FBLogin';
import Loading from '../../components/Loading';

class Portal extends PureComponent {

    componentDidMount() {
        $(this.refs.root).localize();
    }

    componentDidUpdate() {
        $(this.refs.root).localize();
    }

    render() {
        const { loading } = this.props;

        // TODOS: decide show FB Login/Portal List/Create Survey
        return (
            <div ref="root">
                {loading
                    ? <Loading />
                    : <FBLogin />}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        loading: state.loading
        // ,
        // survey: state.survey
    };
}

function mapDispatchToProps(dispatch) {
    return {
        // surveyActions: bindActionCreators(SurveyActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Portal);
