import React, { useState } from 'react';
import axios from 'axios';
import Button from '../../components/UI/Button';
import styles from './forgotPassword.module.css';
import useInput from '../../components/hooks/useInput';
import Modal from '../../components/Layout/Modal.';
import { useRouter } from 'next/router';

function ForgotPassword(props) {
    const router = useRouter();
    const [error, setError] = useState(false);
    const [valid, setValid] = useState(false);

    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: enteredEmailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
    } = useInput((value) => value.includes('@') && value.includes('.'));

    let formIsValid = false;
    if (enteredEmailIsValid) {
        formIsValid = true;
    }
    const emailData = {
        email: enteredEmail,
    };

    const postEmail = async () => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/forgotpassword`, emailData);

            const data = response.data;
            console.log(data);
            if (data === 'no user found!') {
                setError(true);
            } else {
                setError(false);
                setValid(true);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const submitFormHandler = (event) => {
        if (formIsValid) {
            postEmail();
            console.log(valid);
        }
    };
    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Account Retrieval</h1>
            <div className={styles.formContainer}>
                <h2 className={styles.formHeader}>Forgot Password</h2>
                <div
                    className={
                        !enteredEmailHasError
                            ? styles.formFields
                            : `${styles.formFields} 
                                          ${styles.invalid}`
                    }
                >
                    <label htmlFor="email">Email</label>
                    <input value={enteredEmail} type="email" required={true} onChange={emailChangeHandler} onBlur={emailBlurHandler} />
                    {error && <h2 className={styles.errorMes}>Email does not exist. Please Try again</h2>}
                </div>

                <Button onClick={submitFormHandler} className={styles.formButton}>
                    Submit
                </Button>
            </div>
            {valid && (
                <Modal className={styles.modalDesign}>
                    <div className={styles.messageContainer}>
                        <h2 className={styles.messageHeader}>Email confirmed</h2>
                        <h4 className={styles.messageBody}>Please check your email and click the link to reset your password.</h4>
                        <h4 className={styles.messageFooter}>Thank you.</h4>
                        <Button
                            onClick={() => {
                                router.push('/');
                            }}
                        >
                            Go back to home page
                        </Button>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default ForgotPassword;
