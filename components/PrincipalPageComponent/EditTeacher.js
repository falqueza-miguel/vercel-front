import React, { useState } from 'react';
import styles from './editTeacher.module.css';
import useInput from '../hooks/useInput';
import { useRouter } from 'next/router';
import axios from 'axios';
import Modal from '../../components/Layout/Modal.';
import Button from '../UI/Button';

function EditTeacher(props) {
    const router = useRouter();

    const [updated, setUpdated] = useState(false);
    const [archive, setArchive] = useState(false);
    const [confirmation, setConfirmation] = useState(false);

    const [fnameIsTouched, setfnameIsTouched] = useState(false);
    const [mnameIsTouched, setmnameIsTouched] = useState(false);
    const [lnameIsTouched, setlnameIsTouched] = useState(false);
    const [emailIsTouched, setemailIsTouched] = useState(false);
    const [numberIsTouched, setnumberIsTouched] = useState(false);
    const [departmentIsTouched, setDepartmentIsTouched] = useState(false);

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
    const {
        value: enteredDepartment,
        isValid: enteredDepartmentIsValid,
        hasError: enteredDepartmentHasError,
        valueChangeHandler: departmentChangeHandler,
        inputBlurHandler: departmentBlurHandler,
    } = useInput((value) => value.trim() !== '');

    const onSubmitHandler = (event) => {
        event.preventDefault();

        const userData = {
            firstName: enteredFname,
            middleName: enteredMname,
            lastName: enteredLname,
            phoneNum: enteredNumber,
            department: enteredDepartment,
        };

        if (!fnameIsTouched) {
            userData.firstName = props.data.firstName;
        }
        if (!mnameIsTouched) {
            userData.middleName = props.data.middleName;
        }
        if (!lnameIsTouched) {
            userData.lastName = props.data.lastName;
        }
        if (!emailIsTouched) {
            userData.email = props.data.email;
        }
        if (!numberIsTouched) {
            userData.phoneNum = props.data.phoneNum;
        }
        if (!departmentIsTouched) {
            userData.department = props.data.department;
        }

        if (fnameIsTouched && enteredFname === '') {
            userData.firstName = props.data.firstName;
        }
        if (mnameIsTouched && enteredMname === '') {
            userData.middleName = props.data.middleName;
        }
        if (lnameIsTouched && enteredLname === '') {
            userData.lastName = props.data.lastName;
        }

        if (numberIsTouched && enteredNumber === '') {
            userData.phoneNum = props.data.phoneNum;
        }
        if (departmentIsTouched && enteredDepartment === '') {
            userData.department = props.data.department;
        }

        const postData = async () => {
            try {
                const response = await axios.put(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/principal/teachers/${props.data._id}`, userData, { withCredentials: true });
                console.log(response);
                if (response.data.success) {
                    setUpdated(true);
                } else {
                    setUpdated(false);
                }
            } catch (error) {
                console.log(error);
            }
        };
        postData();
    };
    const archiveUser = async () => {
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/principal/archiveteacher/${props.data._id}`, {
                withCredentials: true,
                credentials: 'include',
            });
            console.log(response);
            if (response.data.success) {
                setArchive(true);
                setConfirmation(false);
            } else {
                setArchive(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form className={styles.container} onSubmit={onSubmitHandler}>
            <h1 className={styles.header}>Edit/Archive Teacher</h1>
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
                            <input
                                type="text"
                                id="fname"
                                className={styles.input}
                                value={enteredFname}
                                onChange={fnameChangeHandler}
                                onBlur={() => {
                                    setfnameIsTouched(true);
                                }}
                                placeholder={props.data.firstName}
                            />
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
                            <input
                                type="email"
                                id="email"
                                className={styles.input}
                                value={enteredEmail}
                                onChange={emailChangeHandler}
                                onBlur={() => {
                                    setemailIsTouched(true);
                                }}
                                disabled={true}
                                placeholder={props.data.email}
                            />
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
                            <input
                                type="text"
                                id="lname"
                                className={styles.input}
                                value={enteredLname}
                                onChange={lnameChangeHandler}
                                onBlur={() => {
                                    setlnameIsTouched(true);
                                }}
                                placeholder={props.data.lastName}
                            />
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
                            <input
                                type="number"
                                id="number"
                                className={styles.input}
                                value={enteredNumber}
                                onChange={numberChangeHandler}
                                onBlur={() => {
                                    setnumberIsTouched(true);
                                }}
                                placeholder={props.data.phoneNum}
                            />
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
                            <input
                                type="text"
                                id="mname"
                                className={styles.input}
                                value={enteredMname}
                                onChange={mnameChangeHandler}
                                onBlur={() => {
                                    setmnameIsTouched(true);
                                }}
                                placeholder={props.data.middleName}
                            />
                        </div>
                    </div>
                    <div
                        className={
                            !enteredDepartmentHasError
                                ? styles.formFields
                                : `${styles.formFields} 
                              ${styles.invalid}`
                        }
                    >
                        <div className={styles.labelContainer}>
                            <label htmlFor="department" className={styles.label}>
                                Department
                            </label>
                        </div>
                        <div className={styles.inputContainer}>
                            <input
                                type="text"
                                id="department"
                                className={styles.input}
                                value={enteredDepartment}
                                onChange={departmentChangeHandler}
                                onBlur={() => {
                                    setDepartmentIsTouched(true);
                                }}
                                placeholder={props.data.department}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <Button className={styles.buttonUpdate} type={'submit'}>
                        Update
                    </Button>
                    <Button
                        className={styles.buttonArchive}
                        onClick={() => {
                            setConfirmation(true);
                        }}
                    >
                        Archive
                    </Button>
                </div>

                {updated && (
                    <Modal className={styles.modalDesign}>
                        <div className={styles.messageContainer}>
                            <h2 className={styles.messageHeader}>Teacher Updated</h2>
                            <h4 className={styles.messageBody}>Please check in the updated teacher to the List of Teacher Tab</h4>
                            <h4 className={styles.messageFooter}>Thank you.</h4>
                            <Button
                                className={styles.modalButton}
                                onClick={() => {
                                    router.push('/principal/Teacher/');
                                }}
                            >
                                Go back to Teacher List
                            </Button>
                        </div>
                    </Modal>
                )}
                {archive && (
                    <Modal className={styles.modalDesign}>
                        <div className={styles.messageContainer}>
                            <h2 className={styles.messageHeader}>Teacher Successfully Archived</h2>
                            <h4 className={styles.messageBody}></h4>
                            <h4 className={styles.messageFooter}>Thank you.</h4>
                            <Button
                                className={styles.modalButton}
                                onClick={() => {
                                    router.push('/principal/Teacher/');
                                }}
                            >
                                Go back to Teacher List
                            </Button>
                        </div>
                    </Modal>
                )}
                {confirmation && (
                    <Modal className={styles.modalDesign}>
                        <div className={styles.messageContainer}>
                            <h2 className={styles.messageHeader}>Are you sure you want to archive this teacher?</h2>
                            <h4 className={styles.messageFooter}></h4>
                            <div className={styles.buttonConfirmationContainer}>
                                <Button className={styles.modalButtonYes} onClick={archiveUser}>
                                    Yes
                                </Button>
                                <Button
                                    className={styles.modalButtonNo}
                                    onClick={() => {
                                        setConfirmation(false);
                                    }}
                                >
                                    No
                                </Button>
                            </div>
                        </div>
                    </Modal>
                )}
            </div>
        </form>
    );
}

export default EditTeacher;
