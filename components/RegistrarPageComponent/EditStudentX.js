import React, { useRef, useState, useEffect } from 'react';

import styles from './editStudentX.module.css';

import { useRouter } from 'next/router';
import Modal from '../../components/Layout/Modal.';
import axios from 'axios';
import Button from '../UI/Button';
function PreRegFormEdit(props) {
    const [updated, setUpdated] = useState(false);
    const [archive, setArchive] = useState(false);
    const [confirmation, setConfirmation] = useState(false);
    const router = useRouter();
    const id = router.query.id;

    //from fetch

    // FOR CHECKBOXES AND RADIO
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
    const [grade, setGrade] = useState('');
    const [birthDate, setBirthDate] = useState();
    const gradeHandler = (event) => {
        setGrade(event.target.value);
    };
    const birthDateHandler = (event) => {
        setBirthDate(event.target.value);
    };

    // REFS
    const yearFromRef = useRef();
    const yeartoRef = useRef();
    const birthCertRef = useRef();
    const lrnRef = useRef();
    const fnameRef = useRef();
    const lnameRef = useRef();
    const genderRef = useRef();
    const mnameRef = useRef();
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

    const [schoolYearFromIsTouched, setSchoolYearFromIsTouched] = useState(false);
    const [schoolYearToIsTouched, setSchoolYearToIsTouched] = useState(false);
    const [PSANoIsTouched, setPSANoIsTouched] = useState(false);
    const [LRNNoIsTouched, setLRNNoIsTouched] = useState(false);
    const [fnameIsTouched, setfnameIsTouched] = useState(false);
    const [mnameIsTouched, setmnameIsTouched] = useState(false);
    const [lnameIsTouched, setlnameIsTouched] = useState(false);
    const [genderIsTouched, setGenderIsTouched] = useState(false);
    const [indigSpecIsTouched, setindigSpecIsTouched] = useState(false);
    const [motherTongueIsTouched, setmotherTongueIsTouched] = useState(false);
    const [address1IsTouched, setaddress1IsTouched] = useState(false);
    const [address2IsTouched, setaddress2IsTouched] = useState(false);
    const [zipCodeIsTouched, setzipCodeIsTouched] = useState(false);
    const [phoneNumIsTouched, setphoneNumIsTouched] = useState(false);
    const [motherFirstNameIsTouched, setmotherFirstNameIsTouched] = useState(false);
    const [motherMiddleNameIsTouched, setmotherMiddleNameIsTouched] = useState(false);
    const [motherLastNameIsTouched, setmotherLastNameIsTouched] = useState(false);
    const [fatherFirstNameIsTouched, setfatherFirstNameIsTouched] = useState(false);
    const [fatherMiddleNameIsTouched, setfatherMiddleNameIsTouched] = useState(false);
    const [fatherLastNameIsTouched, setfatherLastNameIsTouched] = useState(false);
    const [guardianFirstNameIsTouched, setguardianFirstNameIsTouched] = useState(false);
    const [guardianMiddleNameIsTouched, setguardianMiddleNameIsTouched] = useState(false);
    const [guardianLastNameIsTouched, setguardianLastNameIsTouched] = useState(false);
    const [emergencyNameIsTouched, setemergencyNameIsTouched] = useState(false);
    const [emergencyTelephoneIsTouched, setemergencyTelephoneIsTouched] = useState(false);
    const [emergencyCellphoneIsTouched, setemergencyCellphoneIsTouched] = useState(false);
    const [parentPhoneNumIsTouched, setparentPhoneNumIsTouched] = useState(false);
    const [lastGradeLevelIsTouched, setlastGradeLevelIsTouched] = useState(false);
    const [lastSchoolYearIsTouched, setlastSchoolYearIsTouched] = useState(false);
    const [schoolNameIsTouched, setschoolNameIsTouched] = useState(false);
    const [schoolAddressIsTouched, setschoolAddressIsTouched] = useState(false);

    const [trackIsTouched, settrackIsTouched] = useState(false);
    const [strandIsTouched, setstrandIsTouched] = useState(false);

    let semester = '';

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/registrar/students/${id}`, {
                    withCredentials: true,
                });
                const data = await response.data.user;
                const extraData = await response.data.userInfo;
                setFirstItem(extraData.modularP);
                setSecondItem(extraData.modularD);
                setThirdItem(extraData.online);
                setFourthItem(extraData.educTV);
                setFifthItem(extraData.radioBased);
                setSixthItem(extraData.homeschool);
                setSeventhItem(extraData.blended);
                setEighthItem(extraData.facetoface);
                setBirthDate(extraData.birthDate);
                setGrade(data.yearLevel);
                setIsIndig(extraData.indig);

                if (extraData.semester === '1st') {
                    setfirstSemester(true);
                } else if (extraData.semester === '2nd') {
                    setsecondSemester(true);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [id]);

    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (firstSemester) {
            semester = '1st';
        } else {
            semester = '2nd';
        }
        console.log(semester);
        const updatedStudentData = {
            hasLRN: props.userInfo.hasLRN,
            schoolYearFrom: yearFromRef.current.value,
            schoolYearTo: yeartoRef.current.value,
            levelEnroll: grade,
            PSANo: birthCertRef.current.value,
            LRNNo: lrnRef.current.value,
            firstName: fnameRef.current.value,
            middleName: mnameRef.current.value,
            lastName: lnameRef.current.value,
            birthDate: birthDate,
            gender: genderRef.current.value,
            indig: isIndig,
            indigSpec: indigenousRef.current.value,
            motherTongue: mtoungeRef.current.value,
            address1: add1Ref.current.value,
            address2: add2Ref.current.value,
            zipCode: zipRef.current.value,
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
        if (!schoolYearFromIsTouched) {
            updatedStudentData.schoolYearFrom = props.userInfo.schoolYearFrom;
        }
        if (!schoolYearToIsTouched) {
            updatedStudentData.schoolYearTo = props.userInfo.schoolYearTo;
        }
        if (!PSANoIsTouched) {
            updatedStudentData.PSANo = props.userInfo.PSANo;
        }
        if (!LRNNoIsTouched) {
            updatedStudentData.LRNNo = props.data.LRNNo;
        }
        if (!fnameIsTouched) {
            updatedStudentData.firstName = props.data.firstName;
        }
        if (!mnameIsTouched) {
            updatedStudentData.middleName = props.data.middleName;
        }
        if (!lnameIsTouched) {
            updatedStudentData.lastName = props.data.lastName;
        }
        if (!genderIsTouched) {
            updatedStudentData.gender = props.userInfo.gender;
        }

        if (!indigSpecIsTouched) {
            updatedStudentData.indigSpec = props.userInfo.indigSpec;
        }
        if (!motherTongueIsTouched) {
            updatedStudentData.motherTongue = props.userInfo.motherTongue;
        }
        if (!address1IsTouched) {
            updatedStudentData.address1 = props.userInfo.address1;
        }
        if (!address2IsTouched) {
            updatedStudentData.address2 = props.userInfo.address2;
        }
        if (!zipCodeIsTouched) {
            updatedStudentData.zipCode = props.userInfo.zipCode;
        }
        if (!phoneNumIsTouched) {
            updatedStudentData.phoneNum = props.data.phoneNum;
        }
        if (!motherFirstNameIsTouched) {
            updatedStudentData.motherFirstName = props.userInfo.motherFirstName;
        }
        if (!motherMiddleNameIsTouched) {
            updatedStudentData.motherMiddleName = props.userInfo.motherMiddleName;
        }
        if (!motherLastNameIsTouched) {
            updatedStudentData.motherLastName = props.userInfo.motherLastName;
        }
        if (!fatherFirstNameIsTouched) {
            updatedStudentData.fatherFirstName = props.userInfo.fatherFirstName;
        }
        if (!fatherMiddleNameIsTouched) {
            updatedStudentData.fatherMiddleName = props.userInfo.fatherMiddleName;
        }
        if (!fatherLastNameIsTouched) {
            updatedStudentData.fatherLastName = props.userInfo.fatherLastName;
        }
        if (!guardianFirstNameIsTouched) {
            updatedStudentData.guardianFirstName = props.userInfo.guardianFirstName;
        }
        if (!guardianMiddleNameIsTouched) {
            updatedStudentData.guardianMiddleName = props.userInfo.guardianMiddleName;
        }
        if (!guardianLastNameIsTouched) {
            updatedStudentData.guardianLastName = props.userInfo.guardianLastName;
        }
        if (!emergencyNameIsTouched) {
            updatedStudentData.emergencyName = props.userInfo.emergencyName;
        }
        if (!emergencyTelephoneIsTouched) {
            updatedStudentData.emergencyTelephone = props.userInfo.emergencyTelephone;
        }
        if (!emergencyCellphoneIsTouched) {
            updatedStudentData.emergencyCellphone = props.userInfo.emergencyCellphone;
        }
        if (!parentPhoneNumIsTouched) {
            updatedStudentData.parentPhoneNum = props.userInfo.parentPhoneNum;
        }
        if (!lastGradeLevelIsTouched) {
            updatedStudentData.lastGradeLevel = props.userInfo.lastGradeLevel;
        }
        if (!lastSchoolYearIsTouched) {
            updatedStudentData.lastSchoolYear = props.userInfo.lastSchoolYear;
        }
        if (!schoolNameIsTouched) {
            updatedStudentData.schoolName = props.userInfo.schoolName;
        }
        if (!schoolAddressIsTouched) {
            updatedStudentData.schoolAddress = props.userInfo.schoolAddress;
        }
        if (!trackIsTouched) {
            updatedStudentData.track = props.userInfo.track;
        }
        if (!strandIsTouched) {
            updatedStudentData.strand = props.userInfo.strand;
        }

        const postData = async () => {
            try {
                const response = await axios.put(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/registrar/students/${props.id}`, updatedStudentData, {
                    withCredentials: true,
                    credentials: 'include',
                });

                console.log(response.data);
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
        console.log(updatedStudentData);
    };
    const archiveStudent = async () => {
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/registrar/students/${props.id}`, {
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
            <h1 className={styles.formHeader}>Edit/Archive Student</h1>
            <div className={styles.formContainer}>
                <h2 className={styles.typeHeader}>Student</h2>
                <div className={styles.yearSection}>
                    <div>
                        <label htmlFor="yearfrom">Year From</label>
                        <input
                            type="number"
                            min="0"
                            id="yearfrom"
                            ref={yearFromRef}
                            placeholder={props.userInfo.schoolYearFrom}
                            onBlur={() => {
                                setSchoolYearFromIsTouched(true);
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="yearto">Year To</label>
                        <input
                            type="number"
                            min="0"
                            id="yearto"
                            ref={yeartoRef}
                            placeholder={props.userInfo.schoolYearTo}
                            onBlur={() => {
                                setSchoolYearToIsTouched(true);
                            }}
                        />
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
                </div>
                <div className={styles.studentSection}>
                    <div>
                        <label htmlFor="birthCert">PSA Birth Certificate No.</label>
                        <input
                            type="number"
                            min="0"
                            id="birthCert"
                            ref={birthCertRef}
                            placeholder={props.userInfo.PSANo}
                            onBlur={() => {
                                setPSANoIsTouched(true);
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="lrn">Learner Reference No.</label>
                        <input
                            type="number"
                            min="0"
                            id="lrn"
                            ref={lrnRef}
                            placeholder={props.data.LRNNo}
                            onBlur={() => {
                                setLRNNoIsTouched(true);
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="fname">First Name</label>
                        <input
                            type="text"
                            id="fname"
                            ref={fnameRef}
                            placeholder={props.data.firstName}
                            onBlur={() => {
                                setfnameIsTouched(true);
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="birthdate">Date of Birth</label>
                        <input type="date" id="birthdate" value={birthDate} onChange={birthDateHandler} />
                    </div>
                    <div>
                        <label htmlFor="mname">Middle Name</label>
                        <input
                            type="text"
                            id="mname"
                            ref={mnameRef}
                            placeholder={props.data.middleName}
                            onBlur={() => {
                                setmnameIsTouched(true);
                            }}
                        />
                    </div>

                    <div>
                        <label htmlFor="gender">Gender</label>
                        <input
                            type="text"
                            id="gender"
                            ref={genderRef}
                            placeholder={props.userInfo.gender}
                            onBlur={() => {
                                setGenderIsTouched(true);
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="lname">Last Name</label>
                        <input
                            type="text"
                            id="lname"
                            ref={lnameRef}
                            placeholder={props.data.lastName}
                            onBlur={() => {
                                setlnameIsTouched(true);
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="isIndig">Belong in indigenous community?</label>
                        <input type="checkbox" name="isIndig" id="isIndig" className={styles.isIndig} checked={isIndig} onChange={() => setIsIndig(!isIndig)} />
                    </div>
                    <div>
                        <label htmlFor="mtounge">Mother Tounge</label>
                        <input
                            type="text"
                            id="mtounge"
                            ref={mtoungeRef}
                            placeholder={props.userInfo.motherTongue}
                            onBlur={() => {
                                setmotherTongueIsTouched(true);
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="indigenous">Indigenous name</label>
                        <input
                            type="text"
                            id="indigenous"
                            ref={indigenousRef}
                            disabled={!isIndig}
                            placeholder={props.userInfo.indigSpec}
                            onBlur={() => {
                                setindigSpecIsTouched(true);
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="add1">Address Line 1</label>
                        <input
                            type="text"
                            id="add1"
                            ref={add1Ref}
                            placeholder={props.userInfo.address1}
                            onBlur={() => {
                                setaddress1IsTouched(true);
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="add2">Address Line 2</label>
                        <input
                            type="text"
                            id="add2"
                            ref={add2Ref}
                            placeholder={props.userInfo.address2}
                            onBlur={() => {
                                setaddress2IsTouched(true);
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="zip">Zip Code</label>
                        <input
                            type="number"
                            min="0"
                            id="zip"
                            ref={zipRef}
                            placeholder={props.userInfo.zipCode}
                            onBlur={() => {
                                setzipCodeIsTouched(true);
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">E-mail</label>
                        <input type="email" id="email" ref={emailRef} placeholder={props.data.email} disabled={true} />
                    </div>
                    <div>
                        <label htmlFor="mobileno">Cellphone no.</label>
                        <input
                            type="number"
                            min="0"
                            id="mobileno"
                            ref={mobilenoRef}
                            placeholder={props.data.phoneNum}
                            onBlur={() => {
                                setphoneNumIsTouched(true);
                            }}
                        />
                    </div>
                </div>

                {/* PARENTS SECTION */}
                <h2 className={styles.typeHeader}>Parents</h2>
                <div className={styles.parentsSection}>
                    <h4 className={styles.typeSubHeader}>Mother</h4>
                    <h4 className={styles.typeSubHeader}>Father</h4>
                    <div>
                        <label htmlFor="motherfname">First Name</label>
                        <input
                            type="text"
                            id="motherfname"
                            ref={motherfnameRef}
                            placeholder={props.userInfo.motherFirstName}
                            onBlur={() => {
                                setmotherFirstNameIsTouched(true);
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="fatherfname">First Name</label>
                        <input
                            type="text"
                            id="fatherfname"
                            ref={fatherfnameRef}
                            placeholder={props.userInfo.fatherFirstName}
                            onBlur={() => {
                                setfatherFirstNameIsTouched(true);
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="motherlname">Last Name</label>
                        <input
                            type="text"
                            id="motherlname"
                            ref={motherlnameRef}
                            placeholder={props.userInfo.motherLastName}
                            onBlur={() => {
                                setmotherLastNameIsTouched(true);
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="fatherlname">Last Name</label>
                        <input
                            type="text"
                            id="fatherlname"
                            ref={fatherlnameRef}
                            placeholder={props.userInfo.fatherLastName}
                            onBlur={() => {
                                setfatherLastNameIsTouched(true);
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="mothermidname">Middle Name</label>
                        <input
                            type="text"
                            id="mothermidname"
                            ref={mothermidnameRef}
                            placeholder={props.userInfo.motherMiddleName}
                            onBlur={() => {
                                setmotherMiddleNameIsTouched(true);
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="fathermidname">Middle Name</label>
                        <input
                            type="text"
                            id="fathermidname"
                            ref={fathermidnameRef}
                            placeholder={props.userInfo.fatherMiddleName}
                            onBlur={() => {
                                setfatherMiddleNameIsTouched(true);
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="parentEmail">Parent Email (Any)</label>
                        <input type="email" id="parentEmail" ref={parentEmailRef} disabled={true} placeholder={props.userInfo.parentEmail} />
                    </div>
                    <div>
                        <label htmlFor="parentNum">Parent Mobile no.</label>
                        <input
                            type="number"
                            id="parentNum"
                            ref={parentNumRef}
                            placeholder={props.userInfo.parentPhoneNum}
                            onBlur={() => {
                                setparentPhoneNumIsTouched(true);
                            }}
                        />
                    </div>
                    <h4 className={styles.typeSubHeader}>Guardian</h4>
                    <h4 className={styles.typeSubHeader}>Emergency Contact</h4>
                    <div>
                        <label htmlFor="guardianfname">First Name</label>
                        <input
                            type="text"
                            id="guardianfname"
                            ref={guardianfnameRef}
                            placeholder={props.userInfo.guardianFirstName}
                            onBlur={() => {
                                setguardianFirstNameIsTouched(true);
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="emergencyname">Name</label>
                        <input
                            type="text"
                            id="emergencyname"
                            ref={emergencynameRef}
                            placeholder={props.userInfo.emergencyName}
                            onBlur={() => {
                                setemergencyNameIsTouched(true);
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="guardianlname">Last Name</label>
                        <input
                            type="text"
                            id="guardianlname"
                            ref={guardianlnameRef}
                            placeholder={props.userInfo.guardianLastName}
                            onBlur={() => {
                                setguardianLastNameIsTouched(true);
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="emergencymobileno">Cellphone No.</label>
                        <input
                            type="number"
                            min="0"
                            id="emergencymobileno"
                            ref={emergencymobilenoRef}
                            placeholder={props.userInfo.emergencyCellphone}
                            onBlur={() => {
                                setemergencyCellphoneIsTouched(true);
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="guardianmidname">Middle Name</label>
                        <input
                            type="text"
                            id="guardianmidname"
                            ref={guardianmidnameRef}
                            placeholder={props.userInfo.guardianMiddleName}
                            onBlur={() => {
                                setguardianMiddleNameIsTouched(true);
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="emergencytelno">Telephone No.</label>
                        <input
                            type="number"
                            min="0"
                            id="emergencytelno"
                            ref={emergencytelnoRef}
                            placeholder={props.userInfo.emergencyTelephone}
                            onBlur={() => {
                                setemergencyTelephoneIsTouched(true);
                            }}
                        />
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
                            placeholder={props.userInfo.lastGradeLevel}
                            onBlur={() => {
                                setlastGradeLevelIsTouched(true);
                            }}
                            //
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
                                    checked={firstSemester}
                                    onChange={() => {
                                        setfirstSemester((prev) => !prev);
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
                                    checked={secondSemester}
                                    onChange={() => {
                                        setsecondSemester((prev) => !prev);
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
                            placeholder={props.userInfo.lastSchoolYear}
                            onBlur={() => {
                                setlastSchoolYearIsTouched(true);
                            }}
                            //
                        />
                    </div>
                    <div>
                        <label htmlFor="track">Track</label>
                        <input
                            type="text"
                            id="track"
                            ref={trackRef}
                            placeholder={props.userInfo.track}
                            onBlur={() => {
                                settrackIsTouched(true);
                            }}
                            //
                        />
                    </div>
                    <div>
                        <label htmlFor="strand">Strand</label>
                        <input
                            type="text"
                            id="strand"
                            //
                            ref={strandRef}
                            placeholder={props.userInfo.strand}
                            onBlur={() => {
                                setstrandIsTouched(true);
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="schoolname">School Name</label>
                        <input
                            type="text"
                            id="schoolname"
                            //
                            ref={schoolnameRef}
                            placeholder={props.userInfo.schoolName}
                            onBlur={() => {
                                setschoolNameIsTouched(true);
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="schoolAdd">School Address</label>
                        <input
                            type="text"
                            id="schoolAdd"
                            ref={schoolAddRef}
                            //
                            placeholder={props.userInfo.schoolAddress}
                            onBlur={() => {
                                setschoolAddressIsTouched(true);
                            }}
                        />
                    </div>
                </div>
                <h2 className={styles.typeHeader}>Preferred Distance Learning Methods</h2>
                <div className={styles.checkboxContainer}>
                    <label htmlFor="item1" className={styles.radioContainer}>
                        Modular (Print)
                        <input
                            type="checkbox"
                            name="item1"
                            id="item1"
                            checked={firstItem}
                            onChange={() =>
                                setFirstItem((prev) => {
                                    !prev;
                                })
                            }
                        />
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
                            <h2 className={styles.messageHeader}>Student Updated</h2>
                            <h4 className={styles.messageBody}>Please check in the updated student to the List of Student Tab</h4>
                            <h4 className={styles.messageFooter}>Thank you.</h4>
                            <Button
                                className={styles.modalButton}
                                onClick={() => {
                                    router.push('/registrar/Students');
                                }}
                            >
                                Go back to student list
                            </Button>
                        </div>
                    </Modal>
                )}
                {archive && (
                    <Modal className={styles.modalDesign}>
                        <div className={styles.messageContainer}>
                            <h2 className={styles.messageHeader}>Student Successfully Archived</h2>
                            <h4 className={styles.messageBody}></h4>
                            <h4 className={styles.messageFooter}>Thank you.</h4>
                            <Button
                                className={styles.modalButton}
                                onClick={() => {
                                    router.push('/registrar/Students');
                                }}
                            >
                                Go back to student list
                            </Button>
                        </div>
                    </Modal>
                )}
                {confirmation && (
                    <Modal className={styles.modalDesign}>
                        <div className={styles.messageContainer}>
                            <h2 className={styles.messageHeader}>Are you sure you want to archive the student?</h2>
                            <h4 className={styles.messageFooter}></h4>
                            <div className={styles.buttonConfirmationContainer}>
                                <Button className={styles.modalButtonYes} onClick={archiveStudent}>
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

export default PreRegFormEdit;
