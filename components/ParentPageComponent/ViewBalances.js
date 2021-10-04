import React, { useState, useEffect } from 'react';
import styles from './viewBalances.module.css';
import axios from 'axios';

function ViewBalances() {
    const [latestBalance, setLatestBalance] = useState({});
    const [transactionDate, setTransactionDate] = useState([]);
    const [transactionType, setTransactionType] = useState([]);
    const [credit, setCredit] = useState([]);
    const [debit, setDebit] = useState([]);
    const [runningBal, setRunningBal] = useState([]);

    const [prevBalance, setPrevBalance] = useState([]);
    const [showPrevBalanceHandler, setShowPrevBalanceHandler] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/parent/balance`, {
                    withCredentials: true,
                });
                console.log(response.data);
                setPrevBalance(response.data.allBalances);
                setLatestBalance(response.data.latestBalance);
                setTransactionDate(response.data.latestBalance.transactionDate);
                setTransactionType(response.data.latestBalance.transactionType);
                setCredit(response.data.latestBalance.credit);
                setDebit(response.data.latestBalance.debit);
                setRunningBal(response.data.latestBalance.runBalance);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const setShowPrevBalanceClickHandler = (e, index) => {
        const list = [...showPrevBalanceHandler];
        list[index] = e;
        setShowPrevBalanceHandler(list);
        console.log(list);
    };
    return (
        <div className={styles.container}>
            <h1 className={styles.header}>View Balances</h1>
            <div className={styles.formWrapper}>
                <div className={styles.formContainer}>
                    <div className={styles.formFields}>
                        <div className={styles.labelContainer}>
                            <label htmlFor="schoolYearFrom" className={styles.label}>
                                School Year From
                            </label>
                        </div>
                        <div className={styles.inputContainer}>
                            <div className={styles.input}>{latestBalance.schoolYearFrom}</div>
                        </div>
                    </div>
                    <div className={styles.formFields}>
                        <div className={styles.labelContainer}>
                            <label htmlFor="schoolYearTo" className={styles.label}>
                                School Year To
                            </label>
                        </div>
                        <div className={styles.inputContainer}>
                            <div className={styles.input}>{latestBalance.schoolYearTo}</div>
                        </div>
                    </div>

                    <div className={styles.formFields}>
                        <div className={styles.labelContainer}>
                            <label htmlFor="yearLevel" className={styles.label}>
                                Grade Level
                            </label>
                        </div>

                        <div className={styles.inputContainer}>
                            <div className={styles.input}>{latestBalance.yearLevel}</div>
                        </div>
                    </div>
                    <div className={styles.formFields}>
                        <div className={styles.labelContainer}>
                            <label htmlFor="semester" className={styles.label}>
                                Semester
                            </label>
                        </div>

                        <div className={styles.inputContainer}>
                            <div className={styles.input}>{latestBalance.semester}</div>
                        </div>
                    </div>
                    <div className={styles.formFields}>
                        <div className={styles.labelContainer}>
                            <label htmlFor="paymentTerms" className={styles.label}>
                                Payment Terms
                            </label>
                        </div>
                        <div className={styles.inputContainer}>
                            <div className={styles.input}>{latestBalance.paymentTerms}</div>
                        </div>
                    </div>
                    <div className={styles.formFields}>
                        <div className={styles.labelContainer}>
                            <label htmlFor="mop" className={styles.label}>
                                Mode of Payment
                            </label>
                        </div>
                        <div className={styles.inputContainer}>
                            <div className={styles.input}>{latestBalance.modeOfPayment}</div>
                        </div>
                    </div>
                </div>
                <div className={styles.columnName}>
                    {latestBalance.schoolYearFrom} - {latestBalance.schoolYearTo}&nbsp; {latestBalance.semester && latestBalance.semester}
                </div>
                <ul className={styles.listContainer}>
                    <div className={styles.columnTitlecontainer}>
                        <h4 className={styles.name}>Transaction Date</h4>
                        <h4 className={styles.name}>Transaction Type</h4>
                        <h4 className={styles.name}>Debit</h4>
                        <h4 className={styles.name}>Credit</h4>
                        <h4 className={styles.name}>Balance</h4>
                    </div>

                    {transactionDate.map((item, i) => (
                        <li className={styles.itemContainer} key={i}>
                            <div className={styles.userName}>{item}</div>
                            <div className={styles.userName}>{transactionType[i]}</div>
                            <div className={styles.userName}>{debit[i]}</div>
                            <div className={styles.userName}>{credit[i]}</div>
                            <div className={styles.userName}>{runningBal[i]}</div>
                        </li>
                    ))}
                </ul>
                {prevBalance &&
                    prevBalance.map((item, i) => (
                        <div key={i} className={styles.prevBalanceContainer}>
                            <div
                                className={showPrevBalanceHandler[i] ? styles.columnNamePrevBalanceClicked : styles.columnNamePrevBalance}
                                onClick={() => {
                                    setShowPrevBalanceClickHandler(!showPrevBalanceHandler[i], i);
                                }}
                            >
                                Grade {item.yearLevel} - ( {item.schoolYearFrom} - {item.schoolYearTo}&nbsp; {item.semester && item.semester} &nbsp;Semester ) - {item.modeOfPayment} -{' '}
                                {item.paymentTerms}
                            </div>
                            {showPrevBalanceHandler[i] && (
                                <ul className={styles.listContainer}>
                                    <div className={styles.columnTitlecontainer}>
                                        <h4 className={styles.name}>Transaction Date</h4>
                                        <h4 className={styles.name}>Transaction Type</h4>
                                        <h4 className={styles.name}>Debit</h4>
                                        <h4 className={styles.name}>Credit</h4>
                                        <h4 className={styles.name}>Balance</h4>
                                    </div>

                                    {item.transactionDate.map((x, y) => (
                                        <li className={styles.itemContainer} key={y}>
                                            <div className={styles.userName}>{x}</div>
                                            <div className={styles.quarterGrade}>{item.transactionType[y]}</div>
                                            <div className={styles.quarterGrade}>{item.debit[y]}</div>
                                            <div className={styles.quarterGrade}>{item.credit[y]}</div>
                                            <div className={styles.quarterGrade}>{item.runBalance[y]}</div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default ViewBalances;
