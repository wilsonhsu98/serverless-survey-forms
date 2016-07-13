
import React from 'react';
import PureComponent from 'react-pure-render/component';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';

// Actions
import * as SurveyActions from '../../actions/survey';

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
        survey: state.survey,
        done: state.done,
        paging: state.paging
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
)(Survey);
