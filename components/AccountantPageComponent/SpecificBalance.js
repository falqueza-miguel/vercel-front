import React, { useState, useEffect } from 'react';
import styles from './specificBalance.module.css';
import { useRouter } from 'next/router';
import axios from 'axios';
import useInput from '../hooks/useInput';
import Modal from '../../components/Layout/Modal.';

import Button from '../UI/Button';
function SpecificBalance(props) {
    const router = useRouter();

    const [valid, setValid] = useState(false);

    const [balanceData, setBalanceData] = useState([]);
    const [userData, setUserData] = useState([]);

    const [transactionDate, setTransactionDate] = useState([]);
    const [schedule, setSchedule] = useState([]);

    const [dropDown, setDropDown] = useState('Debit');
    const [transactionType, setTransactionType] = useState('Payment');
    const [specify, setSpecify] = useState(false);

    const [sendEmail, setSendEmail] = useState(false);
    const [sendSMS, setSendSMS] = useState(false);

    const dropDownHandler = (event) => {
        setDropDown(event.target.value);
        console.log(event.target.value);
    };

    const transactionTypeHandler = (event) => {
        if (event.target.value === 'Specify') {
            setTransactionType(event.target.value);
            setSpecify(true);
        } else {
            setSpecify(false);
            setTransactionType(event.target.value);
        }
    };
    //modal prompt
    const [addTransacHandler, setAddTransacHandler] = useState(false);

    const currentTime = new Date().toLocaleString();

    const {
        value: enteredAmount,
        isValid: enteredAmountIsValid,
        hasError: enteredAmountHasError,
        valueChangeHandler: amountChangeHandler,
        inputBlurHandler: amountBlurHandler,
    } = useInput((value) => !isNaN(value) && value.trim() !== '');
    const {
        value: enteredSpecific,
        isValid: enteredSpecificIsValid,
        hasError: enteredSpecificHasError,
        valueChangeHandler: specificChangeHandler,
        inputBlurHandler: specificBlurHandler,
    } = useInput((value) => !isNaN(value) && value.trim() !== '');

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/accountant/students/${props.studID}/${props.balanceID}`, {
                    withCredentials: true,
                });
                const data = await response.data.balance;
                setBalanceData(response.data.balance);
                setUserData(response.data.user);
                setTransactionDate(response.data.balance.transactionDate);
                setSchedule(response.data.balance.schedulePeriod);
                console.log(response.data.balance);
                console.log(response.data.user);

                let bal = 0;
                let runBalance = [];
                for (let i = 0; i > data.transactionType.length; i++) {
                    bal = bal + data.debit[i] - data.credit[i];
                    runBalance.push(bal);
                }
                console.log(runBalance);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [valid, props.balanceID, props.studID]);

    const addTransac = async () => {
        let debitData = '';
        let creditData = '';
        if (dropDown === 'Debit') {
            debitData = Number(enteredAmount);
            creditData = 0;
        } else if (dropDown === 'Credit') {
            creditData = Number(enteredAmount);
            debitData = 0;
        }
        let transactionTypeData = '';
        if (transactionType === 'Specify') {
            transactionTypeData = enteredSpecific;
        } else {
            transactionTypeData = transactionType;
        }

        let data = {
            transactionType: transactionTypeData,
            debit: Number(debitData),
            credit: Number(creditData),
            asEmail: sendEmail,
            asSMS: sendSMS,
        };
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/accountant/students/${props.studID}/${props.balanceID}`, data, { withCredentials: true });
            console.log(response.data);
            if (response.data.success) {
                setValid(true);
            }
        } catch (error) {
            console.log(error);
        }
        console.log(data);
    };
    return (
        <form className={styles.container}>
            <h1 className={styles.header}>Specific Balance</h1>
            <div className={styles.formWrapper}>
                <div className={styles.formContainer}>
                    <div className={styles.formFields}>
                        <div className={styles.labelContainer}>
                            <label htmlFor="schoolYearFrom" className={styles.label}>
                                School Year From
                            </label>
                        </div>
                        <div className={styles.inputContainer}>
                            <div className={styles.input}>{balanceData.schoolYearFrom}</div>
                        </div>
                    </div>
                    <div className={styles.formFields}>
                        <div className={styles.labelContainer}>
                            <label htmlFor="schoolYearTo" className={styles.label}>
                                School Year To
                            </label>
                        </div>
                        <div className={styles.inputContainer}>
                            <div className={styles.input}>{balanceData.schoolYearTo}</div>
                        </div>
                    </div>

                    <div className={styles.formFields}>
                        <div className={styles.labelContainer}>
                            <label htmlFor="yearLevel" className={styles.label}>
                                Grade Level
                            </label>
                        </div>

                        <div className={styles.inputContainer}>
                            <div className={styles.input}>{balanceData.yearLevel}</div>
                        </div>
                    </div>
                    <div className={styles.formFields}>
                        <div className={styles.labelContainer}>
                            <label htmlFor="semester" className={styles.label}>
                                Semester
                            </label>
                        </div>

                        <div className={styles.inputContainer}>
                            <div className={styles.input}>{balanceData.semester}</div>
                        </div>
                    </div>
                    <div className={styles.formFields}>
                        <div className={styles.labelContainer}>
                            <label htmlFor="paymentTerms" className={styles.label}>
                                Payment Terms
                            </label>
                        </div>
                        <div className={styles.inputContainer}>
                            <div className={styles.input}>{balanceData.paymentTerms}</div>
                        </div>
                    </div>
                    <div className={styles.formFields}>
                        <div className={styles.labelContainer}>
                            <label htmlFor="mop" className={styles.label}>
                                Mode of Payment
                            </label>
                        </div>
                        <div className={styles.inputContainer}>
                            <div className={styles.input}>{balanceData.modeOfPayment}</div>
                        </div>
                    </div>

                    {addTransacHandler && (
                        <Modal className={styles.modalDesignTransac}>
                            <div className={styles.messageContainer}>
                                <h2 className={styles.messageHeader}>Add transaction</h2>
                                <div className={styles.modalFormField}>
                                    <div className={styles.formFieldsModal}>
                                        <div className={styles.labelContainer}>
                                            <label htmlFor="schoolYearFrom" className={styles.label}>
                                                Transaction Date
                                            </label>
                                        </div>
                                        <div className={styles.inputContainer}>{currentTime}</div>
                                    </div>

                                    <div className={styles.formFieldsModal}>
                                        <div className={styles.labelContainer}>
                                            <label htmlFor="transacType" className={styles.label}>
                                                Transaction Type
                                            </label>
                                        </div>
                                        <div className={styles.dropdown}>
                                            <select name="transacType" id="transacType" onChange={transactionTypeHandler} value={transactionType}>
                                                <option value="Payment">Payment</option>
                                                <option value="Tuition">Tuition</option>
                                                <option value="Specify">Specifiy</option>
                                            </select>
                                            {specify && (
                                                <input
                                                    type="text"
                                                    className={styles.specify}
                                                    placeholder="Enter transaction type"
                                                    required={true}
                                                    id="transactionType"
                                                    value={enteredSpecific}
                                                    onChange={specificChangeHandler}
                                                    onBlur={specificBlurHandler}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className={styles.formFieldsModal}>
                                        <div className={styles.labelContainer}>
                                            <label htmlFor="dropdown" className={styles.label}>
                                                Debit/Credit
                                            </label>
                                        </div>
                                        <div className={styles.dropdown}>
                                            <select name="dropdown" id="dropdown" onChange={dropDownHandler} value={dropDown}>
                                                <option value="Debit">Debit</option>
                                                <option value="Credit">Credit</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div
                                        className={
                                            !enteredAmountHasError
                                                ? styles.formFieldsModal
                                                : `${styles.formFieldsModal} 
                  ${styles.invalid}`
                                        }
                                    >
                                        <div className={styles.labelContainer}>
                                            <label htmlFor="amount" className={styles.label}>
                                                Amount
                                            </label>
                                        </div>
                                        <div className={styles.inputContainer}>
                                            <input type="number" required={true} id="amount" className={styles.input} value={enteredAmount} onChange={amountChangeHandler} onBlur={amountBlurHandler} />
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.checkboxContainer}>
                                    <label htmlFor="email" className={styles.radioContainer}>
                                        Send Email?
                                        <input type="checkbox" name="email" id="email" checked={sendEmail} onChange={(e) => setSendEmail(!sendEmail)} />
                                        <span className={styles.checkmark}></span>
                                    </label>
                                    <label htmlFor="sms" className={styles.radioContainer}>
                                        Send SMS?
                                        <input type="checkbox" name="sms" id="sms" checked={sendSMS} onChange={() => setSendSMS(!sendSMS)} />
                                        <span className={styles.checkmark}></span>
                                    </label>
                                </div>
                                <div className={styles.buttonConfirmationContainer}>
                                    <Button className={styles.modalButtonYes} onClick={addTransac}>
                                        Add
                                    </Button>
                                    <Button
                                        className={styles.modalButtonNo}
                                        onClick={() => {
                                            setAddTransacHandler(false);
                                        }}
                                    >
                                        Close
                                    </Button>
                                </div>
                            </div>
                        </Modal>
                    )}
                    {valid && (
                        <Modal className={styles.modalDesign}>
                            <div className={styles.messageContainer}>
                                <h2 className={styles.messageHeader}>Transaction Created</h2>
                                <h4 className={styles.messageFooter}>Thank you.</h4>
                                <Button
                                    className={styles.modalButton}
                                    onClick={() => {
                                        setValid(false);
                                        setAddTransacHandler(false);
                                    }}
                                >
                                    Close
                                </Button>
                            </div>
                        </Modal>
                    )}
                </div>
                <div className={styles.createButtonContainer}>
                    <Button
                        onClick={() => {
                            setAddTransacHandler(true);
                        }}
                        className={styles.createButton}
                    >
                        &#65291; Add Transaction
                    </Button>
                </div>
                <div className={styles.columnName}>Transactions</div>
                <ul className={styles.listContainer}>
                    <div className={styles.columnTitlecontainer}>
                        <h4 className={styles.name}>Date</h4>
                        <h4 className={styles.name}>Type</h4>
                        <h4 className={styles.name}>Debit</h4>
                        <h4 className={styles.name}>Credit</h4>
                        <h4 className={styles.name}>Balance</h4>
                    </div>

                    {balanceData &&
                        transactionDate.map((item, i) => (
                            <li className={styles.itemContainer} key={i}>
                                <div className={styles.userName}>{item}</div>
                                <div className={styles.userName}>{balanceData.transactionType[i]}</div>
                                <div className={styles.userName}>
                                    {balanceData.debit[i].toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </div>
                                <div className={styles.userName}>
                                    {balanceData.credit[i].toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </div>
                                {balanceData.runBalance[i] !== null && (
                                    <div className={styles.userName}>
                                        {balanceData.runBalance[i].toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </div>
                                )}
                            </li>
                        ))}
                </ul>
                {schedule.length !== 0 && (
                    <div>
                        <div className={styles.columnName2}>Period / Amount</div>
                        <ul className={styles.listContainer2}>
                            <div className={styles.columnTitlecontainer2}>
                                <h4 className={styles.name2}>Period</h4>
                                <h4 className={styles.name2}>Amount</h4>
                            </div>
                            {schedule.map((item, i) => (
                                <li className={styles.itemContainer2} key={i}>
                                    <div className={styles.userName2}>{item}</div>
                                    <div className={styles.userName2}>{balanceData.scheduleAmount[i]}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </form>
    );
}

export default SpecificBalance;
