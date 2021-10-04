import React, { useState } from 'react';
import styles from './createAnnouncement.module.css';
import useInput from '../hooks/useInput';
import { useRouter } from 'next/router';
import axios from 'axios';
import Modal from '../../components/Layout/Modal.';
import Button from '../UI/Button';

function CreateAnnouncement() {
    const router = useRouter();

    const [sendEmail, setSendEmail] = useState(false);
    const [sendSMS, setSendSMS] = useState(false);
    const [valid, setValid] = useState(false);

    const {
        value: enteredTitle,
        isValid: enteredTitleIsValid,
        hasError: enteredTitleHasError,
        valueChangeHandler: titleChangeHandler,
        inputBlurHandler: titleBlurHandler,
    } = useInput((value) => value.trim() !== '');
    const {
        value: enteredContent,
        isValid: enteredContentIsValid,
        hasError: enteredContentHasError,
        valueChangeHandler: contentChangeHandler,
        inputBlurHandler: contentBlurHandler,
    } = useInput((value) => value.trim() !== '');

    const onSubmitHandler = (event) => {
        event.preventDefault();
        const anncData = {
            title: enteredTitle,
            content: enteredContent,
            asEmail: sendEmail,
            asSMS: sendSMS,
        };

        const postData = async () => {
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/principal/createannc`, anncData, { withCredentials: true });
                const data = response.data;

                if (data.success) {
                    setValid(true);
                }
                console.log(data.annc);
            } catch (error) {
                console.log(error);
            }
        };
        console.log(anncData);
        postData();
    };
    return (
        <div>
            <form className={styles.container} onSubmit={onSubmitHandler}>
                <h1 className={styles.header}>Create Announcement</h1>
                <div className={styles.formWrapper}>
                    <div className={styles.formContainer}>
                        <div
                            className={
                                !enteredTitleHasError
                                    ? styles.formFields
                                    : `${styles.formFields} 
                                          ${styles.invalid}`
                            }
                        >
                            <div className={styles.titleLabelContainer}>
                                <label htmlFor="title" className={styles.label}>
                                    Title
                                </label>
                            </div>
                            <div className={styles.titleInputContainer}>
                                <input type="text" required={true} id="title" className={styles.input} value={enteredTitle} onChange={titleChangeHandler} onBlur={titleBlurHandler} />
                            </div>
                        </div>
                        <div
                            className={
                                !enteredContentHasError
                                    ? styles.formFields
                                    : `${styles.formFields} 
                                          ${styles.invalid}`
                            }
                        >
                            <div className={styles.contentLabelContainer}>
                                <label htmlFor="content" className={styles.label}>
                                    Content
                                </label>
                            </div>
                            <div className={styles.contentInputContainer}>
                                <textarea type="text" required={true} id="content" className={styles.input} value={enteredContent} onChange={contentChangeHandler} onBlur={contentBlurHandler} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.controlFields}>
                        <div className={styles.buttonContainer}>
                            <Button className={styles.button} type={'submit'}>
                                Create
                            </Button>
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
                    </div>

                    {valid && (
                        <Modal className={styles.modalDesign}>
                            <div className={styles.messageContainer}>
                                <h2 className={styles.messageHeader}>Announcement Created</h2>
                                <h4 className={styles.messageBody}>Please check in the List of Announcement tab</h4>
                                <h4 className={styles.messageFooter}>Thank you.</h4>
                                <Button
                                    className={styles.modalButton}
                                    onClick={() => {
                                        router.push('/principal/Announcement');
                                    }}
                                >
                                    Go back to announcement list
                                </Button>
                            </div>
                        </Modal>
                    )}
                </div>
            </form>
        </div>
    );
}

export default CreateAnnouncement;
