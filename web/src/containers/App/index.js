
import React from 'react';
import PureComponent from 'react-pure-render/component';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';

// Actions
import * as SurveyActions from '../../actions/survey';

import Feedback from '../../components/Feedback';
import Loading from '../../components/Loading';

class App extends PureComponent {

    componentDidMount() {
        $(this.refs.root).localize();
    }

    render() {
        const { loading, survey, surveyActions } = this.props;
        const requiredProps = {
            survey: survey,
            surveyActions: surveyActions
        };
        return (
            <div>
                {loading
                    ? <Loading />
                    : <Feedback {...requiredProps} />}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        loading: state.loading,
        survey: state.survey
    };
}

function mapDispatchToProps(dispatch) {
    return {
        surveyActions: bindActionCreators(SurveyActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
