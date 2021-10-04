import React from 'react';

import MainNavBar from './MainNavBar';
import styles from './layout.module.css';

function Layout(props) {
      return (
            <div className={styles.layoutContainer}>
                  <MainNavBar isLogin={props.isLogin} login={props.login} />
                  <div>{props.children}</div>
            </div>
      );
}

export default Layout;
