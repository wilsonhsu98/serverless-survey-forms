
// CSS
import styles from './style.css';

import React from 'react';
import PureComponent from 'react-pure-render/component';
import { Link } from 'react-router';

class Menu extends PureComponent {

    render() {
        return (
            <div className={styles.menu}>
                <div className={styles.item}><Link to="/">List</Link></div>
                <div className={styles.item}><Link to="/create">Create</Link></div>
                <div className={styles.item}><Link to="/report">Report</Link></div>
            </div>
        );
    }
}

export default Menu;
