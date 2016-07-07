
// CSS
import styles from './style.css';

import React, {Component} from 'react';
import $ from 'jquery';

import Description from '../Description';
import Radio from '../Radio';

class Page extends Component {

    componentDidMount() {
        $(this.refs.root).localize();
    }

    componentDidUpdate() {
        $(this.refs.root).localize();
    }

    render() {
        const { data } = this.props;
        // TODOS: define components
        const list = [];
        data.question.forEach((question, idx) => {
            switch (question.type) {
            case 'radio':
                list.push(<Radio key={idx} data={question} />);
                break;
            case 'description':
                list.push(<Description key={idx} data={question} />);
                break;
            default:
                list.push(JSON.stringify(question));
            }
        });

        return (
            <div className={styles.wrap}>
                <div>{data.description}</div>
                {list}
            </div>
        );
    }
}

export default Page;
