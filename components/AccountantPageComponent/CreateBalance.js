import React, { useState } from 'react';
import styles from './createBalance.module.css';
import useInput from '../hooks/useInput';
import { useRouter } from 'next/router';
import axios from 'axios';
import Modal from '../../components/Layout/Modal.';
import Button from '../UI/Button';

function CreateBalance(props) {
    const router = useRouter();
    const [valid, setValid] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [grade, setGrade] = useState(7);
    const [firstSemester, setfirstSemester] = useState(false);
    const [secondSemester, setsecondSemester] = useState(false);
    const [paymentTerm, setPaymentTerm] = useState('Yearly');

    const {
        value: enteredSchoolYearFrom,
        isValid: enteredSchoolYearFromIsValid,
        hasError: enteredSchoolYearFromHasError,
        valueChangeHandler: schoolYearFromChangeHandler,
        inputBlurHandler: schoolYearFromBlurHandler,
    } = useInput((value) => value.trim() !== '');
    const {
        value: enteredSchoolYearTo,
        isValid: enteredSchoolYearToIsValid,
        hasError: enteredSchoolYearToHasError,
        valueChangeHandler: schoolYearToChangeHandler,
        inputBlurHandler: schoolYearToBlurHandler,
    } = useInput((value) => value.trim() !== '');
    const {
        value: enteredModeOfPayment,
        isValid: enteredModeOfPaymentIsValid,
        hasError: enteredModeOfPaymentHasError,
        valueChangeHandler: modeOfPaymentChangeHandler,
        inputBlurHandler: modeOfPaymentBlurHandler,
    } = useInput((value) => value.trim() !== '');

    //checking if form is validd
    let formIsValid = false;
    if (enteredSchoolYearFromIsValid && enteredSchoolYearToIsValid && enteredModeOfPaymentIsValid) {
        formIsValid = true;
    }

    const gradeHandler = (e) => {
        setGrade(e.target.value);
        if (e.target.value === '7' || e.target.value === '8' || e.target.value === '9' || e.target.value === '10') {
            setDisabled(true);
        } else if (e.target.value === '11' || e.target.value === '12') {
            setDisabled(false);
        }
    };

    const paymentTermsHandler = (e) => {
        setPaymentTerm(e.target.value);
    };
    console.log(paymentTerm);

    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (formIsValid) {
            let semester = '';
            if (grade === '11' || grade === '12') {
                if (firstSemester) {
                    semester = '1st';
                } else {
                    semester = '2nd';
                }
            }

            const balanceData = {
                schoolYearFrom: enteredSchoolYearFrom,
                schoolYearTo: enteredSchoolYearTo,
                yearLevel: grade,
                semester: semester,
                paymentTerms: paymentTerm,
                modeOfPayment: enteredModeOfPayment,
            };
            const postData = async () => {
                try {
                    const response = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/accountant/students/${props.id}/newbalance`, balanceData, { withCredentials: true });
                    console.log(response.data);
                    if (response.data.success) {
                        setValid(true);
                    }
                } catch (error) {
                    console.log(error);
                }
            };

            postData();
            console.log(balanceData);
        }
    };
    return (
        <form className={styles.container} onSubmit={onSubmitHandler}>
            <h1 className={styles.header}>Create New Balance</h1>
            <div className={styles.formWrapper}>
                <div className={styles.formContainer}>
                    <div
                        className={
                            !enteredSchoolYearFromHasError
                                ? styles.formFields
                                : `${styles.formFields} 
      ${styles.invalid}`
                        }
                    >
                        <div className={styles.labelContainer}>
                            <label htmlFor="schoolYearFrom" className={styles.label}>
                                School Year From
                            </label>
                        </div>
                        <div className={styles.inputContainer}>
                            <input
                                type="number"
                                required={true}
                                id="schoolYearFrom"
                                className={styles.input}
                                value={enteredSchoolYearFrom}
                                onChange={schoolYearFromChangeHandler}
                                onBlur={schoolYearFromBlurHandler}
                            />
                        </div>
                    </div>
                    <div
                        className={
                            !enteredSchoolYearToHasError
                                ? styles.formFields
                                : `${styles.formFields} 
      ${styles.invalid}`
                        }
                    >
                        <div className={styles.labelContainer}>
                            <label htmlFor="schoolYearTo" className={styles.label}>
                                School Year To
                            </label>
                        </div>
                        <div className={styles.inputContainer}>
                            <input
                                type="number"
                                required={true}
                                id="schoolYearTo"
                                className={styles.input}
                                value={enteredSchoolYearTo}
                                onChange={schoolYearToChangeHandler}
                                onBlur={schoolYearToBlurHandler}
                            />
                        </div>
                    </div>

                    <div className={styles.formFields}>
                        <div className={styles.labelContainer}>
                            <label htmlFor="yearLevel" className={styles.label}>
                                Grade Level
                            </label>
                        </div>

                        <div className={styles.dropdown}>
                            <select name="gradeLevel" id="gradeLevel" onChange={gradeHandler} value={grade}>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.formFields}>
                        <div className={styles.labelContainer}>
                            <label htmlFor="semester" className={styles.label}>
                                Semester
                            </label>
                        </div>

                        <div className={styles.radioInput}>
                            <div>
                                <input
                                    type="radio"
                                    name="semester"
                                    id="1stsemester"
                                    // required={true}
                                    checked={firstSemester}
                                    onChange={() => {
                                        setfirstSemester(!firstSemester);
                                    }}
                                    disabled={disabled}
                                />
                                <label htmlFor="1stsemester">1st</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    name="semester"
                                    id="2ndsemester"
                                    // required={true}
                                    checked={secondSemester}
                                    onChange={() => {
                                        setsecondSemester(!secondSemester);
                                    }}
                                    disabled={disabled}
                                />
                                <label htmlFor="2ndsemester">2nd</label>
                            </div>
                        </div>
                    </div>

                    <div className={styles.formFields}>
                        <div className={styles.labelContainer}>
                            <label htmlFor="paymentTerms" className={styles.label}>
                                Payment Terms
                            </label>
                        </div>

                        <div className={styles.dropdown}>
                            <select name="paymentTerms" id="paymentTerms" onChange={paymentTermsHandler} value={paymentTerm}>
                                <option value="Yearly">Yearly</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Quarterly">Quarterly</option>
                            </select>
                        </div>
                    </div>
                    <div
                        className={
                            !enteredModeOfPaymentHasError
                                ? styles.formFields
                                : `${styles.formFields} 
      ${styles.invalid}`
                        }
                    >
                        <div className={styles.labelContainer}>
                            <label htmlFor="mop" className={styles.label}>
                                Mode of Payment
                            </label>
                        </div>
                        <div className={styles.inputContainer}>
                            <input type="text" required={true} id="mop" className={styles.input} value={enteredModeOfPayment} onChange={modeOfPaymentChangeHandler} onBlur={modeOfPaymentBlurHandler} />
                        </div>
                    </div>
                </div>
            </div>
            {valid && (
                <Modal className={styles.modalDesign}>
                    <div className={styles.messageContainer}>
                        <h2 className={styles.messageHeader}>Balance Created</h2>
                        <h4 className={styles.messageBody}>Please check in the List of Balance Tab</h4>
                        <h4 className={styles.messageFooter}>Thank you.</h4>
                        <Button
                            className={styles.modalButton}
                            onClick={() => {
                                router.push(`/accountant/Students/${props.id}`);
                            }}
                        >
                            Go back to Balance List
                        </Button>
                    </div>
                </Modal>
            )}
            <Button className={styles.button} type={'submit'}>
                Create
            </Button>
        </form>
    );
}

export default CreateBalance;
