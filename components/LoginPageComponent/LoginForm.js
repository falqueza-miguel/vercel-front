import React from 'react';
import useInput from '../hooks/useInput';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './loginForm.module.css';

import axios from 'axios';
import Button from '../UI/Button';

function LoginForm(props) {
    const router = useRouter();
    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: enteredEmailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
    } = useInput((value) => value.includes('@') && value.includes('.'));
    const {
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        hasError: enteredPasswordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
    } = useInput((value) => value.trim() !== '');

    let formIsValid = false;
    if (enteredEmailIsValid && enteredPasswordIsValid) {
        formIsValid = true;
    }

    const loginDetails = {
        email: enteredEmail,
        password: enteredPassword,
    };

    const postData = async () => {
        try {
            const response = await axios.post(`https://tmis-backend.herokuapp.com/api/`, loginDetails, {
                withCredentials: true,
                credentials: 'include',
            });

            const data = response.data;
            console.log(data);
            if (data.success) {
                props.login(true);
            }
            if (data.firstLogin) {
                router.push(`/resetPassword/${data.resetToken}`);
            } else {
                if (data.role === 0) {
                    router.push('/admin');
                } else if (data.role === 1) {
                    router.push('/principal');
                } else if (data.role === 2) {
                    router.push('/accountant');
                } else if (data.role === 3) {
                    router.push('/registrar');
                } else if (data.role === 4) {
                    router.push('/teacher');
                } else if (data.role === 5) {
                    router.push('/parent');
                } else if (data.role === 6) {
                    router.push('/student');
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onLoginClickHandler = (event) => {
        if (formIsValid) {
            postData();
        }
    };

    const onPreRegClickHandler = (event) => {
        router.push('/preRegForm');
    };

    return (
        <div className={props.className}>
            <div className={styles.loginFormContainer}>
                <h1 className={styles.loginHeader}>Welcome</h1>
                <div
                    className={
                        !enteredEmailHasError
                            ? styles.loginFormFields
                            : `${styles.loginFormFields} 
                                          ${styles.invalid}`
                    }
                >
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Enter email" value={enteredEmail} onChange={emailChangeHandler} onBlur={emailBlurHandler} />
                </div>
                <div
                    className={
                        !enteredPasswordHasError
                            ? styles.loginFormFields
                            : `${styles.loginFormFields} 
                                          ${styles.invalid}`
                    }
                >
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter password" value={enteredPassword} onChange={passwordChangeHandler} onBlur={passwordBlurHandler} />
                </div>
                <div className={styles.forgotPw}>
                    <Link href="/forgotPassword">
                        <a>Forgot Password?</a>
                    </Link>
                </div>
                <Button className={styles.loginButton} onClick={onLoginClickHandler}>
                    Login
                </Button>
                <button className={styles.preRegFormContainer} onClick={onPreRegClickHandler}>
                    Pre-Registration Form for enrollment
                </button>

                {/* <div className={styles.preRegFormContainer}>
                              <Link href="/preRegForm">
                                    <a className={styles.preRegFormLink}>
                                          Pre-Registration Form for enrollment
                                    </a>
                              </Link>
                        </div> */}
            </div>
        </div>
    );
}

export default LoginForm;
