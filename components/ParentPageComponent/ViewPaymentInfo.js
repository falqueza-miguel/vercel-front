import React, { useState, useEffect } from 'react';
import styles from './viewPaymentInfo.module.css';
import axios from 'axios';

function ViewPaymentInfo() {
    const [data, setData] = useState([]);
    const [showPaymentHandler, setShowPaymentHandler] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/parent/payinfo`, {
                    withCredentials: true,
                });

                console.log(response.data.payinfo);
                setData(response.data.payinfo);
                setShowPaymentHandler([true]);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const setShowPaymentClickHandler = (e, index) => {
        const list = [...showPaymentHandler];
        list[index] = e;
        setShowPaymentHandler(list);
        console.log(list);
    };
    return (
        <div>
            <ul className={styles.paymentInfo}>
                <h1 className={styles.paymentInfoHeader}>Payment Info</h1>

                {data.map((item, i) => (
                    <li
                        className={styles.paymentInfoItemContainer}
                        onClick={() => {
                            setShowPaymentClickHandler(!showPaymentHandler[i], i);
                        }}
                        key={item._id}
                    >
                        <div className={styles.title}>
                            <h1>{item.title}</h1>
                            <h4 className={styles.date}>{item.createdAt.toLocaleString().slice(0, 10)}</h4>
                        </div>
                        {showPaymentHandler[i] && (
                            <div>
                                <div className={styles.announcement}>
                                    <p className={styles.contentArea}>{item.content}</p>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ViewPaymentInfo;
