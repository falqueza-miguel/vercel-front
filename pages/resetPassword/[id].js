import React, { useState } from 'react';
import axios from 'axios';
import Button from '../../components/UI/Button';
import useInput from '../../components/hooks/useInput';
import Modal from '../../components/Layout/Modal.';
import { useRouter } from 'next/router';

import styles from './resetPassword.module.css';
function ResetPassword(props) {
    const router = useRouter();
    const token = router.query.id;

    const [errorLength, setErrorLength] = useState(false);
    const [error, setError] = useState(false);
    const [valid, setValid] = useState(false);

    const {
        value: enteredNewPassword,
        isValid: enteredNewPasswordIsValid,
        hasError: enteredNewPasswordHasError,
        valueChangeHandler: newPasswordChangeHandler,
        inputBlurHandler: newPasswordBlurHandler,
    } = useInput((value) => value.trim() !== '');
    const {
        value: enteredConfirmPassword,
        isValid: enteredConfirmPasswordIsValid,
        hasError: enteredConfirmPasswordHasError,
        valueChangeHandler: confirmPasswordChangeHandler,
        inputBlurHandler: confirmPasswordBlurHandler,
    } = useInput((value) => value.trim() !== '');

    let formIsValid = false;
    if (enteredNewPasswordIsValid && enteredConfirmPasswordIsValid) {
        formIsValid = true;
    }
    const newPasswordData = {
        password: enteredNewPassword,
        confirmPassword: enteredConfirmPassword,
        token: token,
    };

    const resetPassword = async () => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/reset/${token}`, newPasswordData, {
                withCredentials: true,
                credentials: 'include',
            });
            setValid(true);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    const submitFormHandler = (event) => {
        console.log('submit');
        if (formIsValid) {
            if (enteredConfirmPassword === enteredNewPassword) {
                if (enteredConfirmPassword.trim().length > 7) {
                    formIsValid = true;
                    console.log('valid passwords');
                    resetPassword();
                } else {
                    console.log('passsword too short');
                    setErrorLength(true);
                    setError(false);
                }
            } else {
                setError(true);
                setErrorLength(false);
                console.log('passsword not matched');
            }
        }
        console.log(newPasswordData);
    };
    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Account Retrieval</h1>
            <div className={styles.formContainer}>
                <h2 className={styles.formHeader}>Reset Password</h2>
                <div
                    className={
                        !enteredNewPasswordHasError
                            ? styles.formFields
                            : `${styles.formFields} 
                                ${styles.invalid}`
                    }
                >
                    <label htmlFor="email">New Password</label>
                    <input value={enteredNewPassword} type="password" required={true} onChange={newPasswordChangeHandler} onBlur={newPasswordBlurHandler} />
                </div>
                <div
                    className={
                        !enteredConfirmPasswordHasError
                            ? styles.formFields
                            : `${styles.formFields} 
                                ${styles.invalid}`
                    }
                >
                    <label htmlFor="email">Confirm Password</label>
                    <input value={enteredConfirmPassword} type="password" required={true} onChange={confirmPasswordChangeHandler} onBlur={confirmPasswordBlurHandler} />
                    {error && <h2 className={styles.errorMes}>Passwords did not match. Please Try again</h2>}
                    {errorLength && <h2 className={styles.errorMes}>Password must be at least 8 characters.</h2>}
                </div>

                <Button onClick={submitFormHandler} className={styles.formButton}>
                    Submit
                </Button>
            </div>
            {valid && (
                <Modal className={styles.modalDesign}>
                    <div className={styles.messageContainer}>
                        <h2 className={styles.messageHeader}>Password Changed</h2>
                        <h4 className={styles.messageBody}></h4>
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

export default ResetPassword;
