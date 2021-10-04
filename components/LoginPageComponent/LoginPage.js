import React from 'react';

import styles from './loginPage.module.css';

import LoginForm from './LoginForm';
import Announcements from './Announcements/Announcements';

function LoginPage(props) {
      return (
            <div className={styles.loginPageContainer}>
                  <LoginForm className={styles.loginForm} isLogin={props.isLogin} login={props.login} />
                  <Announcements className={styles.announcements} announcements={props.anncs} />
            </div>
      );
}

export default LoginPage;
