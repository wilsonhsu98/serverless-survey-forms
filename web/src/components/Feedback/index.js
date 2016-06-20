
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';
import $ from 'jquery';

import Checkbox from '../Checkbox/index';
import Radio from '../Radio/index';
import Select from '../Select/index';
import Text from '../Text/index';
import Textarea from '../Textarea/index';

class Feedback extends PureComponent {

    componentDidMount() {
        $(this.refs.root).localize();
    }

    componentDidUpdate() {
        $(this.refs.root).localize();
    }

    render() {
        const survey = this.props.survey;
        const list = survey.data.survey.map(
            (itm, idx) => this._renderQuestion(itm, idx));

        return (
            <div ref="root" className={styles.wrap}>
                Hello App!
                <div data-i18n="title"></div>
                <div data-i18n="basic.key1"></div>
                <div data-i18n="basic.key2"></div>
                <div className={styles.container}>
                    <div>{list}</div>
                </div>
            </div>
        );
    }

    _renderQuestion(item, idx) {
        const requiredProps = {
            id: idx,
            key: idx,
            item: item,
            onChangeHandle: this._onChangeHandle
        };
        switch (item.type) {
        case 'radio':
            return (<Radio {...requiredProps} />);
        case 'checkbox':
            return (<Checkbox {...requiredProps} />);
        case 'text':
            return (<Text {...requiredProps} />);
        case 'textarea':
            return (<Textarea {...requiredProps} />);
        case 'select':
            return (<Select {...requiredProps} />);
        default:
            return (<div key={idx}>Can't find the survey component: {item.type}</div>);
        }
    }

    _onChangeHandle(e) {
        // TODOS: record the answer, add to store
        console.log(e.currentTarget);
    }
}

export default Feedback;
