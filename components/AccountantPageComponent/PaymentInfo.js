import React, { useState, useEffect } from 'react';
import styles from './paymentInfo.module.css';
import Button from '../UI/Button';

import { useRouter } from 'next/router';
import axios from 'axios';
import Modal from '../../components/Layout/Modal.';
function PaymentInfo() {
    const router = useRouter();
    const [data, setData] = useState([]);
    const [id, setID] = useState('');

    const [archive, setArchive] = useState(false);
    const [confirmation, setConfirmation] = useState(false);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/accountant/payinfo', {
                    withCredentials: true,
                });
                setData(response.data.payinfo);
                console.log(response.data.payinfo);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [archive]);

    const [search, setSearch] = useState('');
    const searchBarHandler = (event) => {
        setSearch(event.target.value);
    };
    const filter = (list) => {
        return list.filter((data) => data.title.toLowerCase().indexOf(search) > -1);
    };

    const deleteHandler = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/accountant/delete/${id}`, {
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
    console.log(id);

    return (
        <div>
            <div className={styles.container}>
                <h1 className={styles.header}>Payment Info</h1>
                <div className={styles.createButtonContainer}>
                    <Button
                        className={styles.createButton}
                        onClick={() => {
                            router.push('/accountant/PaymentInfo/CreatePaymentInfo');
                        }}
                    >
                        &#65291; Create Payment Info
                    </Button>
                </div>
                <div className={styles.filterContainer}>
                    <input className={styles.input} type="search" name="searchbar" id="searchbar" placeholder="Search title" onChange={searchBarHandler} />
                </div>

                <div className={styles.columnName}>Payment Info</div>
                <ul className={styles.listContainer}>
                    <h4 className={styles.name}>Title</h4>
                    {data &&
                        filter(data).map((item) => (
                            <li className={styles.itemContainer} key={item._id}>
                                <a className={styles.userName}>{item.title}</a>
                                <div className={styles.roleName}>
                                    <button
                                        className={styles.editButton}
                                        onClick={() => {
                                            router.push(`/accountant/PaymentInfo/EditPaymentInfo/${item._id}`);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className={styles.editButton}
                                        onClick={() => {
                                            setConfirmation(true);
                                            setID(item._id);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                </ul>
            </div>
            {confirmation && (
                <Modal className={styles.modalDesign}>
                    <div className={styles.messageContainer}>
                        <h2 className={styles.messageHeader}>Are you sure you want to delete this payment info?</h2>
                        <h4 className={styles.messageFooter}></h4>
                        <div className={styles.buttonConfirmationContainer}>
                            <Button className={styles.modalButtonYes} onClick={deleteHandler}>
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
            {archive && (
                <Modal className={styles.modalDesign}>
                    <div className={styles.messageContainer}>
                        <h2 className={styles.messageHeader}>Payment Info Successfully Deleted</h2>
                        <h4 className={styles.messageFooter}>Thank you.</h4>
                        <Button
                            className={styles.modalButton}
                            onClick={() => {
                                setArchive(false);
                                setConfirmation(false);
                            }}
                        >
                            Go back to payment info list
                        </Button>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default PaymentInfo;
