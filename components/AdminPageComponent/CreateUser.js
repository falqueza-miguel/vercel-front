import React, { useState } from 'react';
import styles from './createUser.module.css';
import useInput from '../hooks/useInput';
import { useRouter } from 'next/router';
import axios from 'axios';
import Modal from '../../components/Layout/Modal.';
import Button from '../UI/Button';
function CreateUser() {
    const router = useRouter();
    const [role, setRole] = useState(0);
    const [errorMes, setErrorMes] = useState(false);
    const [valid, setValid] = useState(false);

    const {
        value: enteredFname,
        isValid: enteredFnameIsValid,
        hasError: enteredFnameHasError,
        valueChangeHandler: fnameChangeHandler,
        inputBlurHandler: fnameBlurHandler,
    } = useInput((value) => value.trim() !== '');
    const {
        value: enteredLname,
        isValid: enteredLnameIsValid,
        hasError: enteredLnameHasError,
        valueChangeHandler: lnameChangeHandler,
        inputBlurHandler: lnameBlurHandler,
    } = useInput((value) => value.trim() !== '');

    const {
        value: enteredMname,
        isValid: enteredMnameIsValid,
        hasError: enteredMnameHasError,
        valueChangeHandler: mnameChangeHandler,
        inputBlurHandler: mnameBlurHandler,
    } = useInput((value) => value.trim() !== '');

    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: enteredEmailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
    } = useInput((value) => value.includes('@') && value.includes('.'));

    const {
        value: enteredNumber,
        isValid: enteredNumberIsValid,
        hasError: enteredNumberHasError,
        valueChangeHandler: numberChangeHandler,
        inputBlurHandler: numberBlurHandler,
    } = useInput((value) => value.trim() !== '');

    let formIsValid = false;
    if (enteredEmailIsValid && enteredFnameIsValid && enteredLnameIsValid && enteredMnameIsValid && enteredNumberIsValid) {
        formIsValid = true;
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        const userData = {
            firstName: enteredFname,
            middleName: enteredMname,
            lastName: enteredLname,
            email: enteredEmail,
            phoneNum: enteredNumber,
            role: role,
        };

        const postData = async () => {
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/admin/createuser`, userData, { withCredentials: true });

                if (response.data.success) {
                    setValid(true);
                } else if (response.data === 'student email') {
                    setErrorMes(true);
                } else if (response.data === 'parent email') {
                    setErrorMes(true);
                } else if (response.data === 'users email') {
                    setErrorMes(true);
                } else {
                    setErrorMes(false);
                }
            } catch (error) {
                console.log(error);
            }
        };
        console.log(userData);
        postData();
    };

    return (
        <form className={styles.container} onSubmit={onSubmitHandler}>
            <h1 className={styles.header}>Create User</h1>
            <div className={styles.formWrapper}>
                <div className={styles.formContainer}>
                    <div
                        className={
                            !enteredFnameHasError
                                ? styles.formFields
                                : `${styles.formFields} 
                                          ${styles.invalid}`
                        }
                    >
                        <div className={styles.labelContainer}>
                            <label htmlFor="fname" className={styles.label}>
                                First Name
                            </label>
                        </div>
                        <div className={styles.inputContainer}>
                            <input type="text" required={true} id="fname" className={styles.input} value={enteredFname} onChange={fnameChangeHandler} onBlur={fnameBlurHandler} />
                        </div>
                    </div>
                    <div
                        className={
                            !enteredEmailHasError
                                ? styles.formFields
                                : `${styles.formFields} 
                                          ${styles.invalid}`
                        }
                    >
                        <div className={styles.labelContainer}>
                            <label htmlFor="email" className={styles.label}>
                                Email
                            </label>
                        </div>
                        <div className={styles.inputContainer}>
                            <input type="email" required={true} id="email" className={styles.input} value={enteredEmail} onChange={emailChangeHandler} onBlur={emailBlurHandler} />
                            {errorMes && <p className={styles.errorMes}>Email already exist</p>}
                        </div>
                    </div>
                    <div
                        className={
                            !enteredLnameHasError
                                ? styles.formFields
                                : `${styles.formFields} 
                                          ${styles.invalid}`
                        }
                    >
                        <div className={styles.labelContainer}>
                            <label htmlFor="lname" className={styles.label}>
                                Last Name
                            </label>
                        </div>
                        <div className={styles.inputContainer}>
                            <input type="text" required={true} id="lname" className={styles.input} value={enteredLname} onChange={lnameChangeHandler} onBlur={lnameBlurHandler} />
                        </div>
                    </div>
                    <div
                        className={
                            !enteredNumberHasError
                                ? styles.formFields
                                : `${styles.formFields} 
                                          ${styles.invalid}`
                        }
                    >
                        <div className={styles.labelContainer}>
                            <label htmlFor="number" className={styles.label}>
                                Phone Number
                            </label>
                        </div>
                        <div className={styles.inputContainer}>
                            <input type="number" required={true} id="number" className={styles.input} value={enteredNumber} onChange={numberChangeHandler} onBlur={numberBlurHandler} />
                        </div>
                    </div>
                    <div
                        className={
                            !enteredMnameHasError
                                ? styles.formFields
                                : `${styles.formFields} 
                                          ${styles.invalid}`
                        }
                    >
                        <div className={styles.labelContainer}>
                            <label htmlFor="mname" className={styles.label}>
                                Middle Name
                            </label>
                        </div>
                        <div className={styles.inputContainer}>
                            <input type="text" required={true} id="mname" className={styles.input} value={enteredMname} onChange={mnameChangeHandler} onBlur={mnameBlurHandler} />
                        </div>
                    </div>
                    <div className={styles.formFields}>
                        <div className={styles.labelContainer}>
                            <label htmlFor="role" className={styles.label}>
                                Role
                            </label>
                        </div>
                        <div className={styles.inputContainer}>
                            <select
                                name="role"
                                required={true}
                                id="role"
                                className={styles.dropdown}
                                onChange={(e) => {
                                    setRole(e.target.value);
                                }}
                            >
                                <option value="0">Admin</option>
                                <option value="1">Principal</option>
                                <option value="2">Accountant</option>
                                <option value="3">Registrar</option>
                            </select>
                        </div>
                    </div>
                </div>
                <Button className={styles.button} type={'submit'}>
                    Create
                </Button>
                {valid && (
                    <Modal className={styles.modalDesign}>
                        <div className={styles.messageContainer}>
                            <h2 className={styles.messageHeader}>Account Created</h2>
                            <h4 className={styles.messageBody}>Please check in the List of Users Tab</h4>
                            <h4 className={styles.messageFooter}>Thank you.</h4>
                            <Button
                                className={styles.modalButton}
                                onClick={() => {
                                    router.push('/admin/AdminViewUser');
                                }}
                            >
                                Go back to home page
                            </Button>
                        </div>
                    </Modal>
                )}
            </div>
        </form>
    );
}

export default CreateUser;
