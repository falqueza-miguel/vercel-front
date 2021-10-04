import React, { useState } from 'react';
import styles from './preRegistrationForm.module.css';
import axios from 'axios';
import Button from '../UI/Button';
import { useRouter } from 'next/router';
import Modal from '../Layout/Modal.';
function PreRegistrationForm(props) {
    const router = useRouter();
    const [reject, setReject] = useState(false);
    const [rejectSuccess, setRejectSuccess] = useState(false);
    const [updated, setUpdated] = useState(false);
    const onRejectClick = (event) => {
        setReject(true);
    };

    const updateData = async () => {
        try {
            axios.defaults.withCredentials = true;
            const response = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/registrar/preregs/${props.data._id}`, {
                withCredentials: true,
                credentials: 'include',
            });
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

    const rejectForm = async () => {
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/registrar/preregs/${props.data._id}`, { withCredentials: true });
            console.log(response);
            if (response.data.success) {
                setRejectSuccess(true);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className={styles.container}>
            <h1 className={styles.formHeader}>Pre-Registration Form</h1>
            <div className={styles.formContainer}>
                <div className={styles.yearSection}>
                    <div>
                        <label htmlFor="returningStud">Returning Student?</label>
                        {props.data.returning ? <h1>&#10004;</h1> : <h1>&#10006;</h1>}
                    </div>
                    <div>
                        <label htmlFor="yearfrom">Year From</label>
                        <div className={styles.input}>{props.data.schoolYearFrom}</div>
                    </div>
                    <div>
                        <label htmlFor="yearto">Year To</label>
                        <div className={styles.input}>{props.data.schoolYearTo}</div>
                    </div>
                    <div>
                        <label htmlFor="grade">Grade to enroll</label>
                        <div className={styles.input}>{props.data.levelEnroll}</div>
                    </div>
                </div>
                <h2 className={styles.typeHeader}>Student</h2>
                <div className={styles.studentSection}>
                    <div>
                        <label htmlFor="birthCert">PSA Birth Certificate No.</label>
                        <div className={styles.input}>{props.data.PSANo}</div>
                    </div>
                    <div>
                        <label htmlFor="lrn">Learner Reference No.</label>
                        <div className={styles.input}>{props.data.LRNNo}</div>
                    </div>
                    <div>
                        <label htmlFor="fname">First Name</label>
                        <div className={styles.input}>{props.data.studentFirstName}</div>
                    </div>
                    <div>
                        <label htmlFor="birthdate">Date of Birth</label>
                        <div className={styles.input}>{props.data.birthDate}</div>
                    </div>
                    <div>
                        <label htmlFor="lname">Last Name</label>
                        <div className={styles.input}>{props.data.studentLastName}</div>
                    </div>
                    <div>
                        <label htmlFor="gender">Gender</label>
                        <div className={styles.input}>{props.data.gender}</div>
                    </div>
                    <div>
                        <label htmlFor="mname">Middle Name</label>
                        <div className={styles.input}>{props.data.studentMiddleName}</div>
                    </div>
                    <div>
                        <label htmlFor="isIndig">Belong in indigenous community?</label>
                        {props.data.indig ? <h1 className={styles.indig}>&#10004;</h1> : <h1>&#10006;</h1>}
                    </div>
                    <div>
                        <label htmlFor="mtounge">Mother Tounge</label>
                        <div className={styles.input}>{props.data.motherTongue}</div>
                    </div>
                    <div>
                        <label htmlFor="indigenous">Indigenous name</label>
                        <div className={styles.input}>{props.data.indigSpec}</div>
                    </div>
                    <div>
                        <label htmlFor="add1">Address Line 1</label>
                        <div className={styles.input}>{props.data.address1}</div>
                    </div>
                    <div>
                        <label htmlFor="add2">Address Line 2</label>
                        <div className={styles.input}>{props.data.address2}</div>
                    </div>
                    <div>
                        <label htmlFor="zip">Zip Code</label>
                        <div className={styles.input}>{props.data.zipCode}</div>
                    </div>
                    <div>
                        <label htmlFor="email">E-mail</label>
                        <div className={styles.input}>{props.data.email}</div>
                    </div>
                    <div>
                        <label htmlFor="mobileno">Cellphone no.</label>
                        <div className={styles.input}>{props.data.phoneNum}</div>
                    </div>
                </div>
                <h2 className={styles.typeHeader}>Parents</h2>
                <div className={styles.parentsSection}>
                    <h4 className={styles.typeSubHeader}>Mother</h4>
                    <h4 className={styles.typeSubHeader}>Father</h4>
                    <div>
                        <label htmlFor="motherfname">First Name</label>
                        <div className={styles.input}>{props.data.motherFirstName}</div>
                    </div>
                    <div>
                        <label htmlFor="fatherfname">First Name</label>
                        <div className={styles.input}>{props.data.fatherFirstName}</div>
                    </div>
                    <div>
                        <label htmlFor="motherlname">Last Name</label>
                        <div className={styles.input}>{props.data.motherLastName}</div>
                    </div>
                    <div>
                        <label htmlFor="fatherlname">Last Name</label>
                        <div className={styles.input}>{props.data.fatherLastName}</div>
                    </div>
                    <div>
                        <label htmlFor="mothermidname">Middle Name</label>
                        <div className={styles.input}>{props.data.motherMiddleName}</div>
                    </div>
                    <div>
                        <label htmlFor="fathermidname">Middle Name</label>
                        <div className={styles.input}>{props.data.fatherMiddleName}</div>
                    </div>
                    <div>
                        <label htmlFor="parentEmail">Parent Email (Any)</label>
                        <div className={styles.input}>{props.data.parentEmail}</div>
                    </div>
                    <div>
                        <label htmlFor="parentNum">Parent Mobile no.</label>
                        <div className={styles.input}>{props.data.parentPhoneNum}</div>
                    </div>
                    <h4 className={styles.typeSubHeader}>Guardian</h4>
                    <h4 className={styles.typeSubHeader}>Emergency Contact</h4>
                    <div>
                        <label htmlFor="guardianfname">First Name</label>
                        <div className={styles.input}>{props.data.guardianFirstName}</div>
                    </div>

                    <div>
                        <label htmlFor="emergencyname">Name</label>
                        <div className={styles.input}>{props.data.emergencyName}</div>
                    </div>
                    <div>
                        <label htmlFor="guardianlname">Last Name</label>
                        <div className={styles.input}>{props.data.guardianLastName}</div>
                    </div>
                    <div>
                        <label htmlFor="emergencymobileno">Cellphone No.</label>
                        <div className={styles.input}>{props.data.emergencyCellphone}</div>
                    </div>
                    <div>
                        <label htmlFor="guardianmidname">Middle Name</label>
                        <div className={styles.input}>{props.data.guardianMiddleName}</div>
                    </div>
                    <div>
                        <label htmlFor="emergencytelno">Telephone No.</label>
                        <div className={styles.input}>{props.data.emergencyTelephone}</div>
                    </div>
                </div>
                <div className={styles.forStudentsContainer}>
                    <h2 className={styles.typeHeader}>For returning Students</h2>
                    <h2 className={styles.typeHeader}>For SHS students</h2>
                    <div>
                        <label htmlFor="lastgradelvl">Last Grade Level Completed</label>
                        <div className={styles.input}>{props.data.lastGradeLevel}</div>
                    </div>
                    <div>
                        <label>Semester</label>

                        <div className={styles.input}>{props.data.semester}</div>
                    </div>
                    <div>
                        <label htmlFor="lastschoolyrlvl">Last School Year Completed</label>
                        <div className={styles.input}>{props.data.lastSchoolYear}</div>
                    </div>
                    <div>
                        <label htmlFor="track">Track</label>
                        <div className={styles.input}>{props.data.track}</div>
                    </div>

                    <div>
                        <label htmlFor="strand">Strand</label>
                        <div className={styles.input}>{props.data.strand}</div>
                    </div>
                    <div>
                        <label htmlFor="schoolname">School Name</label>
                        <div className={styles.input}>{props.data.schoolName}</div>
                    </div>
                    <div>
                        <label htmlFor="schoolAdd">School Address</label>
                        <div className={styles.input}>{props.data.schoolAddress}</div>
                    </div>
                </div>
                <h2 className={styles.typeHeader}>Preferred Distance Learning Methods</h2>
                <div className={styles.checkboxContainer}>
                    <label htmlFor="item1" className={styles.radioContainer}>
                        Modular (Print)
                        {props.data.modularP ? <h1>&#10004;</h1> : <h1>&#10006;</h1>}
                    </label>
                    <label htmlFor="item2" className={styles.radioContainer}>
                        Modular (Digital)
                        {props.data.modularD ? <h1>&#10004;</h1> : <h1>&#10006;</h1>}
                    </label>
                    <label htmlFor="item3" className={styles.radioContainer}>
                        Online
                        {props.data.online ? <h1>&#10004;</h1> : <h1>&#10006;</h1>}
                    </label>
                    <label htmlFor="item4" className={styles.radioContainer}>
                        Educational TV
                        {props.data.educTV ? <h1>&#10004;</h1> : <h1>&#10006;</h1>}
                    </label>
                    <label htmlFor="item5" className={styles.radioContainer}>
                        Radio Based Instruction
                        {props.data.radioBased ? <h1>&#10004;</h1> : <h1>&#10006;</h1>}
                    </label>
                    <label htmlFor="item6" className={styles.radioContainer}>
                        Homeschooling
                        {props.data.homeschool ? <h1>&#10004;</h1> : <h1>&#10006;</h1>}
                    </label>
                    <label htmlFor="item7" className={styles.radioContainer}>
                        Blended
                        {props.data.blended ? <h1>&#10004;</h1> : <h1>&#10006;</h1>}
                    </label>
                    <label htmlFor="item8" className={styles.radioContainer}>
                        Face to face
                        {props.data.facetoface ? <h1>&#10004;</h1> : <h1>&#10006;</h1>}
                    </label>
                </div>
                <div className={styles.buttonContainer}>
                    <Button className={styles.submitButton} onClick={updateData}>
                        Approve
                    </Button>
                    <Button className={styles.submitButton} onClick={onRejectClick}>
                        Reject
                    </Button>
                </div>
                {updated && (
                    <Modal className={styles.modalDesign}>
                        <div className={styles.messageContainer}>
                            <h2 className={styles.messageHeader}>Pre-registration accepted</h2>
                            <h4 className={styles.messageBody}>Please check to the List of Student</h4>

                            <Button
                                className={styles.modalButton}
                                onClick={() => {
                                    router.push('/registrar/PreRegistration');
                                }}
                            >
                                Go back to Pre-registration list
                            </Button>
                        </div>
                    </Modal>
                )}
                {reject && (
                    <Modal className={styles.modalDesign}>
                        <div className={styles.messageContainer}>
                            <h2 className={styles.messageHeader}>Are you sure you want to reject the form?</h2>

                            <div className={styles.modalButtonContainer}>
                                <Button className={styles.modalButton} onClick={rejectForm}>
                                    Yes
                                </Button>
                                <Button
                                    className={styles.modalButton}
                                    onClick={() => {
                                        setReject(false);
                                    }}
                                >
                                    No
                                </Button>
                            </div>
                        </div>
                    </Modal>
                )}

                {rejectSuccess && (
                    <Modal className={styles.modalDesign}>
                        <div className={styles.messageContainer}>
                            <h2 className={styles.messageHeader}>The Pre-registration has been successfully rejected</h2>

                            <Button
                                className={styles.modalButton}
                                onClick={() => {
                                    router.push('/registrar/PreRegistration');
                                }}
                            >
                                Go back to list
                            </Button>
                        </div>
                    </Modal>
                )}
            </div>
        </div>
    );
}

export default PreRegistrationForm;
