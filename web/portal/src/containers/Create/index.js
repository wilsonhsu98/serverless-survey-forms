
import React from 'react';
import PureComponent from 'react-pure-render/component';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';

// Actions
import * as QuestionsActions from '../../actions/questions';

import Design from '../../components/Design';
import Control from '../../components/Control';
import Page from '../../components/Form/Page';

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
            questions,
            questionsActions
        };
        const list = [];
        questions.forEach((page, idx) => {
            list.push(<Page key={idx} data={page} />);
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

    // _arrayGroupBy(_array, _key) {
    //     const map = {};
    //     _array.map(e => ({k: _key(e), d: e}))
    //         .forEach(e => {
    //             map[e.k] = map[e.k] || [];
    //             map[e.k].push(e.d);
    //         });
    //     return Object.keys(map).map(k => ({key: k, data: map[k]}));
    // }
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
