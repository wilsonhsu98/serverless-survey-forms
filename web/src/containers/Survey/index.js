
import React from 'react';
import PureComponent from 'react-pure-render/component';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';

// Actions
import * as SurveyActions from '../../actions/survey';
import * as FeedbackActions from '../../actions/feedback';

import Feedback from '../../components/Feedback';
import Loading from '../../components/Loading';

class Survey extends PureComponent {

    componentDidMount() {
        $(this.refs.root).localize();
    }

    render() {
        const { loading } = this.props;
        return (
            <div>
                {loading
                    ? <Loading />
                    : <Feedback {...this.props} />}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        loading: state.loading,
        settings: state.settings,
        survey: state.survey,
        feedback: state.feedback,
        done: state.done,
        paging: state.paging,
        prefillData: state.prefillData
    };
}

function mapDispatchToProps(dispatch) {
    return {
        surveyActions: bindActionCreators(SurveyActions, dispatch),
        feedbackActions: bindActionCreators(FeedbackActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Survey);
