import React, { useRef, useState } from 'react';

import styles from './preregform.module.css';

import { useRouter } from 'next/router';

import axios from 'axios';
import Button from '../../components/UI/Button';
import Modal from '../../components/Layout/Modal.';
function PreRegForm(props) {
    const router = useRouter();
    const [valid, setValid] = useState(false);

    const [onReturningStudent, setOnReturningStudent] = useState(false);
    const [isIndig, setIsIndig] = useState(false);
    const [firstSemester, setfirstSemester] = useState(false);
    const [secondSemester, setsecondSemester] = useState(false);
    const [firstItem, setFirstItem] = useState(false);
    const [secondItem, setSecondItem] = useState(false);
    const [thirdItem, setThirdItem] = useState(false);
    const [fourthItem, setFourthItem] = useState(false);
    const [fifthItem, setFifthItem] = useState(false);
    const [sixthItem, setSixthItem] = useState(false);
    const [seventhItem, setSeventhItem] = useState(false);
    const [eighthItem, setEighthItem] = useState(false);

    const [errorMes, setErrorMes] = useState(false);
    const [lrnError, setLrnError] = useState(false);

    const [disableSHS, setDisableSHS] = useState(true);
    const [disableReturning, setDisableReturning] = useState(true);

    const [grade, setGrade] = useState('7');
    const gradeHandler = (event) => {
        setGrade(event.target.value);
        if (event.target.value !== '11' && event.target.value !== '12') {
            setDisableSHS(true);
        } else {
            setDisableSHS(false);
        }
    };
    const [errorMesParent, setErrorMesParent] = useState(false);

    let hasLRN = false;
    let semester = '';
    // student var

    const yearFromRef = useRef();
    const yeartoRef = useRef();
    const gradeRef = useRef();
    const birthCertRef = useRef();
    const lrnRef = useRef();
    const fnameRef = useRef();
    const birthdateRef = useRef(Date);
    const lnameRef = useRef();
    const genderRef = useRef();
    const mnameRef = useRef();
    const isIndigenousRef = useRef();
    const mtoungeRef = useRef();
    const indigenousRef = useRef();
    const add1Ref = useRef();
    const add2Ref = useRef();
    const zipRef = useRef();
    const emailRef = useRef();
    const mobilenoRef = useRef();

    // parents
    const motherfnameRef = useRef();
    const fatherfnameRef = useRef();
    const motherlnameRef = useRef();
    const fatherlnameRef = useRef();
    const mothermidnameRef = useRef();
    const fathermidnameRef = useRef();
    const parentEmailRef = useRef();
    const parentNumRef = useRef();
    const guardianfnameRef = useRef();
    const emergencynameRef = useRef();
    const guardianlnameRef = useRef();
    const emergencymobilenoRef = useRef();
    const guardianmidnameRef = useRef();
    const emergencytelnoRef = useRef();

    // returning stud
    const lastgradelvlRef = useRef();
    const semesterRef = useRef();
    const lastschoolyrlvlRef = useRef();
    const trackRef = useRef();
    const schoolnameRef = useRef();
    const strandRef = useRef();
    const schoolAddRef = useRef();

    const onSubmitHandler = (event) => {
        console.log(lrnRef.current.value.length);
        event.preventDefault();
        if (lrnRef.current.value > 0) {
            hasLRN = true;
        }
        if (grade === '11' || grade === '12') {
            if (firstSemester) {
                semester = '1st';
            } else {
                semester = '2nd';
            }
        } else {
            semester = '';
        }

        if (lrnRef.current.value.length === 12) {
            console.log('valid');
            const preRegData = {
                schoolYearFrom: yearFromRef.current.value,
                schoolYearTo: yeartoRef.current.value,
                levelEnroll: grade,
                hasLRN: hasLRN,
                returning: onReturningStudent,
                PSANo: birthCertRef.current.value,
                LRNNo: lrnRef.current.value,
                studentFirstName: fnameRef.current.value,
                studentMiddleName: mnameRef.current.value,
                studentLastName: lnameRef.current.value,
                birthDate: birthdateRef.current.value,
                gender: genderRef.current.value,
                indig: isIndig,
                indigSpec: indigenousRef.current.value,
                motherTongue: mtoungeRef.current.value,
                address1: add1Ref.current.value,
                address2: add2Ref.current.value,
                zipCode: zipRef.current.value,
                email: emailRef.current.value,
                phoneNum: mobilenoRef.current.value,
                motherFirstName: motherfnameRef.current.value,
                motherMiddleName: mothermidnameRef.current.value,
                motherLastName: motherlnameRef.current.value,
                fatherFirstName: fatherfnameRef.current.value,
                fatherMiddleName: fathermidnameRef.current.value,
                fatherLastName: fatherlnameRef.current.value,
                guardianFirstName: guardianfnameRef.current.value,
                guardianMiddleName: guardianmidnameRef.current.value,
                guardianLastName: guardianlnameRef.current.value,
                emergencyName: emergencynameRef.current.value,
                emergencyTelephone: emergencytelnoRef.current.value,
                emergencyCellphone: emergencymobilenoRef.current.value,
                parentEmail: parentEmailRef.current.value,
                parentPhoneNum: parentNumRef.current.value,
                lastGradeLevel: lastgradelvlRef.current.value,
                lastSchoolYear: lastschoolyrlvlRef.current.value,
                schoolName: schoolnameRef.current.value,
                schoolAddress: schoolAddRef.current.value,
                semester: semester,
                track: trackRef.current.value,
                strand: strandRef.current.value,
                modularP: firstItem,
                modularD: secondItem,
                online: thirdItem,
                educTV: fourthItem,
                radioBased: fifthItem,
                homeschool: sixthItem,
                blended: seventhItem,
                facetoface: eighthItem,
            };
            const postData = async () => {
                try {
                    const response = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/prereg`, preRegData);

                    console.log(response.data);
                    if (response.data === 'prereg created!') {
                        setValid(true);
                    } else if (response.data === 'student email exists!') {
                        setErrorMes(true);
                        setErrorMesParent(false);
                    } else if (response.data === 'parent email exists!') {
                        setErrorMes(false);
                        setErrorMesParent(true);
                    }
                } catch (error) {
                    console.log(error);
                }
            };
            console.log(preRegData);
            postData();
            console.log(semester);
        } else {
            setLrnError(true);
            console.log('not valid');
        }
    };

    return (
        <form className={styles.container} onSubmit={onSubmitHandler}>
            <h1 className={styles.formHeader}>Pre-Registration Form</h1>
            <div className={styles.formContainer}>
                <div className={styles.yearSection}>
                    <div>
                        <label htmlFor="returningStud">Returning Student?</label>
                        <input
                            type="checkbox"
                            name="returningStud"
                            id="returningStud"
                            className={styles.returningcheckbox}
                            checked={onReturningStudent}
                            onChange={(e) => {
                                setOnReturningStudent(!onReturningStudent);
                                if (e.target.value) {
                                    setDisableReturning(false);
                                } else {
                                    setDisableReturning(true);
                                }
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="yearfrom">Year From</label>
                        <input type="number" min="0" id="yearfrom" required={true} ref={yearFromRef} />
                    </div>
                    <div>
                        <label htmlFor="yearto">Year To</label>
                        <input type="number" min="0" id="yearto" required={true} ref={yeartoRef} />
                    </div>
                    <div className={styles.dropdown}>
                        <label className={styles.dropdownName}>Grade Level</label>
                        <select name="gradeLevel" id="gradeLevel" onChange={gradeHandler} value={grade}>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select>
                    </div>
                    {/* <div>
                                    <label htmlFor="grade">
                                          Grade to enroll
                                    </label>
                                    <input
                                          type="number"
                                          min="0"
                                          id="grade"
                                          required={true}
                                          ref={gradeRef}
                                    />
                              </div> */}
                </div>
                <h2 className={styles.typeHeader}>Student</h2>
                <div className={styles.studentSection}>
                    <div>
                        <label htmlFor="birthCert">PSA Birth Certificate No.</label>
                        <input type="number" min="0" id="birthCert" required={true} ref={birthCertRef} />
                    </div>
                    <div>
                        <label htmlFor="lrn">Learner Reference No.</label>
                        <input type="number" min="0" id="lrn" ref={lrnRef} />
                        {lrnError && <p className={styles.errorMes}>LRN should be 12 numbers long</p>}
                    </div>
                    <div>
                        <label htmlFor="fname">First Name</label>
                        <input type="text" id="fname" required={true} ref={fnameRef} />
                    </div>
                    <div>
                        <label htmlFor="birthdate">Date of Birth</label>
                        <input type="date" id="birthdate" required={true} ref={birthdateRef} />
                    </div>
                    <div>
                        <label htmlFor="mname">Middle Name</label>
                        <input type="text" id="mname" required={true} ref={mnameRef} />
                    </div>

                    <div>
                        <label htmlFor="gender">Gender</label>
                        <input type="text" id="gender" required={true} ref={genderRef} />
                    </div>
                    <div>
                        <label htmlFor="lname">Last Name</label>
                        <input type="text" id="lname" ref={lnameRef} required={true} />
                    </div>
                    <div>
                        <label htmlFor="isIndig">Belong in indigenous community?</label>
                        <input type="checkbox" name="isIndig" id="isIndig" className={styles.isIndig} checked={isIndig} onChange={() => setIsIndig(!isIndig)} />
                    </div>
                    <div>
                        <label htmlFor="mtounge">Mother Tounge</label>
                        <input type="text" id="mtounge" ref={mtoungeRef} required={true} />
                    </div>
                    <div>
                        <label htmlFor="indigenous">Indigenous name</label>
                        <input type="text" id="indigenous" ref={indigenousRef} disabled={!isIndig} />
                    </div>
                    <div>
                        <label htmlFor="add1">Address Line 1</label>
                        <input type="text" id="add1" required={true} ref={add1Ref} />
                    </div>
                    <div>
                        <label htmlFor="add2">Address Line 2</label>
                        <input type="text" id="add2" ref={add2Ref} />
                    </div>
                    <div>
                        <label htmlFor="zip">Zip Code</label>
                        <input type="number" min="0" id="zip" ref={zipRef} required={true} />
                    </div>
                    <div className={errorMes ? styles.invalid : ''}>
                        <label htmlFor="email">E-mail</label>
                        <input type="email" id="email" ref={emailRef} required={true} />
                        {errorMes && <p className={styles.errorMes}>Email already exist</p>}
                    </div>
                    <div>
                        <label htmlFor="mobileno">Cellphone no.</label>
                        <input type="number" min="0" id="mobileno" ref={mobilenoRef} required={true} />
                    </div>
                </div>

                {/* PARENTS SECTION */}
                <h2 className={styles.typeHeader}>Parents</h2>
                <div className={styles.parentsSection}>
                    <h4 className={styles.typeSubHeader}>Mother</h4>
                    <h4 className={styles.typeSubHeader}>Father</h4>
                    <div>
                        <label htmlFor="motherfname">First Name</label>
                        <input type="text" id="motherfname" ref={motherfnameRef} required={true} />
                    </div>
                    <div>
                        <label htmlFor="fatherfname">First Name</label>
                        <input type="text" id="fatherfname" ref={fatherfnameRef} required={true} />
                    </div>
                    <div>
                        <label htmlFor="motherlname">Last Name</label>
                        <input type="text" id="motherlname" ref={motherlnameRef} required={true} />
                    </div>
                    <div>
                        <label htmlFor="fatherlname">Last Name</label>
                        <input type="text" id="fatherlname" ref={fatherlnameRef} required={true} />
                    </div>
                    <div>
                        <label htmlFor="mothermidname">Middle Name</label>
                        <input type="text" id="mothermidname" ref={mothermidnameRef} required={true} />
                    </div>
                    <div>
                        <label htmlFor="fathermidname">Middle Name</label>
                        <input type="text" id="fathermidname" ref={fathermidnameRef} required={true} />
                    </div>
                    <div className={errorMesParent ? styles.invalid : ''}>
                        <label htmlFor="parentEmail">Parent Email (Any)</label>
                        <input type="email" id="parentEmail" ref={parentEmailRef} required={true} />
                        {errorMesParent && <p className={styles.errorMes}>Email already exist</p>}
                    </div>
                    <div>
                        <label htmlFor="parentNum">Parent Mobile no.</label>
                        <input type="number" id="parentNum" ref={parentNumRef} required={true} />
                    </div>
                    <h4 className={styles.typeSubHeader}>Guardian</h4>
                    <h4 className={styles.typeSubHeader}>Emergency Contact</h4>
                    <div>
                        <label htmlFor="guardianfname">First Name</label>
                        <input type="text" id="guardianfname" ref={guardianfnameRef} required={true} />
                    </div>
                    <div>
                        <label htmlFor="emergencyname">Name</label>
                        <input type="text" id="emergencyname" ref={emergencynameRef} required={true} />
                    </div>
                    <div>
                        <label htmlFor="guardianlname">Last Name</label>
                        <input type="text" id="guardianlname" ref={guardianlnameRef} required={true} />
                    </div>
                    <div>
                        <label htmlFor="emergencymobileno">Cellphone No.</label>
                        <input type="number" min="0" id="emergencymobileno" ref={emergencymobilenoRef} required={true} />
                    </div>
                    <div>
                        <label htmlFor="guardianmidname">Middle Name</label>
                        <input type="text" id="guardianmidname" ref={guardianmidnameRef} required={true} />
                    </div>
                    <div>
                        <label htmlFor="emergencytelno">Telephone No.</label>
                        <input type="number" min="0" id="emergencytelno" ref={emergencytelnoRef} required={true} />
                    </div>
                </div>
                <div className={styles.forStudentsContainer}>
                    <h2 className={styles.typeHeader}>For returning Students</h2>
                    <h2 className={styles.typeHeader}>For SHS students</h2>
                    <div>
                        <label htmlFor="lastgradelvl">Last Grade Level Completed</label>
                        <input
                            type="number"
                            min="0"
                            id="lastgradelvl"
                            ref={lastgradelvlRef}
                            disabled={disableReturning}
                            // required={true}
                        />
                    </div>
                    <div>
                        <label>Semester</label>
                        <div className={styles.radioInput}>
                            <div>
                                <input
                                    type="radio"
                                    name="semester"
                                    id="1stsemester"
                                    ref={semesterRef}
                                    disabled={disableSHS}
                                    // required={true}
                                    checked={firstSemester}
                                    onChange={() => {
                                        setfirstSemester(!firstSemester);
                                    }}
                                />
                                <label htmlFor="1stsemester">1st</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    name="semester"
                                    id="2ndsemester"
                                    ref={semesterRef}
                                    disabled={disableSHS}
                                    // required={true}
                                    checked={secondSemester}
                                    onChange={() => {
                                        setsecondSemester(!secondSemester);
                                    }}
                                />
                                <label htmlFor="2ndsemester">2nd</label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="lastschoolyrlvl">Last School Year Completed</label>
                        <input
                            type="number"
                            min="0"
                            id="lastschoolyrlvl"
                            ref={lastschoolyrlvlRef}
                            disabled={disableReturning}
                            // required={true}
                        />
                    </div>
                    <div>
                        <label htmlFor="track">Track</label>
                        <input
                            type="text"
                            id="track"
                            ref={trackRef}
                            disabled={disableSHS}
                            // required={true}
                        />
                    </div>
                    <div>
                        <label htmlFor="strand">Strand</label>
                        <input
                            type="text"
                            id="strand"
                            disabled={disableSHS}
                            // required={true}
                            ref={strandRef}
                        />
                    </div>
                    <div>
                        <label htmlFor="schoolname">School Name</label>
                        <input
                            type="text"
                            id="schoolname"
                            // required={true}
                            ref={schoolnameRef}
                            disabled={disableReturning}
                        />
                    </div>

                    <div>
                        <label htmlFor="schoolAdd">School Address</label>
                        <input
                            type="text"
                            id="schoolAdd"
                            ref={schoolAddRef}
                            disabled={disableReturning}
                            // required={true}
                        />
                    </div>
                </div>
                <h2 className={styles.typeHeader}>Preferred Distance Learning Methods</h2>
                <div className={styles.checkboxContainer}>
                    <label htmlFor="item1" className={styles.radioContainer}>
                        Modular (Print)
                        <input type="checkbox" name="item1" id="item1" checked={firstItem} onChange={() => setFirstItem(!firstItem)} />
                        <span className={styles.checkmark}></span>
                    </label>
                    <label htmlFor="item2" className={styles.radioContainer}>
                        Modular (Digital)
                        <input type="checkbox" name="item2" id="item2" checked={secondItem} onChange={() => setSecondItem(!secondItem)} />
                        <span className={styles.checkmark}></span>
                    </label>
                    <label htmlFor="item3" className={styles.radioContainer}>
                        Online
                        <input type="checkbox" name="item3" id="item3" checked={thirdItem} onChange={() => setThirdItem(!thirdItem)} />
                        <span className={styles.checkmark}></span>
                    </label>
                    <label htmlFor="item4" className={styles.radioContainer}>
                        Educational TV
                        <input type="checkbox" name="item4" id="item4" checked={fourthItem} onChange={() => setFourthItem(!fourthItem)} />
                        <span className={styles.checkmark}></span>
                    </label>
                    <label htmlFor="item5" className={styles.radioContainer}>
                        Radio Based Instruction
                        <input type="checkbox" name="item5" id="item5" checked={fifthItem} onChange={() => setFifthItem(!fifthItem)} />
                        <span className={styles.checkmark}></span>
                    </label>
                    <label htmlFor="item6" className={styles.radioContainer}>
                        Homeschooling
                        <input type="checkbox" name="item6" id="item6" checked={sixthItem} onChange={() => setSixthItem(!sixthItem)} />
                        <span className={styles.checkmark}></span>
                    </label>
                    <label htmlFor="item7" className={styles.radioContainer}>
                        Blended
                        <input type="checkbox" name="item7" id="item7" checked={seventhItem} onChange={() => setSeventhItem(!seventhItem)} />
                        <span className={styles.checkmark}></span>
                    </label>
                    <label htmlFor="item8" className={styles.radioContainer}>
                        Face to face
                        <input type="checkbox" name="item8" id="item8" checked={eighthItem} onChange={() => setEighthItem(!eighthItem)} />
                        <span className={styles.checkmark}></span>
                    </label>
                </div>
                <Button type={'submit'}> Submit</Button>
                {valid && (
                    <Modal className={styles.modalDesign}>
                        <div className={styles.messageContainer}>
                            <h2 className={styles.messageHeader}>Pre-registration form submitted</h2>
                            <h4 className={styles.messageFooter}>Thank you.</h4>
                            <Button
                                className={styles.modalButton}
                                onClick={() => {
                                    router.push('/');
                                }}
                            >
                                Go back to Login Page
                            </Button>
                        </div>
                    </Modal>
                )}
            </div>
        </form>
    );
}

export default PreRegForm;
