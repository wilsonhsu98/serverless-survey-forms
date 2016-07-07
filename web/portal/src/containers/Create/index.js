
import React from 'react';
import PureComponent from 'react-pure-render/component';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';

// Actions
import * as QuestionsActions from '../../actions/questions';

import Design from '../../components/Design';
import Control from '../../components/Control';
import Description from '../../components/Form/Description';

class Create extends PureComponent {

    componentDidMount() {
        $(this.refs.root).localize();
    }

    componentDidUpdate() {
        $(this.refs.root).localize();
    }

    render() {
        const { questions, questionsActions } = this.props;
        const ctrlProps = {
            questionsActions: questionsActions
        };
        // TODOS: define components
        const list = [];
        questions.forEach(function (item) {
            if (item.type === 'description') {
                list.push(<Description />);
            } else {
                list.push(JSON.stringify(item));
            }
        });

        return (
            <div ref="root">
                Create
                <Design />
                <Control {...ctrlProps} />
                {list}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        fbID: state.fbID,
        account: state.account,
        questions: state.questions
    };
}

function mapDispatchToProps(dispatch) {
    return {
        questionsActions: bindActionCreators(QuestionsActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Create);
