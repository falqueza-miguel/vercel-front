import React, { useState, useEffect } from 'react';
import styles from './editPaymentInfo.module.css';
import { useRouter } from 'next/router';
import axios from 'axios';
import Modal from '../../components/Layout/Modal.';
import Button from '../UI/Button';

function EditPaymentInfo(props) {
    const router = useRouter();
    const [updated, setUpdated] = useState(false);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/accountant/payinfo/${props.id}`, {
                    withCredentials: true,
                });
                setTitle(response.data.payinfo.title);
                setContent(response.data.payinfo.content);
                setData(response.data.payinfo);
                console.log(response.data.payinfo);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [props.id]);

    const onSubmitHandler = (event) => {
        event.preventDefault();
        const paymentInfoData = {
            title: title,
            content: content,
        };

        const postData = async () => {
            try {
                const response = await axios.put(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/accountant/payinfo/${props.id}`, paymentInfoData, { withCredentials: true });
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
    return (
        <form className={styles.container} onSubmit={onSubmitHandler}>
            <h1 className={styles.header}>Edit Payment Info</h1>
            <div className={styles.formWrapper}>
                <div className={styles.formContainer}>
                    <div className={styles.formFields}>
                        <div className={styles.titleLabelContainer}>
                            <label htmlFor="title" className={styles.label}>
                                Title
                            </label>
                        </div>
                        <div className={styles.titleInputContainer}>
                            <input
                                type="text"
                                id="title"
                                className={styles.input}
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className={styles.formFields}>
                        <div className={styles.contentLabelContainer}>
                            <label htmlFor="content" className={styles.label}>
                                Content
                            </label>
                        </div>
                        <div className={styles.contentInputContainer}>
                            <textarea
                                type="text"
                                id="content"
                                className={styles.input && styles.textarea}
                                value={content}
                                onChange={(e) => {
                                    setContent(e.target.value);
                                }}
                            />
                        </div>
                    </div>

                    <div className={styles.buttonContainer}>
                        <Button className={styles.buttonUpdate} type={'submit'}>
                            Update
                        </Button>
                    </div>

                    {updated && (
                        <Modal className={styles.modalDesign}>
                            <div className={styles.messageContainer}>
                                <h2 className={styles.messageHeader}>Payment Info Updated</h2>
                                <h4 className={styles.messageBody}>Please check in the updated payment info list.</h4>
                                <h4 className={styles.messageFooter}>Thank you.</h4>
                                <Button
                                    className={styles.modalButton}
                                    onClick={() => {
                                        router.push('/accountant/PaymentInfo');
                                    }}
                                >
                                    Go back to payment info list
                                </Button>
                            </div>
                        </Modal>
                    )}
                </div>
            </div>
        </form>
    );
}

export default EditPaymentInfo;
