
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
        const title = survey.data.title;
        const descript = survey.data.descript;
        const list = survey.data.survey.map(
            (itm, idx) => this._renderQuestion(itm, idx));

        return (
            <div ref="root" className={styles.wrap}>
                <div className={styles.container}>
                    <div className={styles.title} data-i18n={title}></div>
                    <div className={styles.description} data-i18n={descript}></div>

                    <div>{list}</div>
                </div>
            </div>
        );
    }

    _renderQuestion(item, idx) {
        const requiredProps = {
            id: idx + 1,
            key: idx,
            item: item,
            onChangeHandle: this._onChangeHandle,
            className: styles.question
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
            return (<div key={idx + 1}>Can't find the survey component: {item.type}</div>);
        }
    }

    _onChangeHandle(e) {
        // TODOS: record the answer, add to store
        console.log(e.currentTarget);
    }
}

export default Feedback;
